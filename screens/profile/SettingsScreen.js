// screens/profile/SettingsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
  Modal
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    reminders: true,
    achievements: true,
    articles: false,
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    autoBackup: true,
    dataSharing: false,
    analytics: true,
  });

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Chinese',
    'Japanese',
    'Portuguese',
    'Italian'
  ];

  const toggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const togglePreference = (type) => {
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Your waste logs and learning progress will be exported to a downloadable file.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => console.log('Exporting data...') }
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear temporary files and may log you out. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: () => console.log('Clearing cache...') }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Are you sure?',
              'This will permanently delete your account and all associated data.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete Forever', style: 'destructive', onPress: () => console.log('Account deleted') }
              ]
            );
          }
        }
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, showArrow = true, children }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingIcon}>
        <MaterialIcons name={icon} size={24} color="#666" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {children}
      {showArrow && onPress && (
        <MaterialIcons name="arrow-forward-ios" size={16} color="#ccc" />
      )}
    </TouchableOpacity>
  );

  const LanguageModal = () => (
    <Modal
      visible={showLanguageModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowLanguageModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <TouchableOpacity 
              onPress={() => setShowLanguageModal(false)}
              style={styles.modalCloseButton}
            >
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.languageList}>
            {languages.map((language, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.languageItem,
                  selectedLanguage === language && styles.selectedLanguageItem
                ]}
                onPress={() => {
                  setSelectedLanguage(language);
                  setShowLanguageModal(false);
                }}
              >
                <Text style={[
                  styles.languageText,
                  selectedLanguage === language && styles.selectedLanguageText
                ]}>
                  {language}
                </Text>
                {selectedLanguage === language && (
                  <MaterialIcons name="check" size={20} color="#4CAF50" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <SettingItem
            icon="person"
            title="Profile Information"
            subtitle="Update your personal details"
            onPress={() => navigation.navigate('ProfileMain')}
          />
          
          <SettingItem
            icon="security"
            title="Privacy & Security"
            subtitle="Manage your account security"
            onPress={() => console.log('Privacy settings')}
          />
          
          <SettingItem
            icon="language"
            title="Language"
            subtitle={selectedLanguage}
            onPress={() => setShowLanguageModal(true)}
          />
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <SettingItem
            icon="notifications"
            title="Push Notifications"
            subtitle="Receive app notifications"
            showArrow={false}
          >
            <Switch
              value={notifications.push}
              onValueChange={() => toggleNotification('push')}
              trackColor={{ false: "#ccc", true: "#4CAF50" }}
              thumbColor={notifications.push ? "#white" : "#f4f3f4"}
            />
          </SettingItem>
          
          <SettingItem
            icon="email"
            title="Email Updates"
            subtitle="Get updates via email"
            showArrow={false}
          >
            <Switch
              value={notifications.email}
              onValueChange={() => toggleNotification('email')}
              trackColor={{ false: "#ccc", true: "#4CAF50" }}
              thumbColor={notifications.email ? "#white" : "#f4f3f4"}
            />
          </SettingItem>
          
          <SettingItem
            icon="alarm"
            title="Learning Reminders"
            subtitle="Daily learning reminders"
            showArrow={false}
          >
            <Switch
              value={notifications.reminders}
              onValueChange={() => toggleNotification('reminders')}
              trackColor={{ false: "#ccc", true: "#4CAF50" }}
              thumbColor={notifications.reminders ? "#white" : "#f4f3f4"}
            />
          </SettingItem>
          
          <SettingItem
            icon="star"
            title="Achievement Alerts"
            subtitle="Get notified of achievements"
            showArrow={false}
          >
            <Switch
              value={notifications.achievements}
              onValueChange={() => toggleNotification('achievements')}
              trackColor={{ false: "#ccc", true: "#4CAF50" }}
              thumbColor={notifications.achievements ? "#white" : "#f4f3f4"}
            />
          </SettingItem>
        </View>

        {/* App Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          
          <SettingItem
            icon="dark-mode"
            title="Dark Mode"
            subtitle="Use dark theme"
            showArrow={false}
          >
            <Switch
              value={preferences.darkMode}
              onValueChange={() => togglePreference('darkMode')}
              trackColor={{ false: "#ccc", true: "#4CAF50" }}
              thumbColor={preferences.darkMode ? "#white" : "#f4f3f4"}
            />
          </SettingItem>
          
          <SettingItem
            icon="backup"
            title="Auto Backup"
            subtitle="Automatically backup your data"
            showArrow={false}
          >
            <Switch
              value={preferences.autoBackup}
              onValueChange={() => togglePreference('autoBackup')}
              trackColor={{ false: "#ccc", true: "#4CAF50" }}
              thumbColor={preferences.autoBackup ? "#white" : "#f4f3f4"}
            />
          </SettingItem>
          
          <SettingItem
            icon="analytics"
            title="Usage Analytics"
            subtitle="Help improve the app"
            showArrow={false}
          >
            <Switch
              value={preferences.analytics}
              onValueChange={() => togglePreference('analytics')}
              trackColor={{ false: "#ccc", true: "#4CAF50" }}
              thumbColor={preferences.analytics ? "#white" : "#f4f3f4"}
            />
          </SettingItem>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          
          <SettingItem
            icon="file-download"
            title="Export Data"
            subtitle="Download your waste logs and progress"
            onPress={handleExportData}
          />
          
          <SettingItem
            icon="cleaning-services"
            title="Clear Cache"
            subtitle="Free up storage space"
            onPress={handleClearCache}
          />
          
          <SettingItem
            icon="sync"
            title="Sync Data"
            subtitle="Manually sync with cloud"
            onPress={() => console.log('Syncing data...')}
          />
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Feedback</Text>
          
          <SettingItem
            icon="help"
            title="Help Center"
            subtitle="FAQs and user guides"
            onPress={() => console.log('Opening help center')}
          />
          
          <SettingItem
            icon="feedback"
            title="Send Feedback"
            subtitle="Help us improve WasteLogger"
            onPress={() => console.log('Opening feedback')}
          />
          
          <SettingItem
            icon="bug-report"
            title="Report a Bug"
            subtitle="Report issues or problems"
            onPress={() => console.log('Report bug')}
          />
          
          <SettingItem
            icon="star-rate"
            title="Rate the App"
            subtitle="Leave a review in the app store"
            onPress={() => console.log('Rate app')}
          />
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <SettingItem
            icon="info"
            title="App Version"
            subtitle="Version 2.1.0 (Build 210)"
            showArrow={false}
          />
          
          <SettingItem
            icon="article"
            title="Terms of Service"
            subtitle="Read our terms and conditions"
            onPress={() => console.log('Terms of service')}
          />
          
          <SettingItem
            icon="privacy-tip"
            title="Privacy Policy"
            subtitle="How we handle your data"
            onPress={() => console.log('Privacy policy')}
          />
          
          <SettingItem
            icon="copyright"
            title="Licenses"
            subtitle="Open source licenses"
            onPress={() => console.log('Licenses')}
          />
        </View>

        {/* Danger Zone */}
        <View style={[styles.section, styles.dangerSection]}>
          <Text style={[styles.sectionTitle, styles.dangerTitle]}>Danger Zone</Text>
          
          <TouchableOpacity style={styles.dangerButton} onPress={handleDeleteAccount}>
            <MaterialIcons name="delete-forever" size={24} color="#F44336" />
            <View style={styles.dangerButtonContent}>
              <Text style={styles.dangerButtonTitle}>Delete Account</Text>
              <Text style={styles.dangerButtonSubtitle}>Permanently delete your account and all data</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={16} color="#F44336" />
          </TouchableOpacity>
        </View>

      </ScrollView>

      <LanguageModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  // Section Styles
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginLeft: 20,
  },
  
  // Setting Item Styles
  settingItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIcon: {
    width: 40,
    alignItems: 'center',
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '85%',
    maxHeight: '70%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalCloseButton: {
    padding: 4,
  },
  
  // Language Selection
  languageList: {
    maxHeight: 300,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  selectedLanguageItem: {
    backgroundColor: '#f0f8f0',
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
  selectedLanguageText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  
  // Danger Zone Styles
  dangerSection: {
    marginTop: 20,
    marginBottom: 40,
  },
  dangerTitle: {
    color: '#F44336',
  },
  dangerButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#F44336',
    borderRadius: 12,
    marginHorizontal: 20,
  },
  dangerButtonContent: {
    flex: 1,
    marginLeft: 15,
  },
  dangerButtonTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F44336',
    marginBottom: 2,
  },
  dangerButtonSubtitle: {
    fontSize: 14,
    color: '#F44336',
    opacity: 0.7,
  },
});