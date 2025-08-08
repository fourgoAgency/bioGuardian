
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
  const formatDate = (dateValue: string | number | { seconds: number; nanoseconds: number }) => {
  let date: Date;

  if (!dateValue) return "N/A";

  // If Firestore Timestamp
  if (typeof dateValue === "object" && "seconds" in dateValue) {
    date = new Date(dateValue.seconds * 1000);
  }
  // If it's a number (milliseconds)
  else if (typeof dateValue === "number") {
    date = new Date(dateValue);
  }
  // If it's a string
  else {
    date = new Date(dateValue);
  }

  return isNaN(date.getTime())
    ? "N/A"
    : date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
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
  className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 max-w-full overflow-x-hidden"
>
  <div className="bg-white/30 backdrop-blur-lg rounded-2xl border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">
    
    {/* Featured Image */}
    <div className="relative h-48 overflow-hidden w-full">
      <Image
        src={
          post.image_url ||
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop"
        }
        alt={post.title}
        width={400}
        height={200}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

      {/* Category Badge */}
      {post.category && (
        <div className="absolute top-4 left-4">
          <div
            className={`px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(
              post.category
            )} text-white text-xs font-medium flex items-center space-x-1 shadow-md`}
          >
            <Tag className="w-3 h-3" />
            <span>{getCategoryDisplayName(post.category)}</span>
          </div>
        </div>
      )}
    </div>

    {/* Card Content */}
    <div className="p-4 sm:p-5 flex flex-col flex-1">
      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
        {post.title}
      </h3>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3 text-sm text-slate-600">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>{formatDate(post.created_at)}</span>
        </div>
        {post.author && (
          <div className="flex items-center gap-1">
            <User className="w-4 h-4 text-green-600" />
            <span>{post.author}</span>
          </div>
        )}
      </div>

      {/* Excerpt */}
      <p className="text-slate-700 text-sm leading-relaxed line-clamp-3 flex-1">
        {post.excerpt || post.content.substring(0, 150) + "..."}
      </p>

      {/* Read More */}
      <div className="mt-4 text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-200">
        Read More →
      </div>
    </div>
  </div>
</div>

  );
};

export default BlogCard;
