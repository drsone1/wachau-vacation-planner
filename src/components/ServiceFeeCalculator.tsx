import { useState } from 'react';
import { useTranslation } from 'next-i18next';

interface ServiceFeeCalculatorProps {
  subtotal: number;
  onCalculate: (serviceFee: number, total: number) => void;
}

export default function ServiceFeeCalculator({
  subtotal,
  onCalculate
}: ServiceFeeCalculatorProps) {
  const { t } = useTranslation('common');
  const [feePercentage, setFeePercentage] = useState(10); // Default 10%
  
  // Calculate service fee based on subtotal and percentage
  const calculateServiceFee = (amount: number, percentage: number): number => {
    return (amount * percentage) / 100;
  };
  
  // Calculate total amount including service fee
  const calculateTotal = (amount: number, fee: number): number => {
    return amount + fee;
  };
  
  // Handle percentage change
  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPercentage = parseInt(e.target.value, 10);
    setFeePercentage(newPercentage);
    
    const fee = calculateServiceFee(subtotal, newPercentage);
    const total = calculateTotal(subtotal, fee);
    
    onCalculate(fee, total);
  };
  
  // Calculate initial values
  const serviceFee = calculateServiceFee(subtotal, feePercentage);
  const total = calculateTotal(subtotal, serviceFee);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">{t('checkout.serviceFeeCalculator')}</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="feePercentage">
          {t('checkout.serviceFeePercentage')}
        </label>
        <input
          type="range"
          id="feePercentage"
          name="feePercentage"
          min="5"
          max="20"
          step="1"
          value={feePercentage}
          onChange={handlePercentageChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>5%</span>
          <span>10%</span>
          <span>15%</span>
          <span>20%</span>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between mb-2">
          <span>{t('checkout.subtotal')}</span>
          <span>€{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>{t('checkout.serviceFee')} ({feePercentage}%)</span>
          <span>€{serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold pt-2 border-t">
          <span>{t('checkout.total')}</span>
          <span>€{total.toFixed(2)}</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mt-4">
        {t('checkout.serviceFeeExplanation')}
      </p>
    </div>
  );
}
