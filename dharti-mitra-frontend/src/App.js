import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
// import WeatherWidget from './components/common/WeatherWidget';
import AuthModal from './components/common/AuthModal';
import HomePage from './components/pages/HomePage';
import CropAdvisoryPage from './components/pages/CropAdvisoryPage';
import EquipmentPage from './components/pages/EquipmentPage';
import ChatbotPage from './components/pages/ChatbotPage';
import MarketTrackingPage from './components/pages/MarketTrackingPage';
import WeatherPage from './components/pages/WeatherPage';
import ResourcesPage from './components/pages/ResourcesPage';
import { useAuth } from './hooks/useAuth';

const DhartiMitra = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const auth = useAuth();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'advisory':
        return <CropAdvisoryPage />;
      case 'equipment':
        return <EquipmentPage />;
      case 'chatbot':
        return <ChatbotPage />;
      case 'market':
        return <MarketTrackingPage />;
      case 'weather':
        return <WeatherPage />;
      case 'resources':
        return <ResourcesPage />;
      default:
        return <HomePage />;
    }
  };

  const handleLogin = (userData, token) => {
    auth.login(userData, token);
    setShowAuthModal(false);
  };

  useEffect(() => {
    if (auth.user?.city) {
      localStorage.setItem('userCity', auth.user.city);
    }
  }, [auth.user?.city]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        auth={auth}
        onShowAuth={() => setShowAuthModal(true)}
      />
      {/* <WeatherWidget city={auth.user?.city} /> */}
      <main>
        {renderPage()}
      </main>
      <Footer onPageChange={setCurrentPage} />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default DhartiMitra;