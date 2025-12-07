import React, { useEffect, useState } from 'react';
import { Package, AlertTriangle } from 'lucide-react';
import { InventoryItem } from '../types';
import { api } from '../services/apiService';

const InventoryView: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.inventory.getStock().then(data => {
        setItems(data);
        setLoading(false);
    });
  }, []);

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
      <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Optical Store & Pharmacy</h2>
          <p className="text-slate-500">Inventory management for frames, lenses, and medications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
           <div>
             <p className="text-sm font-medium text-slate-500">Total Items</p>
             <h3 className="text-2xl font-bold text-slate-800">1,240</h3>
           </div>
           <Package className="w-8 h-8 text-primary-200" />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
           <div>
             <p className="text-sm font-medium text-slate-500">Low Stock</p>
             <h3 className="text-2xl font-bold text-amber-600">12</h3>
           </div>
           <AlertTriangle className="w-8 h-8 text-amber-200" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
             <div className="p-12 text-center text-slate-500">Checking stock levels...</div>
        ) : (
        <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Item Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock Level</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">{item.name}</td>
                  <td className="px-6 py-4 text-slate-600">{item.category}</td>
                  <td className="px-6 py-4 text-slate-600">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 font-mono text-sm">{item.stock} units</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.status === 'In Stock' ? 'bg-green-50 text-green-700' :
                        item.status === 'Low Stock' ? 'bg-amber-50 text-amber-700' :
                        'bg-red-50 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
        )}
      </div>
    </div>
  );
};

export default InventoryView;