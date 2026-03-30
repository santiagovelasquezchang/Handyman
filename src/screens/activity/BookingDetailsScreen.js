// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/activity/BookingDetailsScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={16} color={COLORS.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function BookingDetailsScreen({ route, navigation }) {
  const insets  = useSafeAreaInsets();
  const booking = route?.params?.booking ?? {};
  const isCompleted = !!booking.rating;

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      >
        {/* Status banner */}
        <View style={[styles.banner, { backgroundColor: isCompleted ? COLORS.success : COLORS.primary }]}>
          <Ionicons
            name={isCompleted ? 'checkmark-circle' : 'calendar'}
            size={28} color={COLORS.white}
          />
          <View style={{ marginLeft: 14 }}>
            <Text style={styles.bannerService}>{booking.service ?? 'Service Booking'}</Text>
            <Text style={styles.bannerStatus}>{isCompleted ? 'Completed' : booking.status ?? 'Scheduled'}</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* Details card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Booking Details</Text>
            <InfoRow icon="person-outline"   label="Provider"   value={booking.provider ?? '—'} />
            <InfoRow icon="calendar-outline" label="Date"       value={booking.date     ?? '—'} />
            {booking.time && <InfoRow icon="time-outline"     label="Time"       value={booking.time} />}
            {booking.space && <InfoRow icon="location-outline" label="Location"   value={booking.space} />}
          </View>

          {/* Rating card (completed only) */}
          {isCompleted && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Your Rating</Text>
              <View style={styles.starsRow}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Ionicons key={i} name="star" size={22}
                    color={i < booking.rating ? COLORS.accent : COLORS.border} />
                ))}
              </View>
            </View>
          )}

          {/* Actions */}
          <View style={styles.actionsCard}>
            {!isCompleted && (
              <TouchableOpacity style={styles.primaryBtn}
                onPress={() => navigation.navigate('Chat', { conversationId: 'conv1' })}>
                <Ionicons name="chatbubble-outline" size={16} color={COLORS.white} style={{ marginRight: 8 }} />
                <Text style={styles.primaryBtnText}>Message Provider</Text>
              </TouchableOpacity>
            )}
            {isCompleted && (
              <TouchableOpacity style={styles.primaryBtn}>
                <Ionicons name="repeat-outline" size={16} color={COLORS.white} style={{ marginRight: 8 }} />
                <Text style={styles.primaryBtnText}>Rebook This Service</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.secondaryBtn}
              onPress={() => navigation.navigate('SetUpRecurringService', { service: booking })}>
              <Ionicons name="refresh-outline" size={16} color={COLORS.primary} style={{ marginRight: 8 }} />
              <Text style={styles.secondaryBtnText}>Set as Recurring</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  banner: {
    paddingHorizontal: 20, paddingVertical: 24,
    flexDirection: 'row', alignItems: 'center',
  },
  bannerService: { fontFamily: FONTS.familyBold, fontSize: 18, color: COLORS.white },
  bannerStatus:  { fontFamily: FONTS.family,     fontSize: 13, color: 'rgba(255,255,255,0.78)', marginTop: 2 },

  body: { padding: 16, gap: 14 },

  card: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: 16, gap: 12, ...SHADOW.card,
  },
  cardTitle: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary, marginBottom: 2 },

  infoRow:   { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  infoIcon:  { width: 28, height: 28, borderRadius: 8, backgroundColor: COLORS.primaryLight, alignItems: 'center', justifyContent: 'center' },
  infoLabel: { fontFamily: FONTS.family,      fontSize: 11, color: COLORS.textSecondary },
  infoValue: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textPrimary, marginTop: 1 },

  starsRow:  { flexDirection: 'row', gap: 4 },

  actionsCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 16, gap: 10, ...SHADOW.card },

  primaryBtn: {
    backgroundColor: COLORS.accent, borderRadius: RADIUS.pill,
    height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  primaryBtnText: { fontFamily: FONTS.familyBold, fontSize: 14, color: COLORS.white },

  secondaryBtn: {
    borderWidth: 1.5, borderColor: COLORS.primary, borderRadius: RADIUS.pill,
    height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  secondaryBtnText: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.primary },
});
