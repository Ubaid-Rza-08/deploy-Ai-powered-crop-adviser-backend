// components/pages/HomePage.jsx
import React from 'react';
import { 
  Cloud, Bug, Droplets, TrendingUp, User 
} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Smart Crop Advisory for Small & Marginal Farmers
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get personalized, AI-powered advice for your crops. Increase yields, reduce costs, and farm smarter with our expert guidance.
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Free Advice
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How We Help Farmers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our smart advisory system provides actionable insights tailored to your specific farming conditions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Cloud,
                title: 'Weather Alerts',
                description: 'Get precise weather forecasts and alerts for your specific location to protect your crops.'
              },
              {
                icon: Bug,
                title: 'Pest Management',
                description: 'Identify and manage pests and diseases with eco-friendly solutions.'
              },
              {
                icon: Droplets,
                title: 'Irrigation Advice',
                description: 'Optimize water usage with smart irrigation recommendations.'
              },
              {
                icon: TrendingUp,
                title: 'Yield Prediction',
                description: 'Accurate yield forecasts to help you plan harvest and sales.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">
              Getting personalized crop advice is simple with our system
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            {[
              {
                step: '1',
                title: 'Share Your Details',
                description: 'Tell us about your crops, location, and soil type'
              },
              {
                step: '2',
                title: 'We Analyze',
                description: 'Our system processes your data with weather and market information'
              },
              {
                step: '3',
                title: 'Get Recommendations',
                description: 'Receive actionable advice on your phone via SMS or app'
              }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center max-w-xs">
                <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">
              Hear from farmers who have benefited from our advisory system
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: "The pest management advice saved my cotton crop from whitefly infestation. I was able to take action before it was too late.",
                author: "Rajesh Kumar",
                location: "Cotton Farmer, Maharashtra"
              },
              {
                text: "The irrigation advice helped me reduce water usage by 30% while maintaining my yield. This saved me money and helped the environment.",
                author: "Priya Singh",
                location: "Rice Farmer, Punjab"
              },
              {
                text: "The weather alerts warned me about unexpected rains, allowing me to harvest my wheat crop just in time. Saved me from major losses.",
                author: "Amir Khan",
                location: "Wheat Farmer, Uttar Pradesh"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;