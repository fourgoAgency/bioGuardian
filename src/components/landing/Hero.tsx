
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import AnimatedCounter from './AnimatedCounter';
import Image from 'next/image';

const Hero = () => {
  return <section className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12">
          {/* Left: Text content */}
          <div className="flex-1 flex flex-col justify-center text-left">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
                  BioGuardian Pharma
                </h1>
                
                <p className="text-left text-xl text-gray-600 max-w-2xl leading-relaxed">
                  Specialized in women&#39;s health and infertility treatments. We provide safe, 
                  effective, and affordable pharmaceutical solutions across Pakistan, helping 
                  families build their dreams with our expertise in gynecology and reproductive health.
                </p>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-8 py-8">
                <div className="text-center">
                  <AnimatedCounter end={12} suffix="+" className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-3" />
                  <p className="text-gray-600 text-lg font-medium">Years of<br />Experience</p>
                </div>
                <div className="text-center">
                  <AnimatedCounter end={4} className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-3" />
                  <p className="text-gray-600 text-lg font-medium">Brand<br />Launches</p>
                </div>
                <div className="text-center">
                  <AnimatedCounter end={98} suffix="%" className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-3" />
                  <p className="text-gray-600 text-lg font-medium">Satisfaction<br />Rate</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/products">
                  <Button size="lg" className="text-white px-8 py-3 rounded-full bg-sky-600 hover:bg-sky-500">
                    Explore Products
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-50">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right: Image */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              <Image src="/lovable-uploads/38ffef0e-f269-4d70-ac89-2c38e0518b91.png" alt="Professional healthcare provider" className="w-full max-w-md object-cover h-[500px]" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default Hero;
