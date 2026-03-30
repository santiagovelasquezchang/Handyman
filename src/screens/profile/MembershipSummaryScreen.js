// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/profile/MembershipSummaryScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

export default function MembershipSummaryScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const hasPlan = false; // placeholder — in real app, read from user state

  if (!hasPlan) {
    return (
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 32 }}
        >
          <View style={styles.noPlanCard}>
            <Ionicons name="shield-outline" size={40} color={COLORS.border} />
            <Text style={styles.noPlanTitle}>No Active Plan</Text>
            <Text style={styles.noPlanSub}>
              Protect your home with a maintenance plan. Save money and never miss a service.
            </Text>
            <TouchableOpacity
              style={styles.explorePlansBtn}
              onPress={() => navigation.navigate('Plans')}
              activeOpacity={0.85}
            >
              <Text style={styles.explorePlansBtnText}>Explore Plans</Text>
            </TouchableOpacity>
          </View>

          {/* Benefits preview */}
          <Text style={styles.sectionLabel}>Why Get a Plan?</Text>
          {[
            { icon: 'repeat-outline',      title: 'Recurring Services',     sub: 'Automatic scheduling — no reminders needed' },
            { icon: 'trending-down-outline',title: 'Save up to 20%',        sub: 'Members pay less on every booking' },
            { icon: 'person-outline',      title: 'Preferred Provider',     sub: 'Same trusted provider every time' },
            { icon: 'flash-outline',       title: 'Priority Dispatch',      sub: 'Move to the top of the queue' },
          ].map((b) => (
            <View key={b.title} style={styles.benefitRow}>
              <View style={styles.benefitIcon}>
                <Ionicons name={b.icon} size={18} color={COLORS.accent} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.benefitTitle}>{b.title}</Text>
                <Text style={styles.benefitSub}>{b.sub}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  // Active plan view (reached when hasPlan = true)
  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 32 }}
      >
        <View style={[styles.activePlanCard, { backgroundColor: COLORS.primary }]}>
          <View style={styles.activePlanBadge}>
            <Ionicons name="checkmark-circle" size={13} color={COLORS.primary} />
            <Text style={[styles.activePlanBadgeText, { color: COLORS.primary }]}>Active</Text>
          </View>
          <Text style={styles.activePlanName}>Home Plan</Text>
          <Text style={styles.activePlanPrice}>$29<Text style={styles.activePlanPeriod}>/mo</Text></Text>
        </View>

        <TouchableOpacity
          style={styles.manageBtn}
          onPress={() => navigation.navigate('ActiveSubscription', { plan: { name: 'Home Plan', price: '$29', period: '/mo', color: COLORS.primary } })}
          activeOpacity={0.85}
        >
          <Text style={styles.manageBtnText}>Manage Subscription</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  noPlanCard: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 24,
    alignItems: 'center', gap: 10, marginBottom: 24, ...SHADOW.card,
  },
  noPlanTitle: { fontFamily: FONTS.familyBold, fontSize: 18, color: COLORS.textPrimary },
  noPlanSub:   { fontFamily: FONTS.family, fontSize: 13, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 19 },
  explorePlansBtn: { marginTop: 6, backgroundColor: COLORS.accent, borderRadius: RADIUS.pill, paddingVertical: 12, paddingHorizontal: 28 },
  explorePlansBtnText: { fontFamily: FONTS.familyBold, fontSize: 14, color: COLORS.white },

  sectionLabel: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary, marginBottom: 12 },
  benefitRow:   { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 14 },
  benefitIcon:  { width: 38, height: 38, borderRadius: 10, backgroundColor: COLORS.accentLight, alignItems: 'center', justifyContent: 'center' },
  benefitTitle: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textPrimary },
  benefitSub:   { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },

  activePlanCard: { borderRadius: RADIUS.lg, padding: 24, alignItems: 'center', gap: 8, marginBottom: 14 },
  activePlanBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: COLORS.white, borderRadius: RADIUS.pill, paddingHorizontal: 12, paddingVertical: 4 },
  activePlanBadgeText: { fontFamily: FONTS.familySemibold, fontSize: 12 },
  activePlanName:  { fontFamily: FONTS.familyBold, fontSize: 20, color: COLORS.white },
  activePlanPrice: { fontFamily: FONTS.familyBold, fontSize: 32, color: COLORS.white },
  activePlanPeriod:{ fontFamily: FONTS.family, fontSize: 14, color: 'rgba(255,255,255,0.75)' },

  manageBtn:     { backgroundColor: COLORS.primary, borderRadius: RADIUS.pill, height: 52, alignItems: 'center', justifyContent: 'center' },
  manageBtnText: { fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.white },
});
