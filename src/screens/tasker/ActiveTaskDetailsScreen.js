// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/tasker/ActiveTaskDetailsScreen.js
//  Accessed from Dashboard → Today's Tasks or My Tasks
// ─────────────────────────────────────────────────────────────────────────────

import React, { useLayoutEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

export default function ActiveTaskDetailsScreen({ navigation, route }) {
  const { task } = route.params;
  const insets   = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({ title: task.categoryName });
  }, [navigation, task]);

  const handleChat = () =>
    navigation.navigate('Chat', {
      conversationId:    'conv1',
      participantName:   task.clientName,
      participantAvatar: task.clientAvatar,
    });

  const statusColor = task.status === 'in_progress' ? COLORS.accent : COLORS.success;
  const statusLabel = task.status === 'in_progress' ? 'In Progress' : 'Upcoming';

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Map snapshot */}
        <Image
          source={{ uri: task.mapImage ?? `https://picsum.photos/seed/map${task.id}/600/280` }}
          style={styles.mapImage}
          resizeMode="cover"
        />

        {/* Status banner */}
        <View style={[styles.statusBanner, { backgroundColor: statusColor }]}>
          <Ionicons name={task.status === 'in_progress' ? 'flash' : 'calendar'} size={14} color={COLORS.white} />
          <Text style={styles.statusText}>{statusLabel}  ·  {task.time}</Text>
        </View>

        {/* Client info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client</Text>
          <View style={styles.clientRow}>
            <Image source={{ uri: task.clientAvatar }} style={styles.clientAvatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.clientName}>{task.clientName}</Text>
              <View style={styles.metaRow}>
                <Ionicons name="location-outline" size={13} color={COLORS.textSecondary} />
                <Text style={styles.metaText} numberOfLines={2}>{task.address}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.callBtn} activeOpacity={0.8}>
              <Ionicons name="call-outline" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Scope of work */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scope of Work</Text>
          <View style={styles.scopeCard}>
            <Text style={styles.scopeText}>{task.scope}</Text>
          </View>
          {task.answers && Object.keys(task.answers).length > 0 && (
            <View style={styles.answersGrid}>
              {Object.entries(task.answers).map(([key, value]) => (
                <View key={key} style={styles.answerChip}>
                  <Text style={styles.answerKey}>
                    {key.replace(/_/g, ' ')}
                  </Text>
                  <Text style={styles.answerValue}>{value}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.divider} />

        {/* Earnings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Earnings</Text>
          <View style={styles.earningsRow}>
            <Text style={styles.earningsLabel}>Estimated total</Text>
            <Text style={styles.earningsValue}>${task.totalRate.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed action bar */}
      <View style={[styles.actionBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity style={styles.chatBtn} onPress={handleChat} activeOpacity={0.85}>
          <Ionicons name="chatbubble-ellipses" size={18} color={COLORS.white} />
          <Text style={styles.chatBtnText}>Chat with Client</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.completeBtn} activeOpacity={0.85}>
          <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.primary} />
          <Text style={styles.completeBtnText}>Mark Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },

  mapImage: {
    width: '100%',
    height: 220,
    backgroundColor: COLORS.border,
  },

  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  statusText: {
    fontFamily: FONTS.familySemibold,
    fontSize: 13,
    color: COLORS.white,
  },

  section: { padding: 20 },
  sectionTitle: {
    fontFamily: FONTS.familyBold,
    fontSize: 13,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  divider: { height: 8, backgroundColor: COLORS.background },

  // Client
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clientAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.border,
  },
  clientName: {
    fontFamily: FONTS.familySemibold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  metaText: {
    fontFamily: FONTS.family,
    fontSize: 13,
    color: COLORS.textSecondary,
    flex: 1,
  },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Scope
  scopeCard: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: 14,
    marginBottom: 12,
  },
  scopeText: {
    fontFamily: FONTS.family,
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 21,
  },
  answersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  answerChip: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  answerKey: {
    fontFamily: FONTS.familySemibold,
    fontSize: 10,
    color: COLORS.textSecondary,
    textTransform: 'capitalize',
  },
  answerValue: {
    fontFamily: FONTS.familySemibold,
    fontSize: 13,
    color: COLORS.primary,
  },

  // Earnings
  earningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  earningsLabel: { fontFamily: FONTS.family, fontSize: 15, color: COLORS.textSecondary },
  earningsValue: { fontFamily: FONTS.familyBold, fontSize: 20, color: COLORS.textPrimary },

  // Action bar
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: COLORS.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
    ...SHADOW.bar,
  },
  chatBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    height: 52,
  },
  chatBtnText: {
    fontFamily: FONTS.familyBold,
    fontSize: 14,
    color: COLORS.white,
  },
  completeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.md,
    height: 52,
  },
  completeBtnText: {
    fontFamily: FONTS.familyBold,
    fontSize: 14,
    color: COLORS.primary,
  },
});
