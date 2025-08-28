// utils/database.js - Adapter and helpers
import { 
  initDatabase as baseInitDatabase,
  addWasteLog as baseAddWasteLog,
  getAllWasteLogs as baseGetAllWasteLogs,
  updateWasteLog as baseUpdateWasteLog,
  deleteWasteLog as baseDeleteWasteLog,
} from '../database';

// Re-export core database functions
export const initDatabase = baseInitDatabase;
export const addWasteLog = async (logData) => {
  // Normalize to the schema expected by the SQL table in ../database.js
  // Table columns: waste_type, quantity, bin_type, notes, created_at
  const wasteType = logData?.category || logData?.itemName || 'Unknown';
  const quantity = 1; // Default to 1 item for manual entries
  const binType = logData?.binType || 'General Waste';
  const notes = logData?.notes || '';
  return baseAddWasteLog(wasteType, quantity, binType, notes);
};

// Map raw DB rows to UI-friendly shape
const mapRowToUiLog = (raw) => ({
  id: raw.id,
  item_name: raw.waste_type || 'Item',
  category: raw.waste_type || 'Unknown',
  bin_type: raw.bin_type || 'General Waste',
  notes: raw.notes || '',
  created_at: raw.created_at,
  recyclable: (raw.bin_type || '').includes('Recycling'),
  method: 'Manual Entry',
});

export const getAllWasteLogs = async () => {
  const rows = await baseGetAllWasteLogs();
  return rows.map(mapRowToUiLog);
};

export const updateWasteLog = baseUpdateWasteLog;
export const deleteWasteLog = baseDeleteWasteLog;

// Helper: Apply common filters used in WasteLogsScreen
export const getFilteredWasteLogs = async (options = {}) => {
  const { searchQuery = '', filter = 'All' } = options;
  let filtered = await getAllWasteLogs();

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter((log) =>
      (log.item_name || '').toLowerCase().includes(q) ||
      (log.category || '').toLowerCase().includes(q) ||
      (log.bin_type || '').toLowerCase().includes(q)
    );
  }

  if (filter && filter !== 'All') {
    switch (filter) {
      case 'Today': {
        const today = new Date().toISOString().split('T')[0];
        filtered = filtered.filter((l) => l.created_at && l.created_at.startsWith(today));
        break;
      }
      case 'This Week': {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = filtered.filter((l) => l.created_at && new Date(l.created_at) >= weekAgo);
        break;
      }
      case 'Recyclable':
        filtered = filtered.filter((l) => l.recyclable);
        break;
      case 'Non-Recyclable':
        filtered = filtered.filter((l) => !l.recyclable);
        break;
      default:
        break;
    }
  }

  return filtered;
};

// Helper: Stats used by HomeScreen (optional convenience)
export const getUserStats = async () => {
  const logs = await getAllWasteLogs();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const thisWeekLogs = logs.filter((l) => l.created_at && new Date(l.created_at) >= weekAgo);
  const recyclableCount = logs.filter((l) => l.recyclable).length;
  const ecoScore = (recyclableCount * 10) + (logs.length * 5);
  return {
    totalLogs: logs.length,
    thisWeek: thisWeekLogs.length,
    recyclableCount,
    ecoScore,
  };
};

// Helper: Mocked recycling centers for LocationsScreen
export const getRecyclingCenters = async () => {
  // In a real app, fetch from API or local DB. For now, return static data.
  return [
    {
      id: 1,
      name: 'Green City Recycling Center',
      address: '123 Eco Ave, Springfield',
      distance: 1.2,
      rating: 4.6,
      services: ['Plastic', 'Paper', 'Glass', 'Electronics'],
      hours: 'Mon–Sat 9:00 AM – 6:00 PM',
      phone: '(555) 123-4567',
      website: 'https://greencity.example.com',
    },
    {
      id: 2,
      name: 'Metro Materials Recovery',
      address: '456 Reuse Blvd, Springfield',
      distance: 2.8,
      rating: 4.3,
      services: ['Plastic', 'Paper', 'Cardboard', 'Metal'],
      hours: 'Daily 8:00 AM – 8:00 PM',
      phone: '(555) 987-6543',
      website: 'https://metromr.example.com',
    },
    {
      id: 3,
      name: 'SafeWaste Drop-off',
      address: '789 Hazard Way, Springfield',
      distance: 4.1,
      rating: 4.1,
      services: ['Hazardous', 'Electronics', 'Batteries'],
      hours: 'Wed–Sun 10:00 AM – 5:00 PM',
      phone: '(555) 222-3344',
      website: 'https://safewaste.example.com',
    },
  ];
};