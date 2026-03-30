// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/provider/OperatingAreasScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const AREAS = [
  { id: 'a1', name: 'El Cafetal',       city: 'Caracas', active: true },
  { id: 'a2', name: 'Altamira',         city: 'Caracas', active: true },
  { id: 'a3', name: 'Las Mercedes',     city: 'Caracas', active: true },
  { id: 'a4', name: 'La Castellana',    city: 'Caracas', active: false },
  { id: 'a5', name: 'Chacao',           city: 'Caracas', active: true },
];

export default function OperatingAreasScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [areas, setAreas] = useState(AREAS);

  const toggle = (id) =>
    setAreas((prev) => prev.map((a) => a.id === id ? { ...a, active: !a.active } : a));

  return (
    <View style={styles.root}>
      <FlatList
        data={areas}
        keyExtractor={(a) => a.id}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 32 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.hero}>
            <Ionicons name="map-outline" size={22} color={COLORS.white} style={{ marginBottom: 4 }} />
            <Text style={styles.heroTitle}>Service Areas</Text>
            <Text style={styles.heroSub}>Toggle the neighbourhoods where you accept jobs</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.areaCard}>
            <View style={styles.areaLeft}>
              <View style={[styles.areaIcon, { backgroundColor: item.active ? COLORS.accentLight : COLORS.background }]}>
                <Ionicons name="location-outline" size={16} color={item.active ? COLORS.accent : COLORS.inactive} />
              </View>
              <View>
                <Text style={styles.areaName}>{item.name}</Text>
                <Text style={styles.areaCity}>{item.city}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.toggle, item.active && styles.toggleOn]}
              onPress={() => toggle(item.id)}
              activeOpacity={0.8}
            >
              <View style={[styles.thumb, item.active && styles.thumbOn]} />
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => Alert.alert('Saved', 'Service areas updated.', [{ text: 'OK', onPress: () => navigation.goBack() }])}
            activeOpacity={0.85}
          >
            <Text style={styles.saveBtnText}>Save Areas</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  hero: { backgroundColor: COLORS.primary, borderRadius: RADIUS.lg, padding: 16, marginBottom: 14, alignItems: 'flex-start' },
  heroTitle: { fontFamily: FONTS.familyBold, fontSize: 18, color: COLORS.white },
  heroSub:   { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 },

  areaCard: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: 14, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 10, ...SHADOW.card,
  },
  areaLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  areaIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  areaName: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  areaCity: { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  toggle:   { width: 44, height: 24, borderRadius: 12, backgroundColor: COLORS.border, justifyContent: 'center', paddingHorizontal: 2 },
  toggleOn: { backgroundColor: COLORS.accent },
  thumb:    { width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.white },
  thumbOn:  { alignSelf: 'flex-end' },

  saveBtn:    { backgroundColor: COLORS.accent, borderRadius: RADIUS.pill, height: 52, alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  saveBtnText:{ fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.white },
});
