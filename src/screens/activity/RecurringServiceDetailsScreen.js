// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/activity/RecurringServiceDetailsScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

function ActionRow({ icon, label, onPress, danger }) {
  return (
    <TouchableOpacity style={styles.actionRow} onPress={onPress} activeOpacity={0.75}>
      <View style={[styles.actionIcon, { backgroundColor: danger ? '#FFF0F0' : COLORS.primaryLight }]}>
        <Ionicons name={icon} size={17} color={danger ? COLORS.error : COLORS.primary} />
      </View>
      <Text style={[styles.actionLabel, { color: danger ? COLORS.error : COLORS.textPrimary }]}>
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={15} color={COLORS.inactive} />
    </TouchableOpacity>
  );
}

export default function RecurringServiceDetailsScreen({ route, navigation }) {
  const insets  = useSafeAreaInsets();
  const service = route?.params?.service ?? {};

  const handlePause = () => Alert.alert('Pause Service', 'Pause until further notice?', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Pause',  style: 'destructive', onPress: () => navigation.goBack() },
  ]);

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name={service.icon ?? 'repeat-outline'} size={26} color={COLORS.white} />
          </View>
          <Text style={styles.heroService}>{service.service ?? 'Recurring Service'}</Text>
          <Text style={styles.heroFreq}>{service.frequency ?? 'Scheduled'}</Text>
          <View style={styles.activeBadge}>
            <Ionicons name="checkmark-circle" size={13} color={COLORS.success} />
            <Text style={styles.activeBadgeText}>Active</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* Info card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Schedule Info</Text>
            {[
              { icon: 'person-outline',   label: 'Provider',    value: service.provider   ?? '—' },
              { icon: 'location-outline', label: 'Location',    value: service.space       ?? '—' },
              { icon: 'repeat-outline',   label: 'Frequency',   value: service.frequency  ?? '—' },
              { icon: 'calendar-outline', label: 'Next Service', value: service.next       ?? '—' },
            ].map(({ icon, label, value }) => (
              <View key={label} style={styles.infoRow}>
                <Ionicons name={icon} size={15} color={COLORS.textSecondary} />
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
              </View>
            ))}
          </View>

          {/* Actions */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Manage</Text>
            <ActionRow icon="calendar-outline"  label="Reschedule Next Occurrence"
              onPress={() => navigation.navigate('RecurringScheduleDetails', { service })} />
            <ActionRow icon="skip-forward-outline" label="Skip Next Occurrence"
              onPress={() => Alert.alert('Skip', 'Next occurrence will be skipped.')} />
            <ActionRow icon="pause-circle-outline" label="Pause Recurring Service"
              onPress={handlePause} />
            <ActionRow icon="trash-outline"     label="Cancel Recurring Service"
              danger onPress={() => Alert.alert('Cancel', 'This cannot be undone.', [
                { text: 'Keep It',  style: 'cancel' },
                { text: 'Cancel Service', style: 'destructive', onPress: () => navigation.goBack() },
              ])} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  hero: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20, paddingVertical: 28,
    alignItems: 'center', gap: 8,
  },
  heroIcon:    { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  heroService: { fontFamily: FONTS.familyBold, fontSize: 20, color: COLORS.white },
  heroFreq:    { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.75)' },
  activeBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: RADIUS.pill, paddingHorizontal: 12, paddingVertical: 4 },
  activeBadgeText: { fontFamily: FONTS.familySemibold, fontSize: 12, color: COLORS.white },

  body:       { padding: 16, gap: 14 },
  card:       { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 16, gap: 10, ...SHADOW.card },
  cardTitle:  { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary, marginBottom: 4 },

  infoRow:   { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoLabel: { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, width: 100 },
  infoValue: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textPrimary, flex: 1 },

  actionRow:   { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border },
  actionIcon:  { width: 34, height: 34, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  actionLabel: { flex: 1, fontFamily: FONTS.familySemibold, fontSize: 14 },
});
