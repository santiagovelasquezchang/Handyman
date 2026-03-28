// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/MyTaskersScreen.js  –  "My Taskers" bottom tab
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TASKERS, CATEGORIES, USER_PROFILE } from '../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../theme';
import TopTabs from '../components/TopTabs';

const TABS = [
  { key: 'favorites', label: 'Favorite Taskers' },
  { key: 'past',      label: 'Past Taskers' },
];

// Resolve past taskers from IDs
const PAST_TASKERS = TASKERS.filter((t) =>
  USER_PROFILE.pastTaskerIds.includes(t.id)
);

// ── Favorites empty state ─────────────────────────────────────────────────────
function FavoritesEmpty({ onGoPast }) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIconWrap}>
        <Ionicons name="people-outline" size={44} color={COLORS.primary} />
      </View>
      <Text style={styles.emptyTitle}>Build your team of{'\n'}Favorite Taskers</Text>
      <Text style={styles.emptySub}>
        After working with a Tasker, you can save them as a Favorite
        for quick rebooking anytime.
      </Text>
      <TouchableOpacity style={styles.emptyBtn} onPress={onGoPast} activeOpacity={0.85}>
        <Text style={styles.emptyBtnText}>Go to Past Taskers</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Past tasker card ──────────────────────────────────────────────────────────
function PastTaskerCard({ tasker, onViewProfile, onBookAgain, onFavorite }) {
  // Get category names this tasker serves
  const categoryNames = tasker.categoryIds
    .map((id) => CATEGORIES.find((c) => c.id === id)?.name)
    .filter(Boolean)
    .slice(0, 2)
    .join(', ');

  return (
    <View style={styles.card}>
      {/* Header row */}
      <View style={styles.cardHeader}>
        <Image source={{ uri: tasker.avatar }} style={styles.avatar} />

        <View style={styles.cardMeta}>
          {/* Name + Elite */}
          <View style={styles.nameRow}>
            <Text style={styles.name}>{tasker.name}</Text>
            {tasker.isElite && (
              <View style={styles.eliteBadge}>
                <Ionicons name="shield-checkmark" size={10} color={COLORS.white} />
                <Text style={styles.eliteText}>Elite</Text>
              </View>
            )}
          </View>

          {/* Stars */}
          <View style={styles.starsRow}>
            <Ionicons name="star" size={12} color={COLORS.star} />
            <Text style={styles.rating}> {tasker.rating}</Text>
            <Text style={styles.reviews}> ({tasker.reviewCount})</Text>
            <Text style={styles.bullet}> · </Text>
            <Text style={styles.tasks}>{tasker.totalTasks} tasks</Text>
          </View>

          {/* Rate */}
          <Text style={styles.rate}>
            <Text style={styles.rateAmt}>${tasker.hourlyRate.toFixed(2)}</Text>
            <Text style={styles.rateUnit}>/hr</Text>
          </Text>
        </View>

        {/* Favorite heart */}
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={onFavorite}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="heart-outline" size={22} color={COLORS.inactive} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <Text style={styles.categories} numberOfLines={1}>
        <Ionicons name="construct-outline" size={12} color={COLORS.textSecondary} />
        {'  '}{categoryNames}
      </Text>

      {/* Bio snippet */}
      <Text style={styles.bio} numberOfLines={2}>{tasker.bio}</Text>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={styles.viewProfileBtn}
          onPress={onViewProfile}
          activeOpacity={0.75}
        >
          <Text style={styles.viewProfileText}>View profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookAgainBtn}
          onPress={onBookAgain}
          activeOpacity={0.85}
        >
          <Text style={styles.bookAgainText}>Book again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function MyTaskersScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('favorites');

  const handleViewProfile = (tasker) => {
    // Navigate to the tasker profile without a full booking context.
    // The profile's "Select" button will still open the schedule picker
    // and begin a new booking flow from there.
    navigation.navigate('TaskerProfile', { tasker });
  };

  const handleBookAgain = (tasker) => {
    const firstCat = CATEGORIES.find((c) => c.id === tasker.categoryIds[0]);
    const category = firstCat ?? {
      id:       tasker.categoryIds[0],
      name:     'Service',
      icon:     'construct',
      baseRate: tasker.hourlyRate,
      image:    `https://picsum.photos/seed/${tasker.id}/300/300`,
    };
    navigation.navigate('TaskLocation', { category });
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Screen title */}
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>My Taskers</Text>
      </View>

      {/* Top tabs */}
      <TopTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {/* Content */}
      {activeTab === 'favorites' ? (
        <FavoritesEmpty onGoPast={() => setActiveTab('past')} />
      ) : PAST_TASKERS.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="people-outline" size={44} color={COLORS.border} />
          <Text style={styles.emptyTitle}>No Past Taskers</Text>
          <Text style={styles.emptySub}>Taskers you've worked with will appear here.</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.listHeader}>
            {PAST_TASKERS.length} Tasker{PAST_TASKERS.length !== 1 ? 's' : ''} you've worked with
          </Text>
          {PAST_TASKERS.map((tasker) => (
            <PastTaskerCard
              key={tasker.id}
              tasker={tasker}
              onViewProfile={() => handleViewProfile(tasker)}
              onBookAgain={() => handleBookAgain(tasker)}
              onFavorite={() => {}}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenHeader: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },

  // Empty state
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 36,
    gap: 10,
  },
  emptyIconWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 28,
  },
  emptySub: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
  },
  emptyBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    paddingVertical: 12,
    paddingHorizontal: 28,
    marginTop: 8,
  },
  emptyBtnText: {
    fontSize: 15,
    fontWeight: FONTS.bold,
    color: COLORS.white,
  },

  // List
  list: {
    padding: 16,
    gap: 14,
    paddingBottom: 32,
  },
  listHeader: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: FONTS.medium,
    marginBottom: 2,
  },

  // Card
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 16,
    ...SHADOW.card,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.border,
  },
  cardMeta: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    flexWrap: 'wrap',
  },
  name: {
    fontSize: 15,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    flexShrink: 1,
  },
  eliteBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 7,
    paddingVertical: 3,
    gap: 3,
  },
  eliteText: {
    fontSize: 10,
    fontWeight: FONTS.bold,
    color: COLORS.white,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 13,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  reviews: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  bullet: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  tasks: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  rate: {},
  rateAmt: {
    fontSize: 14,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  rateUnit: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  heartBtn: {
    padding: 2,
  },

  // Card body
  categories: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  bio: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 14,
  },

  // Footer
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  viewProfileBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.md,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewProfileText: {
    fontSize: 13,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
  },
  bookAgainBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookAgainText: {
    fontSize: 13,
    fontWeight: FONTS.bold,
    color: COLORS.white,
  },
});
