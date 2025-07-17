
import Image from 'next/image';
import React from 'react';

const leadership = [
  {
    name: 'Dr. Muhammad Raheel',
    position: 'Chief Executive Officer',
    image: '/lovable-uploads/78114d47-68df-4eee-91a1-8d43ee333901.png'
  },
  {
    name: 'Dr. Muhammad Usman',
    position: 'Director Marketing and Sales',
    image: '/lovable-uploads/8c1980b4-4b80-42af-a112-b59a95387003.png'
  },
  {
    name: 'Dr. Atif-ur-Rehman',
    position: 'Director Finance',
    image: '/lovable-uploads/1374c8be-346b-492c-ae86-7a73d9020238.png'
  }
];

const Leadership = () => {
  return (
    <div className="mb-20">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-sky-600">
        Leadership Team
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {leadership.map((leader, index) => (
          <div key={index} className="text-center group">
            <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Image src={leader.image} alt={leader.name} width={600} height={500} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/20 hover:shadow-lg transition-all duration-200">
              <h3 className="text-xl font-semibold mb-2 text-slate-800">{leader.name}</h3>
              <p className="text-slate-600">{leader.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leadership;
