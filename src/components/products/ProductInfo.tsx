
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductInfo = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Important Information Section */}
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-2xl">
        <h3 className="text-lg font-semibold mb-3 text-yellow-800">{t('important_information')}</h3>
        <p className="text-yellow-700 text-sm mb-2">
          {t('cash_on_delivery')}
        </p>
        <p className="text-yellow-700 text-sm">
          {t('website_info')}
        </p>
      </div>

      {/* Refund Policy Section */}
      <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4 text-blue-800">{t('refund_policy')}</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">{t('return_instructions_title')}</h4>
          </div>
          
          <div>
            <h5 className="font-medium text-blue-700 mb-1">{t('step_1_title')}</h5>
            <p className="text-blue-700 text-sm mb-2">{t('step_1_desc')}</p>
            <p className="text-blue-700 text-sm mb-1">{t('original_invoice')}</p>
            <p className="text-blue-700 text-sm mb-3">{t('return_reason')}</p>
          </div>

          <div>
            <h5 className="font-medium text-blue-700 mb-1">{t('step_2_title')}</h5>
            <p className="text-blue-700 text-sm mb-2">{t('step_2_desc')}</p>
            <div className="bg-white p-3 rounded border border-blue-200 mb-2">
              <p className="text-blue-700 text-sm whitespace-pre-line">{t('return_address')}</p>
              <p className="text-blue-700 text-sm mt-1">{t('return_phone')}</p>
              <p className="text-blue-700 text-sm">{t('return_hours')}</p>
            </div>
          </div>

          <div>
            <h5 className="font-medium text-blue-700 mb-2">📌 {t('additional_info')}</h5>
            <p className="text-blue-700 text-sm mb-1">{t('shipping_nonrefundable')}</p>
            <p className="text-blue-700 text-sm mb-1">{t('refund_processing')}</p>
            <p className="text-blue-700 text-sm mb-3">{t('keep_receipt')}</p>
          </div>

          <div className="pt-2 border-t border-blue-200">
            <p className="text-blue-700 text-sm">
              {t('support_contact')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
