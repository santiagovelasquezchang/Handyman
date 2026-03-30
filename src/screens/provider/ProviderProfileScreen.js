// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/provider/ProviderProfileScreen.js
//  Professional identity + config hub (new architecture version).
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { useAppMode } from '../../context/AppModeContext';
import { TASKER_PROFILE } from '../../../mockData';

const MENU_GROUPS = [
  {
    title: 'Profile',
    items: [
      { id: 'TaskerEditBio',     icon: 'create-outline',        bg: COLORS.primaryLight, ic: COLORS.primary,  label: 'Edit Bio',         sub: 'Update your description' },
      { id: 'SkillsAndServices', icon: 'construct-outline',     bg: '#E8F0FE',           ic: '#4A6CF7',       label: 'Skills & Services', sub: 'Manage what you offer' },
      { id: 'Portfolio',         icon: 'images-outline',        bg: COLORS.accentLight,  ic: COLORS.accent,   label: 'Portfolio',        sub: `${8} photos` },
      { id: 'Verification',      icon: 'shield-checkmark-outline', bg: '#E8F5E9',        ic: COLORS.success,  label: 'Verification',     sub: 'ID & background check' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { id: 'OperatingAreas',    icon: 'map-outline',           bg: '#FFF0E8',           ic: COLORS.accent,   label: 'Service Area',     sub: 'Where you work' },
      { id: 'AvailabilitySettings', icon: 'calendar-outline',  bg: COLORS.primaryLight, ic: COLORS.primary,  label: 'Availability',     sub: 'Your working hours' },
      { id: 'TaskerBankDetails', icon: 'card-outline',          bg: '#E8F5E9',           ic: COLORS.success,  label: 'Bank Details',     sub: 'Payout account' },
      { id: 'TaskerEarnings',    icon: 'cash-outline',          bg: '#FFF0E8',           ic: COLORS.accent,   label: 'Earnings History', sub: 'Payouts & statements' },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: 'HelpCenter',        icon: 'help-circle-outline',   bg: COLORS.primaryLight, ic: COLORS.primary,  label: 'Help Center',      sub: '' },
      { id: 'ProviderSettings',  icon: 'settings-outline',      bg: COLORS.background,   ic: COLORS.textSecondary, label: 'Settings', sub: '' },
    ],
  },
];

