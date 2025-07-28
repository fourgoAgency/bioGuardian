"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <ProtectedRoute>
    <div className="flex">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Overlay for Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar (Navbar already hai, isliye sirf hamburger button dikhayenge mobile par) */}
        <div className="md:hidden p-3 border-b bg-white">
          <button onClick={() => setOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
    </ProtectedRoute>
  );
}
