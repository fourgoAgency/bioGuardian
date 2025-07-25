'use client';
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import CartDrawer from '@/components/cart/CartDrawer';
import ProductCard from '@/components/products/ProductCard';
import ProductInfo from '@/components/products/ProductInfo';
import { products } from '@/data/products';
import Certifications from '@/components/products/Certifications';
import ProductSlider from '@/components/products/ProductSlider';
import AddToCartButton from '@/components/products/AddToCartButton';

const Products = () => {
  const { t } = useLanguage();

  const [selectedImages, setSelectedImages] = React.useState(
    products.reduce((acc, _, index) => {
      acc[index] = 0;
      return acc;
    }, {} as Record<number, number>)
  );

  const handleImageSelect = (productIndex: number, imageIndex: number) => {
    setSelectedImages(prev => ({
      ...prev,
      [productIndex]: imageIndex
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      <CartDrawer />
      
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-sky-600">
              {t('our_products')}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('products_description')}
            </p>
            <div className="mt-6 inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full font-medium">
              🎉 Special Offer: 10% OFF on all products!
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {products.map((product, index) => (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  selectedImageIndex={selectedImages[index]}
                  onImageSelect={(imageIndex) => handleImageSelect(index, imageIndex)}
                />
                <AddToCartButton product={product} className="mt-2 w-full" />
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mb-12">
            <Certifications />
          </div>

          {/* Product Slider */}
          <div className="mb-12">
            <ProductSlider />
          </div>

          {/* Product Information Note */}
          <ProductInfo />
        </div>
      </section>


    </div>
  );
};

export default Products;
