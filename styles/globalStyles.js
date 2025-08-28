// styles/globalStyles.js - Global Style System
import { StyleSheet, Dimensions } from 'react-native';

// Screen dimensions
const { width, height } = Dimensions.get('window');

// Color palette
export const colors = {
  // Primary colors
  primary: '#4CAF50',      // Green
  primaryLight: '#81C784',
  primaryDark: '#388E3C',
  
  // Secondary colors  
  secondary: '#2196F3',    // Blue
  secondaryLight: '#64B5F6',
  secondaryDark: '#1976D2',
  
  // Accent colors
  accent: '#FF9800',       // Orange
  accentLight: '#FFB74D',
  accentDark: '#F57C00',
  
  // Status colors
  success: '#4CAF50',
  warning: '#FF9800', 
  error: '#F44336',
  info: '#2196F3',
  
  // Neutral colors
  white: '#FFFFFF',
  light: '#F5F5F5',
  lightGray: '#E0E0E0',
  gray: '#666666',
  darkGray: '#424242',
  dark: '#333333',
  black: '#000000',
  
  // Background colors
  background: '#F5F5F5',
  surface: '#FFFFFF',
  
  // Text colors
  textPrimary: '#333333',
  textSecondary: '#666666',
  textDisabled: '#BDBDBD',
  textOnPrimary: '#FFFFFF',
  textOnSecondary: '#FFFFFF',
  
  // Transparent variations
  primaryOpacity: 'rgba(76, 175, 80, 0.1)',
  secondaryOpacity: 'rgba(33, 150, 243, 0.1)',
  accentOpacity: 'rgba(255, 152, 0, 0.1)',
  successOpacity: 'rgba(76, 175, 80, 0.1)',
  warningOpacity: 'rgba(255, 152, 0, 0.1)',
  errorOpacity: 'rgba(244, 67, 54, 0.1)',
  
  // Bin type colors
  binColors: {
    'Recycling Bin': '#4CAF50',
    'General Waste': '#757575',
    'Glass Recycling': '#2196F3',
    'Organic Waste': '#8BC34A',
    'Hazardous Waste': '#F44336',
    'Special Collection': '#FF9800',
  }
};

// Typography scale
export const typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    display: 32,
  },
  
  // Font weights
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  }
};

// Spacing system (based on 8px grid)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Border radius values
export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 50,
  circle: 9999,
};

