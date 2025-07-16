'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
  [key: string]: any;
}

const Blog = () => {
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const postsRef = collection(db, 'posts');
      const q = query(postsRef, orderBy('created_at', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
    },
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <BlogLoading />
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <BlogError />
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <UpdatePcosImage />
      <Navbar />
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
      <Footer />
    </div>
  );
};

export default Blog;
