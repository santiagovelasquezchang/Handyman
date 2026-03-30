// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/provider/ProviderEarningsScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { TASKER_PROFILE } from '../../../mockData';

const PAYOUTS = [
  { id: 'p8', date: 'Mar 28, 2026', amount: 215.00, status: 'pending',  jobs: 4 },
  { id: 'p7', date: 'Mar 21, 2026', amount: 390.00, status: 'cleared',  jobs: 7 },
  { id: 'p6', date: 'Mar 14, 2026', amount: 275.50, status: 'cleared',  jobs: 5 },
  { id: 'p5', date: 'Mar  7, 2026', amount: 450.00, status: 'cleared',  jobs: 8 },
  { id: 'p4', date: 'Feb 28, 2026', amount: 185.00, status: 'cleared',  jobs: 3 },
];

const BREAKDOWN = [
  { label: 'Completed Jobs',   value: '$1,515.50', icon: 'briefcase-outline' },
  { label: 'Recurring Jobs',   value: '$380.00',   icon: 'repeat-outline' },
  { label: 'Tips Received',    value: '$55.00',    icon: 'gift-outline' },
  { label: 'Platform Fee',     value: '−$195.05',  icon: 'receipt-outline', negative: true },
];

export default function ProviderEarningsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'pending'
    ? PAYOUTS.filter((p) => p.status === 'pending')
    : PAYOUTS;

  return (
    <View style={styles.root}>
      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Earnings</Text>
              <TouchableOpacity onPress={() => navigation.navigate('EarningsBreakdown')}>
                <Ionicons name="stats-chart-outline" size={22} color={COLORS.white} />
              </TouchableOpacity>
            </View>

            {/* Summary cards */}
            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryAmount}>${TASKER_PROFILE.monthlyEarnings.toFixed(2)}</Text>
                <Text style={styles.summaryLabel}>This Month</Text>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: COLORS.accent }]}>
                <Text style={[styles.summaryAmount, { color: COLORS.white }]}>
                  ${TASKER_PROFILE.pendingPayout.toFixed(2)}
                </Text>
                <Text style={[styles.summaryLabel, { color: 'rgba(255,255,255,0.8)' }]}>Pending</Text>
              </View>
            </View>

            {/* Breakdown */}
            <View style={styles.breakdownCard}>
              <Text style={styles.cardTitle}>Earnings Breakdown</Text>
              {BREAKDOWN.map((b) => (
                <View key={b.label} style={styles.breakdownRow}>
                  <View style={styles.breakdownIcon}>
                    <Ionicons name={b.icon} size={14} color={b.negative ? COLORS.error : COLORS.primary} />
                  </View>
                  <Text style={styles.breakdownLabel}>{b.label}</Text>
                  <Text style={[styles.breakdownValue, b.negative && { color: COLORS.error }]}>
                    {b.value}
                  </Text>
                </View>
              ))}
            </View>

            {/* Filter */}
            <View style={styles.filterRow}>
              {[{ key: 'all', label: 'All Payouts' }, { key: 'pending', label: 'Pending' }].map((f) => (
                <TouchableOpacity
                  key={f.key}
                  style={[styles.filterChip, filter === f.key && styles.filterChipActive]}
                  onPress={() => setFilter(f.key)}
                >
                  <Text style={[styles.filterText, filter === f.key && { color: COLORS.primary }]}>{f.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        renderItem={({ item }) => {
          const isPending = item.status === 'pending';
          return (
            <View style={styles.payoutRow}>
              <View style={[styles.payoutIcon, { backgroundColor: isPending ? COLORS.accentLight : '#E8F5E9' }]}>
                <Ionicons name={isPending ? 'time-outline' : 'checkmark-circle'} size={17}
                  color={isPending ? COLORS.accent : COLORS.success} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.payoutDate}>{item.date}</Text>
                <Text style={styles.payoutJobs}>{item.jobs} jobs</Text>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 4 }}>
                <Text style={styles.payoutAmount}>${item.amount.toFixed(2)}</Text>
                <View style={[styles.statusBadge, { backgroundColor: isPending ? COLORS.accentLight : '#E8F5E9' }]}>
                  <Text style={[styles.statusText, { color: isPending ? COLORS.accent : COLORS.success }]}>
                    {isPending ? 'Pending' : 'Cleared'}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  header: {
    backgroundColor: COLORS.primary, paddingHorizontal: 20,
    paddingTop: 20, paddingBottom: 20,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  headerTitle: { fontFamily: FONTS.familyBold, fontSize: 22, color: COLORS.white },

  summaryRow: { flexDirection: 'row', gap: 12, padding: 16, paddingBottom: 8 },
  summaryCard: {
    flex: 1, backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: 16, alignItems: 'center', ...SHADOW.card,
  },
  summaryAmount: { fontFamily: FONTS.familyBold, fontSize: 22, color: COLORS.textPrimary },
  summaryLabel:  { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },

  breakdownCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, marginHorizontal: 16, padding: 16, marginBottom: 14, ...SHADOW.card },
  cardTitle:     { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary, marginBottom: 12 },
  breakdownRow:  { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border },
  breakdownIcon: { width: 28, height: 28, borderRadius: 7, backgroundColor: COLORS.primaryLight, alignItems: 'center', justifyContent: 'center' },
  breakdownLabel:{ flex: 1, fontFamily: FONTS.family, fontSize: 13, color: COLORS.textSecondary },
  breakdownValue:{ fontFamily: FONTS.familyBold, fontSize: 13, color: COLORS.textPrimary },

  filterRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingBottom: 12 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: RADIUS.pill, borderWidth: 1.5, borderColor: COLORS.border, backgroundColor: COLORS.white },
  filterChipActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  filterText: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textSecondary },

  payoutRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    marginHorizontal: 16, marginBottom: 10, padding: 14, ...SHADOW.card,
  },
  payoutIcon:   { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  payoutDate:   { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  payoutJobs:   { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  payoutAmount: { fontFamily: FONTS.familyBold, fontSize: 16, color: COLORS.textPrimary },
  statusBadge:  { borderRadius: RADIUS.pill, paddingHorizontal: 8, paddingVertical: 3 },
  statusText:   { fontFamily: FONTS.familySemibold, fontSize: 10 },
});
