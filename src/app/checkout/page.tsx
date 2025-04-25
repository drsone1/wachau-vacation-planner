import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AccommodationBookingForm from '../../components/AccommodationBookingForm';
import PaymentProcessor from '../../components/PaymentProcessor';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function CheckoutPage() {
  const { t } = useTranslation('common');
  const [step, setStep] = useState('booking'); // booking, payment, confirmation
  const [bookingData, setBookingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  
  const handleBookingComplete = (data) => {
    setBookingData(data);
    setStep('payment');
  };
  
  const handlePaymentComplete = (data) => {
    setPaymentData(data);
    setStep('confirmation');
  };
  
  const handleCancelPayment = () => {
    setStep('booking');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {t('checkout.title')}
          </h1>
          
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'booking' || step === 'payment' || step === 'confirmation' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-300 text-gray-600'
              }`}>
                1
              </div>
              <div className="text-sm ml-2">{t('checkout.bookingDetails')}</div>
            </div>
            <div className="w-12 h-1 mx-2 bg-gray-300 self-center">
              <div className={`h-full ${
                step === 'payment' || step === 'confirmation' ? 'bg-blue-600' : 'bg-gray-300'
              }`}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'payment' || step === 'confirmation' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <div className="text-sm ml-2">{t('checkout.payment')}</div>
            </div>
            <div className="w-12 h-1 mx-2 bg-gray-300 self-center">
              <div className={`h-full ${
                step === 'confirmation' ? 'bg-blue-600' : 'bg-gray-300'
              }`}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'confirmation' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-300 text-gray-600'
              }`}>
                3
              </div>
              <div className="text-sm ml-2">{t('checkout.confirmation')}</div>
            </div>
          </div>
          
          {step === 'booking' && (
            <AccommodationBookingForm 
              accommodationName="Hotel Schloss Dürnstein"
              onComplete={handleBookingComplete}
            />
          )}
          
          {step === 'payment' && bookingData && (
            <PaymentProcessor
              totalAmount={bookingData.totalPrice}
              serviceFee={bookingData.serviceFee}
              onPaymentComplete={handlePaymentComplete}
              onCancel={handleCancelPayment}
            />
          )}
          
          {step === 'confirmation' && bookingData && paymentData && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {t('checkout.bookingConfirmed')}
                </h2>
                <p className="text-gray-600">
                  {t('checkout.confirmationMessage')}
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-4">{t('checkout.bookingDetails')}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>{t('accommodations.booking.reference')}:</strong> {bookingData.bookingReference}</p>
                    <p><strong>{t('accommodations.booking.accommodation')}:</strong> {bookingData.accommodationName}</p>
                    <p><strong>{t('accommodations.booking.checkIn')}:</strong> {bookingData.startDate}</p>
                    <p><strong>{t('accommodations.booking.checkOut')}:</strong> {bookingData.endDate}</p>
                  </div>
                  <div>
                    <p><strong>{t('accommodations.booking.guests')}:</strong> {bookingData.guests}</p>
                    <p><strong>{t('checkout.paymentMethod')}:</strong> {paymentData.paymentMethod === 'credit_card' ? t('checkout.creditCard') : 'PayPal'}</p>
                    <p><strong>{t('checkout.paymentReference')}:</strong> {paymentData.paymentReference}</p>
                    <p><strong>{t('checkout.total')}:</strong> €{paymentData.amount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-4">{t('checkout.whatNext')}</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>{t('checkout.confirmationEmail')}</li>
                  <li>{t('checkout.vacationPlanDocument')}</li>
                  <li>{t('checkout.contactInfo')}</li>
                </ul>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                  {t('checkout.returnHome')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
