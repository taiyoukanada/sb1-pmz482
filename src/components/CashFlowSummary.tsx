import React from 'react';
import { Transaction } from '../types';
import { ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react';

interface CashFlowSummaryProps {
  transactions: Transaction[];
}

const CashFlowSummary: React.FC<CashFlowSummaryProps> = ({ transactions }) => {
  const totalIncome = transactions
    .filter((t) => t.type === '収入')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === '支出')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">キャッシュフロー概要</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-lg">
          <div className="flex items-center">
            <ArrowUpCircle className="h-8 w-8 text-green-600 mr-2" />
            <span className="text-lg font-semibold">総収入</span>
          </div>
          <p className="text-2xl font-bold text-green-600 mt-2">{formatCurrency(totalIncome)}円</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <div className="flex items-center">
            <ArrowDownCircle className="h-8 w-8 text-red-600 mr-2" />
            <span className="text-lg font-semibold">総支出</span>
          </div>
          <p className="text-2xl font-bold text-red-600 mt-2">{formatCurrency(totalExpenses)}円</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-lg font-semibold">残高</span>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-2">{formatCurrency(balance)}円</p>
        </div>
      </div>
    </div>
  );
};

export default CashFlowSummary;