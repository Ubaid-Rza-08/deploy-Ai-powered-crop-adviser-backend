// components/common/WeatherPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Thermometer, Cloud, Droplets, Wind, 
  BarChart3, MapPin, Loader, Phone 
} from 'lucide-react';
import apiService from '../../services/api';

const WeatherPage = () => {
  const [city, setCity] = useState(localStorage.getItem('userCity') || '');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (currentCity) => {
      if (!currentCity) return;

      setLoading(true);
      setError(null);
      try {
        const data = await apiService.getWeather(currentCity);
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const handleStorageChange = () => {
      const newCity = localStorage.getItem('userCity') || '';
      setCity(newCity);
      fetchWeather(newCity);
    };

    // Initial fetch
    fetchWeather(city);

    // Set up interval to refresh every 15 minutes
    const intervalId = setInterval(() => {
      fetchWeather(city);
    }, 15 * 60 * 1000); // 15 minutes

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [city]); // Re-fetch when city changes

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    apiService.getWeather(city)
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Weather Information
          </h2>
          <p className="text-xl text-gray-600">
            Get accurate weather data for your location
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center"
              >
                {loading ? <Loader className="h-5 w-5 animate-spin mr-2" /> : null}
                Get Weather
              </button>
            </div>
          </form>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg mb-4">
              Error: {error}
            </div>
          )}

          {loading && (
            <div className="text-center py-8">
              <Loader className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
              <p className="text-gray-600 mb-6">
                Fetching weather data for {city}...
              </p>
            </div>
          )}

          {weatherData && !loading && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Weather Information for {weatherData.name}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                  <h4 className="flex items-center text-green-600 font-semibold mb-3">
                    <Thermometer className="h-5 w-5 mr-2" />
                    Temperature
                  </h4>
                  <p className="text-3xl font-bold text-green-600 mb-1">
                    {weatherData.temp}°C
                  </p>
                  <p className="text-sm text-gray-600">
                    Feels like {weatherData.feelsLike}°C
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                  <h4 className="flex items-center text-blue-600 font-semibold mb-3">
                    <Droplets className="h-5 w-5 mr-2" />
                    Humidity
                  </h4>
                  <p className="text-3xl font-bold text-blue-600">
                    {weatherData.humidity}%
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
                  <h4 className="flex items-center text-yellow-600 font-semibold mb-3">
                    <Wind className="h-5 w-5 mr-2" />
                    Wind Speed
                  </h4>
                  <p className="text-3xl font-bold text-yellow-600">
                    {weatherData.windSpeed} m/s
                  </p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl">
                  <h4 className="flex items-center text-indigo-600 font-semibold mb-3">
                    <Cloud className="h-5 w-5 mr-2" />
                    Condition
                  </h4>
                  <p className="text-xl font-bold text-indigo-600">
                    {weatherData.condition}
                  </p>
                  <p className="text-sm text-gray-600">
                    {weatherData.description}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                  <h4 className="flex items-center text-purple-600 font-semibold mb-3">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Pressure
                  </h4>
                  <p className="text-3xl font-bold text-purple-600">
                    {weatherData.pressure} hPa
                  </p>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl">
                  <h4 className="flex items-center text-pink-600 font-semibold mb-3">
                    <MapPin className="h-5 w-5 mr-2" />
                    Location
                  </h4>
                  <p className="text-xl font-bold text-pink-600">
                    {weatherData.name}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">iOS App</h4>
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Download from App Store
            </button>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Android App</h4>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Download from Play Store
            </button>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Stay Updated with Latest Farming Tips
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for weekly farming advice, weather updates, and market insights
          </p>
          
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;