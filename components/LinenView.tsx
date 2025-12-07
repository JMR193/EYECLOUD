
import React, { useEffect, useState } from 'react';
import { Shirt, RefreshCw, Archive, AlertTriangle } from 'lucide-react';
import { LinenBatch } from '../types';
import { api } from '../services/apiService';

const LinenView: React.FC = () => {
    const [batches, setBatches] = useState<LinenBatch[]>([]);

    useEffect(() => {
        api.linen.getBatchStatus().then(setBatches);
    }, []);

    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
             <header className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Linen & Laundry</h2>
                <p className="text-slate-500">Track hospital linen lifecycle and laundry dispatch.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                     <div>
                         <span className="text-sm font-medium text-slate-500">Sent to Laundry</span>
                         <h3 className="text-2xl font-bold text-slate-800">30 Items</h3>
                     </div>
                     <RefreshCw className="w-8 h-8 text-blue-500 animate-spin-slow" />
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                     <div>
                         <span className="text-sm font-medium text-slate-500">Clean Storage</span>
                         <h3 className="text-2xl font-bold text-emerald-600">100 Items</h3>
                     </div>
                     <Archive className="w-8 h-8 text-emerald-500" />
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Batch ID</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Quantity</th>
                            <th className="px-6 py-4">Sent Date</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {batches.map(batch => (
                            <tr key={batch.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono text-sm text-slate-600">{batch.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-800">{batch.type}</td>
                                <td className="px-6 py-4 text-slate-600">{batch.quantity}</td>
                                <td className="px-6 py-4 text-slate-600 text-sm">{batch.sentDate || '-'}</td>
                                <td className="px-6 py-4">
                                     <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                        batch.status === 'Clean Storage' ? 'bg-emerald-50 text-emerald-700' :
                                        batch.status === 'Laundry' ? 'bg-blue-50 text-blue-700' :
                                        'bg-slate-100 text-slate-600'
                                    }`}>
                                        {batch.status}
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

export default LinenView;
