import React, { useEffect, useState } from 'react';
import { Clock, User, ChevronRight, CheckCircle2 } from 'lucide-react';
import { QueueItem } from '../types';
import { api } from '../services/apiService';

const QueueView: React.FC = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);

  useEffect(() => {
    api.queue.getStatus().then(setQueue);
  }, []);

  const stages = ['Waiting', 'Vitals', 'In Consultation', 'Billing'];

  return (
    <div className="p-8 h-full overflow-hidden flex flex-col bg-slate-50/50">
       <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Queue Management</h2>
          <p className="text-slate-500">Real-time OPD patient flow</p>
       </div>

       <div className="flex-1 overflow-x-auto">
          <div className="flex space-x-6 min-w-max h-full pb-4">
             {stages.map(stage => {
                const items = queue.filter(q => q.status === stage);
                return (
                    <div key={stage} className="w-80 flex flex-col bg-slate-100/50 rounded-2xl border border-slate-200">
                        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                            <h3 className="font-bold text-slate-700">{stage}</h3>
                            <span className="bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded-full font-bold">{items.length}</span>
                        </div>
                        <div className="p-3 space-y-3 overflow-y-auto flex-1">
                            {items.length === 0 && (
                                <div className="text-center py-10 text-slate-400 text-sm italic">No patients</div>
                            )}
                            {items.map(item => (
                                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-grab hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-mono font-bold text-primary-600 bg-primary-50 px-1.5 rounded">{item.tokenNumber}</span>
                                        <div className="flex items-center text-xs text-slate-400">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {item.waitTime}
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-slate-800 mb-1">{item.patientName}</h4>
                                    <div className="flex items-center text-xs text-slate-500">
                                        <User className="w-3 h-3 mr-1" />
                                        {item.assignedDoctor}
                                    </div>
                                    
                                    {/* Action Button */}
                                    <div className="mt-3 pt-3 border-t border-slate-50 flex justify-end">
                                        <button className="text-xs font-medium text-primary-600 hover:bg-primary-50 px-2 py-1 rounded flex items-center transition-colors">
                                            Move Next <ChevronRight className="w-3 h-3 ml-1" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
             })}
          </div>
       </div>
    </div>
  );
};

export default QueueView;