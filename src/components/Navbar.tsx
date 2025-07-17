'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, Globe, LogOut } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const { state, toggleCart } = useCart();
  const authContext = useAuth();
  const isAdmin = authContext?.isAdmin ?? false;

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/about', label: t('about_us') },
    { path: '/products', label: t('products') },
    { path: '/blog', label: t('blog') },
    { path: '/contact', label: t('contact') },
    { path: '/career', label: t('career') },
  ];

  const isActive = (path: string) => pathname === path;

  const cartItemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
      router.push('/login');
    } catch (error: unknown) {
  if (error instanceof Error) {
    toast.error('Logout failed: ' + error.message);
  } else {
    toast.error('Logout failed: An unknown error occurred.');
  }
    }
    setIsOpen(false);
  };

  const linkClassName = (active: boolean) =>
    cn(
      "text-sm font-medium transition-colors rounded-md px-3 py-2",
      active
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground hover:text-foreground"
    );

  const mobileLinkClassName = (active: boolean) =>
    cn(
      "block text-base font-medium transition-colors rounded-md px-3 py-2",
      active
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground hover:text-foreground"
    );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image 
              src="/lovable-uploads/469ecc54-4aee-49e8-b38d-0a9632b6e97a.png" 
              alt="BioGuardian Pharma Logo" 
              className="w-14 h-14 object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={linkClassName(isActive(link.path))}
              >
                {link.label}
              </Link>
            ))}
             {isAdmin && (
              <Link
                href="/admin"
                className={linkClassName(isActive('/admin'))}
              >
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {isAdmin && (
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-6 h-6" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg border-b">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={mobileLinkClassName(isActive(link.path))}
                >
                  {link.label}
                </Link>
              ))}
               {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className={mobileLinkClassName(isActive('/admin'))}
                >
                  Admin
                </Link>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="w-full flex items-center justify-center space-x-2 mt-2"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">Language: {language.toUpperCase()}</span>
              </Button>
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 mt-2 text-destructive hover:text-destructive"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Logout</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
