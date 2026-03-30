// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/tasker/TaskerScheduleScreen.js  –  Tasker Tab 2
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TASKER_SCHEDULE } from '../../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES  = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December'];

const TIME_SLOTS = [
  '6:00 AM','7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM',
  '12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM',
];

function toKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
}

// ── Calendar grid ─────────────────────────────────────────────────────────────
function CalendarGrid({ year, month, selectedDay, onSelect }) {
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];

  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const rows = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  return (
    <View>
      {/* Day labels */}
      <View style={styles.calRow}>
        {DAYS_OF_WEEK.map((d) => (
          <View key={d} style={styles.calCell}>
            <Text style={styles.dayLabel}>{d}</Text>
          </View>
        ))}
      </View>
      {/* Day cells */}
      {rows.map((row, ri) => (
        <View key={ri} style={styles.calRow}>
          {row.map((day, ci) => {
            if (!day) return <View key={ci} style={styles.calCell} />;
            const dateKey = toKey(year, month, day);
            const isBooked  = TASKER_SCHEDULE.bookedDays.includes(dateKey);
            const isTimeOff = TASKER_SCHEDULE.timeOffDays?.includes(dateKey);
            const isSelected = selectedDay === dateKey;
            return (
              <TouchableOpacity
                key={ci}
                style={styles.calCell}
                onPress={() => onSelect(isSelected ? null : dateKey)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.dayCircle,
                  isSelected && styles.dayCircleSelected,
                  isTimeOff && styles.dayCircleTimeOff,
                ]}>
                  <Text style={[
                    styles.dayNum,
                    isSelected && styles.dayNumSelected,
                    isTimeOff && styles.dayNumTimeOff,
                  ]}>
                    {day}
                  </Text>
                </View>
                {isBooked && !isTimeOff && (
                  <View style={[styles.dot, isSelected && styles.dotSelected]} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

// ── Working hours picker ──────────────────────────────────────────────────────
function WorkingHours({ dateKey }) {
  const saved  = TASKER_SCHEDULE.workingHours[dateKey] ?? TASKER_SCHEDULE.workingHours.default;
  const [start, setStart] = useState(saved.start);
  const [end,   setEnd]   = useState(saved.end);
  const [pickingStart, setPickingStart] = useState(false);
  const [pickingEnd,   setPickingEnd]   = useState(false);

  const renderPicker = (current, onPick, isOpen) => (
    <View>
      <TouchableOpacity
        style={styles.timePill}
        onPress={() => isOpen ? (onPick(current)) : undefined}
        activeOpacity={0.8}
      >
        <Text style={styles.timePillText}>{current}</Text>
        <Ionicons name="chevron-down" size={13} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.hoursCard}>
      <Text style={styles.hoursTitle}>Working Hours</Text>
      <View style={styles.hoursRow}>
        <View style={styles.hoursField}>
          <Text style={styles.hoursLabel}>Start</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.slotScroll}>
            {TIME_SLOTS.map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.slotChip, start === t && styles.slotChipActive]}
                onPress={() => setStart(t)}
                activeOpacity={0.75}
              >
                <Text style={[styles.slotChipText, start === t && styles.slotChipTextActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.hoursField}>
          <Text style={styles.hoursLabel}>End</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.slotScroll}>
            {TIME_SLOTS.map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.slotChip, end === t && styles.slotChipActive]}
                onPress={() => setEnd(t)}
                activeOpacity={0.75}
              >
                <Text style={[styles.slotChipText, end === t && styles.slotChipTextActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity style={styles.saveHoursBtn} activeOpacity={0.85}>
        <Text style={styles.saveHoursBtnText}>Save Hours</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function TaskerScheduleScreen() {
  const insets = useSafeAreaInsets();
  const [year,  setYear]  = useState(2026);
  const [month, setMonth] = useState(3); // April (0-indexed)
  const [selectedDay, setSelectedDay] = useState(null);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
    setSelectedDay(null);
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>Availability</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Calendar card */}
        <View style={styles.calCard}>
          {/* Month navigation */}
          <View style={styles.monthNav}>
            <TouchableOpacity onPress={prevMonth} style={styles.monthBtn} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.monthTitle}>{MONTH_NAMES[month]} {year}</Text>
            <TouchableOpacity onPress={nextMonth} style={styles.monthBtn} activeOpacity={0.7}>
              <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <CalendarGrid
            year={year}
            month={month}
            selectedDay={selectedDay}
            onSelect={setSelectedDay}
          />

          {/* Legend */}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.accent }]} />
              <Text style={styles.legendText}>Booked</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.border }]} />
              <Text style={styles.legendText}>Time Off</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendCircle]} />
              <Text style={styles.legendText}>Selected</Text>
            </View>
          </View>
        </View>

        {/* Working hours for selected day */}
        {selectedDay ? (
          <WorkingHours dateKey={selectedDay} />
        ) : (
          <View style={styles.noSelCard}>
            <Ionicons name="calendar-outline" size={28} color={COLORS.border} />
            <Text style={styles.noSelText}>Tap a day to set working hours</Text>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
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
  topTitle: {
    fontFamily: FONTS.familyBold,
    fontSize: 20,
    color: COLORS.white,
  },
  scroll: { paddingTop: 16 },

  // Calendar
  calCard: {
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 16,
    ...SHADOW.card,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  monthBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthTitle: {
    fontFamily: FONTS.familyBold,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  calRow: {
    flexDirection: 'row',
  },
  calCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  dayLabel: {
    fontFamily: FONTS.familySemibold,
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleSelected: {
    backgroundColor: COLORS.primary,
  },
  dayCircleTimeOff: {
    backgroundColor: COLORS.surface,
  },
  dayNum: {
    fontFamily: FONTS.familyMedium,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  dayNumSelected: { color: COLORS.white },
  dayNumTimeOff: { color: COLORS.textSecondary },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.accent,
    marginTop: 2,
  },
  dotSelected: { backgroundColor: COLORS.white },

  // Legend
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.primary,
  },
  legendText: {
    fontFamily: FONTS.family,
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  // Working hours
  hoursCard: {
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 16,
    ...SHADOW.card,
  },
  hoursTitle: {
    fontFamily: FONTS.familyBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 14,
  },
  hoursRow: { gap: 14 },
  hoursField: {},
  hoursLabel: {
    fontFamily: FONTS.familySemibold,
    fontSize: 12,
    color: COLORS.textSecondary,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  slotScroll: {},
  slotChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.pill,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  slotChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  slotChipText: {
    fontFamily: FONTS.familyMedium,
    fontSize: 12,
    color: COLORS.textPrimary,
  },
  slotChipTextActive: { color: COLORS.primary },
  saveHoursBtn: {
    marginTop: 16,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveHoursBtnText: {
    fontFamily: FONTS.familyBold,
    fontSize: 14,
    color: COLORS.white,
  },

  // No selection
  noSelCard: {
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 28,
    alignItems: 'center',
    gap: 8,
    ...SHADOW.card,
  },
  noSelText: {
    fontFamily: FONTS.familyMedium,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  timePill: {},
});
