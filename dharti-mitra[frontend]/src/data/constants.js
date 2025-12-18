// data/constants.js
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api/v1',
  SOIL_ANALYSIS_URL: 'http://localhost:8081/api/producer/soil-analysis-form',
  FERTILIZER_ANALYSIS_URL: 'http://localhost:8082/api/fertilizer/analyze',
  HEALTH_CARD_ANALYSIS_URL: 'http://localhost:8082/api/fertilizer/analyze-health-card',
  CHATBOT_URL: 'http://localhost:8082/api/agriculture/chat',
};

export const LANGUAGES = [
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

export const WELCOME_MESSAGES = {
  'en': 'Hello! I\'m your AI agriculture assistant. Ask me about crops, soil, fertilizers, pest control, or any farming-related questions. I can also analyze images of your plants or soil!',
  'hi': 'नमस्ते! मैं आपका AI कृषि सहायक हूं। मुझसे फसल, मिट्टी, खाद, कीड़े-मकोड़े नियंत्रण, या किसी भी खेती संबंधी प्रश्न पूछें।',
  'bn': 'নমস্কার! আমি আপনার AI কৃষি সহায়ক। আমাকে ফসল, মাটি, সার, কীটপতঙ্গ নিয়ন্ত্রণ সম্পর্কে প্রশ্ন করুন।',
  'te': 'నమస్కారం! నేను మీ AI వ్యవసాయ సహాయకుడను। పంటలు, మట్టి, ఎరువుల గురించి అడగండి।',
  'ta': 'வணக்கம்! நான் உங்கள் AI விவசாய உதவியாளர். பயிர்கள், மண், உரங்கள் பற்றி கேளுங்கள்।',
  'mr': 'नमस्कार! मी तुमचा AI शेती सहाय्यक आहे। पिके, माती, खते बद्दल विचारा।',
  'gu': 'નમસ્તે! હું તમારો AI કૃષિ સહાયક છું। પાકો, માટી, ખાતર વિશે પૂછો।',
  'kn': 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ। ಬೆಳೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ।',
  'ml': 'നമസ്കാരം! ഞാൻ നിങ്ങളുടെ AI കാർഷിക സഹായകനാണ്। വിളകളെക്കുറിച്ച് ചോദിക്കുക।',
  'pa': 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ AI ਖੇਤੀਬਾੜੀ ਸਹਾਇਕ ਹਾਂ।',
  'or': 'ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର AI କୃଷି ସହାୟକ।'
};