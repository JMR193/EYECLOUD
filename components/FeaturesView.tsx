import React, { useState } from 'react';
import { 
    Microscope, Package, Zap, Activity, FileText, Glasses, History, Cloud, Users, 
    Check, Smartphone, Brain, ScanEye, Share2, School, ShieldCheck, HeartPulse, 
    MonitorSmartphone, Stethoscope, GraduationCap, Building2, UserCheck, Eye, Layers
} from 'lucide-react';

const FeaturesView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'core' | 'professionals' | 'institutions' | 'patients'>('core');

    const coreFeatures = [
        {
            title: "Ophthalmology Specific Workups",
            desc: "Dedicated modules for Auto Refraction, Optometry, Laser Workup, and FFA Workup.",
            icon: Microscope,
            color: "bg-indigo-600",
            highlight: true
        },
        {
            title: "Integrated Optical & Pharmacy",
            desc: "Unified billing and real-time stock deductions for frames, lenses, and drops.",
            icon: Package,
            color: "bg-rose-500"
        },
        {
            title: "Doctor Drawing Tool",
            desc: "Interactive eye diagram (OD/OS) for doctors to visually mark pathologies.",
            icon: Activity,
            color: "bg-blue-500"
        },
        {
            title: "Clinical Diagnosis AI",
            desc: "Advanced AI suggestions for differential diagnosis based on symptoms.",
            icon: Brain,
            color: "bg-sky-500"
        },
        {
            title: "Laser & FFA Modules",
            desc: "Document Laser procedures (PRP, YAG) and Angiography findings.",
            icon: Zap,
            color: "bg-amber-500"
        },
        {
            title: "Auto Refraction & Optometry",
            desc: "Capture AR values, NCT (IOP), and Subjective Acceptance workflow.",
            icon: Glasses,
            color: "bg-slate-800"
        }
    ];

    const professionalUseCases = [
        {
            category: "Ophthalmologists",
            icon: Eye,
            features: [
                { title: "AI-Assisted Diagnosis", desc: "Automated screening and risk assessment for Glaucoma & DR." },
                { title: "Surgical Planning", desc: "AR-guided procedures with real-time microscope overlays." },
                { title: "Patient Monitoring", desc: "Digital twin models for disease progression tracking." },
                { title: "Research Collaboration", desc: "Federated learning and anonymized data sharing." }
            ]
        },
        {
            category: "Primary Care Physicians",
            icon: Stethoscope,
            features: [
                { title: "Point-of-Care Screening", desc: "Instant eye health assessment using AI tools." },
                { title: "Referral Decision Support", desc: "AI-powered triage recommendations for specialists." },
                { title: "Patient Education", desc: "Interactive explanations and visual aids for patients." },
                { title: "Telemedicine Integration", desc: "Remote consultations with EyeCloud specialists." }
            ]
        }
    ];

    const institutionalUseCases = [
        {
            category: "Medical Institutions",
            icon: Building2,
            features: [
                { title: "NABH Compliance", desc: "Automated quality reporting and safety monitoring." },
                { title: "ABDM Integration", desc: "Seamless health information exchange (HIE-CM)." },
                { title: "Training Programs", desc: "VR-based medical education and surgical simulation." },
                { title: "Research Platforms", desc: "Clinical trial management and multi-center data analytics." }
            ]
        }
    ];

    const patientUseCases = [
        {
            category: "Preventive Care",
            icon: HeartPulse,
            features: [
                { title: "Regular Monitoring", desc: "Continuous eye health tracking via mobile app." },
                { title: "Early Detection", desc: "AI-powered risk assessment for common conditions." },
                { title: "Lifestyle Optimization", desc: "Personalized health recommendations & ergonomic tips." },
                { title: "Educational Resources", desc: "Interactive learning modules for eye hygiene." }
            ]
        },
        {
            category: "Chronic Disease Management",
            icon: Activity,
            features: [
                { title: "Diabetes Care", desc: "Automated retinopathy screening reminders." },
                { title: "Glaucoma Monitoring", desc: "IOP progression tracking and medication alerts." },
                { title: "Treatment Adherence", desc: "Gamified medication reminders and trackers." },
                { title: "Progress Visualization", desc: "Digital twin health models for patient understanding." }
            ]
        },
        {
            category: "Vision Rehabilitation",
            icon: Glasses,
            features: [
                { title: "VR Therapy", desc: "Immersive vision training exercises for home use." },
                { title: "Amblyopia Treatment", desc: "Engaging games to rehabilitate lazy eye." },
                { title: "Post-Surgical Recovery", desc: "Guided rehabilitation programs after surgery." },
                { title: "Performance Tracking", desc: "Detailed progress analytics shared with doctor." }
            ]
        }
    ];

    const renderUseCaseSection = (data: any[]) => (
        <div className="space-y-8 animate-fadeIn">
            {data.map((section, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center space-x-4">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200">
                            <section.icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">{section.category}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100">
                        {section.features.map((feat: any, fIdx: number) => (
                            <div key={fIdx} className="bg-white p-6 hover:bg-slate-50 transition-colors">
                                <h4 className="font-bold text-slate-800 mb-2 flex items-center">
                                    <Check className="w-4 h-4 text-emerald-500 mr-2" />
                                    {feat.title}
                                </h4>
                                <p className="text-sm text-slate-500 ml-6 leading-relaxed">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
            <header className="mb-8 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-4">
                    <Cloud className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">EyeCloud Ecosystem</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Capabilities & Use Cases</h2>
                <p className="text-slate-600 text-lg">A comprehensive platform tailored for Ophthalmologists, Institutions, and Patients.</p>
            </header>

            {/* Navigation Tabs */}
            <div className="flex justify-center mb-10 overflow-x-auto pb-2">
                <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 flex space-x-1">
                    {[
                        { id: 'core', label: 'Core Features', icon: StarIcon },
                        { id: 'professionals', label: 'Healthcare Pros', icon: Stethoscope },
                        { id: 'institutions', label: 'Institutions', icon: Building2 },
                        { id: 'patients', label: 'For Patients', icon: HeartPulse }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                                activeTab === tab.id 
                                ? 'bg-slate-800 text-white shadow-md' 
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-slate-300' : 'text-slate-400'}`} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-6xl mx-auto">
                {activeTab === 'core' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                        {coreFeatures.map((benefit, index) => (
                            <div key={index} className={`bg-white p-6 rounded-2xl border ${benefit.highlight ? 'border-indigo-200 ring-4 ring-indigo-50' : 'border-slate-100'} shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden`}>
                                {benefit.highlight && (
                                    <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                                        Signature
                                    </div>
                                )}
                                <div className={`w-12 h-12 rounded-xl ${benefit.color} flex items-center justify-center text-white mb-4 shadow-lg shadow-slate-200 group-hover:scale-110 transition-transform`}>
                                    <benefit.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2">{benefit.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'professionals' && renderUseCaseSection(professionalUseCases)}
                
                {activeTab === 'institutions' && renderUseCaseSection(institutionalUseCases)}
                
                {activeTab === 'patients' && renderUseCaseSection(patientUseCases)}
            </div>

            {/* Call to Action Footer */}
            <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden max-w-6xl mx-auto">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4">Ready to transform your practice?</h3>
                    <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                        Join the network of smart hospitals using EyeCloud for NABH compliance, advanced AI diagnostics, and seamless patient care.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-xl font-bold transition-colors">
                            Schedule Demo
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-bold transition-colors backdrop-blur-sm">
                            Contact Sales
                        </button>
                    </div>
                </div>
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />
            </div>
        </div>
    );
};

// Helper Icon for Core tab
function StarIcon(props: any) {
    return (
        <svg 
            {...props}
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}

export default FeaturesView;