
import React from 'react';
import { FileText, Smartphone, CalendarDays, Users, BarChart, Phone, History, ShieldCheck, Check, Package, Activity, Building, Cloud, Maximize, RefreshCw, TrendingUp, Scissors, Microscope, Zap, Glasses } from 'lucide-react';

const FeaturesView: React.FC = () => {
    const benefits = [
        {
            title: "Ophthalmology Specific Workups",
            desc: "Dedicated modules for Auto Refraction, Optometry, Laser Workup, and FFA Workup. Why use a generic EMR when you can have a specialist one?",
            icon: Microscope,
            color: "bg-indigo-600",
            highlight: true
        },
        {
            title: "Integrated Optical & Pharmacy",
            desc: "THE Only Ophthalmology EMR in India seamlessly integrated with Optical & Pharmacy modules. Unified billing and real-time stock deductions.",
            icon: Package,
            color: "bg-rose-500"
        },
        {
            title: "Laser & FFA Modules",
            desc: "Document Laser procedures (PRP, YAG) and Angiography findings with specific parameters like power, spot size, and duration.",
            icon: Zap,
            color: "bg-amber-500"
        },
        {
            title: "Doctor Drawing Tool",
            desc: "Interactive eye diagram (OD/OS) for doctors to visually mark pathologies like hemorrhages, edema, or laser marks directly on the screen.",
            icon: Activity,
            color: "bg-blue-500"
        },
        {
            title: "Ready-to-use Templates",
            desc: "Speed up your consultation with pre-defined templates for Cataract, Glaucoma, Conjunctivitis, and more.",
            icon: FileText,
            color: "bg-emerald-500"
        },
        {
            title: "Auto Refraction & Optometry",
            desc: "Capture AR values, NCT (IOP), and Subjective Acceptance in a structured workflow designed for Optometrists.",
            icon: Glasses,
            color: "bg-slate-800"
        },
        {
            title: "Old Record Integration",
            desc: "Seamlessly import and view legacy patient records and history with a single click during the examination.",
            icon: History,
            color: "bg-cyan-600"
        },
        {
            title: "Clinical Diagnosis AI",
            desc: "Advanced AI suggestions for differential diagnosis based on inputted symptoms and clinical findings.",
            icon: Cloud,
            color: "bg-sky-500"
        },
        {
            title: "Real-time Patient Tracking",
            desc: "Monitor patient flow instantly with color-coded status indicators (Waiting, Dilating, Consulting, Surgery).",
            icon: Users,
            color: "bg-violet-500"
        }
    ];

    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
            <header className="mb-10 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-4">
                    <Microscope className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">India's Best Ophthalmology EMR</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Why Choose EyeCloud?</h2>
                <p className="text-slate-600 text-lg">A comprehensive ecosystem designed specifically for Eye Hospitals with Auto Refraction, Laser Workups, and integrated Optical Store.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {benefits.map((benefit, index) => (
                    <div key={index} className={`bg-white p-6 rounded-2xl border ${benefit.highlight ? 'border-indigo-200 ring-4 ring-indigo-50' : 'border-slate-100'} shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden`}>
                        {benefit.highlight && (
                            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                                New
                            </div>
                        )}
                        <div className={`w-12 h-12 rounded-xl ${benefit.color} flex items-center justify-center text-white mb-4 shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform`}>
                            <benefit.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">{benefit.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">{benefit.desc}</p>
                        
                        <div className="pt-4 border-t border-slate-50 flex items-center text-xs font-semibold text-primary-600">
                             <Check className="w-3 h-3 mr-1" /> Specialist Module
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Features List */}
            <div className="mt-16 bg-white rounded-3xl border border-slate-200 p-8 md:p-12 max-w-7xl mx-auto">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">Additional Capabilities</h3>
                        <ul className="space-y-4">
                            {[
                                "Complete OPD & IPD Management",
                                "Equipment Integration (OCT, Fundus, HFA)",
                                "Surgical Record Management",
                                "IVRS Integration for Patient Calls",
                                "Appointments Management via Mobile App",
                                "Less Resources for IT Operations"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center space-x-3">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-emerald-600" />
                                    </div>
                                    <span className="text-slate-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="bg-slate-900 rounded-2xl p-8 text-white text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="text-xl font-bold mb-2">Transform Your Practice</h4>
                            <p className="text-slate-400 mb-6 text-sm">Join the network of smart eye hospitals today.</p>
                            <button className="w-full bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-bold transition-colors">
                                Schedule a Demo
                            </button>
                        </div>
                        {/* Background Effects */}
                         <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 blur-[50px] rounded-full" />
                         <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full" />
                    </div>
                 </div>
            </div>
        </div>
    );
};

export default FeaturesView;
