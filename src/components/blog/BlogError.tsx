
import React from 'react';
import { AlertCircle } from 'lucide-react';

const BlogError = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Error Loading Posts</h2>
            <p className="text-slate-600">We're having trouble loading the blog posts. Please try again later.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogError;
