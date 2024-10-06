export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  type: '収入' | '支出';
}

export interface TransactionFormData {
  date: string;
  amount: string;
  category: string;
  description: string;
  type: '収入' | '支出';
}