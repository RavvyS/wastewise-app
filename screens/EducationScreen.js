// screens/EducationScreen.js (simplified version to fix the error)
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { getAllRecyclingInfo } from '../utils/recyclingData';

export default function EducationScreen() {
  const recyclingInfo = getAllRecyclingInfo();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>📚 Recycling Guide</Text>
          <Text style={styles.subtitle}>
            Learn about recycling symbols and proper disposal
          </Text>
        </View>

        <View style={styles.symbolsSection}>
          <Text style={styles.sectionHeader}>♻️ Recycling Symbols</Text>
          
          {recyclingInfo.map((info) => (
            <View key={info.code} style={styles.symbolCard}>
              <View style={styles.symbolHeader}>
                <Text style={styles.symbolCode}>#{info.code}</Text>
                <Text style={styles.symbolName}>{info.name}</Text>
              </View>
              <Text style={styles.description}>{info.description}</Text>
              <Text style={[styles.binType, { color: info.recyclable ? '#4CAF50' : '#F44336' }]}>
                {info.binType} - {info.recyclable ? '♻️ Recyclable' : '❌ Not Recyclable'}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  symbolsSection: {
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  symbolCard: {
    backgroundColor: 'white',
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  symbolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  symbolCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 15,
  },
  symbolName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 10,
  },
  binType: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});