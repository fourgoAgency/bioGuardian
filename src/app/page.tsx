
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/landing/Hero';
import Expertise from '../components/landing/Expertise';
import WhyChooseUs from '../components/landing/WhyChooseUs';
import LifeAtBioGuardian from '../components/landing/LifeAtBioGuardian';
import CallToAction from '../components/landing/CallToAction';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      <Hero />
      <Expertise />
      <WhyChooseUs />
      <LifeAtBioGuardian />
      <CallToAction />
      <Footer />
    </div>
  );
};
export default Index;
