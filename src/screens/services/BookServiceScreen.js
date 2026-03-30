// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/services/BookServiceScreen.js
//  Entry point to the booking funnel for a selected service.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const SERVICE_TYPES = [
  { key: 'one_time',   label: 'One-time',  icon: 'calendar-outline',  desc: 'Book a single appointment' },
  { key: 'recurring',  label: 'Recurring', icon: 'repeat-outline',    desc: 'Set a regular schedule' },
];

export default function BookServiceScreen({ route, navigation }) {
  const insets  = useSafeAreaInsets();
  const service = route?.params?.service ?? 'Service';
  const [type, setType] = useState('one_time');

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 32 }}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>{service}</Text>
          <Text style={styles.heroSub}>Choose your booking type</Text>
        </View>

        <View style={styles.typeRow}>
          {SERVICE_TYPES.map((t) => (
            <TouchableOpacity
              key={t.key}
              style={[styles.typeCard, type === t.key && styles.typeCardActive]}
              onPress={() => setType(t.key)}
              activeOpacity={0.82}
            >
              <Ionicons name={t.icon} size={24} color={type === t.key ? COLORS.white : COLORS.primary} />
              <Text style={[styles.typeLabel, type === t.key && { color: COLORS.white }]}>{t.label}</Text>
              <Text style={[styles.typeDesc,  type === t.key && { color: 'rgba(255,255,255,0.75)' }]}>{t.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.continueBtn}
          activeOpacity={0.85}
          onPress={() => {
            if (type === 'recurring') {
              navigation.navigate('SetUpRecurringService', { service: { service } });
            } else {
              navigation.navigate('TaskLocation', { category: { name: service } });
            }
          }}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
          <Ionicons name="arrow-forward" size={16} color={COLORS.white} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  hero: {
    backgroundColor: COLORS.primary, borderRadius: RADIUS.lg,
    padding: 20, marginBottom: 16,
  },
  heroTitle: { fontFamily: FONTS.familyBold, fontSize: 20, color: COLORS.white },
  heroSub:   { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.72)', marginTop: 4 },

  typeRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  typeCard: {
    flex: 1, backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: 16, gap: 6, borderWidth: 2, borderColor: COLORS.border, ...SHADOW.card,
    alignItems: 'flex-start',
  },
  typeCardActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  typeLabel:  { fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.textPrimary },
  typeDesc:   { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary },

  continueBtn: {
    backgroundColor: COLORS.accent, borderRadius: RADIUS.pill,
    height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  continueBtnText: { fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.white },
});
