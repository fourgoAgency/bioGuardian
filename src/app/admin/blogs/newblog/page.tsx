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
import Image from 'next/image';
import Quill from 'quill';
import 'react-quill-new/dist/quill.snow.css';
import dynamic from 'next/dynamic';

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

const QuillEditor = dynamic(() => import("react-quill-new"), { ssr: false });


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

  const quillModules = {
    toolbar: [
      [{ 'font': Font.whitelist }],
      [{ 'size': Size.whitelist }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const quillFormats = [
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
      slug: slugify(title.replace(/:/g, ''), { lower: true }),
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
            <QuillEditor
            theme='snow'
            value={content}
            placeholder="Write your blog content here..."
            className="w-full border border-gray-300 rounded-lg"
            modules={quillModules}
            formats={quillFormats}
            onChange={setContent}
            />
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
              {image && (
                <div className="mb-4">
                  <p className="mb-2">Selected Image:</p>
                  <Image 
                    src={URL.createObjectURL(image)} 
                    alt="Preview" 
                    className="w-48 rounded mx-auto" 
                    width={256} 
                    height={256} 
                  />
                </div>
              )}
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
              <Label htmlFor="author">Author</Label>
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
          </div>
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
