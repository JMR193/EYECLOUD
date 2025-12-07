

import React, { useEffect, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, Plus, Search, User, Grid, List, Filter } from 'lucide-react';
import { Appointment, Doctor, Specialty } from '../types';
import { api } from '../services/apiService';

const AppointmentView: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | 'All'>('All');
  const [showNewModal, setShowNewModal] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'month'>('list');

  useEffect(() => {
    Promise.all([
      api.appointments.getAll(),
      api.appointments.getDoctors()
    ]).then(([aptData, docData]) => {
      setAppointments(aptData);
      setDoctors(docData);
    });
  }, []);

  // Filter doctors based on specialty first
  const filteredDoctors = selectedSpecialty === 'All' 
    ? doctors 
    : doctors.filter(d => d.specialty === selectedSpecialty);

  const filteredAppointments = appointments.filter(a => {
      if (selectedDoctor !== 'all' && a.doctorId !== selectedDoctor) return false;
      if (selectedSpecialty !== 'All') {
          // Find doctor for this appointment
          const doc = doctors.find(d => d.id === a.doctorId);
          if (doc?.specialty !== selectedSpecialty) return false;
      }
      return true;
  });

  const renderMonthView = () => {
      const days = Array.from({length: 31}, (_, i) => i + 1);
      return (
          <div className="grid grid-cols-7 gap-1 h-full overflow-y-auto p-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-bold text-slate-400 py-2 uppercase">{day}</div>
              ))}
              {/* Offset for start of month (mock) */}
              <div className="col-span-3"></div>
              {days.map(day => {
                   // Mock finding appointments for this day
                   const dayApts = filteredAppointments.filter(a => parseInt(a.date.split('-')[2]) === day);
                   return (
                       <div key={day} className="min-h-[100px] bg-white border border-slate-100 p-2 rounded-lg hover:border-primary-200 transition-colors cursor-pointer">
                           <span className="text-sm font-bold text-slate-700 block mb-1">{day}</span>
                           <div className="space-y-1">
                               {dayApts.map(apt => (
                                   <div key={apt.id} className={`text-[10px] px-1 py-0.5 rounded truncate ${
                                       apt.type === 'Surgery' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                                   }`}>
                                       {apt.time} - {apt.patientName.split(' ')[0]}
                                   </div>
                               ))}
                           </div>
                       </div>
                   );
              })}
          </div>
      );
  };

  const specialties: Specialty[] = [
      'General Ophthalmology', 'Cornea & External Diseases', 'Cataract', 'Glaucoma', 
      'Medical Retina', 'Ophthalmic Pathology', 'Pediatric Ophthalmology', 'Refractive Surgery'
  ];

  return (
    <div className="p-8 h-full overflow-hidden flex flex-col bg-slate-50/50">
      
      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between mb-6 gap-4 flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Scheduling</h2>
          <p className="text-slate-500">Manage doctor schedules and patient appointments</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white border border-slate-200 rounded-lg p-1 flex">
                <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <List className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => setViewMode('month')}
                    className={`p-2 rounded-md ${viewMode === 'month' ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <Grid className="w-4 h-4" />
                </button>
            </div>

            {/* Specialty Filter */}
            <div className="relative">
                <select 
                    className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl p-2.5 pl-9 outline-none focus:ring-2 focus:ring-primary-500 appearance-none pr-8"
                    value={selectedSpecialty}
                    onChange={(e) => {
                        setSelectedSpecialty(e.target.value as Specialty | 'All');
                        setSelectedDoctor('all'); // Reset doctor when specialty changes
                    }}
                >
                    <option value="All">All Specialties</option>
                    {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            </div>

            <select 
              className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="all">All Doctors</option>
              {filteredDoctors.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>

            <button 
              onClick={() => setShowNewModal(true)}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              <span>Book Appointment</span>
            </button>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Date Navigation */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
           <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"><ChevronLeft className="w-5 h-5 text-slate-500" /></button>
           <h3 className="font-semibold text-slate-700 flex items-center space-x-2">
             <Calendar className="w-4 h-4 text-slate-400" />
             <span>December 2023</span>
           </h3>
           <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"><ChevronRight className="w-5 h-5 text-slate-500" /></button>
        </div>

        {/* Schedule List or Month Grid */}
        <div className="flex-1 overflow-y-auto">
           {viewMode === 'month' ? renderMonthView() : (
               <div className="p-4 space-y-3">
                   {filteredAppointments.length === 0 && (
                        <div className="text-center py-20 text-slate-400">
                            No appointments found for this criteria.
                        </div>
                    )}
                    {filteredAppointments.map(apt => (
                        <div key={apt.id} className="flex items-center p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-shadow group">
                            <div className="w-20 text-center border-r border-slate-100 pr-4">
                            <span className="block font-bold text-slate-800 text-lg">{apt.time}</span>
                            <span className="text-xs text-slate-400 uppercase font-medium">AM</span>
                            </div>
                            <div className="flex-1 pl-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-slate-800">{apt.patientName}</h4>
                                    <div className="flex items-center space-x-4 mt-1">
                                    <span className="text-xs font-medium text-slate-500 flex items-center bg-slate-100 px-2 py-0.5 rounded">
                                        <User className="w-3 h-3 mr-1" /> {apt.doctorName}
                                    </span>
                                    <span className={`text-xs px-2 py-0.5 rounded border ${
                                        apt.type === 'Surgery' ? 'bg-red-50 text-red-600 border-red-100' : 
                                        apt.type === 'New Visit' ? 'bg-green-50 text-green-600 border-green-100' :
                                        'bg-blue-50 text-blue-600 border-blue-100'
                                    }`}>
                                        {apt.type}
                                    </span>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    apt.status === 'Checked-In' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                }`}>
                                    {apt.status}
                                </span>
                            </div>
                            </div>
                        </div>
                    ))}
               </div>
           )}
        </div>
      </div>

      {/* Mock Modal (Visual Only) */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl animate-fadeIn">
              <h3 className="text-xl font-bold text-slate-800 mb-4">New Appointment</h3>
              <div className="space-y-4">
                <div>
                   <label className="block text-sm font-semibold text-slate-600 mb-1">Patient</label>
                   <div className="relative">
                      <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input type="text" placeholder="Search patient..." className="w-full pl-10 p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-semibold text-slate-600 mb-1">Specialty</label>
                   <select className="w-full p-2 border border-slate-200 rounded-lg text-sm mb-2" defaultValue="General Ophthalmology">
                       {specialties.map(s => <option key={s}>{s}</option>)}
                   </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-1">Doctor</label>
                        <select className="w-full p-2 border border-slate-200 rounded-lg text-sm">
                            {doctors.map(d => <option key={d.id}>{d.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-1">Time</label>
                        <input type="time" className="w-full p-2 border border-slate-200 rounded-lg text-sm" />
                    </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                 <button onClick={() => setShowNewModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg font-medium">Cancel</button>
                 <button onClick={() => setShowNewModal(false)} className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">Confirm Booking</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentView;
