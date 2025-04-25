'use client';

import { useTranslation } from 'next-intl';
import { useState } from 'react';
import Layout from '../../../components/Layout';

export default function AIAssistantPage() {
  const t = useTranslation('common');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: t('ai.welcome') }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const newMessages = [
      ...messages,
      { role: 'user', content: input }
    ];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      // In a real implementation, this would call an API to get the AI response
      const aiResponse = generateAIResponse(input);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: aiResponse }
      ]);
      setIsLoading(false);
    }, 1500);
  };
  
  // Simple AI response generator for demonstration
  const generateAIResponse = (userInput) => {
    const userInputLower = userInput.toLowerCase();
    
    if (userInputLower.includes('wine') || userInputLower.includes('wein')) {
      return t('ai.responses.wine');
    } else if (userInputLower.includes('bike') || userInputLower.includes('fahrrad')) {
      return t('ai.responses.biking');
    } else if (userInputLower.includes('hotel') || userInputLower.includes('stay') || userInputLower.includes('accommodation')) {
      return t('ai.responses.hotels');
    } else if (userInputLower.includes('restaurant') || userInputLower.includes('food') || userInputLower.includes('eat')) {
      return t('ai.responses.restaurants');
    } else if (userInputLower.includes('activity') || userInputLower.includes('do') || userInputLower.includes('see')) {
      return t('ai.responses.activities');
    } else {
      return t('ai.responses.default');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              {t('ai.title')}
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
              {t('ai.subtitle')}
            </p>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Chat messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs md:max-w-md rounded-lg p-4 ${
                        message.role === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-lg p-4">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input area */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-end space-x-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t('ai.inputPlaceholder')}
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={2}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isLoading}
                    className={`p-3 rounded-lg ${
                      !input.trim() || isLoading
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {t('ai.disclaimer')}
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {t('ai.suggestions.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => setInput(t('ai.suggestions.wine'))}
                  className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  {t('ai.suggestions.wine')}
                </button>
                <button 
                  onClick={() => setInput(t('ai.suggestions.biking'))}
                  className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  {t('ai.suggestions.biking')}
                </button>
                <button 
                  onClick={() => setInput(t('ai.suggestions.hotels'))}
                  className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  {t('ai.suggestions.hotels')}
                </button>
                <button 
                  onClick={() => setInput(t('ai.suggestions.restaurants'))}
                  className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  {t('ai.suggestions.restaurants')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
