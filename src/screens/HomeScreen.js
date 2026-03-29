// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/HomeScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../theme';

// ── Grid tile ─────────────────────────────────────────────────────────────────
function ServiceTile({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.tile} onPress={onPress} activeOpacity={0.82}>
      <Image
        source={{ uri: item.image }}
        style={styles.tileImage}
        resizeMode="cover"
      />
      <Text style={styles.tileLabel} numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const handleCategoryPress = (category) => {
    navigation.navigate('TaskLocation', { category });
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* ── Top bar ──────────────────────────────────────────────────── */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.locationPill} activeOpacity={0.7}>
            <Ionicons name="location-sharp" size={14} color={COLORS.accent} />
            <Text style={styles.locationText}>Caracas, VE</Text>
            <Ionicons name="chevron-down" size={13} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.avatarBtn}
            activeOpacity={0.75}
            onPress={() => navigation.navigate('ProfileTab')}
          >
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={17} color={COLORS.textOnPrimary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Search bar ───────────────────────────────────────────────── */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Search')}
          activeOpacity={0.82}
        >
          <View style={styles.searchIconWrap}>
            <Ionicons name="search" size={17} color={COLORS.textSecondary} />
          </View>
          <Text style={styles.searchPlaceholder} numberOfLines={1}>
            Try 'plumber' or 'mount TV'
          </Text>
        </TouchableOpacity>

        {/* ── Section header ────────────────────────────────────────────── */}
        <Text style={styles.sectionHeader}>Your Home Projects</Text>

        {/* ── 2-column grid of all 18 categories ───────────────────────── */}
        <FlatList
          data={CATEGORIES}
          renderItem={({ item }) => (
            <ServiceTile item={item} onPress={() => handleCategoryPress(item)} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const TILE_GAP = 12;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
    backgroundColor: COLORS.white,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 15,
    fontWeight: FONTS.semibold,
    color: COLORS.textPrimary,
  },
  avatarBtn: { padding: 2 },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Search bar
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    height: 52,
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.card,
  },
  searchIconWrap: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  // Section header
  sectionHeader: {
    fontSize: 20,
    fontWeight: FONTS.bold,
    color: COLORS.primary,
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  // Grid
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: TILE_GAP,
  },

  // Tile
  tile: {
    flex: 1,
    maxWidth: '48.5%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    ...SHADOW.card,
  },
  tileImage: {
    width: '100%',
    height: 110,
    backgroundColor: COLORS.surface,
  },
  tileLabel: {
    fontSize: 13,
    fontWeight: FONTS.semibold,
    color: COLORS.textPrimary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    lineHeight: 18,
  },
});
