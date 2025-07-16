
import React from 'react';
import { BookOpen } from 'lucide-react';

const BlogEmpty = () => {
  return (
    <div className="text-center py-16">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 shadow-xl p-12 max-w-md mx-auto">
        <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold text-slate-700 mb-4">No Posts Yet</h3>
        <p className="text-slate-500 leading-relaxed">Check back soon for new articles and insights about health and wellness.</p>
      </div>
    </div>
  );
};

export default BlogEmpty;
