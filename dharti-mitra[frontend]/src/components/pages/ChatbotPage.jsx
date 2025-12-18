import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Camera, AlertCircle } from 'lucide-react';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [language, setLanguage] = useState('en');
  const [isTyping, setIsTyping] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [sessionId] = useState(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef(null);

  const API_CONFIG = {
    CHATBOT_URL: 'http://localhost:8082/api/agriculture/chat'
  };

  const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' }
  ];

  const WELCOME_MESSAGES = {
    'en': 'Hello! I\'m your AI agriculture assistant. Ask me about crops, soil, fertilizers, pest control, or any farming-related questions. I can also analyze images of your plants or soil!',
    'hi': 'नमस्ते! मैं आपका AI कृषि सहायक हूं। मुझसे फसल, मिट्टी, खाद, कीड़े-मकोड़े नियंत्रण, या किसी भी खेती संबंधी प्रश्न पूछें।',
    'bn': 'নমস্কার! আমি আপনার AI কৃষি সহায়ক। আমাকে ফসল, মাটি, সার, কীটপতঙ্গ নিয়ন্ত্রণ সম্পর্কে প্রশ্ন করুন।',
    'te': 'నమస్కారం! నేను మీ AI వ్యవసాయ సహాయకుడను। పంటలు, మట్టి, ఎరువులు గురించి అడగండి।',
    'ta': 'வணக்கம்! நான் உங்கள் AI விவசாய உதவியாளர். பயிர்கள், மண், உரங்கள் பற்றி கேளுங்கள்।',
    'mr': 'नमस्कार! मी तुमचा AI शेती सहाय्यक आहे। पिके, माती, खते बद्दल विचारा।',
    'gu': 'નમસ્તે! હું તમારો AI કૃષિ સહાયક છું। પાકો, માટી, ખાતર વિશે પૂછો।',
    'kn': 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ। ಬೆಳೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ।',
    'ml': 'നമസ്കാരം! ഞാൻ നിങ്ങളുടെ AI കാർഷിക സഹായകനാണ്। വിളകളെക്കുറിച്ച് ചോദിക്കുക।',
    'pa': 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ AI ਖੇਤੀਬਾੜੀ ਸਹਾਇਕ ਹਾਂ।',
    'or': 'ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର AI କୃଷି ସହାୟକ।'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Add welcome message when component mounts or language changes
    setMessages([{
      id: Date.now(),
      text: WELCOME_MESSAGES[language] || WELCOME_MESSAGES['en'],
      isUser: false,
      timestamp: new Date()
    }]);
    setConnectionError(false);
  }, [language]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size too large. Please select an image under 5MB.');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      setSelectedImage(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() && !selectedImage) {
      alert('Please enter a message or select an image.');
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: inputMessage || 'Please analyze this image',
      isUser: true,
      timestamp: new Date(),
      image: selectedImage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    const currentImage = selectedImage;
    setSelectedImage(null);
    setIsTyping(true);
    setConnectionError(false);

    try {
      const formData = new FormData();
      formData.append('message', inputMessage || 'Please analyze this image');
      formData.append('sessionId', sessionId);
      formData.append('language', language);
      if (currentImage) {
        formData.append('image', currentImage);
      }

      const response = await fetch(API_CONFIG.CHATBOT_URL, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        text: data.message || data.response || 'I received your message but couldn\'t generate a proper response.',
        isUser: false,
        timestamp: new Date(),
        isSuccess: data.success
      };

      setMessages(prev => [...prev, botMessage]);

      if (!data.success) {
        setConnectionError(true);
      }

    } catch (error) {
      console.error('Chat error:', error);
      
      let errorMessage = 'Sorry, I\'m having trouble responding right now.';
      
      if (error.message.includes('Network error') || error.message.includes('fetch')) {
        errorMessage = 'Connection error: Unable to reach the AI server. Please check if the backend is running on port 8082.';
        setConnectionError(true);
      } else if (error.message.includes('500')) {
        errorMessage = 'Server error: The AI service is temporarily unavailable.';
      } else if (error.message.includes('401') || error.message.includes('403')) {
        errorMessage = 'Authentication error: Please log in again.';
      } else {
        errorMessage = `Error: ${error.message}`;
      }

      const errorBotMessage = {
        id: Date.now() + 1,
        text: errorMessage,
        isUser: false,
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorBotMessage]);
      setConnectionError(true);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const retryConnection = () => {
    setConnectionError(false);
  };

  const getPlaceholder = () => {
    const placeholders = {
      'en': 'Ask about farming, crops, soil, fertilizers...',
      'hi': 'खेती, फसल, मिट्टी, खाद के बारे में पूछें...',
      'bn': 'কৃষি, ফসল, মাটি, সার সম্পর্কে জিজ্ঞাসা করুন...',
      'te': 'వ్యవసాయం, పంటలు, మట్టి, ఎరువుల గురించి అడగండి...',
      'ta': 'விவசாயம், பயிர்கள், மண், உரங்கள் பற்றி கேளுங்கள்...',
      'mr': 'शेती, पिके, माती, खते बद्दल विचारा...',
      'gu': 'ખેતી, પાકો, માટી, ખાતર વિશે પૂછો...',
      'kn': 'ಕೃಷಿ, ಬೆಳೆಗಳು, ಮಣ್ಣು, ಗೊಬ್ಬರದ ಬಗ್ಗೆ ಕೇಳಿ...',
      'ml': 'കൃഷി, വിളകൾ, മണ്ണ്, വളം എന്നിവയെക്കുറിച്ച് ചോദിക്കുക...',
      'pa': 'ਖੇਤੀ, ਫਸਲਾਂ, ਮਿੱਟੀ, ਖਾਦ ਬਾਰੇ ਪੁੱਛੋ...',
      'or': 'କୃଷି, ଫସଲ, ମାଟି, ସାର ବିଷୟରେ ପଚାରନ୍ତୁ...'
    };
    return placeholders[language] || placeholders['en'];
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            AI Agriculture Assistant
          </h2>
          <p className="text-xl text-gray-600">
            Chat with our AI expert for instant farming advice and solutions
          </p>
        </div>

        {/* Connection Status */}
        {connectionError && (
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700 font-medium">Connection Error</span>
            </div>
            <p className="text-red-600 text-sm mt-1">
              Unable to connect to the AI service. Please ensure the backend server is running at {API_CONFIG.CHATBOT_URL}
            </p>
            <button
              onClick={retryConnection}
              className="mt-2 bg-red-600 text-white px-4 py-1 rounded text-sm hover:bg-red-700"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Language Selector */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <h4 className="flex items-center text-lg font-semibold text-green-600 mb-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              🌐
            </div>
            Select Language / भाषा चुनें
          </h4>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-sm flex flex-col h-[500px]">
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto border-b border-gray-200">
            <div className="space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-green-600 text-white rounded-br-sm'
                      : message.isError
                      ? 'bg-red-100 text-red-800 rounded-bl-sm border border-red-200'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}>
                    {message.image && (
                      <div className="mb-2">
                        <img
                          src={URL.createObjectURL(message.image)}
                          alt="Uploaded"
                          className="max-w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="flex items-start">
                      {!message.isUser && (
                        <Bot className={`h-4 w-4 mr-2 mt-0.5 flex-shrink-0 ${
                          message.isError ? 'text-red-600' : 'text-green-600'
                        }`} />
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg rounded-bl-sm">
                    <div className="flex items-center">
                      <Bot className="h-4 w-4 text-green-600 mr-2" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4">
            {selectedImage && (
              <div className="mb-3 p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-green-600">
                    <Camera className="h-4 w-4 mr-2" />
                    <span>Image selected: {selectedImage.name}</span>
                  </div>
                  <button
                    onClick={removeImage}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="mt-2 max-w-full h-20 object-cover rounded"
                />
              </div>
            )}
            
            <div className="flex space-x-2">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={getPlaceholder()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                  rows="2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2 text-sm text-gray-600"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="mt-2 inline-flex items-center text-sm text-gray-600 cursor-pointer hover:text-green-600">
                  <Camera className="h-4 w-4 mr-1" />
                  Attach Image
                </label>
              </div>
              <button
                onClick={sendMessage}
                disabled={isTyping}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Usage Tips */}
        <div className="mt-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">How to use the AI Assistant:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <ul className="space-y-2">
              <li>• Ask about crop diseases and pest management</li>
              <li>• Get soil health and fertilizer recommendations</li>
              <li>• Upload images of plants or soil for analysis</li>
            </ul>
            <ul className="space-y-2">
              <li>• Inquire about weather-based farming advice</li>
              <li>• Learn about organic farming practices</li>
              <li>• Get market price and timing suggestions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;