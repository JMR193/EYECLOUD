

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  lastVisit: string;
  condition: string;
  avatarUrl: string;
  ehrId?: string; // External EHR ID
  insuranceProvider?: string;
  type?: 'Regular' | 'Corporate' | 'Insurance';
}

export type Specialty = 
  | 'General Ophthalmology'
  | 'Cornea & External Diseases'
  | 'Cataract'
  | 'Glaucoma'
  | 'Medical Retina'
  | 'Ophthalmic Pathology'
  | 'Pediatric Ophthalmology'
  | 'Refractive Surgery';

export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty | string;
  avatar: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'New Visit' | 'Follow-up' | 'Surgery' | 'Web Booking';
  status: 'Scheduled' | 'Checked-In' | 'Completed' | 'Cancelled';
}

export interface QueueItem {
  id: string;
  patientName: string;
  tokenNumber: string;
  status: 'Waiting' | 'Vitals' | 'In Consultation' | 'Billing' | 'Pharmacy';
  waitTime: string;
  assignedDoctor: string;
}

export interface EyeExam {
  id: string;
  patientId: string;
  date: string;
  visualAcuity: {
    od: string; // Right Eye
    os: string; // Left Eye
  };
  iop: {
    od: string;
    os: string;
  };
  notes: string;
  diagnosis: string;
  plan: string;
}

export type BillingCategory = 'OPD' | 'IPD' | 'Casualty' | 'Corporate' | 'Insurance' | 'Optical';

export interface Invoice {
  id: string;
  patientName: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  category: BillingCategory;
  items: string[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Frames' | 'Lenses' | 'Drops' | 'Consumables' | 'General' | 'Surgical';
  stock: number;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  location?: 'Pharmacy' | 'Optical Store' | 'General Store';
}

export interface ScanImage {
  id: string;
  type: 'OCT' | 'Fundus' | 'Topography';
  url: string;
  date: string;
  aiAnalysis?: string;
}

// --- New Clinical Module Types ---

export interface Surgery {
    id: string;
    patientName: string;
    procedure: string; // e.g., Phacoemulsification
    surgeonName: string;
    theater: 'OT-1' | 'OT-2' | 'OT-3';
    date: string;
    status: 'Pre-Op' | 'Anesthesia' | 'Surgery' | 'Recovery' | 'Completed';
    startTime: string;
}

export interface LabOrder {
    id: string;
    patientName: string;
    testName: string; // e.g., CBC, Blood Sugar, Culture
    date: string;
    status: 'Ordered' | 'Sample Collected' | 'Processing' | 'Completed';
    result?: string;
    priority: 'Normal' | 'Urgent';
}

export interface WardBed {
    id: string;
    number: string;
    ward: 'General' | 'Private' | 'ICU';
    status: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';
    patientName?: string;
    admissionDate?: string;
}

export interface CSSDItem {
    id: string;
    name: string;
    batchNo: string;
    sterilizationDate: string;
    expiryDate: string;
    status: 'Washing' | 'Autoclaving' | 'Sterile' | 'Expired';
}

export interface Equipment {
    id: string;
    name: string; // e.g., Zeiss OCT, Humphreys Field Analyzer
    location: string;
    status: 'Online' | 'Offline' | 'Maintenance';
    integrationType: 'DICOM' | 'HL7' | 'Serial';
}

// --- Non-Clinical Module Types ---

export interface PurchaseOrder {
  id: string;
  vendor: string;
  date: string;
  totalAmount: number;
  status: 'Draft' | 'Sent' | 'Received' | 'Paid';
  itemsCount: number;
}

export interface Asset {
  id: string;
  name: string;
  type: 'IT' | 'Furniture' | 'Vehicle';
  location: string;
  purchaseDate: string;
  value: number;
  condition: 'Good' | 'Fair' | 'Poor';
}

export interface LinenBatch {
  id: string;
  type: 'Sheets' | 'Gowns' | 'Towels';
  quantity: number;
  status: 'In Use' | 'Laundry' | 'Clean Storage';
  sentDate?: string;
}

export interface ReportItem {
  id: string;
  title: string;
  category: 'Financial' | 'Operational' | 'Clinical';
  generatedDate: string;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  
  // Practice Management
  RECEPTION = 'RECEPTION', 
  APPOINTMENTS = 'APPOINTMENTS', 
  QUEUE = 'QUEUE',
  DEPARTMENTS = 'DEPARTMENTS', 
  
  // Clinical Core
  PATIENTS = 'PATIENTS',
  EXAM = 'EXAM',
  
  // Clinical Departments
  NURSE_STATION = 'NURSE_STATION',
  LABORATORY = 'LABORATORY',
  RADIOLOGY = 'RADIOLOGY',
  OT_MANAGEMENT = 'OT_MANAGEMENT',
  WARD_MANAGEMENT = 'WARD_MANAGEMENT',
  CSSD = 'CSSD',
  EQUIPMENT = 'EQUIPMENT',

  // Operations
  BILLING = 'BILLING',
  
  // Non-Clinical / Admin
  PURCHASE = 'PURCHASE',
  STORES = 'STORES',
  PHARMACY = 'PHARMACY',
  OPTICALS = 'OPTICALS',
  LINEN = 'LINEN',
  ASSETS = 'ASSETS',
  ACCOUNTING = 'ACCOUNTING',
  MIS = 'MIS',
  COMMUNICATION = 'COMMUNICATION',
  
  // Support
  FEATURES = 'FEATURES',
  SETTINGS = 'SETTINGS'
}

export type UserRole = 'DOCTOR' | 'RECEPTIONIST' | 'PHARMACIST' | 'ADMIN' | 'NURSE' | 'LAB_TECH' | 'STORE_MANAGER' | 'ACCOUNTANT';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export interface AIResponse {
  text: string;
  loading: boolean;
  error: string | null;
}