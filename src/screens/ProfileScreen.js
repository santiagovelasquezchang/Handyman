// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/ProfileScreen.js  –  "Profile" bottom tab
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { useAppMode } from '../context/AppModeContext';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { USER_PROFILE, TASK_HISTORY } from '../../mockData';

const TOTAL_TASKS = Object.values(TASK_HISTORY).flat().length;
import { COLORS, FONTS, RADIUS, SHADOW } from '../theme';

// ── Settings data ─────────────────────────────────────────────────────────────
// `route` is the React Navigation screen name to push; omit for alert-only rows.
const SECTIONS = [
  [
    { id: 'AccountSettings',      icon: 'person-outline',             label: 'Account Settings',      value: USER_PROFILE.email },
    { id: 'SavedAddresses',       icon: 'location-outline',           label: 'Saved Addresses' },
    { id: 'PaymentMethods',       icon: 'card-outline',               label: 'Payment Methods' },
    { id: 'NotificationSettings', icon: 'notifications-outline',      label: 'Notification Settings' },
  ],
  [
    { id: 'InviteFriends',        icon: 'gift-outline',               label: 'Invite Friends' },
    { id: 'HelpCenter',           icon: 'help-circle-outline',        label: 'Help Center' },
  ],
  [
    { id: 'become',               icon: 'swap-horizontal-outline',    label: 'Switch to Tasker Mode', accent: true },
    { id: 'logout',               icon: 'log-out-outline',            label: 'Log Out',          danger: true },
  ],
];

// ── Avatar with initials ──────────────────────────────────────────────────────
function InitialsAvatar({ name, size = 72 }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View
      style={[
        styles.avatarCircle,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={[styles.initials, { fontSize: size * 0.34 }]}>{initials}</Text>
    </View>
  );
}

// ── Profile header ────────────────────────────────────────────────────────────
function ProfileHeader() {
  return (
    <View style={styles.header}>
      <InitialsAvatar name={USER_PROFILE.name} size={80} />
      <Text style={styles.userName}>{USER_PROFILE.name}</Text>
      <Text style={styles.userPhone}>{USER_PROFILE.memberSince ? `Member since ${USER_PROFILE.memberSince}` : USER_PROFILE.phone}</Text>
      <TouchableOpacity style={styles.editBtn} activeOpacity={0.75}>
        <Ionicons name="create-outline" size={14} color={COLORS.primary} />
        <Text style={styles.editBtnText}>Edit profile</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Settings row ──────────────────────────────────────────────────────────────
function SettingsRow({ item, onPress, isLast }) {
  const iconBg = item.danger
    ? '#FFF0F0'
    : item.accent
    ? COLORS.accentLight
    : COLORS.surface;

  const iconColor = item.danger
    ? COLORS.error
    : item.accent
    ? COLORS.accent
    : COLORS.textSecondary;

  const labelColor = item.danger ? '#D93025' : COLORS.textPrimary;

  return (
    <TouchableOpacity
      style={[styles.row, isLast && styles.rowLast]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Icon */}
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
        <Ionicons name={item.icon} size={18} color={iconColor} />
      </View>

      {/* Text */}
      <View style={styles.rowText}>
        <Text style={[styles.rowLabel, { color: labelColor }]}>{item.label}</Text>
        {item.value ? (
          <Text style={styles.rowValue} numberOfLines={1}>{item.value}</Text>
        ) : null}
      </View>

      {/* Chevron */}
      {!item.danger && (
        <Ionicons name="chevron-forward" size={16} color={COLORS.inactive} />
      )}
    </TouchableOpacity>
  );
}

// ── Settings section card ─────────────────────────────────────────────────────
function SettingsSection({ items, onPress }) {
  return (
    <View style={styles.sectionCard}>
      {items.map((item, index) => (
        <SettingsRow
          key={item.id}
          item={item}
          onPress={() => onPress(item)}
          isLast={index === items.length - 1}
        />
      ))}
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { setIsTaskerMode } = useAppMode();

  const handleRowPress = (item) => {
    if (item.id === 'logout') {
      Alert.alert(
        'Log Out',
        'Are you sure you want to log out?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Log Out',
            style: 'destructive',
            onPress: () =>
              navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] }),
          },
        ]
      );
      return;
    }
    if (item.id === 'become') {
      setIsTaskerMode(true);
      return;
    }
    // All other rows use their id as the route name
    navigation.navigate(item.id);
  };

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.scroll,
        { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 24) },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header ── */}
      <ProfileHeader />

      {/* ── Stats bar ── */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{USER_PROFILE.pastTaskerIds.length}</Text>
          <Text style={styles.statLabel}>Taskers</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{TOTAL_TASKS}</Text>
          <Text style={styles.statLabel}>Tasks</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
      </View>

      {/* ── Settings sections ── */}
      <View style={styles.sections}>
        {SECTIONS.map((section, i) => (
          <SettingsSection key={i} items={section} onPress={handleRowPress} />
        ))}
      </View>

      {/* ── App version ── */}
      <Text style={styles.version}>Handyman · v1.0.0</Text>
    </ScrollView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flexGrow: 1,
  },

  // Header
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingTop: 28,
    paddingBottom: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
    gap: 6,
  },
  avatarCircle: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  initials: {
    fontWeight: FONTS.bold,
    color: COLORS.white,
  },
  userName: {
    fontSize: 20,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  userPhone: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: RADIUS.pill,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  editBtnText: {
    fontSize: 13,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
  },

  // Stats bar
  statsBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },

  // Sections
  sections: {
    paddingHorizontal: 16,
    gap: 14,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOW.card,
  },

  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: FONTS.medium,
  },
  rowValue: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // Footer
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 24,
  },
});
