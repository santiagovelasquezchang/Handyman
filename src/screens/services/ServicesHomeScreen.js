// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/services/ServicesHomeScreen.js
//  Engine A hub — structured service catalog with grouped categories.
//  Phase 2.5: AnimatedPressable cards, premium shadows, breathing layout.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { AnimatedPressable } from '../../components/ui';

const GROUPS = [
  {
    key: 'technical',
    title: 'Technical Services',
    icon: 'flash-outline',
    bg: '#E8F0FE',
    color: '#4A6CF7',
    services: ['Electrical', 'Plumbing', 'AC & HVAC', 'Smart Home'],
  },
  {
    key: 'cleaning',
    title: 'Cleaning & Maintenance',
    icon: 'sparkles-outline',
    bg: '#E8F5E9',
    color: '#2E8B57',
    services: ['Deep Cleaning', 'Regular Cleaning', 'Post-Construction'],
  },
  {
    key: 'repairs',
    title: 'Repairs & Finishes',
    icon: 'hammer-outline',
    bg: COLORS.primaryLight,
    color: COLORS.primary,
    services: ['Painting', 'Drywall', 'Tile & Flooring', 'Carpentry'],
  },
  {
    key: 'moving',
    title: 'Moving & Heavy Work',
    icon: 'cube-outline',
    bg: COLORS.accentLight,
    color: COLORS.accent,
    services: ['Furniture Assembly', 'Moving Help', 'TV Mounting'],
  },
  {
    key: 'outdoor',
    title: 'Outdoor & Exterior',
    icon: 'leaf-outline',
    bg: '#F0F9E8',
    color: '#5A8A3A',
    services: ['Landscaping', 'Pressure Washing', 'Deck & Patio'],
  },
  {
    key: 'urgent',
    title: 'Urgent Services',
    icon: 'timer-outline',
    bg: '#FFF0E8',
    color: COLORS.accent,
    services: ['Emergency Plumbing', 'Power Outage', 'Lock-out Help'],
  },
];

function GroupCard({ group, onPress }) {
  return (
    <AnimatedPressable
      onPress={onPress}
      haptic="light"
      scaleTo={0.97}
    >
      <View style={styles.groupCard}>
        <View style={[styles.groupIcon, { backgroundColor: group.bg }]}>
          <Ionicons name={group.icon} size={22} color={group.color} />
        </View>
        <View style={styles.groupContent}>
          <Text style={styles.groupTitle}>{group.title}</Text>
          <Text style={styles.groupSubs} numberOfLines={1}>
            {group.services.join(' · ')}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={COLORS.inactive} />
      </View>
    </AnimatedPressable>
  );
}

export default function ServicesHomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium gradient hero */}
        <LinearGradient
          colors={['#0F2233', COLORS.primary, '#1E4562']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Text style={styles.heroTitle}>Services</Text>
          <Text style={styles.heroSub}>Professional help for every need</Text>
        </LinearGradient>

        {/* Emergency banner — overlaps hero */}
        <AnimatedPressable
          onPress={() => navigation.navigate('EmergencyRequest')}
          haptic="medium"
          scaleTo={0.97}
          style={styles.urgentBannerWrap}
        >
          <View style={styles.urgentBanner}>
            <View style={styles.urgentLeft}>
              <View style={styles.urgentIconWrap}>
                <Ionicons name="flash" size={18} color={COLORS.accent} />
              </View>
              <View>
                <Text style={styles.urgentTitle}>Need Urgent Help?</Text>
                <Text style={styles.urgentSub}>Provider available in under 60 min</Text>
              </View>
            </View>
            <Ionicons name="arrow-forward-circle" size={24} color={COLORS.accent} />
          </View>
        </AnimatedPressable>

        {/* Category groups */}
        <View style={styles.list}>
          <Text style={styles.sectionLabel}>Browse by Category</Text>
          {GROUPS.map((g) => (
            <GroupCard
              key={g.key}
              group={g}
              onPress={() => navigation.navigate('ServiceCategory', { group: g })}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  hero: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  heroTitle: { fontFamily: FONTS.familyBold, fontSize: 28, color: COLORS.white, letterSpacing: -0.3 },
  heroSub:   { fontFamily: FONTS.family, fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 4 },

  urgentBannerWrap: {
    marginHorizontal: 16,
    marginTop: -20,
    marginBottom: 8,
  },
  urgentBanner: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SHADOW.card,
  },
  urgentLeft:    { flexDirection: 'row', alignItems: 'center', gap: 12 },
  urgentIconWrap:{
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: COLORS.accentLight,
    alignItems: 'center', justifyContent: 'center',
  },
  urgentTitle: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  urgentSub:   { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },

  list:         { padding: 16, paddingTop: 20, gap: 12 },
  sectionLabel: { fontFamily: FONTS.familyBold, fontSize: 18, color: COLORS.textPrimary, marginBottom: 4, letterSpacing: -0.2 },

  groupCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    ...SHADOW.card,
  },
  groupIcon:    { width: 46, height: 46, borderRadius: RADIUS.md, alignItems: 'center', justifyContent: 'center' },
  groupContent: { flex: 1 },
  groupTitle:   { fontFamily: FONTS.familySemibold, fontSize: 15, color: COLORS.textPrimary },
  groupSubs:    { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 3 },
});
