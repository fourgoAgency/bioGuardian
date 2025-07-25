'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import UpdatePcosImage from '@/components/UpdatePcosImage';
import BlogHero from '@/components/blog/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogEmpty from '@/components/blog/BlogEmpty';
import BlogLoading from '@/components/blog/BlogLoading';
import BlogError from '@/components/blog/BlogError';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  excerpt: string;
  slug: string;
  category: string;
  image_url: string;
  author: string;
  [key: string]: unknown;
}

const Blog = () => {
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const q = query(collection(db, 'posts'), orderBy('created_at', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title ?? '',
          content: data.content ?? '',
          created_at: data.created_at ?? '',
          excerpt: data.excerpt ?? '',
          slug: data.slug ?? '',
          category: data.category ?? '',
          image_url: data.image_url ?? '',
          author: data.author ?? '',
        };
      }) as Post[];
    },
  });

  if (isLoading) {
    return (
      <>

        <BlogLoading />

      </>
    );
  }

  if (error) {
    return (
      <>
        <BlogError />

      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <UpdatePcosImage />

      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <BlogHero />
          {posts && posts.length > 0 ? (
            <BlogGrid posts={posts} />
          ) : (
            <BlogEmpty />
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
