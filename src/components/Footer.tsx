'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Map, Facebook, Instagram, Linkedin } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FirebaseError } from 'firebase/app';

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "newsletter_subscriptions"), { email });
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter. Welcome!",
      });
      setEmail('');
    } catch (error: unknown) {
  if (
    error instanceof Error &&
    (error as FirebaseError).code === 'already-exists'
  ) {
    toast({
      title: "Already Subscribed",
      description: "This email is already subscribed.",
    });
      } else {
        console.error('Error subscribing to newsletter:', error);
        toast({
          title: "Error",
          description: "There was an error subscribing. Please try again later.",
          variant: "destructive",
        });
      }
    }
    setLoading(false);
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Company Info */}
          <div className="md:col-span-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white p-2 rounded-lg">
                <Image 
                  src="/lovable-uploads/469ecc54-4aee-49e8-b38d-0a9632b6e97a.png" 
                  alt="BioGuardian Pharma Logo" 
                  width={56}
                  height={56}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-xl text-white font-bold">BioGuardian Pharma</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md text-sm">
              Specializing in women&#39;s health and infertility treatments. 
              Committed to providing safe, affordable, and innovative pharmaceutical solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/bioguardianpharma/" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/bioguardianpharma/" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
              <a href="https://www.linkedin.com/company/bioguardian-pharma-pvt-ltd" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 md:col-start-6">
            <h3 className="font-semibold mb-4 text-sm">Company</h3>
            <ul className="space-y-3">
              <li>
              <Link href="/about">About Us</Link>
              </li>
              <li>
              <Link href="/products">Products</Link>
              </li>
              <li>
              <Link href="/blog">Blog</Link>
              </li>
              <li>
              <Link href="/career">Career</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h3 className="font-semibold mb-4 text-sm">Join Our Newsletter</h3>
            <p className="text-gray-300 mb-4 text-sm">Stay updated with our latest news and products.</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
              <Button type="submit" disabled={loading}>
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row-reverse justify-between items-center text-sm text-gray-400">
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <a href="mailto:info@bioguardian.net" className="flex items-center space-x-2">
              <Mail size={14} />
              <span>info@bioguardian.net</span>
            </a>
            <div className="flex items-center space-x-2">
              <Map size={14} />
              <span>Karachi, Pakistan</span>
            </div>
          </div>
          <p className="mt-4 sm:mt-0">&copy; 2024 BioGuardian Pharma Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
