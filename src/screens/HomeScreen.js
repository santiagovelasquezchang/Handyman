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
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, HOME_SECTIONS, getSectionCategories } from '../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../theme';

const CARD_WIDTH       = 142;
const CARD_IMG_HEIGHT  = 120;

// ── Sub-components ────────────────────────────────────────────────────────────

function CategoryCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.82}>
      <Image
        source={{ uri: item.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <Text style={styles.cardLabel} numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

function SectionRow({ section, onPressCategory }) {
  const categories = getSectionCategories(section);
  return (
    <View style={styles.section}>
      {/* Section header */}
      <View style={styles.sectionHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.subtitle ? (
            <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
          ) : null}
        </View>
        <TouchableOpacity activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal card list */}
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryCard item={item} onPress={() => onPressCategory(item)} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardRow}
      />
    </View>
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
          {/* Location pill */}
          <TouchableOpacity style={styles.locationPill} activeOpacity={0.7}>
            <Ionicons name="location-sharp" size={14} color={COLORS.primary} />
            <Text style={styles.locationText}>Caracas, VE</Text>
            <Ionicons name="chevron-down" size={13} color={COLORS.textSecondary} />
          </TouchableOpacity>

          {/* Avatar */}
          <TouchableOpacity
            style={styles.avatarBtn}
            activeOpacity={0.75}
            onPress={() => navigation.navigate('ProfileTab')}
          >
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={17} color={COLORS.white} />
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Greeting ─────────────────────────────────────────────────── */}
        <View style={styles.greetingWrap}>
          <Text style={styles.greeting}>What do you need done today?</Text>
        </View>

        {/* ── Search bar (navigates to Search modal) ────────────────────── */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Search')}
          activeOpacity={0.82}
        >
          <View style={styles.searchIconWrap}>
            <Ionicons name="search" size={17} color={COLORS.textSecondary} />
          </View>
          <Text style={styles.searchPlaceholder} numberOfLines={1}>
            Try 'mount TV' or 'leaky faucet'
          </Text>
        </TouchableOpacity>

        {/* ── Category Sections ─────────────────────────────────────────── */}
        {HOME_SECTIONS.map((section) => (
          <SectionRow
            key={section.id}
            section={section}
            onPressCategory={handleCategoryPress}
          />
        ))}

        {/* ── "Browse all" footer link ──────────────────────────────────── */}
        <TouchableOpacity
          style={styles.browseAll}
          onPress={() => navigation.navigate('Search')}
          activeOpacity={0.7}
        >
          <Text style={styles.browseAllText}>Browse all services</Text>
          <Ionicons name="arrow-forward" size={15} color={COLORS.primary} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // ── Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
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
  avatarBtn: {
    padding: 2,
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Greeting
  greetingWrap: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
  },
  greeting: {
    fontSize: 22,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    lineHeight: 28,
  },

  // ── Search bar
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    height: 52,
    marginHorizontal: 16,
    marginBottom: 28,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOW.card,
    // shadow overrides for search bar (lighter)
    shadowOpacity: 0.04,
    elevation: 1,
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

  // ── Section
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
    marginTop: 3,
  },

  // ── Card row
  cardRow: {
    paddingLeft: 16,
    paddingRight: 8,
    gap: 12,
  },

  // ── Category card
  card: {
    width: CARD_WIDTH,
  },
  cardImage: {
    width: CARD_WIDTH,
    height: CARD_IMG_HEIGHT,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: FONTS.semibold,
    color: COLORS.textPrimary,
    marginTop: 8,
    lineHeight: 18,
    paddingHorizontal: 2,
  },

  // ── Browse all footer
  browseAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
    paddingVertical: 6,
  },
  browseAllText: {
    fontSize: 14,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
  },
});
