'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.loading) {
      // Redirect if not logged in OR not admin
      if (!auth?.user || !auth?.isAdmin) {
        router.replace('/login');
      }
    }
  }, [auth?.loading, auth?.user, auth?.isAdmin, router]);

  if (auth?.loading || !auth?.user || !auth?.isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
