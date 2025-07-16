
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const BlogLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                <Skeleton className="h-48 w-full rounded-2xl mb-4" />
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-8 w-full mb-3" />
                <div className="flex items-center space-x-4 mb-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLoading;
