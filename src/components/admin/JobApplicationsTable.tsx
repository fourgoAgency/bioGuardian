import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Application {
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
  application_status?: string; // e.g., 'Pending Review', 'Shortlisted', 'Rejected'
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

const formatDate = (created_at: Timestamp) => {
  if (created_at?.seconds) {
    return new Date(created_at.seconds * 1000).toLocaleDateString();
  }
  return "N/A";
};

const statusColor = (status: string = '') => {
  const base = "px-2 py-1 rounded-full text-xs font-semibold";
  switch (status) {
    case 'Pending Review': return `${base} bg-yellow-100 text-yellow-800`;
    case 'Shortlisted': return `${base} bg-blue-100 text-blue-800`;
    case 'Rejected': return `${base} bg-red-100 text-red-800`;
    default: return `${base} bg-gray-100 text-gray-800`;
  }
};

const JobApplicationsTable: React.FC = () => {
  const { data: applications = [], isLoading, error } = useQuery<Application[]>({
    queryKey: ['jobApplications'],
    queryFn: fetchApplications,
  });

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const filteredApps = applications.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase()) ||
    app.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedApps = filteredApps.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <CardTitle>Job Applications</CardTitle>
          <CardDescription>All submitted applications with status.</CardDescription>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search applicants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md text-sm"
          />
          <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700">
            Download CSV
          </button>
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
                {paginatedApps.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>{app.name || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="text-sm">{app.email}</div>
                      <div className="text-xs text-gray-500">{app.phone}</div>
                    </TableCell>
                    <TableCell>{app.position}</TableCell>
                    <TableCell>
                      <span className={statusColor(app.application_status)}>
                        {app.application_status || 'Pending'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {app.resume_url ? (
                        <a href={app.resume_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                          View
                        </a>
                      ) : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">{formatDate(app.created_at)}</TableCell>
                    <TableCell>
                      <button className="text-blue-600 hover:underline text-sm">View</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-600">
                Showing {paginatedApps.length} of {filteredApps.length} applications
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm mt-1">Page {page}</span>
                <button
                  onClick={() => setPage(p => (p * itemsPerPage < filteredApps.length ? p + 1 : p))}
                  disabled={page * itemsPerPage >= filteredApps.length}
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
