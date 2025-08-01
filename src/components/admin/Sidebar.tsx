"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  LayoutDashboard,
  FileText,
  Home,
  Users,
  Briefcase,
  Mail,
} from "lucide-react";
import clsx from "clsx"; // Optional but helpful for conditional classNames

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, link: "/admin" },
  { label: "Orders Received", icon: FileText, link: "/admin/orders" },
  { label: "Contact Forms Submissions", icon: Home, link: "/admin/contact-submissions" },
  { label: "Subscribers List", icon: Users, link: "/admin/newsletter-subscribers" },
  { label: "Blogs Management", icon: Home, link: "/admin/blogs" },
  { label: "Job Vacancies Management", icon: Briefcase, link: "/admin/job-listing" },
  { label: "Job Applications", icon: Mail, link: "/admin/job-applications" },
];

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/40 z-40 transition-opacity md:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

      <aside
        className={clsx(
          "fixed md:static top-0 left-0 z-50 h-full w-64 bg-white border-r p-4 transform transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        {/* Sidebar header */}
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-lg font-bold text-gray-800">BioGuardian Admin</h1>
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setOpen(false)}
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="space-y-2">
          {navItems.map(({ label, icon: Icon, link }) => {
            const isActive = pathname === link;
            return (
              <Link
                key={label}
                href={link}
                className={clsx(
                  "flex items-center gap-3 rounded px-3 py-2 transition",
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:text-black"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
