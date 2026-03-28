// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/booking/TaskerProfileScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AVAILABLE_SLOTS } from '../../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatDate = (str) =>
  new Date(str).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

// ── Sub-components ────────────────────────────────────────────────────────────

function EliteBadge() {
  return (
    <View style={styles.eliteBadge}>
      <Ionicons name="shield-checkmark" size={11} color={COLORS.white} />
      <Text style={styles.eliteText}>Elite</Text>
    </View>
  );
}

function SectionTitle({ title }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function Divider() {
  return <View style={styles.divider} />;
}

// ── Profile header ────────────────────────────────────────────────────────────
function ProfileHeader({ tasker }) {
  return (
    <View style={styles.profileHeader}>
      <Image source={{ uri: tasker.avatar }} style={styles.bigAvatar} />

      <View style={styles.nameBlock}>
        <Text style={styles.profileName}>{tasker.name}</Text>
        {tasker.isElite && <EliteBadge />}
      </View>

      {/* Stars */}
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((s) => (
          <Ionicons
            key={s}
            name={s <= Math.round(tasker.rating) ? 'star' : 'star-outline'}
            size={16}
            color={COLORS.star}
          />
        ))}
        <Text style={styles.ratingNum}> {tasker.rating}</Text>
        <Text style={styles.ratingMeta}> · {tasker.reviewCount} reviews</Text>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{tasker.totalTasks}</Text>
          <Text style={styles.statLabel}>Tasks done</Text>
        </View>
        <View style={styles.statDot} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{tasker.workPhotoCount}</Text>
          <Text style={styles.statLabel}>Work photos</Text>
        </View>
        <View style={styles.statDot} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>${tasker.hourlyRate.toFixed(0)}</Text>
          <Text style={styles.statLabel}>Per hour</Text>
        </View>
      </View>
    </View>
  );
}

