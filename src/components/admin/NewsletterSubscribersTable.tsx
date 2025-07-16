import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
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

interface Subscription {
  id: string;
  email: string;
  created_at: string;
}

const fetchSubscribers = async (): Promise<Subscription[]> => {
  const subsRef = collection(db, 'newsletter_subscriptions');
  const q = query(subsRef, orderBy('created_at', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Subscription),
  }));
};

const NewsletterSubscribersTable = () => {
  const { data: subscribers, isLoading, error } = useQuery<Subscription[]>({
    queryKey: ['subscribers'],
    queryFn: fetchSubscribers,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletter Subscribers</CardTitle>
        <CardDescription>
          A list of all users subscribed to the newsletter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="p-4 text-center">Loading subscribers...</div>
        ) : error ? (
          <div className="p-4 text-red-500 text-center">Error fetching subscribers: {error.message}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Subscribed At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers?.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell className="font-medium">{subscriber.email}</TableCell>
                  <TableCell className="text-right">{new Date(subscriber.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsletterSubscribersTable;
