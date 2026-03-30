// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/provider/JobDetailsScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={15} color={COLORS.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value ?? '—'}</Text>
      </View>
    </View>
  );
}

export default function JobDetailsScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const job    = route?.params?.job ?? {};
  const isPending   = job.status === 'pending';
  const isCompleted = job.status === 'completed';

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      >
        {/* Status banner */}
        <View style={[styles.banner, {
          backgroundColor: isCompleted ? COLORS.success : isPending ? COLORS.accent : COLORS.primary,
        }]}>
          <Ionicons name={isCompleted ? 'checkmark-circle' : isPending ? 'time' : 'briefcase'} size={26} color={COLORS.white} />
          <View style={{ marginLeft: 14 }}>
            <Text style={styles.bannerService}>{job.service ?? job.category ?? 'Job'}</Text>
            <Text style={styles.bannerStatus}>{job.status ?? 'scheduled'}</Text>
          </View>
          {job.rate && <Text style={styles.bannerRate}>{job.rate}</Text>}
        </View>

        <View style={styles.body}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Job Details</Text>
            <InfoRow icon="person-outline"   label="Client"   value={job.client ?? job.clientName} />
            <InfoRow icon="calendar-outline" label="Date"     value={job.date} />
            <InfoRow icon="time-outline"     label="Time"     value={job.time} />
            <InfoRow icon="location-outline" label="Address"  value={job.address} />
            <InfoRow icon="cube-outline"     label="Service"  value={job.service ?? job.category} />
          </View>

          {/* Action bar */}
          {!isCompleted && (
            <View style={styles.actionsCard}>
              {isPending ? (
                <>
                  <TouchableOpacity style={styles.acceptBtn} onPress={() => Alert.alert('Accepted', 'Job accepted successfully.')}>
                    <Ionicons name="checkmark-circle-outline" size={16} color={COLORS.white} style={{ marginRight: 6 }} />
                    <Text style={styles.acceptBtnText}>Accept Job</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.declineBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.declineBtnText}>Decline</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity style={styles.chatBtn}
                    onPress={() => navigation.navigate('Chat', { conversationId: 'conv1' })}>
                    <Ionicons name="chatbubble-outline" size={16} color={COLORS.primary} style={{ marginRight: 6 }} />
                    <Text style={styles.chatBtnText}>Message Client</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.completeBtn}
                    onPress={() => Alert.alert('Complete', 'Mark this job as complete?', [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Complete', onPress: () => navigation.goBack() },
                    ])}>
                    <Text style={styles.completeBtnText}>Mark Complete</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  banner: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 22,
  },
  bannerService: { fontFamily: FONTS.familyBold, fontSize: 18, color: COLORS.white },
  bannerStatus:  { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.78)', marginTop: 2 },
  bannerRate:    { marginLeft: 'auto', fontFamily: FONTS.familyBold, fontSize: 20, color: COLORS.white },

  body:      { padding: 16, gap: 14 },
  card:      { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 16, gap: 12, ...SHADOW.card },
  cardTitle: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary, marginBottom: 2 },

  infoRow:   { flexDirection: 'row', gap: 10 },
  infoIcon:  { width: 28, height: 28, borderRadius: 7, backgroundColor: COLORS.primaryLight, alignItems: 'center', justifyContent: 'center' },
  infoLabel: { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },
  infoValue: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textPrimary, marginTop: 1 },

  actionsCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 16, gap: 10, ...SHADOW.card },
  acceptBtn:   { backgroundColor: COLORS.accent, borderRadius: RADIUS.pill, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  acceptBtnText: { fontFamily: FONTS.familyBold, fontSize: 14, color: COLORS.white },
  declineBtn:  { borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.pill, height: 50, alignItems: 'center', justifyContent: 'center' },
  declineBtnText: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textSecondary },
  chatBtn:     { borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: RADIUS.pill, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  chatBtnText: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.primary },
  completeBtn: { backgroundColor: COLORS.primary, borderRadius: RADIUS.pill, height: 50, alignItems: 'center', justifyContent: 'center' },
  completeBtnText: { fontFamily: FONTS.familyBold, fontSize: 14, color: COLORS.white },
});
