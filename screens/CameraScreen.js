// screens/CameraScreen.js - Updated for ML Kit
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { enhancedDetection } from '../utils/imageProcessor';
import { getRecyclingInfo } from '../utils/recyclingData';
import RecyclingInfo from '../components/RecyclingInfo';

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      setIsAnalyzing(true);
      setAnalysisStep('Taking photo...');
      
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false, // ML Kit works with URIs
        exif: false,
      });

      setCapturedImage(photo);
      setAnalysisStep('Analyzing image with AI...');

      // Use enhanced ML Kit detection
      const result = await enhancedDetection(photo);
      
      if (result.symbol) {
        const recyclingInfo = getRecyclingInfo(result.symbol);
        setDetectionResult({ ...result, info: recyclingInfo });
        setShowInfo(true);
      } else {
        // Show detailed feedback
        const message = result.rawText ? 
          `Text detected: "${result.rawText.substring(0, 100)}${result.rawText.length > 100 ? '...' : ''}"\n\n${result.tip || 'No recycling symbol found. Try positioning the camera closer to the ♻️ symbol.'}` :
          result.tip || 'No text detected. Try taking a clearer photo of the recycling symbol with better lighting.';
          
        Alert.alert(
          'No Recycling Symbol Found',
          message,
          [
            { text: 'Tips', onPress: () => showDetectionTips() },
            { text: 'Try Again', onPress: resetCamera }
          ]
        );
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert(
        'Detection Error', 
        'Failed to analyze image. Make sure you have good lighting and the recycling symbol is clearly visible.',
        [{ text: 'Try Again', onPress: resetCamera }]
      );
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep('');
    }
  };

  const resetCamera = () => {
    setCapturedImage(null);
    setDetectionResult(null);
    setShowInfo(false);
    setAnalysisStep('');
  };

  const saveToLogs = async () => {
    if (!detectionResult?.info) return;

    try {
      // Navigate to your existing AddLogScreen with pre-filled data
      navigation.navigate('Logs', {
        screen: 'AddLog',
        params: {
          detectedItem: {
            wasteType: `${detectionResult.info.material} - ${detectionResult.info.name} (#${detectionResult.symbol})`,
            binType: detectionResult.info.binType,
            notes: `Detected via ${detectionResult.method}\nConfidence: ${detectionResult.confidence}%\n\nDetected text: "${detectionResult.rawText}"\n\n${detectionResult.info.description}`,
            image: capturedImage?.uri
          }
        }
      });
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Error', 'Failed to save log');
    }
  };

  const showDetectionTips = () => {
    Alert.alert(
      'Better Detection Tips',
      '🔍 What to look for:\n• Triangular ♻️ symbol with number 1-7 inside\n• Usually found on bottom of containers\n\n💡 For better results:\n• Ensure good, even lighting\n• Move closer to fill the frame\n• Hold camera steady\n• Clean dirty or scratched surfaces\n• Try different angles if symbol is unclear',
      [
        { text: 'Got it!', onPress: resetCamera },
        { text: 'Try Again', onPress: resetCamera }
      ]
    );
  };

  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.permissionText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>📷 Camera Access Required</Text>
        <Text style={styles.permissionText}>
          WasteLogger needs camera access to scan recycling symbols and help you dispose waste properly.
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (capturedImage && showInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <RecyclingInfo 
          result={detectionResult}
          image={capturedImage}
          onSave={saveToLogs}
          onRetry={resetCamera}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>📷 AI Recycling Scanner</Text>
        <Text style={styles.subText}>Point camera at recycling symbol (♻️ with number 1-7)</Text>
      </View>

      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="back"
        />
        
        {/* Overlay positioned outside CameraView */}
        <View style={styles.overlayContainer}>
          <View style={styles.scanBox}>
            <Text style={styles.scanText}>
              Position recycling symbol here
            </Text>
            <Text style={styles.scanSubtext}>
              Look for ♻️ with number 1-7
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.controls}>
        {isAnalyzing ? (
          <View style={styles.analyzingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.analyzingText}>
              {analysisStep || 'Processing with AI...'}
            </Text>
            <Text style={styles.analyzingSubtext}>
              Using Google ML Kit text recognition
            </Text>
          </View>
        ) : (
          <>
            <TouchableOpacity 
              style={styles.captureButton} 
              onPress={takePicture}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            <Text style={styles.captureText}>Tap to scan</Text>
          </>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.tipButton} 
          onPress={showDetectionTips}
        >
          <Text style={styles.tipButtonText}>💡 Detection Tips</Text>
        </TouchableOpacity>
      </View>
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  cameraContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanBox: {
    width: 250,
    height: 200,
    borderWidth: 3,
    borderColor: '#4CAF50',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  scanText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scanSubtext: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  controls: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  captureText: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  analyzingContainer: {
    alignItems: 'center',
  },
  analyzingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  analyzingSubtext: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  tipButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  tipButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    color: '#666',
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});