// components/common/WeatherWidget.jsx
import React, { useState, useEffect } from 'react';
import { 
  Cloud, Thermometer, Droplets, Wind, 
  Loader, AlertTriangle 
} from 'lucide-react';
import apiService from '../../services/api';

const WeatherWidget = ({ city: propCity }) => {
  const [weather, setWeather] = useState({
    loading: true,
    data: null,
    error: null
  });
  const [currentCity, setCurrentCity] = useState(localStorage.getItem('userCity') || propCity || '');

  useEffect(() => {
    let intervalId = null;

    const fetchWeather = async (city) => {
      if (!city) {
        setWeather({
          loading: false,
          data: null,
          error: 'Please log in or select a city'
        });
        return;
      }

      setWeather(prev => ({ ...prev, loading: true, error: null }));
      try {
        const data = await apiService.getWeather(city);
        setWeather({
          loading: false,
          data,
          error: null
        });
      } catch (error) {
        setWeather({
          loading: false,
          data: null,
          error: error.message
        });
      }
    };

    // Immediate fetch on city change
    fetchWeather(currentCity);

    // Set up interval to refresh every 15 minutes
    intervalId = setInterval(() => {
      fetchWeather(currentCity);
    }, 15 * 60 * 1000); // 15 minutes in milliseconds

    // Listen for storage changes and re-fetch
    const handleStorageChange = () => {
      const newCity = localStorage.getItem('userCity') || propCity || '';
      if (newCity !== currentCity) {
        setCurrentCity(newCity);
        fetchWeather(newCity);
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [currentCity, propCity]); // Re-run if currentCity or propCity changes

  if (weather.loading) {
    return (
      <div className="fixed top-20 right-4 bg-gradient-to-r from-green-600 to-green-500 text-white p-4 rounded-xl shadow-lg z-40">
        <div className="flex items-center space-x-2">
          <Loader className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading weather...</span>
        </div>
      </div>
    );
  }

  if (weather.error) {
    return (
      <div className="fixed top-20 right-4 bg-red-500 text-white p-4 rounded-xl shadow-lg z-40">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm">Weather unavailable: {weather.error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-20 right-4 bg-gradient-to-r from-green-600 to-green-500 text-white p-4 rounded-xl shadow-lg z-40 min-w-[200px]">
      <h4 className="flex items-center text-sm font-semibold mb-3">
        <Cloud className="h-4 w-4 mr-2" />
        Current Weather
      </h4>
      <div className="text-center font-medium mb-2">{weather.data.name}</div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Thermometer className="h-4 w-4" />
          <span className="text-sm">{weather.data.temp}°C</span>
        </div>
        <div className="flex items-center justify-between">
          <Droplets className="h-4 w-4" />
          <span className="text-sm">{weather.data.humidity}%</span>
        </div>
        <div className="flex items-center justify-between">
          <Cloud className="h-4 w-4" />
          <span className="text-sm">{weather.data.condition}</span>
        </div>
        <div className="flex items-center justify-between">
          <Wind className="h-4 w-4" />
          <span className="text-sm">{weather.data.windSpeed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;