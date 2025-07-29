'use client';
import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import ContactSection from "@/components/about/ContactSection";
import ContactForm from "@/components/about/ContactForm";

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const {toast} = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Save to Firestore
      await addDoc(collection(db, "contact_submissions"), {
        full_name: fullName,
        email,
        message,
        created_at: Timestamp.now(),
      });

      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll get back to you soon."
      });

      // Reset form
      setFullName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("Error submitting the form.");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Contact Us!
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Contact Info + Map */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Location</h3>
                <p>Office No. SF-25-26-27, Vincy Tower, Clifton Block-9, Karachi, Pakistan</p>
              </div>
              <div>
                <Link href='https://wa.link/1bk0di'>
                <h3 className="text-xl font-semibold">Phone</h3>
                <p>+92 334 0063616</p>
                </Link>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Hours</h3>
                <p>Mon - Fri: 9:00 AM – 6:00 PM</p>
              </div>



              <iframe
                title="company-location-map"
                width="100%"
                height="250"
                className="rounded shadow"
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?q=24.82747937992193,67.0395989695417&z=15&output=embed"
              />




            </div>

            {/* Right: Contact Form */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <ContactForm/>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
