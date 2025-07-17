

import React from 'react';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const CallToAction = () => {
    return (
        <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-lg border border-gray-200/50 rounded-3xl shadow-xl overflow-hidden">
                <div className="p-12 text-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">
                                Ready to Join Our Mission?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                Be part of a team dedicated to improving women&#39;s health across Pakistan. 
                                Together, we&#39;re making quality healthcare accessible and affordable for all.
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/career">
                                <Button size="lg" className="bg-sky-600 text-white hover:bg-sky-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                                    Explore Careers
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            
                            <Link href="/contact">
                                <Button variant="outline" size="lg" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold">
                                    <Mail className="mr-2 w-5 h-5" />
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                        
                        <div className="pt-6 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-500">
                                <a href="tel:+923340063616" className="flex items-center gap-2 hover:text-sky-600 transition-colors cursor-pointer">
                                    <Phone className="w-4 h-4" />
                                    <span>+92 334 0063616</span>
                                </a>
                                <a href="mailto:info@bioguardian.net" className="flex items-center gap-2 hover:text-sky-600 transition-colors cursor-pointer">
                                    <Mail className="w-4 h-4" />
                                    <span>info@bioguardian.net</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;

