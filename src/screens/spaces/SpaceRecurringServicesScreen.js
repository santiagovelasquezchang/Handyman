// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/spaces/SpaceRecurringServicesScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const RECURRING = [
  { id: 'r1', service: 'Weekly Cleaning', provider: 'Ana Martínez', frequency: 'Every Friday', next: 'Apr 4, 2026', icon: 'sparkles-outline' },
  { id: 'r2', service: 'AC Maintenance',  provider: 'Carlos Rodríguez', frequency: 'Monthly',  next: 'Apr 18, 2026', icon: 'snow-outline' },
];

export default function SpaceRecurringServicesScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const space  = route?.params?.space ?? {};

  return (
    <View style={styles.root}>
      <FlatList
        data={RECURRING}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 32, gap: 10 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Recurring Services</Text>
              <Text style={styles.headerSub}>{space.name ?? 'Space'}</Text>
            </View>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigation.navigate('SetUpRecurringService', { space })}
              activeOpacity={0.85}
            >
              <Ionicons name="add-circle-outline" size={18} color={COLORS.accent} />
              <Text style={styles.addBtnText}>Add Recurring Service</Text>
            </TouchableOpacity>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RecurringServiceDetails', { service: { ...item, space: space.name } })}
            activeOpacity={0.82}
          >
            <View style={styles.cardIcon}>
              <Ionicons name={item.icon} size={20} color={COLORS.accent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.service}>{item.service}</Text>
              <Text style={styles.provider}>{item.provider}</Text>
              <View style={styles.metaRow}>
                <Ionicons name="repeat-outline" size={12} color={COLORS.textSecondary} />
                <Text style={styles.metaText}>{item.frequency}</Text>
                <Text style={styles.metaDot}>·</Text>
                <Text style={styles.metaText}>Next: {item.next}</Text>
              </View>
            </View>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>Active</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="repeat-outline" size={34} color={COLORS.border} />
            <Text style={styles.emptyText}>No recurring services yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  header: {
    backgroundColor: COLORS.primary, borderRadius: RADIUS.lg,
    padding: 16, marginBottom: 10,
  },
  headerTitle: { fontFamily: FONTS.familyBold, fontSize: 17, color: COLORS.white },
  headerSub:   { fontFamily: FONTS.family, fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 3 },

  addBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: 14, borderWidth: 1.5, borderColor: COLORS.accent,
    borderStyle: 'dashed', marginBottom: 6,
  },
  addBtnText: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.accent },

  card: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12,
    ...SHADOW.card,
  },
  cardIcon:    { width: 42, height: 42, borderRadius: RADIUS.md, backgroundColor: COLORS.accentLight, alignItems: 'center', justifyContent: 'center' },
  service:     { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  provider:    { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  metaRow:     { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  metaText:    { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },
  metaDot:     { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },
  activeBadge: { backgroundColor: '#E8F5E9', borderRadius: RADIUS.pill, paddingHorizontal: 9, paddingVertical: 4 },
  activeBadgeText: { fontFamily: FONTS.familySemibold, fontSize: 11, color: COLORS.success },

  empty:     { alignItems: 'center', paddingVertical: 48, gap: 10 },
  emptyText: { fontFamily: FONTS.familyMedium, fontSize: 14, color: COLORS.textSecondary },
});
