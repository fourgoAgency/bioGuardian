import React from 'react';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
const WhyChooseUs = () => {
  return <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6 text-gray-800">
                            Why Choose <span className="text-sky-600">BioGuardian</span>?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            With over 12 years of dedicated experience in women&#39;s health, we&#39;ve established ourselves as a trusted partner in healthcare.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">Specialized Focus</h3>
                                    <p className="text-gray-600">Dedicated exclusively to women&#39;s health and infertility treatments</p>
                                </div>
                            </div>
                            
                            
                            
                            
                            
                            <div className="flex items-start space-x-4">
                                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">Quality First</h3>
                                    <p className="text-gray-600">Commitment to safety, efficacy, and affordability</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative">
                        <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Modern pharmaceutical laboratory" className="rounded-3xl shadow-2xl" />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent rounded-3xl"></div>
                    </div>
                </div>
            </div>
        </section>;
};
export default WhyChooseUs;