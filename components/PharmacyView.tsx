
import React, { useEffect, useState } from 'react';
import { Pill, AlertTriangle } from 'lucide-react';
import { InventoryItem } from '../types';
import { api } from '../services/apiService';

const PharmacyView: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    api.inventory.getStock('Pharmacy').then(setItems);
  }, []);

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
      <header className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Pharmacy Management</h2>
          <p className="text-slate-500">Medicines, drops, and consumables stock.</p>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Drug Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800 flex items-center">
                      <div className="bg-blue-50 p-2 rounded-lg mr-3">
                        <Pill className="w-4 h-4 text-blue-600" />
                      </div>
                      {item.name}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{item.category}</td>
                  <td className="px-6 py-4 text-slate-600">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 font-mono text-sm">{item.stock} units</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.status === 'In Stock' ? 'bg-green-50 text-green-700' :
                        item.status === 'Low Stock' ? 'bg-amber-50 text-amber-700' :
                        'bg-red-50 text-red-700'
                    }`}>
                      {item.status === 'Low Stock' && <AlertTriangle className="w-3 h-3 mr-1" />}
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

export default PharmacyView;
