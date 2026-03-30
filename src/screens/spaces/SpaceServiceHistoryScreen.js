// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/spaces/SpaceServiceHistoryScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const HISTORY = [
  { id: 'h1', service: 'Plumbing Repair',     provider: 'Carlos Rodríguez', date: 'Mar 22, 2026', rating: 5, cost: '$120' },
  { id: 'h2', service: 'Electrical Panel',    provider: 'Marcos Díaz',      date: 'Mar 15, 2026', rating: 5, cost: '$180' },
  { id: 'h3', service: 'Deep Cleaning',       provider: 'Ana Martínez',     date: 'Mar 8, 2026',  rating: 5, cost: '$95' },
  { id: 'h4', service: 'Furniture Assembly',  provider: 'Pedro Suárez',     date: 'Feb 28, 2026', rating: 4, cost: '$75' },
  { id: 'h5', service: 'Painting – Living Rm',provider: 'Diego Romero',     date: 'Feb 14, 2026', rating: 5, cost: '$220' },
];

export default function SpaceServiceHistoryScreen({ route }) {
  const insets = useSafeAreaInsets();
  const space  = route?.params?.space ?? {};

  return (
    <View style={styles.root}>
      <FlatList
        data={HISTORY}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 32, gap: 10 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>{space.name ?? 'Space'}</Text>
            <Text style={styles.summarySub}>{HISTORY.length} services on record</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <View style={styles.dot} />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.service}>{item.service}</Text>
              <Text style={styles.provider}>{item.provider}</Text>
              <Text style={styles.date}>{item.date}</Text>
              <View style={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Ionicons key={i} name="star" size={11} color={i < item.rating ? COLORS.accent : COLORS.border} />
                ))}
              </View>
            </View>
            <Text style={styles.cost}>{item.cost}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  summaryCard: {
    backgroundColor: COLORS.primary, borderRadius: RADIUS.lg,
    padding: 16, marginBottom: 16,
  },
  summaryTitle: { fontFamily: FONTS.familyBold, fontSize: 16, color: COLORS.white },
  summarySub:   { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 3 },

  card: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: 14, flexDirection: 'row', alignItems: 'flex-start',
    gap: 12, ...SHADOW.card,
  },
  cardLeft: { paddingTop: 6 },
  dot:  { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.accent },
  cardBody: { flex: 1 },
  service:  { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  provider: { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  date:     { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary, marginTop: 3 },
  stars:    { flexDirection: 'row', gap: 2, marginTop: 4 },
  cost:     { fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.textPrimary },
});
