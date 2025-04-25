import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AIAssistant from '../../components/AIAssistant';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function AIAssistantPage() {
  const { t } = useTranslation('common');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {t('planner.title')}
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            {t('planner.intro')}
          </p>
          
          <AIAssistant />
          
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              How Our AI Assistant Works
            </h2>
            <p className="text-gray-600 mb-4">
              Our AI assistant uses natural language processing to understand your vacation preferences and create a personalized plan for your trip to the Wachau, Krems, and Kamptal regions.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Tell the assistant about your travel dates, group size, and duration</li>
              <li>Share your interests (wine, biking, hiking, culture, etc.)</li>
              <li>Specify your budget and accommodation preferences</li>
              <li>Ask about specific activities, restaurants, or attractions</li>
              <li>Request a complete itinerary based on your preferences</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
