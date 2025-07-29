import React from 'react';
import Image from 'next/image';
import Whatsapp_image from '@/../public/Whatsapp.png'

interface WhatsappProps {
  whatsappLink?: string;
}

const Whatsapp: React.FC<WhatsappProps> = ({ whatsappLink = 'https://wa.link/1bk0di' }) => {
  const handleClick = () => {
    window.open(whatsappLink, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Open WhatsApp"
      className="fixed bottom-4 right-4 rounded-full shadow-lg flex items-center justify-center z-50"
    >
      <Image src={Whatsapp_image} alt='whatsapp icon' width={56} height={56} className='rounded-full'/>
    </button>
  );
};

export default Whatsapp;
