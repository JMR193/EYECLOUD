
import React from 'react';
import { Activity, Download, PieChart, TrendingUp } from 'lucide-react';

const MISView: React.FC = () => {
    const reports = [
        { title: 'Daily Revenue Report', category: 'Financial', date: '2023-12-01' },
        { title: 'OPD Footfall Analysis', category: 'Operational', date: '2023-12-01' },
        { title: 'Pharmacy Stock Valuation', category: 'Financial', date: '2023-11-30' },
        { title: 'Surgery Success Rates', category: 'Clinical', date: '2023-11-28' },
        { title: 'User Login Activity', category: 'Operational', date: '2023-12-01' },
    ];

    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">MIS & Reports</h2>
                <p className="text-slate-500">Management Information System and analytics export.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                    <div className="bg-blue-50 p-3 rounded-full"><TrendingUp className="w-6 h-6 text-blue-600" /></div>
                    <div>
                        <p className="text-slate-500 text-sm">Revenue (Today)</p>
                        <h3 className="text-xl font-bold text-slate-800">$12,450</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
                    <div className="bg-purple-50 p-3 rounded-full"><Activity className="w-6 h-6 text-purple-600" /></div>
                    <div>
                        <p className="text-slate-500 text-sm">Patient Visits</p>
                        <h3 className="text-xl font-bold text-slate-800">142</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 font-bold text-slate-700">Generated Reports</div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Report Title</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Generated On</th>
                            <th className="px-6 py-4 text-right">Download</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {reports.map((report, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-800">{report.title}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        report.category === 'Financial' ? 'bg-green-50 text-green-700' :
                                        report.category === 'Operational' ? 'bg-slate-100 text-slate-700' :
                                        'bg-blue-50 text-blue-700'
                                    }`}>
                                        {report.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-600 text-sm">{report.date}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-primary-600 transition-colors">
                                        <Download className="w-5 h-5" />
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

export default MISView;
