import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from 'react-native';
import { getAllWasteLogs, deleteWasteLog } from '../database'; // Your existing functions
import { MaterialIcons } from '@expo/vector-icons';

export default function LogsScreen({ navigation }) {
  const [logs, setLogs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadLogs();
    const unsubscribe = navigation.addListener('focus', loadLogs);
    return unsubscribe;
  }, [navigation]);

  const loadLogs = async () => {
    try {
      setRefreshing(true);
      const allLogs = await getAllWasteLogs();
      setLogs(allLogs);
    } catch (error) {
      console.error('Error loading logs:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDeleteLog = async (id) => {
    Alert.alert(
      'Delete Log',
      'Are you sure you want to delete this waste log?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteWasteLog(id);
              loadLogs(); // Reload logs
            } catch (error) {
              Alert.alert('Error', 'Failed to delete log');
            }
          }
        }
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getBinColor = (binType) => {
    const colors = {
      'Recycling Bin': '#4CAF50',
      'General Waste': '#757575',
      'Organic Bin': '#8BC34A',
      'Special Collection': '#FF9800',
      'Hazardous Waste': '#F44336'
    };
    return colors[binType] || '#757575';
  };

  const renderLogItem = ({ item }) => (
    <View style={styles.logCard}>
      <View style={styles.logHeader}>
        <Text style={styles.wasteType}>{item.waste_type}</Text>
        <View style={styles.quantityBadge}>
          <Text style={styles.quantityText}>{item.quantity}</Text>
        </View>
      </View>
      
      <View style={styles.binInfo}>
        <View style={[styles.binDot, { backgroundColor: getBinColor(item.bin_type) }]} />
        <Text style={styles.binType}>{item.bin_type}</Text>
      </View>
      
      {item.notes && (
        <Text style={styles.notes}>{item.notes}</Text>
      )}
      
      <View style={styles.logFooter}>
        <Text style={styles.date}>{formatDate(item.created_at)}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('AddLog', { editLog: item })}
          >
            <MaterialIcons name="edit" size={20} color="#2196F3" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteLog(item.id)}
          >
            <MaterialIcons name="delete" size={20} color="#F44336" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📊 Your Waste Logs</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddLog')}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {logs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="inbox" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No logs yet</Text>
          <Text style={styles.emptyText}>Start by scanning an item or adding a manual log</Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => navigation.navigate('Camera')}
          >
            <Text style={styles.scanButtonText}>📷 Scan First Item</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={logs}
          renderItem={renderLogItem}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onRefresh={loadLogs}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    padding: 15,
  },
  logCard: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  wasteType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  quantityBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  binInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  binDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  binType: {
    fontSize: 16,
    color: '#666',
  },
  notes: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  logFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    padding: 5,
  },
  deleteButton: {
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  scanButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});