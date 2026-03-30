// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/tasker/TaskerEarningsScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const PAYOUTS = [
  { id: 'pay8',  date: 'Mar 28, 2026', amount: 215.00, status: 'pending',  tasks: 4 },
  { id: 'pay7',  date: 'Mar 21, 2026', amount: 390.00, status: 'cleared',  tasks: 7 },
  { id: 'pay6',  date: 'Mar 14, 2026', amount: 275.50, status: 'cleared',  tasks: 5 },
  { id: 'pay5',  date: 'Mar  7, 2026', amount: 450.00, status: 'cleared',  tasks: 8 },
  { id: 'pay4',  date: 'Feb 28, 2026', amount: 185.00, status: 'cleared',  tasks: 3 },
  { id: 'pay3',  date: 'Feb 21, 2026', amount: 320.00, status: 'cleared',  tasks: 6 },
  { id: 'pay2',  date: 'Feb 14, 2026', amount: 410.00, status: 'cleared',  tasks: 7 },
  { id: 'pay1',  date: 'Feb  7, 2026', amount: 255.00, status: 'cleared',  tasks: 5 },
];

const TOTAL_EARNED = PAYOUTS.filter((p) => p.status === 'cleared')
  .reduce((s, p) => s + p.amount, 0);

const PENDING_AMOUNT = PAYOUTS.filter((p) => p.status === 'pending')
  .reduce((s, p) => s + p.amount, 0);

function PayoutRow({ payout }) {
  const isPending = payout.status === 'pending';
  return (
    <View style={styles.row}>
      <View style={[styles.statusIcon, { backgroundColor: isPending ? COLORS.accentLight : '#E8F5E9' }]}>
        <Ionicons
          name={isPending ? 'time-outline' : 'checkmark-circle'}
          size={18}
          color={isPending ? COLORS.accent : COLORS.success}
        />
      </View>
      <View style={styles.rowContent}>
        <Text style={styles.rowDate}>{payout.date}</Text>
        <Text style={styles.rowTasks}>{payout.tasks} tasks</Text>
      </View>
      <View style={styles.rowRight}>
        <Text style={styles.rowAmount}>${payout.amount.toFixed(2)}</Text>
        <View style={[styles.badge, { backgroundColor: isPending ? COLORS.accentLight : '#E8F5E9' }]}>
          <Text style={[styles.badgeText, { color: isPending ? COLORS.accent : COLORS.success }]}>
            {isPending ? 'Pending' : 'Cleared'}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function TaskerEarningsScreen() {
  const insets = useSafeAreaInsets();
  const [period, setPeriod] = useState('all');

  const filtered = period === 'pending'
    ? PAYOUTS.filter((p) => p.status === 'pending')
    : PAYOUTS;

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      {/* Summary cards */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryAmount}>${TOTAL_EARNED.toFixed(2)}</Text>
          <Text style={styles.summaryLabel}>Total Earned</Text>
        </View>
        <View style={[styles.summaryCard, styles.summaryCardAccent]}>
          <Text style={[styles.summaryAmount, { color: COLORS.white }]}>
            ${PENDING_AMOUNT.toFixed(2)}
          </Text>
          <Text style={[styles.summaryLabel, { color: 'rgba(255,255,255,0.8)' }]}>Pending</Text>
        </View>
      </View>

      {/* Filter chips */}
      <View style={styles.filterRow}>
        {[
          { key: 'all',     label: 'All Payouts' },
          { key: 'pending', label: 'Pending'     },
        ].map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterChip, period === f.key && styles.filterChipActive]}
            onPress={() => setPeriod(f.key)}
            activeOpacity={0.75}
          >
            <Text style={[styles.filterChipText, period === f.key && styles.filterChipTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Payout list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PayoutRow payout={item} />}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="receipt-outline" size={36} color={COLORS.border} />
            <Text style={styles.emptyText}>No payouts found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F9FA' },

  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    paddingBottom: 8,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 16,
    alignItems: 'center',
    ...SHADOW.card,
  },
  summaryCardAccent: { backgroundColor: COLORS.accent },
  summaryAmount: {
    fontFamily: FONTS.familyBold,
    fontSize: 22,
    color: COLORS.textPrimary,
  },
  summaryLabel: {
    fontFamily: FONTS.family,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.pill,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  filterChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  filterChipText: {
    fontFamily: FONTS.familySemibold,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  filterChipTextActive: { color: COLORS.primary },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 14,
    gap: 12,
    ...SHADOW.card,
  },
  sep: { height: 10 },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContent: { flex: 1 },
  rowDate: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  rowTasks: { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  rowRight: { alignItems: 'flex-end', gap: 4 },
  rowAmount: { fontFamily: FONTS.familyBold, fontSize: 16, color: COLORS.textPrimary },
  badge: {
    borderRadius: RADIUS.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: { fontFamily: FONTS.familySemibold, fontSize: 10 },

  empty: { alignItems: 'center', paddingVertical: 48, gap: 10 },
  emptyText: { fontFamily: FONTS.familyMedium, fontSize: 14, color: COLORS.textSecondary },
});
