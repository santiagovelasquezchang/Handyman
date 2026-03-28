// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/booking/TaskerListScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TASKERS, getTaskersByCategory, TASKER_FILTERS } from '../../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

// ── Elite badge ───────────────────────────────────────────────────────────────
function EliteBadge() {
  return (
    <View style={styles.eliteBadge}>
      <Ionicons name="shield-checkmark" size={10} color={COLORS.white} />
      <Text style={styles.eliteText}>Elite</Text>
    </View>
  );
}

// ── Filter chip ───────────────────────────────────────────────────────────────
function FilterChip({ label, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {active && (
        <Ionicons name="checkmark" size={12} color={COLORS.primary} style={{ marginRight: 4 }} />
      )}
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ── Tasker card ───────────────────────────────────────────────────────────────
function TaskerCard({ tasker, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      {/* ── Top row: avatar + meta ── */}
      <View style={styles.cardTop}>
        <Image source={{ uri: tasker.avatar }} style={styles.avatar} />

        <View style={styles.metaBlock}>
          {/* Name + Elite */}
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>{tasker.name}</Text>
            {tasker.isElite && <EliteBadge />}
          </View>

          {/* Stars + review count */}
          <View style={styles.starsRow}>
            <Ionicons name="star" size={13} color={COLORS.star} />
            <Text style={styles.ratingVal}> {tasker.rating}</Text>
            <Text style={styles.reviewCount}> ({tasker.reviewCount})</Text>
            <Text style={styles.bullet}> · </Text>
            <Text style={styles.tasks}>{tasker.totalTasks} tasks</Text>
          </View>

          {/* Rate */}
          <Text style={styles.rate}>
            <Text style={styles.rateAmount}>${tasker.hourlyRate.toFixed(2)}</Text>
            <Text style={styles.rateUnit}>/hr</Text>
          </Text>
        </View>
      </View>

      {/* ── Photos row ── */}
      <View style={styles.photosRow}>
        <Ionicons name="camera-outline" size={13} color={COLORS.textSecondary} />
        <Text style={styles.photosText}> {tasker.workPhotoCount} work photos</Text>
      </View>

      {/* ── Divider ── */}
      <View style={styles.cardDivider} />

      {/* ── Bio snippet ── */}
      <Text style={styles.bio} numberOfLines={2}>{tasker.bio}</Text>

      {/* ── Footer ── */}
      <View style={styles.cardFooter}>
        <Text style={styles.seeProfile}>See profile</Text>
        <Ionicons name="arrow-forward" size={13} color={COLORS.primary} />
      </View>
    </TouchableOpacity>
  );
}

// ── List header (context + filter chips) ─────────────────────────────────────
function ListHeader({ category, address, activeFilter, onFilterChange }) {
  return (
    <View>
      {/* Context bar */}
      <View style={styles.contextBar}>
        <View style={styles.contextLeft}>
          <Text style={styles.contextCategory}>{category?.name}</Text>
          {address?.street ? (
            <Text style={styles.contextAddress} numberOfLines={1}>
              <Ionicons name="location-outline" size={12} /> {address.street}
            </Text>
          ) : null}
        </View>
        <View style={styles.contextBadge}>
          <Text style={styles.contextBadgeText}>
            {category?.baseRate ? `from $${category.baseRate}/hr` : ''}
          </Text>
        </View>
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersRow}
      >
        {TASKER_FILTERS.map((f) => (
          <FilterChip
            key={f}
            label={f}
            active={activeFilter === f}
            onPress={() => onFilterChange(f)}
          />
        ))}
      </ScrollView>

      <View style={styles.listDivider} />
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function TaskerListScreen({ navigation, route }) {
  const { category, address } = route.params ?? {};
  const [activeFilter, setActiveFilter] = useState(TASKER_FILTERS[0]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Select a Tasker' });
  }, [navigation]);

  // Base list: taskers that serve this category, else all
  const baseTaskers = useMemo(() => {
    const byCategory = getTaskersByCategory(category?.id ?? '');
    return byCategory.length > 0 ? byCategory : TASKERS;
  }, [category]);

  // Apply filter/sort
  const displayTaskers = useMemo(() => {
    const list = [...baseTaskers];
    if (activeFilter === 'Price') {
      list.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (activeFilter === 'Flexible') {
      list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [baseTaskers, activeFilter]);

  const handleSelect = (tasker) => {
    navigation.navigate('TaskerProfile', { ...route.params, tasker });
  };

  return (
    <FlatList
      data={displayTaskers}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskerCard tasker={item} onPress={() => handleSelect(item)} />
      )}
      ListHeaderComponent={
        <ListHeader
          category={category}
          address={address}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      }
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
    />
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 32,
    backgroundColor: COLORS.background,
  },

  // Context bar
  contextBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  contextLeft: { flex: 1 },
  contextCategory: {
    fontSize: 15,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  contextAddress: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  contextBadge: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  contextBadgeText: {
    fontSize: 12,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
  },

  // Filters
  filtersRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: COLORS.white,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.pill,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  chipActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  chipText: {
    fontSize: 13,
    fontWeight: FONTS.semibold,
    color: COLORS.textSecondary,
  },
  chipTextActive: {
    color: COLORS.primary,
  },
  listDivider: {
    height: 8,
    backgroundColor: COLORS.background,
  },

  // Card
  card: {
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 16,
    ...SHADOW.card,
  },
  cardTop: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: COLORS.border,
  },
  metaBlock: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  name: {
    fontSize: 16,
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
    letterSpacing: 0.3,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingVal: {
    fontSize: 13,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  reviewCount: {
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
  rate: {
    marginTop: 2,
  },
  rateAmount: {
    fontSize: 15,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  rateUnit: {
    fontSize: 13,
    fontWeight: FONTS.regular,
    color: COLORS.textSecondary,
  },

  // Photos row
  photosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  photosText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  cardDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginBottom: 10,
  },

  // Bio
  bio: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: 12,
  },

  // Footer
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeProfile: {
    fontSize: 13,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
  },
});
