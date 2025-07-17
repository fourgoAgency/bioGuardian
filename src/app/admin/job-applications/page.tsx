'use client';
import React from 'react';
import JobApplicationsTable from '@/components/admin/JobApplicationsTable';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const JobApplicationsPage: React.FC = () => {
  return (
    <ProtectedRoute>
    <div style={{ padding: '20px' }}>
      <h2>Job Applications</h2>
      <JobApplicationsTable />
    </div>
    </ProtectedRoute>
  );
};

export default JobApplicationsPage;
