
import React from 'react';
import Hero from '../../components/about/Hero';
import CompanyInfo from '../../components/about/CompanyInfo';
import Leadership from '../../components/about/Leadership';
import Distributions from '../../components/about/Distributions';
import ContactSection from '../../components/about/ContactSection';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Hero />
          <CompanyInfo />
          <Leadership />
          <Distributions />
          <ContactSection />
        </div>
      </section>
    </div>
  );
};

export default About;
