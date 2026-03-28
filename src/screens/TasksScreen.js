// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/TasksScreen.js  –  "Tasks" bottom tab
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TASK_HISTORY } from '../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../theme';
import TopTabs from '../components/TopTabs';

const TABS = [
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'completed', label: 'Completed' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtDate = (str) =>
  new Date(str).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

// ── Empty state (context-aware) ───────────────────────────────────────────────
const EMPTY_CONFIG = {
  scheduled: {
    icon:    'calendar-outline',
    title:   'No Current Tasks',
    sub:     'Let us help you get the job done.\nBook a task and see it here.',
    btn:     'Browse services',
  },
  completed: {
    icon:    'checkmark-circle-outline',
    title:   'No Completed Tasks',
    sub:     'Your completed tasks will show up here once a booking wraps up.',
    btn:     null,
  },
};

function EmptyState({ tab, onBrowse }) {
  const cfg = EMPTY_CONFIG[tab] ?? EMPTY_CONFIG.scheduled;
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIconWrap}>
        <Ionicons name={cfg.icon} size={42} color={COLORS.primary} />
      </View>
      <Text style={styles.emptyTitle}>{cfg.title}</Text>
      <Text style={styles.emptySub}>{cfg.sub}</Text>
      {cfg.btn && (
        <TouchableOpacity style={styles.emptyBtn} onPress={onBrowse} activeOpacity={0.85}>
          <Text style={styles.emptyBtnText}>{cfg.btn}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ── Scheduled task card ───────────────────────────────────────────────────────
function ScheduledCard({ task }) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardCategory}>{task.categoryName}</Text>
        <View style={[styles.badge, styles.badgeUpcoming]}>
          <Text style={styles.badgeUpcomingText}>Upcoming</Text>
        </View>
      </View>

      <View style={styles.cardDivider} />

      {/* Details */}
      <View style={styles.detailRow}>
        <Ionicons name="calendar-outline" size={14} color={COLORS.textSecondary} />
        <Text style={styles.detailText}>{fmtDate(task.date)}  ·  {task.time}</Text>
      </View>
      <View style={styles.detailRow}>
        <Image source={{ uri: task.taskerAvatar }} style={styles.miniAvatar} />
        <Text style={styles.detailText}>{task.taskerName}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="location-outline" size={14} color={COLORS.textSecondary} />
        <Text style={styles.detailText} numberOfLines={1}>{task.address}</Text>
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <Text style={styles.taskTotal}>
          ${task.totalRate.toFixed(2)}
          <Text style={styles.taskTotalSub}> total</Text>
        </Text>
        <TouchableOpacity style={styles.manageBtn} activeOpacity={0.75}>
          <Text style={styles.manageBtnText}>Manage task</Text>
          <Ionicons name="arrow-forward" size={13} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── Completed task card ───────────────────────────────────────────────────────
function CompletedCard({ task, onBookAgain }) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardCategory}>{task.categoryName}</Text>
        <View style={[styles.badge, styles.badgeCompleted]}>
          <Ionicons name="checkmark-circle" size={11} color={COLORS.primary} />
          <Text style={styles.badgeCompletedText}>Completed</Text>
        </View>
      </View>

      <View style={styles.cardDivider} />

      {/* Details */}
      <View style={styles.detailRow}>
        <Ionicons name="calendar-outline" size={14} color={COLORS.textSecondary} />
        <Text style={styles.detailText}>{fmtDate(task.date)}  ·  {task.time}</Text>
      </View>
      <View style={styles.detailRow}>
        <Image source={{ uri: task.taskerAvatar }} style={styles.miniAvatar} />
        <Text style={styles.detailText}>{task.taskerName}</Text>
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <Text style={styles.taskTotal}>
          ${task.totalRate.toFixed(2)}
          <Text style={styles.taskTotalSub}> total</Text>
        </Text>
        <TouchableOpacity
          style={styles.bookAgainBtn}
          onPress={onBookAgain}
          activeOpacity={0.75}
        >
          <Text style={styles.bookAgainText}>Book again</Text>
          <Ionicons name="arrow-forward" size={13} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function TasksScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab]   = useState('scheduled');
  const [refreshing, setRefreshing] = useState(false);

  const scheduled = TASK_HISTORY.scheduled;
  const completed  = TASK_HISTORY.completed;
  const list       = activeTab === 'scheduled' ? scheduled : completed;

  const handleBookAgain = (task) => {
    navigation.navigate('TaskLocation', {
      category: {
        id:       task.categoryId,
        name:     task.categoryName,
        icon:     'construct',
        baseRate: 30,
        image:    `https://picsum.photos/seed/${task.categoryId}/300/300`,
      },
    });
  };

  const handleBrowse = () => navigation.navigate('Search');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a brief network delay
    setTimeout(() => setRefreshing(false), 900);
  }, []);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Screen title */}
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Tasks</Text>
      </View>

      {/* Top tabs */}
      <TopTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {/* Content */}
      {list.length === 0 ? (
        <EmptyState tab={activeTab} onBrowse={handleBrowse} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={COLORS.primary}
              colors={[COLORS.primary]}
            />
          }
        >
          {list.map((task) =>
            task.status === 'scheduled' ? (
              <ScheduledCard key={task.id} task={task} />
            ) : (
              <CompletedCard
                key={task.id}
                task={task}
                onBookAgain={() => handleBookAgain(task)}
              />
            )
          )}
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
    width: 80,
    height: 80,
    borderRadius: 40,
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

  // Card list
  list: {
    padding: 16,
    gap: 14,
    paddingBottom: 32,
  },

  // Task card
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 16,
    ...SHADOW.card,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardCategory: {
    fontSize: 15,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  badgeUpcoming: {
    backgroundColor: '#FFF7E6',
    borderWidth: 1,
    borderColor: '#F0A500',
  },
  badgeUpcomingText: {
    fontSize: 11,
    fontWeight: FONTS.bold,
    color: '#B07800',
  },
  badgeCompleted: {
    backgroundColor: COLORS.primaryLight,
  },
  badgeCompletedText: {
    fontSize: 11,
    fontWeight: FONTS.bold,
    color: COLORS.primary,
  },
  cardDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginBottom: 12,
  },

  // Detail rows
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  miniAvatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.border,
  },
  detailText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    flex: 1,
  },

  // Card footer
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },
  taskTotal: {
    fontSize: 16,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  taskTotalSub: {
    fontSize: 12,
    fontWeight: FONTS.regular,
    color: COLORS.textSecondary,
  },
  manageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  manageBtnText: {
    fontSize: 13,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
  },
  bookAgainBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 8,
    paddingHorizontal: 14,
    gap: 5,
  },
  bookAgainText: {
    fontSize: 13,
    fontWeight: FONTS.bold,
    color: COLORS.white,
  },
});
