// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/HomeScreen.js  –  Premium UI (Uber / Airbnb tier)
//
//  Layout:
//   ┌─────────────────────────────────────┐  ← Navy safe-area header
//   │  HANDYMAN  (white, letterSpacing:2) │    scrolls OFF screen
//   │  Hi [Name]! What can we help with? │    scrolls OFF screen
//   ├─────────────────────────────────────┤
//   │  [  ◉ rotating-orange search bar ] │  ← STICKS to top when header scrolls away
//   ├─────────────────────────────────────┤
//   │  Carousels …  /  All Categories    │  ← Scrollable
//   └─────────────────────────────────────┘
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { HOME_SECTIONS, CATEGORIES, getSectionCategories } from '../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../theme';
import { LogoText } from '../components/Logo';
import i18n from '../i18n';
import { useAuth } from '../context/AuthContext';

const CARD_SIZE  = 140;
const { width: SCREEN_W } = Dimensions.get('window');

// ── Rotating-border search pill ───────────────────────────────────────────────
function AnimatedSearchBar({ onPress }) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // The rotating element needs to be larger than the pill so the spinning
  // colour is visible as a 2px border peeking out from under the white pill.
  const PILL_H    = 48;
  const BORDER_W  = 2;
  const SPIN_SIZE = SCREEN_W; // large square; clipped by overflow:hidden

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={styles.searchOuter}
    >
      {/* Rotating orange layer */}
      <Animated.View
        style={[
          styles.searchSpin,
          { width: SPIN_SIZE, height: SPIN_SIZE, transform: [{ rotate }] },
        ]}
      >
        {/* Conic-like: two semicircles + gradient to approximate rotation */}
        <View style={[styles.searchSpinColor, { backgroundColor: COLORS.accent }]} />
      </Animated.View>

      {/* White inner pill covering the rotating layer except the 2px border */}
      <View
        style={[
          styles.searchPill,
          { margin: BORDER_W, height: PILL_H - BORDER_W * 2 },
        ]}
      >
        <Ionicons name="search" size={16} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
        <Text style={styles.searchPlaceholder} numberOfLines={1}>
          {i18n.t('home.searchPlaceholder')}
        </Text>
        <View style={styles.searchDivider} />
        <Ionicons name="options-outline" size={16} color={COLORS.accent} />
      </View>
    </TouchableOpacity>
  );
}

// ── Category card with bottom gradient ───────────────────────────────────────
function CategoryCard({ category, onPress, size = CARD_SIZE }) {
  return (
    <TouchableOpacity
      style={[styles.card, { width: size, height: size }]}
      onPress={() => onPress(category)}
      activeOpacity={0.88}
    >
      <Image
        source={{ uri: category.image }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      {/* Bottom-only gradient — keeps top of photo clean & bright */}
      <LinearGradient
        colors={['transparent', 'rgba(26,55,77,0.90)']}
        locations={[0.45, 1]}
        style={StyleSheet.absoluteFill}
      />
      <Text style={styles.cardLabel} numberOfLines={2}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

// ── Horizontal carousel section ───────────────────────────────────────────────
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
        renderItem={({ item }) => (
          <CategoryCard category={item} onPress={onPress} />
        )}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
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
              <CategoryCard
                key={cat.id}
                category={cat}
                onPress={onPress}
                size={(SCREEN_W - 16 * 2 - 12) / 2}
              />
            ))}
            {row.length === 1 && <View style={{ flex: 1 }} />}
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

  const handleCategoryPress = (category) =>
    navigation.navigate('TaskLocation', { category });

  return (
    <View style={styles.root}>
      {/* Navy safe-area fill at the very top */}
      <View style={[styles.navyTop, { height: insets.top, backgroundColor: COLORS.primary }]} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}   // index 1 = the search-bar item
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Item 0: Navy header (scrolls away) ── */}
        <View style={styles.navyHeader}>
          <LogoText fontSize={22} color={COLORS.white} />
          <Text style={styles.greeting} numberOfLines={1}>
            {i18n.t('home.greeting', { name: firstName })}
          </Text>
        </View>

        {/* ── Item 1: Sticky search bar ── */}
        <View style={styles.stickySearchContainer}>
          <AnimatedSearchBar onPress={() => navigation.navigate('Search')} />
        </View>

        {/* ── Items 2+: Carousels & grid ── */}
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
  root: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  navyTop: {
    // Just fills status-bar area with navy color
  },
  scrollContent: {
    paddingBottom: 48,
  },

  // ── Navy header (scrolls off) ──────────────────────────────────────────────
  navyHeader: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
    gap: 6,
    alignItems: 'center',
  },
  greeting: {
    fontFamily: FONTS.familyMedium,
    fontSize: 14,
    color: 'rgba(255,255,255,0.82)',
    textAlign: 'center',
  },

  // ── Sticky search container ────────────────────────────────────────────────
  stickySearchContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingBottom: 14,
    paddingTop: 4,
  },

  // Rotating-border search
  searchOuter: {
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: COLORS.accent,   // fallback / base colour
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSpin: {
    position: 'absolute',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  searchSpinColor: {
    flex: 1,
    borderRadius: 9999,
  },
  searchPill: {
    position: 'absolute',
    left: 2,
    right: 2,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  searchPlaceholder: {
    flex: 1,
    fontFamily: FONTS.family,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  searchDivider: {
    width: 1,
    height: 18,
    backgroundColor: COLORS.border,
    marginHorizontal: 10,
  },

  // ── Category card ──────────────────────────────────────────────────────────
  card: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: COLORS.surface,
  },
  cardLabel: {
    fontFamily: FONTS.familyBold,
    fontSize: 13,
    color: COLORS.white,
    paddingHorizontal: 10,
    paddingBottom: 10,
    lineHeight: 18,
  },

  // ── Carousel section ───────────────────────────────────────────────────────
  carouselSection: {
    marginTop: 28,
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: FONTS.familyBold,
    fontSize: 20,
    color: COLORS.primary,
    paddingHorizontal: 16,
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  carouselList: {
    paddingHorizontal: 16,
  },

  // ── All Categories grid ────────────────────────────────────────────────────
  allCatsSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  gridContainer: {
    marginTop: 12,
    gap: 12,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
