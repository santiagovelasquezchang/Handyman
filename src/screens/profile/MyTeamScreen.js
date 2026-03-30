// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/profile/MyTeamScreen.js
//  Evolution of "Favorites" — trusted provider relationships.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { TopTabBar } from '../../components/ui';

const TABS = [
  { key: 'trusted',  label: 'Trusted'  },
  { key: 'recent',   label: 'Recent'   },
  { key: 'favorites',label: 'Favorites' },
];

const PROVIDERS = {
  trusted: [
    { id: 't1', name: 'Carlos Rodríguez', specialty: 'Plumbing & Electrical', rating: 4.9, jobs: 8,  avatar: 'https://i.pravatar.cc/150?img=3',  trusted: true },
    { id: 't2', name: 'Ana Martínez',     specialty: 'Cleaning',              rating: 5.0, jobs: 12, avatar: 'https://i.pravatar.cc/150?img=5',  trusted: true },
  ],
  recent: [
    { id: 'r1', name: 'Marcos Díaz',      specialty: 'Electrical',   rating: 4.8, jobs: 2, avatar: 'https://i.pravatar.cc/150?img=7',  lastJob: 'Mar 15, 2026' },
    { id: 'r2', name: 'Pedro Suárez',     specialty: 'Furniture',    rating: 4.7, jobs: 1, avatar: 'https://i.pravatar.cc/150?img=12', lastJob: 'Mar 8, 2026' },
    { id: 'r3', name: 'Diego Romero',     specialty: 'Painting',     rating: 5.0, jobs: 1, avatar: 'https://i.pravatar.cc/150?img=15', lastJob: 'Feb 14, 2026' },
  ],
  favorites: [
    { id: 'f1', name: 'Carlos Rodríguez', specialty: 'Plumbing & Electrical', rating: 4.9, jobs: 8, avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 'f2', name: 'Ana Martínez',     specialty: 'Cleaning',              rating: 5.0, jobs: 12, avatar: 'https://i.pravatar.cc/150?img=5' },
  ],
};

function ProviderCard({ provider, tab }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: provider.avatar }} style={styles.avatar} />
      <View style={styles.cardBody}>
        <View style={styles.nameRow}>
          <Text style={styles.providerName}>{provider.name}</Text>
          {provider.trusted && (
            <View style={styles.trustedBadge}>
              <Ionicons name="shield-checkmark" size={11} color={COLORS.success} />
              <Text style={styles.trustedText}>Trusted</Text>
            </View>
          )}
        </View>
        <Text style={styles.specialty}>{provider.specialty}</Text>
        <View style={styles.metaRow}>
          <Ionicons name="star" size={12} color={COLORS.accent} />
          <Text style={styles.metaText}>{provider.rating}</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{provider.jobs} jobs with you</Text>
          {provider.lastJob && (
            <>
              <Text style={styles.metaDot}>·</Text>
              <Text style={styles.metaText}>Last: {provider.lastJob}</Text>
            </>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.bookBtn}>
        <Text style={styles.bookBtnText}>Book</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function MyTeamScreen() {
  const insets = useSafeAreaInsets();
  const [tab,   setTab]  = useState('trusted');
  const data = PROVIDERS[tab] ?? [];

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>My Team</Text>
        <Text style={styles.heroSub}>Your trusted service providers</Text>
      </View>

      <TopTabBar tabs={TABS} active={tab} onSelect={setTab} />

      <FlatList
        data={data}
        keyExtractor={(p) => p.id}
        contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ProviderCard provider={item} tab={tab} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="people-outline" size={34} color={COLORS.border} />
            <Text style={styles.emptyText}>No providers here yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  hero: { backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 20 },
  heroTitle: { fontFamily: FONTS.familyBold, fontSize: 22, color: COLORS.white },
  heroSub:   { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 3 },

  card: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12,
    ...SHADOW.card,
  },
  avatar:   { width: 50, height: 50, borderRadius: 25 },
  cardBody: { flex: 1 },
  nameRow:  { flexDirection: 'row', alignItems: 'center', gap: 6 },
  providerName: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  trustedBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: '#E8F5E9', borderRadius: RADIUS.pill, paddingHorizontal: 7, paddingVertical: 2 },
  trustedText:  { fontFamily: FONTS.familySemibold, fontSize: 10, color: COLORS.success },
  specialty:    { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  metaRow:      { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4, flexWrap: 'wrap' },
  metaText:     { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },
  metaDot:      { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },

  bookBtn:    { backgroundColor: COLORS.accentLight, borderRadius: RADIUS.pill, paddingHorizontal: 14, paddingVertical: 7 },
  bookBtnText:{ fontFamily: FONTS.familySemibold, fontSize: 12, color: COLORS.accent },

  empty:     { alignItems: 'center', paddingVertical: 48, gap: 10 },
  emptyText: { fontFamily: FONTS.familyMedium, fontSize: 14, color: COLORS.textSecondary },
});
