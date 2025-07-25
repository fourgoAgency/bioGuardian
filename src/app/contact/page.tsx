'use client';
import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("Sending...");

  try {
    // 1. Save to Firestore
    await addDoc(collection(db, "contact_submissions"), {
      full_name: fullName,
      email,
      message,
      created_at: Timestamp.now(),
    });

    // 2. Redirect to Gmail compose with pre-filled email
    const subject = encodeURIComponent("Contact Form Submission from " + fullName);
    const body = encodeURIComponent(`Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`);
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@bioguardian.net&su=${subject}&body=${body}`;

    window.location.href = mailtoUrl;

    setStatus("Redirecting to Gmail...");

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
                <h3 className="text-xl font-semibold">Phone</h3>
                <p>+92 334 0063616</p>
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
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Comments / Query</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full"
                >
                  Submit
                </button>
                {status && (
                  <p className="text-sm text-green-600 mt-2">{status}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
