import React from 'react';
import InfoCard from '../InfoCard';
import { Target, Eye, Calendar, Award } from 'lucide-react';

const topInfo = [
  {
    icon: <Calendar className="w-8 h-8 text-blue-600" />,
    title: 'Our Journey',
    description: `Although founded in 2024, the team at BioGuardian Pharma represents the culmination of over 12 years of dedicated experience in women's health and infertility treatments. We've built our reputation on providing safe, effective and affordable pharmaceutical and nutraceutical solutions across Pakistan.`
  },
  {
    icon: <Award className="w-8 h-8 text-purple-600" />,
    title: 'Our Expertise',
    description: `We specialize in gynecology and infertility treatments, focusing on women's health challenges including PCOS, hormonal imbalances, fertility issues, and related conditions that affect women's quality of life.`
  }
];

const visionMissionInfo = [
  {
    icon: <Eye className="w-10 h-10 text-blue-600" />,
    title: 'Our Vision',
    description: `To be the leading pharmaceutical company in Pakistan, recognized for our commitment to women's health and infertility treatments, making quality healthcare accessible and affordable for all.`,
  },
  {
    icon: <Target className="w-10 h-10 text-purple-600" />,
    title: 'Our Mission',
    description: `To provide innovative, safe, and affordable pharmaceutical solutions that improve women's health outcomes, while maintaining the highest standards of quality, integrity, and patient care.`,
  }
];


const CompanyInfo = () => {
  return (
    <div className="mb-20">
      <div className="grid md:grid-cols-2 gap-8">
        {topInfo.map((item, index) => (
          <InfoCard key={index} icon={item.icon} title={item.title}>
            {item.description}
          </InfoCard>
        ))}
      </div>
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        {visionMissionInfo.map((item, index) => (
          <div key={index} className="p-8 bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyInfo;
