
import React, { useState, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import LoginView from './components/LoginView';
import { AppView, Patient, User, UserRole } from './types';
import { api } from './services/apiService';
import { RefreshCw } from 'lucide-react';

// Lazy Load Views for Performance Optimization (Code Splitting)
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const PatientList = React.lazy(() => import('./components/PatientList'));
const ExamView = React.lazy(() => import('./components/ExamView'));
const BillingView = React.lazy(() => import('./components/BillingView'));
const InventoryView = React.lazy(() => import('./components/InventoryView')); 
const ReceptionView = React.lazy(() => import('./components/ReceptionView'));
const AppointmentView = React.lazy(() => import('./components/AppointmentView'));
const QueueView = React.lazy(() => import('./components/QueueView'));
const NurseStationView = React.lazy(() => import('./components/NurseStationView'));
const LabView = React.lazy(() => import('./components/LabView'));
const RadiologyView = React.lazy(() => import('./components/RadiologyView'));
const WardView = React.lazy(() => import('./components/WardView'));
const OTView = React.lazy(() => import('./components/OTView'));
const CSSDView = React.lazy(() => import('./components/CSSDView'));
const FeaturesView = React.lazy(() => import('./components/FeaturesView'));
const DepartmentsView = React.lazy(() => import('./components/DepartmentsView'));
const PurchaseView = React.lazy(() => import('./components/PurchaseView'));
const PharmacyView = React.lazy(() => import('./components/PharmacyView'));
const OpticalView = React.lazy(() => import('./components/OpticalView'));
const StoresView = React.lazy(() => import('./components/StoresView'));
const LinenView = React.lazy(() => import('./components/LinenView'));
const AssetView = React.lazy(() => import('./components/AssetView'));
const AccountingView = React.lazy(() => import('./components/AccountingView'));
const MISView = React.lazy(() => import('./components/MISView'));
const CommunicationView = React.lazy(() => import('./components/CommunicationView'));
const NABHView = React.lazy(() => import('./components/NABHView'));
const TelemedicineView = React.lazy(() => import('./components/TelemedicineView'));
const ARVRTherapyView = React.lazy(() => import('./components/ARVRTherapyView'));
const ResearchView = React.lazy(() => import('./components/ResearchView'));

// Loading Fallback Component
const LoadingView = () => (
    <div className="flex h-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
            <RefreshCw className="w-8 h-8 text-primary-500 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Loading Module...</p>
        </div>
    </div>
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleLogin = async (role: UserRole) => {
    const loggedInUser = await api.auth.login(role);
    setUser(loggedInUser);
    
    // Set default view based on specific role for personalized experience
    switch(role) {
        case 'PHARMACIST': setCurrentView(AppView.PHARMACY); break;
        case 'STORE_MANAGER': setCurrentView(AppView.PURCHASE); break;
        case 'RECEPTIONIST': setCurrentView(AppView.RECEPTION); break;
        case 'NURSE': setCurrentView(AppView.NURSE_STATION); break;
        case 'LAB_TECH': setCurrentView(AppView.LABORATORY); break;
        case 'ACCOUNTANT': setCurrentView(AppView.ACCOUNTING); break;
        case 'OPTOMETRIST': setCurrentView(AppView.QUEUE); break;
        case 'DOCTOR':
        case 'INTERN':
        default: setCurrentView(AppView.DASHBOARD);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView(AppView.DASHBOARD);
    setSelectedPatient(null);
  };

  const handlePatientSelect = (patient: Patient) => {
    const allowedRoles: UserRole[] = ['DOCTOR', 'OPTOMETRIST', 'INTERN'];
    if (user && allowedRoles.includes(user.role)) {
        setSelectedPatient(patient);
        setCurrentView(AppView.EXAM);
    } else {
        alert("Access Denied: Only Clinical Staff can enter the Examination Module.");
    }
  };

  const renderContent = () => {
    if (!user) return null;

    return (
        <Suspense fallback={<LoadingView />}>
            {(() => {
                switch (currentView) {
                    case AppView.DASHBOARD: return <Dashboard />;
                    case AppView.RECEPTION: return <ReceptionView onChangeView={setCurrentView} />;
                    case AppView.APPOINTMENTS: return <AppointmentView />;
                    case AppView.QUEUE: return <QueueView />;
                    case AppView.DEPARTMENTS: return <DepartmentsView />;
                    case AppView.TELEMEDICINE: return <TelemedicineView />;
                    case AppView.PATIENTS: return <PatientList onSelectPatient={handlePatientSelect} userRole={user.role} />;
                    case AppView.EXAM:
                        return selectedPatient 
                            ? <ExamView patient={selectedPatient} currentUser={user} onBack={() => { setSelectedPatient(null); setCurrentView(AppView.PATIENTS); }} />
                            : <PatientList onSelectPatient={handlePatientSelect} userRole={user.role} />;
                    case AppView.NURSE_STATION: return <NurseStationView />;
                    case AppView.LABORATORY: return <LabView />;
                    case AppView.RADIOLOGY: return <RadiologyView />;
                    case AppView.WARD_MANAGEMENT: return <WardView />;
                    case AppView.OT_MANAGEMENT: return <OTView />;
                    case AppView.CSSD: return <CSSDView />;
                    case AppView.EQUIPMENT: return <div className="p-10 text-center text-slate-500">Equipment Module</div>;
                    case AppView.ARVR_THERAPY: return <ARVRTherapyView />;
                    case AppView.RESEARCH: return <ResearchView />;
                    case AppView.BILLING: return <BillingView />;
                    case AppView.PURCHASE: return <PurchaseView />;
                    case AppView.PHARMACY: return <PharmacyView />;
                    case AppView.OPTICALS: return <OpticalView />;
                    case AppView.STORES: return <StoresView />;
                    case AppView.LINEN: return <LinenView />;
                    case AppView.ASSETS: return <AssetView />;
                    case AppView.ACCOUNTING: return <AccountingView />;
                    case AppView.MIS: return <MISView />;
                    case AppView.NABH_QUALITY: return <NABHView />;
                    case AppView.COMMUNICATION: return <CommunicationView />;
                    case AppView.FEATURES: return <FeaturesView />;
                    case AppView.SETTINGS: return <div className="p-10 text-center text-slate-500">Settings</div>;
                    default: return <Dashboard />;
                }
            })()}
        </Suspense>
    );
  };

  if (!user) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900">
      <Sidebar 
        currentView={currentView} 
        onChangeView={(view) => {
          if (view !== AppView.EXAM) setSelectedPatient(null);
          setCurrentView(view);
        }}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1 h-full overflow-hidden relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
