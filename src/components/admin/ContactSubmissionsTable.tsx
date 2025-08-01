'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  Timestamp as FirestoreTimestamp,
  type Timestamp as FirestoreTsType,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface Submission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at: string | FirestoreTsType;
  status?: 'New' | 'In Progress' | 'Resolved';
}

interface Props {
  filters?: {
    search?: string;
    status?: string;
    date?: string; // YYYY-MM-DD
    page?: number;
    pageSize?: number;
  };
  onMetaChange?: (meta: { totalCount: number; loading: boolean; error?: Error }) => void;
}

const isFirestoreTimestamp = (v: any): v is FirestoreTsType =>
  v && typeof v.toDate === 'function';

const normalizeDate = (input: string | FirestoreTsType | undefined): string => {
  if (!input) return '—';
  let d: Date;
  if (isFirestoreTimestamp(input)) {
    d = input.toDate();
  } else {
    d = new Date(input);
  }
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleString();
};

const fetchSubmissions = async (): Promise<Submission[]> => {
  const submissionsRef = collection(db, 'contact_submissions');
  const q = query(submissionsRef, orderBy('created_at', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data() as any;
    return {
      id: docSnap.id,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      subject: data.subject || '',
      message: data.message || '',
      created_at: data.created_at || '',
      status: data.status || 'New',
    } as Submission;
  });
};

const useContactSubmissions = () => {
  return useQuery<Submission[], Error>({
    queryKey: ['contactSubmissions'],
    queryFn: fetchSubmissions,
    staleTime: 1000 * 60, // 1 minute
    refetchInterval: false,
  });
};

const ContactSubmissionsTable: React.FC<Props> = ({ filters = {}, onMetaChange }) => {
  const queryClient = useQueryClient();
  const { data: submissions = [], isLoading, error } = useContactSubmissions();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Filtering (client-side)
  const filtered = useMemo(() => {
    let list = submissions;

    if (filters.search) {
      const term = filters.search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(term) ||
          s.email.toLowerCase().includes(term) ||
          s.subject.toLowerCase().includes(term) ||
          s.message.toLowerCase().includes(term)
      );
    }

    if (filters.status) {
      list = list.filter((s) => s.status === filters.status);
    }

    if (filters.date) {
      list = list.filter((s) => {
        let d: Date;
        if (isFirestoreTimestamp(s.created_at)) {
          d = s.created_at.toDate();
        } else {
          d = new Date(s.created_at);
        }
        if (isNaN(d.getTime())) return false;
        return d.toISOString().slice(0, 10) === filters.date;
      });
    }

    return list;
  }, [submissions, filters]);

  const page = filters.page && filters.page >= 1 ? filters.page : 1;
  const pageSize = filters.pageSize || 8;
  const startIdx = (page - 1) * pageSize;
  const paginated = filtered.slice(startIdx, startIdx + pageSize);

  // Notify parent
  useEffect(() => {
    onMetaChange?.({
      totalCount: filtered.length,
      loading: isLoading,
      error: error as Error | undefined,
    });
  }, [filtered.length, isLoading, error, onMetaChange]);

  // Update status (optimistic)
  const updateStatus = async (submission: Submission, newStatus: Submission['status']) => {
    if (!submission.id) return;
    setUpdatingId(submission.id);
    const docRef = doc(db, 'contact_submissions', submission.id);
    const previous = queryClient.getQueryData<Submission[]>(['contactSubmissions']);

    // Optimistic update in cache
    queryClient.setQueryData<Submission[]>(
      ['contactSubmissions'],
      (old) =>
        old
          ? old.map((s) =>
              s.id === submission.id
                ? {
                    ...s,
                    status: newStatus,
                  }
                : s
            )
          : old
    );

    try {
      await updateDoc(docRef, { status: newStatus });
    } catch (e) {
      // rollback on error
      if (previous) {
        queryClient.setQueryData(['contactSubmissions'], previous);
      }
      console.error('Failed to update status', e);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <div>
          <CardTitle>Contact Form Submissions</CardTitle>
          <CardDescription>
            {isLoading
              ? 'Loading submissions...'
              : `Total: ${submissions.length} submission${submissions.length !== 1 ? 's' : ''}`}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {isLoading ? (
          <div className="p-4 text-center">Loading submissions...</div>
        ) : error ? (
          <div className="p-4 text-red-500 text-center">
            Error fetching submissions: {error.message}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-4 text-center">No submissions match the current filters.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Submitted At</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{submission.phone || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{submission.subject}</Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View Message
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Message from {submission.name}</DialogTitle>
                        </DialogHeader>
                        <p className="py-4 whitespace-pre-wrap">{submission.message}</p>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={submission.status || 'New'}
                      onValueChange={(val) =>
                        updateStatus(
                          submission,
                          val as Submission['status']
                        )
                      }
                      disabled={updatingId === submission.id}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    {normalizeDate(submission.created_at)}
                  </TableCell>
                  <TableCell className="text-center">
                    {submission.status !== 'Resolved' ? (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(submission, 'Resolved')}
                        disabled={updatingId === submission.id}
                      >
                        Mark Resolved
                      </Button>
                    ) : (
                      <Badge variant="secondary">Resolved</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactSubmissionsTable;
