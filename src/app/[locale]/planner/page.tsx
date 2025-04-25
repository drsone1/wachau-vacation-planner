'use client';

import { useTranslation } from 'next-intl';
import { useState } from 'react';
import Layout from '../../../components/Layout';

export default function PlannerPage() {
  const t = useTranslation('common');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    dates: '',
    duration: '',
    people: '',
    interests: [],
    budget: '',
    accommodation: '',
    activities: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...formData[name], value]
      });
    } else {
      setFormData({
        ...formData,
        [name]: formData[name].filter(item => item !== value)
      });
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const generatePlan = () => {
    // This would connect to the AI assistant functionality
    console.log('Generating plan with data:', formData);
    setStep(step + 1);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
              {t('planner.title')}
            </h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
              {t('planner.intro')}
            </p>

            <div className="bg-white rounded-lg shadow-md p-8">
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">{t('planner.questions.dates')}</h2>
                  <input
                    type="date"
                    name="dates"
                    value={formData.dates}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                  />
                  
                  <h2 className="text-xl font-semibold mb-6">{t('planner.questions.duration')}</h2>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                  >
                    <option value="">Select</option>
                    <option value="2-3">2-3 days</option>
                    <option value="4-5">4-5 days</option>
                    <option value="6-7">6-7 days</option>
                    <option value="8+">8+ days</option>
                  </select>
                  
                  <h2 className="text-xl font-semibold mb-6">{t('planner.questions.people')}</h2>
                  <select
                    name="people"
                    value={formData.people}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                  >
                    <option value="">Select</option>
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="3-4">3-4 people</option>
                    <option value="5+">5+ people</option>
                  </select>
                  
                  <div className="flex justify-end mt-8">
                    <button
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                      {t('planner.buttons.next')}
                    </button>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">{t('planner.questions.interests')}</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="interests"
                        value="wine"
                        checked={formData.interests.includes('wine')}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5"
                      />
                      <span>{t('planner.interests.wine')}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="interests"
                        value="biking"
                        checked={formData.interests.includes('biking')}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5"
                      />
                      <span>{t('planner.interests.biking')}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="interests"
                        value="hiking"
                        checked={formData.interests.includes('hiking')}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5"
                      />
                      <span>{t('planner.interests.hiking')}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="interests"
                        value="culture"
                        checked={formData.interests.includes('culture')}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5"
                      />
                      <span>{t('planner.interests.culture')}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="interests"
                        value="food"
                        checked={formData.interests.includes('food')}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5"
                      />
                      <span>{t('planner.interests.food')}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="interests"
                        value="relaxation"
                        checked={formData.interests.includes('relaxation')}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5"
                      />
                      <span>{t('planner.interests.relaxation')}</span>
                    </label>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-6">{t('planner.questions.budget')}</h2>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                  >
                    <option value="">Select</option>
                    <option value="budget">Budget-friendly</option>
                    <option value="moderate">Moderate</option>
                    <option value="luxury">Luxury</option>
                  </select>
                  
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={prevStep}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg"
                    >
                      {t('planner.buttons.back')}
                    </button>
                    <button
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                      {t('planner.buttons.next')}
                    </button>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">{t('planner.questions.accommodation')}</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="accommodation"
                        value="hotel"
                        checked={formData.accommodation === 'hotel'}
                        onChange={handleInputChange}
                        className="h-5 w-5"
                      />
                      <span>{t('planner.accommodation.hotel')}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="accommodation"
                        value="guesthouse"
                        checked={formData.accommodation === 'guesthouse'}
                        onChange={handleInputChange}
                        className="h-5 w-5"
                      />
                      <span>{t('planner.accommodation.guesthouse')}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="accommodation"
                        value="apartment"
                        checked={formData.accommodation === 'apartment'}
                        onChange={handleInputChange}
                        className="h-5 w-5"
                      />
                      <span>{t('planner.accommodation.apartment')}</span>
                    </label>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-6">{t('planner.questions.activities')}</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="activities"
                        value="wine_tour"
                        checked={formData.activities.includes('wine_tour')}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5"
                      />
                      <span>{t('activities.categories.wine')}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="activities"
                        value="biking"
                        checked={formData.activities.includes('biking')}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5"
                      />
                      <span>{t('activities.categories.biking')}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="activities"
                        value="hiking"
                        checked={formData.activities.includes('hiking')}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5"
                      />
                      <span>{t('activities.categories.hiking')}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="activities"
                        value="culture"
                        checked={formData.activities.includes('culture')}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5"
                      />
                      <span>{t('activities.categories.culture')}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="activities"
                        value="boat"
                        checked={formData.activities.includes('boat')}
                        onChange={handleCheckboxChange}
                        className="h-5 w-5"
                      />
                      <span>{t('activities.categories.boat')}</span>
                    </label>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={prevStep}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg"
                    >
                      {t('planner.buttons.back')}
                    </button>
                    <button
                      onClick={generatePlan}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                    >
                      {t('planner.buttons.generate')}
                    </button>
                  </div>
                </div>
              )}
              
              {step === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
                    Your Vacation Plan is Ready!
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 text-center">
                    We've created a personalized vacation plan based on your preferences.
                  </p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h3 className="text-xl font-semibold mb-4">Summary</h3>
                    <ul className="space-y-2">
                      <li><strong>Dates:</strong> {formData.dates}</li>
                      <li><strong>Duration:</strong> {formData.duration} days</li>
                      <li><strong>People:</strong> {formData.people}</li>
                      <li><strong>Interests:</strong> {formData.interests.join(', ')}</li>
                      <li><strong>Budget:</strong> {formData.budget}</li>
                      <li><strong>Accommodation:</strong> {formData.accommodation}</li>
                      <li><strong>Activities:</strong> {formData.activities.join(', ')}</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg"
                    >
                      {t('planner.buttons.modify')}
                    </button>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                      {t('planner.buttons.book')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
