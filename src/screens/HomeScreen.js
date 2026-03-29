// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/HomeScreen.js
//
//  ┌──────────────────────────────────────────┐  ← STICKY (never scrolls)
//  │  [text_logo.png  large centered]         │
//  │  Hi [Name], What can we help you with?   │
//  │  [           Search bar              ]   │
//  └──────────────────────────────────────────┘
//  ┌──────────────────────────────────────────┐  ← SCROLLABLE
//  │  Spring Favorites       →orizontal list  │
//  │  Moving Checklist       →orizontal list  │
//  │  Home Improvement       →orizontal list  │
//  │  Quick Fixes            →orizontal list  │
//  │  All Categories         2-column grid    │
//  └──────────────────────────────────────────┘
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, FlatList,
  TouchableOpacity, Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { HOME_SECTIONS, CATEGORIES, getSectionCategories } from '../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../theme';
import { LogoText } from '../components/Logo';
import i18n from '../i18n';
import { useAuth } from '../context/AuthContext';

const CARD_SIZE = 130;

// ── Carousel card ─────────────────────────────────────────────────────────────
function CarouselCard({ category, onPress }) {
  return (
    <TouchableOpacity
      style={styles.carouselCard}
      onPress={() => onPress(category)}
      activeOpacity={0.82}
    >
      <Image source={{ uri: category.image }} style={StyleSheet.absoluteFill} resizeMode="cover" />
      <View style={styles.carouselOverlay} />
      <Text style={styles.carouselLabel} numberOfLines={2}>{category.name}</Text>
    </TouchableOpacity>
  );
}

// ── Horizontal carousel section (NO "See All" button) ────────────────────────
function CarouselSection({ section, onPress }) {
  const cats  = getSectionCategories(section);
  const title = i18n.locale.startsWith('es') && section.titleEs
    ? section.titleEs
    : section.title;

  return (
    <View style={styles.carouselSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={cats}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselList}
        renderItem={({ item }) => <CarouselCard category={item} onPress={onPress} />}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      />
    </View>
  );
}

// ── All Categories 2-col grid ─────────────────────────────────────────────────
function AllCategoriesGrid({ onPress }) {
  const rows = [];
  for (let i = 0; i < CATEGORIES.length; i += 2) rows.push(CATEGORIES.slice(i, i + 2));

  return (
    <View style={styles.allCatsSection}>
      <Text style={styles.sectionTitle}>{i18n.t('home.allCategories')}</Text>
      <View style={styles.gridContainer}>
        {rows.map((row, ri) => (
          <View key={ri} style={styles.gridRow}>
            {row.map((cat) => (
              <TouchableOpacity key={cat.id} style={styles.gridTile} onPress={() => onPress(cat)} activeOpacity={0.82}>
                <Image source={{ uri: cat.image }} style={styles.gridImage} resizeMode="cover" />
                <Text style={styles.gridLabel} numberOfLines={2}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
            {row.length === 1 && <View style={styles.gridTileSpacer} />}
          </View>
        ))}
      </View>
    </View>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function HomeScreen({ navigation }) {
  const insets    = useSafeAreaInsets();
  const { user }  = useAuth();
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  const handleCategoryPress = (category) => navigation.navigate('TaskLocation', { category });

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>

      {/* ══════════════  STICKY HEADER  ══════════════ */}
      <View style={styles.stickyHeader}>
        {/* Row 1: Large text logo */}
        <View style={styles.logoRow}>
          <LogoText fontSize={26} color={COLORS.primary} />
        </View>

        {/* Row 2: Greeting */}
        <Text style={styles.greeting} numberOfLines={1}>
          {i18n.t('home.greeting', { name: firstName })}
        </Text>

        {/* Row 3: Search bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Search')}
          activeOpacity={0.85}
        >
          <Ionicons name="search" size={16} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
          <Text style={styles.searchPlaceholder} numberOfLines={1}>
            {i18n.t('home.searchPlaceholder')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ══════════════  SCROLLABLE CONTENT  ══════════════ */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {HOME_SECTIONS.map((section) => (
          <CarouselSection key={section.id} section={section} onPress={handleCategoryPress} />
        ))}
        <AllCategoriesGrid onPress={handleCategoryPress} />
      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  // Sticky header
  stickyHeader: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
    ...SHADOW.bar,
    gap: 8,
  },
  logoRow: {
    alignItems: 'center',
    paddingVertical: 2,
  },
  greeting: {
    fontFamily: FONTS.familyMedium,
    fontSize: 14,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    height: 46,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    marginTop: 2,
  },
  searchPlaceholder: {
    flex: 1,
    fontFamily: FONTS.family,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  // Scroll
  scrollContent: { paddingBottom: 40 },

  // Carousel section
  carouselSection: { marginTop: 22 },
  sectionTitle: {
    fontFamily: FONTS.familyBold,
    fontSize: 17,
    color: COLORS.primary,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  carouselList: { paddingHorizontal: 16 },
  carouselCard: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    ...SHADOW.card,
  },
  carouselOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26,55,77,0.44)',
  },
  carouselLabel: {
    fontFamily: FONTS.familyBold,
    fontSize: 12,
    color: COLORS.white,
    paddingHorizontal: 8,
    paddingBottom: 8,
    lineHeight: 16,
  },

  // All Categories grid
  allCatsSection: { marginTop: 28, paddingHorizontal: 16 },
  gridContainer: { marginTop: 10, gap: 10 },
  gridRow: { flexDirection: 'row', gap: 10 },
  gridTile: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    ...SHADOW.card,
  },
  gridTileSpacer: { flex: 1 },
  gridImage: { width: '100%', height: 100, backgroundColor: COLORS.surface },
  gridLabel: {
    fontFamily: FONTS.familySemibold,
    fontSize: 13,
    color: COLORS.textPrimary,
    padding: 10,
    lineHeight: 18,
  },
});
