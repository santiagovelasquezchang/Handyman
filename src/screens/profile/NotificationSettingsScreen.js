// ─────────────────────────────────────────────────────────────────────────────
//  NotificationSettingsScreen  –  Push / Email toggles  [STUB – Phase 1]
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { NOTIFICATION_SETTINGS } from '../../../mockData';

export default function NotificationSettingsScreen() {
  const insets = useSafeAreaInsets();

  // Flatten into a mutable map: { [id]: { push, email } }
  const initial = {};
  NOTIFICATION_SETTINGS.forEach((sec) =>
    sec.items.forEach((item) => {
      initial[item.id] = { push: item.push, email: item.email };
    })
  );
  const [settings, setSettings] = useState(initial);

  const toggle = (id, channel) =>
    setSettings((s) => ({ ...s, [id]: { ...s[id], [channel]: !s[id][channel] } }));

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]}
    >
      {NOTIFICATION_SETTINGS.map((section) => (
        <View key={section.id}>
          <Text style={styles.sectionTitle}>{section.category}</Text>
          <View style={styles.card}>
            {section.items.map((item, i) => (
              <View key={item.id}>
                {i > 0 && <View style={styles.divider} />}
                <View style={styles.row}>
                  <Text style={styles.itemLabel}>{item.label}</Text>
                  <View style={styles.toggles}>
                    <View style={styles.toggleCol}>
                      <Text style={styles.channelLabel}>Push</Text>
                      <Switch
                        value={settings[item.id].push}
                        onValueChange={() => toggle(item.id, 'push')}
                        trackColor={{ false: COLORS.surface, true: COLORS.accent }}
                        thumbColor={COLORS.white}
                      />
                    </View>
                    <View style={styles.toggleCol}>
                      <Text style={styles.channelLabel}>Email</Text>
                      <Switch
                        value={settings[item.id].email}
                        onValueChange={() => toggle(item.id, 'email')}
                        trackColor={{ false: COLORS.surface, true: COLORS.accent }}
                        thumbColor={COLORS.white}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root:    { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, gap: 8 },

  sectionTitle: {
    fontSize: 12, fontWeight: FONTS.bold, color: COLORS.textSecondary,
    textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 6, marginLeft: 4,
  },
  card: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.md,
    overflow: 'hidden', ...SHADOW.card, marginBottom: 16,
  },
  divider: { height: 1, backgroundColor: COLORS.border },
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, gap: 12,
  },
  itemLabel: { flex: 1, fontSize: 14, color: COLORS.textPrimary, fontWeight: FONTS.medium },
  toggles:   { flexDirection: 'row', gap: 20 },
  toggleCol: { alignItems: 'center', gap: 4 },
  channelLabel: { fontSize: 11, color: COLORS.textSecondary, fontWeight: FONTS.semibold },
});