// Shadow/elevation styles
export const shadows = {
  none: {
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  
  sm: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  
  md: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  
  lg: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  
  xl: {
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
};

// Global styles
export const globalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  
  // Cards
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  
  cardContent: {
    flex: 1,
  },
  
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  
  // Buttons
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
  
  buttonAccent: {
    backgroundColor: colors.accent,
  },
  
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  
  buttonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textOnPrimary,
  },
  
  buttonTextOutline: {
    color: colors.primary,
  },
  
  buttonIcon: {
    marginRight: spacing.xs,
  },
  
  // Text styles
  textDisplay: {
    fontSize: typography.fontSize.display,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    lineHeight: typography.fontSize.display * typography.lineHeight.tight,
  },
  
  textTitle: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    lineHeight: typography.fontSize.xxxl * typography.lineHeight.tight,
  },
  
  textHeading: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    lineHeight: typography.fontSize.xxl * typography.lineHeight.normal,
  },
  
  textSubheading: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    lineHeight: typography.fontSize.xl * typography.lineHeight.normal,
  },
  
  textBody: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    color: colors.textPrimary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  
  textBodySecondary: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  
  textCaption: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  
  textSmall: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
  },
  
  // Input styles
  inputContainer: {
    marginBottom: spacing.md,
  },
  
  inputLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: borderRadius.base,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.base,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
  },
  
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  
  inputError: {
    borderColor: colors.error,
  },
  
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  
  inputWithIcon: {
    paddingLeft: spacing.xl + spacing.md,
  },
  
  inputIcon: {
    position: 'absolute',
    left: spacing.md,
    top: spacing.sm + 2,
    zIndex: 1,
  },
  
  // List styles
  listContainer: {
    paddingHorizontal: spacing.md,
  },
  
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.base,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  
  listItemContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  
  listItemTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  
  listItemSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  
  listItemIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.circle,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryOpacity,
  },
  
  listItemChevron: {
    marginLeft: spacing.sm,
  },
  
  // Section styles
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  
  sectionAction: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
  
  // Badge/chip styles
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    alignSelf: 'flex-start',
  },
  
  badgePrimary: {
    backgroundColor: colors.primary,
  },
  
  badgeSecondary: {
    backgroundColor: colors.secondary,
  },
  
  badgeSuccess: {
    backgroundColor: colors.success,
  },
  
  badgeWarning: {
    backgroundColor: colors.warning,
  },
  
  badgeError: {
    backgroundColor: colors.error,
  },
  
  badgeLight: {
    backgroundColor: colors.primaryOpacity,
  },
  
  badgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textOnPrimary,
  },
  
  badgeTextLight: {
    color: colors.primary,
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 400,
    maxHeight: '90%',
  },
  
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  
  modalTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  
  modalCloseButton: {
    padding: spacing.xs,
    borderRadius: borderRadius.circle,
  },
  
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  
  // Stats card styles
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.base,
    alignItems: 'center',
    ...shadows.sm,
  },
  
  statNumber: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  
  // Progress bar styles
  progressContainer: {
    marginVertical: spacing.sm,
  },
  
  progressBar: {
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
  },
  
  progressLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  
  loadingText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  
  // Empty state styles
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  
  emptyStateTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  
  emptyStateSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  
  // Filter chip styles
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    backgroundColor: colors.lightGray,
    marginRight: spacing.sm,
  },
  
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  
  filterChipText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
  },
  
  filterChipTextActive: {
    color: colors.textOnPrimary,
  },
  
  // FAB (Floating Action Button) styles
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.md,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  
  fabExtended: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    width: 'auto',
    minWidth: 56,
  },
  
  fabText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textOnPrimary,
    marginLeft: spacing.xs,
  },
  
  // Utility classes
  flex1: { flex: 1 },
  flexRow: { flexDirection: 'row' },
  flexColumn: { flexDirection: 'column' },
  alignCenter: { alignItems: 'center' },
  justifyCenter: { justifyContent: 'center' },
  alignStart: { alignItems: 'flex-start' },
  alignEnd: { alignItems: 'flex-end' },
  justifyBetween: { justifyContent: 'space-between' },
  justifyAround: { justifyContent: 'space-around' },
  
  // Margin utilities
  m0: { margin: 0 },
  mXS: { margin: spacing.xs },
  mSM: { margin: spacing.sm },
  mMD: { margin: spacing.md },
  mLG: { margin: spacing.lg },
  mXL: { margin: spacing.xl },
  
  mtXS: { marginTop: spacing.xs },
  mtSM: { marginTop: spacing.sm },
  mtMD: { marginTop: spacing.md },
  mtLG: { marginTop: spacing.lg },
  mtXL: { marginTop: spacing.xl },
  
  mbXS: { marginBottom: spacing.xs },
  mbSM: { marginBottom: spacing.sm },
  mbMD: { marginBottom: spacing.md },
  mbLG: { marginBottom: spacing.lg },
  mbXL: { marginBottom: spacing.xl },
  
  // Padding utilities
  p0: { padding: 0 },
  pXS: { padding: spacing.xs },
  pSM: { padding: spacing.sm },
  pMD: { padding: spacing.md },
  pLG: { padding: spacing.lg },
  pXL: { padding: spacing.xl },
  
  phXS: { paddingHorizontal: spacing.xs },
  phSM: { paddingHorizontal: spacing.sm },
  phMD: { paddingHorizontal: spacing.md },
  phLG: { paddingHorizontal: spacing.lg },
  phXL: { paddingHorizontal: spacing.xl },
  
  pvXS: { paddingVertical: spacing.xs },
  pvSM: { paddingVertical: spacing.sm },
  pvMD: { paddingVertical: spacing.md },
  pvLG: { paddingVertical: spacing.lg },
  pvXL: { paddingVertical: spacing.xl },
});

// Helper functions for getting bin colors
export const getBinTypeColor = (binType) => {
  return colors.binColors[binType] || colors.gray;
};

// Helper function to get contrast text color
export const getContrastTextColor = (backgroundColor) => {
  // Simple luminance check - in a real app you might use a more sophisticated algorithm
  const darkColors = [colors.primary, colors.secondary, colors.dark, colors.error];
  return darkColors.includes(backgroundColor) ? colors.white : colors.dark;
};

// Responsive breakpoints (if needed for tablet support)
export const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

// Animation timings
export const animations = {
  fast: 150,
  normal: 300,
  slow: 500,
};

export default globalStyles;