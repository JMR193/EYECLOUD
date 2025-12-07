import React from 'react';
import { Database, Share2, Globe, Lock, Users, LineChart, FileText } from 'lucide-react';

const ResearchView: React.FC = () => {
    const trials = [
        { id: "CT-2023-001", title: "AI in Glaucoma Detection", phase: "Phase III", participants: 1240, status: "Recruiting" },
        { id: "CT-2023-089", title: "VR Therapy for Amblyopia", phase: "Phase II", participants: 45, status: "Active" },
        { id: "CT-2024-012", title: "Myopia Control Atropine", phase: "Phase IV", participants: 5000, status: "Data Analysis" },
    ];

    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Research & Clinical AI</h2>
                <p className="text-slate-500">Federated Learning, Data Analytics, and Clinical Trials management.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Federated Learning Card */}
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-10 -mt-10" />
                    <div className="relative z-10">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-indigo-100 p-3 rounded-xl">
                                <Share2 className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Federated Learning Node</h3>
                        </div>
                        <p className="text-slate-600 text-sm mb-6">
                            Contributing anonymous model weights to the Global Eye Health Consortium without sharing raw patient data.
                        </p>
                        <div className="flex items-center space-x-6 text-sm">
                            <div className="flex items-center text-slate-500">
                                <Globe className="w-4 h-4 mr-2" /> Global Rank: #42
                            </div>
                            <div className="flex items-center text-slate-500">
                                <Database className="w-4 h-4 mr-2" /> 1.2M Parameters
                            </div>
                            <div className="flex items-center text-emerald-600 font-bold">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" /> Active
                            </div>
                        </div>
                    </div>
                </div>

                {/* Privacy & Compliance Card */}
                <div className="bg-slate-900 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-slate-800 p-3 rounded-xl">
                                <Lock className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold">Privacy-Preserving AI</h3>
                        </div>
                        <p className="text-slate-400 text-sm mb-6">
                            Using Differential Privacy and Homomorphic Encryption to ensure patient data remains secure during multi-site studies.
                        </p>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                                <span className="text-slate-400">Anonymization Protocol</span>
                                <span className="text-emerald-400 font-mono">ISO-27701</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Consent Management</span>
                                <span className="text-white font-mono">ABDM-HIE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Clinical Trials List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-slate-500" />
                        Active Clinical Trials
                    </h3>
                    <button className="text-sm font-medium text-primary-600 hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors">
                        + New Study
                    </button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Trial ID</th>
                            <th className="px-6 py-4">Study Title</th>
                            <th className="px-6 py-4">Phase</th>
                            <th className="px-6 py-4">Participants</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Analytics</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {trials.map(trial => (
                            <tr key={trial.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono text-sm text-slate-500">{trial.id}</td>
                                <td className="px-6 py-4 font-semibold text-slate-800">{trial.title}</td>
                                <td className="px-6 py-4 text-slate-600 text-sm">{trial.phase}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center text-slate-600 text-sm">
                                        <Users className="w-4 h-4 mr-2 text-slate-400" />
                                        {trial.participants}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                        trial.status === 'Recruiting' ? 'bg-green-50 text-green-700' :
                                        trial.status === 'Active' ? 'bg-blue-50 text-blue-700' :
                                        'bg-amber-50 text-amber-700'
                                    }`}>
                                        {trial.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-primary-600 transition-colors">
                                        <LineChart className="w-5 h-5" />
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

export default ResearchView;