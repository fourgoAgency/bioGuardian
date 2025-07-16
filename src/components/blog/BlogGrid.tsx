'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import BlogCard from './BlogCard';

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  created_at: string;
  slug: string;
  category: string | null;
  image_url: string | null;
  author: string | null;
}

interface BlogGridProps {
  posts: Post[];
}

const BlogGrid = ({ posts }: BlogGridProps) => {
  const navigate = useRouter();

  const handleCardClick = (slug: string) => {
    navigate.push(`/blog/${slug}`);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogCard 
          key={post.id} 
          post={post} 
          onClick={handleCardClick} 
        />
      ))}
    </div>
  );
};

export default BlogGrid;
