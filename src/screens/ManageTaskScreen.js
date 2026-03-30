// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/ManageTaskScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
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
import { COLORS, FONTS, RADIUS, SHADOW } from '../theme';
import { CHAT_CONVERSATIONS } from '../../mockData';

const fmtDate = (str) =>
  new Date(str).toLocaleDateString('en-US', {
    weekday: 'long',
    month:   'long',
    day:     'numeric',
    year:    'numeric',
  });

export default function ManageTaskScreen({ navigation, route }) {
  const { task } = route.params;
  const insets   = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Status banner */}
        <View style={styles.banner}>
          <Ionicons name="calendar" size={20} color={COLORS.white} />
          <Text style={styles.bannerText}>Upcoming · {fmtDate(task.date)}</Text>
        </View>

        {/* Category + time */}
        <View style={styles.section}>
          <Text style={styles.categoryName}>{task.categoryName}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.metaText}>{task.time}</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.metaText} numberOfLines={2}>{task.address}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Tasker info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Tasker</Text>
          <View style={styles.taskerRow}>
            <Image source={{ uri: task.taskerAvatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.taskerName}>{task.taskerName}</Text>
              <Text style={styles.taskerSub}>Confirmed for this task</Text>
            </View>
            <TouchableOpacity
              style={styles.contactBtn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Chat', {
                conversationId:    CHAT_CONVERSATIONS[0].id,
                participantName:   task.taskerName,
                participantAvatar: task.taskerAvatar,
              })}
            >
              <Ionicons name="chatbubble-outline" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Pricing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Estimated total</Text>
            <Text style={styles.priceValue}>${task.totalRate.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Actions */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionRow} activeOpacity={0.75}>
            <Ionicons name="create-outline" size={20} color={COLORS.primary} />
            <Text style={styles.actionText}>Edit task details</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.inactive} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionRow} activeOpacity={0.75}>
            <Ionicons name="time-outline" size={20} color={COLORS.primary} />
            <Text style={styles.actionText}>Reschedule</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.inactive} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Cancel button */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.85}>
          <Text style={styles.cancelBtnText}>Cancel Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroll: {
    padding: 0,
  },

  banner: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  bannerText: {
    fontFamily: FONTS.familySemibold,
    fontSize: 14,
    color: COLORS.white,
  },

  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  divider: {
    height: 8,
    backgroundColor: COLORS.background,
  },
  sectionTitle: {
    fontFamily: FONTS.familyBold,
    fontSize: 13,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 14,
  },

  categoryName: {
    fontFamily: FONTS.familyBold,
    fontSize: 22,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  metaText: {
    fontFamily: FONTS.family,
    fontSize: 14,
    color: COLORS.textSecondary,
    flex: 1,
  },

  taskerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.border,
  },
  taskerName: {
    fontFamily: FONTS.familySemibold,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  taskerSub: {
    fontFamily: FONTS.family,
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  contactBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontFamily: FONTS.family,
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  priceValue: {
    fontFamily: FONTS.familyBold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  actionText: {
    fontFamily: FONTS.familyMedium,
    fontSize: 15,
    color: COLORS.textPrimary,
    flex: 1,
  },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  cancelBtn: {
    height: 52,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontFamily: FONTS.familyBold,
    fontSize: 15,
    color: COLORS.accent,
  },
});
