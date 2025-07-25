'use client';

import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CartProvider } from '@/contexts/CartContext';
import QueryProvider from './providers/QueryProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import Whatsapp from '@/components/Whatsapp';

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

const ClientLayoutWrapper = ({ children }: ClientLayoutWrapperProps) => {
  return (
    <LanguageProvider>
      <CartProvider>
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            <CartDrawer />
            {children}
            <Whatsapp />
            <Footer />
          </AuthProvider>
        </QueryProvider>
      </CartProvider>
    </LanguageProvider>
  );
};

export default ClientLayoutWrapper;
