
import React from 'react';
import { Award, Users, Heart } from 'lucide-react';

const Stats = () => {
    return (
        <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{
            animationDelay: '0.1s'
            }}>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">12+</p>
                        <p className="text-sm text-gray-600">Years of Experience</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{
            animationDelay: '0.2s'
            }}>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">7</p>
                        <p className="text-sm text-gray-600">Cities Nationwide</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 animate-fade-in-up" style={{
            animationDelay: '0.3s'
            }}>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Heart className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">4</p>
                        <p className="text-sm text-gray-600">Specialized Products</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;
