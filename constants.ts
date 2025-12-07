

import { Patient, Doctor, Appointment, QueueItem, Surgery, LabOrder, WardBed, PurchaseOrder, LinenBatch, Asset } from './types';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    age: 45,
    gender: 'Female',
    phone: '(555) 123-4567',
    lastVisit: '2023-10-15',
    condition: 'Glaucoma Suspect',
    avatarUrl: 'https://picsum.photos/100/100?random=1',
    type: 'Regular'
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 62,
    gender: 'Male',
    phone: '(555) 987-6543',
    lastVisit: '2023-11-02',
    condition: 'Diabetic Retinopathy',
    avatarUrl: 'https://picsum.photos/100/100?random=2',
    type: 'Insurance'
  },
  {
    id: '3',
    name: 'Emily Davis',
    age: 28,
    gender: 'Female',
    phone: '(555) 456-7890',
    lastVisit: '2023-11-20',
    condition: 'Myopia',
    avatarUrl: 'https://picsum.photos/100/100?random=3',
    type: 'Corporate'
  },
  {
    id: '4',
    name: 'Robert Wilson',
    age: 71,
    gender: 'Male',
    phone: '(555) 222-3333',
    lastVisit: '2023-10-05',
    condition: 'Cataract (Post-Op)',
    avatarUrl: 'https://picsum.photos/100/100?random=4',
    type: 'Regular'
  },
  {
    id: '5',
    name: 'Linda Martinez',
    age: 55,
    gender: 'Female',
    phone: '(555) 777-8888',
    lastVisit: '2023-11-25',
    condition: 'Dry Eye Syndrome',
    avatarUrl: 'https://picsum.photos/100/100?random=5',
    type: 'Regular'
  }
];

export const MOCK_DOCTORS: Doctor[] = [
    { id: 'd1', name: 'Dr. A. Sharma', specialty: 'Medical Retina', avatar: 'https://i.pravatar.cc/150?u=dr' },
    { id: 'd2', name: 'Dr. P. Jones', specialty: 'Cornea & External Diseases', avatar: 'https://i.pravatar.cc/150?u=dr2' },
    { id: 'd3', name: 'Dr. K. Lee', specialty: 'General Ophthalmology', avatar: 'https://i.pravatar.cc/150?u=dr3' },
    { id: 'd4', name: 'Dr. R. Singh', specialty: 'Cataract', avatar: 'https://i.pravatar.cc/150?u=dr4' },
    { id: 'd5', name: 'Dr. S. Patel', specialty: 'Pediatric Ophthalmology', avatar: 'https://i.pravatar.cc/150?u=dr5' },
    { id: 'd6', name: 'Dr. M. Gupta', specialty: 'Glaucoma', avatar: 'https://i.pravatar.cc/150?u=dr6' },
    { id: 'd7', name: 'Dr. J. Wilson', specialty: 'Refractive Surgery', avatar: 'https://i.pravatar.cc/150?u=dr7' }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
    { id: 'apt1', patientId: '1', patientName: 'Sarah Jenkins', doctorId: 'd1', doctorName: 'Dr. A. Sharma', date: '2023-12-01', time: '09:00', type: 'Follow-up', status: 'Scheduled' },
    { id: 'apt2', patientId: '3', patientName: 'Emily Davis', doctorId: 'd2', doctorName: 'Dr. P. Jones', date: '2023-12-01', time: '09:30', type: 'New Visit', status: 'Checked-In' },
    { id: 'apt3', patientId: '4', patientName: 'Robert Wilson', doctorId: 'd1', doctorName: 'Dr. A. Sharma', date: '2023-12-01', time: '10:00', type: 'Surgery', status: 'Scheduled' },
];

export const MOCK_QUEUE: QueueItem[] = [
    { id: 'q1', tokenNumber: 'A-101', patientName: 'Emily Davis', status: 'Vitals', waitTime: '5m', assignedDoctor: 'Dr. P. Jones' },
    { id: 'q2', tokenNumber: 'B-205', patientName: 'John Smith', status: 'Waiting', waitTime: '15m', assignedDoctor: 'Dr. A. Sharma' },
    { id: 'q3', tokenNumber: 'A-102', patientName: 'Michael Chen', status: 'In Consultation', waitTime: '0m', assignedDoctor: 'Dr. A. Sharma' },
];

export const MOCK_SURGERIES: Surgery[] = [
    { id: 's1', patientName: 'Robert Wilson', procedure: 'Phaco + IOL (OD)', surgeonName: 'Dr. A. Sharma', theater: 'OT-1', date: '2023-12-01', startTime: '10:00 AM', status: 'Surgery' },
    { id: 's2', patientName: 'Mary Lou', procedure: 'Trabeculectomy', surgeonName: 'Dr. K. Lee', theater: 'OT-2', date: '2023-12-01', startTime: '11:30 AM', status: 'Pre-Op' },
];

export const MOCK_LAB_ORDERS: LabOrder[] = [
    { id: 'lo1', patientName: 'Michael Chen', testName: 'HbA1c', date: '2023-12-01', status: 'Completed', result: '6.5%', priority: 'Normal' },
    { id: 'lo2', patientName: 'Sarah Jenkins', testName: 'IOP Profile', date: '2023-12-01', status: 'Processing', priority: 'Urgent' },
];

export const MOCK_BEDS: WardBed[] = [
    { id: 'b1', number: '101', ward: 'General', status: 'Occupied', patientName: 'John Doe', admissionDate: '2023-11-29' },
    { id: 'b2', number: '102', ward: 'General', status: 'Available' },
    { id: 'b3', number: '201', ward: 'Private', status: 'Occupied', patientName: 'Jane Smith', admissionDate: '2023-11-30' },
    { id: 'b4', number: '301', ward: 'ICU', status: 'Maintenance' },
];

export const MOCK_POS: PurchaseOrder[] = [
    { id: 'PO-2023-881', vendor: 'MedEquip Suppliers', date: '2023-11-25', totalAmount: 12500, status: 'Received', itemsCount: 5 },
    { id: 'PO-2023-882', vendor: 'PharmaDistributors Inc', date: '2023-11-28', totalAmount: 4200, status: 'Sent', itemsCount: 20 },
    { id: 'PO-2023-883', vendor: 'Office Needs', date: '2023-12-01', totalAmount: 350, status: 'Draft', itemsCount: 12 },
];

export const MOCK_LINEN: LinenBatch[] = [
    { id: 'L-001', type: 'Sheets', quantity: 50, status: 'In Use' },
    { id: 'L-002', type: 'Gowns', quantity: 30, status: 'Laundry', sentDate: '2023-12-01' },
    { id: 'L-003', type: 'Towels', quantity: 100, status: 'Clean Storage' },
];

export const MOCK_ASSETS: Asset[] = [
    { id: 'A-101', name: 'Dell Server Rack', type: 'IT', location: 'Server Room', purchaseDate: '2022-01-15', value: 5000, condition: 'Good' },
    { id: 'A-102', name: 'Reception Desk', type: 'Furniture', location: 'Lobby', purchaseDate: '2021-06-10', value: 1200, condition: 'Fair' },
    { id: 'A-103', name: 'Ambulance Van', type: 'Vehicle', location: 'Parking', purchaseDate: '2020-03-20', value: 25000, condition: 'Good' },
];