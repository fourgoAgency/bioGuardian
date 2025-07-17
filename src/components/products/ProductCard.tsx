
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

export interface Product {
  id: string;
  name: string;
  composition: string;
  form: string;
  indication: string;
  price: number;
  images: string[];
  color: string;
}

interface ProductCardProps {
  product: Product;
  selectedImageIndex: number;
  onImageSelect: (imageIndex: number) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, selectedImageIndex, onImageSelect, onAddToCart }: ProductCardProps) => {
  const { t } = useLanguage();

  // Calculate discounted price (10% off) - subtract 10% from original price
  const discountAmount = Math.round(product.price * 0.1);
  const discountedPrice = product.price - discountAmount;

  // Get the appropriate colors based on product
  const getProductColors = (productId: string) => {
    switch (productId) {
      case 'sliczole':
        return {
          background: 'bg-[#e6f2ff]', // lighter version of #0371AE
          button: 'from-[#025a8a] to-[#024b75]', // darker version of #0371AE
          dot: 'bg-[#025a8a]'
        };
      case 'insotek':
        return {
          background: 'bg-orange-50',
          button: 'from-orange-500 to-orange-600',
          dot: 'bg-orange-500'
        };
      case 'agnus':
        return {
          background: 'bg-[#f0ebf7]', // lighter version of #a1367f
          button: 'from-[#8b2a6b] to-[#7a2459]', // darker version of #a1367f
          dot: 'bg-[#8b2a6b]'
        };
      case 'funzil':
        return {
          background: 'bg-[#e8f1fd]', // lighter version of #3684b3
          button: 'from-[#2a6ca8] to-[#245a92]', // darker version of #3684b3
          dot: 'bg-[#2a6ca8]'
        };
      default:
        return {
          background: 'bg-gray-50',
          button: 'from-gray-500 to-gray-600',
          dot: 'bg-gray-500'
        };
    }
  };

  const colors = getProductColors(product.id);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className={`${colors.background} p-6 text-center relative overflow-hidden`}>
        <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          10% OFF
        </div>
        <div className="relative z-10">
          <Image
            src={product.images[selectedImageIndex]}
            alt={product.name}
            className="w-32 h-32 mx-auto mb-4 object-contain drop-shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm">{product.composition}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <p className="text-gray-600 text-sm mb-1">
            <span className="font-medium">Form:</span> {product.form}
          </p>
          <p className="text-gray-600 text-sm mb-3">
            <span className="font-medium">Indication:</span> {product.indication}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-lg text-gray-500 line-through">
              PKR {product.price.toLocaleString()}
            </p>
            <p className="text-2xl font-bold text-green-600">
              PKR {discountedPrice.toLocaleString()}
            </p>
          </div>
          <p className="text-sm text-green-600 font-medium">
            Save PKR {discountAmount.toLocaleString()}
          </p>
        </div>

        {product.images.length > 1 && (
          <div className="flex justify-center space-x-2 mb-4">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => onImageSelect(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-125 ${
                  selectedImageIndex === index
                    ? `${colors.dot} scale-125 shadow-sm`
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        <Button
          onClick={() => onAddToCart(product)}
          className={`w-full bg-gradient-to-r ${colors.button} hover:opacity-90 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-105`}
        >
          {t('add_to_cart')}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
