// components/common/Header.jsx
import React, { useState } from 'react';
import { 
  Leaf, Home, MessageCircle, Wrench, BarChart3, 
  Cloud, Book, Menu, X, User 
} from 'lucide-react';

const Header = ({ currentPage, onPageChange, auth, onShowAuth }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'advisory', label: 'Crop Advisory', icon: Leaf },
    { id: 'equipment', label: 'Equipment', icon: Wrench },
    { id: 'chatbot', label: 'AI Chatbot', icon: MessageCircle },
    { id: 'market', label: 'Market Tracking', icon: BarChart3 },
    { id: 'weather', label: 'Weather', icon: Cloud },
    { id: 'resources', label: 'Resources', icon: Book }
  ];

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8" />
            <h1 className="text-xl font-bold">DhartiMitra</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onPageChange(id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === id 
                    ? 'bg-white/20 text-white' 
                    : 'text-green-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4 inline mr-2" />
                {label}
              </button>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {auth.isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm">Welcome, {auth.user?.name}</span>
                <button
                  onClick={auth.logout}
                  className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onShowAuth}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-400">
            <div className="flex flex-col space-y-2">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    onPageChange(id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
                    currentPage === id 
                      ? 'bg-white/20 text-white' 
                      : 'text-green-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
              {auth.isAuthenticated ? (
                <button
                  onClick={auth.logout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-green-100 hover:text-white hover:bg-white/10"
                >
                  <User className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <button
                  onClick={onShowAuth}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-green-100 hover:text-white hover:bg-white/10"
                >
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;