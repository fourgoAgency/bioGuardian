'use client';
import React, { useState, useEffect } from 'react';
import { collection,  onSnapshot } from 'firebase/firestore';
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
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = collection(db, 'posts');
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const fetchedPosts = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title ?? '',
            content: data.content ?? '',
            created_at: data.created_at ?? '',
            updated_at: data.updated_at ?? data.created_at ?? '',
            excerpt: data.excerpt ?? '',
            slug: data.slug ?? '',
            category: data.category ?? '',
            image_url: data.image_url ?? '',
            author: data.author ?? '',
          };
        });
        
        // Sort posts: prioritize updated_at if it exists, otherwise use created_at
        const sortedPosts = fetchedPosts.sort((a, b) => {
          const dateA = a.updated_at ? new Date(a.updated_at) : new Date(a.created_at);
          const dateB = b.updated_at ? new Date(b.updated_at) : new Date(b.created_at);
          return dateB.getTime() - dateA.getTime();
        });
        
        setPosts(sortedPosts);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching posts:', error);
        setError('Could not load articles from the database.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
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
