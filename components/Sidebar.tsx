
import React, { useEffect, useState, useMemo } from 'react';
import { LayoutDashboard, Users, Eye, Settings, Cloud, CreditCard, Package, Wifi, WifiOff, LogOut, Calendar, ClipboardList, Timer, Stethoscope, TestTube, BedDouble, Scissors, Recycle, HardDrive, Monitor, HelpCircle, ShoppingCart, Archive, Pill, Glasses, Shirt, Briefcase, BarChart3, Mail, Activity, Building2, Smartphone, Video, Shield, Award, Headset, BookOpen } from 'lucide-react';
import { AppView, User } from '../types';
import { api } from '../services/apiService';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  user: User;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, user, onLogout }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate initial connection check to the NestJS backend
    api.system.checkConnection().then(() => setIsConnected(true));
  }, []);

  const allMenuItems = useMemo(() => [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard, roles: ['DOCTOR', 'RECEPTIONIST', 'ADMIN', 'NURSE', 'STORE_MANAGER', 'ACCOUNTANT', 'OPTOMETRIST', 'INTERN'] },
    
    // Practice Management Section
    { id: AppView.RECEPTION, label: 'Front Desk', icon: ClipboardList, roles: ['RECEPTIONIST', 'ADMIN'] },
    { id: AppView.APPOINTMENTS, label: 'Schedule', icon: Calendar, roles: ['RECEPTIONIST', 'DOCTOR', 'ADMIN', 'OPTOMETRIST'] },
    { id: AppView.QUEUE, label: 'Queue Flow', icon: Timer, roles: ['RECEPTIONIST', 'DOCTOR', 'ADMIN', 'NURSE', 'OPTOMETRIST', 'INTERN'] },
    { id: AppView.DEPARTMENTS, label: 'Departments', icon: Building2, roles: ['ADMIN', 'RECEPTIONIST', 'DOCTOR', 'INTERN'] },
    { id: AppView.TELEMEDICINE, label: 'TeleMedicine', icon: Video, roles: ['DOCTOR', 'RECEPTIONIST', 'ADMIN'] },
    
    // Clinical Core
    { id: AppView.PATIENTS, label: 'Patients', icon: Users, roles: ['DOCTOR', 'RECEPTIONIST', 'ADMIN', 'NURSE', 'OPTOMETRIST', 'INTERN'] },
    { id: AppView.EXAM, label: 'EMR / Exam', icon: Eye, roles: ['DOCTOR', 'OPTOMETRIST', 'INTERN'] },

    // Advanced Technology
    { id: AppView.ARVR_THERAPY, label: 'Vision Rehab (VR)', icon: Headset, roles: ['DOCTOR', 'ADMIN', 'NURSE', 'OPTOMETRIST'] },
    { id: AppView.RESEARCH, label: 'Research & AI', icon: BookOpen, roles: ['DOCTOR', 'ADMIN', 'INTERN'] },

    // Clinical Departments
    { id: AppView.NURSE_STATION, label: 'Nurse Station', icon: Stethoscope, roles: ['NURSE', 'DOCTOR', 'ADMIN', 'INTERN'] },
    { id: AppView.LABORATORY, label: 'Laboratory', icon: TestTube, roles: ['LAB_TECH', 'DOCTOR', 'ADMIN'] },
    { id: AppView.RADIOLOGY, label: 'Radiology / PACS', icon: HardDrive, roles: ['DOCTOR', 'ADMIN', 'LAB_TECH', 'OPTOMETRIST'] },
    
    // Inpatient & Surgery
    { id: AppView.OT_MANAGEMENT, label: 'OT & Surgery', icon: Scissors, roles: ['DOCTOR', 'NURSE', 'ADMIN', 'INTERN'] },
    { id: AppView.WARD_MANAGEMENT, label: 'Inpatient (IPD)', icon: BedDouble, roles: ['NURSE', 'DOCTOR', 'ADMIN'] },
    { id: AppView.CSSD, label: 'CSSD', icon: Recycle, roles: ['NURSE', 'ADMIN'] },
    { id: AppView.EQUIPMENT, label: 'Equipment', icon: Monitor, roles: ['ADMIN', 'DOCTOR', 'OPTOMETRIST'] },
    
    // Non-Clinical / Admin Modules
    { id: AppView.PHARMACY, label: 'Pharmacy', icon: Pill, roles: ['PHARMACIST', 'ADMIN', 'DOCTOR'] },
    { id: AppView.OPTICALS, label: 'Optical Store', icon: Glasses, roles: ['PHARMACIST', 'ADMIN', 'STORE_MANAGER', 'OPTOMETRIST'] },
    { id: AppView.PURCHASE, label: 'Purchase', icon: ShoppingCart, roles: ['ADMIN', 'STORE_MANAGER', 'ACCOUNTANT'] },
    { id: AppView.STORES, label: 'General Stores', icon: Archive, roles: ['ADMIN', 'STORE_MANAGER'] },
    { id: AppView.LINEN, label: 'Linen & Laundry', icon: Shirt, roles: ['ADMIN', 'NURSE'] },
    { id: AppView.ASSETS, label: 'Asset Mgmt', icon: Briefcase, roles: ['ADMIN', 'ACCOUNTANT'] },
    
    // Finance & Operations
    { id: AppView.BILLING, label: 'Billing & Claims', icon: CreditCard, roles: ['RECEPTIONIST', 'ADMIN', 'ACCOUNTANT'] },
    { id: AppView.ACCOUNTING, label: 'Accounting', icon: BarChart3, roles: ['ADMIN', 'ACCOUNTANT'] },
    { id: AppView.MIS, label: 'MIS Reports', icon: Activity, roles: ['ADMIN', 'DOCTOR', 'ACCOUNTANT'] },
    { id: AppView.NABH_QUALITY, label: 'NABH Quality', icon: Award, roles: ['ADMIN', 'DOCTOR'] },
    { id: AppView.COMMUNICATION, label: 'Email & SMS', icon: Mail, roles: ['ADMIN', 'RECEPTIONIST'] },

    { id: AppView.FEATURES, label: 'Use Cases & Features', icon: HelpCircle, roles: ['DOCTOR', 'ADMIN', 'OPTOMETRIST', 'INTERN'] },
    { id: AppView.SETTINGS, label: 'Settings', icon: Settings, roles: ['ADMIN', 'DOCTOR'] },
  ], []);

  // Optimization: Memoize filtered menu items to avoid recalculation on every render
  const menuItems = useMemo(() => {
    return allMenuItems.filter(item => item.roles.includes(user.role));
  }, [allMenuItems, user.role]);

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-sm z-10">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-100">
        <div className="bg-primary-600 p-2 rounded-lg shadow-lg shadow-primary-200/50">
          <Eye className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">EyeCloud</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">PMS & EMR</p>
        </div>
      </div>

      <div className="px-6 py-3 bg-slate-50/50 border-b border-slate-100">
        <div className="flex items-center space-x-2">
            {isConnected ? <Wifi className="w-3 h-3 text-emerald-500" /> : <WifiOff className="w-3 h-3 text-red-500" />}
            <span className="text-xs font-medium text-slate-500">
                {isConnected ? 'Server Connected' : 'Offline'}
            </span>
        </div>
        <div className="flex items-center space-x-1 mt-1">
             <Shield className="w-3 h-3 text-primary-500" />
             <span className="text-[10px] text-primary-600 font-bold">Quantum-Safe (Kyber)</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-200'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Mobile App Promo */}
      <div className="px-4 py-2">
         <div className="bg-slate-900 rounded-xl p-4 flex items-center space-x-3 shadow-lg cursor-pointer hover:bg-slate-800 transition-colors">
            <Smartphone className="w-8 h-8 text-white" />
            <div>
               <p className="text-xs text-slate-400">Download</p>
               <p className="text-sm font-bold text-white">EyeCloud App</p>
            </div>
         </div>
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-center space-x-3 mb-3">
            <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-10 h-10 rounded-full bg-primary-100 object-cover border-2 border-white shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 truncate">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 text-xs font-medium text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Optimization: Prevent unnecessary re-renders of the Sidebar 
export default React.memo(Sidebar);
