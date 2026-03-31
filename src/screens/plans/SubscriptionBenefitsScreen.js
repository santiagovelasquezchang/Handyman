// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/plans/SubscriptionBenefitsScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { TopHeaderBackground } from '../../components/ui';

const COMPARISON = [
  { feature: 'Included services / month', home: '2', pro: '5', biz: 'Unlimited' },
  { feature: 'Booking discount',          home: '10%', pro: '20%', biz: '25%' },
  { feature: 'Priority scheduling',       home: '—', pro: '✓', biz: '✓' },
  { feature: 'Same-day availability',     home: '—', pro: '✓', biz: '✓' },
  { feature: 'Preferred provider',        home: '—', pro: '✓', biz: '✓' },
  { feature: 'Multi-location support',    home: '—', pro: '—', biz: '✓' },
  { feature: 'Business billing',          home: '—', pro: '—', biz: '✓' },
  { feature: 'Dedicated account manager', home: '—', pro: '—', biz: '✓' },
];

export default function SubscriptionBenefitsScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      >
        <TopHeaderBackground color={COLORS.primary} style={styles.hero}>
          <Ionicons name="grid-outline" size={24} color={COLORS.white} style={{ marginBottom: 6 }} />
          <Text style={styles.heroTitle}>Compare Plans</Text>
          <Text style={styles.heroSub}>Find the right plan for your needs</Text>
        </TopHeaderBackground>

        <View style={styles.tableWrap}>
          {/* Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.featureCol, styles.tableHeaderText]}>Feature</Text>
            {['Home', 'Pro', 'Biz'].map((h) => (
              <Text key={h} style={[styles.planCol, styles.tableHeaderText]}>{h}</Text>
            ))}
          </View>

          {COMPARISON.map((row, i) => (
            <View key={i} style={[styles.tableRow, i % 2 === 1 && styles.tableRowAlt]}>
              <Text style={styles.featureCol}>{row.feature}</Text>
              {[row.home, row.pro, row.biz].map((val, j) => (
                <Text key={j} style={[
                  styles.planCol,
                  val === '✓' && styles.checkVal,
                  val === '—' && styles.dashVal,
                ]}>
                  {val}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Price row */}
        <View style={styles.priceRow}>
          {[
            { name: 'Home', price: '$29/mo', color: COLORS.primary },
            { name: 'Pro',  price: '$59/mo', color: COLORS.accent },
            { name: 'Biz',  price: '$149/mo', color: '#4A6CF7' },
          ].map((p) => (
            <View key={p.name} style={[styles.priceCard, { borderTopColor: p.color }]}>
              <Text style={[styles.priceName, { color: p.color }]}>{p.name}</Text>
              <Text style={styles.priceAmount}>{p.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  hero: { paddingHorizontal: 20, paddingBottom: 24, alignItems: 'center' },
  heroTitle: { fontFamily: FONTS.familyBold, fontSize: 22, color: COLORS.white },
  heroSub:   { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 },

  tableWrap: { margin: 16, backgroundColor: COLORS.white, borderRadius: RADIUS.lg, overflow: 'hidden', ...SHADOW.card },
  tableRow:  { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 14 },
  tableHeader: { backgroundColor: COLORS.primary },
  tableHeaderText: { color: COLORS.white, fontFamily: FONTS.familySemibold },
  tableRowAlt: { backgroundColor: '#F8F9FA' },
  featureCol: { flex: 2, fontFamily: FONTS.family, fontSize: 12, color: COLORS.textPrimary },
  planCol:    { flex: 1, fontFamily: FONTS.familySemibold, fontSize: 12, color: COLORS.textPrimary, textAlign: 'center' },
  checkVal:   { color: COLORS.success },
  dashVal:    { color: COLORS.border },

  priceRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginBottom: 8 },
  priceCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 14, alignItems: 'center', borderTopWidth: 3, ...SHADOW.card },
  priceName: { fontFamily: FONTS.familySemibold, fontSize: 13 },
  priceAmount: { fontFamily: FONTS.familyBold, fontSize: 14, color: COLORS.textPrimary, marginTop: 4 },
});
