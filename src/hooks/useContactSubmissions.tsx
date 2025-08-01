import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Timestamp } from 'firebase/firestore';

export interface Submission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at: string | Timestamp;
  status?: 'New' | 'In Progress' | 'Resolved'; // if you plan to support status filtering
}

/**
 * Fetch submissions from Firestore. Currently does basic ordering; 
 * filters are applied client-side here but can be pushed into the query for scale.
 */
const fetchSubmissions = async (): Promise<Submission[]> => {
  const submissionsRef = collection(db, 'contact_submissions');
  const q = query(submissionsRef, orderBy('created_at', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      subject: data.subject || '',
      message: data.message || '',
      created_at: data.created_at || '',
      status: data.status, // optional
    } as Submission;
  });
};

export const useContactSubmissions = () => {
  return useQuery<Submission[], Error>({
    queryKey: ['contactSubmissions'],
    queryFn: fetchSubmissions,
    staleTime: 1000 * 60, // 1 minute, adjust as needed
  });
};
