'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp,
  deleteDoc,
  doc,
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { saveAs } from 'file-saver';

export interface Subscription {
  id: string;
  email: string;
  created_at: Timestamp | Date | string;
}

const fetchSubscribers = async (): Promise<Subscription[]> => {
  const subsRef = collection(db, 'newsletter_subscriptions');
  const q = query(subsRef, orderBy('created_at', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(docSnap => {
    const data = docSnap.data() as Subscription;
    return {
      id: docSnap.id,
      email: data.email,
      created_at: data.created_at
    };
  });
};

const normalizeDate = (
  created_at: string | Date | Timestamp | null | undefined
): Date | null => {
  if (created_at instanceof Timestamp) {
    return created_at.toDate();
  }
  if (created_at instanceof Date) {
    return created_at;
  }
  const d = new Date(created_at as string);
  return isNaN(d.getTime()) ? null : d;
};


const NewsletterSubscribersTable: React.FC<{ filterEmail: string }> = ({ filterEmail }) => {
  const { data: subscribers, refetch } = useQuery<Subscription[]>({
    queryKey: ['subscribers'],
    queryFn: fetchSubscribers,
  });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const filtered = useMemo(() => {
    if (!subscribers) return [];
    return subscribers.filter(sub =>
      sub.email?.toLowerCase().includes(filterEmail.toLowerCase())
    );
  }, [subscribers, filterEmail]);

  useEffect(() => {
    if (selectAll) {
      setSelectedIds(filtered.map(sub => sub.id));
    } else {
      setSelectedIds([]);
    }
  }, [selectAll, filtered]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} subscriber(s)?`)) return;

    for (const id of selectedIds) {
      await deleteDoc(doc(db, 'newsletter_subscriptions', id));
    }

    setSelectedIds([]);
    setSelectAll(false);
    await refetch();
    alert('Deleted successfully');
  };

 const handleExport = () => {
  const rows = filtered.filter(sub => selectedIds.includes(sub.id));
  if (rows.length === 0) return;

  const csv = [
    ['Email', 'Created At (UTC+5)'],
    ...rows.map(sub => {
      const date = normalizeDate(sub.created_at);
      if (!date) return [sub.email, ''];

      // Convert to UTC+5 manually
      const utc5Date = new Date(date.getTime() + 5 * 60 * 60 * 1000);
      return [
        sub.email,
        utc5Date.toISOString().replace('Z', '+05:00')
      ];
    }),
  ]
    .map(row => row.join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'subscribers.csv');
};


  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
          <div>
            <CardTitle>Newsletter Subscribers</CardTitle>
            <CardDescription>Manage your list of subscribers.</CardDescription>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              className="px-3 py-2 bg-red-600 text-white rounded disabled:opacity-50"
              disabled={selectedIds.length === 0}
            >
              Delete Selected
            </button>
            <button
              onClick={handleExport}
              className="px-3 py-2 bg-green-600 text-white rounded disabled:opacity-50"
              disabled={selectedIds.length === 0}
            >
              Export Selected
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={e => setSelectAll(e.target.checked)}
                />
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Subscribed At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(sub => (
              <TableRow key={sub.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(sub.id)}
                    onChange={() => toggleSelect(sub.id)}
                  />
                </TableCell>
                <TableCell>{sub.email}</TableCell>
                <TableCell className="text-right">
                  {normalizeDate(sub.created_at)?.toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  No subscribers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card >
  );
};

export default NewsletterSubscribersTable;
