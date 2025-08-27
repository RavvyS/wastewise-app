// screens/AddLogScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  StyleSheet
} from 'react-native';
import { addWasteLog, updateWasteLog } from '../database';

const AddLogScreen = ({ navigation, route }) => {
  // Check if we're editing an existing log
  const editLog = route.params?.editLog;
  const isEditing = !!editLog;

  // Form state
  const [wasteType, setWasteType] = useState(editLog?.waste_type || '');
  const [quantity, setQuantity] = useState(editLog?.quantity?.toString() || '1');
  const [binType, setBinType] = useState(editLog?.bin_type || '');
  const [notes, setNotes] = useState(editLog?.notes || '');

  // Common waste types for quick selection
  const commonWasteTypes = [
    'Plastic Bottle', 'Food Waste', 'Paper', 'Glass Jar', 
    'Cardboard', 'Electronics', 'Batteries', 'Aluminum Can'
  ];

  // Common bin types
  const binTypes = [
    'Recycling Bin', 'Organic Bin', 'General Waste', 
    'Glass Recycling', 'E-Waste', 'Hazardous Waste'
  ];

  // Validate form
  const validateForm = () => {
    if (!wasteType.trim()) {
      Alert.alert('Error', 'Please enter a waste type');
      return false;
    }
    if (!quantity.trim() || isNaN(quantity) || parseInt(quantity) < 1) {
      Alert.alert('Error', 'Please enter a valid quantity (1 or more)');
      return false;
    }
    if (!binType.trim()) {
      Alert.alert('Error', 'Please select a bin type');
      return false;
    }
    return true;
  };

  // Save the log
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      if (isEditing) {
        // Update existing log
        await updateWasteLog(
          editLog.id,
          wasteType.trim(),
          parseInt(quantity),
          binType,
          notes.trim()
        );
        Alert.alert('Success', 'Waste log updated successfully!');
      } else {
        // Create new log
        await addWasteLog(
          wasteType.trim(),
          parseInt(quantity),
          binType,
          notes.trim()
        );
        Alert.alert('Success', 'Waste log added successfully!');
      }

      navigation.goBack();
    } catch (error) {
      console.error('💥 Error saving log:', error);
      Alert.alert('Error', 'Failed to save waste log');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.formTitle}>
          {isEditing ? '✏️ Edit Waste Log' : '➕ Add New Waste Log'}
        </Text>

        {/* Waste Type Input */}
        <View style={styles.section}>
          <Text style={styles.label}>🗑️ What did you throw away?</Text>
          <TextInput
            style={styles.textInput}
            value={wasteType}
            onChangeText={setWasteType}
            placeholder="e.g., Plastic bottle, Food waste..."
            multiline={false}
          />
          
          {/* Quick selection buttons */}
          <Text style={styles.quickSelectLabel}>Quick select:</Text>
          <View style={styles.quickSelectContainer}>
            {commonWasteTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.quickSelectButton,
                  wasteType === type && styles.quickSelectButtonSelected
                ]}
                onPress={() => setWasteType(type)}
              >
                <Text style={[
                  styles.quickSelectText,
                  wasteType === type && styles.quickSelectTextSelected
                ]}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quantity Input */}
        <View style={styles.section}>
          <Text style={styles.label}>🔢 How many items?</Text>
          <TextInput
            style={styles.textInput}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="1"
            keyboardType="numeric"
          />
        </View>

        {/* Bin Type Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>📦 Which bin did you use?</Text>
          <View style={styles.binTypeContainer}>
            {binTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.binTypeButton,
                  binType === type && styles.binTypeButtonSelected
                ]}
                onPress={() => setBinType(type)}
              >
                <Text style={[
                  styles.binTypeText,
                  binType === type && styles.binTypeTextSelected
                ]}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notes Input */}
        <View style={styles.section}>
          <Text style={styles.label}>💭 Notes (optional)</Text>
          <TextInput
            style={[styles.textInput, styles.notesInput]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Any additional notes..."
            multiline={true}
            numberOfLines={3}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {isEditing ? '💾 Update Log' : '💚 Save Log'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  quickSelectLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    marginBottom: 8,
  },
  quickSelectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickSelectButton: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  quickSelectButtonSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  quickSelectText: {
    fontSize: 14,
    color: '#333',
  },
  quickSelectTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  binTypeContainer: {
    gap: 10,
  },
  binTypeButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  binTypeButtonSelected: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  binTypeText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  binTypeTextSelected: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddLogScreen;