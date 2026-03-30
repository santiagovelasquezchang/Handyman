// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/provider/ProviderJobsScreen.js
//  Work queue: Pending / Scheduled / Completed / Recurring top tabs.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { TopTabBar } from '../../components/ui';
import { TASKER_TASKS, TASKER_REQUESTS } from '../../../mockData';

const TABS = [
  { key: 'pending',   label: 'Pending'   },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'completed', label: 'Completed' },
  { key: 'recurring', label: 'Recurring' },
];

const STATUS_COLORS = {
  pending:   { bg: COLORS.accentLight,   text: COLORS.accent },
  upcoming:  { bg: COLORS.primaryLight,  text: COLORS.primary },
  completed: { bg: '#E8F5E9',            text: COLORS.success },
  recurring: { bg: '#F0E8FF',            text: '#7B3FFF' },
};

function JobCard({ job, onPress }) {
  const sc = STATUS_COLORS[job.status ?? 'upcoming'];
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.82}>
      <View style={styles.cardBody}>
        <Text style={styles.jobService}>{job.service ?? job.category}</Text>
        <Text style={styles.jobClient}>{job.client ?? job.clientName}</Text>
        <View style={styles.jobMeta}>
          <Ionicons name="calendar-outline" size={12} color={COLORS.textSecondary} />
          <Text style={styles.jobMetaText}>{job.date} {job.time ? `· ${job.time}` : ''}</Text>
        </View>
        {job.address && (
          <View style={styles.jobMeta}>
            <Ionicons name="location-outline" size={12} color={COLORS.textSecondary} />
            <Text style={styles.jobMetaText}>{job.address}</Text>
          </View>
        )}
      </View>
      <View style={{ alignItems: 'flex-end', gap: 8 }}>
        <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
          <Text style={[styles.statusText, { color: sc.text }]}>
            {job.status ?? 'scheduled'}
          </Text>
        </View>
        {job.rate && <Text style={styles.jobRate}>{job.rate}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const PENDING_DATA   = (TASKER_REQUESTS ?? []).map((r) => ({ ...r, service: r.category, client: r.clientName ?? 'Client', status: 'pending' }));
const SCHEDULED_DATA = (TASKER_TASKS?.upcoming ?? []).map((t) => ({ ...t, status: 'upcoming' }));
const COMPLETED_DATA = (TASKER_TASKS?.completed ?? []).map((t) => ({ ...t, status: 'completed' }));
const RECURRING_DATA = [
  { id: 'rec1', service: 'Weekly Cleaning', client: 'María González', date: 'Every Friday', status: 'recurring', rate: '$95' },
  { id: 'rec2', service: 'Monthly AC',      client: 'Carlos Pérez',   date: 'Monthly',      status: 'recurring', rate: '$80' },
];

export default function ProviderJobsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState('pending');

  const data =
    tab === 'pending'   ? PENDING_DATA   :
    tab === 'scheduled' ? SCHEDULED_DATA :
    tab === 'completed' ? COMPLETED_DATA :
    RECURRING_DATA;

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Jobs</Text>
      </View>

      <TopTabBar tabs={TABS} active={tab} onSelect={setTab} />

      <FlatList
        data={data}
        keyExtractor={(i) => String(i.id)}
        contentContainerStyle={{ padding: 16, paddingBottom: 32, gap: 10 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => navigation.navigate('JobDetails', { job: item })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="briefcase-outline" size={34} color={COLORS.border} />
            <Text style={styles.emptyText}>No {tab} jobs</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  header: { backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 18 },
  headerTitle: { fontFamily: FONTS.familyBold, fontSize: 22, color: COLORS.white },

  card: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    ...SHADOW.card,
  },
  cardBody:    { flex: 1, marginRight: 10 },
  jobService:  { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  jobClient:   { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  jobMeta:     { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  jobMetaText: { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },
  statusBadge: { borderRadius: RADIUS.pill, paddingHorizontal: 9, paddingVertical: 4 },
  statusText:  { fontFamily: FONTS.familySemibold, fontSize: 11 },
  jobRate:     { fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.accent },

  empty:     { alignItems: 'center', paddingVertical: 64, gap: 10 },
  emptyText: { fontFamily: FONTS.familyMedium, fontSize: 14, color: COLORS.textSecondary },
});
