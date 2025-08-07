import React from 'react';
import Link from 'next/link';

export default function OverviewCard({ title, Icon, value, timeframe, link }: { title: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; value: string | number; timeframe: string, link: string }) {
  return (
    <div className="bg-white shadow-xl border rounded-xl p-4 m-4">
      <Link href={link}>
      <h3 className="text-sm text-gray-500">{title}</h3>
      <div className="flex items-baseline justify-between mt-2">
        <p className="text-2xl font-bold mt-1 text-blue-600">{value}</p>
        <span className='flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full'>
        <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
        </span>
      </div>
      <span className="text-xs text-gray-400">{timeframe}</span>
      </Link>
    </div>
  );
}

