
import React, { useEffect, useState } from 'react';
import { Archive, Plus } from 'lucide-react';
import { InventoryItem } from '../types';
import { api } from '../services/apiService';

const StoresView: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    api.inventory.getStock('General').then(setItems);
  }, []);

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
      <header className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">General Stores</h2>
            <p className="text-slate-500">Stationery, housekeeping, and general supplies.</p>
          </div>
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-slate-50">
            <Plus className="w-4 h-4 mr-2" /> Add Item
          </button>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                    <th className="px-6 py-4">Item Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {items.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-800 flex items-center">
                            <Archive className="w-4 h-4 mr-3 text-slate-400" />
                            {item.name}
                        </td>
                        <td className="px-6 py-4 text-slate-600 text-sm">{item.category}</td>
                        <td className="px-6 py-4 text-slate-600 text-sm">{item.stock}</td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                                item.status === 'In Stock' ? 'bg-slate-100 text-slate-600' : 'bg-red-50 text-red-600'
                            }`}>
                                {item.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoresView;
