// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/services/ServiceCategoryScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const SERVICE_ITEMS = {
  technical: ['Electrical Wiring', 'Circuit Breaker Repair', 'Outlet Installation', 'Smart Home Setup', 'Plumbing Leak', 'Water Heater', 'AC Service', 'AC Installation'],
  cleaning:  ['Deep Cleaning', 'Regular Cleaning', 'Post-Construction Cleaning', 'Move-In Cleaning', 'Office Cleaning'],
  repairs:   ['Interior Painting', 'Exterior Painting', 'Drywall Patch', 'Tile Installation', 'Flooring', 'Carpentry', 'Door Repair'],
  moving:    ['Furniture Assembly', 'Furniture Moving', 'TV Mounting', 'Heavy Item Moving'],
  outdoor:   ['Garden Maintenance', 'Pressure Washing', 'Deck Building', 'Fence Repair', 'Gutter Cleaning'],
  urgent:    ['Emergency Plumbing', 'Power Outage', 'Lock-out', 'Emergency AC', 'Flood Response'],
};

export default function ServiceCategoryScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const group  = route?.params?.group ?? { key: 'technical', title: 'Technical Services', icon: 'flash-outline', bg: COLORS.primaryLight, color: COLORS.primary };
  const items  = SERVICE_ITEMS[group.key] ?? [];

  return (
    <View style={styles.root}>
      <FlatList
        data={items}
        keyExtractor={(s) => s}
        numColumns={2}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 32 }}
        columnWrapperStyle={{ gap: 10, marginBottom: 10 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={[styles.hero, { backgroundColor: group.color ?? COLORS.primary }]}>
            <View style={styles.heroIcon}>
              <Ionicons name={group.icon ?? 'cube-outline'} size={26} color={COLORS.white} />
            </View>
            <Text style={styles.heroTitle}>{group.title}</Text>
            <Text style={styles.heroSub}>{items.length} services available</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => navigation.navigate('BookService', { service: item })}
            activeOpacity={0.82}
          >
            <View style={[styles.serviceIcon, { backgroundColor: (group.bg ?? COLORS.primaryLight) }]}>
              <Ionicons name={group.icon ?? 'cube-outline'} size={18} color={group.color ?? COLORS.primary} />
            </View>
            <Text style={styles.serviceName}>{item}</Text>
            <Ionicons name="arrow-forward-outline" size={13} color={COLORS.textSecondary} style={{ alignSelf: 'flex-end', marginTop: 6 }} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  hero: {
    borderRadius: RADIUS.lg, padding: 20, marginBottom: 14,
    alignItems: 'flex-start', gap: 6,
  },
  heroIcon:  { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  heroTitle: { fontFamily: FONTS.familyBold, fontSize: 20, color: COLORS.white },
  heroSub:   { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.72)' },

  serviceCard: {
    flex: 1, backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: 14, gap: 8, ...SHADOW.card,
  },
  serviceIcon: { width: 38, height: 38, borderRadius: RADIUS.md, alignItems: 'center', justifyContent: 'center' },
  serviceName: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textPrimary, flex: 1 },
});
