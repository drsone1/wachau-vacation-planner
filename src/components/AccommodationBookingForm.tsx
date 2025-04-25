import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface BookingFormProps {
  accommodationId?: string;
  accommodationName?: string;
  startDate?: string;
  endDate?: string;
  guests?: number;
  onComplete: (bookingData: any) => void;
}

export default function AccommodationBookingForm({
  accommodationId,
  accommodationName,
  startDate,
  endDate,
  guests,
  onComplete
}: BookingFormProps) {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    accommodationId: accommodationId || '',
    accommodationName: accommodationName || '',
    startDate: startDate || '',
    endDate: endDate || '',
    guests: guests || 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = 'Number of guests is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.paymentMethod === 'credit_card') {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      
      if (!formData.cardExpiry.trim()) {
        newErrors.cardExpiry = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        newErrors.cardExpiry = 'Expiry date must be in MM/YY format';
      }
      
      if (!formData.cardCvc.trim()) {
        newErrors.cardCvc = 'CVC is required';
      } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
        newErrors.cardCvc = 'CVC must be 3 or 4 digits';
      }
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 3 && validateStep3()) {
      setIsSubmitting(true);
      
      try {
        // In a real implementation, this would be an API call to process the booking
        // For now, we'll simulate a successful booking after a delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate a booking reference
        const bookingReference = 'BK' + Math.floor(100000 + Math.random() * 900000);
        
        const bookingData = {
          ...formData,
          bookingReference,
          status: 'confirmed',
          bookingDate: new Date().toISOString(),
          totalPrice: calculateTotalPrice(),
          serviceFee: calculateServiceFee()
        };
        
        onComplete(bookingData);
      } catch (error) {
        console.error('Booking failed:', error);
        setErrors({
          submit: 'Booking failed. Please try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const calculateTotalPrice = () => {
    // In a real implementation, this would calculate the actual price based on the accommodation,
    // dates, number of guests, etc.
    const nights = calculateNights();
    const basePrice = 150; // Example base price per night
    return basePrice * nights * formData.guests;
  };

  const calculateServiceFee = () => {
    // Service fee is 10% of the total price
    return calculateTotalPrice() * 0.1;
  };

  const calculateNights = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">
        {accommodationName 
          ? `Book ${accommodationName}` 
          : t('accommodations.booking.title')}
      </h2>
      
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('accommodations.booking.dates')}</h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="startDate">
                {t('accommodations.booking.checkIn')}
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg ${errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="endDate">
                {t('accommodations.booking.checkOut')}
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg ${errors.endDate ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="guests">
                {t('accommodations.booking.guests')}
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg ${errors.guests ? 'border-red-500' : 'border-gray-300'}`}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              {errors.guests && (
                <p className="text-red-500 text-sm mt-1">{errors.guests}</p>
              )}
            </div>
            
            {formData.startDate && formData.endDate && calculateNights() > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">{t('accommodations.booking.summary')}</h4>
                <p>{calculateNights()} nights, {formData.guests} guests</p>
                <p className="font-medium mt-2">
                  Total: €{calculateTotalPrice().toFixed(2)}
                  <span className="text-sm text-gray-600 ml-1">
                    (includes €{calculateServiceFee().toFixed(2)} service fee)
                  </span>
                </p>
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                {t('planner.buttons.next')}
              </button>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('accommodations.booking.guestInfo')}</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="firstName">
                  {t('accommodations.booking.firstName')}
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="lastName">
                  {t('accommodations.booking.lastName')}
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                {t('accommodations.booking.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="phone">
                {t('accommodations.booking.phone')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="specialRequests">
                {t('accommodations.booking.specialRequests')}
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
              >
                {t('planner.buttons.back')}
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                {t('planner.buttons.next')}
              </button>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('checkout.payment')}</h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                {t('checkout.paymentMethod')}
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={formData.paymentMethod === 'credit_card'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {t('checkout.creditCard')}
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  PayPal
                </label>
              </div>
            </div>
            
            {formData.paymentMethod === 'credit_card' && (
              <div className="mb-6">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="cardNumber">
                    {t('checkout.cardNumber')}
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className={`w-full p-2 border rounded-lg ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="cardExpiry">
                      {t('checkout.expiryDate')}
                    </label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className={`w-full p-2 border rounded-lg ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.cardExpiry && (
                      <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="cardCvc">
                      {t('checkout.cvc')}
                    </label>
                    <input
                      type="text"
                      id="cardCvc"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      placeholder="123"
                      className={`w-full p-2 border rounded-lg ${errors.cardCvc ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.cardCvc && (
                      <p className="text-red-500 text-sm mt-1">{errors.cardCvc}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold mb-2">{t('checkout.summary')}</h4>
              <div className="flex justify-between mb-2">
                <span>{calculateNights()} nights</span>
                <span>€{(calculateTotalPrice() - calculateServiceFee()).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>{t('checkout.serviceFee')}</span>
                <span>€{calculateServiceFee().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>{t('checkout.total')}</span>
                <span>€{calculateTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className={`mt-1 mr-2 ${errors.agreeToTerms ? 'border-red-500' : ''}`}
                />
                <span className="text-sm">
                  {t('checkout.termsAgreement')}
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
              )}
            </div>
            
            {errors.submit && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errors.submit}
              </div>
            )}
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
              >
                {t('planner.buttons.back')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-lg ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isSubmitting ? t('checkout.processing') : t('checkout.pay')}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
