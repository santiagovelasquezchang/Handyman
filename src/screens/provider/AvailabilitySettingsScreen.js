// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/provider/AvailabilitySettingsScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const DAYS = [
  { key: 'mon', label: 'Monday' },
  { key: 'tue', label: 'Tuesday' },
  { key: 'wed', label: 'Wednesday' },
  { key: 'thu', label: 'Thursday' },
  { key: 'fri', label: 'Friday' },
  { key: 'sat', label: 'Saturday' },
  { key: 'sun', label: 'Sunday' },
];

const DEFAULT_HOURS = { start: '08:00', end: '18:00' };

export default function AvailabilitySettingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeDays, setActiveDays] = useState(['mon','tue','wed','thu','fri']);

  const toggle = (key) =>
    setActiveDays((prev) =>
      prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]
    );

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 32 }}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Working Days</Text>
          {DAYS.map((d) => {
            const active = activeDays.includes(d.key);
            return (
              <View key={d.key} style={styles.dayRow}>
                <TouchableOpacity
                  style={[styles.toggle, active && styles.toggleOn]}
                  onPress={() => toggle(d.key)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.thumb, active && styles.thumbOn]} />
                </TouchableOpacity>
                <Text style={styles.dayLabel}>{d.label}</Text>
                {active && (
                  <Text style={styles.hoursText}>
                    {DEFAULT_HOURS.start} – {DEFAULT_HOURS.end}
                  </Text>
                )}
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => Alert.alert('Saved', 'Availability updated.', [{ text: 'OK', onPress: () => navigation.goBack() }])}
          activeOpacity={0.85}
        >
          <Text style={styles.saveBtnText}>Save Availability</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:      { flex: 1, backgroundColor: COLORS.background },
  card:      { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 16, marginBottom: 20, ...SHADOW.card },
  cardTitle: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary, marginBottom: 14 },
  dayRow:    { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border, gap: 12 },
  toggle:    { width: 40, height: 22, borderRadius: 11, backgroundColor: COLORS.border, justifyContent: 'center', paddingHorizontal: 2 },
  toggleOn:  { backgroundColor: COLORS.accent },
  thumb:     { width: 18, height: 18, borderRadius: 9, backgroundColor: COLORS.white },
  thumbOn:   { alignSelf: 'flex-end' },
  dayLabel:  { flex: 1, fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  hoursText: { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary },
  saveBtn:   { backgroundColor: COLORS.accent, borderRadius: RADIUS.pill, height: 52, alignItems: 'center', justifyContent: 'center' },
  saveBtnText:{ fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.white },
});
