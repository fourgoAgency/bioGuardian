
import React from 'react';

interface InfoCardProps {
  icon: React.ReactElement;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, children, className = '' }) => {
  return (
    <div className={`p-8 bg-slate-50 backdrop-blur-sm rounded-3xl border border-slate-200 h-full hover:shadow-lg transition-all duration-200 ${className}`}>
        <div className="flex items-center space-x-3 mb-4">
          {icon}
          <h3 className="text-2xl font-semibold text-slate-800">{title}</h3>
        </div>
        <p className="text-slate-600">{children}</p>
    </div>
  );
};

export default InfoCard;
