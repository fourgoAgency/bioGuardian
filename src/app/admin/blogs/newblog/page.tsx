'use client';
import { useState, FormEvent } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import slugify from 'slugify';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function AddBlogPage() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !content || !category || !author) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        variant: 'destructive'
      });
      setLoading(false);
      return;
    }
    setLoading(true);
    let imageUrl = '';
    if (image) {
      const imageRef = ref(storage, `posts/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    await addDoc(collection(db, 'posts'), {
      title,
      excerpt,
      content,
      category,
      author,
      slug: slugify(title, { lower: true }),
      image_url: imageUrl,
      created_at: Timestamp.now(),
    });

    toast({
      title: 'Blog post created successfully!',
      description: 'Your new blog post has been published.'});
    setLoading(false);
    setTitle('');
    setExcerpt('');
    setContent('');
    setCategory('');
    setAuthor('');
    setImage(null);
    router.push('/admin/blogs');
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
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                disabled={loading}
                required
              />
              <p className="text-sm text-gray-500 mt-2">PNG, JPG, or GIF (up to 5MB)</p>
            </div>
          </div>
        </div>
        {/* Additional Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Additional Details</h2>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="Enter blog category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
              required
            />
            <div className="space-y-2">
              <Label htmlFor="tags">Author</Label>
              <Input
                id="author"
                placeholder="Enter author's name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                disabled={loading}
                required
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
        </div>
      </form>
      </div>
  );
}
