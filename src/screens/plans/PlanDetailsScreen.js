// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/plans/PlanDetailsScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

export default function PlanDetailsScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const plan   = route?.params?.plan ?? { name: 'Plan', price: '$29', period: '/mo', color: COLORS.primary, perks: [] };

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      >
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: plan.color }]}>
          <Ionicons name={plan.icon ?? 'shield-checkmark-outline'} size={32} color={COLORS.white} />
          <Text style={styles.heroName}>{plan.name}</Text>
          <Text style={styles.heroTagline}>{plan.tagline}</Text>
          <View style={styles.heroPriceRow}>
            <Text style={styles.heroPrice}>{plan.price}</Text>
            <Text style={styles.heroPeriod}>{plan.period}</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* Perks */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>What's Included</Text>
            {(plan.perks ?? []).map((p, i) => (
              <View key={i} style={styles.perkRow}>
                <Ionicons name="checkmark-circle" size={16} color={plan.color} />
                <Text style={styles.perkText}>{p}</Text>
              </View>
            ))}
          </View>

          {/* FAQ */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Common Questions</Text>
            {[
              { q: 'When does billing start?', a: 'Your billing cycle begins on the day you subscribe.' },
              { q: 'Can I cancel anytime?',    a: 'Yes, cancel anytime with no cancellation fee.' },
              { q: 'Can I change my plan?',    a: 'Upgrade or downgrade at any time — changes take effect next cycle.' },
            ].map(({ q, a }, i) => (
              <View key={i} style={styles.faqItem}>
                <Text style={styles.faqQ}>{q}</Text>
                <Text style={styles.faqA}>{a}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.ctaBtn, { backgroundColor: plan.color }]}
            onPress={() => navigation.navigate('ActiveSubscription', { plan })}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaBtnText}>Subscribe to {plan.name}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  hero: {
    paddingHorizontal: 24, paddingTop: 32, paddingBottom: 28,
    alignItems: 'center', gap: 8,
  },
  heroName:    { fontFamily: FONTS.familyBold, fontSize: 22, color: COLORS.white },
  heroTagline: { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  heroPriceRow:{ flexDirection: 'row', alignItems: 'flex-end', gap: 3, marginTop: 6 },
  heroPrice:   { fontFamily: FONTS.familyBold, fontSize: 36, color: COLORS.white },
  heroPeriod:  { fontFamily: FONTS.family, fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 5 },

  body: { padding: 16, gap: 14 },
  card: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 16, gap: 10, ...SHADOW.card },
  cardTitle: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary, marginBottom: 4 },
  perkRow:   { flexDirection: 'row', alignItems: 'center', gap: 10 },
  perkText:  { fontFamily: FONTS.family, fontSize: 13, color: COLORS.textSecondary, flex: 1 },

  faqItem: { paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border },
  faqQ:    { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textPrimary },
  faqA:    { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 3, lineHeight: 18 },

  ctaBtn:    { borderRadius: RADIUS.pill, height: 52, alignItems: 'center', justifyContent: 'center' },
  ctaBtnText:{ fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.white },
});
