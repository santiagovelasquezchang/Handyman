// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/recurring/RecurringScheduleDetailsScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const UPCOMING_DATES = [
  { date: 'Apr 4, 2026',  day: 'Friday',    status: 'scheduled' },
  { date: 'Apr 11, 2026', day: 'Friday',    status: 'scheduled' },
  { date: 'Apr 18, 2026', day: 'Friday',    status: 'scheduled' },
  { date: 'Apr 25, 2026', day: 'Friday',    status: 'scheduled' },
];

export default function RecurringScheduleDetailsScreen({ route, navigation }) {
  const insets  = useSafeAreaInsets();
  const service = route?.params?.service ?? {};

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>{service.service ?? 'Recurring Service'}</Text>
          <Text style={styles.heroFreq}>{service.frequency ?? 'Scheduled'}</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Upcoming Occurrences</Text>
            {UPCOMING_DATES.map((d, i) => (
              <View key={d.date} style={[styles.occRow, i === UPCOMING_DATES.length - 1 && { borderBottomWidth: 0 }]}>
                <View style={styles.dateBubble}>
                  <Text style={styles.dateBubbleText}>{d.date.split(' ')[1].replace(',', '')}</Text>
                  <Text style={styles.dateBubbleMonth}>{d.date.split(' ')[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.occDay}>{d.day}</Text>
                  <Text style={styles.occDate}>{d.date}</Text>
                </View>
                <View style={styles.occActions}>
                  <TouchableOpacity onPress={() => Alert.alert('Skip', `${d.date} occurrence skipped.`)}>
                    <Text style={styles.skipText}>Skip</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Alert.alert('Reschedule', `Reschedule ${d.date}.`)}>
                    <Text style={styles.reschedText}>Reschedule</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('SetUpRecurringService', { service })}
            activeOpacity={0.85}
          >
            <Ionicons name="settings-outline" size={16} color={COLORS.primary} style={{ marginRight: 8 }} />
            <Text style={styles.editBtnText}>Edit Schedule Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  hero: { backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingVertical: 22 },
  heroTitle: { fontFamily: FONTS.familyBold, fontSize: 19, color: COLORS.white },
  heroFreq:  { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 },

  body: { padding: 16, gap: 14 },
  card: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 16, ...SHADOW.card },
  cardTitle: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary, marginBottom: 14 },

  occRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border,
  },
  dateBubble:       { width: 44, height: 44, borderRadius: RADIUS.md, backgroundColor: COLORS.primaryLight, alignItems: 'center', justifyContent: 'center' },
  dateBubbleText:   { fontFamily: FONTS.familyBold, fontSize: 16, color: COLORS.primary },
  dateBubbleMonth:  { fontFamily: FONTS.family, fontSize: 9, color: COLORS.primary, marginTop: 1 },
  occDay:    { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textPrimary },
  occDate:   { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  occActions:{ flexDirection: 'row', gap: 12 },
  skipText:  { fontFamily: FONTS.familySemibold, fontSize: 12, color: COLORS.textSecondary },
  reschedText:{ fontFamily: FONTS.familySemibold, fontSize: 12, color: COLORS.accent },

  editBtn: {
    borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: RADIUS.pill,
    height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  editBtnText: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.primary },
});
