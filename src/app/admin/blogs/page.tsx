'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
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
  created_at: Date | null;
  updated_at?: Date | null;
  excerpt: string;
}

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        let data: BlogPost[] = querySnapshot.docs.map((docSnap) => {
          const blog = docSnap.data();
          return {
            id: docSnap.id,
            title: blog.title || '',
            context: blog.context || '',
            slug: blog.slug || '',
            image_url: blog.image_url || '',
            created_at: blog.created_at ? blog.created_at.toDate() : null,
            updated_at: blog.updated_at ? blog.updated_at.toDate() : null,
            excerpt: blog.excerpt || '',
          };
        });

        // ✅ Sort by updated_at (desc), then fallback to created_at (desc)
        data = data.sort((a, b) => {
          const aTime = a.updated_at?.getTime() || a.created_at?.getTime() || 0;
          const bTime = b.updated_at?.getTime() || b.created_at?.getTime() || 0;
          return bTime - aTime; // newest first
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
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      {/* Header and Add Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Blogs Management</h1>
        <Link href="/admin/blogs/newblog" className="w-full md:w-auto">
          <Button className="w-full md:w-fit">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <p className="text-xs text-gray-500">
                  {blog.updated_at
                    ? `Updated on ${blog.updated_at.toLocaleDateString()}`
                    : blog.created_at
                    ? `Created on ${blog.created_at.toLocaleDateString()}`
                    : 'No date'}
                </p>

                {/* Actions */}
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full"
                  >
                    Edit
                  </Button>

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
