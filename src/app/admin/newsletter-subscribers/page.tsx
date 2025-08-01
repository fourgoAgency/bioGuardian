'use client'

import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import NewsletterSubscribersTable, {
  Subscription,
} from '@/components/admin/NewsletterSubscribersTable';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const fetchSubscribers = async (): Promise<Subscription[]> => {
  const subsRef = collection(db, 'newsletter_subscriptions');
  const q = query(subsRef, orderBy('created_at', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => {
    const data = doc.data() as Subscription;
    return {
      ...data,
    };
  });
};

const normalizeDate = (created_at: string | Date | Timestamp | null | undefined ): Date | null => {
  if (created_at && typeof created_at === 'object' && 'toDate' in created_at) {
    return (created_at).toDate();
  }
  const d = new Date(created_at as string);
  return isNaN(d.getTime()) ? null : d;
};

export default function NewsletterSubscribersPage() {
  const [search, setSearch] = useState('');

  const { data: allSubscribers } = useQuery<Subscription[]>({
    queryKey: ['subscribers-overview'],
    queryFn: fetchSubscribers,
    staleTime: 1000 * 60 * 2,
  });

  const now = useMemo(() => new Date(), []);
  const thirtyDaysAgo = useMemo(() => {
    const d = new Date(now);
    d.setDate(d.getDate() - 30);
    return d;
  }, [now]);
  const sixtyDaysAgo = useMemo(() => {
    const d = new Date(now);
    d.setDate(d.getDate() - 60);
    return d;
  }, [now]);

  const computedStats = useMemo(() => {
    if (!allSubscribers) {
      return [
        { label: 'Total Subscribers', value: 0, change: '' },
        { label: 'New Subscribers (30d)', value: 0, change: '' },
        { label: 'Growth (vs prior 30d)', value: '—', change: '' },
      ];
    }

    const total = allSubscribers.length;
    let newLast30 = 0;
    let newPrev30 = 0;

    allSubscribers.forEach(sub => {
      const dateObj = normalizeDate(sub.created_at);
      if (!dateObj) return;

      if (dateObj >= thirtyDaysAgo) {
        newLast30 += 1;
      } else if (dateObj >= sixtyDaysAgo) {
        newPrev30 += 1;
      }
    });

    let growthLabel = '—';
    if (newPrev30 > 0) {
      const delta = ((newLast30 - newPrev30) / newPrev30) * 100;
      const sign = delta >= 0 ? '+' : '';
      growthLabel = `${sign}${delta.toFixed(1)}%`;
    } else if (newLast30 > 0) {
      growthLabel = '+100%';
    }

    return [
      { label: 'Total Subscribers', value: total, change: '' },
      { label: 'New Subscribers (30d)', value: newLast30, change: '' },
      { label: 'Growth (vs prior 30d)', value: growthLabel, change: '' },
    ];
  }, [allSubscribers, thirtyDaysAgo, sixtyDaysAgo]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="p-4 md:p-6 bg-gray-50 flex-1 overflow-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Newsletter Subscribers</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage and review your email list.
            </p>
          </div>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {computedStats.map((card, i) => (
            <div
              key={i}
              className="bg-white p-4 shadow rounded-lg flex flex-col justify-between"
            >
              <div className="text-sm text-gray-500">{card.label}</div>
              <div className="text-xl font-bold">{card.value}</div>
              {card.change && card.change !== '—' && (
                <div
                  className={`text-xs font-medium mt-1 ${
                    card.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {card.change} vs prior window
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Search + Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-2 flex-1">
            <input
              aria-label="Search by email"
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by email..."
              className="px-4 py-2 border rounded w-full sm:w-auto flex-1"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-2 bg-blue-600 text-white rounded text-sm">
              Apply
            </button>
            <button
              onClick={() => {
                setSearch('');
              }}
              className="px-3 py-2 border rounded text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Table */}
        <NewsletterSubscribersTable filterEmail={search} />
      </main>
    </div>
  );
}
