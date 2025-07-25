'use client';

import { useState } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import slugify from 'slugify';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'published' | 'draft'>('draft');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !imageFile) return alert('All fields are required');

    setLoading(true);
    try {
      const slug = slugify(title.toLowerCase(), { strict: true });
      const imageRef = ref(storage, `posts/${slug}-${Date.now()}`);
      const snap = await uploadBytes(imageRef, imageFile);
      const image_url = await getDownloadURL(snap.ref);

      await addDoc(collection(db, 'posts'), {
        title,
        slug,
        excerpt,
        content,
        image_url,
        created_at: serverTimestamp(),
        status,
      });

      alert('Blog post published!');
      router.push('/admin/blogs');
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Failed to publish post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Add New Blog Post</h1>
      <p className="text-sm text-muted-foreground">Create engaging content for your audience.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Blog Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Blog Details</h2>

          <div className="space-y-2">
            <Label htmlFor="title">Blog Title</Label>
            <Input
              id="title"
              placeholder="Enter your blog post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Blog Content</Label>
            <Textarea
              id="content"
              placeholder="Write your blog post content here..."
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              required
            />
          </div>
        </div>

        {/* Categorization & Media */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Categorization & Media</h2>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              placeholder="Short preview of your blog..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Thumbnail Image</Label>
            <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                disabled={loading}
                required
              />
              <p className="text-sm text-gray-500 mt-2">PNG, JPG, or GIF (up to 5MB)</p>
            </div>
          </div>
        </div>

        {/* Publication Settings */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Publication Settings</h2>
          <div className="flex items-center gap-4">
            <Label>Status: {status === 'draft' ? 'Draft' : 'Published'}</Label>
            <Switch
              checked={status === 'published'}
              onCheckedChange={(value) => setStatus(value ? 'published' : 'draft')}
              disabled={loading}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/blogs')}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Publishing...
              </>
            ) : (
              'Publish Blog'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
