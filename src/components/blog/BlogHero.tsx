
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const BlogHero = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-5xl font-bold" style={{ color: '#0078b7' }}>
          {t('health_corner')}
        </h1>
      </div>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
        {t('blog_description')}
      </p>
    </div>
  );
};

export default BlogHero;
