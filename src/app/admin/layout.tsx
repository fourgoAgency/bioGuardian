// In your layout/root component
"use client";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">

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


