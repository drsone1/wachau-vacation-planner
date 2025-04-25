'use client';

import { useTranslation } from 'next-intl';
import { useState } from 'react';

export default function HomePage() {
  const t = useTranslation('common');
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-blue-500 text-white">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              {t('home.hero.subtitle')}
            </p>
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium text-lg transition duration-300">
              {t('home.hero.cta')}
            </button>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            {t('home.intro.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {t('home.intro.text')}
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            {t('home.features.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {t('home.features.ai.title')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.ai.text')}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {t('home.features.complete.title')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.complete.text')}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {t('home.features.local.title')}
              </h3>
              <p className="text-gray-600">
                {t('home.features.local.text')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
          {t('home.testimonials.title')}
        </h2>
        {/* Testimonial cards would go here */}
        <div className="text-center mt-8">
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            {t('home.testimonials.more')}
          </a>
        </div>
      </div>
    </div>
  );
}
