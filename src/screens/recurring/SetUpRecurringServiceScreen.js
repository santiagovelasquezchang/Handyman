// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/recurring/SetUpRecurringServiceScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const FREQUENCIES = [
  { key: 'weekly',    label: 'Weekly',     icon: 'repeat-outline',    desc: 'Same day every week' },
  { key: 'biweekly',  label: 'Bi-weekly',  icon: 'calendar-outline',  desc: 'Every two weeks' },
  { key: 'monthly',   label: 'Monthly',    icon: 'calendar-number-outline', desc: 'Once a month' },
  { key: 'quarterly', label: 'Quarterly',  icon: 'time-outline',      desc: 'Every 3 months' },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function SetUpRecurringServiceScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const service = route?.params?.service ?? {};

  const [frequency, setFrequency] = useState('weekly');
  const [day,       setDay]       = useState('Fri');
  const [keepSame,  setKeepSame]  = useState(true);

  const handleConfirm = () => {
    Alert.alert(
      'Recurring Service Set',
      `Your ${service.service ?? 'service'} has been scheduled ${frequency} on ${day}s.`,
      [{ text: 'Done', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Context */}
        <View style={styles.contextCard}>
          <View style={styles.contextIcon}>
            <Ionicons name="repeat" size={20} color={COLORS.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.contextTitle}>
              {service.service ?? 'Set Up Recurring Service'}
            </Text>
            <Text style={styles.contextSub}>
              Never forget maintenance again. Set it once and we handle the rest.
            </Text>
          </View>
        </View>

        {/* Frequency */}
        <Text style={styles.sectionLabel}>How Often?</Text>
        <View style={styles.freqGrid}>
          {FREQUENCIES.map((f) => (
            <TouchableOpacity
              key={f.key}
              style={[styles.freqCard, frequency === f.key && styles.freqCardActive]}
              onPress={() => setFrequency(f.key)}
              activeOpacity={0.8}
            >
              <Ionicons name={f.icon} size={20} color={frequency === f.key ? COLORS.white : COLORS.primary} />
              <Text style={[styles.freqLabel, frequency === f.key && styles.freqLabelActive]}>{f.label}</Text>
              <Text style={[styles.freqDesc, frequency === f.key && styles.freqDescActive]}>{f.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Day */}
        {(frequency === 'weekly' || frequency === 'biweekly') && (
          <>
            <Text style={styles.sectionLabel}>Preferred Day</Text>
            <View style={styles.dayRow}>
              {DAYS.map((d) => (
                <TouchableOpacity
                  key={d}
                  style={[styles.dayBtn, day === d && styles.dayBtnActive]}
                  onPress={() => setDay(d)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.dayText, day === d && styles.dayTextActive]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Provider preference */}
        <Text style={styles.sectionLabel}>Provider</Text>
        <View style={styles.providerCard}>
          <TouchableOpacity
            style={[styles.providerOption, keepSame && styles.providerOptionActive]}
            onPress={() => setKeepSame(true)}
            activeOpacity={0.8}
          >
            <Ionicons name={keepSame ? 'radio-button-on' : 'radio-button-off'} size={18} color={keepSame ? COLORS.accent : COLORS.border} />
            <View>
              <Text style={styles.providerOptionLabel}>Keep same provider</Text>
              <Text style={styles.providerOptionSub}>
                {service.provider ? `${service.provider} will be preferred` : 'Your last provider will be preferred'}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={[styles.providerOption, !keepSame && styles.providerOptionActive]}
            onPress={() => setKeepSame(false)}
            activeOpacity={0.8}
          >
            <Ionicons name={!keepSame ? 'radio-button-on' : 'radio-button-off'} size={18} color={!keepSame ? COLORS.accent : COLORS.border} />
            <View>
              <Text style={styles.providerOptionLabel}>Best available provider</Text>
              <Text style={styles.providerOptionSub}>We'll assign the highest-rated available</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm} activeOpacity={0.85}>
          <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.white} style={{ marginRight: 8 }} />
          <Text style={styles.confirmBtnText}>Confirm Recurring Schedule</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 16 },

  contextCard: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: 16, flexDirection: 'row', alignItems: 'flex-start',
    gap: 12, marginBottom: 20, ...SHADOW.card,
  },
  contextIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.accentLight, alignItems: 'center', justifyContent: 'center' },
  contextTitle:{ fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  contextSub:  { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 3, lineHeight: 17 },

  sectionLabel: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textSecondary, letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 10, marginTop: 4 },

  freqGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  freqCard: {
    width: '47%', backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: 14, alignItems: 'flex-start', gap: 4,
    borderWidth: 1.5, borderColor: COLORS.border, ...SHADOW.card,
  },
  freqCardActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  freqLabel:      { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  freqLabelActive:{ color: COLORS.white },
  freqDesc:       { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },
  freqDescActive: { color: 'rgba(255,255,255,0.7)' },

  dayRow: { flexDirection: 'row', gap: 6, marginBottom: 20, flexWrap: 'wrap' },
  dayBtn: {
    flex: 1, minWidth: 40, paddingVertical: 10,
    borderRadius: RADIUS.pill, borderWidth: 1.5, borderColor: COLORS.border,
    backgroundColor: COLORS.white, alignItems: 'center',
  },
  dayBtnActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  dayText:      { fontFamily: FONTS.familySemibold, fontSize: 12, color: COLORS.textSecondary },
  dayTextActive:{ color: COLORS.white },

  providerCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 16, marginBottom: 24, ...SHADOW.card },
  providerOption: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 8 },
  providerOptionActive: {},
  providerOptionLabel: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  providerOptionSub:   { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.border, marginVertical: 8 },

  confirmBtn: {
    backgroundColor: COLORS.accent, borderRadius: RADIUS.pill,
    height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  confirmBtnText: { fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.white },
});
