// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/provider/ProviderDashboardScreen.js
//  Daily operational command center for service providers.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { TASKER_PROFILE } from '../../../mockData';

const TODAY_JOBS = [
  { id: 'j1', service: 'Deep Cleaning', client: 'María González', time: '10:00 AM', address: 'El Cafetal, Caracas', status: 'in_progress' },
  { id: 'j2', service: 'Plumbing Repair', client: 'Jorge Martínez', time: '2:30 PM', address: 'Altamira, Caracas', status: 'upcoming' },
];

const NEW_REQUESTS = [
  { id: 'req1', service: 'TV Mounting', client: 'Ana López', date: 'Apr 4, 2026', time: '11:00 AM', rate: '$75' },
  { id: 'req2', service: 'Electrical', client: 'Pedro Díaz',  date: 'Apr 5, 2026', time: '3:00 PM',  rate: '$120' },
];

function TodayJobCard({ job }) {
  const isActive = job.status === 'in_progress';
  return (
    <View style={[styles.jobCard, isActive && styles.jobCardActive]}>
      <View style={styles.jobLeft}>
        <View style={[styles.jobTimeBubble, isActive && styles.jobTimeBubbleActive]}>
          <Text style={[styles.jobTime, isActive && styles.jobTimeActive]}>{job.time}</Text>
        </View>
      </View>
      <View style={styles.jobBody}>
        <Text style={styles.jobService}>{job.service}</Text>
        <Text style={styles.jobClient}>{job.client}</Text>
        <View style={styles.jobMeta}>
          <Ionicons name="location-outline" size={11} color={COLORS.textSecondary} />
          <Text style={styles.jobMetaText}>{job.address}</Text>
        </View>
      </View>
      {isActive && (
        <View style={styles.activePill}>
          <Text style={styles.activePillText}>Active</Text>
        </View>
      )}
    </View>
  );
}

