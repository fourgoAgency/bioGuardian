"use client";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false); // Start closed on mobile

  // Correctly defined function
  const GotoWebsite = () => {
    window.location.href = "https://bio-guardian-tau.vercel.app";
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">

        {/* Topbar */}
        <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 md:hidden">
          {/* Hamburger Button */}
          <button
            onClick={() => setOpen(true)}
            className="p-2"
            aria-label="Open sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <button className="text-sm font-semibold" onClick={GotoWebsite}>
            Back to website
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 relative h-full">
          <Sidebar open={open} setOpen={setOpen} />

          <div className="flex-1 mt-20 mb-8 overflow-auto md:pl-64">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
