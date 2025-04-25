import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function TermsOfService() {
  const { t } = useTranslation('common');
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Terms of Service
          </h1>
          
          <div className="prose max-w-none">
            <h2>1. Introduction</h2>
            <p>Welcome to Wachau Vacation Planner. These Terms of Service govern your use of our website and services. By using our website or services, you agree to these terms.</p>
            
            <h2>2. Services Description</h2>
            <p>Wachau Vacation Planner provides vacation planning services for the Wachau, Krems, and Kamptal regions of Austria. Our services include:</p>
            <ul>
              <li>AI-assisted vacation planning</li>
              <li>Accommodation booking</li>
              <li>Restaurant reservations</li>
              <li>Activity bookings</li>
              <li>Comprehensive vacation plan documents</li>
            </ul>
            
            <h2>3. Booking and Reservations</h2>
            <p>When you make a booking through our platform:</p>
            <ul>
              <li>We act as an intermediary between you and the service providers (hotels, restaurants, activity providers)</li>
              <li>We will make every effort to secure your reservations as requested</li>
              <li>Confirmation is subject to availability and acceptance by the service providers</li>
              <li>You will receive a confirmation document with all booking details</li>
            </ul>
            
            <h2>4. Payments and Fees</h2>
            <p>Our payment terms are as follows:</p>
            <ul>
              <li>All prices are in Euros (€) and include applicable taxes</li>
              <li>A service fee is added to all bookings (typically 10% of the total booking value)</li>
              <li>Payment for accommodations is processed through our platform</li>
              <li>Payments for restaurants and some activities are made directly to the providers</li>
              <li>We accept credit cards and PayPal as payment methods</li>
            </ul>
            
            <h2>5. Cancellations and Refunds</h2>
            <p>Our cancellation policy is as follows:</p>
            <ul>
              <li>Cancellations made more than 30 days before arrival: 90% refund</li>
              <li>Cancellations made 15-30 days before arrival: 50% refund</li>
              <li>Cancellations made less than 15 days before arrival: no refund</li>
              <li>Service fees are non-refundable</li>
              <li>Individual service providers may have their own cancellation policies that supersede ours</li>
            </ul>
            
            <h2>6. Modifications</h2>
            <p>Modifications to your booking:</p>
            <ul>
              <li>Can be requested up to 15 days before arrival</li>
              <li>Are subject to availability and may incur additional charges</li>
              <li>Must be confirmed in writing by our team</li>
            </ul>
            
            <h2>7. Liability and Disclaimer</h2>
            <p>Wachau Vacation Planner:</p>
            <ul>
              <li>Acts as an intermediary and is not responsible for the actions or omissions of third-party service providers</li>
              <li>Makes no warranties regarding the quality of services provided by third parties</li>
              <li>Is not liable for any changes, cancellations, or issues caused by third-party providers</li>
              <li>Is not responsible for force majeure events (natural disasters, strikes, etc.)</li>
              <li>Limits its liability to the amount paid for our services</li>
            </ul>
            
            <h2>8. User Responsibilities</h2>
            <p>As a user, you are responsible for:</p>
            <ul>
              <li>Providing accurate and complete information when making bookings</li>
              <li>Ensuring you have valid travel documents and insurance</li>
              <li>Adhering to the rules and policies of service providers</li>
              <li>Respecting local laws and customs during your vacation</li>
            </ul>
            
            <h2>9. Privacy Policy</h2>
            <p>Our Privacy Policy explains how we collect, use, and protect your personal information. By using our services, you consent to our Privacy Policy.</p>
            
            <h2>10. Intellectual Property</h2>
            <p>All content on our website, including text, graphics, logos, and software, is the property of Wachau Vacation Planner and is protected by copyright laws.</p>
            
            <h2>11. Governing Law</h2>
            <p>These Terms of Service are governed by the laws of Austria. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts of Austria.</p>
            
            <h2>12. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes constitutes acceptance of the modified terms.</p>
            
            <h2>13. Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <p>Wachau Vacation Planner<br />
            Hauptstraße 1<br />
            3500 Krems an der Donau<br />
            Austria<br />
            Email: info@wachau-vacation-planner.com<br />
            Phone: +43 123 456789</p>
            
            <p className="text-sm text-gray-600 mt-8">Last updated: April 24, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