// ── Tools section ─────────────────────────────────────────────────────────────
function ToolsSection({ tools }) {
  return (
    <View style={styles.section}>
      <SectionTitle title="Tools" />
      <View style={styles.toolsChips}>
        {tools.map((t) => (
          <View key={t} style={styles.toolChip}>
            <Text style={styles.toolChipText}>{t}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ── Skills section ────────────────────────────────────────────────────────────
function SkillsSection({ skills }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.section}>
      <SectionTitle title="Skills & experience" />
      <Text
        style={styles.bodyText}
        numberOfLines={expanded ? undefined : 4}
      >
        {skills}
      </Text>
      <TouchableOpacity
        onPress={() => setExpanded((v) => !v)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={{ marginTop: 6 }}
      >
        <Text style={styles.readMore}>
          {expanded ? 'Show less' : 'Read more'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Photos section ────────────────────────────────────────────────────────────
function PhotosSection({ photos, count }) {
  return (
    <View style={styles.section}>
      <SectionTitle title={`Work Photos (${count})`} />
      <FlatList
        data={photos}
        renderItem={({ item }) => (
          <View style={styles.photoWrap}>
            <Image source={{ uri: item.uri }} style={styles.photo} resizeMode="cover" />
            <Text style={styles.photoLabel} numberOfLines={1}>{item.label}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.photoList}
      />
    </View>
  );
}

// ── Rating bar row ────────────────────────────────────────────────────────────
function RatingBar({ stars, count, total }) {
  const pct = total > 0 ? count / total : 0;
  return (
    <View style={styles.ratingBarRow}>
      <Ionicons name="star" size={12} color={COLORS.star} />
      <Text style={styles.starLabel}>{stars}</Text>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${pct * 100}%` }]} />
      </View>
      <Text style={styles.barCount}>{count}</Text>
    </View>
  );
}

// ── Review card ───────────────────────────────────────────────────────────────
function ReviewCard({ review }) {
  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: review.userAvatar }} style={styles.reviewAvatar} />
        <View style={styles.reviewMeta}>
          <Text style={styles.reviewName}>{review.userName}</Text>
          <View style={styles.reviewStarsRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Ionicons
                key={s}
                name="star"
                size={11}
                color={s <= review.rating ? COLORS.star : COLORS.border}
              />
            ))}
            <Text style={styles.reviewDate}> · {formatDate(review.date)}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.reviewComment}>{review.comment}</Text>
    </View>
  );
}

// ── Ratings & reviews section ─────────────────────────────────────────────────
function RatingsSection({ tasker }) {
  const total = Object.values(tasker.ratingBreakdown).reduce((s, n) => s + n, 0);
  return (
    <View style={styles.section}>
      <SectionTitle title="Ratings & Reviews" />

      {/* Overall score */}
      <View style={styles.overallRow}>
        <Text style={styles.overallScore}>{tasker.rating}</Text>
        <View>
          <View style={styles.overallStars}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Ionicons key={s} name="star" size={14} color={COLORS.star} />
            ))}
          </View>
          <Text style={styles.overallCount}>{total} reviews</Text>
        </View>
      </View>

      {/* Breakdown bars */}
      <View style={styles.barsWrap}>
        {[5, 4, 3, 2, 1].map((stars) => (
          <RatingBar
            key={stars}
            stars={stars}
            count={tasker.ratingBreakdown[stars] ?? 0}
            total={total}
          />
        ))}
      </View>

      <Divider />

      {/* Individual reviews */}
      {tasker.reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </View>
  );
}

// ── Schedule modal ────────────────────────────────────────────────────────────
function ScheduleModal({ visible, onClose, onConfirm }) {
  const insets = useSafeAreaInsets();
  const [dateIdx, setDateIdx]     = useState(0);
  const [timeSlot, setTimeSlot]   = useState(null);

  const slot = AVAILABLE_SLOTS[dateIdx];
  const canConfirm = timeSlot !== null;

  const handleConfirm = () => {
    onConfirm({ date: slot.date, time: timeSlot });
    // reset for next open
    setTimeSlot(null);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableOpacity style={modal.overlay} onPress={onClose} activeOpacity={1}>
        <TouchableOpacity
          style={[modal.sheet, { paddingBottom: Math.max(insets.bottom, 24) }]}
          activeOpacity={1}
        >
          {/* Handle */}
          <View style={modal.handle} />

          <Text style={modal.title}>Select Date & Time</Text>

          {/* Date selector */}
          <Text style={modal.sectionLabel}>Date</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={modal.dateRow}
          >
            {AVAILABLE_SLOTS.map((s, i) => {
              const parts = s.date.split(' '); // e.g. ["Mon", "Mar", "29"]
              const active = i === dateIdx;
              return (
                <TouchableOpacity
                  key={i}
                  style={[modal.dateBtn, active && modal.dateBtnActive]}
                  onPress={() => { setDateIdx(i); setTimeSlot(null); }}
                  activeOpacity={0.75}
                >
                  <Text style={[modal.dateDayName, active && modal.dateDayNameActive]}>
                    {parts[0]}
                  </Text>
                  <Text style={[modal.dateDayNum, active && modal.dateDayNumActive]}>
                    {parts[2]}
                  </Text>
                  <Text style={[modal.dateMonth, active && modal.dateMonthActive]}>
                    {parts[1]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Time selector */}
          <Text style={modal.sectionLabel}>Available times</Text>
          <View style={modal.timeGrid}>
            {slot?.times.map((t) => {
              const active = t === timeSlot;
              return (
                <TouchableOpacity
                  key={t}
                  style={[modal.timeBtn, active && modal.timeBtnActive]}
                  onPress={() => setTimeSlot(t)}
                  activeOpacity={0.75}
                >
                  <Text style={[modal.timeText, active && modal.timeTextActive]}>{t}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Confirm */}
          <TouchableOpacity
            style={[modal.confirmBtn, !canConfirm && modal.confirmBtnDisabled]}
            onPress={canConfirm ? handleConfirm : undefined}
            activeOpacity={0.85}
          >
            <Text style={[modal.confirmText, !canConfirm && modal.confirmTextDisabled]}>
              Confirm Date & Time
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function TaskerProfileScreen({ navigation, route }) {
  const { tasker } = route.params;
  const insets = useSafeAreaInsets();
  const [scheduleOpen, setScheduleOpen] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: tasker.name });
  }, [navigation, tasker]);

  const handleConfirmSchedule = ({ date, time }) => {
    setScheduleOpen(false);
    navigation.navigate('TaskDetails', {
      ...route.params,
      selectedDate: date,
      selectedTime: time,
    });
  };

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <ProfileHeader tasker={tasker} />
        <Divider />
        <ToolsSection tools={tasker.tools} />
        <Divider />
        <SkillsSection skills={tasker.skills} />
        <Divider />
        <PhotosSection photos={tasker.photos} count={tasker.workPhotoCount} />
        <Divider />
        <RatingsSection tasker={tasker} />
      </ScrollView>

      {/* ── Fixed bottom bar ── */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View>
          <Text style={styles.bottomRate}>
            ${tasker.hourlyRate.toFixed(2)}
            <Text style={styles.bottomRateUnit}>/hr</Text>
          </Text>
          <Text style={styles.bottomRateLabel}>Starting rate</Text>
        </View>
        <TouchableOpacity
          style={styles.selectBtn}
          onPress={() => setScheduleOpen(true)}
          activeOpacity={0.85}
        >
          <Text style={styles.selectBtnText}>Select</Text>
        </TouchableOpacity>
      </View>

      {/* ── Schedule modal ── */}
      <ScheduleModal
        visible={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        onConfirm={handleConfirmSchedule}
      />
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  divider: {
    height: 8,
    backgroundColor: COLORS.background,
  },

  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  bodyText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 21,
  },
  readMore: {
    fontSize: 13,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },

  // Profile header
  profileHeader: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  bigAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.border,
    marginBottom: 12,
  },
  nameBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  profileName: {
    fontSize: 20,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  eliteBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 8,
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
    marginBottom: 16,
  },
  ratingNum: {
    fontSize: 14,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  ratingMeta: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statDot: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.border,
  },

  // Tools
  toolsChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  toolChip: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  toolChipText: {
    fontSize: 13,
    fontWeight: FONTS.medium,
    color: COLORS.textPrimary,
  },

  // Photos
  photoList: {
    paddingHorizontal: 0,
    gap: 10,
  },
  photoWrap: {
    width: 240,
  },
  photo: {
    width: 240,
    height: 155,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.border,
  },
  photoLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 5,
    paddingHorizontal: 2,
  },

  // Rating bars
  overallRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  overallScore: {
    fontSize: 44,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    lineHeight: 50,
  },
  overallStars: {
    flexDirection: 'row',
    gap: 2,
  },
  overallCount: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  barsWrap: {
    gap: 6,
    marginBottom: 20,
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starLabel: {
    fontSize: 12,
    fontWeight: FONTS.semibold,
    color: COLORS.textSecondary,
    width: 12,
    textAlign: 'right',
  },
  barTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.border,
    overflow: 'hidden',
  },
  barFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
  },
  barCount: {
    fontSize: 12,
    color: COLORS.textSecondary,
    width: 28,
    textAlign: 'right',
  },

  // Review card
  reviewCard: {
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.border,
  },
  reviewMeta: {
    flex: 1,
    justifyContent: 'center',
  },
  reviewName: {
    fontSize: 13,
    fontWeight: FONTS.semibold,
    color: COLORS.textPrimary,
    marginBottom: 3,
  },
  reviewStarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDate: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  reviewComment: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
    paddingLeft: 48,
  },

  // Bottom bar
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
    ...SHADOW.bar,
  },
  bottomRate: {
    fontSize: 20,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  bottomRateUnit: {
    fontSize: 14,
    fontWeight: FONTS.regular,
    color: COLORS.textSecondary,
  },
  bottomRateLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  selectBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    paddingHorizontal: 36,
  },
  selectBtnText: {
    fontSize: 16,
    fontWeight: FONTS.bold,
    color: COLORS.white,
    letterSpacing: 0.3,
  },
});

// ── Schedule modal styles ─────────────────────────────────────────────────────
const modal = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: FONTS.semibold,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },

  // Date row
  dateRow: {
    gap: 8,
    paddingBottom: 20,
  },
  dateBtn: {
    width: 60,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  dateBtnActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  dateDayName: {
    fontSize: 11,
    fontWeight: FONTS.semibold,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  dateDayNameActive: { color: COLORS.primary },
  dateDayNum: {
    fontSize: 18,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  dateDayNumActive: { color: COLORS.primary },
  dateMonth: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 3,
  },
  dateMonthActive: { color: COLORS.primary },

  // Time grid
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  timeBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  timeBtnActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  timeText: {
    fontSize: 14,
    fontWeight: FONTS.semibold,
    color: COLORS.textPrimary,
  },
  timeTextActive: { color: COLORS.primary },

  // Confirm
  confirmBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  confirmBtnDisabled: {
    backgroundColor: COLORS.surface,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: FONTS.bold,
    color: COLORS.white,
    letterSpacing: 0.3,
  },
  confirmTextDisabled: {
    color: COLORS.inactive,
  },
});
