
import React, { useEffect, useState } from 'react';
import { ShoppingCart, Plus, Filter, FileText, CheckCircle } from 'lucide-react';
import { PurchaseOrder } from '../types';
import { api } from '../services/apiService';

const PurchaseView: React.FC = () => {
    const [orders, setOrders] = useState<PurchaseOrder[]>([]);

    useEffect(() => {
        api.purchase.getOrders().then(setOrders);
    }, []);

    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Purchase Management</h2>
                    <p className="text-slate-500">Manage vendor orders, receiving, and procurement.</p>
                </div>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center shadow-sm hover:bg-primary-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create PO
                </button>
            </header>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                         <Filter className="w-4 h-4 text-slate-400" />
                         <span className="text-sm text-slate-600 font-medium">Filter Status</span>
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">PO Number</th>
                            <th className="px-6 py-4">Vendor</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Items</th>
                            <th className="px-6 py-4">Total Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {orders.map(po => (
                            <tr key={po.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono text-sm text-primary-600 font-medium">{po.id}</td>
                                <td className="px-6 py-4 font-semibold text-slate-800">{po.vendor}</td>
                                <td className="px-6 py-4 text-slate-600 text-sm">{po.date}</td>
                                <td className="px-6 py-4 text-slate-600 text-sm">{po.itemsCount}</td>
                                <td className="px-6 py-4 font-bold text-slate-800">${po.totalAmount.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                        po.status === 'Received' ? 'bg-green-50 text-green-700 border border-green-100' :
                                        po.status === 'Paid' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                        po.status === 'Sent' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                        'bg-slate-100 text-slate-600 border border-slate-200'
                                    }`}>
                                        {po.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-primary-600 p-2">
                                        <FileText className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PurchaseView;
