import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  RefreshControl
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getAllWasteLogs, deleteWasteLog } from '../database';

export default function LogsListScreen({ navigation }) {
  const [logs, setLogs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadLogs();
    const unsubscribe = navigation.addListener('focus', loadLogs);
    return unsubscribe;
  }, [navigation]);

  const loadLogs = async () => {
    try {
      const wasteLogs = await getAllWasteLogs();
      setLogs(wasteLogs.reverse()); // Most recent first - FIXED the typo
    } catch (error) {
      console.error('Error loading logs:', error);
      Alert.alert('Error', 'Failed to load waste logs');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLogs();
    setRefreshing(false);
  };

  const handleDeleteLog = (id) => {
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
      'Glass Recycling': '#2196F3',
      'E-Waste': '#FF5722',
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
        <View style={styles.emptyState}>
          <MaterialIcons name="inbox" size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>No waste logs yet</Text>
          <Text style={styles.emptySubtitle}>Start tracking your waste disposal!</Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => navigation.navigate('AddLog')}
          >
            <MaterialIcons name="add" size={20} color="white" style={{marginRight: 8}} />
            <Text style={styles.emptyButtonText}>Add Your First Log</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={logs}
          renderItem={renderLogItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.logsList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#4CAF50']}
            />
          }
          showsVerticalScrollIndicator={false}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  logsList: {
    padding: 15,
  },
  logCard: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  wasteType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  quantityBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  binInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
    fontWeight: '500',
  },
  notes: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  logFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 13,
    color: '#999',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFEBEE',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  emptyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});