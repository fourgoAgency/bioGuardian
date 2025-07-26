'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import AddToCartButton from './AddToCartButton';

export interface Product {
  id: string;
  name: string;
  category: string;
  type: string;
  composition: string;
  form: string;
  indication: string;
  price: number;
  mainImage:string;
  images: string[];
  color: string;
  description: string;
  dosage: string;
  ingredients: {
    name: string;
    benefit: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
}

interface ProductDetailClientProps {
  product: Product;
}

const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [product.images.length]);

  return (
    <div className="max-w-6xl m-16 px-4 py-8 ">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Carousel and Usage */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="flex flex-col-reverse md:flex-row gap-4 items-start">
            <div className="flex md:flex-col flex-row md:gap-2 gap-4 overflow-x-auto md:overflow-visible">
              {product.images.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt="Thumbnail"
                  width={80}
                  height={80}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`cursor-pointer border rounded ${selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                />
              ))}
            </div>
            <div className="flex-1 w-full">
              <Image
                src={product.images[selectedImageIndex]}
                alt="Selected Product"
                width={500}
                height={500}
                onClick={() => setIsLightboxOpen(true)}
                className="rounded-lg border object-cover w-full h-auto transition-transform duration-300 hover:scale-105 cursor-zoom-in"
              />
              {isLightboxOpen && (
                <Lightbox
                  open={isLightboxOpen}
                  close={() => setIsLightboxOpen(false)}
                  slides={product.images.map((img) => ({ src: img }))}
                  index={selectedImageIndex}
                  on={{
                    view: ({ index }) => setSelectedImageIndex(index),
                  }}
                />
              )}
            </div>
          </div>


          {/* Usage Instructions */}
          <div className="mt-6 text-left">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Usage Instructions</h2>
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="dosage">
                <AccordionTrigger>Recommended Dosage</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">{product.dosage}</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="storage">
                <AccordionTrigger>Storage Instructions</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">Store in a cool, dry place away from direct sunlight.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="warnings">
                <AccordionTrigger>Important Warnings</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">Consult your healthcare provider before use if pregnant or nursing.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 space-y-4 text-left">
          <span className="text-sm text-blue-800 bg-blue-100 font-medium p-1 border-blue-400 border-2 rounded-full">BioGuardian Pharma</span>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-700 max-w-2xl">{product.description}</p>
          <div className="flex items-center gap-2 text-xl">
            <span className="line-through text-gray-500">PKR {product.price.toFixed(0)}</span>
            <span className="text-green-700 font-bold text-2xl">
              PKR {(product.price * 0.9).toFixed(0)}
            </span>
          </div>

          <AddToCartButton product={product} className="w-full" />

          {/* Ingredients */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2 text-left">Composition / Ingredients</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {product.ingredients.map((item, i) => (
                <li key={i}>
                  <strong>{item.name}</strong>: {item.benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="mt-12 text-left">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {product.faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700">{faq.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default ProductDetailClient;
