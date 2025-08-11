'use client';
import { useState, useEffect, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import slugify from 'slugify';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';


export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'posts', id as string);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        setTitle(data.title);
        setExcerpt(data.excerpt);
        setContent(data.content);
        setCategory(data.category ?? '');
        setAuthor(data.author ?? '');
        setExistingImageUrl(data.image_url);
      } else {
        alert('Post not found');
        router.push('/admin/blogs');
      }
    };
    fetchPost();
  }, [id, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = existingImageUrl;

      // Upload only if a new file is selected
      if (image) {
        const imageRef = ref(storage, `posts/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const docRef = doc(db, 'posts', id as string);
      await updateDoc(docRef, {
        title,
        excerpt,
        content,
        category,
        author,
        slug: slugify(title, { lower: true }),
        image_url: imageUrl,
      });

      toast({ title: 'Success', description: 'Post updated successfully!' });
      router.push('/admin/blogs');
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to update post', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Edit Blog</h1>
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
              {existingImageUrl && (
                <div>
                  <p className="mb-2">Current Image:</p>
                  <Image src={existingImageUrl} alt="Current" className="w-48 rounded" width={256} height={256} />
                </div>
              )}
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                disabled={loading}
              />
              <p className="text-sm text-gray-500 mt-2">PNG, JPG, or GIF (up to 5MB)</p>
            </div>
          </div>

        </div>

        {/* Additional Options */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Additional Options</h2>
          <div className="flex items-center space-x-4">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              disabled={loading}
            />
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
                  Saving...
                </>
              ) : (
                'Update Blog'
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
