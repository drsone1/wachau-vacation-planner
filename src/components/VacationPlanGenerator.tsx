import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function VacationPlanGenerator() {
  const { t } = useTranslation('common');
  const [preferences, setPreferences] = useState({
    dates: '',
    duration: '',
    people: '',
    interests: [],
    budget: '',
    accommodation: '',
    activities: []
  });
  const [plan, setPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Function to generate a vacation plan based on user preferences
  const generateVacationPlan = () => {
    setIsGenerating(true);
    
    // Simulate API call to generate plan
    setTimeout(() => {
      const generatedPlan = {
        summary: {
          dates: preferences.dates,
          duration: preferences.duration,
          people: preferences.people,
          totalCost: calculateTotalCost(),
          serviceFee: calculateServiceFee()
        },
        itinerary: generateItinerary(),
        accommodations: generateAccommodations(),
        dining: generateDining(),
        activities: generateActivities()
      };
      
      setPlan(generatedPlan);
      setIsGenerating(false);
    }, 2000);
  };

  // Helper functions to generate plan components
  const calculateTotalCost = () => {
    // Base cost calculation based on preferences
    let baseCost = 0;
    
    // Accommodation costs
    if (preferences.accommodation === 'hotel') {
      baseCost += 150 * parseInt(preferences.duration) * parseInt(preferences.people);
    } else if (preferences.accommodation === 'guesthouse') {
      baseCost += 100 * parseInt(preferences.duration) * parseInt(preferences.people);
    } else if (preferences.accommodation === 'apartment') {
      baseCost += 120 * parseInt(preferences.duration) * parseInt(preferences.people);
    }
    
    // Activity costs
    if (preferences.activities.includes('wine_tour')) {
      baseCost += 50 * parseInt(preferences.people);
    }
    if (preferences.activities.includes('biking')) {
      baseCost += 30 * parseInt(preferences.people);
    }
    if (preferences.activities.includes('boat')) {
      baseCost += 40 * parseInt(preferences.people);
    }
    
    // Dining costs (estimate)
    baseCost += 50 * parseInt(preferences.duration) * parseInt(preferences.people);
    
    return baseCost;
  };

  const calculateServiceFee = () => {
    // Service fee is 10% of total cost
    return calculateTotalCost() * 0.1;
  };

  const generateItinerary = () => {
    // Generate a day-by-day itinerary based on preferences
    const days = [];
    const duration = parseInt(preferences.duration) || 3;
    
    for (let i = 1; i <= duration; i++) {
      let dayPlan = {
        day: i,
        activities: []
      };
      
      // Add activities based on preferences
      if (i === 1) {
        dayPlan.activities.push({
          time: '10:00',
          description: 'Arrival and check-in at accommodation'
        });
        dayPlan.activities.push({
          time: '13:00',
          description: 'Lunch at a local restaurant in Krems'
        });
        dayPlan.activities.push({
          time: '15:00',
          description: 'Orientation walk through the historic center'
        });
        dayPlan.activities.push({
          time: '19:00',
          description: 'Welcome dinner at a traditional wine tavern'
        });
      } else if (i === duration) {
        dayPlan.activities.push({
          time: '09:00',
          description: 'Breakfast at accommodation'
        });
        dayPlan.activities.push({
          time: '10:00',
          description: 'Final exploration or shopping'
        });
        dayPlan.activities.push({
          time: '12:00',
          description: 'Farewell lunch'
        });
        dayPlan.activities.push({
          time: '14:00',
          description: 'Check-out and departure'
        });
      } else {
        // Middle days - assign activities based on preferences
        dayPlan.activities.push({
          time: '09:00',
          description: 'Breakfast at accommodation'
        });
        
        if (preferences.interests.includes('wine') || preferences.activities.includes('wine_tour')) {
          dayPlan.activities.push({
            time: '10:30',
            description: 'Wine tasting tour at local vineyards'
          });
        } else if (preferences.interests.includes('biking') || preferences.activities.includes('biking')) {
          dayPlan.activities.push({
            time: '10:30',
            description: 'Bike tour along the Danube Bike Path'
          });
        } else if (preferences.interests.includes('hiking')) {
          dayPlan.activities.push({
            time: '10:30',
            description: 'Hiking on the Wachau World Heritage Trail'
          });
        } else if (preferences.interests.includes('culture')) {
          dayPlan.activities.push({
            time: '10:30',
            description: 'Visit to Melk Abbey and cultural sites'
          });
        }
        
        dayPlan.activities.push({
          time: '13:30',
          description: 'Lunch at a recommended restaurant'
        });
        
        if (preferences.interests.includes('relaxation')) {
          dayPlan.activities.push({
            time: '15:30',
            description: 'Relaxation time at a spa or by the Danube'
          });
        } else if (preferences.activities.includes('boat')) {
          dayPlan.activities.push({
            time: '15:30',
            description: 'Scenic boat tour on the Danube'
          });
        } else {
          dayPlan.activities.push({
            time: '15:30',
            description: 'Visit to a local attraction or museum'
          });
        }
        
        dayPlan.activities.push({
          time: '19:00',
          description: 'Dinner at a recommended restaurant'
        });
      }
      
      days.push(dayPlan);
    }
    
    return days;
  };

  const generateAccommodations = () => {
    // Generate accommodation recommendations based on preferences
    let accommodations = [];
    
    if (preferences.accommodation === 'hotel') {
      accommodations = [
        {
          name: 'Hotel Schloss Dürnstein',
          description: 'Historic hotel in a 400-year-old castle with panoramic views of the Danube.',
          price: '€180 - €250 per night',
          location: 'Dürnstein',
          rating: 5
        },
        {
          name: 'Steigenberger Hotel & Spa Krems',
          description: 'Modern luxury hotel with spa facilities and panoramic views of the Danube Valley.',
          price: '€150 - €220 per night',
          location: 'Krems',
          rating: 4.5
        },
        {
          name: 'arte Hotel Krems',
          description: 'Contemporary hotel in the arts district, close to museums and cultural attractions.',
          price: '€120 - €180 per night',
          location: 'Krems',
          rating: 4
        }
      ];
    } else if (preferences.accommodation === 'guesthouse') {
      accommodations = [
        {
          name: 'Gästehaus Hofmann',
          description: 'Charming family-run guesthouse with comfortable rooms and homemade breakfast.',
          price: '€80 - €120 per night',
          location: 'Weissenkirchen',
          rating: 4.5
        },
        {
          name: 'Pension Alte Post',
          description: 'Traditional guesthouse in a historic building with cozy rooms and garden.',
          price: '€70 - €100 per night',
          location: 'Spitz',
          rating: 4
        },
        {
          name: 'Gästehaus Wachau',
          description: 'Comfortable guesthouse surrounded by vineyards with Danube views.',
          price: '€75 - €110 per night',
          location: 'Dürnstein',
          rating: 4.2
        }
      ];
    } else if (preferences.accommodation === 'apartment') {
      accommodations = [
        {
          name: 'Wachau Apartments',
          description: 'Modern apartments with fully equipped kitchens and living areas.',
          price: '€90 - €140 per night',
          location: 'Krems',
          rating: 4.3
        },
        {
          name: 'Vineyard View Apartments',
          description: 'Spacious apartments with balconies overlooking the vineyards.',
          price: '€100 - €150 per night',
          location: 'Weissenkirchen',
          rating: 4.4
        },
        {
          name: 'Riverside Apartments',
          description: 'Comfortable apartments close to the Danube with bicycle storage.',
          price: '€85 - €130 per night',
          location: 'Melk',
          rating: 4.1
        }
      ];
    } else {
      // Default options covering all types
      accommodations = [
        {
          name: 'Hotel Schloss Dürnstein',
          description: 'Historic hotel in a 400-year-old castle with panoramic views of the Danube.',
          price: '€180 - €250 per night',
          location: 'Dürnstein',
          rating: 5
        },
        {
          name: 'Gästehaus Hofmann',
          description: 'Charming family-run guesthouse with comfortable rooms and homemade breakfast.',
          price: '€80 - €120 per night',
          location: 'Weissenkirchen',
          rating: 4.5
        },
        {
          name: 'Wachau Apartments',
          description: 'Modern apartments with fully equipped kitchens and living areas.',
          price: '€90 - €140 per night',
          location: 'Krems',
          rating: 4.3
        }
      ];
    }
    
    return accommodations;
  };

  const generateDining = () => {
    // Generate dining recommendations
    return [
      {
        name: 'Restaurant Richard Löwenherz',
        description: 'Fine dining restaurant with panoramic terrace overlooking the Danube.',
        cuisine: 'Austrian, International',
        location: 'Dürnstein',
        priceRange: '€€€'
      },
      {
        name: 'Alter Klosterkeller',
        description: 'Historic restaurant in a medieval cellar serving traditional Austrian cuisine.',
        cuisine: 'Austrian',
        location: 'Dürnstein',
        priceRange: '€€'
      },
      {
        name: 'Restaurant Loibnerhof-Knoll',
        description: 'Winery restaurant with excellent local cuisine and wine pairings.',
        cuisine: 'Austrian, Wine Bar',
        location: 'Unterloiben',
        priceRange: '€€'
      },
      {
        name: 'Heurigen Schwaighofer',
        description: 'Traditional wine tavern serving homemade food and local wines.',
        cuisine: 'Austrian, Wine Bar',
        location: 'Weissenkirchen',
        priceRange: '€'
      }
    ];
  };

  const generateActivities = () => {
    // Generate activity recommendations based on preferences
    let activities = [];
    
    if (preferences.interests.includes('wine') || preferences.activities.includes('wine_tour')) {
      activities.push({
        name: 'Wachau Valley Wine Tour',
        description: 'Guided tour of the region\'s best wineries with tastings of Grüner Veltliner and Riesling.',
        duration: '6 hours',
        price: '€50 per person',
        location: 'Wachau Valley'
      });
      activities.push({
        name: 'Domäne Wachau Wine Tasting',
        description: 'Visit to one of the region\'s most prestigious wineries with cellar tour and tasting.',
        duration: '2 hours',
        price: '€20 per person',
        location: 'Dürnstein'
      });
    }
    
    if (preferences.interests.includes('biking') || preferences.activities.includes('biking')) {
      activities.push({
        name: 'Danube Bike Path Tour',
        description: 'Guided biking tour along the scenic Danube Bike Path through vineyards and historic villages.',
        duration: '4 hours',
        price: '€30 per person (including bike rental)',
        location: 'Krems to Melk'
      });
      activities.push({
        name: 'E-Bike Rental',
        description: 'Rent an e-bike to explore the region at your own pace with route maps provided.',
        duration: 'Full day',
        price: '€35 per day',
        location: 'Krems'
      });
    }
    
    if (preferences.interests.includes('hiking')) {
      activities.push({
        name: 'Wachau World Heritage Trail Hike',
        description: 'Guided hike on the scenic trail with panoramic views of the Danube Valley.',
        duration: '5 hours',
        price: '€25 per person',
        location: 'Wachau Valley'
      });
    }
    
    if (preferences.interests.includes('culture') || preferences.activities.includes('culture')) {
      activities.push({
        name: 'Melk Abbey Tour',
        description: 'Guided tour of the magnificent Baroque abbey with its famous library and church.',
        duration: '2 hours',
        price: '€15 per person',
        location: 'Melk'
      });
      activities.push({
        name: 'Dürnstein Castle Ruins',
        description: 'Visit the historic ruins where Richard the Lionheart was imprisoned.',
        duration: '1.5 hours',
        price: 'Free (hiking to the ruins)',
        location: 'Dürnstein'
      });
      activities.push({
        name: 'Krems Museums Tour',
        description: 'Visit to the Caricature Museum and Kunsthalle Krems for contemporary art.',
        duration: '3 hours',
        price: '€12 per person',
        location: 'Krems'
      });
    }
    
    if (preferences.activities.includes('boat')) {
      activities.push({
        name: 'Danube River Cruise',
        description: 'Scenic boat tour on the Danube through the heart of the Wachau Valley.',
        duration: '2.5 hours',
        price: '€40 per person',
        location: 'Krems to Melk'
      });
    }
    
    // If no specific interests, add a mix of popular activities
    if (activities.length === 0) {
      activities = [
        {
          name: 'Wachau Valley Wine Tour',
          description: 'Guided tour of the region\'s best wineries with tastings of Grüner Veltliner and Riesling.',
          duration: '6 hours',
          price: '€50 per person',
          location: 'Wachau Valley'
        },
        {
          name: 'Danube Bike Path Tour',
          description: 'Guided biking tour along the scenic Danube Bike Path through vineyards and historic villages.',
          duration: '4 hours',
          price: '€30 per person (including bike rental)',
          location: 'Krems to Melk'
        },
        {
          name: 'Melk Abbey Tour',
          description: 'Guided tour of the magnificent Baroque abbey with its famous library and church.',
          duration: '2 hours',
          price: '€15 per person',
          location: 'Melk'
        },
        {
          name: 'Danube River Cruise',
          description: 'Scenic boat tour on the Danube through the heart of the Wachau Valley.',
          duration: '2.5 hours',
          price: '€40 per person',
          location: 'Krems to Melk'
        }
      ];
    }
    
    return activities;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {t('planner.title')}
          </h1>
          
          {!plan ? (
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-xl font-semibold mb-6">{t('planner.questions.dates')}</h2>
              <input
                type="date"
                value={preferences.dates}
                onChange={(e) => setPreferences({...preferences, dates: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg mb-6"
              />
              
              <h2 className="text-xl font-semibold mb-6">{t('planner.questions.duration')}</h2>
              <select
                value={preferences.duration}
                onChange={(e) => setPreferences({...preferences, duration: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg mb-6"
              >
                <option value="">Select</option>
                <option value="2">2 days</option>
                <option value="3">3 days</option>
                <option value="4">4 days</option>
                <option value="5">5 days</option>
                <option value="6">6 days</option>
                <option value="7">7 days</option>
              </select>
              
              <h2 className="text-xl font-semibold mb-6">{t('planner.questions.people')}</h2>
              <select
                value={preferences.people}
                onChange={(e) => setPreferences({...preferences, people: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg mb-6"
              >
                <option value="">Select</option>
                <option value="1">1 person</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
                <option value="5">5+ people</option>
              </select>
              
              <h2 className="text-xl font-semibold mb-6">{t('planner.questions.interests')}</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {['wine', 'biking', 'hiking', 'culture', 'food', 'relaxation'].map((interest) => (
                  <label key={interest} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preferences.interests.includes(interest)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPreferences({
                            ...preferences,
                            interests: [...preferences.interests, interest]
                          });
                        } else {
                          setPreferences({
                            ...preferences,
                            interests: preferences.interests.filter(i => i !== interest)
                          });
                        }
                      }}
                      className="h-5 w-5"
                    />
                    <span>{t(`planner.interests.${interest}`)}</span>
                  </label>
                ))}
              </div>
              
              <h2 className="text-xl font-semibold mb-6">{t('planner.questions.accommodation')}</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {['hotel', 'guesthouse', 'apartment'].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="accommodation"
                      checked={preferences.accommodation === type}
                      onChange={() => setPreferences({...preferences, accommodation: type})}
                      className="h-5 w-5"
                    />
                    <span>{t(`planner.accommodation.${type}`)}</span>
                  </label>
                ))}
              </div>
              
              <h2 className="text-xl font-semibold mb-6">{t('planner.questions.activities')}</h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {['wine_tour', 'biking', 'hiking', 'culture', 'boat'].map((activity) => (
                  <label key={activity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preferences.activities.includes(activity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPreferences({
                            ...preferences,
                            activities: [...preferences.activities, activity]
                          });
                        } else {
                          setPreferences({
                            ...preferences,
                            activities: preferences.activities.filter(a => a !== activity)
                          });
                        }
                      }}
                      className="h-5 w-5"
                    />
                    <span>{t(`activities.categories.${activity === 'wine_tour' ? 'wine' : activity}`)}</span>
                  </label>
                ))}
              </div>
              
              <button
                onClick={generateVacationPlan}
                disabled={isGenerating || !preferences.dates || !preferences.duration || !preferences.people}
                className={`w-full py-3 rounded-lg font-medium text-lg ${
                  isGenerating || !preferences.dates || !preferences.duration || !preferences.people
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isGenerating ? 'Generating Plan...' : t('planner.buttons.generate')}
              </button>
              
              {(!preferences.dates || !preferences.duration || !preferences.people) && (
                <p className="mt-4 text-sm text-red-500">
                  Please fill in the required fields (dates, duration, and number of people).
                </p>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-green-600">Your Vacation Plan</h2>
                <button
                  onClick={() => setPlan(null)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {t('planner.buttons.modify')}
                </button>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">{t('myPlan.summary')}</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p><strong>Dates:</strong> {plan.summary.dates}</p>
                      <p><strong>Duration:</strong> {plan.summary.duration} days</p>
                      <p><strong>People:</strong> {plan.summary.people}</p>
                    </div>
                    <div>
                      <p><strong>Accommodation:</strong> {preferences.accommodation}</p>
                      <p><strong>Total Cost:</strong> €{plan.summary.totalCost.toFixed(2)}</p>
                      <p><strong>Service Fee:</strong> €{plan.summary.serviceFee.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">{t('myPlan.itinerary')}</h3>
                <div className="space-y-6">
                  {plan.itinerary.map((day) => (
                    <div key={day.day} className="border-b pb-4">
                      <h4 className="font-semibold text-lg mb-2">Day {day.day}</h4>
                      <ul className="space-y-2">
                        {day.activities.map((activity, index) => (
                          <li key={index} className="flex">
                            <span className="font-medium w-16">{activity.time}</span>
                            <span>{activity.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Recommended Accommodation</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {plan.accommodations.slice(0, 2).map((accommodation, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold text-lg">{accommodation.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{accommodation.location}</p>
                      <div className="flex items-center mb-2">
                        {[...Array(Math.floor(accommodation.rating))].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        {accommodation.rating % 1 !== 0 && (
                          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        )}
                      </div>
                      <p className="mb-2">{accommodation.description}</p>
                      <p className="font-medium">{accommodation.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Recommended Activities</h3>
                <div className="space-y-4">
                  {plan.activities.slice(0, 3).map((activity, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold text-lg">{activity.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{activity.location} • {activity.duration}</p>
                      <p className="mb-2">{activity.description}</p>
                      <p className="font-medium">{activity.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Recommended Dining</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {plan.dining.slice(0, 4).map((restaurant, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold">{restaurant.name}</h4>
                      <p className="text-sm text-gray-600">{restaurant.location} • {restaurant.priceRange}</p>
                      <p className="text-sm">{restaurant.cuisine}</p>
                      <p className="mt-1">{restaurant.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-6 mt-8">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-lg">Total Cost: <span className="font-bold">€{(plan.summary.totalCost + plan.summary.serviceFee).toFixed(2)}</span></p>
                    <p className="text-sm text-gray-600">Includes service fee of €{plan.summary.serviceFee.toFixed(2)}</p>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
                    {t('myPlan.checkout')}
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  By proceeding to checkout, you agree to our terms of service and acknowledge our disclaimer regarding third-party services.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
