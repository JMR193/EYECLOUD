import React from 'react';
import { HardDrive, Cloud, Server, Share2, Search } from 'lucide-react';
import { ScanImage } from '../types';

const RadiologyView: React.FC = () => {
    // Mock PACS worklist
    const studies = [
        { id: 'ST-001', patient: 'Sarah Jenkins', modality: 'OCT', date: '2023-12-01', status: 'Archived', size: '24 MB' },
        { id: 'ST-002', patient: 'Michael Chen', modality: 'Fundus', date: '2023-11-28', status: 'Available', size: '5 MB' },
        { id: 'ST-003', patient: 'Robert Wilson', modality: 'Topography', date: '2023-11-25', status: 'Available', size: '12 MB' },
    ];

    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Radiology & PACS</h2>
                <p className="text-slate-500">Central imaging archive and DICOM server status.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center space-x-3 mb-4">
                        <Server className="w-6 h-6 text-emerald-400" />
                        <h3 className="font-bold">PACS Server Status</h3>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-slate-400">
                            <span>Uptime</span>
                            <span className="text-white">99.98%</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-400">
                            <span>Storage</span>
                            <span className="text-white">4.2 TB / 10 TB</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-400">
                            <span>HL7 Link</span>
                            <span className="text-emerald-400 font-bold">Connected</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Study Worklist</h3>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Search Patient ID..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Study ID</th>
                            <th className="px-6 py-4">Patient</th>
                            <th className="px-6 py-4">Modality</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Size</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {studies.map(study => (
                            <tr key={study.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-mono text-sm">{study.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-800">{study.patient}</td>
                                <td className="px-6 py-4 text-slate-600">{study.modality}</td>
                                <td className="px-6 py-4 text-slate-600">{study.date}</td>
                                <td className="px-6 py-4 text-slate-600">{study.size}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center space-x-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                                        <Cloud className="w-3 h-3" />
                                        <span>{study.status}</span>
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
                                        <Share2 className="w-4 h-4" />
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

export default RadiologyView;