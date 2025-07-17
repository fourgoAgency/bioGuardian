
import Image from 'next/image';
import React from 'react';

const certificationLogos = [
  { src: '/lovable-uploads/737f62a6-999d-4fcc-abdc-1c6faa7523f5.png', alt: 'Drug Regulatory Authority of Pakistan' },
  { src: '/lovable-uploads/ca0a7dd6-d178-4e5d-a134-b2c440e8c16e.png', alt: 'cGMP Certified' },
  { src: '/lovable-uploads/92b4a893-9b55-41ef-9bc5-736503fa3a27.png', alt: 'Halal Certified' },
  { src: '/lovable-uploads/5f0af627-cf43-4008-a476-cc84a5951ea5.png', alt: 'ISO 9001:2015 Certified' },
  { src: '/lovable-uploads/66d8a49e-2bd7-4e65-a0a8-5ba0f6e3cb87.png', alt: 'ISO 22000:2018 Certified' },
];

const Certifications = () => {
  return (
    <div className="py-12 bg-white rounded-2xl shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Certifications & Approvals</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {certificationLogos.map((logo, index) => (
            <div key={index} className="flex justify-center">
              <Image src={logo.src} alt={logo.alt} className="h-24 object-contain transition-transform duration-300 hover:scale-110" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
