// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/provider/ProviderSettingsScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const SETTINGS = [
  { id: 'notif', icon: 'notifications-outline', label: 'Notifications',    sub: 'Job alerts, messages' },
  { id: 'lang',  icon: 'language-outline',      label: 'Language',         sub: 'Spanish / English' },
  { id: 'bank',  icon: 'card-outline',           label: 'Bank Details',     sub: 'Payout account' },
  { id: 'help',  icon: 'help-circle-outline',    label: 'Help Center',      sub: '' },
  { id: 'about', icon: 'information-circle-outline', label: 'About',        sub: 'Handyman v1.0.0' },
];

export default function ProviderSettingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 32 }}
      >
        <View style={styles.card}>
          {SETTINGS.map((s, i) => (
            <TouchableOpacity
              key={s.id}
              style={[styles.row, i === SETTINGS.length - 1 && { borderBottomWidth: 0 }]}
              onPress={() => s.id === 'bank' ? navigation.navigate('TaskerBankDetails') : s.id === 'help' ? navigation.navigate('HelpCenter') : null}
              activeOpacity={0.75}
            >
              <View style={styles.iconWrap}>
                <Ionicons name={s.icon} size={17} color={COLORS.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowLabel}>{s.label}</Text>
                {s.sub ? <Text style={styles.rowSub}>{s.sub}</Text> : null}
              </View>
              <Ionicons name="chevron-forward" size={15} color={COLORS.inactive} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:    { flex: 1, backgroundColor: COLORS.background },
  card:    { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 0, overflow: 'hidden', ...SHADOW.card },
  row:     { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border, gap: 12 },
  iconWrap:{ width: 36, height: 36, borderRadius: 9, backgroundColor: COLORS.primaryLight, alignItems: 'center', justifyContent: 'center' },
  rowLabel:{ fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  rowSub:  { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 1 },
});
