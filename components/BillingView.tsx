import React, { useEffect, useState } from 'react';
import { Download, Plus, Mail, MessageSquare, Filter } from 'lucide-react';
import { Invoice, BillingCategory } from '../types';
import { api } from '../services/apiService';

const BillingView: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<BillingCategory | 'All'>('All');
  const [sendingId, setSendingId] = useState<string | null>(null);

  useEffect(() => {
    api.billing.getInvoices().then(data => {
        setInvoices(data);
        setLoading(false);
    });
  }, []);

  const handleSendDigital = async (id: string) => {
    setSendingId(id);
    await api.billing.sendDigitalInvoice(id);
    setSendingId(null);
    alert("Invoice sent via SMS & Email!");
  };

  const filteredInvoices = filter === 'All' ? invoices : invoices.filter(i => i.category === filter);

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Billing & Claims</h2>
          <p className="text-slate-500">Manage OPD, IPD, Insurance and Corporate billing</p>
        </div>
        <button className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-primary-200">
          <Plus className="w-5 h-5" />
          <span>New Invoice</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {['All', 'OPD', 'IPD', 'Corporate', 'Insurance', 'Casualty'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    filter === cat 
                    ? 'bg-slate-800 text-white' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                  {cat}
              </button>
          ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
            <div className="p-12 text-center text-slate-500">Loading invoices...</div>
        ) : (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Invoice ID</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Paperless Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-slate-600">{inv.id}</td>
                    <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">{inv.patientName}</div>
                        <div className="text-xs text-slate-400">{inv.date}</div>
                    </td>
                    <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            {inv.category}
                        </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">${inv.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            inv.status === 'Paid' ? 'bg-green-50 text-green-700 border border-green-100' :
                            inv.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                            'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                        {inv.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                            <button 
                                onClick={() => handleSendDigital(inv.id)}
                                disabled={sendingId === inv.id}
                                className="text-slate-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-all disabled:opacity-50"
                                title="Send Email/SMS"
                            >
                                {sendingId === inv.id ? <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /> : <Mail className="w-5 h-5" />}
                            </button>
                            <button className="text-slate-400 hover:text-primary-600 p-2 hover:bg-white rounded-full transition-all">
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        )}
      </div>
    </div>
  );
};

export default BillingView;