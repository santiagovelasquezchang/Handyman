// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/booking/TaskDateTimeScreen.js
//  Step 3 of the booking funnel — Date & Time selection.
//  Inserted between TaskScopeStep and TaskLoading so the user picks
//  when they need the service before seeing available Taskers.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AVAILABLE_SLOTS } from '../../../mockData';
import { COLORS, FONTS, RADIUS } from '../../theme';
import BottomBar from '../../components/BottomBar';

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ step, total }) {
  const pct = `${Math.round((step / total) * 100)}%`;
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: pct }]} />
    </View>
  );
}

// ── Category chip ─────────────────────────────────────────────────────────────
function CategoryChip({ name }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{name}</Text>
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function TaskDateTimeScreen({ navigation, route }) {
  const { category, address, answers } = route.params;

  // Progress: location(1) + all scope steps + this screen
  const totalSteps = (category.scoping_details?.length ?? 0) + 2;
  const currentStep = totalSteps;

  const [dateIdx,  setDateIdx]  = useState(0);
  const [timeSlot, setTimeSlot] = useState(null);

  const slot      = AVAILABLE_SLOTS[dateIdx];
  const canSubmit = timeSlot !== null;

  // ── Navigate helpers ────────────────────────────────────────────────────────
  const goNext = (selectedDate, selectedTime) => {
    navigation.navigate('TaskLoading', {
      ...route.params,
      selectedDate,
      selectedTime,
    });
  };

  const handleRightNow = () => goNext('Right Now', 'ASAP');

  const handleContinue = () => {
    if (canSubmit) goNext(slot.date, timeSlot);
  };

  // ── Date chip ───────────────────────────────────────────────────────────────
  const renderDateChip = (s, i) => {
    const parts  = s.date.split(' ');          // ['Mon', 'Mar', '29']
    const active = i === dateIdx;
    return (
      <TouchableOpacity
        key={i}
        style={[styles.dateBtn, active && styles.dateBtnActive]}
        onPress={() => { setDateIdx(i); setTimeSlot(null); }}
        activeOpacity={0.75}
      >
        <Text style={[styles.dateDayName, active && styles.dateActiveText]}>
          {parts[0]}
        </Text>
        <Text style={[styles.dateDayNum, active && styles.dateActiveBold]}>
          {parts[2]}
        </Text>
        <Text style={[styles.dateMonth, active && styles.dateActiveText]}>
          {parts[1]}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.root}>
      <ProgressBar step={currentStep} total={totalSteps} />

      {/* Back button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        activeOpacity={0.65}
      >
        <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
        <Text style={styles.backLabel}>Back</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <CategoryChip name={category?.name ?? 'Service'} />

        <Text style={styles.title}>When do you need it?</Text>
        <Text style={styles.subtitle}>
          We'll show you Taskers available for your chosen time.
        </Text>

        {/* ── Right Now (ASAP) ── */}
        <TouchableOpacity
          style={styles.asapBtn}
          onPress={handleRightNow}
          activeOpacity={0.85}
        >
          <Ionicons name="flash" size={20} color={COLORS.white} />
          <Text style={styles.asapText}>Right Now (ASAP)</Text>
        </TouchableOpacity>

        {/* ── Or divider ── */}
        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orLabel}>or schedule for later</Text>
          <View style={styles.orLine} />
        </View>

        {/* ── Date selector ── */}
        <Text style={styles.sectionLabel}>Date</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateRow}
        >
          {AVAILABLE_SLOTS.map(renderDateChip)}
        </ScrollView>

        {/* ── Time selector ── */}
        <Text style={styles.sectionLabel}>Available times</Text>
        <View style={styles.timeGrid}>
          {slot?.times.map((t) => {
            const active = t === timeSlot;
            return (
              <TouchableOpacity
                key={t}
                style={[styles.timeBtn, active && styles.timeBtnActive]}
                onPress={() => setTimeSlot(t)}
                activeOpacity={0.75}
              >
                <Text style={[styles.timeText, active && styles.timeTextActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <BottomBar
        label="Continue"
        onPress={handleContinue}
        disabled={!canSubmit}
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

  // Progress
  progressTrack: {
    height: 3,
    backgroundColor: COLORS.border,
  },
  progressFill: {
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },

  // Back
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 2,
  },
  backLabel: {
    fontSize: 14,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
  },

  // Scroll
  scroll: {
    padding: 20,
    paddingBottom: 32,
  },

  // Category chip
  chip: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 18,
  },
  chipText: {
    fontSize: 12,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
  },

  // Title
  title: {
    fontSize: 22,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    lineHeight: 30,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: 24,
  },

  // ASAP button
  asapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    height: 56,
    gap: 10,
    marginBottom: 20,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },
  asapText: {
    fontSize: 16,
    fontWeight: FONTS.bold,
    color: COLORS.white,
    letterSpacing: 0.3,
  },

  // Or divider
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
  },
  orLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
  },
  orLabel: {
    fontSize: 12,
    fontWeight: FONTS.semibold,
    color: COLORS.textSecondary,
    letterSpacing: 0.3,
  },

  // Section label
  sectionLabel: {
    fontSize: 12,
    fontWeight: FONTS.semibold,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },

  // Date chips
  dateRow: {
    gap: 8,
    paddingBottom: 20,
  },
  dateBtn: {
    width: 62,
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
  dateDayNum: {
    fontSize: 18,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  dateMonth: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 3,
  },
  dateActiveText: {
    color: COLORS.primary,
  },
  dateActiveBold: {
    color: COLORS.primary,
    fontWeight: FONTS.bold,
  },

  // Time grid
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  timeBtn: {
    paddingVertical: 11,
    paddingHorizontal: 18,
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
  timeTextActive: {
    color: COLORS.primary,
  },
});
