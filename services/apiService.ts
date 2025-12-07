

// This service simulates the connection to your NestJS eyecloud-backend
// In a real scenario, this would use fetch/axios to hit your API endpoints

import { Patient, Invoice, InventoryItem, User, UserRole, Appointment, QueueItem, Doctor, Surgery, LabOrder, WardBed, CSSDItem, PurchaseOrder, LinenBatch, Asset, ReportItem } from '../types';
import { MOCK_PATIENTS, MOCK_APPOINTMENTS, MOCK_QUEUE, MOCK_DOCTORS, MOCK_SURGERIES, MOCK_LAB_ORDERS, MOCK_BEDS, MOCK_POS, MOCK_LINEN, MOCK_ASSETS } from '../constants';

const DELAY = 600; // Simulate server latency

export const api = {
  auth: {
    login: async (role: UserRole): Promise<User> => {
      // Simulates /auth/login with specific division credentials
      await new Promise(resolve => setTimeout(resolve, DELAY));
      
      const mockUsers: Record<UserRole, User> = {
        'DOCTOR': { id: 'u1', name: 'Dr. A. Sharma', role: 'DOCTOR', avatar: 'https://i.pravatar.cc/150?u=dr' },
        'RECEPTIONIST': { id: 'u2', name: 'Karen Frontdesk', role: 'RECEPTIONIST', avatar: 'https://i.pravatar.cc/150?u=rec' },
        'PHARMACIST': { id: 'u3', name: 'Steve Meds', role: 'PHARMACIST', avatar: 'https://i.pravatar.cc/150?u=ph' },
        'ADMIN': { id: 'u4', name: 'Sys Admin', role: 'ADMIN', avatar: 'https://i.pravatar.cc/150?u=ad' },
        'NURSE': { id: 'u5', name: 'Nancy Nurse', role: 'NURSE', avatar: 'https://i.pravatar.cc/150?u=nurse' },
        'LAB_TECH': { id: 'u6', name: 'Tom Tech', role: 'LAB_TECH', avatar: 'https://i.pravatar.cc/150?u=tech' },
        'STORE_MANAGER': { id: 'u7', name: 'Gary Stores', role: 'STORE_MANAGER', avatar: 'https://i.pravatar.cc/150?u=store' },
        'ACCOUNTANT': { id: 'u8', name: 'Alice Accounts', role: 'ACCOUNTANT', avatar: 'https://i.pravatar.cc/150?u=acc' },
      };

      return mockUsers[role];
    }
  },
  
  patients: {
    getAll: async (): Promise<Patient[]> => {
      // Simulates GET /patients
      await new Promise(resolve => setTimeout(resolve, DELAY));
      return MOCK_PATIENTS;
    },
    syncToEHR: async (patientId: string, data: any) => {
      // Simulates POST /emr/integrate/fhir
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true, ehrReference: `FHIR-${Math.floor(Math.random() * 10000)}` };
    }
  },

  appointments: {
    getAll: async (): Promise<Appointment[]> => {
       await new Promise(resolve => setTimeout(resolve, DELAY));
       return MOCK_APPOINTMENTS;
    },
    create: async (apt: Partial<Appointment>): Promise<boolean> => {
        await new Promise(resolve => setTimeout(resolve, DELAY));
        return true;
    },
    getDoctors: async (): Promise<Doctor[]> => {
        return MOCK_DOCTORS;
    }
  },

  queue: {
      getStatus: async (): Promise<QueueItem[]> => {
          await new Promise(resolve => setTimeout(resolve, DELAY));
          return MOCK_QUEUE;
      }
  },

  billing: {
    getInvoices: async (): Promise<Invoice[]> => {
      // Simulates GET /billing
      await new Promise(resolve => setTimeout(resolve, DELAY));
      return [
        { id: 'INV-001', patientName: 'Sarah Jenkins', date: '2023-11-28', amount: 150.00, status: 'Paid', category: 'OPD', items: ['Consultation', 'OCT Scan'] },
        { id: 'INV-002', patientName: 'Michael Chen', date: '2023-11-28', amount: 4500.00, status: 'Pending', category: 'IPD', items: ['Cataract Surgery Advance', 'Room Rent'] },
        { id: 'INV-003', patientName: 'Emily Davis', date: '2023-11-27', amount: 85.00, status: 'Paid', category: 'Corporate', items: ['Refraction', 'Eye Drops'] },
        { id: 'INV-004', patientName: 'John Doe', date: '2023-11-29', amount: 50.00, status: 'Pending', category: 'Casualty', items: ['Emergency Irrigation'] },
      ];
    },
    sendDigitalInvoice: async (invoiceId: string) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
    }
  },

  inventory: {
    getStock: async (type?: 'Pharmacy' | 'Optical' | 'General'): Promise<InventoryItem[]> => {
      // Simulates GET /inventory?type=...
      await new Promise(resolve => setTimeout(resolve, DELAY));
      const allItems: InventoryItem[] = [
        { id: 'ITM-001', name: 'Ray-Ban Aviator', category: 'Frames', stock: 12, price: 120, status: 'In Stock', location: 'Optical Store' },
        { id: 'ITM-002', name: 'Latanoprost 0.005%', category: 'Drops', stock: 4, price: 15, status: 'Low Stock', location: 'Pharmacy' },
        { id: 'ITM-003', name: 'IOL Monofocal', category: 'Consumables', stock: 0, price: 200, status: 'Out of Stock', location: 'Pharmacy' },
        { id: 'ITM-004', name: 'Artificial Tears', category: 'Drops', stock: 45, price: 10, status: 'In Stock', location: 'Pharmacy' },
        { id: 'ITM-005', name: 'A4 Paper Ream', category: 'General', stock: 20, price: 5, status: 'In Stock', location: 'General Store' },
        { id: 'ITM-006', name: 'Floor Cleaner', category: 'General', stock: 5, price: 8, status: 'Low Stock', location: 'General Store' },
        { id: 'ITM-007', name: 'Lens Cleaning Cloth', category: 'Consumables', stock: 100, price: 1, status: 'In Stock', location: 'Optical Store' },
      ];
      
      if (!type) return allItems;

      if (type === 'Pharmacy') return allItems.filter(i => i.location === 'Pharmacy');
      if (type === 'Optical') return allItems.filter(i => i.location === 'Optical Store');
      return allItems.filter(i => i.location === 'General Store');
    }
  },

  // --- New Clinical Modules ---

  surgery: {
    getSchedule: async (): Promise<Surgery[]> => {
        await new Promise(resolve => setTimeout(resolve, DELAY));
        return MOCK_SURGERIES;
    }
  },

  lab: {
    getOrders: async (): Promise<LabOrder[]> => {
        await new Promise(resolve => setTimeout(resolve, DELAY));
        return MOCK_LAB_ORDERS;
    }
  },

  ward: {
    getBeds: async (): Promise<WardBed[]> => {
        await new Promise(resolve => setTimeout(resolve, DELAY));
        return MOCK_BEDS;
    }
  },

  cssd: {
    getItems: async (): Promise<CSSDItem[]> => {
        await new Promise(resolve => setTimeout(resolve, DELAY));
        return [
            { id: 'S1', name: 'Cataract Set', batchNo: 'B-101', sterilizationDate: '2023-12-01', expiryDate: '2023-12-08', status: 'Sterile' },
            { id: 'S2', name: 'DCR Set', batchNo: 'B-102', sterilizationDate: '2023-11-28', expiryDate: '2023-12-05', status: 'Expired' },
            { id: 'S3', name: 'General Tray', batchNo: 'B-103', sterilizationDate: '2023-12-01', expiryDate: '2023-12-08', status: 'Autoclaving' },
        ];
    }
  },

  // --- Non-Clinical Modules ---

  purchase: {
      getOrders: async (): Promise<PurchaseOrder[]> => {
          await new Promise(resolve => setTimeout(resolve, DELAY));
          return MOCK_POS;
      }
  },

  linen: {
      getBatchStatus: async (): Promise<LinenBatch[]> => {
          await new Promise(resolve => setTimeout(resolve, DELAY));
          return MOCK_LINEN;
      }
  },

  assets: {
      getAll: async (): Promise<Asset[]> => {
          await new Promise(resolve => setTimeout(resolve, DELAY));
          return MOCK_ASSETS;
      }
  },
  
  reports: {
      getDashboardMetrics: async (): Promise<any> => {
          await new Promise(resolve => setTimeout(resolve, DELAY));
          return { revenue: 125000, expenses: 45000, profit: 80000 };
      }
  },
  
  system: {
    checkConnection: async () => {
        // Ping server
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    }
  }
};
