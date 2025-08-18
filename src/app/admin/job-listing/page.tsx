'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from "@/components/ui/button";
import { Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, getDocs, deleteDoc, orderBy, query, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

export interface JobListing {
  id: string;
  title: string;
  company?: string;
  location: string;
  type: string;
  created_at: string;
  description?: string;
  requirements?: string[];
  responsibilities?: string[];
  experience?: string;
  whatWeOffer?: string[];
}

async function fetchJobsFromFirebase(): Promise<JobListing[]> {
  try {
    const q = query(collection(db, 'jobs'), orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      console.warn('No jobs found');
      return [];
    }
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      let createdAtISO = new Date().toISOString();
      if (data.created_at) {
        if (typeof data.created_at.toDate === 'function') {
          createdAtISO = data.created_at.toDate().toISOString();
        } else if (typeof data.created_at === 'string') {
          createdAtISO = new Date(data.created_at).toISOString();
        } else if (data.created_at.seconds) {
          createdAtISO = new Date(data.created_at.seconds * 1000).toISOString();
        }
      }
      return {
        id: doc.id,
        title: data.title || '',
        company: data.company || '',
        location: data.location || '',
        type: data.type || '',
        created_at: createdAtISO,
        description: data.description || '',
        requirements: Array.isArray(data.requirements) ? data.requirements : [],
        responsibilities: Array.isArray(data.responsibilities) ? data.responsibilities : [],
        experience: data.experience || '',
        whatWeOffer: Array.isArray(data.whatWeOffer) ? data.whatWeOffer : [],
      } as JobListing;
    });
  } catch (err) {
    console.error('Error fetching jobs:', err);
    return [];
  }
}

const ITEMS_PER_PAGE = 6;

const JobListingPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [locationFilter, setLocationFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  async function handleDelete(jobId: string) {
    const confirm = window.confirm('Are you sure you want to delete this job?');
    if (!confirm) return;
    try {
      await deleteDoc(doc(db, 'jobs', jobId));
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    } catch (err) {
      console.error('Error deleting job:', err);
      alert('Failed to delete job');
    }
  }

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      const data = await fetchJobsFromFirebase();
      setJobs(data);
      setLoading(false);
    };
    loadJobs();
  }, []);

  const filtered = useMemo(() => {
    return jobs
      .filter((j) => {
        if (typeFilter !== 'All' && j.type !== typeFilter) return false;
        if (locationFilter && !j.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            j.title.toLowerCase().includes(q) ||
            (j.company && j.company.toLowerCase().includes(q)) ||
            (j.description && j.description.toLowerCase().includes(q))
          );
        }
        return true;
      })
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [jobs, search, typeFilter, locationFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex w-full justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
        <Link href="/admin/job-listing/new-job" className="md:w-auto">
          <Button className="justify-items-end w-fit">
            <Plus className="w-4 h-4 mr-2" />
            Add New Job
          </Button>
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} />
            </div>
          </div>
          <Select onValueChange={(v) => { setTypeFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Job Type">{typeFilter !== 'All' ? typeFilter : undefined}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Full Time">Full Time</SelectItem>
              <SelectItem value="Part Time">Part Time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Location"
            value={locationFilter}
            onChange={(e) => { setLocationFilter(e.target.value); setCurrentPage(1); }}
            className="w-40"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => { setSearch(''); setLocationFilter(''); setTypeFilter('All'); setCurrentPage(1); }}>
            Clear Filters
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">Loading jobs...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageItems.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                    </div>
                    <div className="text-xs px-2 py-1 bg-gray-100 rounded-full">{job.type}</div>
                  </div>
                  {job.description && <p className="mt-2 text-sm line-clamp-3">{job.description}</p>}
                  {job.requirements && job.requirements.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.requirements.map((t) => (
                        <span key={t} className="text-xs bg-blue-100 px-2 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                  )}
                  {job.responsibilities && job.responsibilities.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.responsibilities.map((t) => (
                        <span key={t} className="text-xs bg-green-100 px-2 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                  )}
                  {job.whatWeOffer && job.whatWeOffer.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {job.whatWeOffer.map((offer, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{offer}</span>
                        ))}
                    </div>
                  )}
                  {job.experience && (
                    <div className="mt-2 text-sm text-gray-600">Experience: {job.experience}</div>
                  )}
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Posted {formatRelativeDate(job.created_at)}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(job.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-sm text-muted-foreground">No jobs match your filters.</div>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <Button
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <div className="text-sm">
            Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
          </div>
          <Button
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

function formatRelativeDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  return Math.floor(diff / 86400) + 'd ago';
}

export default JobListingPage;