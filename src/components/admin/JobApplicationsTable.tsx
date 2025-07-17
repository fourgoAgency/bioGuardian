import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
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
}

const fetchApplications = async (): Promise<Application[]> => {
  console.log("fetchApplications called");
  const appsRef = collection(db, 'job_applications');
  const q = query(appsRef, orderBy('created_at', 'desc'));
  const querySnapshot = await getDocs(q);
  console.log("querySnapshot:", querySnapshot);

  if (querySnapshot.empty) {
    console.log("No documents found in job_applications collection");
    return [];
  }

  const data = querySnapshot.docs.map(doc => ({
    ...(doc.data() as Application),
    id: doc.id,
  }));
  console.log("Fetched applications data:", data);
  return data;
};

const formatDate = (created_at: Timestamp) => {
  if (created_at && created_at.seconds) {
    return new Date(created_at.seconds * 1000).toLocaleString();
  }
  return "N/A";
};
const safeRender = (value: string): string => {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return "N/A";
  try {
    return JSON.stringify(value);
  } catch {
    return "N/A";
  }
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
            <TableBody>
              {applications?.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.name || "N/A"}</TableCell>
                  <TableCell>
                    {app.email || "N/A"}<br />
                    {app.phone || "N/A"}
                  </TableCell>
                  <TableCell>{app.position || "N/A"}</TableCell>
                  <TableCell>{safeRender(app.experience)}</TableCell>
                  <TableCell>{app.education || "N/A"}</TableCell>
                  <TableCell>{app.cover_letter || "N/A"}</TableCell>
                  <TableCell>
                    {app.resume_url ? (
                      <a href={app.resume_url} target="_blank" rel="noopener noreferrer">
                        View Resume
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell className="text-right">{formatDate(app.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default JobApplicationsTable;
