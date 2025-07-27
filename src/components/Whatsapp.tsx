import React from 'react';

interface WhatsappProps {
  whatsappLink?: string;
}

const Whatsapp: React.FC<WhatsappProps> = ({ whatsappLink = 'wa.link/1bk0di' }) => {
  const handleClick = () => {
    window.open(whatsappLink, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Open WhatsApp"
      className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center z-50"
      style={{ width: 56, height: 56 }}
    >
      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 448 512"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M380.9 97.1C339 55.1 283.2 32 224.1 32 100.3 32 0 132.3 0 256c0 45.1 12.4 87.1 35.9 124.4L0 480l101.7-33.6c36.6 19.9 78.2 30.4 122.4 30.4 123.7 0 224-100.3 224-224 0-59.1-23.1-114.9-65.1-156.7zM224.1 438.6c-38.7 0-74.5-12.7-103.1-34.4l-7.4-4.4-60.3 19.9 20.3-58.7-4.8-7.7c-22.9-34.9-35-75.5-35-118.3 0-114.9 93.5-208.4 208.4-208.4 55.7 0 108.1 21.7 147.6 61.2 39.5 39.5 61.2 91.9 61.2 147.6 0 114.9-93.5 208.4-208.4 208.4zm101.2-138.1c-5.5-2.7-32.5-16-37.5-17.8-5-1.9-8.6-2.7-12.2 2.7-3.6 5.5-14 17.8-17.2 21.5-3.2 3.6-6.5 4.1-12 1.4-32.5-16.3-53.8-29-75.3-65.3-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.6.9-6.7-.5-9.4-1.4-2.7-12.2-29.4-16.7-40.3-4.4-10.8-8.9-9.3-12.2-9.5-3.2-.2-6.9-.2-10.6-.2-3.6 0-9.4 1.4-14.3 6.7-4.9 5.5-18.7 18.3-18.7 44.6 0 26.3 19.2 51.7 21.9 55.3 2.7 3.6 37.8 57.7 91.8 80.9 12.8 5.5 22.8 8.8 30.6 11.2 12.8 4 24.4 3.4 33.6 2.1 10.2-1.4 32.5-13.2 37-26 4.5-12.7 4.5-23.6 3.2-26-1.3-2.6-5-4-10.5-6.7z" />
      </svg>
    </button>
  );
};

export default Whatsapp;
