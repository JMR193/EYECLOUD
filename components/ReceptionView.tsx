import React from 'react';
import { UserPlus, CalendarPlus, FileText, BedDouble, AlertCircle, Building2, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { AppView } from '../types';

interface ReceptionViewProps {
  onChangeView: (view: AppView) => void;
}

const ReceptionView: React.FC<ReceptionViewProps> = ({ onChangeView }) => {
  
  const actions = [
    {
      title: 'New Patient Registration',
      description: 'Register a new patient to the hospital database.',
      icon: UserPlus,
      color: 'bg-blue-500',
      action: () => onChangeView(AppView.PATIENTS) // In real app, open modal
    },
    {
      title: 'Schedule Appointment',
      description: 'Book OPD or Surgery slots for patients.',
      icon: CalendarPlus,
      color: 'bg-emerald-500',
      action: () => onChangeView(AppView.APPOINTMENTS)
    },
    {
      title: 'OPD Visit Creation',
      description: 'Check-in existing patient for today.',
      icon: ClipboardCheck,
      color: 'bg-violet-500',
      action: () => onChangeView(AppView.QUEUE)
    },
    {
      title: 'IPD Admission',
      description: 'Manage ward allocation and surgery admission.',
      icon: BedDouble,
      color: 'bg-indigo-500',
      action: () => {} 
    }
  ];

  const billingTypes = [
    { label: 'OPD Billing', icon: FileText, color: 'text-blue-600 bg-blue-50' },
    { label: 'Casualty Billing', icon: AlertCircle, color: 'text-red-600 bg-red-50' },
    { label: 'Corporate Billing', icon: Building2, color: 'text-slate-600 bg-slate-50' },
    { label: 'Insurance / TPA', icon: ShieldCheck, color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Front Desk & Reception</h2>
        <p className="text-slate-500">Manage patient flow, registrations, and hospital admissions.</p>
      </header>

      {/* Main Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {actions.map((action, idx) => (
          <button 
            key={idx}
            onClick={action.action}
            className="text-left bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
          >
            <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
              <action.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{action.title}</h3>
            <p className="text-sm text-slate-500">{action.description}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Billing Links */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 text-lg">Billing & Invoicing</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {billingTypes.map((type, idx) => (
              <button 
                key={idx} 
                onClick={() => onChangeView(AppView.BILLING)}
                className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className={`p-3 rounded-full mb-3 ${type.color}`}>
                  <type.icon className="w-6 h-6" />
                </div>
                <span className="font-semibold text-slate-700 text-sm text-center">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Website Link Integration Status */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
           <h3 className="font-bold text-slate-800 mb-4 text-lg">Online Appointments</h3>
           <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-4">
              <div className="flex items-center space-x-2 text-emerald-700 font-semibold mb-1">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span>Website Integrated</span>
              </div>
              <p className="text-xs text-emerald-600">Sync active. 4 new bookings today.</p>
           </div>
           <ul className="space-y-3">
              <li className="flex items-center justify-between text-sm p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">J. Smith (Web)</span>
                <span className="text-xs font-mono bg-white px-2 py-1 border rounded">10:30 AM</span>
              </li>
              <li className="flex items-center justify-between text-sm p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">K. Doe (Web)</span>
                <span className="text-xs font-mono bg-white px-2 py-1 border rounded">02:15 PM</span>
              </li>
           </ul>
        </div>

      </div>
    </div>
  );
};

export default ReceptionView;