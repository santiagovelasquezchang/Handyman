// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/plans/ActiveSubscriptionScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

export default function ActiveSubscriptionScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const plan   = route?.params?.plan ?? { name: 'Home Plan', price: '$29', period: '/mo', color: COLORS.primary };

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      >
        {/* Active badge */}
        <View style={[styles.hero, { backgroundColor: plan.color ?? COLORS.primary }]}>
          <View style={styles.heroBadge}>
            <Ionicons name="checkmark-circle" size={14} color={plan.color ?? COLORS.primary} />
            <Text style={[styles.heroBadgeText, { color: plan.color ?? COLORS.primary }]}>Active</Text>
          </View>
          <Text style={styles.heroName}>{plan.name}</Text>
          <Text style={styles.heroPrice}>{plan.price}<Text style={styles.heroPeriod}>{plan.period}</Text></Text>
        </View>

        <View style={styles.body}>
          {/* Billing */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Billing</Text>
            {[
              { label: 'Next billing date', value: 'May 1, 2026' },
              { label: 'Payment method',    value: 'Visa •••• 4242' },
              { label: 'Member since',      value: 'Apr 1, 2026' },
            ].map(({ label, value }) => (
              <View key={label} style={styles.billingRow}>
                <Text style={styles.billingLabel}>{label}</Text>
                <Text style={styles.billingValue}>{value}</Text>
              </View>
            ))}
          </View>

          {/* Usage */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>This Month's Usage</Text>
            <View style={styles.usageRow}>
              <Text style={styles.usageLabel}>Services Used</Text>
              <Text style={styles.usageValue}>1 of 2 included</Text>
            </View>
            <View style={styles.usageBar}>
              <View style={[styles.usageFill, { width: '50%', backgroundColor: plan.color ?? COLORS.primary }]} />
            </View>
          </View>

          {/* Manage */}
          <View style={styles.card}>
            <TouchableOpacity style={styles.manageRow}
              onPress={() => navigation.navigate('UpgradePlan', { plan })}>
              <Ionicons name="arrow-up-circle-outline" size={17} color={COLORS.primary} />
              <Text style={styles.manageLabel}>Upgrade Plan</Text>
              <Ionicons name="chevron-forward" size={14} color={COLORS.inactive} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.manageRow, { borderBottomWidth: 0 }]}
              onPress={() => Alert.alert('Cancel', 'Cancel your subscription?', [
                { text: 'Keep Plan', style: 'cancel' },
                { text: 'Cancel Plan', style: 'destructive', onPress: () => navigation.goBack() },
              ])}>
              <Ionicons name="close-circle-outline" size={17} color={COLORS.error} />
              <Text style={[styles.manageLabel, { color: COLORS.error }]}>Cancel Plan</Text>
              <Ionicons name="chevron-forward" size={14} color={COLORS.inactive} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  hero: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 28, alignItems: 'center', gap: 10 },
  heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: COLORS.white, borderRadius: RADIUS.pill, paddingHorizontal: 12, paddingVertical: 4 },
  heroBadgeText: { fontFamily: FONTS.familySemibold, fontSize: 12 },
  heroName:  { fontFamily: FONTS.familyBold, fontSize: 22, color: COLORS.white },
  heroPrice: { fontFamily: FONTS.familyBold, fontSize: 32, color: COLORS.white },
  heroPeriod:{ fontFamily: FONTS.family, fontSize: 14, color: 'rgba(255,255,255,0.75)' },

  body:      { padding: 16, gap: 14 },
  card:      { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 16, ...SHADOW.card },
  cardTitle: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary, marginBottom: 12 },

  billingRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border },
  billingLabel:{ fontFamily: FONTS.family, fontSize: 13, color: COLORS.textSecondary },
  billingValue:{ fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textPrimary },

  usageRow:  { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  usageLabel:{ fontFamily: FONTS.family, fontSize: 13, color: COLORS.textSecondary },
  usageValue:{ fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textPrimary },
  usageBar:  { height: 6, backgroundColor: COLORS.border, borderRadius: 3, overflow: 'hidden' },
  usageFill: { height: '100%', borderRadius: 3 },

  manageRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border },
  manageLabel:{ flex: 1, fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
});
