// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/provider/VerificationScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const STEPS = [
  { id: 'id',    label: 'Government ID',      icon: 'card-outline',           status: 'verified' },
  { id: 'phone', label: 'Phone Number',        icon: 'phone-portrait-outline', status: 'verified' },
  { id: 'bg',    label: 'Background Check',    icon: 'shield-outline',         status: 'pending' },
  { id: 'bank',  label: 'Bank Account',        icon: 'business-outline',       status: 'not_started' },
];

const STATUS_MAP = {
  verified:    { label: 'Verified',     color: COLORS.success, icon: 'checkmark-circle' },
  pending:     { label: 'In Review',    color: COLORS.accent,  icon: 'time' },
  not_started: { label: 'Not Started',  color: COLORS.border,  icon: 'ellipse-outline' },
};

export default function VerificationScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 32 }}
      >
        <View style={styles.hero}>
          <Ionicons name="shield-checkmark" size={28} color={COLORS.white} style={{ marginBottom: 6 }} />
          <Text style={styles.heroTitle}>Verification Status</Text>
          <Text style={styles.heroSub}>Complete verification to build client trust and unlock more jobs.</Text>
        </View>

        <View style={styles.card}>
          {STEPS.map((step, i) => {
            const s = STATUS_MAP[step.status];
            return (
              <TouchableOpacity
                key={step.id}
                style={[styles.stepRow, i === STEPS.length - 1 && { borderBottomWidth: 0 }]}
                activeOpacity={0.8}
              >
                <View style={[styles.stepIcon, { backgroundColor: s.color + '18' }]}>
                  <Ionicons name={step.icon} size={18} color={s.color} />
                </View>
                <Text style={styles.stepLabel}>{step.label}</Text>
                <View style={[styles.statusBadge, { backgroundColor: s.color + '18' }]}>
                  <Ionicons name={s.icon} size={13} color={s.color} />
                  <Text style={[styles.statusText, { color: s.color }]}>{s.label}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:     { flex: 1, backgroundColor: COLORS.background },
  hero:     { backgroundColor: COLORS.primary, borderRadius: RADIUS.lg, padding: 20, marginBottom: 16 },
  heroTitle:{ fontFamily: FONTS.familyBold, fontSize: 19, color: COLORS.white },
  heroSub:  { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.72)', marginTop: 6, lineHeight: 19 },
  card:     { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 16, ...SHADOW.card },
  stepRow:  { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, gap: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border },
  stepIcon: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  stepLabel:{ flex: 1, fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: RADIUS.pill, paddingHorizontal: 9, paddingVertical: 4 },
  statusText:  { fontFamily: FONTS.familySemibold, fontSize: 11 },
});
