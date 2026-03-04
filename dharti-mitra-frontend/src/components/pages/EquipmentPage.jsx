// components/pages/EquipmentPage.jsx
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { equipmentData } from '../../data/equipmentData';

const EquipmentPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredEquipment, setFilteredEquipment] = useState(equipmentData);

  useEffect(() => {
    const filtered = equipmentData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredEquipment(filtered);
  }, [searchTerm, selectedCategory]);

  const viewDetails = (equipment) => {
    alert(`Viewing details for: ${equipment.name}\n\nThis would typically open a detailed product page with specifications, images, and purchase options.`);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Farming Equipment Marketplace
          </h2>
          <p className="text-xl text-gray-600">
            Find the best agricultural equipment for your farming needs
          </p>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-3xl font-bold text-green-600 mb-2">12</h3>
              <p className="text-gray-600">Equipment Categories</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-green-600 mb-2">150+</h3>
              <p className="text-gray-600">Available Products</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-green-600 mb-2">24/7</h3>
              <p className="text-gray-600">Customer Support</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'tractor', label: 'Tractors' },
                { id: 'harvester', label: 'Harvesters' },
                { id: 'tools', label: 'Tools' }
              ].map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-green-300'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEquipment.map((equipment, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-green-50 to-green-100 h-40 flex items-center justify-center text-6xl border-2 border-green-100">
                {equipment.emoji}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {equipment.name}
                </h3>
                <div className="text-2xl font-bold text-green-600 mb-3">
                  {equipment.price}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {equipment.description}
                </p>
                <button
                  onClick={() => viewDetails(equipment)}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No equipment found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentPage;