'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Translations {
  [key: string]: {
    en: string;
    ur: string;
  };
}

const translations: Translations = {
  // Navigation
  'home': {
    en: 'Home',
    ur: 'گھر'
  },
  'about_us': {
    en: 'About Us',
    ur: 'ہمارے بارے میں'
  },
  'products': {
    en: 'Products',
    ur: 'مصنوعات'
  },
  'blog': {
    en: 'Blog',
    ur: 'بلاگ'
  },
  'contact': {
    en: 'Contact',
    ur: 'رابطہ'
  },
  'career': {
    en: 'Career',
    ur: 'کیریئر'
  },
  
  // Products page
  'our_products': {
    en: 'Our Products',
    ur: 'ہماری مصنوعات'
  },
  'products_description': {
    en: 'Specialized pharmaceutical solutions for women\'s health and infertility treatments, developed with over 12 years of expertise in gynecology and reproductive medicine.',
    ur: 'خواتین کی صحت اور بانجھ پن کے علاج کے لیے خصوصی دوا کے حل، 12 سال سے زیادہ کی مہارت کے ساتھ تیار کیے گئے۔'
  },
  'add_to_cart': {
    en: 'Add to Cart',
    ur: 'کارٹ میں شامل کریں'
  },
  'important_information': {
    en: 'Important Information',
    ur: 'اہم معلومات'
  },
  'prescription_required': {
    en: '• All products require a valid prescription from a licensed healthcare provider',
    ur: '• تمام مصنوعات کے لیے لائسنس یافتہ ڈاکٹر سے نسخہ ضروری ہے'
  },
  'cash_on_delivery': {
    en: '• Cash on Delivery available - Pay when you receive your order',
    ur: '• کیش آن ڈیلیوری دستیاب ہے - آرڈر ملنے پر ادائیگی کریں'
  },
  'website_info': {
    en: '• For detailed product information and availability, visit our official website at www.bioguardian.net',
    ur: '• تفصیلی معلومات کے لیے ہماری آفیشل ویب سائٹ www.bioguardian.net پر جائیں'
  },
  
  // Refund Policy
  'refund_policy': {
    en: 'Refund Policy',
    ur: 'واپسی کی پالیسی'
  },
  'return_instructions_title': {
    en: 'How to Return or Exchange a Product',
    ur: 'پروڈکٹ واپس کرنے یا بدلنے کا طریقہ'
  },
  'step_1_title': {
    en: '1. Repack the Item',
    ur: '1. آئٹم کو دوبارہ پیک کریں'
  },
  'step_1_desc': {
    en: 'Carefully pack the product you wish to return in its original packaging. Be sure to include:',
    ur: 'واپس کرنے والا پروڈکٹ کو احتیاط سے اصل پیکیجنگ میں پیک کریں۔ اس کے ساتھ شامل کریں:'
  },
  'original_invoice': {
    en: '• A copy of the original invoice',
    ur: '• اصل انوائس کی کاپی'
  },
  'return_reason': {
    en: '• A note explaining the reason for the return',
    ur: '• واپسی کی وجہ بیان کرنے والا نوٹ'
  },
  'step_2_title': {
    en: '2. Send to Our Returns Department',
    ur: '2. ہمارے ریٹرن ڈیپارٹمنٹ کو بھیجیں'
  },
  'step_2_desc': {
    en: 'Customers must arrange for the return shipment through a traceable courier service or registered post at their own expense to the following address:',
    ur: 'گاہکوں کو اپنے خرچے پر قابل تعاقب کوریئر سروس یا رجسٹرڈ پوسٹ کے ذریعے واپسی کی شپمنٹ کا بندوبست کرنا ہوگا:'
  },
  'return_address': {
    en: 'BioGuardian Pharma\nReturns Department\nOffice No. SF 25-26-27, Vincy Mall,\nClifton Block-9, Karachi, Pakistan',
    ur: 'بائیو گارڈین فارما\nریٹرن ڈیپارٹمنٹ\nآفس نمبر SF 25-26-27، ونسی مال،\nکلفٹن بلاک-9، کراچی، پاکستان'
  },
  'return_phone': {
    en: 'Phone: 0334-0063616',
    ur: 'فون: 0334-0063616'
  },
  'return_hours': {
    en: 'Hours: Monday to Saturday, 9:00 AM – 5:00 PM',
    ur: 'اوقات: پیر سے ہفتہ، صبح 9:00 بجے – شام 5:00 بجے'
  },
  'additional_info': {
    en: 'Additional Information',
    ur: 'اضافی معلومات'
  },
  'shipping_nonrefundable': {
    en: '• Shipping charges are non-refundable',
    ur: '• شپنگ چارجز واپس نہیں کیے جائیں گے'
  },
  'refund_processing': {
    en: '• Refunds will be processed within 7 business days of receiving the returned item(s)',
    ur: '• واپسی کی رقم 7 کاروباری دنوں میں واپس کر دی جائے گی'
  },
  'keep_receipt': {
    en: '• Keep your courier receipt and tracking information for your records',
    ur: '• اپنی کوریئر رسید اور ٹریکنگ معلومات محفوظ رکھیں'
  },
  'support_contact': {
    en: 'For assistance or further inquiries, please contact our support team at info@bioguardian.net',
    ur: 'مدد یا مزید استفسارات کے لیے ہماری سپورٹ ٹیم سے info@bioguardian.net پر رابطہ کریں'
  },
  
  // Home page translations
  'home_title': {
    en: 'Advancing Women\'s Health Through Innovation',
    ur: 'جدت کے ذریعے خواتین کی صحت میں ترقی'
  },
  'welcome_subtitle': {
    en: 'Leading pharmaceutical company specializing in gynecology and reproductive medicine with over 12 years of expertise.',
    ur: '12 سال سے زیادہ کی مہارت کے ساتھ گائناکولوجی اور تولیدی طب میں مہارت رکھنے والی معروف فارماسیوٹیکل کمپنی۔'
  },
  'learn_more': {
    en: 'Learn More',
    ur: 'مزید جانیں'
  },
  'view_products': {
    en: 'View Products',
    ur: 'مصنوعات دیکھیں'
  },
  
  // About page translations
  'about_title': {
    en: 'About BioGuardian Pharma',
    ur: 'بائیو گارڈین فارما کے بارے میں'
  },
  'about_description': {
    en: 'Leading innovation in women\'s health and pharmaceutical excellence.',
    ur: 'خواتین کی صحت اور فارماسیوٹیکل امتیاز میں جدت کی قیادت۔'
  },
  'get_in_touch': {
    en: 'Get in Touch',
    ur: 'رابطہ کریں'
  },
  'get_in_touch_desc': {
    en: 'We\'re here to help and answer any question you might have. We look forward to hearing from you.',
    ur: 'ہم یہاں مدد کرنے اور آپ کے کسی بھی سوال کا جواب دینے کے لیے موجود ہیں۔ ہم آپ سے سننے کے منتظر ہیں۔'
  },
  'office_address': {
    en: 'Office Address',
    ur: 'دفتر کا پتہ'
  },
  'phone_numbers': {
    en: 'Phone Numbers',
    ur: 'فون نمبرز'
  },
  'first_name': {
    en: 'First Name',
    ur: 'پہلا نام'
  },
  'last_name': {
    en: 'Last Name',
    ur: 'آخری نام'
  },
  'email_id': {
    en: 'Email ID',
    ur: 'ای میل آئی ڈی'
  },
  'query_type': {
    en: 'Query Type',
    ur: 'سوال کی قسم'
  },
  'query': {
    en: 'Query',
    ur: 'سوال'
  },
  
  // Contact page translations
  'contact_us': {
    en: 'Contact Us',
    ur: 'ہم سے رابطہ کریں'
  },
  'contact_description': {
    en: 'Get in touch with our team for any inquiries about our products, services, or partnerships. We\'re here to help you with your healthcare needs.',
    ur: 'ہماری مصنوعات، خدمات، یا شراکت داری کے بارے میں کسی بھی استفسار کے لیے ہماری ٹیم سے رابطہ کریں۔ ہم یہاں آپ کی صحت کی ضروریات میں مدد کے لیے ہیں۔'
  },
  'send_message': {
    en: 'Send us a Message',
    ur: 'ہمیں پیغام بھیجیں'
  },
  'full_name': {
    en: 'Full Name',
    ur: 'پورا نام'
  },
  'email_address': {
    en: 'Email Address',
    ur: 'ای میل ایڈریس'
  },
  'phone_number': {
    en: 'Phone Number',
    ur: 'فون نمبر'
  },
  'subject': {
    en: 'Subject',
    ur: 'موضوع'
  },
  'message': {
    en: 'Message',
    ur: 'پیغام'
  },
  'send': {
    en: 'Send Message',
    ur: 'پیغام بھیجیں'
  },
  'office_information': {
    en: 'Office Information',
    ur: 'دفتری معلومات'
  },
  'address': {
    en: 'Address',
    ur: 'پتہ'
  },
  'phone': {
    en: 'Phone',
    ur: 'فون'
  },
  'email': {
    en: 'Email',
    ur: 'ای میل'
  },
  'business_hours': {
    en: 'Business Hours',
    ur: 'کاروباری اوقات'
  },
  'find_us': {
    en: 'Find Us',
    ur: 'ہمیں تلاش کریں'
  },
  
  // Blog page translations
  'health_corner': {
    en: 'Health Corner',
    ur: 'صحت کا کونہ'
  },
  'blog_description': {
    en: 'Stay updated with the latest insights, tips, and developments in women\'s health, fertility, and wellness.',
    ur: 'خواتین کی صحت، زرخیزی اور تندرستی میں جدید بصیرت، تجاویز اور پیش رفت سے باخبر رہیں۔'
  },
  'read_more': {
    en: 'Read More',
    ur: 'مزید پڑھیں'
  },
  'loading_articles': {
    en: 'Loading articles...',
    ur: 'مضامین لوڈ کر رہے ہیں...'
  },
  'no_articles': {
    en: 'No articles available in this category yet.',
    ur: 'اس کیٹگری میں ابھی تک کوئی مضمون دستیاب نہیں۔'
  },
  'category_all': {
    en: 'All',
    ur: 'سب'
  },
  'category_womens_health': {
    en: 'Women\'s Health',
    ur: 'خواتین کی صحت'
  },
  'category_fertility': {
    en: 'Fertility',
    ur: 'زرخیزی'
  },
  'category_hormonal_health': {
    en: 'Hormonal Health',
    ur: 'ہارمونل صحت'
  },
  
  // Checkout page translations
  'checkout': {
    en: 'Checkout',
    ur: 'چیک آؤٹ'
  },
  'checkout_description': {
    en: 'Complete your order with cash on delivery',
    ur: 'کیش آن ڈیلیوری کے ساتھ اپنا آرڈر مکمل کریں'
  },
  
  // Career Page
  'career_opportunities': {
    en: 'Career Opportunities',
    ur: 'کیریئر کے مواقع'
  },
  'career_description': {
    en: 'Join our mission to advance women\'s health and make a meaningful impact in pharmaceutical healthcare. Discover exciting career opportunities with BioGuardian Pharma.',
    ur: 'خواتین کی صحت کو آگے بڑھانے اور فارماسیوٹیکل ہیلتھ کیئر میں ایک بامعنی اثر ڈالنے کے ہمارے مشن میں شامل ہوں۔ بائیو گارڈین فارما کے ساتھ کیریئر کے دلچسپ مواقع دریافت کریں۔'
  },
  'open_positions': {
    en: 'Open Positions',
    ur: 'خالی آسامیاں'
  },
  
  // 404 page translations
  'page_not_found': {
    en: 'Oops! Page not found',
    ur: 'اوپس! صفحہ نہیں ملا'
  },
  'return_home': {
    en: 'Return to Home',
    ur: 'گھر واپس جائیں'
  }
};

interface LanguageContextType {
  language: 'en' | 'ur';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'ur'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ur' : 'en');
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
