import React, { useState } from 'react';
import { Transaction } from '../types';
import { Trash2, Edit2, Check, X } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
  categories: string[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete, onEdit, categories }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTransaction, setEditedTransaction] = useState<Transaction | null>(null);

  const handleEditClick = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setEditedTransaction({ ...transaction });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedTransaction(null);
  };

  const handleSaveEdit = () => {
    if (editedTransaction) {
      onEdit(editedTransaction);
      setEditingId(null);
      setEditedTransaction(null);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editedTransaction) {
      const { name, value } = e.target;
      setEditedTransaction({
        ...editedTransaction,
        [name]: name === 'amount' ? parseFloat(value) : value,
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">取引履歴</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日付</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金額（円）</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">カテゴリ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">説明</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">種類</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === transaction.id ? (
                    <input
                      type="date"
                      name="date"
                      value={editedTransaction?.date}
                      onChange={handleEditChange}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    transaction.date
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === transaction.id ? (
                    <input
                      type="number"
                      name="amount"
                      value={editedTransaction?.amount}
                      onChange={handleEditChange}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === transaction.id ? (
                    <select
                      name="category"
                      value={editedTransaction?.category}
                      onChange={handleEditChange}
                      className="w-full px-2 py-1 border rounded"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  ) : (
                    transaction.category
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === transaction.id ? (
                    <input
                      type="text"
                      name="description"
                      value={editedTransaction?.description}
                      onChange={handleEditChange}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    transaction.description
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === transaction.id ? (
                    <select
                      name="type"
                      value={editedTransaction?.type}
                      onChange={handleEditChange}
                      className="w-full px-2 py-1 border rounded"
                    >
                      <option value="収入">収入</option>
                      <option value="支出">支出</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.type === '収入' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {transaction.type}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === transaction.id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="text-green-600 hover:text-green-900 mr-2"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-red-600 hover:text-red-900"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(transaction)}
                        className="text-blue-600 hover:text-blue-900 mr-2"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => onDelete(transaction.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;