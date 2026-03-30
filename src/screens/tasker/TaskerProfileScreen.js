// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/tasker/TaskerProfileScreen.js  –  Tasker Tab 4
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TASKER_PROFILE } from '../../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { useAppMode } from '../../context/AppModeContext';

// ── Menu row ──────────────────────────────────────────────────────────────────
function MenuRow({ icon, iconBg, label, subtitle, onPress, isLast, danger }) {
  return (
    <TouchableOpacity
      style={[styles.menuRow, isLast && styles.menuRowLast]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.menuIconWrap, { backgroundColor: iconBg ?? COLORS.surface }]}>
        <Ionicons name={icon} size={19} color={danger ? COLORS.error : COLORS.primary} />
      </View>
      <View style={styles.menuText}>
        <Text style={[styles.menuLabel, danger && { color: COLORS.error }]}>{label}</Text>
        {subtitle ? (
          <Text style={styles.menuSubtitle} numberOfLines={1}>{subtitle}</Text>
        ) : null}
      </View>
      <Ionicons name="chevron-forward" size={16} color={COLORS.inactive} />
    </TouchableOpacity>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function TaskerProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { setIsTaskerMode } = useAppMode();

  const handleSwitchToClient = () => {
    Alert.alert(
      'Switch to Client Mode',
      'You will be switched to the client view.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Switch', onPress: () => setIsTaskerMode(false) },
      ]
    );
  };

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 32) }}
      >
        {/* ── Navy top section ── */}
        <View style={[styles.heroSection, { paddingTop: insets.top + 24 }]}>
          {/* Avatar */}
          <View style={styles.avatarRing}>
            <Image source={{ uri: TASKER_PROFILE.avatar }} style={styles.avatar} />
          </View>

          {/* Name */}
          <Text style={styles.name}>{TASKER_PROFILE.name}</Text>

          {/* Stars + rating */}
          <View style={styles.ratingRow}>
            {[1,2,3,4,5].map((s) => (
              <Ionicons key={s} name="star" size={16} color={COLORS.accent} />
            ))}
            <Text style={styles.ratingNum}> {TASKER_PROFILE.rating}</Text>
            <Text style={styles.ratingCount}> · {TASKER_PROFILE.reviewCount} reviews</Text>
          </View>

          {/* Stats pill */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{TASKER_PROFILE.totalTasks}</Text>
              <Text style={styles.statLabel}>Tasks</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>${TASKER_PROFILE.hourlyRate}/hr</Text>
              <Text style={styles.statLabel}>Rate</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{TASKER_PROFILE.skills.length}</Text>
              <Text style={styles.statLabel}>Skills</Text>
            </View>
          </View>

          {/* Edit Profile button */}
          <TouchableOpacity
            style={styles.editProfileBtn}
            onPress={() => navigation.navigate('TaskerEditBio')}
            activeOpacity={0.85}
          >
            <Ionicons name="create-outline" size={16} color={COLORS.white} />
            <Text style={styles.editProfileBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* ── Light grey bottom section ── */}
        <View style={styles.menuSection}>

          {/* Profile group */}
          <View style={styles.menuCard}>
            <MenuRow
              icon="person-outline"
              iconBg={COLORS.primaryLight}
              label="Edit Bio"
              subtitle={TASKER_PROFILE.bio}
              onPress={() => navigation.navigate('TaskerEditBio')}
            />
            <MenuRow
              icon="construct-outline"
              iconBg={COLORS.primaryLight}
              label="Skills & Rates"
              subtitle={TASKER_PROFILE.skills.join(' · ')}
              onPress={() => navigation.navigate('TaskerSkillsRates')}
            />
            <MenuRow
              icon="images-outline"
              iconBg={COLORS.primaryLight}
              label="Portfolio Photos"
              subtitle={`${TASKER_PROFILE.workPhotoCount ?? 8} photos uploaded`}
              onPress={() => navigation.navigate('TaskerPortfolio')}
              isLast
            />
          </View>

          {/* Finance group */}
          <View style={styles.menuCard}>
            <MenuRow
              icon="card-outline"
              iconBg={COLORS.accentLight}
              label="Bank / Withdrawal Details"
              subtitle="Banco de Venezuela · ****4821"
              onPress={() => navigation.navigate('TaskerBankDetails')}
            />
            <MenuRow
              icon="receipt-outline"
              iconBg={COLORS.accentLight}
              label="Earnings History"
              subtitle="View all past payouts"
              onPress={() => navigation.navigate('TaskerEarnings')}
              isLast
            />
          </View>

          {/* Support group */}
          <View style={styles.menuCard}>
            <MenuRow
              icon="help-circle-outline"
              iconBg={COLORS.surface}
              label="Help Center"
              subtitle="FAQs, contact support"
              onPress={() => {}}
            />
            <MenuRow
              icon="shield-checkmark-outline"
              iconBg={COLORS.surface}
              label="Trust & Safety"
              subtitle="Policies and guidelines"
              onPress={() => {}}
              isLast
            />
          </View>

          {/* Switch + Logout */}
          <TouchableOpacity style={styles.switchBtn} onPress={handleSwitchToClient} activeOpacity={0.85}>
            <Ionicons name="swap-horizontal-outline" size={18} color={COLORS.primary} />
            <Text style={styles.switchBtnText}>Switch to Client Mode</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => Alert.alert('Log Out', 'Log out of Handyman?')}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <Text style={styles.version}>Handyman Tasker · v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F9FA' },

  // ── Hero (navy) ──────────────────────────────────────────────────────────────
  heroSection: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 36,
    gap: 8,
  },
  avatarRing: {
    padding: 3,
    borderRadius: 56,
    borderWidth: 2.5,
    borderColor: COLORS.accent,
    marginBottom: 4,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.border,
  },
  name: {
    fontFamily: FONTS.familyBold,
    fontSize: 24,
    color: COLORS.white,
    letterSpacing: 0.3,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingNum: {
    fontFamily: FONTS.familyBold,
    fontSize: 14,
    color: COLORS.white,
  },
  ratingCount: {
    fontFamily: FONTS.family,
    fontSize: 13,
    color: 'rgba(255,255,255,0.60)',
  },

  // Stats row inside navy hero
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: RADIUS.xl,
    paddingVertical: 14,
    paddingHorizontal: 12,
    width: '100%',
    marginTop: 4,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: {
    fontFamily: FONTS.familyBold,
    fontSize: 17,
    color: COLORS.white,
  },
  statLabel: {
    fontFamily: FONTS.family,
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    marginTop: 3,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },

  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 28,
    paddingVertical: 12,
    marginTop: 6,
  },
  editProfileBtnText: {
    fontFamily: FONTS.familyBold,
    fontSize: 14,
    color: COLORS.white,
    letterSpacing: 0.3,
  },

  // ── Menu section (light grey) ─────────────────────────────────────────────
  menuSection: {
    padding: 16,
    gap: 12,
  },
  menuCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOW.card,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
    gap: 14,
  },
  menuRowLast: { borderBottomWidth: 0 },
  menuIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: { flex: 1 },
  menuLabel: {
    fontFamily: FONTS.familySemibold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  menuSubtitle: {
    fontFamily: FONTS.family,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  switchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    height: 52,
    borderWidth: 2,
    borderColor: COLORS.primary,
    ...SHADOW.card,
  },
  switchBtnText: {
    fontFamily: FONTS.familyBold,
    fontSize: 15,
    color: COLORS.primary,
  },
  logoutBtn: { alignItems: 'center', paddingVertical: 12 },
  logoutText: {
    fontFamily: FONTS.familySemibold,
    fontSize: 14,
    color: COLORS.error,
  },
  version: {
    textAlign: 'center',
    fontFamily: FONTS.family,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});
