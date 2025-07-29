'use client';
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import ContactForm from './ContactForm';


const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 p-8 lg:p-12 shadow-lg">
      <div className="grid lg:grid-cols-5 gap-12">
        {/* Contact Details */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-4 text-sky-600">
              {t('get_in_touch')}
            </h2>
            <p className="text-gray-600">
              {t('get_in_touch_desc')}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{t('office_address')}</h3>
                <p className="text-gray-600">
                  Office No. SF 25-26-27<br />
                  Vincy Mall, Clifton Block-9<br />
                  Karachi, Pakistan
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{t('phone_numbers')}</h3>
                <div className="space-y-1 text-gray-600">
                  <Link href='https://wa.link/1bk0di'>
                  <p>Mobile: +92 334 0063616</p>
                  </Link>
                  <a href='tel:+922133517948'>
                  <p>Landline: +92 21 335 179 48</p>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <Link href='https://mail.google.com/mail/?view=cm&fs=1&to=info@bioguardian.ne'>
                <h3 className="text-lg font-semibold text-gray-800">{t('email')}</h3>
                <p className="text-gray-600">info@bioguardian.net</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ContactForm/>
      </div> 
    </div>
  );
};

export default ContactSection;
