
import React, { useState, useMemo, useCallback } from 'react';
import { Search, Filter, MoreHorizontal, Plus, X, Calendar, Activity, ShieldCheck, FileText, Cloud, MessageSquare, Phone, AlertCircle, Eye, ChevronRight, Fingerprint, QrCode, Lock, GraduationCap, Glasses } from 'lucide-react';
import { MOCK_PATIENTS } from '../constants';
import { Patient, UserRole } from '../types';

interface PatientListProps {
  onSelectPatient: (patient: Patient) => void;
  userRole: UserRole;
}

const PatientList: React.FC<PatientListProps> = ({ onSelectPatient, userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<Patient | null>(null);

  // Optimization: Memoize filtered list to avoid recalculation on every render
  const filteredPatients = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return MOCK_PATIENTS.filter(p => 
      p.name.toLowerCase().includes(term) ||
      p.phone.includes(term) ||
      p.id.includes(term)
    );
  }, [searchTerm]);

  const handlePatientClick = useCallback((patient: Patient) => {
    setSelectedProfile(patient);
  }, []);

  const handleSendReminder = useCallback(() => {
      // Simulation of BullMQ/Twilio Trigger
      if (selectedProfile) {
        alert(`WhatsApp Appointment Reminder sent to ${selectedProfile.phone} via Twilio API.`);
      }
  }, [selectedProfile]);

  // Logic for enabling consultation access
  const canAccessExam = ['DOCTOR', 'OPTOMETRIST', 'INTERN'].includes(userRole);
  
  const getButtonLabel = useCallback(() => {
      if (userRole === 'DOCTOR') return 'Start Consultation (EMR)';
      if (userRole === 'OPTOMETRIST') return 'Start Workup (Refraction)';
      if (userRole === 'INTERN') return 'Open Case Study';
      return 'View Details';
  }, [userRole]);

  const getButtonIcon = useCallback(() => {
      if (userRole === 'OPTOMETRIST') return Glasses;
      if (userRole === 'INTERN') return GraduationCap;
      return Eye;
  }, [userRole]);

  const ActionIcon = getButtonIcon();

  return (
    <div className="flex h-full bg-slate-50/50">
      {/* LEFT: Patient List */}
      <div className={`flex-1 flex flex-col h-full overflow-hidden transition-all duration-300 ${selectedProfile ? 'w-1/2 hidden lg:flex border-r border-slate-200' : 'w-full'}`}>
        <div className="p-8 pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Patient Registry</h2>
                    <p className="text-slate-500">Manage patient records & histories</p>
                </div>
                {(userRole === 'RECEPTIONIST' || userRole === 'ADMIN') && (
                    <button className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-primary-200">
                        <Plus className="w-5 h-5" />
                        <span>New Patient</span>
                    </button>
                )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4">
                <div className="p-4 border-b border-slate-100 flex items-center space-x-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Search by name, ID or phone..." 
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-700 placeholder-slate-400 transition-shadow"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="p-2.5 text-slate-500 hover:bg-slate-50 rounded-lg border border-slate-200">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-white z-10 shadow-sm">
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Details</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {filteredPatients.map((patient) => (
                        <tr 
                            key={patient.id} 
                            className={`hover:bg-slate-50 transition-colors cursor-pointer ${selectedProfile?.id === patient.id ? 'bg-primary-50 hover:bg-primary-50 border-l-4 border-l-primary-500' : 'border-l-4 border-l-transparent'}`}
                            onClick={() => handlePatientClick(patient)}
                        >
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                                <img 
                                    src={patient.avatarUrl} 
                                    alt={patient.name} 
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                    loading="lazy"
                                />
                                <div>
                                    <span className="font-semibold text-slate-800 block">{patient.name}</span>
                                    <span className="text-xs text-slate-500 font-mono">#{patient.id.padStart(4, '0')}</span>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                             <div className="text-sm text-slate-600">{patient.age} yrs, {patient.gender}</div>
                             <div className="text-xs text-slate-400">Last: {patient.lastVisit}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-mono text-sm hidden md:table-cell">
                            {patient.phone}
                        </td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                patient.condition.includes('Surgery') ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                            }`}>
                            {patient.condition}
                            </span>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      {/* RIGHT: Detailed Profile Panel */}
      {selectedProfile && (
          <div className="w-full lg:w-[450px] xl:w-[500px] bg-white border-l border-slate-200 h-full overflow-y-auto shadow-2xl z-20 animate-slideInRight flex flex-col">
              
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-start sticky top-0 bg-white/95 backdrop-blur-sm z-10">
                  <div className="flex items-center space-x-4">
                      <img src={selectedProfile.avatarUrl} className="w-16 h-16 rounded-full border-4 border-slate-50 shadow-sm" alt="Profile" />
                      <div>
                          <h2 className="text-xl font-bold text-slate-800">{selectedProfile.name}</h2>
                          <div className="flex items-center space-x-2 text-sm text-slate-500">
                              <span>{selectedProfile.age} {selectedProfile.gender}</span>
                              <span>•</span>
                              <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs">ID: {selectedProfile.id}</span>
                          </div>
                      </div>
                  </div>
                  <button onClick={() => setSelectedProfile(null)} className="text-slate-400 hover:text-slate-600 p-1">
                      <X className="w-6 h-6" />
                  </button>
              </div>

              <div className="flex-1 p-6 space-y-6">
                  
                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                      {canAccessExam ? (
                          <button 
                            onClick={() => onSelectPatient(selectedProfile)}
                            className="col-span-2 bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200 flex items-center justify-center space-x-2"
                          >
                              <ActionIcon className="w-5 h-5" />
                              <span>{getButtonLabel()}</span>
                          </button>
                      ) : (
                          <div className="col-span-2 bg-slate-100 text-slate-400 py-3 rounded-xl font-bold border border-slate-200 flex items-center justify-center space-x-2 cursor-not-allowed">
                               <Lock className="w-4 h-4" />
                               <span>Consultation Locked ({userRole})</span>
                          </div>
                      )}
                      
                      <button 
                        onClick={handleSendReminder}
                        className="bg-emerald-50 text-emerald-700 py-2.5 rounded-lg font-medium hover:bg-emerald-100 transition-colors border border-emerald-100 flex items-center justify-center space-x-2"
                      >
                          <MessageSquare className="w-4 h-4" />
                          <span>WhatsApp</span>
                      </button>
                      <button className="bg-slate-50 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-100 transition-colors border border-slate-200 flex items-center justify-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Call</span>
                      </button>
                  </div>

                  {/* ABDM Integration Card */}
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                      <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xs font-bold text-orange-800 uppercase flex items-center">
                              <ShieldCheck className="w-3 h-3 mr-1.5" /> Ayushman Bharat (ABDM)
                          </h3>
                          {selectedProfile.abhaId ? (
                              <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold">Verified</span>
                          ) : (
                              <span className="bg-orange-200 text-orange-800 text-[10px] px-2 py-0.5 rounded-full font-bold">Unlinked</span>
                          )}
                      </div>
                      
                      {selectedProfile.abhaId ? (
                          <div className="space-y-2">
                              <div className="flex justify-between items-center bg-white p-2 rounded border border-orange-100">
                                  <span className="text-xs text-slate-500">ABHA ID</span>
                                  <span className="font-mono text-sm font-bold text-slate-700">{selectedProfile.abhaId}</span>
                              </div>
                              <div className="flex justify-between items-center bg-white p-2 rounded border border-orange-100">
                                  <span className="text-xs text-slate-500">Address</span>
                                  <span className="font-mono text-xs text-slate-700">{selectedProfile.abhaAddress || 'sara@abdm'}</span>
                              </div>
                              <button className="w-full text-xs text-orange-700 font-semibold hover:underline">Manage Consents & Sharing</button>
                          </div>
                      ) : (
                          <div className="text-center">
                              <p className="text-xs text-orange-700 mb-3">Create or Link ABHA ID for longitudinal health records.</p>
                              <div className="flex space-x-2">
                                  <button className="flex-1 bg-orange-600 text-white text-xs font-bold py-2 rounded hover:bg-orange-700 flex items-center justify-center">
                                      <Fingerprint className="w-3 h-3 mr-1" /> Create via Aadhaar
                                  </button>
                                  <button className="flex-1 bg-white text-orange-700 border border-orange-200 text-xs font-bold py-2 rounded hover:bg-orange-50 flex items-center justify-center">
                                      <QrCode className="w-3 h-3 mr-1" /> Scan QR
                                  </button>
                              </div>
                          </div>
                      )}
                  </div>

                  {/* Vitals / Clinical Snapshot */}
                  <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center">
                          <Activity className="w-3 h-3 mr-1.5" /> Clinical Snapshot
                      </h3>
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 grid grid-cols-2 gap-4">
                          <div>
                              <span className="text-xs text-slate-500 block mb-1">Visual Acuity (OD/OS)</span>
                              <span className="font-mono font-bold text-slate-800">
                                  {selectedProfile.clinicalSnapshot?.visualAcuityOD || '--'} / {selectedProfile.clinicalSnapshot?.visualAcuityOS || '--'}
                              </span>
                          </div>
                          <div>
                              <span className="text-xs text-slate-500 block mb-1">IOP (OD/OS)</span>
                              <span className="font-mono font-bold text-slate-800">
                                  {selectedProfile.clinicalSnapshot?.iopOD || '--'} / {selectedProfile.clinicalSnapshot?.iopOS || '--'}
                              </span>
                          </div>
                          <div className="col-span-2 pt-2 border-t border-slate-200">
                              <span className="text-xs text-slate-500 block mb-1">Current Condition</span>
                              <span className="text-sm font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-lg inline-block">
                                  {selectedProfile.condition}
                              </span>
                          </div>
                      </div>
                  </div>

                  {/* Medical History */}
                  <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1.5" /> Medical History
                      </h3>
                      <div className="space-y-3">
                          <div className="flex items-start">
                              <span className="w-20 text-xs text-slate-500 mt-0.5">Systemic:</span>
                              <div className="flex-1 flex flex-wrap gap-1">
                                  {selectedProfile.history?.systemic.length ? selectedProfile.history.systemic.map(h => (
                                      <span key={h} className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded border border-red-100">{h}</span>
                                  )) : <span className="text-xs text-slate-400">None</span>}
                              </div>
                          </div>
                          <div className="flex items-start">
                              <span className="w-20 text-xs text-slate-500 mt-0.5">Ocular:</span>
                              <div className="flex-1 flex flex-wrap gap-1">
                                  {selectedProfile.history?.ocular.length ? selectedProfile.history.ocular.map(h => (
                                      <span key={h} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{h}</span>
                                  )) : <span className="text-xs text-slate-400">None</span>}
                              </div>
                          </div>
                          <div className="flex items-start">
                              <span className="w-20 text-xs text-slate-500 mt-0.5">Meds:</span>
                              <div className="text-xs text-slate-700">
                                  {selectedProfile.history?.medications.join(', ') || 'None'}
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Insurance Info */}
                  <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center">
                          <ShieldCheck className="w-3 h-3 mr-1.5" /> Insurance Details
                      </h3>
                      {selectedProfile.insurance ? (
                          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 text-white shadow-md relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-4 opacity-10"><ShieldCheck className="w-20 h-20" /></div>
                              <div className="relative z-10">
                                  <div className="flex justify-between items-start mb-4">
                                      <div>
                                          <p className="text-xs text-slate-400 uppercase">Provider</p>
                                          <p className="font-bold text-lg">{selectedProfile.insurance.provider}</p>
                                      </div>
                                      <div className="text-right">
                                          <p className="text-xs text-slate-400 uppercase">Type</p>
                                          <p className="font-medium text-sm text-emerald-400">{selectedProfile.insurance.coverageType}</p>
                                      </div>
                                  </div>
                                  <div>
                                      <p className="text-xs text-slate-400 uppercase">Policy Number</p>
                                      <p className="font-mono text-sm tracking-wider">{selectedProfile.insurance.policyNumber}</p>
                                  </div>
                                  <div className="mt-3 pt-3 border-t border-slate-700 flex justify-between items-center text-xs">
                                      <span className="text-slate-400">Valid until</span>
                                      <span>{selectedProfile.insurance.validity}</span>
                                  </div>
                              </div>
                          </div>
                      ) : (
                          <div className="p-4 border border-dashed border-slate-300 rounded-xl text-center text-slate-400 text-sm">
                              No insurance linked.
                          </div>
                      )}
                  </div>

                  {/* Cloud Docs */}
                  <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center">
                          <Cloud className="w-3 h-3 mr-1.5" /> Cloud Documents (S3)
                      </h3>
                      <div className="space-y-2">
                          {selectedProfile.documents && selectedProfile.documents.length > 0 ? selectedProfile.documents.map(doc => (
                              <div key={doc.id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-primary-300 transition-colors group cursor-pointer">
                                  <div className="flex items-center space-x-3">
                                      <div className="bg-slate-100 p-2 rounded">
                                          <FileText className="w-4 h-4 text-slate-600" />
                                      </div>
                                      <div>
                                          <p className="text-sm font-medium text-slate-800 group-hover:text-primary-600">{doc.name}</p>
                                          <p className="text-xs text-slate-400">{doc.date} • {doc.type}</p>
                                      </div>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary-500" />
                              </div>
                          )) : (
                              <div className="text-xs text-slate-400 italic">No documents uploaded to cloud.</div>
                          )}
                      </div>
                  </div>

              </div>
              
              <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-400">
                  <div className="flex items-center justify-center space-x-2 mb-1">
                       <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                       <span>Socket.io Live Connection</span>
                  </div>
                  Last synced with Cloud DB: Just now
              </div>
          </div>
      )}
    </div>
  );
};

export default PatientList;
