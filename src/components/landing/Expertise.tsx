
import React from 'react';
import { Heart, Stethoscope } from 'lucide-react';

const Expertise = () => {
    return (
        <section className="py-20 px-4 bg-white/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-6 text-gray-800">
                    Our <span className="text-sky-600">Expertise</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Specialized in women&#39;s health and infertility treatments with over a decade of experience
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Heart className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Women&#39;s Health</h3>
                    <p className="text-gray-600">Comprehensive solutions for PCOS, hormonal imbalances, and reproductive health challenges.</p>
                    </div>

                    <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Stethoscope className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Infertility Treatment</h3>
                    <p className="text-gray-600">Advanced pharmaceutical solutions supporting fertility treatments and reproductive wellness.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Expertise;
