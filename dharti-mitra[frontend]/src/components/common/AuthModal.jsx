import React, { useState } from 'react';
import { X, Loader } from 'lucide-react';
import apiService from '../../services/api';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    area: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [weatherPreview, setWeatherPreview] = useState(null);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSendOTP = async () => {
    if (!formData.phone) {
      setMessage({ text: 'Please enter phone number', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      await apiService.sendOTP(formData.phone);
      setMessage({ text: 'OTP sent successfully!', type: 'success' });
      setAuthMode('otp');
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp || formData.otp.length !== 6) {
      setMessage({ text: 'Please enter valid 6-digit OTP', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.verifyOTP(formData.phone, formData.otp);
      const userData = {
        name: response.name || response.user?.name || 'User',
        phone: formData.phone,
        city: response.city || response.user?.city || ''
      };
      localStorage.setItem('userCity', userData.city);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      onLogin(userData, response.accessToken);
      onClose();
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!formData.name || !formData.phone || !formData.city) {
      setMessage({ text: 'Please fill all required fields', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      await apiService.signup({
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        area: formData.area
      });
      setMessage({ text: 'Account created successfully!', type: 'success' });

      const weatherResponse = await apiService.getWeather(formData.city);
      setWeatherPreview(weatherResponse);
      localStorage.setItem('userCity', formData.city); // Persist city after signup

      setTimeout(() => {
        setAuthMode('login');
        setMessage({ text: '', type: '' });
        setWeatherPreview(null);
      }, 3000);
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {authMode === 'login' && 'Welcome to DhartiMitra'}
            {authMode === 'signup' && 'Join DhartiMitra'}
            {authMode === 'otp' && 'Verify OTP'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        {message.text && (
          <div className={`p-3 rounded-lg mb-4 text-sm ${
            message.type === 'error' 
              ? 'bg-red-100 text-red-700 border border-red-200' 
              : 'bg-green-100 text-green-700 border border-green-200'
          }`}>
            {message.text}
          </div>
        )}

        {authMode === 'login' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <Loader className="h-4 w-4 animate-spin mr-2" /> : null}
              Send OTP
            </button>
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setAuthMode('signup')}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}

        {authMode === 'signup' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter your city"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area/Village
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="Enter your area"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <Loader className="h-4 w-4 animate-spin mr-2" /> : null}
              Sign Up
            </button>
            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setAuthMode('login')}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Login
              </button>
            </div>

            {weatherPreview && (
              <div className="mt-4 p-3 bg-blue-100 rounded-lg text-sm text-blue-700">
                <h4 className="font-medium mb-2">Weather Preview for {weatherPreview.name}</h4>
                <p>Temperature: {weatherPreview.temp}°C (Feels like {weatherPreview.feelsLike}°C)</p>
                <p>Condition: {weatherPreview.condition} - {weatherPreview.description}</p>
                <p>Humidity: {weatherPreview.humidity}%</p>
                <p>Wind: {weatherPreview.windSpeed} m/s</p>
              </div>
            )}
          </div>
        )}

        {authMode === 'otp' && (
          <div className="space-y-4">
            <p className="text-center text-sm text-gray-600 mb-4">
              We've sent a 6-digit code to {formData.phone}
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                placeholder="Enter 6-digit code"
                maxLength="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-center text-lg tracking-wider"
                required
              />
            </div>
            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <Loader className="h-4 w-4 animate-spin mr-2" /> : null}
              Verify OTP
            </button>
            <div className="text-center text-sm text-gray-600 space-x-4">
              <button
                onClick={handleSendOTP}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Resend OTP
              </button>
              <span>|</span>
              <button
                onClick={() => setAuthMode('login')}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Back to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;