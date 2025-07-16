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
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  created_at: string;
}

const fetchApplications = async (): Promise<Application[]> => {
  const appsRef = collection(db, 'job_applications');
  const q = query(appsRef, orderBy('created_at', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Application),
  }));
};

const JobApplicationsTable = () => {
  const { data: applications, isLoading, error } = useQuery<Application[]>({
    queryKey: ['jobApplications'],
    queryFn: fetchApplications,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Applications</CardTitle>
        <CardDescription>
          A list of all job applications submitted.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="p-4 text-center">Loading applications...</div>
        ) : error ? (
          <div className="p-4 text-red-500 text-center">Error fetching applications: {error.message}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Education</TableHead>
                <TableHead>Cover Letter</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead className="text-right">Applied At</TableHead>
              </TableRow>
            </TableHeader>
