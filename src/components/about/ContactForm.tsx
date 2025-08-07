'use client';

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Send } from 'lucide-react';
import { db } from '@/lib/firebase';
import { useLanguage } from '@/contexts/LanguageContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ContactFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  queryType: string;
  query: string;
}

export default function ContactForm() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      queryType: "",
      query: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const submissionData = {
        name: `${data.firstName} ${data.lastName}`.trim(),
        email: data.email,
        phone: data.phoneNumber,
        subject: data.queryType || 'General Inquiry',
        message: data.query,
        created_at: serverTimestamp() // ✅ Add Firestore server timestamp
      };

      await addDoc(collection(db, "contact_submissions"), submissionData);

      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll get back to you soon."
      });

      form.reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:col-span-3">
      <div className="flex items-center gap-3 mb-6">
        <Send className="w-6 h-6 text-sky-600" />
        <h3 className="text-2xl font-semibold text-gray-800">{t('send_message')}</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('first_name')} *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('last_name')}</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter last name" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('phone_number')} *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email_id')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="queryType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('query_type')}</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isSubmitting}
                    {...field}
                  >
                    <option value="">Select query type</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="support">Support</option>
                    <option value="other">Other</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('query')}</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your message" className="min-h-[120px]" disabled={isSubmitting} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Sending...' : t('send')}
          </Button>
        </form>
      </Form>
    </div>
  );
}
