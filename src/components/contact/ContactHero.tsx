
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactHero: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {t('contact_us')}
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        {t('contact_description')}
      </p>
    </div>
  );
};

export default ContactHero;
