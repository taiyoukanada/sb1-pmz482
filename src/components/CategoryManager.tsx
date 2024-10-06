import React, { useState } from 'react';
import { PlusCircle, XCircle } from 'lucide-react';

interface CategoryManagerProps {
  categories: string[];
  onAddCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  onAddCategory,
  onDeleteCategory,
  selectedCategory,
  onSelectCategory,
}) => {
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">カテゴリ管理</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="新しいカテゴリ"
          className="flex-grow mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <PlusCircle className="h-5 w-5" />
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory('')}
          className={`px-3 py-1 rounded-full ${
            selectedCategory === '' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          すべて
        </button>
        {categories.map((category) => (
          <div key={category} className="flex items-center">
            <button
              onClick={() => onSelectCategory(category)}
              className={`px-3 py-1 rounded-full ${
                selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {category}
            </button>
            <button
              onClick={() => onDeleteCategory(category)}
              className="ml-1 text-red-500 hover:text-red-700"
            >
              <XCircle className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;