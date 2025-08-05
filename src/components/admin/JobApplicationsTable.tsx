import React, { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp,
  deleteDoc,
  doc,
  writeBatch,
  updateDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import JobApplicationDetailModal from './JobDetailModal';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from '@/components/ui/card';
import { Trash, Download } from 'lucide-react';

export interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  education: string;
  cover_letter: string;
  resume_url: string;
  created_at: Timestamp;
  application_status?: string;
}

const fetchApplications = async (): Promise<Application[]> => {
  const appsRef = collection(db, 'job_applications');
  const q = query(appsRef, orderBy('created_at', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    ...(doc.data() as Application),
    id: doc.id,
  }));
};

const formatDate = (created_at: Timestamp | undefined) => {
  if (created_at?.seconds) {
    return new Date(created_at.seconds * 1000).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
  return 'N/A';
};


export const statusColor = (status: string = '') => {
  const base = 'px-2 py-1 rounded-full text-xs font-semibold inline-block';
  switch (status) {
    case 'Pending Review': return `${base} bg-yellow-100 text-yellow-800`;
    case 'Shortlisted': return `${base} bg-blue-100 text-blue-800`;
    case 'Rejected': return `${base} bg-red-100 text-red-800`;
    case 'Interview Scheduled': return `${base} bg-indigo-100 text-indigo-800`;
    default: return `${base} bg-gray-100 text-gray-800`;
  }
};

const downloadCSV = (rows: Application[], filename = 'applications.csv') => {
  if (!rows.length) return;
  const headers = [
    'Name', 'Email', 'Phone', 'Position', 'Status', 'Applied At', 'Resume URL',
  ];
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines = rows.map(r => [
    escape(r.name || 'N/A'),
    escape(r.email || ''),
    escape(r.phone || ''),
    escape(r.position || ''),
    escape(r.application_status || 'Pending'),
    escape(formatDate(r.created_at)),
    escape(r.resume_url || ''),
  ].join(','));
  const csvContent = [headers.join(','), ...lines].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const JobApplicationsTable: React.FC = () => {
  const [openApp, setOpenApp] = useState<Application | null>(null);
  const queryClient = useQueryClient();
  const { data: applications = [], isLoading, error } = useQuery<Application[]>({
    queryKey: ['jobApplications'],
    queryFn: fetchApplications,
    staleTime: 1000 * 60, // 1 minute
  });

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All Statuses');
  const [positionFilter, setPositionFilter] = useState<string>('All Positions');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());


  const updateApplicationStatus = async (id: string, status: string) => {
    const ref = doc(db, 'job_applications', id);
    await updateDoc(ref, { application_status: status });
  };

  // Derived lists for dropdowns
  const allStatuses = useMemo(() => {
    const set = new Set<string>();
    applications.forEach(a => {
      if (a.application_status) set.add(a.application_status);
    });
    return Array.from(set).sort();
  }, [applications]);

  const allPositions = useMemo(() => {
    const set = new Set<string>();
    applications.forEach(a => {
      if (a.position) set.add(a.position);
    });
    return Array.from(set).sort();
  }, [applications]);

  const filtered = useMemo(() => {
    return applications
      .filter(app => {
        // search by name or email
        const term = search.toLowerCase();
        const matchSearch =
          app.name?.toLowerCase().includes(term) ||
          app.email?.toLowerCase().includes(term);
        if (!matchSearch) return false;
        if (statusFilter !== 'All Statuses' && app.application_status !== statusFilter) return false;
        if (positionFilter !== 'All Positions' && app.position !== positionFilter) return false;
        return true;
      });
  }, [applications, search, statusFilter, positionFilter]);

  const paginated = useMemo(() => {
    return filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [filtered, page]);

  const allVisibleIds = paginated.map(a => a.id);
  const isAllPageSelected = allVisibleIds.every(id => selectedIds.has(id)) && allVisibleIds.length > 0;
  const isSomePageSelected = allVisibleIds.some(id => selectedIds.has(id)) && !isAllPageSelected;

  const toggleRow = (id: string) => {
    setSelectedIds(prev => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  };

  const toggleAllPage = () => {
    setSelectedIds(prev => {
      const copy = new Set(prev);
      if (isAllPageSelected) {
        allVisibleIds.forEach(id => copy.delete(id));
      } else {
        allVisibleIds.forEach(id => copy.add(id));
      }
      return copy;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  const bulkDelete = async () => {
    if (!selectedIds.size) return;
    if (!window.confirm(`Delete ${selectedIds.size} selected application(s)? This cannot be undone.`)) return;
    const batch = writeBatch(db);
    selectedIds.forEach(id => {
      const d = doc(db, 'job_applications', id);
      batch.delete(d);
    });
    await batch.commit();
    // invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
    clearSelection();
  };

  const singleDelete = async (id: string) => {
    if (!window.confirm('Delete this application?')) return;
    await deleteDoc(doc(db, 'job_applications', id));
    queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
    setSelectedIds(prev => {
      const copy = new Set(prev);
      copy.delete(id);
      return copy;
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <CardTitle>Job Applications</CardTitle>
          <CardDescription>All submitted applications with status.</CardDescription>
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              <label htmlFor="position-filter" className="sr-only">Job Title</label>
              <select
                id="position-filter"
                value={positionFilter}
                onChange={e => { setPositionFilter(e.target.value); setPage(1); }}
                className="border rounded px-3 py-2 text-sm"
              >
                <option>All Positions</option>
                {allPositions.map(p => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <label htmlFor="status-filter" className="sr-only">Status</label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                className="border rounded px-3 py-2 text-sm"
              >
                <option>All Statuses</option>
                {allStatuses.map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search applicants..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="border border-gray-300 px-3 py-2 rounded-md text-sm"
              />
            </div>
          </div>

          {/* Bulk actions & download */}
          <div className="flex gap-2 items-center">
            {selectedIds.size > 0 ? (
              <div className="flex gap-1 items-center">
                <span className="text-sm">{selectedIds.size} selected</span>
                <button
                  onClick={bulkDelete}
                  aria-label="Bulk Delete"
                  className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded text-xs hover:bg-red-200"
                >
                  <Trash size={14} /> Delete
                </button>
                <button
                  onClick={() => {
                    const selected = applications.filter(a => selectedIds.has(a.id));
                    downloadCSV(selected, 'selected_applications.csv');
                  }}
                  aria-label="Export Selected"
                  className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded text-xs hover:bg-green-200"
                >
                  <Download size={14} /> Export Selected
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  const toExport = filtered.length ? filtered : applications;
                  const name = filtered.length
                    ? 'filtered_applications.csv'
                    : 'all_applications.csv';
                  downloadCSV(toExport, name);
                }}
                className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700"
              >
                <Download size={16} /> Download CSV
              </button>
            )}
          </div>

        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <p className="text-center py-6">Loading applications...</p>
        ) : error ? (
          <p className="text-center text-red-600 py-6">Error loading data</p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <input
                      type="checkbox"
                      aria-label="select all on page"
                      checked={isAllPageSelected}
                      ref={input => {
                        if (input) input.indeterminate = isSomePageSelected;
                      }}
                      onChange={toggleAllPage}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email / Phone</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Resume</TableHead>
                  <TableHead className="text-right">Applied At</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((app) => (
                  <TableRow key={app.id} className="group">
                    <TableCell className="w-[40px]">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(app.id)}
                        onChange={() => toggleRow(app.id)}
                      />
                    </TableCell>
                    <TableCell>{app.name || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="text-sm">{app.email}</div>
                      <div className="text-xs text-gray-500">{app.phone}</div>
                    </TableCell>
                    <TableCell>{app.position}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <select
                          aria-label="Change status"
                          value={app.application_status || 'Pending Review'}
                          onChange={async (e) => {
                            const newStatus = e.target.value;
                            try {
                              // optimistic UI update could be layered here if desired
                              await updateApplicationStatus(app.id, newStatus);
                              // refetch or invalidate
                              queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
                            } catch (err) {
                              console.error('Failed to update status', err);
                              // show toast / error feedback as needed
                            }
                          }}
                          className="border rounded px-2 py-1 text-xs"
                        >
                          <option>Pending Review</option>
                          <option>Shortlisted</option>
                          <option>Interview Scheduled</option>
                          <option>Rejected</option>
                          <option>Hired</option>
                        </select>
                      </div>
                    </TableCell>

                    <TableCell>
                      {app.resume_url ? (
                        <a
                          href={app.resume_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline text-sm"
                        >
                          View
                        </a>
                      ) : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right text-sm">{formatDate(app.created_at)}</TableCell>
                    <TableCell className="flex gap-2 items-center">
                      <button
                        className="text-blue-600 hover:underline text-sm"
                        onClick={() => setOpenApp(app)}
                      >
                        View
                      </button>
                      {/* modal */}
                      {openApp && (
                        <JobApplicationDetailModal
                          application={openApp}
                          open={!!openApp}
                          onClose={() => setOpenApp(null)}
                          onStatusUpdated={() => {
                            queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
                          }}
                        />
                      )}
                      <button
                        aria-label="Delete"
                        className="text-red-500 hover:underline text-sm"
                        onClick={() => singleDelete(app.id)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
                {paginated.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6">
                      No applications match the filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
              <p className="text-sm text-gray-600">
                Showing {paginated.length} of {filtered.length} applications
              </p>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm">Page {page}</span>
                <button
                  onClick={() =>
                    setPage(p =>
                      p * itemsPerPage < filtered.length ? p + 1 : p
                    )
                  }
                  disabled={page * itemsPerPage >= filtered.length}
                  className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default JobApplicationsTable;
