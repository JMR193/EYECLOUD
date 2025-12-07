import React, { useState } from 'react';
import { Clipboard, Heart, Droplet, Activity, CheckCircle, Clock } from 'lucide-react';
import { MOCK_PATIENTS } from '../constants';

const NurseStationView: React.FC = () => {
    // Mocking active tasks for nurses
    const tasks = [
        { id: 1, patientName: 'Sarah Jenkins', type: 'Vitals', status: 'Pending', time: '10:00 AM', instruction: 'Check BP and IOP' },
        { id: 2, patientName: 'Robert Wilson', type: 'Medication', status: 'Pending', time: '10:15 AM', instruction: 'Administer Moxifloxacin Eye Drops' },
        { id: 3, patientName: 'Michael Chen', type: 'Pre-Op', status: 'Completed', time: '09:00 AM', instruction: 'Dilate Pupils (Tropicamide)' },
    ];

    const [activeTab, setActiveTab] = useState<'Tasks' | 'Vitals' | 'Meds'>('Tasks');

    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Nurse Work Bench</h2>
                <p className="text-slate-500">Patient care, vitals monitoring, and medication administration</p>
            </header>

            <div className="flex space-x-2 mb-6">
                {['Tasks', 'Vitals', 'Meds'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === tab 
                            ? 'bg-slate-800 text-white' 
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Task List */}
                <div className="lg:col-span-2 space-y-4">
                    {tasks.map(task => (
                        <div key={task.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className={`p-3 rounded-full ${task.type === 'Vitals' ? 'bg-red-50 text-red-500' : task.type === 'Medication' ? 'bg-blue-50 text-blue-500' : 'bg-amber-50 text-amber-500'}`}>
                                    {task.type === 'Vitals' ? <Heart className="w-5 h-5" /> : task.type === 'Medication' ? <Droplet className="w-5 h-5" /> : <Clipboard className="w-5 h-5" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{task.patientName}</h3>
                                    <p className="text-sm text-slate-500">{task.instruction}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-mono bg-slate-100 px-2 py-1 rounded mb-2 inline-block">{task.time}</div>
                                <div>
                                    {task.status === 'Completed' ? (
                                        <span className="flex items-center text-green-600 text-sm font-medium"><CheckCircle className="w-4 h-4 mr-1" /> Done</span>
                                    ) : (
                                        <button className="text-sm bg-primary-600 text-white px-3 py-1.5 rounded-lg hover:bg-primary-700 transition-colors">
                                            Mark Complete
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Vitals Input Panel */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-primary-600" />
                        Quick Vitals Entry
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Patient</label>
                            <select className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50">
                                <option>Select Patient...</option>
                                {MOCK_PATIENTS.map(p => <option key={p.id}>{p.name}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">BP (mmHg)</label>
                                <input type="text" placeholder="120/80" className="w-full p-2 border border-slate-200 rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Pulse (bpm)</label>
                                <input type="number" placeholder="72" className="w-full p-2 border border-slate-200 rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Temp (°F)</label>
                                <input type="number" placeholder="98.6" className="w-full p-2 border border-slate-200 rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">SpO2 (%)</label>
                                <input type="number" placeholder="98" className="w-full p-2 border border-slate-200 rounded-lg text-sm" />
                            </div>
                        </div>
                        <button className="w-full bg-slate-800 text-white py-2 rounded-lg font-medium text-sm hover:bg-slate-700">
                            Save Vitals
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NurseStationView;