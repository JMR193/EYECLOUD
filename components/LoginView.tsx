

import React, { useState } from 'react';
import { Eye, Lock, ArrowRight, Activity, Database, ShieldCheck, Fingerprint, ScanEye, KeyRound, Stethoscope, TestTube, ShoppingCart, UserCog, Calculator, ClipboardList, Pill, Glasses, GraduationCap } from 'lucide-react';
import { UserRole } from '../types';

interface LoginViewProps {
  onLogin: (role: UserRole) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('DOCTOR');
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<'password' | 'biometric'>('password');

  const departments = [
    { 
        category: "Clinical",
        roles: [
            { id: 'DOCTOR', label: 'Doctor', icon: Activity, desc: 'EMR, Surgery, Diagnostics' },
            { id: 'OPTOMETRIST', label: 'Optometrist', icon: Glasses, desc: 'Refraction, Vision Test' },
            { id: 'NURSE', label: 'Nursing', icon: Stethoscope, desc: 'Vitals, Ward, Care' },
            { id: 'LAB_TECH', label: 'Laboratory', icon: TestTube, desc: 'Pathology, Reports' },
            { id: 'INTERN', label: 'Intern / Student', icon: GraduationCap, desc: 'Training, Observations' }
        ]
    },
    { 
        category: "Administration",
        roles: [
            { id: 'ADMIN', label: 'Administrator', icon: ShieldCheck, desc: 'Full System Access' },
            { id: 'ACCOUNTANT', label: 'Accounts', icon: Calculator, desc: 'Billing, Ledgers' },
            { id: 'STORE_MANAGER', label: 'Store Mgr', icon: ShoppingCart, desc: 'Inventory, Purchase' }
        ]
    },
    { 
        category: "Services",
        roles: [
            { id: 'RECEPTIONIST', label: 'Front Desk', icon: ClipboardList, desc: 'Registration, Appts' },
            { id: 'PHARMACIST', label: 'Pharmacy', icon: Pill, desc: 'Dispensing, Stock' }
        ]
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call delay handled in parent or service
    setTimeout(() => {
        onLogin(selectedRole);
        setIsLoading(false);
    }, 1500); // Increased delay to simulate secure handshake
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-600/10 blur-[100px]" />
      </div>

      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 min-h-[600px]">
        
        {/* Left: Brand Side */}
        <div className="md:w-5/12 bg-slate-50 p-10 flex flex-col justify-between relative border-r border-slate-100">
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-primary-600 p-2.5 rounded-xl shadow-lg shadow-primary-200/50">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-800 tracking-tight">EyeCloud</span>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
              Hospital Login Portal
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm">
              Secure Unified Login for EyeCloud EMR & PMS. 
              Please select your department and role to access your specific workspace.
            </p>
          </div>

          <div className="space-y-3 mt-8">
             <div className="flex items-center space-x-3 text-slate-500 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                 <ShieldCheck className="w-5 h-5 text-emerald-500" />
                 <div>
                    <span className="text-xs font-bold block text-slate-700">Zero-Knowledge Proof</span>
                    <span className="text-[10px]">Identity verification without exposing credentials</span>
                 </div>
             </div>
             <div className="flex items-center space-x-3 text-slate-500 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                 <KeyRound className="w-5 h-5 text-blue-500" />
                 <div>
                    <span className="text-xs font-bold block text-slate-700">Role-Based Access Control</span>
                    <span className="text-[10px]">Department-specific module isolation</span>
                 </div>
             </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-200">
             <p className="text-[10px] text-slate-400">
                System Status: <span className="text-emerald-500 font-bold">Online</span> • v4.2.0-stable
             </p>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="md:w-7/12 p-8 lg:p-10 bg-white flex flex-col justify-center h-full overflow-y-auto">
          
          <form onSubmit={handleLogin} className="space-y-6">
            
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Select Department & Role</h3>
              <div className="space-y-4">
                  {departments.map((dept, idx) => (
                      <div key={idx}>
                          <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">{dept.category}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {dept.roles.map((role) => (
                                <button
                                    key={role.id}
                                    type="button"
                                    onClick={() => setSelectedRole(role.id as UserRole)}
                                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                                        selectedRole === role.id 
                                        ? 'border-primary-500 bg-primary-50 text-primary-700 ring-1 ring-primary-500 shadow-sm' 
                                        : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <role.icon className={`w-5 h-5 ${selectedRole === role.id ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                                        {selectedRole === role.id && <div className="w-2 h-2 rounded-full bg-primary-500" />}
                                    </div>
                                    <span className="text-sm font-bold block">{role.label}</span>
                                    <span className="text-[10px] opacity-70 truncate block">{role.desc}</span>
                                </button>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
            </div>

            {/* Auth Method Toggles */}
            <div className="flex bg-slate-100 p-1 rounded-lg mt-6">
                <button 
                    type="button"
                    onClick={() => setAuthMethod('password')}
                    className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${authMethod === 'password' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
                >
                    Password
                </button>
                <button 
                    type="button"
                    onClick={() => setAuthMethod('biometric')}
                    className={`flex-1 py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center space-x-1 ${authMethod === 'biometric' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
                >
                    <Fingerprint className="w-3 h-3" />
                    <span>FIDO2 / Biometric</span>
                </button>
            </div>

            {authMethod === 'password' ? (
                <div className="space-y-4 animate-fadeIn">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Employee ID</label>
                        <input 
                            type="text" 
                            value={`EMP-${selectedRole}-882`}
                            readOnly
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow text-sm font-mono text-slate-600" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Password</label>
                        <input 
                            type="password" 
                            defaultValue="password"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow text-sm" 
                        />
                    </div>
                </div>
            ) : (
                <div className="py-4 text-center space-y-3 animate-fadeIn border border-slate-100 rounded-xl bg-slate-50">
                     <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm">
                         <ScanEye className="w-8 h-8 text-primary-500 animate-pulse" />
                     </div>
                     <div>
                        <p className="text-sm text-slate-800 font-bold">Waiting for Biometric...</p>
                        <p className="text-xs text-slate-500">Scan Fingerprint or use FaceID</p>
                     </div>
                </div>
            )}

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold text-md hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-slate-200"
            >
                {isLoading ? (
                    <div className="flex items-center space-x-2">
                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                         <span>Authenticating...</span>
                    </div>
                ) : (
                    <>
                        <span>Login as {selectedRole.charAt(0) + selectedRole.slice(1).toLowerCase().replace('_', ' ')}</span>
                        <ArrowRight className="w-5 h-5" />
                    </>
                )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default LoginView;