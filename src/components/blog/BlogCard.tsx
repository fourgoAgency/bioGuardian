
import React from 'react';
import { Calendar, User, Tag } from 'lucide-react';
import Image from 'next/image';

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    excerpt: string | null;
    created_at: string;
    slug: string;
    category: string | null;
    image_url: string | null;
    author: string | null;
  };
  onClick: (slug: string) => void;
}

const BlogCard = ({ post, onClick }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryDisplayName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'womens-health': "Women's Health",
      'fertility': 'Fertility',
      'hormonal-health': 'Hormonal Health'
    };
    return categoryMap[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'womens-health': 'from-pink-500 to-rose-500',
      'fertility': 'from-green-500 to-emerald-500',
      'hormonal-health': 'from-purple-500 to-violet-500'
    };
    return colorMap[category] || 'from-blue-500 to-cyan-500';
  };

  return (
    <div
      onClick={() => onClick(post.slug)}
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
    >
      <div className="bg-white/20 backdrop-blur-md rounded-3xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
        {/* Featured Image */}
        <div className="relative h-48 overflow-hidden rounded-t-3xl">
          <Image
            src={post.image_url || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop'}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Category Badge */}
          {post.category && (
            <div className="absolute top-4 left-4">
              <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(post.category)} text-white text-xs font-medium flex items-center space-x-1 shadow-lg`}>
                <Tag className="w-3 h-3" />
                <span>{getCategoryDisplayName(post.category)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
            {post.title}
          </h3>

          {/* Meta Information */}
          <div className="flex items-center space-x-4 mb-4 text-sm text-slate-600">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>{formatDate(post.created_at)}</span>
            </div>
            {post.author && (
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4 text-green-600" />
                <span>{post.author}</span>
              </div>
            )}
          </div>

          {/* Excerpt */}
          <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
            {post.excerpt || post.content.substring(0, 150) + '...'}
          </p>

          {/* Read More Indicator */}
          <div className="mt-4 text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-200">
            Read More →
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
