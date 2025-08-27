import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import { getBinTypeColor } from '../utils/recyclingData';

export default function RecyclingInfo({ result, image, onSave, onRetry }) {
  const { symbol, info, confidence } = result;

  const handleSave = () => {
    Alert.alert(
      'Save to Waste Log',
      `Add this ${info.material} item to your waste log?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Save', onPress: onSave }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with image */}
      <View style={styles.header}>
        <Image source={{ uri: image.uri }} style={styles.capturedImage} />
        <View style={styles.detectionInfo}>
          <Text style={styles.symbolCode}>#{symbol}</Text>
          <Text style={styles.symbolName}>{info.name}</Text>
          <Text style={styles.confidence}>
            {confidence}% confidence
          </Text>
        </View>
      </View>

      {/* Recycling Status */}
      <View style={[styles.statusCard, { borderLeftColor: info.color }]}>
        <Text style={styles.statusTitle}>♻️ Recycling Status</Text>
        <View style={styles.binInfo}>
          <View style={[styles.binIndicator, { backgroundColor: getBinTypeColor(info.binType) }]} />
          <Text style={styles.binType}>{info.binType}</Text>
        </View>
        <Text style={[styles.recyclableStatus, { 
          color: info.recyclable ? '#4CAF50' : '#F44336' 
        }]}>
          {info.recyclable ? '✅ Recyclable' : '❌ Not Recyclable'}
        </Text>
      </View>

      {/* Material Info */}
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>📋 Material Information</Text>
        <Text style={styles.fullName}>{info.fullName}</Text>
        <Text style={styles.description}>{info.description}</Text>
      </View>

      {/* Common Uses */}
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>🏷️ Common Uses</Text>
        {info.commonUses.map((use, index) => (
          <Text key={index} style={styles.listItem}>• {use}</Text>
        ))}
      </View>

      {/* Recycling Tips */}
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>💡 Disposal Tips</Text>
        {info.tips.map((tip, index) => (
          <Text key={index} style={styles.tipItem}>
            {index + 1}. {tip}
          </Text>
        ))}
      </View>

      {/* What it becomes */}
      {info.recyclable && (
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>🔄 Recycled Into</Text>
          {info.recycledInto.map((item, index) => (
            <Text key={index} style={styles.listItem}>• {item}</Text>
          ))}
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>📷 Scan Again</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>💾 Save to Log</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  capturedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detectionInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  symbolCode: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  symbolName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
  },
  confidence: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  statusCard: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  binInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  binIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  binType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  recyclableStatus: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  fullName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#666',
  },
  listItem: {
    fontSize: 15,
    lineHeight: 24,
    color: '#666',
    marginBottom: 5,
  },
  tipItem: {
    fontSize: 15,
    lineHeight: 24,
    color: '#666',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  retryButton: {
    flex: 1,
    backgroundColor: '#FF9800',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});