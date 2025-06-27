'use client';

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { formatPrice } from '@/utils/formatPrice';

interface EMICalculatorProps {
  price: number;
}

const EMICalculator: React.FC<EMICalculatorProps> = ({ price }) => {
  const minDownPaymentPercentage = 30;
  const minDownPayment = useMemo(() => (price * minDownPaymentPercentage) / 100, [price]);

  const [downPayment, setDownPayment] = useState(minDownPayment);
  const interestRate = 11;
  const [tenure, setTenure] = useState(24); // Default tenure in months

  const loanAmount = useMemo(() => price - downPayment, [price, downPayment]);
  const monthlyInterestRate = useMemo(() => interestRate / 12 / 100, []);
  const numberOfMonths = useMemo(() => tenure, [tenure]);

  const emi = useMemo(() => {
    if (loanAmount <= 0) return 0;
    const numerator = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths);
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1;
    if (denominator === 0) return 0;
    return numerator / denominator;
  }, [loanAmount, monthlyInterestRate, numberOfMonths]);

  const totalAmountToPay = useMemo(() => emi * numberOfMonths, [emi, numberOfMonths]);
  const totalInterestPayment = useMemo(() => totalAmountToPay - loanAmount, [totalAmountToPay, loanAmount]);

  return (
    <div id="emiCalculator" className="bg-white p-6 md:p-8 my-8 border border-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">EMI Calculator</h2>

      <div className="space-y-8">
        {/* Down Payment Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium text-gray-700">Down Payment (Minimum 30%)</label>
            <span className="font-semibold text-gray-900">{formatPrice(downPayment)}</span>
          </div>
          <Slider
            value={[downPayment]}
            onValueChange={(value) => setDownPayment(value[0])}
            min={minDownPayment}
            max={price}
            step={1000}
            className="w-full"
          />
        </div>

        {/* Interest Rate (fixed) */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium text-gray-700">Annual Interest Rate (%)</label>
            <span className="font-semibold text-gray-900">{interestRate.toFixed(1)}%</span>
          </div>
          
        </div>

        {/* Tenure Slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium text-gray-700">Term/Period (Months)</label>
            <span className="font-semibold text-gray-900">{tenure}</span>
          </div>
          <Slider
            value={[tenure]}
            onValueChange={(value) => setTenure(value[0])}
            min={1}
            max={60}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="space-y-4">
          <div className="flex justify-between text-gray-600">
            <span>Total Interest Payment</span>
            <span className="font-medium text-gray-800">{formatPrice(totalInterestPayment)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Total Amount to Pay</span>
            <span className="font-medium text-gray-800">{formatPrice(totalAmountToPay)}</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-800">EMI Monthly Payment</span>
            <span className="text-2xl font-bold text-blue-600">{formatPrice(emi)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
