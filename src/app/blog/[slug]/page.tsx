'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

 
useEffect(() => {
  const fetchPost = async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, 'posts'),
        where('slug', '==', slug)
      );
      const querySnapshot = await getDocs(q);
      const dataArray: any[] = [];
      querySnapshot.forEach((doc) => {
        dataArray.push({ id: doc.id, ...doc.data() });
      });
      const data = dataArray[0] || null;
      if (!data) {
        throw new Error('Post not found');
      }
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast({
        title: 'Error fetching article',
        description: 'The requested article could not be loaded.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  fetchPost();
}, [slug, toast]);




  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        );
      } else if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            {paragraph.replace('### ', '')}
          </h3>
        );
      } else if (paragraph.startsWith('- ')) {
        return (
          <li key={index} className="text-gray-700 leading-relaxed ml-4">
            {paragraph.replace('- ', '')}
          </li>
        );
      } else if (paragraph.trim()) {
        return (
          <p key={index} className="text-gray-700 leading-relaxed mb-4">
            {paragraph}
          </p>
        );
      }
      return null;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        <div className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-lg text-gray-600">Loading article...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        <div className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
            <Button onClick={() => navigate.push('/blog')} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Health Corner
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <article className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button 
            onClick={() => navigate.push('/blog')} 
            variant="ghost" 
            className="mb-8 hover:bg-white/60"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Health Corner
          </Button>

          {/* Article Header */}
          <header className="mb-8">
            <div className="aspect-video mb-8 rounded-3xl overflow-hidden shadow-lg">
              <img
                src={post.image_url || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop'}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {formatDate(post.created_at)}
                </div>
                {post.author && (
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    {post.author}
                  </div>
                )}
              </div>
              
              <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-white/60">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/20 p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              {formatContent(post.content)}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 text-center">
            <Button 
              onClick={() => navigate.push('/blog')} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3"
            >
              Read More Articles
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
