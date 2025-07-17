
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLanguage } from '@/contexts/LanguageContext';
import Link from "next/link";

const NotFound = () => {
  const location = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location
    );
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-slate-800">404</h1>
        <p className="text-xl text-slate-600 mb-4">{t('page_not_found')}</p>
        <Link href="/" className="text-blue-600 hover:text-blue-700 underline">
          {t('return_home')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
