import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function Disclaimer() {
  const { t } = useTranslation('common');
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Disclaimer
          </h1>
          
          <div className="prose max-w-none">
            <h2>1. Intermediary Role</h2>
            <p>Wachau Vacation Planner operates as an intermediary platform connecting travelers with accommodation providers, restaurants, and activity providers in the Wachau, Krems, and Kamptal regions of Austria. We do not own, manage, or operate any of the services we book on your behalf.</p>
            
            <h2>2. Third-Party Services</h2>
            <p>All accommodations, restaurants, activities, and other services booked through our platform are provided by independent third parties. While we carefully select our partners, we cannot guarantee the quality, safety, or suitability of their services. We are not responsible for any actions, omissions, or negligence of these third-party providers.</p>
            
            <h2>3. Information Accuracy</h2>
            <p>We make every effort to ensure that the information on our website is accurate and up-to-date. However, we cannot guarantee the complete accuracy of all information, including descriptions, prices, availability, and images. Information may change without notice, and we are not liable for any inaccuracies.</p>
            
            <h2>4. Booking Confirmations</h2>
            <p>While we strive to confirm all bookings as requested, we cannot guarantee that all reservations will be honored by third-party providers. In case of overbooking, cancellations, or other issues with third-party providers, our liability is limited to assisting you in finding alternative arrangements.</p>
            
            <h2>5. No Refund Initiation</h2>
            <p>As clearly stated in our terms of service, Wachau Vacation Planner does not take initiative for refunds in case of issues with third-party services. While we will assist you in communicating with service providers, the responsibility for resolving issues and providing refunds lies with the third-party providers themselves.</p>
            
            <h2>6. AI Recommendations</h2>
            <p>Our AI assistant provides recommendations based on available information and your stated preferences. These recommendations are for informational purposes only and do not constitute professional advice. The final decision on all bookings and activities remains your responsibility.</p>
            
            <h2>7. Travel Risks</h2>
            <p>Travel involves inherent risks. We are not responsible for any personal injury, illness, property damage, or other losses that may occur during your vacation. We strongly recommend obtaining comprehensive travel insurance before your trip.</p>
            
            <h2>8. Force Majeure</h2>
            <p>We are not liable for any failure to perform our obligations due to circumstances beyond our reasonable control, including but not limited to natural disasters, acts of terrorism, government actions, strikes, or pandemics.</p>
            
            <h2>9. Website Availability</h2>
            <p>We do not guarantee that our website will be available at all times or that it will be free from errors or viruses. We reserve the right to suspend or terminate access to our website at any time without notice.</p>
            
            <h2>10. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Wachau Vacation Planner's liability for any claims arising from the use of our services is limited to the amount paid for our services. In no event will we be liable for any indirect, consequential, special, or punitive damages.</p>
            
            <h2>11. Indemnification</h2>
            <p>By using our services, you agree to indemnify and hold harmless Wachau Vacation Planner, its employees, and affiliates from any claims, damages, liabilities, costs, or expenses arising from your use of our services or your violation of these terms.</p>
            
            <h2>12. Legal Advice</h2>
            <p>This disclaimer is not intended to be a substitute for professional legal advice. If you have any legal concerns about using our services, we recommend consulting with a qualified attorney.</p>
            
            <p className="text-sm text-gray-600 mt-8">Last updated: April 24, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
