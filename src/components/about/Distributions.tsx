
import React from 'react';
import { MapPin } from 'lucide-react';

const distributionCities = ['Karachi', 'Nawabshah', 'Quetta', 'Peshawar', 'Mardan', 'Abbottabad', 'Swat'];

const Distributions = () => {
  return (
    <div className="mb-20">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-sky-600">
        Distributions
      </h2>
      <div className="p-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/20">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <MapPin className="w-8 h-8 text-blue-600" />
          <h3 className="text-2xl font-semibold text-sky-600">Serving Pakistan</h3>
        </div>
        <p className="text-center text-gray-600 mb-8">
          We currently operate in the southern and northern regions of Pakistan, with established presence in key cities 
          to ensure our products reach those who need them most.
        </p>
        
        {/* City List */}
        <div className="grid md:grid-cols-4 gap-4">
          {distributionCities.map((city, index) => (
            <div key={index} className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl h-16">
              <span className="font-medium text-gray-700">{city}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Distributions;
