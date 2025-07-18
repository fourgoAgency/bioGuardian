'use client';
import React from 'react';
import JobApplicationsTable from '@/components/admin/JobApplicationsTable';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/admin/Sidebar';

const JobApplicationsPage: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 bg-gray-50 p-8">
          <JobApplicationsTable />
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default JobApplicationsPage;
