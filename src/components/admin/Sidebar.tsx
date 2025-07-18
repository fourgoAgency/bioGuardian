import { Home, Users, FileText, Briefcase, Mail, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Logo from '@/../public/Logo png.png'
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Sidebar() {
  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, link: '/admin' },
    { label: "Orders", icon: FileText, link: '/admin/orders' },
    { label: "Contacts", icon: Home, link: '/admin/contact-submissions' },
    { label: "Subscribers", icon: Users, link: '/admin/newsletter-subscribers' },
    { label: "Blogs", icon: Home, link: '/admin/blogs' },
    { label: "Jobs", icon: Briefcase, link: '/admin/job-listing' },
    { label: "Applications", icon: Mail, link: '/admin/job-applications' }
  ];
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-white border-r h-full p-4 hidden md:block mr-4">
  <div className="flex items-center mb-6">
    <Image src={Logo} alt="BioGuardian Logo" className="w-12 h-auto mb-6 m-3" />
    <h1 className="text-xl font-bold mb-6">BioGuardian Admin</h1>
  </div>
  <nav className="space-y-4">
    {navItems.map(({ label, icon: Icon, link }) => {
      
      const isActive = pathname === link;

      return (
        <div
          key={label}
          className={`flex items-center gap-3 cursor-pointer rounded px-3 py-2 ${
            isActive ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700 hover:text-black"
          }`}
        >
          <Link href={link} className="flex gap-2 items-center w-full">
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        </div>
      );
    })}
  </nav>
</aside>
  );
}
