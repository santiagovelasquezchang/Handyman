// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/services/EmergencyRequestScreen.js
//  Urgent / same-hour dispatch flow.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const URGENT_TYPES = [
  { id: 'plumbing',  label: 'Burst Pipe / Flood',  icon: 'water-outline',   color: '#4A6CF7' },
  { id: 'electric',  label: 'Power / Electrical',  icon: 'flash-outline',   color: '#F7B84A' },
  { id: 'lockout',   label: 'Lock-out Help',        icon: 'key-outline',     color: COLORS.accent },
  { id: 'gas',       label: 'Gas Issue',            icon: 'flame-outline',   color: '#E53E3E' },
  { id: 'ac',        label: 'AC Failure',           icon: 'snow-outline',    color: '#4A9CF7' },
  { id: 'other',     label: 'Other Urgent Issue',   icon: 'warning-outline', color: COLORS.textSecondary },
];

export default function EmergencyRequestScreen({ navigation }) {
  const insets    = useSafeAreaInsets();
  const [selected, setSelected] = useState(null);

  const handleRequest = () => {
    if (!selected) {
      Alert.alert('Select Issue', 'Please select the type of urgent issue.');
      return;
    }
    Alert.alert(
      'Finding Provider',
      'We are matching you with the nearest available provider. Typical arrival: 30–60 min.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 32 }]}
      >
        {/* Urgency banner */}
        <View style={styles.banner}>
          <Ionicons name="flash-circle" size={28} color={COLORS.white} />
          <View>
            <Text style={styles.bannerTitle}>Urgent Help</Text>
            <Text style={styles.bannerSub}>Provider dispatched within 60 minutes</Text>
          </View>
        </View>

        {/* ETA indicator */}
        <View style={styles.etaRow}>
          {[
            { icon: 'time-outline',     label: 'ETA 30-60 min' },
            { icon: 'star-outline',     label: 'Verified providers' },
            { icon: 'shield-checkmark-outline', label: 'Guaranteed service' },
          ].map((e) => (
            <View key={e.label} style={styles.etaItem}>
              <Ionicons name={e.icon} size={18} color={COLORS.accent} />
              <Text style={styles.etaText}>{e.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionLabel}>What is the issue?</Text>
        <View style={styles.issueGrid}>
          {URGENT_TYPES.map((t) => (
            <TouchableOpacity
              key={t.id}
              style={[styles.issueCard, selected === t.id && styles.issueCardActive]}
              onPress={() => setSelected(t.id)}
              activeOpacity={0.8}
            >
              <Ionicons name={t.icon} size={22} color={selected === t.id ? COLORS.white : t.color} />
              <Text style={[styles.issueLabel, selected === t.id && styles.issueLabelActive]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.requestBtn} onPress={handleRequest} activeOpacity={0.88}>
          <Ionicons name="flash" size={18} color={COLORS.white} style={{ marginRight: 8 }} />
          <Text style={styles.requestBtnText}>Request Urgent Help</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Urgent bookings may include a priority dispatch fee. You will be shown the estimate before confirming.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 16 },

  banner: {
    backgroundColor: '#E53E3E',
    borderRadius: RADIUS.lg,
    padding: 16, flexDirection: 'row',
    alignItems: 'center', gap: 14, marginBottom: 14,
  },
  bannerTitle: { fontFamily: FONTS.familyBold, fontSize: 17, color: COLORS.white },
  bannerSub:   { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.82)', marginTop: 2 },

  etaRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  etaItem:{ flex: 1, backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 10, alignItems: 'center', gap: 5, ...SHADOW.card },
  etaText:{ fontFamily: FONTS.familySemibold, fontSize: 10, color: COLORS.textPrimary, textAlign: 'center' },

  sectionLabel: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textSecondary, letterSpacing: 0.3, textTransform: 'uppercase', marginBottom: 10 },

  issueGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  issueCard: {
    width: '47%', backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: 14, gap: 8, borderWidth: 1.5, borderColor: COLORS.border, ...SHADOW.card,
  },
  issueCardActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  issueLabel:      { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textPrimary },
  issueLabelActive:{ color: COLORS.white },

  requestBtn: {
    backgroundColor: '#E53E3E', borderRadius: RADIUS.pill,
    height: 54, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginBottom: 12,
  },
  requestBtnText: { fontFamily: FONTS.familyBold, fontSize: 16, color: COLORS.white },

  disclaimer: { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 18 },
});
