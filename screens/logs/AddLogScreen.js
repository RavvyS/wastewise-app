// screens/logs/AddLogScreen.js - Add / Edit Waste Log Screen
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { addWasteLog, updateWasteLog } from "../../database";

export default function AddLogScreen({ navigation, route }) {
  const editLog = route?.params?.editLog || null;

  const [wasteType, setWasteType] = useState(editLog ? editLog.waste_type : "");
  const [quantity, setQuantity] = useState(
    editLog ? String(editLog.quantity) : "1"
  );
  const [binType, setBinType] = useState(
    editLog ? editLog.bin_type : "General Waste"
  );
  const [notes, setNotes] = useState(editLog ? editLog.notes : "");

  useEffect(() => {
    navigation.setOptions({
      headerTitle: editLog ? "Edit Waste Log" : "Add Waste Log",
    });
  }, [navigation, editLog]);

  const handleSave = async () => {
    if (!wasteType.trim()) {
      Alert.alert("Validation", "Please enter a waste type");
      return;
    }

    const qty = parseInt(quantity, 10);
    if (Number.isNaN(qty) || qty <= 0) {
      Alert.alert("Validation", "Please enter a valid quantity");
      return;
    }

    try {
      if (editLog) {
        await updateWasteLog(
          editLog.id,
          wasteType.trim(),
          qty,
          binType,
          notes.trim()
        );
      } else {
        await addWasteLog(wasteType.trim(), qty, binType, notes.trim());
      }

      // Navigate back to previous screen (logs list)
      navigation.goBack();
    } catch (error) {
      console.error("Error saving log:", error);
      Alert.alert("Error", "Failed to save waste log");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Waste Type</Text>
        <TextInput
          style={styles.input}
          value={wasteType}
          onChangeText={setWasteType}
          placeholder="e.g., Plastic Bottle"
        />

        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Bin Type</Text>
        <TextInput
          style={styles.input}
          value={binType}
          onChangeText={setBinType}
          placeholder="e.g., Recycling Bin"
        />

        <Text style={styles.label}>Notes (optional)</Text>
        <TextInput
          style={[styles.input, { height: 90 }]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Any notes..."
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {editLog ? "Save Changes" : "Add Log"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  form: { padding: 16 },
  label: { fontSize: 14, color: "#333", marginBottom: 6, fontWeight: "600" },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
  },
  saveButtonText: { color: "white", fontSize: 16, fontWeight: "700" },
});
