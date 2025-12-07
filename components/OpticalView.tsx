
import React, { useEffect, useState } from 'react';
import { Glasses, Search } from 'lucide-react';
import { InventoryItem } from '../types';
import { api } from '../services/apiService';

const OpticalView: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    api.inventory.getStock('Optical').then(setItems);
  }, []);

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
      <header className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Optical Store</h2>
            <p className="text-slate-500">Frames, lenses, and accessories inventory.</p>
          </div>
          <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search frames..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none" />
          </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-slate-100 h-32 rounded-lg mb-4 flex items-center justify-center">
                    <Glasses className="w-12 h-12 text-slate-300" />
                </div>
                <h3 className="font-bold text-slate-800">{item.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{item.category}</p>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-primary-600">${item.price}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                        item.stock > 10 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                        {item.stock} left
                    </span>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default OpticalView;
