// components/common/Footer.jsx
import React from 'react';
import { 
  Facebook, Twitter, Instagram, Youtube, 
  Phone, Users, MapPin 
} from 'lucide-react';

const Footer = ({ onPageChange }) => {
  const footerSections = [
    {
      title: 'DhartiMitra',
      content: (
        <>
          <p className="text-gray-400 mb-4">
            Empowering small and marginal farmers with smart crop advisory services for sustainable agriculture.
          </p>
          <div className="flex space-x-4">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer"
              >
                <Icon className="h-5 w-5" />
              </div>
            ))}
          </div>
        </>
      )
    },
    {
      title: 'Quick Links',
      content: (
        <ul className="space-y-2">
          {[
            { id: 'home', label: 'Home' },
            { id: 'advisory', label: 'Crop Advisory' },
            { id: 'equipment', label: 'Equipment' },
            { id: 'chatbot', label: 'AI Chatbot' },
            { id: 'market', label: 'Market Tracking' },
            { id: 'weather', label: 'Weather' }
          ].map(link => (
            <li key={link.id}>
              <button
                onClick={() => onPageChange(link.id)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      )
    },
    {
      title: 'Contact Us',
      content: (
        <ul className="space-y-2 text-gray-400">
          <li className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            +91 9876543210
          </li>
          <li className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            info@dhartimitra.com
          </li>
          <li className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Agriculture Center, New Delhi
          </li>
        </ul>
      )
    }
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              {section.content}
            </div>
          ))}
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2023 DhartiMitra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer