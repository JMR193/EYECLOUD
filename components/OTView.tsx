import React, { useEffect, useState } from 'react';
import { Scissors, Clock, CalendarDays, CheckCircle } from 'lucide-react';
import { Surgery } from '../types';
import { api } from '../services/apiService';

const OTView: React.FC = () => {
    const [surgeries, setSurgeries] = useState<Surgery[]>([]);

    useEffect(() => {
        api.surgery.getSchedule().then(setSurgeries);
    }, []);

    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Operation Theatre (OT)</h2>
                <p className="text-slate-500">Surgery scheduling, anesthesia status, and post-op tracking.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Schedule List */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="font-bold text-slate-800 text-lg flex items-center">
                        <CalendarDays className="w-5 h-5 mr-2 text-slate-500" />
                        Today's Schedule
                    </h3>
                    
                    {surgeries.map(surgery => (
                        <div key={surgery.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start space-x-4">
                                <div className="bg-slate-100 p-3 rounded-xl text-center min-w-[80px]">
                                    <span className="block text-lg font-bold text-slate-800">{surgery.startTime}</span>
                                    <span className="text-xs text-slate-500 uppercase">{surgery.theater}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg">{surgery.patientName}</h4>
                                    <p className="text-primary-600 font-medium">{surgery.procedure}</p>
                                    <p className="text-sm text-slate-500 mt-1">Surgeon: {surgery.surgeonName}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <div className="flex flex-col items-end">
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                        surgery.status === 'Surgery' ? 'bg-red-50 text-red-600 border border-red-100 animate-pulse' :
                                        surgery.status === 'Pre-Op' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                        'bg-green-50 text-green-600 border border-green-100'
                                    }`}>
                                        {surgery.status}
                                    </span>
                                </div>
                                <button className="p-2 hover:bg-slate-50 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors">
                                    Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* OT Status Panel */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">Theater Status</h3>
                        <div className="space-y-4">
                            {['OT-1', 'OT-2', 'OT-3'].map(ot => (
                                <div key={ot} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-3 h-3 rounded-full ${ot === 'OT-1' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                                        <span className="font-medium text-slate-700">{ot}</span>
                                    </div>
                                    <span className="text-xs text-slate-500">{ot === 'OT-1' ? 'In Use' : 'Sterile & Ready'}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                     <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">Pre-Op Checklist</h3>
                        <div className="space-y-2">
                             <label className="flex items-center space-x-3 text-sm text-slate-600">
                                 <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" defaultChecked />
                                 <span>Consent Form Signed</span>
                             </label>
                             <label className="flex items-center space-x-3 text-sm text-slate-600">
                                 <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" defaultChecked />
                                 <span>Anesthesia Clearance</span>
                             </label>
                             <label className="flex items-center space-x-3 text-sm text-slate-600">
                                 <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" />
                                 <span>IOL Lens Verified</span>
                             </label>
                             <label className="flex items-center space-x-3 text-sm text-slate-600">
                                 <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" />
                                 <span>Patient Marked</span>
                             </label>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default OTView;