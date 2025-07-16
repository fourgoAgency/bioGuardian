'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import CartDrawer from '@/components/cart/CartDrawer';
import ProductCard, { Product } from '@/components/products/ProductCard';
import ProductInfo from '@/components/products/ProductInfo';
import { products } from '@/data/products';
import Certifications from '@/components/products/Certifications';
import ProductSlider from '@/components/products/ProductSlider';

const Products = () => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const { toast } = useToast();

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

  const handleAddToCart = (product: Product) => {
    // Apply 10% discount - subtract 10% from original price
    const discountAmount = Math.round(product.price * 0.1);
    const discountedPrice = product.price - discountAmount;
    
    addToCart({
      id: product.id,
      name: product.name,
      composition: product.composition,
      form: product.form,
      image: product.images[0],
      price: discountedPrice
    });

    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
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
              <ProductCard
                key={product.id}
                product={product}
                selectedImageIndex={selectedImages[index]}
                onImageSelect={(imageIndex) => handleImageSelect(index, imageIndex)}
                onAddToCart={handleAddToCart}
              />
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

      <Footer />
    </div>
  );
};

export default Products;