function MenuRow({ item, onPress, isLast }) {
  return (
    <TouchableOpacity
      style={[styles.menuRow, isLast && { borderBottomWidth: 0 }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={[styles.menuIconWrap, { backgroundColor: item.bg }]}>
        <Ionicons name={item.icon} size={17} color={item.ic} />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuLabel}>{item.label}</Text>
        {item.sub ? <Text style={styles.menuSub}>{item.sub}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={15} color={COLORS.inactive} />
    </TouchableOpacity>
  );
}

export default function ProviderProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { setIsTaskerMode } = useAppMode();

  const handlePress = (id) => {
    if (id === 'switchToClient') { setIsTaskerMode(false); return; }
    if (id === 'logout') {
      Alert.alert('Log Out', 'Log out of provider mode?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => setIsTaskerMode(false) },
      ]);
      return;
    }
    navigation.navigate(id);
  };

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 24) }}
      showsVerticalScrollIndicator={false}
    >
      {/* Navy hero */}
      <View style={styles.hero}>
        <View style={styles.avatarWrap}>
          <Image source={{ uri: TASKER_PROFILE.avatar }} style={styles.avatar} />
          <View style={styles.verifiedDot}>
            <Ionicons name="checkmark" size={10} color={COLORS.white} />
          </View>
        </View>
        <Text style={styles.heroName}>{TASKER_PROFILE.name}</Text>
        <View style={styles.starsRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons key={i} name="star" size={14} color={COLORS.accent} />
          ))}
          <Text style={styles.heroRating}> {TASKER_PROFILE.rating} ({TASKER_PROFILE.reviewCount} reviews)</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsBar}>
          {[
            { value: TASKER_PROFILE.totalTasks, label: 'Jobs' },
            { value: `$${TASKER_PROFILE.hourlyRate}/hr`, label: 'Rate' },
            { value: TASKER_PROFILE.skills.length, label: 'Skills' },
          ].map((s, i) => (
            <React.Fragment key={i}>
              {i > 0 && <View style={styles.statDiv} />}
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('TaskerEditBio')}>
          <Ionicons name="create-outline" size={15} color={COLORS.primary} style={{ marginRight: 5 }} />
          <Text style={styles.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Light section */}
      <View style={styles.body}>
        {MENU_GROUPS.map((group) => (
          <View key={group.title} style={styles.groupSection}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.menuCard}>
              {group.items.map((item, i) => (
                <MenuRow
                  key={item.id}
                  item={item}
                  onPress={() => handlePress(item.id)}
                  isLast={i === group.items.length - 1}
                />
              ))}
            </View>
          </View>
        ))}

        {/* Mode switch */}
        <TouchableOpacity
          style={styles.switchBtn}
          onPress={() => handlePress('switchToClient')}
          activeOpacity={0.82}
        >
          <Ionicons name="swap-horizontal-outline" size={17} color={COLORS.primary} style={{ marginRight: 8 }} />
          <Text style={styles.switchBtnText}>Switch to Client Mode</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => handlePress('logout')}
          activeOpacity={0.82}
        >
          <Text style={styles.logoutBtnText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Handyman · Provider · v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F9FA' },

  hero: {
    backgroundColor: COLORS.primary,
    paddingTop: 28, paddingBottom: 28, paddingHorizontal: 20,
    alignItems: 'center', gap: 6,
  },
  avatarWrap: { position: 'relative', marginBottom: 6 },
  avatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 2.5, borderColor: COLORS.accent },
  verifiedDot: { position: 'absolute', bottom: 0, right: 0, width: 22, height: 22, borderRadius: 11, backgroundColor: COLORS.success, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: COLORS.primary },
  heroName:  { fontFamily: FONTS.familyBold, fontSize: 22, color: COLORS.white },
  starsRow:  { flexDirection: 'row', alignItems: 'center' },
  heroRating:{ fontFamily: FONTS.family, fontSize: 12, color: 'rgba(255,255,255,0.75)' },

  statsBar:  { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.22)', borderRadius: RADIUS.md, marginTop: 12, paddingVertical: 12, paddingHorizontal: 16 },
  statItem:  { flex: 1, alignItems: 'center' },
  statDiv:   { width: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: 4 },
  statValue: { fontFamily: FONTS.familyBold, fontSize: 16, color: COLORS.white },
  statLabel: { fontFamily: FONTS.family, fontSize: 10, color: 'rgba(255,255,255,0.65)', marginTop: 2 },

  editBtn: { marginTop: 8, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22, paddingVertical: 9, backgroundColor: COLORS.white, borderRadius: RADIUS.pill },
  editBtnText: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.primary },

  body: { padding: 16, gap: 0 },

  groupSection: { marginBottom: 20 },
  groupTitle:   { fontFamily: FONTS.familySemibold, fontSize: 12, color: COLORS.textSecondary, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 8, marginLeft: 4 },
  menuCard:     { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, overflow: 'hidden', ...SHADOW.card },

  menuRow:      { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border, gap: 12 },
  menuIconWrap: { width: 36, height: 36, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  menuContent:  { flex: 1 },
  menuLabel:    { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  menuSub:      { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 1 },

  switchBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: RADIUS.pill,
    height: 50, marginBottom: 12,
  },
  switchBtnText: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.primary },

  logoutBtn:    { alignItems: 'center', paddingVertical: 12, marginBottom: 8 },
  logoutBtnText:{ fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.error },

  version: { textAlign: 'center', fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary },
});
