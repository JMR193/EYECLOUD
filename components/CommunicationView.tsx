
import React from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';

const CommunicationView: React.FC = () => {
    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Email & SMS Integration</h2>
                <p className="text-slate-500">Patient communication logs and templates.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                     <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                         <MessageSquare className="w-5 h-5 mr-2 text-primary-600" />
                         SMS Gateway
                     </h3>
                     <div className="space-y-4">
                         <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 border border-slate-100">
                             <strong>Template: Appointment Reminder</strong><br/>
                             "Dear [Patient Name], your appointment with [Doctor Name] is scheduled for [Date] at [Time]. - EyeCloud"
                         </div>
                         <div className="flex justify-between items-center text-xs text-slate-400">
                             <span>Credits Remaining: 4,500</span>
                             <span className="text-emerald-500 font-bold">Active</span>
                         </div>
                     </div>
                 </div>

                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                     <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                         <Mail className="w-5 h-5 mr-2 text-primary-600" />
                         Email Server (SMTP)
                     </h3>
                     <div className="space-y-4">
                         <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 border border-slate-100">
                             <strong>Template: Digital Invoice</strong><br/>
                             "Hi [Patient Name], please find attached the invoice for your recent visit. Thank you for choosing EyeCloud."
                         </div>
                         <div className="flex justify-between items-center text-xs text-slate-400">
                             <span>Service: AWS SES</span>
                             <span className="text-emerald-500 font-bold">Verified</span>
                         </div>
                     </div>
                 </div>
            </div>
            
            <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                 <h3 className="font-bold text-slate-800 mb-4">Recent Logs</h3>
                 <ul className="space-y-3">
                     {[1,2,3].map(i => (
                         <li key={i} className="flex items-center justify-between text-sm py-2 border-b border-slate-50 last:border-0">
                             <div className="flex items-center space-x-3">
                                 <div className="p-2 bg-slate-100 rounded-full"><Send className="w-3 h-3 text-slate-500" /></div>
                                 <span className="text-slate-700">SMS sent to +1 555-0123</span>
                             </div>
                             <span className="text-xs text-slate-400">Just now</span>
                         </li>
                     ))}
                 </ul>
            </div>
        </div>
    );
};

export default CommunicationView;
