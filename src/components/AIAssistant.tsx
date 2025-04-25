import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';

// Types for our AI assistant
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface VacationPreferences {
  dates?: string;
  duration?: string;
  people?: string;
  interests?: string[];
  budget?: string;
  accommodation?: string;
  activities?: string[];
}

export default function AIAssistant() {
  const { t } = useTranslation('common');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your vacation planning assistant for the Wachau, Krems, and Kamptal regions. How can I help you plan your perfect trip?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [vacationPreferences, setVacationPreferences] = useState<VacationPreferences>({
    interests: [],
    activities: []
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Process user input and generate AI response
  const processUserInput = (userInput: string): string => {
    // Extract information from user input
    const lowerInput = userInput.toLowerCase();
    
    // Update vacation preferences based on user input
    const updatedPreferences = { ...vacationPreferences };
    
    // Extract dates
    if (lowerInput.includes('date') || lowerInput.includes('when') || lowerInput.includes('time')) {
      const dateRegex = /(\d{1,2}(st|nd|rd|th)?\s+(of\s+)?(january|february|march|april|may|june|july|august|september|october|november|december)|(\d{1,2})[\/\.-](\d{1,2})[\/\.-](\d{2,4}))/i;
      const dateMatch = userInput.match(dateRegex);
      if (dateMatch) {
        updatedPreferences.dates = dateMatch[0];
      }
    }
    
    // Extract duration
    if (lowerInput.includes('day') || lowerInput.includes('week') || lowerInput.includes('duration') || lowerInput.includes('long')) {
      const durationRegex = /(\d+)\s*(day|days|week|weeks)/i;
      const durationMatch = userInput.match(durationRegex);
      if (durationMatch) {
        updatedPreferences.duration = durationMatch[0];
      }
    }
    
    // Extract number of people
    if (lowerInput.includes('people') || lowerInput.includes('person') || lowerInput.includes('traveler') || lowerInput.includes('traveller') || lowerInput.includes('guest')) {
      const peopleRegex = /(\d+)\s*(people|person|persons|travelers|travellers|guests)/i;
      const peopleMatch = userInput.match(peopleRegex);
      if (peopleMatch) {
        updatedPreferences.people = peopleMatch[1];
      }
    }
    
    // Extract interests
    const interestKeywords = {
      wine: ['wine', 'vineyard', 'winery', 'tasting'],
      biking: ['bike', 'biking', 'cycling', 'bicycle'],
      hiking: ['hike', 'hiking', 'walk', 'walking', 'trail'],
      culture: ['culture', 'history', 'museum', 'castle', 'abbey'],
      food: ['food', 'culinary', 'restaurant', 'dining', 'gastronomy'],
      relaxation: ['relax', 'relaxation', 'spa', 'wellness', 'peaceful']
    };
    
    Object.entries(interestKeywords).forEach(([interest, keywords]) => {
      if (keywords.some(keyword => lowerInput.includes(keyword)) && 
          !updatedPreferences.interests?.includes(interest)) {
        updatedPreferences.interests = [...(updatedPreferences.interests || []), interest];
      }
    });
    
    // Extract budget preference
    if (lowerInput.includes('budget') || lowerInput.includes('cost') || lowerInput.includes('price') || lowerInput.includes('expensive') || lowerInput.includes('cheap')) {
      if (lowerInput.includes('luxury') || lowerInput.includes('high-end') || lowerInput.includes('expensive')) {
        updatedPreferences.budget = 'luxury';
      } else if (lowerInput.includes('moderate') || lowerInput.includes('mid-range') || lowerInput.includes('average')) {
        updatedPreferences.budget = 'moderate';
      } else if (lowerInput.includes('budget') || lowerInput.includes('cheap') || lowerInput.includes('affordable') || lowerInput.includes('inexpensive')) {
        updatedPreferences.budget = 'budget';
      }
    }
    
    // Extract accommodation preference
    if (lowerInput.includes('accommodation') || lowerInput.includes('hotel') || lowerInput.includes('stay') || lowerInput.includes('room')) {
      if (lowerInput.includes('hotel')) {
        updatedPreferences.accommodation = 'hotel';
      } else if (lowerInput.includes('guesthouse') || lowerInput.includes('guest house') || lowerInput.includes('pension')) {
        updatedPreferences.accommodation = 'guesthouse';
      } else if (lowerInput.includes('apartment') || lowerInput.includes('flat')) {
        updatedPreferences.accommodation = 'apartment';
      }
    }
    
    // Update the state with extracted preferences
    setVacationPreferences(updatedPreferences);
    
    // Generate response based on user input and updated preferences
    return generateResponse(lowerInput, updatedPreferences);
  };

  // Generate AI response based on user input and preferences
  const generateResponse = (input: string, preferences: VacationPreferences): string => {
    // Check if user is asking about specific topics
    if (input.includes('wine') || input.includes('vineyard') || input.includes('winery')) {
      return 'The Wachau, Krems, and Kamptal regions are famous for their wines, especially Grüner Veltliner and Riesling. I can recommend wine tastings at Domäne Wachau, FJ Gritsch, or one of the many Heurigen (wine taverns) in the area. Would you like me to include wine tastings in your itinerary?';
    } 
    
    if (input.includes('bike') || input.includes('cycling') || input.includes('bicycle')) {
      return 'Biking along the Danube in the Wachau Valley is a wonderful experience! The Danube Bike Path is flat and well-maintained, perfect for all skill levels. The total distance is about 25 kilometers (15 miles) from Krems to Melk. Would you like me to suggest a biking route and bike rental options for your trip?';
    } 
    
    if (input.includes('hotel') || input.includes('stay') || input.includes('accommodation')) {
      return 'There are several excellent accommodations in the region. Hotel Schloss Dürnstein offers historic ambience in a 400-year-old castle, while Steigenberger Hotel & Spa in Krems provides modern luxury with panoramic views. For a more artistic stay, arte Hotel Krems is located in the arts district. What type of accommodation are you looking for?';
    } 
    
    if (input.includes('restaurant') || input.includes('eat') || input.includes('food') || input.includes('dining')) {
      return 'The region offers excellent dining options, from award-winning restaurants to traditional wine taverns. Restaurant Richard Löwenherz and Alter Klosterkeller in Dürnstein are highly recommended, as is Restaurant Loibnerhof-Knoll. Would you like me to make restaurant recommendations based on your preferences?';
    } 
    
    if (input.includes('activity') || input.includes('do') || input.includes('see') || input.includes('visit')) {
      return 'Besides wine tasting and biking, you can visit historic sites like Melk Abbey, Göttweig Abbey, and Dürnstein Castle ruins. The region also offers hiking on the Wachau World Heritage Trail, boat tours on the Danube, and cultural attractions like the Caricature Museum in Krems. What activities interest you most?';
    }
    
    if (input.includes('cost') || input.includes('price') || input.includes('budget') || input.includes('expensive')) {
      return 'The cost of your vacation will depend on your preferences for accommodation, dining, and activities. A moderate budget would be around €150-200 per person per day, including accommodation, meals, and activities. Luxury options can exceed €300 per day, while budget-conscious travelers can manage with €100-120 per day. Would you like a detailed cost breakdown based on your preferences?';
    }
    
    if (input.includes('itinerary') || input.includes('plan') || input.includes('schedule')) {
      // If we have enough preferences, suggest an itinerary
      if (preferences.duration || preferences.interests?.length) {
        return `Based on your preferences, I'd recommend a ${preferences.duration || '4-day'} itinerary focusing on ${preferences.interests?.join(', ') || 'wine and biking'}. Would you like me to create a detailed day-by-day plan for you?`;
      } else {
        return 'I'd be happy to suggest an itinerary for you. How many days are you planning to stay, and what are your main interests?';
      }
    }
    
    // If we have collected several preferences, summarize them
    if (Object.values(preferences).filter(Boolean).length >= 3) {
      let summary = 'Based on our conversation, I understand you're interested in:';
      if (preferences.dates) summary += `\n- Traveling on: ${preferences.dates}`;
      if (preferences.duration) summary += `\n- Staying for: ${preferences.duration}`;
      if (preferences.people) summary += `\n- Group size: ${preferences.people} people`;
      if (preferences.interests?.length) summary += `\n- Interests: ${preferences.interests.join(', ')}`;
      if (preferences.budget) summary += `\n- Budget level: ${preferences.budget}`;
      if (preferences.accommodation) summary += `\n- Preferred accommodation: ${preferences.accommodation}`;
      if (preferences.activities?.length) summary += `\n- Activities: ${preferences.activities.join(', ')}`;
      
      summary += '\n\nIs this correct? Would you like me to create a vacation plan based on these preferences?';
      return summary;
    }
    
    // Default response if no specific topic is detected
    return 'I can help you plan all aspects of your vacation in the Wachau, Krems, and Kamptal regions, including accommodations, dining, activities, and transportation. What specific aspects of your trip would you like assistance with?';
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const newMessages = [
      ...messages,
      { role: 'user', content: input }
    ];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    
    // Process user input and generate response
    setTimeout(() => {
      const response = processUserInput(input);
      setMessages([...newMessages, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-xl font-semibold">
              {t('planner.title')} - AI Assistant
            </h2>
          </div>
          
          <div className="h-96 overflow-y-auto p-4 space-y-4" id="chat-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                    message.role === 'user' 
                      ? 'bg-blue-100 text-gray-800' 
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t p-4 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about planning your vacation..."
              className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className={`px-4 py-2 rounded-r-lg ${
                !input.trim() || isLoading
                  ? 'bg-gray-300 text-gray-500'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Send
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 border-t">
            <p className="text-sm text-gray-600">
              This AI assistant can help you plan your vacation in the Wachau, Krems, and Kamptal regions. 
              Ask about accommodations, dining, activities, wine tastings, biking routes, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
