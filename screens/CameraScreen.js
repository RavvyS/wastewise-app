// screens/CameraScreen.js - Camera Scanner Screen
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Import utilities and styles
import { colors, globalStyles, spacing } from '../styles/globalStyles';

export default function CameraScreen({ navigation }) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [showTips, setShowTips] = useState(false);

  // Mock camera functionality for demo purposes
  // In a real app, you would use expo-camera and ML Kit
  const handleScan = async () => {
    setIsScanning(true);

    // Simulate camera scanning process
    setTimeout(() => {
      setIsScanning(false);
      
      // Mock detection results
      const mockResults = [
        {
          symbol: '1',
          name: 'PET Plastic',
          binType: 'Recycling Bin',
          recyclable: true,
          confidence: 95,
          tips: ['Rinse container before recycling', 'Remove labels if possible']
        },
        {
          symbol: '2',
          name: 'HDPE Plastic',
          binType: 'Recycling Bin',
          recyclable: true,
          confidence: 88,
          tips: ['Clean thoroughly', 'Widely accepted in recycling programs']
        },
        {
          symbol: '6',
          name: 'Polystyrene (Styrofoam)',
          binType: 'General Waste',
          recyclable: false,
          confidence: 92,
          tips: ['Not recyclable in most programs', 'Consider reusable alternatives']
        }
      ];

      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      
      Alert.alert(
        `${result.recyclable ? '♻️' : '🗑️'} Detection Result`,
        `Found: ${result.name}\n\nDisposal: ${result.binType}\nConfidence: ${result.confidence}%\n\nTip: ${result.tips[0]}`,
        [
          { text: 'Scan Again', style: 'default' },
          { 
            text: 'Add to Log', 
            style: 'default',
            onPress: () => navigation.navigate('Logs', { 
              screen: 'AddLog',
              params: {
                scannedItem: {
                  itemName: result.name,
                  category: 'Plastic',
                  binType: result.binType,
                  recyclable: result.recyclable,
                  method: 'Camera Scan'
                }
              }
            })
          }
        ]
      );
    }, 2000);
  };

  const showDetectionTips = () => {
    Alert.alert(
      '📷 Scanning Tips',
      '• Ensure good lighting\n• Hold camera steady\n• Focus on recycling symbol\n• Keep symbol in center frame\n• Clean the symbol if dirty\n• Try different angles if needed',
      [{ text: 'Got it!' }]
    );
  };

  const requestCameraPermission = async () => {
    // Mock permission request
    Alert.alert(
      'Camera Permission',
      'WasteLogger needs camera access to scan recycling symbols.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Allow', 
          onPress: () => {
            setHasPermission(true);
            Alert.alert('Permission Granted', 'You can now use the camera to scan items!');
          }
        }
      ]
    );
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <MaterialIcons name="camera" size={64} color={colors.lightGray} />
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            WasteLogger uses your camera to scan recycling symbols and identify proper disposal methods.
          </Text>
          <TouchableOpacity 
            style={styles.permissionButton}
            onPress={requestCameraPermission}
          >
            <MaterialIcons name="camera" size={20} color="white" />
            <Text style={styles.permissionButtonText}>Enable Camera</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <MaterialIcons name="camera-off" size={64} color={colors.error} />
          <Text style={styles.permissionTitle}>Camera Access Denied</Text>
          <Text style={styles.permissionText}>
            Please enable camera access in your device settings to use the scanning feature.
          </Text>
          <TouchableOpacity 
            style={[styles.permissionButton, { backgroundColor: colors.secondary }]}
            onPress={() => Alert.alert('Settings', 'Please go to Settings > Privacy > Camera to enable access.')}
          >
            <MaterialIcons name="settings" size={20} color="white" />
            <Text style={styles.permissionButtonText}>Open Settings</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📷 Scan Recycling Symbol</Text>
        <TouchableOpacity 
          style={styles.tipsButton}
          onPress={showDetectionTips}
        >
          <MaterialIcons name="help" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Camera View Simulation */}
      <View style={styles.cameraContainer}>
        <View style={styles.cameraView}>
          {/* Scanning Overlay */}
          <View style={styles.scanningOverlay}>
            <View style={styles.scanFrame}>
              <View style={[styles.cornerOverlay, styles.topLeft]} />
              <View style={[styles.cornerOverlay, styles.topRight]} />
              <View style={[styles.cornerOverlay, styles.bottomLeft]} />
              <View style={[styles.cornerOverlay, styles.bottomRight]} />
              
              {isScanning ? (
                <View style={styles.scanningIndicator}>
                  <ActivityIndicator size="large" color={colors.primary} />
                  <Text style={styles.scanningText}>Analyzing symbol...</Text>
                </View>
              ) : (
                <View style={styles.scanPrompt}>
                  <MaterialIcons name="center-focus-strong" size={48} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.scanPromptText}>
                    Position recycling symbol in the frame
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Control Buttons */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity 
            style={styles.flashButton}
            onPress={() => Alert.alert('Flash', 'Flash toggle functionality would be here')}
          >
            <MaterialIcons name="flash-off" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.captureButton, isScanning && styles.captureButtonDisabled]}
            onPress={handleScan}
            disabled={isScanning}
          >
            <View style={styles.captureInner}>
              {isScanning ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <MaterialIcons name="camera" size={32} color="white" />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.galleryButton}
            onPress={() => Alert.alert('Gallery', 'Photo gallery selection would be here')}
          >
            <MaterialIcons name="photo-library" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <View style={styles.instructionItem}>
          <MaterialIcons name="wb-sunny" size={20} color={colors.accent} />
          <Text style={styles.instructionText}>Ensure good lighting</Text>
        </View>
        <View style={styles.instructionItem}>
          <MaterialIcons name="center-focus-strong" size={20} color={colors.primary} />
          <Text style={styles.instructionText}>Center the recycling symbol</Text>
        </View>
        <View style={styles.instructionItem}>
          <MaterialIcons name="pan-tool" size={20} color={colors.secondary} />
          <Text style={styles.instructionText}>Hold steady while scanning</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('Logs', { screen: 'AddLog' })}
        >
          <MaterialIcons name="edit" size={20} color={colors.primary} />
          <Text style={styles.quickActionText}>Manual Entry</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('Knowledge')}
        >
          <MaterialIcons name="book" size={20} color={colors.secondary} />
          <Text style={styles.quickActionText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },

  // Permission states
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.background,
  },
  
  permissionTitle: {
    ...globalStyles.textTitle,
    textAlign: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  
  permissionText: {
    ...globalStyles.textBody,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  
  permissionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 25,
    gap: spacing.xs,
  },
  
  permissionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  
  tipsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Camera
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  
  cameraView: {
    flex: 1,
    backgroundColor: colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  scanningOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  scanFrame: {
    width: 280,
    height: 280,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  cornerOverlay: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: colors.primary,
    borderWidth: 3,
  },
  
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  
  scanningIndicator: {
    alignItems: 'center',
  },
  
  scanningText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
    marginTop: spacing.md,
  },
  
  scanPrompt: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  
  scanPromptText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    textAlign: 'center',
    marginTop: spacing.md,
  },

  // Controls
  controlsContainer: {
    position: 'absolute',
    bottom: spacing.xl,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  
  flashButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: spacing.xl,
  },
  
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.white,
  },
  
  captureButtonDisabled: {
    backgroundColor: colors.gray,
  },
  
  captureInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: spacing.xl,
  },

  // Instructions
  instructionsContainer: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
  instructionItem: {
    alignItems: 'center',
    flex: 1,
  },
  
  instructionText: {
    ...globalStyles.textSmall,
    textAlign: 'center',
    marginTop: spacing.xs,
    lineHeight: 14,
  },

  // Quick Actions
  quickActionsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    gap: spacing.xs,
  },
  
  quickActionText: {
    ...globalStyles.textCaption,
    fontWeight: '500',
  },
});