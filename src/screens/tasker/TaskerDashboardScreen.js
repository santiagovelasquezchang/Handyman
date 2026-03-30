// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/tasker/TaskerDashboardScreen.js  –  Tasker Tab 1
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TASKER_PROFILE, TASKER_REQUESTS, TASKER_TODAY_TASKS } from '../../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

// ── Earnings card ─────────────────────────────────────────────────────────────
function EarningsCard() {
  return (
    <View style={styles.earningsCard}>
      <View style={styles.earningsHeader}>
        <Text style={styles.earningsTitle}>Earnings Overview</Text>
        <View style={styles.earningsBadge}>
          <Ionicons name="trending-up" size={12} color={COLORS.success} />
          <Text style={styles.earningsBadgeText}>+12% vs last week</Text>
        </View>
      </View>
      <View style={styles.earningsRow}>
        <View style={styles.earningsStat}>
          <Text style={styles.earningsAmount}>${TASKER_PROFILE.weeklyEarnings}</Text>
          <Text style={styles.earningsLabel}>This Week</Text>
        </View>
        <View style={styles.earningsDivider} />
        <View style={styles.earningsStat}>
          <Text style={styles.earningsAmount}>${TASKER_PROFILE.monthlyEarnings}</Text>
          <Text style={styles.earningsLabel}>This Month</Text>
        </View>
        <View style={styles.earningsDivider} />
        <View style={styles.earningsStat}>
          <Text style={[styles.earningsAmount, { color: COLORS.accent }]}>
            ${TASKER_PROFILE.pendingPayout}
          </Text>
          <Text style={styles.earningsLabel}>Pending</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.withdrawBtn} activeOpacity={0.85}>
        <Text style={styles.withdrawBtnText}>Withdraw Earnings</Text>
        <Ionicons name="arrow-forward" size={14} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
}

