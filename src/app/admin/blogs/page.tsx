'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  context: string;
  slug: string;
  image_url: string;
  created_at: string;
  excerpt: string;
}

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const data: BlogPost[] = querySnapshot.docs.map((doc) => {
          const blog = doc.data();
          return {
            id: doc.id,
            title: blog.title,
            context: blog.context,
            slug: blog.slug,
            image_url: blog.image_url,
            created_at: blog.created_at?.toDate().toISOString().split('T')[0] || '',
            excerpt: blog.excerpt,
          };
        });
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog post?');
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await deleteDoc(doc(db, 'posts', id));
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog.');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header and Add Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Blogs Management</h1>
        <Link href="/admin/blogs/newblog" className="ml-auto w-fit">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Blog Post
          </Button>
        </Link>
      </div>

      {/* Search Input */}
      <Input
        placeholder="Search by blog title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2"
      />

      {/* Blog Cards */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
        </div>
      ) : filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No blogs found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <Card key={blog.id} className="flex flex-col justify-between h-full">
              <CardContent className="p-4 flex flex-col gap-3">
                {/* Image */}
                <div className="w-full h-36 relative rounded-md overflow-hidden bg-gray-100">
                  {blog.image_url ? (
                    <Image
                      src={blog.image_url}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-center text-gray-400 text-sm flex items-center justify-center h-full">
                      No image
                    </div>
                  )}
                </div>

                {/* Title and Meta */}
                <h2 className="font-semibold text-lg leading-tight">{blog.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-2">{blog.excerpt}</p>
                <p className="text-xs text-gray-500">Created on {blog.created_at}</p>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <Link href={`/admin/blogs/edit/${blog.slug}`} className="w-full">
                    <Button size="sm" variant="outline" className="w-full">
                      View / Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="w-full"
                    disabled={deletingId === blog.id}
                    onClick={() => handleDelete(blog.id)}
                  >
                    {deletingId === blog.id ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      'Delete'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
