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
import dynamic from 'next/dynamic';
import "react-quill-new/dist/quill.snow.css";
import Quill from "quill";

// ✅ Define proper type for Quill formats
interface QuillFormat {
  whitelist: string[];
}

// ✅ Fonts
const Font = Quill.import("formats/font") as QuillFormat;
Font.whitelist = [
  "arial",
  "times-new-roman",
  "courier-new",
  "georgia",
  "poppins",
  "roboto",
  "montserrat",
  "verdana",
  "tahoma",
  "serif",
  "sans-serif",
  "monospace",
];
Quill.register("formats/font", Font);


// ✅ Font Sizes
const Size = Quill.import("formats/size") as QuillFormat;
Size.whitelist = ["small", "normal", "large", "huge"];
Quill.register("formats/size", Size);

// ✅ Dynamic Import of ReactQuill
const QuillEditor = dynamic(() => import("react-quill-new"), { ssr: false });

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

  const quillModules = {
    toolbar: [
      [{ 'font': Font.whitelist }],
      [{ 'size': Size.whitelist }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const quillFormats = [
    'font', 'size',
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list',
    'indent',
    'direction',
    'align',
    'link', 'image', 'video'
  ];

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
        slug: slugify(title.replace(/:/g, ''), { lower: true }),
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
            <div className="border rounded-md">
              <QuillEditor
                value={content}
                onChange={setContent}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Write your blog post content here..."
                className="h-96"
              />
            </div>
            <style jsx global>{`
              .ql-editor {
                min-height: 300px;
                font-size: 16px;
                line-height: 1.6;
              }
              .ql-container {
                font-size: 16px;
              }
              /* Quill font labels */
              .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="arial"]::before,
              .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="arial"]::before {
                content: "Arial";
                font-family: Arial, sans-serif;
              }

              .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="times-new-roman"]::before,
              .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="times-new-roman"]::before {
                content: "Times New Roman";
                font-family: "Times New Roman", serif;
              }

              .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="courier-new"]::before,
              .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="courier-new"]::before {
                content: "Courier New";
                font-family: "Courier New", monospace;
              }

              .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="georgia"]::before,
              .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="georgia"]::before {
                content: "Georgia";
                font-family: Georgia, serif;
              }

              .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="poppins"]::before,
              .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="poppins"]::before {
                content: "Poppins";
                font-family: var(--font-poppins), sans-serif;
              }

              .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="roboto"]::before,
              .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="roboto"]::before {
                content: "Roboto";
                font-family: var(--font-roboto), sans-serif;
              }

              .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="montserrat"]::before,
              .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="montserrat"]::before {
                content: "Montserrat";
                font-family: var(--font-montserrat), sans-serif;
              }

              .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="verdana"]::before,
              .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="verdana"]::before {
                content: "Verdana";
                font-family: Verdana, sans-serif;
              }

              .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="tahoma"]::before,
              .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="tahoma"]::before {
                content: "Tahoma";
                font-family: Tahoma, sans-serif;
              }

              /* Ensure fonts are applied to editor content */
              .ql-editor.ql-font-arial {
                font-family: Arial, sans-serif;
              }

              .ql-editor.ql-font-times-new-roman {
                font-family: "Times New Roman", serif;
              }

              .ql-editor.ql-font-courier-new {
                font-family: "Courier New", monospace;
              }

              .ql-editor.ql-font-georgia {
                font-family: Georgia, serif;
              }

              .ql-editor.ql-font-poppins {
                font-family: var(--font-poppins), sans-serif;
              }

              .ql-editor.ql-font-roboto {
                font-family: var(--font-roboto), sans-serif;
              }

              .ql-editor.ql-font-montserrat {
                font-family: var(--font-montserrat), sans-serif;
              }

              .ql-editor.ql-font-verdana {
                font-family: Verdana, sans-serif;
              }

              .ql-editor.ql-font-tahoma {
                font-family: Tahoma, sans-serif;
              }

              .ql-editor.ql-font-serif {
                font-family: serif;
              }

              .ql-editor.ql-font-sans-serif {
                font-family: sans-serif;
              }

              .ql-editor.ql-font-monospace {
                font-family: monospace;
              }
            `}</style>
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
              rows={4}
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
          <div className="flex justify-end gap-2 mt-16">
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
// end of file