// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/spaces/SpacesListScreen.js
//  First-class spaces — the property / location layer.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const SPACE_TYPES = {
  home:     { icon: 'home-outline',     color: COLORS.primary,  bg: COLORS.primaryLight },
  apartment:{ icon: 'business-outline', color: '#4A6CF7',        bg: '#E8F0FE' },
  office:   { icon: 'briefcase-outline',color: COLORS.accent,    bg: COLORS.accentLight },
  store:    { icon: 'storefront-outline',color: '#2E8B57',       bg: '#E8F5E9' },
};

const INITIAL_SPACES = [
  {
    id: 's1', name: 'Home – Caracas', type: 'home',
    address: 'Urb. El Cafetal, Caracas', activeRecurring: 2, lastService: 'Mar 22, 2026',
  },
  {
    id: 's2', name: 'Office – Las Mercedes', type: 'office',
    address: 'Av. Principal Las Mercedes', activeRecurring: 1, lastService: 'Mar 15, 2026',
  },
];

function SpaceCard({ space, onPress }) {
  const meta = SPACE_TYPES[space.type] ?? SPACE_TYPES.home;
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.82}>
      <View style={[styles.spaceIconWrap, { backgroundColor: meta.bg }]}>
        <Ionicons name={meta.icon} size={24} color={meta.color} />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.spaceName}>{space.name}</Text>
        <Text style={styles.spaceAddress}>{space.address}</Text>
        <View style={styles.statRow}>
          {space.activeRecurring > 0 && (
            <View style={styles.statChip}>
              <Ionicons name="repeat-outline" size={11} color={COLORS.accent} />
              <Text style={styles.statChipText}>{space.activeRecurring} recurring</Text>
            </View>
          )}
          <View style={styles.statChip}>
            <Ionicons name="time-outline" size={11} color={COLORS.textSecondary} />
            <Text style={styles.statChipText}>Last: {space.lastService}</Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={16} color={COLORS.inactive} />
    </TouchableOpacity>
  );
}

export default function SpacesListScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [spaces] = useState(INITIAL_SPACES);

  return (
    <View style={styles.root}>
      <FlatList
        data={spaces}
        keyExtractor={(s) => s.id}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 32, gap: 12 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Hero */}
            <View style={styles.hero}>
              <Ionicons name="map-outline" size={24} color={COLORS.white} style={{ marginBottom: 6 }} />
              <Text style={styles.heroTitle}>My Spaces</Text>
              <Text style={styles.heroSub}>
                Manage your properties and their maintenance history.
              </Text>
            </View>

            {/* Add space button */}
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigation.navigate('AddSpace')}
              activeOpacity={0.85}
            >
              <Ionicons name="add-circle-outline" size={20} color={COLORS.accent} />
              <Text style={styles.addBtnText}>Add New Space</Text>
            </TouchableOpacity>

            <Text style={styles.sectionLabel}>Your Spaces</Text>
          </>
        }
        renderItem={({ item }) => (
          <SpaceCard
            space={item}
            onPress={() => navigation.navigate('SpaceDetails', { space: item })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="map-outline" size={36} color={COLORS.border} />
            <Text style={styles.emptyTitle}>No Spaces Yet</Text>
            <Text style={styles.emptySub}>
              Add your home or office to keep all services organised in one place.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  hero: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    padding: 20,
    marginBottom: 12,
  },
  heroTitle: { fontFamily: FONTS.familyBold, fontSize: 22, color: COLORS.white },
  heroSub:   { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.72)', marginTop: 4, lineHeight: 19 },

  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.accent,
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  addBtnText: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.accent },

  sectionLabel: { fontFamily: FONTS.familySemibold, fontSize: 15, color: COLORS.textPrimary, marginBottom: 4 },

  card: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: 14, flexDirection: 'row', alignItems: 'center', gap: 14,
    ...SHADOW.card,
  },
  spaceIconWrap: { width: 48, height: 48, borderRadius: RADIUS.md, alignItems: 'center', justifyContent: 'center' },
  cardBody:      { flex: 1 },
  spaceName:     { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  spaceAddress:  { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  statRow:       { flexDirection: 'row', gap: 8, marginTop: 6, flexWrap: 'wrap' },
  statChip:      { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: COLORS.background, borderRadius: RADIUS.pill, paddingHorizontal: 8, paddingVertical: 3 },
  statChipText:  { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },

  empty:      { alignItems: 'center', paddingTop: 40, gap: 10 },
  emptyTitle: { fontFamily: FONTS.familyBold, fontSize: 16, color: COLORS.textPrimary },
  emptySub:   { fontFamily: FONTS.family, fontSize: 13, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 19 },
});
