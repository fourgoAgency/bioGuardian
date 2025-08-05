"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  X,
  LayoutDashboard,
  FileText,
  Home,
  Users,
  Briefcase,
  Mail,
} from "lucide-react";
import clsx from "clsx";

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

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  return (
    <>
      {/* Mobile overlay */}
      <div
        aria-hidden={!open}
        className={clsx(
          "fixed inset-0 bg-black/40 z-40 transition-opacity md:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        aria-label="Main navigation"
        className={clsx(
          "absolute top-20 left-0 bg-white border-r shadow-md flex flex-col p-4 transition-transform duration-300",
          "w-full max-w-[16rem] md:w-64",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
          "md:z-0" // ensure sidebar is above overlay on desktop / clickable
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-bold text-gray-800">BioGuardian Admin</h1>
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto space-y-1">
          {navItems.map(({ label, icon: Icon, link }) => {
            const isActive = pathname === link;
            return (
              <Link
                key={label}
                href={link}
                className={clsx(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100 hover:text-black"
                )}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
