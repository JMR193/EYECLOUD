
import React from 'react';
import { Eye, Activity, ZoomIn, Layers, Zap, Baby, Microscope, ScanEye } from 'lucide-react';

const DepartmentsView: React.FC = () => {
    const departments = [
        {
            name: "General Ophthalmology",
            desc: "Comprehensive eye exams and primary care.",
            icon: Eye,
            stats: "4 Doctors",
            color: "bg-blue-500"
        },
        {
            name: "Cornea & External Diseases",
            desc: "Management of corneal conditions and transplants.",
            icon: Layers,
            stats: "2 Specialists",
            color: "bg-emerald-500"
        },
        {
            name: "Cataract Services",
            desc: "Advanced Phacoemulsification and IOL surgeries.",
            icon: Activity, // Placeholder
            stats: "3 Surgeons",
            color: "bg-amber-500"
        },
        {
            name: "Glaucoma Services",
            desc: "IOP management, visual fields, and surgeries.",
            icon: ZoomIn,
            stats: "2 Specialists",
            color: "bg-indigo-500"
        },
        {
            name: "Medical Retina",
            desc: "Diabetic Retinopathy, ARMD, and vascular disorders.",
            icon: ScanEye,
            stats: "2 Specialists",
            color: "bg-rose-500"
        },
        {
            name: "Ophthalmic Pathology",
            desc: "Diagnostic services for eye tissues and tumors.",
            icon: Microscope,
            stats: "1 Pathologist",
            color: "bg-violet-500"
        },
        {
            name: "Pediatric Ophthalmology",
            desc: "Eye care for children, strabismus, and amblyopia.",
            icon: Baby,
            stats: "1 Specialist",
            color: "bg-cyan-500"
        },
        {
            name: "Refractive Surgery",
            desc: "LASIK, PRK, and vision correction procedures.",
            icon: Zap,
            stats: "1 Surgeon",
            color: "bg-orange-500"
        }
    ];

    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
            <header className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Departments & Specialties</h2>
                <p className="text-slate-500">Centers of Excellence at EyeCloud Hospital.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {departments.map((dept, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all group cursor-pointer">
                        <div className={`${dept.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                            <dept.icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg mb-2">{dept.name}</h3>
                        <p className="text-sm text-slate-500 mb-4 h-10">{dept.desc}</p>
                        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">{dept.stats}</span>
                            <button className="text-xs font-medium text-primary-600 hover:text-primary-700">View Schedule &rarr;</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DepartmentsView;
