// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/plans/PlansHomeScreen.js
//  Engine B hub — recurrence / membership / maintenance protection.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const PLANS = [
  {
    id: 'home',
    name: 'Home Plan',
    tagline: 'Essential maintenance for your home',
    price: '$29',
    period: '/mo',
    icon: 'home-outline',
    color: COLORS.primary,
    popular: false,
    perks: [
      '2 included services / month',
      'Priority scheduling',
      '10% off all bookings',
      'Dedicated support line',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Home Plan',
    tagline: 'For serious homeowners',
    price: '$59',
    period: '/mo',
    icon: 'star-outline',
    color: COLORS.accent,
    popular: true,
    perks: [
      '5 included services / month',
      'Same-day availability',
      '20% off all bookings',
      'Property health reports',
      'Preferred provider matching',
    ],
  },
  {
    id: 'business',
    name: 'Business Plan',
    tagline: 'Multi-location operations',
    price: '$149',
    period: '/mo',
    icon: 'business-outline',
    color: '#4A6CF7',
    popular: false,
    perks: [
      'Unlimited service calls',
      'Multi-location support',
      'Business billing & invoicing',
      'Dedicated account manager',
      'Priority SLA guarantees',
    ],
  },
];

function PlanCard({ plan, onPress }) {
  return (
    <TouchableOpacity style={styles.planCard} onPress={onPress} activeOpacity={0.85}>
      {plan.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Most Popular</Text>
        </View>
      )}
      <View style={styles.planHeader}>
        <View style={[styles.planIconWrap, { backgroundColor: plan.color + '18' }]}>
          <Ionicons name={plan.icon} size={22} color={plan.color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.planTagline}>{plan.tagline}</Text>
        </View>
        <View style={styles.priceBox}>
          <Text style={[styles.priceAmount, { color: plan.color }]}>{plan.price}</Text>
          <Text style={styles.pricePeriod}>{plan.period}</Text>
        </View>
      </View>

      <View style={styles.perkList}>
        {plan.perks.map((p, i) => (
          <View key={i} style={styles.perkRow}>
            <Ionicons name="checkmark-circle" size={15} color={plan.color} />
            <Text style={styles.perkText}>{p}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.selectBtn, { backgroundColor: plan.color }]}>
        <Text style={styles.selectBtnText}>Get Started</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function PlansHomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <Ionicons name="shield-checkmark" size={28} color={COLORS.white} style={{ marginBottom: 8 }} />
          <Text style={styles.heroTitle}>Maintenance Plans</Text>
          <Text style={styles.heroSub}>
            Stop reacting to problems. Start preventing them.
          </Text>
        </View>

        {/* Value props */}
        <View style={styles.valueRow}>
          {[
            { icon: 'calendar-outline', label: 'Recurring\nServices' },
            { icon: 'person-outline',   label: 'Trusted\nProvider' },
            { icon: 'trending-down-outline', label: 'Lower\nCost' },
          ].map((v) => (
            <View key={v.label} style={styles.valuePill}>
              <Ionicons name={v.icon} size={20} color={COLORS.primary} />
              <Text style={styles.valuePillLabel}>{v.label}</Text>
            </View>
          ))}
        </View>

        {/* Plans */}
        <Text style={styles.sectionLabel}>Choose Your Plan</Text>
        {PLANS.map((p) => (
          <PlanCard
            key={p.id}
            plan={p}
            onPress={() => navigation.navigate('PlanDetails', { plan: p })}
          />
        ))}

        {/* Compare link */}
        <TouchableOpacity
          style={styles.compareLink}
          onPress={() => navigation.navigate('SubscriptionBenefits')}
          activeOpacity={0.75}
        >
          <Text style={styles.compareLinkText}>Compare all plan benefits →</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  hero: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 28,
  },
  heroTitle: { fontFamily: FONTS.familyBold, fontSize: 24, color: COLORS.white },
  heroSub:   { fontFamily: FONTS.family, fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 6, lineHeight: 21 },

  valueRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 4,
    gap: 10,
  },
  valuePill: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 12,
    alignItems: 'center',
    gap: 6,
    ...SHADOW.card,
  },
  valuePillLabel: {
    fontFamily: FONTS.familySemibold,
    fontSize: 11,
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 15,
  },

  sectionLabel: {
    fontFamily: FONTS.familySemibold,
    fontSize: 16,
    color: COLORS.textPrimary,
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },

  planCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 14,
    overflow: 'hidden',
    ...SHADOW.card,
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderBottomLeftRadius: RADIUS.md,
  },
  popularText: { fontFamily: FONTS.familySemibold, fontSize: 11, color: COLORS.white },

  planHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  planIconWrap: {
    width: 44, height: 44, borderRadius: RADIUS.md,
    alignItems: 'center', justifyContent: 'center',
  },
  planName:    { fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.textPrimary },
  planTagline: { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  priceBox:    { alignItems: 'flex-end' },
  priceAmount: { fontFamily: FONTS.familyBold, fontSize: 22 },
  pricePeriod: { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },

  perkList: { gap: 7, marginBottom: 16 },
  perkRow:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
  perkText: { fontFamily: FONTS.family, fontSize: 13, color: COLORS.textSecondary, flex: 1 },

  selectBtn: {
    borderRadius: RADIUS.pill,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectBtnText: { fontFamily: FONTS.familyBold, fontSize: 14, color: COLORS.white },

  compareLink: { alignItems: 'center', marginTop: 8, paddingVertical: 8 },
  compareLinkText: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.accent },
});