function RequestCard({ req, onAccept, onDecline }) {
  return (
    <View style={styles.reqCard}>
      <View>
        <Text style={styles.reqService}>{req.service}</Text>
        <Text style={styles.reqClient}>{req.client}</Text>
        <View style={styles.reqMeta}>
          <Ionicons name="calendar-outline" size={11} color={COLORS.textSecondary} />
          <Text style={styles.reqMetaText}>{req.date} · {req.time}</Text>
          <Text style={[styles.reqRate]}>{req.rate}</Text>
        </View>
      </View>
      <View style={styles.reqActions}>
        <TouchableOpacity style={styles.declineBtn} onPress={onDecline}>
          <Text style={styles.declineBtnText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptBtn} onPress={onAccept}>
          <Text style={styles.acceptBtnText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ProviderDashboardScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      >
        {/* Navy header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerGreeting}>Good morning,</Text>
            <Text style={styles.headerName}>{TASKER_PROFILE.name} 👋</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Earnings summary */}
        <View style={styles.earningsRow}>
          <View style={styles.earningsCard}>
            <Text style={styles.earningsLabel}>Today</Text>
            <Text style={styles.earningsValue}>$165</Text>
          </View>
          <View style={[styles.earningsCard, { backgroundColor: COLORS.accent }]}>
            <Text style={[styles.earningsLabel, { color: 'rgba(255,255,255,0.8)' }]}>This Week</Text>
            <Text style={[styles.earningsValue, { color: COLORS.white }]}>${TASKER_PROFILE.weeklyEarnings}</Text>
          </View>
          <View style={styles.earningsCard}>
            <Text style={styles.earningsLabel}>Pending</Text>
            <Text style={[styles.earningsValue, { color: COLORS.accent }]}>${TASKER_PROFILE.pendingPayout}</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* New requests */}
          {NEW_REQUESTS.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <View style={styles.urgentDot} />
                <Text style={styles.sectionTitle}>New Requests</Text>
                <Text style={styles.sectionBadge}>{NEW_REQUESTS.length}</Text>
              </View>
              {NEW_REQUESTS.map((r) => (
                <RequestCard
                  key={r.id}
                  req={r}
                  onAccept={() => {}}
                  onDecline={() => {}}
                />
              ))}
            </>
          )}

          {/* Today's jobs */}
          <Text style={styles.sectionTitle}>Today's Jobs</Text>
          {TODAY_JOBS.map((j) => (
            <TodayJobCard key={j.id} job={j} />
          ))}

          {/* Quick stats */}
          <View style={styles.statsCard}>
            <Text style={styles.cardTitle}>Performance</Text>
            {[
              { label: 'Completion rate', value: '98%',   icon: 'checkmark-circle-outline' },
              { label: 'Avg rating',      value: `${TASKER_PROFILE.rating} ★`, icon: 'star-outline' },
              { label: 'Total jobs',      value: `${TASKER_PROFILE.totalTasks}`, icon: 'briefcase-outline' },
            ].map((s) => (
              <View key={s.label} style={styles.statRow}>
                <View style={styles.statIcon}>
                  <Ionicons name={s.icon} size={15} color={COLORS.primary} />
                </View>
                <Text style={styles.statLabel}>{s.label}</Text>
                <Text style={styles.statValue}>{s.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  header: {
    backgroundColor: COLORS.primary, paddingHorizontal: 20,
    paddingTop: 22, paddingBottom: 24,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  headerGreeting: { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  headerName:     { fontFamily: FONTS.familyBold, fontSize: 20, color: COLORS.white, marginTop: 2 },
  notifBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },

  earningsRow: { flexDirection: 'row', padding: 16, gap: 10 },
  earningsCard: {
    flex: 1, backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: 12, alignItems: 'center', ...SHADOW.card,
  },
  earningsLabel: { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },
  earningsValue: { fontFamily: FONTS.familyBold, fontSize: 18, color: COLORS.textPrimary, marginTop: 3 },

  body:          { paddingHorizontal: 16, gap: 10 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  urgentDot:     { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E53E3E' },
  sectionTitle:  { fontFamily: FONTS.familySemibold, fontSize: 15, color: COLORS.textPrimary, flex: 1 },
  sectionBadge:  { backgroundColor: COLORS.accent, borderRadius: RADIUS.pill, paddingHorizontal: 8, paddingVertical: 2 },

  reqCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 14, gap: 10, ...SHADOW.card },
  reqService:  { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  reqClient:   { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  reqMeta:     { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  reqMetaText: { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary, flex: 1 },
  reqRate:     { fontFamily: FONTS.familyBold, fontSize: 14, color: COLORS.accent },
  reqActions:  { flexDirection: 'row', gap: 10 },
  declineBtn:  { flex: 1, height: 38, borderRadius: RADIUS.pill, borderWidth: 1.5, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  declineBtnText: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textSecondary },
  acceptBtn:   { flex: 1, height: 38, borderRadius: RADIUS.pill, backgroundColor: COLORS.accent, alignItems: 'center', justifyContent: 'center' },
  acceptBtnText: { fontFamily: FONTS.familyBold, fontSize: 13, color: COLORS.white },

  jobCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 14, flexDirection: 'row', alignItems: 'flex-start', gap: 12, ...SHADOW.card },
  jobCardActive: { borderLeftWidth: 3, borderLeftColor: COLORS.accent },
  jobLeft:  {},
  jobTimeBubble: { width: 52, height: 52, borderRadius: RADIUS.md, backgroundColor: COLORS.primaryLight, alignItems: 'center', justifyContent: 'center' },
  jobTimeBubbleActive: { backgroundColor: COLORS.accent },
  jobTime:       { fontFamily: FONTS.familySemibold, fontSize: 12, color: COLORS.primary, textAlign: 'center' },
  jobTimeActive: { color: COLORS.white },
  jobBody:    { flex: 1 },
  jobService: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  jobClient:  { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  jobMeta:    { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  jobMetaText:{ fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },
  activePill: { backgroundColor: COLORS.accentLight, borderRadius: RADIUS.pill, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  activePillText: { fontFamily: FONTS.familySemibold, fontSize: 11, color: COLORS.accent },

  statsCard:  { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 16, ...SHADOW.card },
  cardTitle:  { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary, marginBottom: 12 },
  statRow:    { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border },
  statIcon:   { width: 30, height: 30, borderRadius: 8, backgroundColor: COLORS.primaryLight, alignItems: 'center', justifyContent: 'center' },
  statLabel:  { flex: 1, fontFamily: FONTS.family, fontSize: 13, color: COLORS.textSecondary },
  statValue:  { fontFamily: FONTS.familyBold, fontSize: 14, color: COLORS.textPrimary },
});
