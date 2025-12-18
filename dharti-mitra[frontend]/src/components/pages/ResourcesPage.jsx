import React, { useState } from 'react';
import { 
  BookOpen, Video, FileText, Download, 
  Search, Filter, ExternalLink, Clock,
  User, Eye, Heart, Share2, Play,
  Leaf, Droplets, Bug, TrendingUp,
  Phone, Mail
} from 'lucide-react';

const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  // const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen, color: 'green' },
    { id: 'guides', name: 'Farming Guides', icon: FileText, color: 'blue' },
    { id: 'videos', name: 'Tutorial Videos', icon: Video, color: 'purple' },
    { id: 'research', name: 'Research Papers', icon: BookOpen, color: 'indigo' },
    { id: 'tools', name: 'Tools & Calculators', icon: TrendingUp, color: 'orange' },
    { id: 'weather', name: 'Weather Resources', icon: Droplets, color: 'cyan' },
    { id: 'pest', name: 'Pest Management', icon: Bug, color: 'red' }
  ];

  const resources = [
    {
      id: 1,
      title: 'Complete Guide to Organic Farming',
      description: 'Comprehensive guide covering all aspects of organic farming from soil preparation to harvest techniques.',
      category: 'guides',
      type: 'PDF Guide',
      author: 'Dr. Rajesh Kumar',
      publishDate: '2024-08-15',
      readTime: '45 min read',
      views: 2340,
      likes: 156,
      downloadUrl: '#',
      featured: true,
      tags: ['organic', 'sustainable', 'soil-health'],
      thumbnail: '🌱'
    },
    {
      id: 2,
      title: 'Crop Rotation Strategies for Small Farms',
      description: 'Learn effective crop rotation techniques to improve soil health and maximize yields on small farming operations.',
      category: 'guides',
      type: 'Article',
      author: 'Priya Singh',
      publishDate: '2024-09-01',
      readTime: '20 min read',
      views: 1890,
      likes: 89,
      downloadUrl: '#',
      featured: false,
      tags: ['crop-rotation', 'yield', 'planning'],
      thumbnail: '🔄'
    },
    {
      id: 3,
      title: 'Modern Irrigation Techniques',
      description: 'Video tutorial covering drip irrigation, sprinkler systems, and water conservation methods.',
      category: 'videos',
      type: 'Video Tutorial',
      author: 'Agricultural Extension Team',
      publishDate: '2024-08-28',
      readTime: '32 min watch',
      views: 3456,
      likes: 234,
      downloadUrl: '#',
      featured: true,
      tags: ['irrigation', 'water-management', 'technology'],
      thumbnail: '💧'
    },
    {
      id: 4,
      title: 'Integrated Pest Management Handbook',
      description: 'Complete handbook on identifying common pests and implementing sustainable control measures.',
      category: 'pest',
      type: 'PDF Handbook',
      author: 'Dr. Anil Sharma',
      publishDate: '2024-07-20',
      readTime: '60 min read',
      views: 2789,
      likes: 198,
      downloadUrl: '#',
      featured: false,
      tags: ['pest-control', 'ipm', 'sustainable'],
      thumbnail: '🐛'
    },
    {
      id: 5,
      title: 'Seasonal Farming Calendar 2024',
      description: 'Interactive calendar showing optimal planting and harvesting times for various crops across different regions.',
      category: 'tools',
      type: 'Interactive Tool',
      author: 'DhartiMitra Team',
      publishDate: '2024-01-01',
      readTime: 'Interactive',
      views: 5678,
      likes: 423,
      downloadUrl: '#',
      featured: true,
      tags: ['calendar', 'planning', 'seasons'],
      thumbnail: '📅'
    },
    {
      id: 6,
      title: 'Weather Pattern Analysis for Agriculture',
      description: 'Research paper on climate trends and their impact on agricultural productivity in India.',
      category: 'research',
      type: 'Research Paper',
      author: 'Indian Agricultural Research Institute',
      publishDate: '2024-06-15',
      readTime: '90 min read',
      views: 1234,
      likes: 67,
      downloadUrl: '#',
      featured: false,
      tags: ['climate', 'research', 'productivity'],
      thumbnail: '🌤️'
    },
    {
      id: 7,
      title: 'Fertilizer Calculator Tool',
      description: 'Calculate optimal fertilizer requirements based on soil type, crop variety, and farm size.',
      category: 'tools',
      type: 'Calculator',
      author: 'Soil Health Team',
      publishDate: '2024-09-10',
      readTime: 'Interactive',
      views: 4567,
      likes: 312,
      downloadUrl: '#',
      featured: false,
      tags: ['fertilizer', 'soil', 'calculator'],
      thumbnail: '🧮'
    },
    {
      id: 8,
      title: 'Monsoon Preparedness Checklist',
      description: 'Essential preparations every farmer should make before the monsoon season arrives.',
      category: 'weather',
      type: 'Checklist',
      author: 'Weather Advisory Team',
      publishDate: '2024-05-30',
      readTime: '15 min read',
      views: 3890,
      likes: 267,
      downloadUrl: '#',
      featured: false,
      tags: ['monsoon', 'preparation', 'weather'],
      thumbnail: '🌧️'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  const getTypeColor = (type) => {
    const colors = {
      'PDF Guide': 'bg-red-100 text-red-800',
      'Article': 'bg-blue-100 text-blue-800',
      'Video Tutorial': 'bg-purple-100 text-purple-800',
      'PDF Handbook': 'bg-orange-100 text-orange-800',
      'Interactive Tool': 'bg-green-100 text-green-800',
      'Research Paper': 'bg-indigo-100 text-indigo-800',
      'Calculator': 'bg-yellow-100 text-yellow-800',
      'Checklist': 'bg-pink-100 text-pink-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const ResourceCard = ({ resource, isLarge = false }) => (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${isLarge ? 'md:col-span-2' : ''}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`${isLarge ? 'text-6xl' : 'text-4xl'} mb-3`}>
            {resource.thumbnail}
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
            {resource.type}
          </span>
        </div>
        
        <h3 className={`font-semibold text-gray-800 mb-2 ${isLarge ? 'text-xl' : 'text-lg'}`}>
          {resource.title}
        </h3>
        
        <p className={`text-gray-600 mb-4 ${isLarge ? 'text-base' : 'text-sm'} line-clamp-3`}>
          {resource.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {resource.author}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {resource.readTime}
            </span>
          </div>
          <span>{new Date(resource.publishDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {resource.views}
            </span>
            <span className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              {resource.likes}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
            {resource.type.includes('Video') && (
              <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                <Play className="h-4 w-4" />
              </button>
            )}
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm">
              <Download className="h-4 w-4 mr-1" />
              Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Agricultural Resources Center
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access comprehensive farming guides, research papers, video tutorials, and interactive tools to enhance your agricultural knowledge
          </p>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="text-3xl font-bold text-green-600 mb-2">50+</h3>
              <p className="text-gray-600">Expert Guides</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-green-600 mb-2">25+</h3>
              <p className="text-gray-600">Video Tutorials</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-green-600 mb-2">15+</h3>
              <p className="text-gray-600">Interactive Tools</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-green-600 mb-2">100+</h3>
              <p className="text-gray-600">Research Papers</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Search
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <h4 className="flex items-center text-lg font-semibold text-green-600 mb-4">
            <Filter className="h-5 w-5 mr-2" />
            Filter by Category
          </h4>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-lg border-2 transition-all ${
                    activeCategory === category.id
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-green-300'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Resources */}
        {activeCategory === 'all' && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Featured Resources</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="flex items-center">
                  <Leaf className="h-4 w-4 mr-1 text-green-600" />
                  Hand-picked by experts
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} isLarge={false} />
              ))}
            </div>
          </div>
        )}

        {/* All Resources */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              {activeCategory === 'all' ? 'All Resources' : categories.find(c => c.id === activeCategory)?.name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{filteredResources.length} resources found</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No resources found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with Latest Resources</h3>
          <p className="mb-6 opacity-90">
            Get notified when we publish new guides, research papers, and tools
          </p>
          
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2 border border-green-400 rounded-lg focus:ring-2 focus:ring-white focus:border-white text-gray-800"
              required
            />
            <button
              type="submit"
              className="bg-white text-green-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-white rounded-xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Need Specific Resources?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Call Us</h4>
              <p className="text-gray-600 text-sm">+91 9876543210</p>
            </div>
            
            <div className="p-4">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Email Us</h4>
              <p className="text-gray-600 text-sm">resources@dhartimitra.com</p>
            </div>
            
            <div className="p-4">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Visit Portal</h4>
              <p className="text-gray-600 text-sm">research.dhartimitra.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;