// components/pages/MarketTrackingPage.jsx
import React, { useState } from 'react';
import { Search, Loader, Plus } from 'lucide-react';
import { stateData, commodities } from '../../data/stateData';

const MarketTrackingPage = () => {
  const [formData, setFormData] = useState({
    priceArrivals: '',
    commodity: '',
    state: '',
    district: '',
    market: '',
    dateFrom: '2024-09-17',
    dateTo: '2024-09-17'
  });
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset dependent dropdowns
    if (name === 'state') {
      setFormData(prev => ({ ...prev, district: '', market: '' }));
    } else if (name === 'district') {
      setFormData(prev => ({ ...prev, market: '' }));
    }
  };

  const performSearch = () => {
    if (!formData.priceArrivals || !formData.commodity || !formData.state) {
      alert('Please fill in required fields');
      return;
    }

    setLoading(true);
    // Mock search
    setTimeout(() => {
      setSearchResults({
        message: 'No Data Found',
        data: []
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Market Price Tracking
          </h2>
          <p className="text-xl text-gray-600">
            Track agricultural commodity prices and arrivals across India using AGMARKNET
          </p>
        </div>

        {/* AGMARKNET Header */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 px-4 py-2 rounded-lg font-bold">
                GOI
              </div>
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-2 rounded-lg font-bold border-2 border-yellow-400">
                AGMARKNET
              </div>
            </div>
          </div>

          {/* Search Controls */}
          <div className="bg-white rounded-lg p-4 text-gray-800">
            <h4 className="font-semibold mb-4">Search Price & Arrivals Data</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price/Arrivals:</label>
                <select
                  name="priceArrivals"
                  value={formData.priceArrivals}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">Select</option>
                  <option value="price">Price</option>
                  <option value="arrivals">Arrivals</option>
                  <option value="both">Price & Arrivals</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Commodity:</label>
                <select
                  name="commodity"
                  value={formData.commodity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">Select</option>
                  {commodities.map(category => (
                    <optgroup key={category.category} label={category.category}>
                      {category.items.map(item => (
                        <option key={item} value={item.toLowerCase()}>{item}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">State:</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">Select</option>
                  {Object.keys(stateData).map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">District:</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  disabled={!formData.state}
                >
                  <option value="">Select District</option>
                  {formData.state && stateData[formData.state]?.districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Market:</label>
                <select
                  name="market"
                  value={formData.market}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  disabled={!formData.district}
                >
                  <option value="">Select Market</option>
                  {formData.state && formData.district && 
                   stateData[formData.state]?.markets[formData.district]?.map(market => (
                    <option key={market} value={market}>{market}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date From:</label>
                <input
                  type="date"
                  name="dateFrom"
                  value={formData.dateFrom}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date To:</label>
                <input
                  type="date"
                  name="dateTo"
                  value={formData.dateTo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={performSearch}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50 font-medium flex items-center justify-center"
                >
                  {loading ? <Loader className="h-4 w-4 animate-spin mr-2" /> : null}
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-green-600 text-white p-3">
                  <h4 className="font-semibold text-sm">Commodity-wise Graph</h4>
                </div>
                <div className="p-4 h-48 flex items-end justify-center space-x-2">
                  {[40, 60, 80, 45, 70, 55, 90, 35, 65, 75].map((height, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-t from-blue-500 to-blue-300 w-4 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-green-600 text-white p-3">
                  <h4 className="font-semibold text-sm">Market-wise Graph</h4>
                </div>
                <div className="p-4 h-48 flex items-end justify-center space-x-2">
                  {[30, 50, 70, 85, 95, 60].map((height, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-t from-orange-500 to-orange-300 w-6 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Search Results */}
            {searchResults && (
              <div className="bg-white rounded-xl shadow-sm">
                <div className="bg-green-600 text-white p-4 rounded-t-xl">
                  <h4 className="font-semibold">Search Results</h4>
                </div>
                <div className="p-6">
                  {searchResults.data.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-200 p-3 text-left text-sm font-medium">Market</th>
                            <th className="border border-gray-200 p-3 text-left text-sm font-medium">Commodity</th>
                            <th className="border border-gray-200 p-3 text-left text-sm font-medium">Price/Arrivals</th>
                            <th className="border border-gray-200 p-3 text-left text-sm font-medium">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.data.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border border-gray-200 p-3 text-sm">{row.market}</td>
                              <td className="border border-gray-200 p-3 text-sm">{row.commodity}</td>
                              <td className="border border-gray-200 p-3 text-sm">{row.price}</td>
                              <td className="border border-gray-200 p-3 text-sm">{row.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">No Data Found</h3>
                      <p className="text-gray-500">Try adjusting your search criteria</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Mandi Prices */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
                <h4 className="font-semibold">Today's Mandi Prices</h4>
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-600 mb-3">
                  <strong>All India Level Price Range (Rs./Quintal):</strong> 17-Sep-2024
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Markets Reported:</strong> 748
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Prices Reported</strong>
                </div>
              </div>
            </div>

            {/* Commodity List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-green-600 text-white p-4 text-center">
                <h4 className="font-semibold">Commodity</h4>
              </div>
              <div className="divide-y divide-gray-200">
                {commodities.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <span className="text-sm font-medium text-gray-700">{category.category}</span>
                    <Plus className="h-4 w-4 text-green-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTrackingPage;