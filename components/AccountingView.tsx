
import React from 'react';
import { BarChart3, CheckCircle2, ArrowRightLeft, FileSpreadsheet } from 'lucide-react';

const AccountingView: React.FC = () => {
    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Accounting Integration</h2>
                <p className="text-slate-500">Financial ledger syncing and ERP status.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center space-x-3">
                             <div className="bg-emerald-100 p-3 rounded-xl">
                                 <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
                             </div>
                             <div>
                                 <h3 className="font-bold text-slate-800">Tally Prime</h3>
                                 <p className="text-xs text-slate-500">Financial ERP</p>
                             </div>
                         </div>
                         <div className="flex items-center text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full">
                             <CheckCircle2 className="w-4 h-4 mr-2" />
                             Connected
                         </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg">
                            <span className="text-slate-600">Last Sync</span>
                            <span className="font-mono font-medium">Today, 10:00 AM</span>
                        </div>
                        <div className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg">
                            <span className="text-slate-600">Pending Vouchers</span>
                            <span className="font-mono font-medium">0</span>
                        </div>
                        <button className="w-full bg-slate-800 text-white py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors">
                            Sync Now
                        </button>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">Financial Overview (Simulated)</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-600">Revenue Goal</span>
                                <span className="font-bold text-slate-800">75%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-primary-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-600">Expense Budget</span>
                                <span className="font-bold text-slate-800">42%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountingView;
