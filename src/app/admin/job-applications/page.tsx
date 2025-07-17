'use client';
import React from 'react';
import JobApplicationsTable from '@/components/admin/JobApplicationsTable';

const JobApplicationsPage: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Job Applications</h2>
      <JobApplicationsTable />
    </div>
  );
};

export default JobApplicationsPage;
