

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList';
import ExamView from './components/ExamView';
import BillingView from './components/BillingView';
import InventoryView from './components/InventoryView'; // Keeping for backward compatibility or can remove if fully replaced
import LoginView from './components/LoginView';
import ReceptionView from './components/ReceptionView';
import AppointmentView from './components/AppointmentView';
import QueueView from './components/QueueView';
import NurseStationView from './components/NurseStationView';
import LabView from './components/LabView';
import RadiologyView from './components/RadiologyView';
import WardView from './components/WardView';
import OTView from './components/OTView';
import CSSDView from './components/CSSDView';
import FeaturesView from './components/FeaturesView';
import DepartmentsView from './components/DepartmentsView';
import PurchaseView from './components/PurchaseView';
import PharmacyView from './components/PharmacyView';
import OpticalView from './components/OpticalView';
import StoresView from './components/StoresView';
import LinenView from './components/LinenView';
import AssetView from './components/AssetView';
import AccountingView from './components/AccountingView';
import MISView from './components/MISView';
import CommunicationView from './components/CommunicationView';
import { AppView, Patient, User, UserRole } from './types';
import { api } from './services/apiService';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleLogin = async (role: UserRole) => {
    const loggedInUser = await api.auth.login(role);
    setUser(loggedInUser);
    
    // Set default view based on role
    if (role === 'PHARMACIST') setCurrentView(AppView.PHARMACY);
    else if (role === 'STORE_MANAGER') setCurrentView(AppView.PURCHASE);
    else if (role === 'RECEPTIONIST') setCurrentView(AppView.RECEPTION);
    else if (role === 'NURSE') setCurrentView(AppView.NURSE_STATION);
    else if (role === 'LAB_TECH') setCurrentView(AppView.LABORATORY);
    else if (role === 'ACCOUNTANT') setCurrentView(AppView.ACCOUNTING);
    else setCurrentView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(AppView.DASHBOARD);
    setSelectedPatient(null);
  };

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentView(AppView.EXAM);
  };

  // Content Rendering Logic based on View and Role Access
  const renderContent = () => {
    if (!user) return null;

    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.RECEPTION:
        return <ReceptionView onChangeView={setCurrentView} />;
      case AppView.APPOINTMENTS:
        return <AppointmentView />;
      case AppView.QUEUE:
        return <QueueView />;
      case AppView.DEPARTMENTS:
        return <DepartmentsView />;
      case AppView.PATIENTS:
        return <PatientList onSelectPatient={handlePatientSelect} />;
      case AppView.EXAM:
        if (selectedPatient) {
          return (
            <ExamView 
              patient={selectedPatient} 
              onBack={() => {
                setSelectedPatient(null);
                setCurrentView(AppView.PATIENTS);
              }} 
            />
          );
        }
        return <PatientList onSelectPatient={handlePatientSelect} />; // Fallback
      
      // Clinical Modules
      case AppView.NURSE_STATION:
        return <NurseStationView />;
      case AppView.LABORATORY:
        return <LabView />;
      case AppView.RADIOLOGY:
        return <RadiologyView />;
      case AppView.WARD_MANAGEMENT:
        return <WardView />;
      case AppView.OT_MANAGEMENT:
        return <OTView />;
      case AppView.CSSD:
        return <CSSDView />;
      
      case AppView.EQUIPMENT:
          return (
            <div className="flex items-center justify-center h-full text-slate-400 bg-slate-50">
                <div className="text-center">
                    <p className="text-xl font-medium text-slate-600">Biomedical Equipment</p>
                    <p className="text-sm mt-2">Manage connected devices, maintenance schedules, and integration logs.</p>
                </div>
            </div>
          );

      // Operations & Non-Clinical
      case AppView.BILLING:
        return <BillingView />;
      
      case AppView.PURCHASE:
        return <PurchaseView />;
      case AppView.PHARMACY:
        return <PharmacyView />;
      case AppView.OPTICALS:
        return <OpticalView />;
      case AppView.STORES:
        return <StoresView />;
      case AppView.LINEN:
        return <LinenView />;
      case AppView.ASSETS:
        return <AssetView />;
      case AppView.ACCOUNTING:
        return <AccountingView />;
      case AppView.MIS:
        return <MISView />;
      case AppView.COMMUNICATION:
        return <CommunicationView />;
        
      case AppView.FEATURES:
        return <FeaturesView />;
      case AppView.SETTINGS:
        return (
            <div className="flex items-center justify-center h-full text-slate-400">
                <div className="text-center">
                    <p className="text-xl font-medium">Settings</p>
                    <p className="text-sm mt-2">Server Configuration & PMS Parameters.</p>
                </div>
            </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (!user) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentView={currentView} 
        onChangeView={(view) => {
          // If navigating away from exam, clear selection
          if (view !== AppView.EXAM) setSelectedPatient(null);
          setCurrentView(view);
        }}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-hidden relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
