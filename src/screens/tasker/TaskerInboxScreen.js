// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/tasker/TaskerInboxScreen.js  –  Tasker Tab 4
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CHAT_CONVERSATIONS } from '../../../mockData';
import { COLORS, FONTS, RADIUS } from '../../theme';

function ConversationRow({ conv, onPress }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.avatarWrap}>
        <Image source={{ uri: conv.participantAvatar }} style={styles.avatar} />
        {conv.unread > 0 && (
          <View style={styles.unreadDot}>
            <Text style={styles.unreadText}>{conv.unread}</Text>
          </View>
        )}
      </View>
      <View style={styles.rowContent}>
        <View style={styles.rowTop}>
          <Text style={styles.name}>{conv.participantName}</Text>
          <Text style={styles.time}>{conv.lastMessageTime}</Text>
        </View>
        <Text style={styles.categoryChip}>{conv.taskCategory}</Text>
        <Text
          style={[styles.lastMessage, conv.unread > 0 && styles.lastMessageUnread]}
          numberOfLines={1}
        >
          {conv.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function TaskerInboxScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>Messages</Text>
      </View>
      <FlatList
        data={CHAT_CONVERSATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationRow
            conv={item}
            onPress={() => navigation.navigate('Chat', {
              conversationId: item.id,
              participantName: item.participantName,
              participantAvatar: item.participantAvatar,
            })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  topBar: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 18,
  },
  topTitle: { fontFamily: FONTS.familyBold, fontSize: 20, color: COLORS.white },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.border,
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  unreadText: {
    fontFamily: FONTS.familyBold,
    fontSize: 9,
    color: COLORS.white,
  },
  rowContent: { flex: 1 },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  name: { fontFamily: FONTS.familySemibold, fontSize: 15, color: COLORS.textPrimary },
  time: { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },
  categoryChip: {
    fontFamily: FONTS.familySemibold,
    fontSize: 10,
    color: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
    marginBottom: 4,
  },
  lastMessage: {
    fontFamily: FONTS.family,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  lastMessageUnread: {
    fontFamily: FONTS.familySemibold,
    color: COLORS.textPrimary,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginLeft: 80,
  },
});
