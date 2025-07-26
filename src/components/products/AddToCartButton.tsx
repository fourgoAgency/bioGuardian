'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from './ProductCard';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: AddToCartButtonProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    const discountAmount = Math.round(product.price * 0.1);
    const discountedPrice = product.price - discountAmount;

    addToCart({
      id: product.id,
      name: product.name,
      composition: product.composition,
      form: product.form,
      image: product.mainImage,
      price: discountedPrice,
    });

    toast({
      title: 'Added to Cart!',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`bg-gray-800 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition ${className ?? ''}`}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
