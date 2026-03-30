// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/tasker/TaskerTasksScreen.js  –  Tasker Tab 3
//  Three tabs: Upcoming · Completed · Chats
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, FlatList,
  TouchableOpacity, Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TASKER_TASKS, CHAT_CONVERSATIONS } from '../../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import TopTabs from '../../components/TopTabs';

const TABS = [
  { key: 'upcoming',  label: 'Upcoming'   },
  { key: 'completed', label: 'Completed'  },
  { key: 'chats',     label: 'Chats'      },
];

// ── Task card ─────────────────────────────────────────────────────────────────
function TaskCard({ task, onPress }) {
  const isCompleted = task.status === 'completed';
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardCategory}>{task.categoryName}</Text>
        {isCompleted ? (
          <View style={styles.badgeCompleted}>
            <Ionicons name="checkmark-circle" size={11} color={COLORS.success} />
            <Text style={styles.badgeCompletedText}>Completed</Text>
          </View>
        ) : (
          <View style={styles.badgeUpcoming}>
            <Text style={styles.badgeUpcomingText}>
              {task.status === 'in_progress' ? 'In Progress' : 'Upcoming'}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.divider} />

      <View style={styles.clientRow}>
        <Image source={{ uri: task.clientAvatar }} style={styles.clientAvatar} />
        <Text style={styles.clientName}>{task.clientName}</Text>
      </View>

      <View style={styles.metaRow}>
        <Ionicons name={task.date ? 'calendar-outline' : 'time-outline'} size={13} color={COLORS.textSecondary} />
        <Text style={styles.metaText}>
          {task.date ? `${task.date}  ·  ` : 'Today  ·  '}{task.time}
        </Text>
      </View>
      <View style={styles.metaRow}>
        <Ionicons name="location-outline" size={13} color={COLORS.textSecondary} />
        <Text style={styles.metaText} numberOfLines={1}>{task.address}</Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.totalRate}>
          ${task.totalRate.toFixed(2)}
          <Text style={styles.totalRateSub}> earned</Text>
        </Text>
        {isCompleted && task.rating ? (
          <View style={styles.ratingRow}>
            {[1,2,3,4,5].map((s) => (
              <Ionicons key={s} name="star" size={12}
                color={s <= task.rating ? COLORS.star : COLORS.border} />
            ))}
          </View>
        ) : (
          <Ionicons name="chevron-forward" size={16} color={COLORS.inactive} />
        )}
      </View>
    </TouchableOpacity>
  );
}

// ── Chat conversation row ─────────────────────────────────────────────────────
function ConvRow({ conv, onPress }) {
  return (
    <TouchableOpacity style={styles.convRow} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.convAvatarWrap}>
        <Image source={{ uri: conv.participantAvatar }} style={styles.convAvatar} />
        {conv.unread > 0 && (
          <View style={styles.unreadDot}>
            <Text style={styles.unreadText}>{conv.unread}</Text>
          </View>
        )}
      </View>
      <View style={styles.convContent}>
        <View style={styles.convTop}>
          <Text style={styles.convName}>{conv.participantName}</Text>
          <Text style={styles.convTime}>{conv.lastMessageTime}</Text>
        </View>
        <Text style={styles.convCategory}>{conv.taskCategory}</Text>
        <Text
          style={[styles.convLast, conv.unread > 0 && styles.convLastUnread]}
          numberOfLines={1}
        >
          {conv.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ tab }) {
  const cfg = {
    upcoming:  { icon: 'briefcase-outline',  text: 'No upcoming tasks' },
    completed: { icon: 'checkmark-done-outline', text: 'No completed tasks yet' },
    chats:     { icon: 'chatbubble-outline', text: 'No active conversations' },
  }[tab];
  return (
    <View style={styles.empty}>
      <Ionicons name={cfg.icon} size={42} color={COLORS.border} />
      <Text style={styles.emptyText}>{cfg.text}</Text>
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function TaskerTasksScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('upcoming');

  const taskList = TASKER_TASKS[activeTab] ?? [];
  const chatList = CHAT_CONVERSATIONS;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>My Tasks</Text>
      </View>

      <TopTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'chats' ? (
        chatList.length === 0 ? (
          <EmptyState tab="chats" />
        ) : (
          <FlatList
            data={chatList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ConvRow
                conv={item}
                onPress={() => navigation.navigate('Chat', {
                  conversationId:    item.id,
                  participantName:   item.participantName,
                  participantAvatar: item.participantAvatar,
                })}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.convSeparator} />}
            contentContainerStyle={{ paddingBottom: 32 }}
            showsVerticalScrollIndicator={false}
          />
        )
      ) : taskList.length === 0 ? (
        <EmptyState tab={activeTab} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {taskList.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onPress={() =>
                !task.status.includes('completed') &&
                navigation.navigate('ActiveTaskDetails', { task })
              }
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F9FA' },

  topBar: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 18,
  },
  topTitle: { fontFamily: FONTS.familyBold, fontSize: 20, color: COLORS.white },

  list: { padding: 16, gap: 12, paddingBottom: 32 },

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
    marginBottom: 10,
  },
  cardCategory: { fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.textPrimary },
  badgeCompleted: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F5E9',
    borderRadius: RADIUS.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeCompletedText: { fontFamily: FONTS.familySemibold, fontSize: 10, color: COLORS.success },
  badgeUpcoming: {
    backgroundColor: COLORS.accentLight,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeUpcomingText: { fontFamily: FONTS.familySemibold, fontSize: 10, color: COLORS.accent },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.border, marginBottom: 12 },
  clientRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  clientAvatar: { width: 22, height: 22, borderRadius: 11, backgroundColor: COLORS.border },
  clientName: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textPrimary },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  metaText: { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, flex: 1 },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },
  totalRate: { fontFamily: FONTS.familyBold, fontSize: 16, color: COLORS.textPrimary },
  totalRateSub: { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary },
  ratingRow: { flexDirection: 'row', gap: 2 },

  // Chat rows
  convRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    backgroundColor: COLORS.white,
  },
  convAvatarWrap: { position: 'relative' },
  convAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.border,
  },
  unreadDot: {
    position: 'absolute',
    top: 0, right: 0,
    width: 18, height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  unreadText: { fontFamily: FONTS.familyBold, fontSize: 9, color: COLORS.white },
  convContent: { flex: 1 },
  convTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  convName: { fontFamily: FONTS.familySemibold, fontSize: 15, color: COLORS.textPrimary },
  convTime: { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },
  convCategory: {
    alignSelf: 'flex-start',
    fontFamily: FONTS.familySemibold,
    fontSize: 10,
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
    marginBottom: 4,
  },
  convLast: { fontFamily: FONTS.family, fontSize: 13, color: COLORS.textSecondary },
  convLastUnread: { fontFamily: FONTS.familySemibold, color: COLORS.textPrimary },
  convSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginLeft: 80,
  },

  // Empty
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  emptyText: { fontFamily: FONTS.familyMedium, fontSize: 14, color: COLORS.textSecondary },
});
