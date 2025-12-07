

import React from 'react';
import { Award, CheckCircle, AlertTriangle, FileText, Activity, Users } from 'lucide-react';

const NABHView: React.FC = () => {
    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
            <header className="mb-8">
                <div className="flex items-center space-x-2 mb-1">
                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded">Accreditation</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">NABH Quality Dashboard</h2>
                <p className="text-slate-500">Continuous Quality Improvement (CQI) and Patient Safety Metrics.</p>
            </header>

            {/* Scorecards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Patient Safety Index</p>
                        <h3 className="text-2xl font-bold text-emerald-600">98.2%</h3>
                    </div>
                    <div className="mt-4 w-full bg-slate-100 rounded-full h-1.5">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Waiting Time (OPD)</p>
                        <h3 className="text-2xl font-bold text-slate-800">18 mins</h3>
                    </div>
                    <p className="text-xs text-emerald-600 mt-2">Within target (20 mins)</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Infection Rate</p>
                        <h3 className="text-2xl font-bold text-slate-800">0.05%</h3>
                    </div>
                     <p className="text-xs text-emerald-600 mt-2">Below threshold (1%)</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Feedback Score</p>
                        <h3 className="text-2xl font-bold text-blue-600">4.8/5</h3>
                    </div>
                    <div className="flex -space-x-1 mt-3">
                         {[1,2,3,4,5].map(i => <div key={i} className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[8px] text-blue-700">★</div>)}
                    </div>
                </div>
            </div>

            {/* Compliance Checklist */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-emerald-500" />
                        Compliance Checklist (Nov 2023)
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: "Fire Safety Audit", status: "Compliant" },
                            { label: "Biomedical Waste Disposal", status: "Compliant" },
                            { label: "Narcotic Drug Register", status: "Review Pending", alert: true },
                            { label: "Staff Health Screening", status: "Compliant" },
                            { label: "OT Sterility Culture Reports", status: "Compliant" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <span className="text-sm font-medium text-slate-700">{item.label}</span>
                                <span className={`text-xs px-2 py-1 rounded-full font-bold ${item.alert ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-blue-500" />
                        Automated Reporting
                    </h3>
                    <div className="space-y-3">
                        <div className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-slate-700">Patient Satisfaction Index</span>
                                <span className="text-xs text-slate-400">Generated: Today</span>
                            </div>
                            <p className="text-xs text-slate-500">Based on 145 digital feedback forms.</p>
                        </div>
                        <div className="p-4 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-slate-700">Clinical Audit Report</span>
                                <span className="text-xs text-slate-400">Generated: Yesterday</span>
                            </div>
                            <p className="text-xs text-slate-500">Cataract surgery outcomes and complication rates.</p>
                        </div>
                         <button className="w-full mt-2 py-2 text-sm text-primary-600 font-bold border border-primary-200 rounded-lg hover:bg-primary-50">
                             Generate New Report
                         </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NABHView;