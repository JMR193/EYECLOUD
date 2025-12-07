import React, { useEffect, useState } from 'react';
import { BedDouble, UserPlus, LogOut, ArrowRightLeft } from 'lucide-react';
import { WardBed } from '../types';
import { api } from '../services/apiService';

const WardView: React.FC = () => {
    const [beds, setBeds] = useState<WardBed[]>([]);
    
    useEffect(() => {
        api.ward.getBeds().then(setBeds);
    }, []);

    const wards = ['General', 'Private', 'ICU'];

    return (
        <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
             <header className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Inpatient Management (IPD)</h2>
                    <p className="text-slate-500">Bed allocation, transfers, and discharge summaries.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-slate-50">
                        <ArrowRightLeft className="w-4 h-4 mr-2" />
                        Transfer
                    </button>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center shadow-sm">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Admit Patient
                    </button>
                </div>
            </header>

            <div className="space-y-8">
                {wards.map(wardName => {
                    const wardBeds = beds.filter(b => b.ward === wardName);
                    return (
                        <div key={wardName}>
                            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                                <span className="w-2 h-6 bg-primary-500 rounded-full mr-3" />
                                {wardName} Ward
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {wardBeds.map(bed => (
                                    <div key={bed.id} className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer group ${
                                        bed.status === 'Occupied' 
                                        ? 'bg-white border-primary-200 hover:border-primary-400' 
                                        : bed.status === 'Maintenance' 
                                        ? 'bg-slate-100 border-slate-200 opacity-70'
                                        : 'bg-emerald-50 border-emerald-100 hover:border-emerald-300'
                                    }`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-bold text-lg text-slate-700">{bed.number}</span>
                                            {bed.status === 'Occupied' ? (
                                                <div className="w-2 h-2 rounded-full bg-red-500 shadow-sm" title="Occupied" />
                                            ) : bed.status === 'Available' ? (
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" title="Available" />
                                            ) : (
                                                <div className="w-2 h-2 rounded-full bg-amber-500 shadow-sm" title="Maintenance" />
                                            )}
                                        </div>
                                        <div className="min-h-[40px]">
                                            {bed.patientName ? (
                                                <p className="text-sm font-semibold text-slate-800 truncate">{bed.patientName}</p>
                                            ) : (
                                                <p className="text-xs text-emerald-600 font-medium">Available</p>
                                            )}
                                            {bed.admissionDate && (
                                                <p className="text-[10px] text-slate-400 mt-1">Since {bed.admissionDate}</p>
                                            )}
                                        </div>

                                        {bed.status === 'Occupied' && (
                                            <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-2 transition-opacity rounded-xl">
                                                <button className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100" title="Discharge">
                                                    <LogOut className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {/* Add placeholder beds to fill grid visually */}
                                {wardBeds.length === 0 && (
                                    <div className="col-span-full py-4 text-slate-400 text-sm italic">No beds configured in this ward.</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WardView;