// ── Request card ──────────────────────────────────────────────────────────────
function RequestCard({ request, onAccept, onDecline }) {
  return (
    <View style={styles.requestCard}>
      {/* Client info */}
      <View style={styles.requestHeader}>
        <Image source={{ uri: request.clientAvatar }} style={styles.requestAvatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.requestClient}>{request.clientName}</Text>
          <View style={styles.categoryChip}>
            <Text style={styles.categoryChipText}>{request.categoryName}</Text>
          </View>
        </View>
        <Text style={styles.requestPrice}>${request.estimatedTotal}</Text>
      </View>

      {/* Scope */}
      <Text style={styles.requestScope} numberOfLines={2}>{request.scope}</Text>

      {/* Date/time */}
      <View style={styles.requestMeta}>
        <Ionicons name="calendar-outline" size={13} color={COLORS.textSecondary} />
        <Text style={styles.requestMetaText}>{request.date}  ·  {request.time}</Text>
      </View>
      <View style={styles.requestMeta}>
        <Ionicons name="location-outline" size={13} color={COLORS.textSecondary} />
        <Text style={styles.requestMetaText} numberOfLines={1}>{request.address}</Text>
      </View>

      {/* Actions */}
      <View style={styles.requestActions}>
        <TouchableOpacity style={styles.declineBtn} onPress={onDecline} activeOpacity={0.8}>
          <Text style={styles.declineBtnText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptBtn} onPress={onAccept} activeOpacity={0.85}>
          <Text style={styles.acceptBtnText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── Today task row ────────────────────────────────────────────────────────────
function TodayTaskRow({ task, onPress }) {
  const statusColor = task.status === 'in_progress' ? COLORS.accent : COLORS.success;
  const statusLabel = task.status === 'in_progress' ? 'In Progress' : 'Upcoming';

  return (
    <TouchableOpacity style={styles.todayCard} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.todayLeft}>
        <Text style={styles.todayTime}>{task.time}</Text>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
      </View>
      <View style={styles.todayContent}>
        <Text style={styles.todayCategory}>{task.categoryName}</Text>
        <View style={styles.todayMeta}>
          <Ionicons name="location-outline" size={12} color={COLORS.textSecondary} />
          <Text style={styles.todayMetaText} numberOfLines={1}>{task.address}</Text>
        </View>
        <View style={styles.todayMeta}>
          <Image source={{ uri: task.clientAvatar }} style={styles.todayAvatar} />
          <Text style={styles.todayMetaText}>{task.clientName}</Text>
        </View>
      </View>
      <View style={styles.todayRight}>
        <Text style={styles.todayRate}>${task.totalRate}</Text>
        <Ionicons name="chevron-forward" size={16} color={COLORS.inactive} />
      </View>
    </TouchableOpacity>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function TaskerDashboardScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [requests, setRequests] = useState(TASKER_REQUESTS);
  const firstName = TASKER_PROFILE.name.split(' ')[0];

  const handleAccept = (id) => setRequests((prev) => prev.filter((r) => r.id !== id));
  const handleDecline = (id) => setRequests((prev) => prev.filter((r) => r.id !== id));

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Navy top bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.topGreeting}>Hello, {firstName}! 👋</Text>
          <Text style={styles.topSub}>Here's what's happening today</Text>
        </View>
        <TouchableOpacity style={styles.notifBtn} activeOpacity={0.75}>
          <Ionicons name="notifications-outline" size={22} color={COLORS.white} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Earnings */}
        <EarningsCard />

        {/* New Requests */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Requests</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{requests.length}</Text>
          </View>
        </View>

        {requests.length === 0 ? (
          <View style={styles.emptyRequests}>
            <Ionicons name="checkmark-circle-outline" size={32} color={COLORS.border} />
            <Text style={styles.emptyText}>All caught up!</Text>
          </View>
        ) : (
          <FlatList
            data={requests}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.requestsList}
            ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
            renderItem={({ item }) => (
              <RequestCard
                request={item}
                onAccept={() => handleAccept(item.id)}
                onDecline={() => handleDecline(item.id)}
              />
            )}
          />
        )}

        {/* Today's Tasks */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <Text style={styles.sectionSub}>{TASKER_TODAY_TASKS.length} scheduled</Text>
        </View>

        <View style={styles.todayList}>
          {TASKER_TODAY_TASKS.map((task) => (
            <TodayTaskRow
              key={task.id}
              task={task}
              onPress={() => navigation.navigate('ActiveTaskDetails', { task })}
            />
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F9FA' },

  // Top bar
  topBar: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topGreeting: {
    fontFamily: FONTS.familyBold,
    fontSize: 20,
    color: COLORS.white,
  },
  topSub: {
    fontFamily: FONTS.family,
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },

  scroll: { paddingTop: 20 },

  // Earnings card
  earningsCard: {
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 18,
    marginBottom: 24,
    ...SHADOW.card,
  },
  earningsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  earningsTitle: {
    fontFamily: FONTS.familyBold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  earningsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F5E9',
    borderRadius: RADIUS.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  earningsBadgeText: {
    fontFamily: FONTS.familySemibold,
    fontSize: 10,
    color: COLORS.success,
  },
  earningsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  earningsStat: { flex: 1, alignItems: 'center' },
  earningsDivider: { width: 1, height: 36, backgroundColor: COLORS.border },
  earningsAmount: {
    fontFamily: FONTS.familyBold,
    fontSize: 20,
    color: COLORS.textPrimary,
  },
  earningsLabel: {
    fontFamily: FONTS.family,
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 3,
  },
  withdrawBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    height: 44,
    gap: 8,
  },
  withdrawBtnText: {
    fontFamily: FONTS.familyBold,
    fontSize: 14,
    color: COLORS.white,
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontFamily: FONTS.familyBold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  sectionSub: {
    fontFamily: FONTS.family,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  countBadge: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.pill,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  countBadgeText: {
    fontFamily: FONTS.familyBold,
    fontSize: 11,
    color: COLORS.white,
  },

  // Requests
  requestsList: { paddingHorizontal: 16, paddingBottom: 8 },
  requestCard: {
    width: 270,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 16,
    ...SHADOW.card,
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  requestAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.border,
  },
  requestClient: {
    fontFamily: FONTS.familySemibold,
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  categoryChipText: {
    fontFamily: FONTS.familySemibold,
    fontSize: 10,
    color: COLORS.primary,
  },
  requestPrice: {
    fontFamily: FONTS.familyBold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  requestScope: {
    fontFamily: FONTS.family,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: 10,
  },
  requestMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  requestMetaText: {
    fontFamily: FONTS.family,
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
  },
  requestActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  declineBtn: {
    flex: 1,
    height: 40,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineBtnText: {
    fontFamily: FONTS.familySemibold,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  acceptBtn: {
    flex: 1,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptBtnText: {
    fontFamily: FONTS.familyBold,
    fontSize: 13,
    color: COLORS.white,
  },

  emptyRequests: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: FONTS.familyMedium,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  // Today's tasks
  todayList: {
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOW.card,
  },
  todayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  todayLeft: {
    alignItems: 'center',
    width: 54,
    gap: 6,
  },
  todayTime: {
    fontFamily: FONTS.familySemibold,
    fontSize: 12,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  todayContent: { flex: 1, gap: 4 },
  todayCategory: {
    fontFamily: FONTS.familySemibold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  todayMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  todayMetaText: {
    fontFamily: FONTS.family,
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
  },
  todayAvatar: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.border,
  },
  todayRight: {
    alignItems: 'center',
    gap: 4,
  },
  todayRate: {
    fontFamily: FONTS.familyBold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
});
