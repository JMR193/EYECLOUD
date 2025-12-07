import React, { useState } from 'react';
import { Eye, Lock, ArrowRight, Activity, Database, ShieldCheck } from 'lucide-react';
import { UserRole } from '../types';

interface LoginViewProps {
  onLogin: (role: UserRole) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('DOCTOR');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call delay handled in parent or service
    setTimeout(() => {
        onLogin(selectedRole);
        setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-600/10 blur-[100px]" />
      </div>

      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10">
        
        {/* Left: Brand Side */}
        <div className="md:w-1/2 bg-slate-50 p-12 flex flex-col justify-between relative">
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-primary-600 p-2.5 rounded-xl shadow-lg shadow-primary-200/50">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-800 tracking-tight">EyeCloud</span>
            </div>
            
            <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Modern Eye Hospital Management System
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Seamlessly integrated Practice Management, EMR, Billing, and Optical Store powered by Cloud & AI.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-12">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <Activity className="w-6 h-6 text-blue-500 mb-2" />
                <p className="font-semibold text-slate-800">OPD & IPD</p>
                <p className="text-xs text-slate-500">Full Workflow</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <Database className="w-6 h-6 text-emerald-500 mb-2" />
                <p className="font-semibold text-slate-800">Secure Cloud</p>
                <p className="text-xs text-slate-500">Encrypted Storage</p>
            </div>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="md:w-1/2 p-12 bg-white flex flex-col justify-center">
          <div className="mb-8 text-center md:text-left">
            <h3 className="text-2xl font-bold text-slate-800">Staff Portal</h3>
            <p className="text-slate-500">Secure access for hospital staff.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Select Division / Role</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                    { id: 'DOCTOR', label: 'Doctor', icon: Activity },
                    { id: 'RECEPTIONIST', label: 'Front Desk', icon: Database },
                    { id: 'PHARMACIST', label: 'Optical/Pharm', icon: ShieldCheck },
                    { id: 'ADMIN', label: 'Admin', icon: Lock }
                ].map((role) => (
                    <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id as UserRole)}
                        className={`p-3 rounded-xl border text-left transition-all flex items-center space-x-2 ${
                            selectedRole === role.id 
                            ? 'border-primary-500 bg-primary-50 text-primary-700 ring-1 ring-primary-500' 
                            : 'border-slate-200 hover:border-slate-300 text-slate-600'
                        }`}
                    >
                        <role.icon className={`w-4 h-4 ${selectedRole === role.id ? 'text-primary-600' : 'text-slate-400'}`} />
                        <span className="text-sm font-medium">{role.label}</span>
                    </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Employee ID</label>
                    <input 
                        type="text" 
                        defaultValue="EMP-2024-882"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Password</label>
                    <input 
                        type="password" 
                        defaultValue="password"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow" 
                    />
                </div>
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-slate-200"
            >
                {isLoading ? (
                    <span>Authenticating...</span>
                ) : (
                    <>
                        <span>Access Dashboard</span>
                        <ArrowRight className="w-5 h-5" />
                    </>
                )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-400">
            EyeCloud Hospital Management System • v3.0
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginView;