
import React from 'react';
import { Map, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactInfo: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Office Information */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/20 p-8">
        <div className="flex items-center space-x-3 mb-6">
          <MapPin className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold">{t('office_information')}</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Map className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <p className="font-medium text-gray-800">{t('address')}</p>
              <p className="text-gray-600">
                Office No. SF 25-26-27<br />
                Vincy Mall, Clifton Block-9<br />
                Karachi, Pakistan
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-800">{t('phone')}</p>
              <p className="text-gray-600">Mobile: +92 334 0063616</p>
              <p className="text-gray-600">Landline: +921 33</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-800">{t('email')}</p>
              <p className="text-gray-600">info@bioguardian.net</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-800">{t('business_hours')}</p>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/20 p-8">
        <h3 className="text-xl font-bold mb-4">{t('find_us')}</h3>
        <div className="w-full h-64 rounded-2xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3620.381!2d67.0395969599404!3d24.82747510544237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2spk!4v1705000000000!5m2!1sen!2spk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="BioGuardian Office Location"
          ></iframe>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Vincy Mall, Clifton Block-9, Karachi</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
