'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth(); // could be null
  const router = useRouter();

  useEffect(() => {
    if (auth && !auth.loading && !auth.isAdmin) {
      router.replace('/login');
    }
  }, [auth, router]);

  if (!auth || auth.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
