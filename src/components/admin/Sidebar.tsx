"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LayoutDashboard, FileText, Home, Users, Briefcase, Mail } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, link: "/admin" },
  { label: "Orders", icon: FileText, link: "/admin/orders" },
  { label: "Contacts", icon: Home, link: "/admin/contact-submissions" },
  { label: "Subscribers", icon: Users, link: "/admin/newsletter-subscribers" },
  { label: "Blogs", icon: Home, link: "/admin/blogs" },
  { label: "Jobs", icon: Briefcase, link: "/admin/job-listing" },
  { label: "Applications", icon: Mail, link: "/admin/job-applications" },
];

export default function Sidebar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed md:static top-0 left-0 z-50 h-full w-64 bg-white border-r p-4 transform transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-bold">BioGuardian Admin</h1>
        <button className="md:hidden p-2" onClick={() => setOpen(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ label, icon: Icon, link }) => {
          const isActive = pathname === link;
          return (
            <Link
              key={label}
              href={link}
              className={`flex items-center gap-3 rounded px-3 py-2 transition ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
