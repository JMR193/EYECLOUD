import React, { useEffect, useState } from 'react';
import { TestTube, FlaskConical, CheckCircle2, AlertCircle } from 'lucide-react';
import { LabOrder } from '../types';
import { api } from '../services/apiService';

const LabView: React.FC = () => {
  const [orders, setOrders] = useState<LabOrder[]>([]);

  useEffect(() => {
    api.lab.getOrders().then(setOrders);
  }, []);

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
      <header className="mb-8 flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Laboratory & Pathology</h2>
            <p className="text-slate-500">Manage lab orders, sample collection, and results.</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center shadow-sm">
            <FlaskConical className="w-4 h-4 mr-2" />
            New Order
        </button>
      </header>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Test Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">#{order.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-800">{order.patientName}</td>
                  <td className="px-6 py-4 text-slate-700">{order.testName}</td>
                  <td className="px-6 py-4">
                      {order.priority === 'Urgent' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                              <AlertCircle className="w-3 h-3 mr-1" /> Urgent
                          </span>
                      ) : (
                          <span className="text-slate-500 text-xs">Normal</span>
                      )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Completed' ? 'bg-green-50 text-green-700 border border-green-100' :
                        order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                        'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {order.status === 'Completed' ? (
                         <button className="text-primary-600 hover:text-primary-700 text-xs font-semibold">View Result</button>
                    ) : (
                         <button className="text-slate-600 hover:text-primary-600 text-xs font-semibold border border-slate-200 px-3 py-1 rounded bg-white hover:bg-slate-50">Update Status</button>
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

export default LabView;