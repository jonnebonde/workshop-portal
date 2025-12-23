import React from 'react';
import { Check, X, Calendar } from 'lucide-react';

const NewCasePage: React.FC = () => {
  // Mock state variables for the mockup
  const hasValidData = true;
  const lookupError = false;
  const isLooking = false;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="text-red-500 bg-gradient-to-r from-red-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse" >
         <h1 >THIS IS JUST SHOWCASING THE FIRST STEP OF THE NEW CASE CREATION GUIDE</h1>
      <h1>THIS IS NOT SUPPOSED TO WORK</h1>
      </div>
     
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Vehicle & Damage Information</h2>
        {hasValidData && <Check className="w-5 h-5 text-green-500 ml-auto" />}
      </div>
      <div className="space-y-6">
        {/* Search Form */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Search Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* VRN Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Registration Number (VRN) <span className="text-red-500">*</span>
              </label>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Enter VRN (e.g., 12 CDE)"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 ${
                    lookupError ? 'border-red-300 bg-red-50' : 
                    hasValidData ? 'border-green-300 ' : 
                    'border-gray-300'
                  }`}
                  disabled={isLooking}
                />
                {hasValidData && (
                  <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
                {lookupError && (
                  <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                )}
              </div>
            </div>

            {/* Damage Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Damage Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLooking}
              />
            </div>

            {/* Insurance Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insurance Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Aviva Insurance"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLooking}
              />
            </div>

            {/* Glass Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Glass Type <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLooking}
              >
                <option value="">Select glass type</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center">
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCasePage;