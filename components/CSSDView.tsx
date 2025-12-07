import React, { useEffect, useState } from 'react';
import { Recycle, PackageCheck, AlertTriangle, Clock } from 'lucide-react';
import { CSSDItem } from '../types';
import { api } from '../services/apiService';

const CSSDView: React.FC = () => {
    const [items, setItems] = useState<CSSDItem[]>([]);
    
    useEffect(() => {
        api.cssd.getItems().then(setItems);
    }, []);

    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">CSSD Management</h2>
                <p className="text-slate-500">Central Sterile Supply Department tracking and instrument lifecycle.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-500 text-sm font-medium">Autoclave Status</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Running</h3>
                    <p className="text-xs text-slate-400 mt-1">Cycle #4092 • 15 mins left</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                     <span className="text-slate-500 text-sm font-medium block mb-2">Sterile Packs</span>
                     <h3 className="text-2xl font-bold text-emerald-600">142</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                     <span className="text-slate-500 text-sm font-medium block mb-2">Expiring Today</span>
                     <h3 className="text-2xl font-bold text-amber-600">4</h3>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 font-semibold text-slate-700">Sterilization Inventory</div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Set Name</th>
                            <th className="px-6 py-4">Batch No</th>
                            <th className="px-6 py-4">Sterilized On</th>
                            <th className="px-6 py-4">Expiry</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {items.map(item => (
                            <tr key={item.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                                <td className="px-6 py-4 font-mono text-xs text-slate-500">{item.batchNo}</td>
                                <td className="px-6 py-4 text-slate-600 text-sm">{item.sterilizationDate}</td>
                                <td className="px-6 py-4 text-slate-600 text-sm">{item.expiryDate}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full border ${
                                        item.status === 'Sterile' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                        item.status === 'Expired' ? 'bg-red-50 text-red-700 border-red-100' :
                                        'bg-blue-50 text-blue-700 border-blue-100'
                                    }`}>
                                        {item.status === 'Sterile' && <PackageCheck className="w-3 h-3" />}
                                        {item.status === 'Expired' && <AlertTriangle className="w-3 h-3" />}
                                        {item.status === 'Autoclaving' && <Recycle className="w-3 h-3 animate-spin" />}
                                        <span>{item.status}</span>
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

export default CSSDView;