// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/activity/ActivityHomeScreen.js
//  Service lifecycle center — Upcoming / Completed / Recurring top tabs.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { TopTabBar } from '../../components/ui';

const TABS = [
  { key: 'upcoming',   label: 'Upcoming'   },
  { key: 'completed',  label: 'Completed'  },
  { key: 'recurring',  label: 'Recurring'  },
];

const UPCOMING = [
  {
    id: 'u1', service: 'Deep Cleaning', provider: 'Ana Martínez',
    date: 'Apr 3, 2026', time: '10:00 AM', status: 'confirmed',
    space: 'Home – Caracas', icon: 'sparkles-outline',
  },
  {
    id: 'u2', service: 'TV Mounting', provider: 'Luis García',
    date: 'Apr 7, 2026', time: '2:30 PM', status: 'pending',
    space: 'Office – Las Mercedes', icon: 'tv-outline',
  },
];

const COMPLETED = [
  {
    id: 'c1', service: 'Plumbing Repair', provider: 'Carlos Rodríguez',
    date: 'Mar 22, 2026', rating: 5, space: 'Home – Caracas', icon: 'water-outline',
  },
  {
    id: 'c2', service: 'Electrical Panel', provider: 'Marcos Díaz',
    date: 'Mar 15, 2026', rating: 5, space: 'Home – Caracas', icon: 'flash-outline',
  },
  {
    id: 'c3', service: 'Furniture Assembly', provider: 'Pedro Suárez',
    date: 'Mar 8, 2026', rating: 4, space: 'Office – Las Mercedes', icon: 'cube-outline',
  },
];

const RECURRING = [
  {
    id: 'r1', service: 'Weekly Cleaning', provider: 'Ana Martínez',
    frequency: 'Every Friday', next: 'Apr 4, 2026', active: true,
    space: 'Home – Caracas', icon: 'sparkles-outline',
  },
  {
    id: 'r2', service: 'AC Maintenance', provider: 'Carlos Rodríguez',
    frequency: 'Monthly', next: 'Apr 18, 2026', active: true,
    space: 'Office – Las Mercedes', icon: 'snow-outline',
  },
];

function UpcomingCard({ item, onPress }) {
  const isPending = item.status === 'pending';
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.82}>
      <View style={styles.cardLeft}>
        <View style={[styles.cardIcon, { backgroundColor: COLORS.primaryLight }]}>
          <Ionicons name={item.icon} size={20} color={COLORS.primary} />
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardService}>{item.service}</Text>
        <Text style={styles.cardProvider}>{item.provider}</Text>
        <View style={styles.cardMeta}>
          <Ionicons name="calendar-outline" size={12} color={COLORS.textSecondary} />
          <Text style={styles.cardMetaText}>{item.date} · {item.time}</Text>
        </View>
        <View style={styles.cardMeta}>
          <Ionicons name="location-outline" size={12} color={COLORS.textSecondary} />
          <Text style={styles.cardMetaText}>{item.space}</Text>
        </View>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: isPending ? COLORS.accentLight : COLORS.primaryLight }]}>
        <Text style={[styles.statusText, { color: isPending ? COLORS.accent : COLORS.primary }]}>
          {isPending ? 'Pending' : 'Confirmed'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function CompletedCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.82}>
      <View style={[styles.cardIcon, { backgroundColor: '#E8F5E9' }]}>
        <Ionicons name={item.icon} size={20} color={COLORS.success} />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardService}>{item.service}</Text>
        <Text style={styles.cardProvider}>{item.provider}</Text>
        <View style={styles.starsRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons
              key={i} name="star"
              size={12} color={i < item.rating ? COLORS.accent : COLORS.border}
            />
          ))}
          <Text style={styles.cardMetaText}> · {item.date}</Text>
        </View>
        <View style={styles.cardMeta}>
          <Ionicons name="location-outline" size={12} color={COLORS.textSecondary} />
          <Text style={styles.cardMetaText}>{item.space}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.rebookBtn}>
        <Text style={styles.rebookText}>Rebook</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function RecurringCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.82}>
      <View style={[styles.cardIcon, { backgroundColor: COLORS.accentLight }]}>
        <Ionicons name={item.icon} size={20} color={COLORS.accent} />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardService}>{item.service}</Text>
        <Text style={styles.cardProvider}>{item.provider}</Text>
        <View style={styles.cardMeta}>
          <Ionicons name="repeat-outline" size={12} color={COLORS.textSecondary} />
          <Text style={styles.cardMetaText}>{item.frequency}</Text>
        </View>
        <View style={styles.cardMeta}>
          <Ionicons name="calendar-outline" size={12} color={COLORS.textSecondary} />
          <Text style={styles.cardMetaText}>Next: {item.next}</Text>
        </View>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: '#E8F5E9' }]}>
        <Text style={[styles.statusText, { color: COLORS.success }]}>Active</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ActivityHomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState('upcoming');

  const data    = tab === 'upcoming'  ? UPCOMING
                : tab === 'completed' ? COMPLETED
                : RECURRING;

  const renderItem = ({ item }) => {
    if (tab === 'upcoming')
      return <UpcomingCard item={item}  onPress={() => navigation.navigate('BookingDetails',         { booking: item })} />;
    if (tab === 'completed')
      return <CompletedCard item={item} onPress={() => navigation.navigate('BookingDetails',         { booking: item })} />;
    return      <RecurringCard item={item} onPress={() => navigation.navigate('RecurringServiceDetails', { service: item })} />;
  };

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      {/* Navy header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity</Text>
        <Text style={styles.headerSub}>Your service history & schedule</Text>
      </View>

      <TopTabBar tabs={TABS} active={tab} onSelect={setTab} />

      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 32, gap: 10 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="calendar-outline" size={34} color={COLORS.border} />
            <Text style={styles.emptyText}>Nothing here yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: { fontFamily: FONTS.familyBold, fontSize: 24, color: COLORS.white },
  headerSub:   { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 3 },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    ...SHADOW.card,
  },
  cardLeft: {},
  cardIcon: {
    width: 42, height: 42, borderRadius: RADIUS.md,
    alignItems: 'center', justifyContent: 'center',
  },
  cardBody:    { flex: 1 },
  cardService: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  cardProvider:{ fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  cardMeta:    { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  cardMetaText:{ fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },
  starsRow:    { flexDirection: 'row', alignItems: 'center', gap: 1, marginTop: 4 },

  statusBadge: { borderRadius: RADIUS.pill, paddingHorizontal: 9, paddingVertical: 4, alignSelf: 'flex-start' },
  statusText:  { fontFamily: FONTS.familySemibold, fontSize: 11 },

  rebookBtn:  { backgroundColor: COLORS.accentLight, borderRadius: RADIUS.pill, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start' },
  rebookText: { fontFamily: FONTS.familySemibold, fontSize: 12, color: COLORS.accent },

  empty:     { alignItems: 'center', paddingVertical: 64, gap: 10 },
  emptyText: { fontFamily: FONTS.familyMedium, fontSize: 14, color: COLORS.textSecondary },
});
