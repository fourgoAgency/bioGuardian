'use client';
import React from 'react';
import JobApplicationsTable from '@/components/admin/JobApplicationsTable';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const JobApplicationsPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        {/* Main content */}
        <main className="flex-1 bg-gray-50 p-8">
          <JobApplicationsTable />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default JobApplicationsPage;
