
import Image from 'next/image';
import React from 'react';
const LifeAtBioGuardian = () => {
  return <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 text-gray-800">Life at BioGuardian Pharma</h2>
                    <p className="text-xl text-gray-600">Discover what makes our workplace special</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                    <Image src="/lovable-uploads/579bfa3c-9a57-467f-8992-a7bf2a610317.png" alt="Culture at BioGuardian" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-end p-8">
                        <div className="text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl font-bold mb-3">Culture</h3>
                        <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            Integrity, respect, and patient-centric values embedded in every decision.
                        </p>
                        </div>
                    </div>
                    </div>

                    <div className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                    <Image src="/lovable-uploads/4b062a20-d525-4dd2-ae0e-eb818392a7a1.png" alt="Growth at BioGuardian" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-end p-8">
                        <div className="text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl font-bold mb-3">Growth</h3>
                        <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            Mentorship opportunities, clear advancement tracks, recognition for impact.
                        </p>
                        </div>
                    </div>
                    </div>

                    <div className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                    <Image src="/lovable-uploads/ac7f47d5-432d-41c4-bf15-f75de6f2d95b.png" alt="Wellness at BioGuardian" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-end p-8">
                        <div className="text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl font-bold mb-3">Wellness</h3>
                        <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            Work-life balance support, mental-health resources, thriving workforce.
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>;
};
export default LifeAtBioGuardian;
