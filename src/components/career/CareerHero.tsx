
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const CareerHero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {t('career_opportunities')}
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        {t('career_description')}
      </p>
    </div>
  );
};

export default CareerHero;
