// database.js - Final SQLite Implementation
import * as SQLite from 'expo-sqlite';

let db = null;

// Initialize database
export const initDatabase = async () => {
  try {
    console.log('🔧 Initializing SQLite database...');
    
    // Open database
    db = await SQLite.openDatabaseAsync('wastelogger.db');
    console.log('✅ Database opened');
    
    // Create table
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS waste_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        waste_type TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        bin_type TEXT NOT NULL,
        notes TEXT,
        created_at TEXT NOT NULL
      );
    `);
    
    console.log('✅ Database table ready');
    
    // Verify table exists
    const result = await db.getFirstAsync('SELECT COUNT(*) as count FROM waste_logs');
    console.log(`✅ Current logs in database: ${result.count}`);
    
    return true;
  } catch (error) {
    console.error('❌ Database error:', error);
    throw error;
  }
};

// Ensure database is ready
const ensureDbReady = async () => {
  if (!db) {
    await initDatabase();
  }
};

// CREATE - Add new waste log
export const addWasteLog = async (wasteType, quantity, binType, notes = '') => {
  try {
    await ensureDbReady();
    
    const result = await db.runAsync(
      'INSERT INTO waste_logs (waste_type, quantity, bin_type, notes, created_at) VALUES (?, ?, ?, ?, ?)',
      [wasteType, quantity, binType, notes, new Date().toISOString()]
    );
    
    console.log('✅ Added waste log ID:', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('❌ Error adding log:', error);
    throw error;
  }
};

// READ - Get all waste logs
export const getAllWasteLogs = async () => {
  try {
    await ensureDbReady();
    
    const logs = await db.getAllAsync('SELECT * FROM waste_logs ORDER BY created_at DESC');
    console.log(`✅ Retrieved ${logs.length} logs`);
    return logs;
  } catch (error) {
    console.error('❌ Error getting logs:', error);
    return [];
  }
};

// UPDATE - Edit existing waste log
export const updateWasteLog = async (id, wasteType, quantity, binType, notes = '') => {
  try {
    await ensureDbReady();
    
    const result = await db.runAsync(
      'UPDATE waste_logs SET waste_type = ?, quantity = ?, bin_type = ?, notes = ? WHERE id = ?',
      [wasteType, quantity, binType, notes, id]
    );
    
    console.log(`✅ Updated log ${id}, rows affected: ${result.changes}`);
    return result.changes > 0;
  } catch (error) {
    console.error('❌ Error updating log:', error);
    throw error;
  }
};

// DELETE - Remove waste log
export const deleteWasteLog = async (id) => {
  try {
    await ensureDbReady();
    
    const result = await db.runAsync('DELETE FROM waste_logs WHERE id = ?', [id]);
    console.log(`✅ Deleted log ${id}, rows affected: ${result.changes}`);
    return result.changes > 0;
  } catch (error) {
    console.error('❌ Error deleting log:', error);
    throw error;
  }
};