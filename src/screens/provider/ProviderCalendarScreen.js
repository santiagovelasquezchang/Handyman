// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/provider/ProviderCalendarScreen.js
//  Availability & schedule management.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

// Build 14-day strip from today
const today = new Date(2026, 2, 29); // Mar 29 2026
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const DATES = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() + i);
  return {
    key:   d.toISOString().split('T')[0],
    day:   DAYS_SHORT[d.getDay()],
    date:  d.getDate(),
    month: MONTHS_SHORT[d.getMonth()],
    isToday: i === 0,
  };
});

const BLOCKS = {
  '2026-03-29': [{ start: 8, end: 12 }, { start: 14, end: 18 }],
  '2026-03-30': [{ start: 9, end: 17 }],
  '2026-03-31': [],
  '2026-04-01': [{ start: 10, end: 15 }],
};

const HOUR_H = 52;
const START  = 7;
const END    = 20;
const HOURS  = Array.from({ length: END - START + 1 }, (_, i) => START + i);

export default function ProviderCalendarScreen({ navigation }) {
  const insets      = useSafeAreaInsets();
  const [activeDay, setActiveDay] = useState(DATES[0].key);
  const blocks      = BLOCKS[activeDay] ?? [];

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calendar</Text>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => navigation.navigate('AvailabilitySettings')}
        >
          <Ionicons name="settings-outline" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Date strip */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dateStrip}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 6, paddingVertical: 10 }}
      >
        {DATES.map((d) => (
          <TouchableOpacity
            key={d.key}
            style={[styles.dateBtn, activeDay === d.key && styles.dateBtnActive]}
            onPress={() => setActiveDay(d.key)}
            activeOpacity={0.8}
          >
            <Text style={[styles.dateDayText, activeDay === d.key && styles.dateTextActive]}>{d.day}</Text>
            <Text style={[styles.dateDateText, activeDay === d.key && styles.dateTextActive]}>{d.date}</Text>
            {activeDay === d.key && <View style={styles.activeDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Timeline */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.timeline}>
          {/* Hour rows */}
          {HOURS.map((h) => (
            <View key={h} style={[styles.hourRow, { height: HOUR_H }]}>
              <Text style={styles.hourLabel}>{h > 12 ? `${h - 12}pm` : h === 12 ? '12pm' : `${h}am`}</Text>
              <View style={styles.hourLine} />
            </View>
          ))}

          {/* Availability blocks */}
          {blocks.map((b, i) => (
            <View
              key={i}
              style={[
                styles.avBlock,
                {
                  top:    (b.start - START) * HOUR_H + 1,
                  height: (b.end - b.start) * HOUR_H - 2,
                },
              ]}
            >
              <Text style={styles.avBlockText}>{`${b.start}:00 – ${b.end}:00`}</Text>
              <Text style={styles.avBlockSub}>Available</Text>
            </View>
          ))}

          {blocks.length === 0 && (
            <View style={styles.dayOffOverlay}>
              <Text style={styles.dayOffText}>No availability set</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('AvailabilitySettings')}
                activeOpacity={0.8}
              >
                <Text style={styles.dayOffLink}>Set availability →</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  header: {
    backgroundColor: COLORS.primary, paddingHorizontal: 20,
    paddingTop: 20, paddingBottom: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  headerTitle:  { fontFamily: FONTS.familyBold, fontSize: 22, color: COLORS.white },
  settingsBtn:  { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },

  dateStrip: { backgroundColor: COLORS.white, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border, flexGrow: 0 },
  dateBtn:   { width: 50, borderRadius: RADIUS.md, alignItems: 'center', paddingVertical: 6, gap: 3 },
  dateBtnActive: { backgroundColor: COLORS.primaryLight },
  dateDayText:   { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },
  dateDateText:  { fontFamily: FONTS.familyBold, fontSize: 16, color: COLORS.textPrimary },
  dateTextActive:{ color: COLORS.primary },
  activeDot:     { width: 5, height: 5, borderRadius: 2.5, backgroundColor: COLORS.accent },

  timeline: {
    position: 'relative',
    marginLeft: 16, marginRight: 16, marginTop: 8,
    marginBottom: 32,
  },
  hourRow: { flexDirection: 'row', alignItems: 'flex-start' },
  hourLabel:{ width: 40, fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary, paddingTop: 2 },
  hourLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: COLORS.border, marginTop: 8 },

  avBlock: {
    position: 'absolute', left: 44, right: 0,
    backgroundColor: 'rgba(255, 127, 63, 0.13)',
    borderLeftWidth: 3, borderLeftColor: COLORS.accent,
    borderRadius: RADIUS.sm, paddingHorizontal: 10, paddingTop: 6,
  },
  avBlockText: { fontFamily: FONTS.familySemibold, fontSize: 12, color: COLORS.accent },
  avBlockSub:  { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },

  dayOffOverlay: { position: 'absolute', top: 120, left: 50, right: 0, alignItems: 'center', gap: 8 },
  dayOffText:    { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textSecondary },
  dayOffLink:    { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.accent },
});
