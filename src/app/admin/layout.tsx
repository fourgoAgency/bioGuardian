"use client";

import React from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/admin/Sidebar";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>
    <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
    {children}
    </div></div>
    </ProtectedRoute>
    
    ;
}
