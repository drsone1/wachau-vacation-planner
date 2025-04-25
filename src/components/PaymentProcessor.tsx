import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface PaymentProcessorProps {
  totalAmount: number;
  serviceFee: number;
  onPaymentComplete: (paymentData: any) => void;
  onCancel: () => void;
}

export default function PaymentProcessor({
  totalAmount,
  serviceFee,
  onPaymentComplete,
  onCancel
}: PaymentProcessorProps) {
  const { t } = useTranslation('common');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardholderName: '',
    billingAddress: '',
    billingCity: '',
    billingZip: '',
    billingCountry: '',
    agreeToTerms: false,
    agreeToRefundPolicy: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (paymentMethod === 'credit_card') {
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
      
      if (!formData.cardholderName.trim()) {
        newErrors.cardholderName = 'Cardholder name is required';
      }
    }
    
    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required';
    }
    
    if (!formData.billingCity.trim()) {
      newErrors.billingCity = 'City is required';
    }
    
    if (!formData.billingZip.trim()) {
      newErrors.billingZip = 'ZIP/Postal code is required';
    }
    
    if (!formData.billingCountry.trim()) {
      newErrors.billingCountry = 'Country is required';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    if (!formData.agreeToRefundPolicy) {
      newErrors.agreeToRefundPolicy = 'You must agree to the refund policy';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsProcessing(true);
      
      try {
        // In a real implementation, this would be an API call to process the payment
        // For now, we'll simulate a successful payment after a delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate a payment reference
        const paymentReference = 'PAY' + Math.floor(100000 + Math.random() * 900000);
        
        const paymentData = {
          paymentReference,
          paymentMethod,
          amount: totalAmount,
          serviceFee,
          status: 'completed',
          paymentDate: new Date().toISOString(),
          // Don't include sensitive card details in the response
          lastFourDigits: paymentMethod === 'credit_card' ? formData.cardNumber.slice(-4) : null
        };
        
        onPaymentComplete(paymentData);
      } catch (error) {
        console.error('Payment failed:', error);
        setErrors({
          submit: 'Payment failed. Please try again.'
        });
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">{t('checkout.payment')}</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">{t('checkout.summary')}</h3>
        <div className="flex justify-between mb-2">
          <span>{t('checkout.subtotal')}</span>
          <span>€{(totalAmount - serviceFee).toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>{t('checkout.serviceFee')}</span>
          <span>€{serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold pt-2 border-t">
          <span>{t('checkout.total')}</span>
          <span>€{totalAmount.toFixed(2)}</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            {t('checkout.paymentMethod')}
          </label>
          <div className="flex space-x-4 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                checked={paymentMethod === 'credit_card'}
                onChange={() => setPaymentMethod('credit_card')}
                className="mr-2"
              />
              {t('checkout.creditCard')}
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => setPaymentMethod('paypal')}
                className="mr-2"
              />
              PayPal
            </label>
          </div>
          
          {paymentMethod === 'credit_card' && (
            <div className="space-y-4">
              <div>
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
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="cardholderName">
                  {t('checkout.cardholderName')}
                </label>
                <input
                  type="text"
                  id="cardholderName"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg ${errors.cardholderName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.cardholderName && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>
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
          
          {paymentMethod === 'paypal' && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
              <p className="mb-2">{t('checkout.paypalInfo')}</p>
              <p className="text-sm text-gray-600">{t('checkout.paypalRedirect')}</p>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-4">{t('checkout.billingInfo')}</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="billingAddress">
              {t('checkout.address')}
            </label>
            <input
              type="text"
              id="billingAddress"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${errors.billingAddress ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.billingAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.billingAddress}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="billingCity">
                {t('checkout.city')}
              </label>
              <input
                type="text"
                id="billingCity"
                name="billingCity"
                value={formData.billingCity}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg ${errors.billingCity ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.billingCity && (
                <p className="text-red-500 text-sm mt-1">{errors.billingCity}</p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="billingZip">
                {t('checkout.zipCode')}
              </label>
              <input
                type="text"
                id="billingZip"
                name="billingZip"
                value={formData.billingZip}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg ${errors.billingZip ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.billingZip && (
                <p className="text-red-500 text-sm mt-1">{errors.billingZip}</p>
              )}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="billingCountry">
              {t('checkout.country')}
            </label>
            <select
              id="billingCountry"
              name="billingCountry"
              value={formData.billingCountry}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-lg ${errors.billingCountry ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select a country</option>
              <option value="AT">Austria</option>
              <option value="DE">Germany</option>
              <option value="CH">Switzerland</option>
              <option value="IT">Italy</option>
              <option value="FR">France</option>
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
              <option value="JP">Japan</option>
              <option value="CN">China</option>
            </select>
            {errors.billingCountry && (
              <p className="text-red-500 text-sm mt-1">{errors.billingCountry}</p>
            )}
          </div>
        </div>
        
        <div className="mb-6 space-y-3">
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
            <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
          )}
          
          <label className="flex items-start">
            <input
              type="checkbox"
              name="agreeToRefundPolicy"
              checked={formData.agreeToRefundPolicy}
              onChange={handleInputChange}
              className={`mt-1 mr-2 ${errors.agreeToRefundPolicy ? 'border-red-500' : ''}`}
            />
            <span className="text-sm">
              {t('checkout.refundPolicyAgreement')}
            </span>
          </label>
          {errors.agreeToRefundPolicy && (
            <p className="text-red-500 text-sm">{errors.agreeToRefundPolicy}</p>
          )}
        </div>
        
        <div className="text-sm text-gray-600 mb-6">
          <p>{t('checkout.disclaimer')}</p>
        </div>
        
        {errors.submit && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.submit}
          </div>
        )}
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
          >
            {t('checkout.cancel')}
          </button>
          <button
            type="submit"
            disabled={isProcessing}
            className={`px-6 py-2 rounded-lg ${
              isProcessing
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isProcessing ? t('checkout.processing') : t('checkout.pay')}
          </button>
        </div>
      </form>
    </div>
  );
}
