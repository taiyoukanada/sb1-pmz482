import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CashFlowSummary from './components/CashFlowSummary';
import CategoryManager from './components/CategoryManager';
import { Transaction, TransactionFormData } from './types';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : ['食費', '交通費', '娯楽費', '給与'];
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const handleAddTransaction = (formData: TransactionFormData) => {
    const newTransaction: Transaction = {
      ...formData,
      id: uuidv4(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleEditTransaction = (editedTransaction: Transaction) => {
    setTransactions(transactions.map((t) => 
      t.id === editedTransaction.id ? editedTransaction : t
    ));
  };

  const handleAddCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const handleDeleteCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category));
  };

  const filteredTransactions = selectedCategory
    ? transactions.filter((t) => t.category === selectedCategory)
    : transactions;

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold text-center mb-8">キャッシュフロー管理</h1>
          <div className="space-y-8">
            <CashFlowSummary transactions={filteredTransactions} />
            <CategoryManager
              categories={categories}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <TransactionForm onSubmit={handleAddTransaction} categories={categories} />
            <TransactionList 
              transactions={filteredTransactions} 
              onDelete={handleDeleteTransaction}
              onEdit={handleEditTransaction}
              categories={categories}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;