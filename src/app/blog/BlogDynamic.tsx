import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

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

const BlogDynamic = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();
  const navigate = useRouter();

  const categories = [
    { id: 'all', label: t('category_all') },
    { id: 'womens-health', label: t('category_womens_health') },
    { id: 'fertility', label: t('category_fertility') },
    { id: 'hormonal-health', label: t('category_hormonal_health') }
  ];

  useEffect(() => {
    setLoading(true);
    
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('created_at', 'desc'));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const fetchedPosts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        setPosts(fetchedPosts);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching posts:', error);
        toast({
          title: 'Error fetching posts',
          description: 'Could not load articles from the database.',
          variant: 'destructive',
        });
        setPosts([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [toast]);

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleReadMore = (slug: string) => {
    navigate.push(`/blog/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6" style={{ color: '#0078b7' }}>
              {t('health_corner')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('blog_description')}
            </p>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
            <TabsList className="grid w-full grid-cols-4 lg:w-1/2 mx-auto">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-sm">
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="text-lg text-gray-600">{t('loading_articles')}</div>
                  </div>
                ) : filteredPosts.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                      <Card key={post.id} onClick={() => handleReadMore(post.slug)} className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm overflow-hidden flex flex-col">
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={post.image_url || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop'}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex flex-col flex-grow p-6 pt-0">
                          <CardHeader className="pb-3 px-0 pt-6">
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <Calendar className="w-4 h-4 mr-2" />
                              {formatDate(post.created_at)}
                            </div>
                            <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {post.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0 px-0 flex-grow">
                            <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                              {post.excerpt || (post.content && post.content.substring(0, 150) + '...')}
                            </p>
                          </CardContent>
                          <div className="mt-auto">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleReadMore(post.slug); }}
                              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors group"
                            >
                              {t('read_more')}
                              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-lg text-gray-600">{t('no_articles')}</div>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

    </div>
  );
};

export default BlogDynamic;
