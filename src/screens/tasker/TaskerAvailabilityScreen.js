// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/tasker/TaskerAvailabilityScreen.js
//
//  Layout:
//   ┌──────────────────────────────────────┐
//   │  [Calendar]  [Map]  ← segmented ctrl │
//   ├──────────────────────────────────────┤
//   │  Mon  Tue  Wed  Thu … ← date strip   │
//   ├──────────────────────────────────────┤
//   │  8 AM ─────────────────────────────  │
//   │  9 AM ─────────────────────────────  │
//   │ …                                    │
//   │ 2 PM  ┌──[Available block]──────┐    │
//   │ 3 PM  │  ╍╍  Available  ╍╍     │    │
//   │ 4 PM  └───────────────────── ╍╍ ┘   │
//   │ …                                    │
//   └──────────────────────────────────────┘
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS } from '../../theme';

// ── Constants ─────────────────────────────────────────────────────────────────
const HOUR_HEIGHT  = 64;           // px per hour
const START_HOUR   = 8;            // 8 AM
const END_HOUR     = 22;           // 10 PM (last label)
const TIME_COL_W   = 52;           // width of the left time-label column
const GRID_PAD_R   = 16;           // right padding inside the grid
const SCREEN_W     = Dimensions.get('window').width;

// Hours array: ['8 AM', '9 AM', … '10 PM']
const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => {
  const h = START_HOUR + i;
  if (h === 0)  return '12 AM';
  if (h === 12) return '12 PM';
  return h < 12 ? `${h} AM` : `${h - 12} PM`;
});

// Total scrollable height (one row per hour, last label is just a cap)
const GRID_HEIGHT = (HOURS.length - 1) * HOUR_HEIGHT;

// ── Generate next 14 days ─────────────────────────────────────────────────────
const DAY_SHORT   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun',
                     'Jul','Aug','Sep','Oct','Nov','Dec'];

function buildDates(count = 14) {
  const base = new Date('2026-03-29');
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    return {
      key:       d.toISOString().slice(0, 10),
      dayName:   DAY_SHORT[d.getDay()],
      dayNum:    d.getDate(),
      monthName: MONTH_SHORT[d.getMonth()],
    };
  });
}
const DATES = buildDates(14);

// ── Mock availability blocks for each date ────────────────────────────────────
// Each block: { startHour (24h float), endHour (24h float), label }
const AVAILABILITY = {
  '2026-03-29': [{ startHour: 9,  endHour: 12, label: 'Available' }],
  '2026-03-30': [{ startHour: 14, endHour: 18, label: 'Available' }],
  '2026-03-31': [
    { startHour: 8,  endHour: 11, label: 'Available' },
    { startHour: 15, endHour: 17, label: 'Available' },
  ],
  default:       [{ startHour: 14, endHour: 16, label: 'Available' }],
};

// ── Segmented control ─────────────────────────────────────────────────────────
function SegmentedControl({ tabs, active, onChange }) {
  return (
    <View style={styles.segWrap}>
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.segTab, isActive && styles.segTabActive]}
            onPress={() => onChange(tab.key)}
            activeOpacity={0.75}
          >
            <Text style={[styles.segText, isActive && styles.segTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ── Date strip item ───────────────────────────────────────────────────────────
function DateItem({ item, isActive, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.dateItem, isActive && styles.dateItemActive]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={[styles.dateDayName, isActive && styles.dateDayNameActive]}>
        {item.dayName}
      </Text>
      <Text style={[styles.dateDayNum, isActive && styles.dateDayNumActive]}>
        {item.dayNum}
      </Text>
      <Text style={[styles.dateMonth, isActive && styles.dateMonthActive]}>
        {item.monthName}
      </Text>
      {isActive && <View style={styles.dateActiveDot} />}
    </TouchableOpacity>
  );
}

// ── Availability block ────────────────────────────────────────────────────────
function AvailBlock({ block }) {
  const top    = (block.startHour - START_HOUR) * HOUR_HEIGHT;
  const height = (block.endHour  - block.startHour) * HOUR_HEIGHT;

  const startLabel = HOURS[block.startHour - START_HOUR];
  const endLabel   = HOURS[block.endHour   - START_HOUR];

  return (
    <View
      style={[
        styles.availBlock,
        { top, height, left: TIME_COL_W + 8, right: GRID_PAD_R },
      ]}
    >
      {/* Top grabber */}
      <View style={styles.grabberWrap}>
        <View style={styles.grabberLine} />
        <View style={[styles.grabberLine, styles.grabberLineShort]} />
      </View>

      {/* Content */}
      <View style={styles.availContent}>
        <Ionicons name="checkmark-circle" size={14} color={COLORS.accent} />
        <Text style={styles.availLabel}>{block.label}</Text>
        <Text style={styles.availTime}>{startLabel} – {endLabel}</Text>
      </View>

      {/* Bottom grabber */}
      <View style={styles.grabberWrap}>
        <View style={[styles.grabberLine, styles.grabberLineShort]} />
        <View style={styles.grabberLine} />
      </View>
    </View>
  );
}

// ── Timeline grid ─────────────────────────────────────────────────────────────
function TimelineGrid({ blocks }) {
  return (
    // Outer view defines the coordinate space for absolute children
    <View style={{ height: GRID_HEIGHT, position: 'relative' }}>
      {/* Hour rows — time label + divider line */}
      {HOURS.map((hour, i) => (
        <View
          key={hour}
          style={[styles.hourRow, { top: i * HOUR_HEIGHT }]}
          pointerEvents="none"
        >
          {/* Time label */}
          <Text style={styles.hourLabel}>{hour}</Text>

          {/* Divider — only between hours, not after the last label */}
          {i < HOURS.length - 1 && (
            <View style={styles.hourDivider} />
          )}

          {/* Half-hour tick mark */}
          {i < HOURS.length - 1 && (
            <View style={[styles.halfHourTick, { top: HOUR_HEIGHT / 2 }]} />
          )}
        </View>
      ))}

      {/* Availability blocks (absolutely positioned) */}
      {blocks.map((block, i) => (
        <AvailBlock key={i} block={block} />
      ))}
    </View>
  );
}

// ── Map placeholder ───────────────────────────────────────────────────────────
function MapPlaceholder() {
  return (
    <View style={styles.mapPlaceholder}>
      <Ionicons name="map-outline" size={52} color={COLORS.border} />
      <Text style={styles.mapPlaceholderTitle}>Service Area Map</Text>
      <Text style={styles.mapPlaceholderSub}>
        Set your service radius on the map to control where you take jobs.
      </Text>
      <TouchableOpacity style={styles.mapBtn} activeOpacity={0.85}>
        <Text style={styles.mapBtnText}>Set Service Area</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function TaskerAvailabilityScreen() {
  const insets = useSafeAreaInsets();
  const [tab,         setTab]         = useState('calendar');
  const [selectedKey, setSelectedKey] = useState(DATES[0].key);

  const blocks = AVAILABILITY[selectedKey] ?? AVAILABILITY.default;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Availability</Text>
        <SegmentedControl
          tabs={[
            { key: 'calendar', label: 'Calendar' },
            { key: 'map',      label: 'Map'      },
          ]}
          active={tab}
          onChange={setTab}
        />
      </View>

      {tab === 'map' ? (
        <MapPlaceholder />
      ) : (
        <>
          {/* ── Date strip ── */}
          <View style={styles.dateStrip}>
            <FlatList
              data={DATES}
              keyExtractor={(item) => item.key}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dateList}
              renderItem={({ item }) => (
                <DateItem
                  item={item}
                  isActive={item.key === selectedKey}
                  onPress={() => setSelectedKey(item.key)}
                />
              )}
            />
          </View>

          {/* ── Timeline ── */}
          <ScrollView
            style={styles.timelineScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.timelineContent}
          >
            <TimelineGrid blocks={blocks} />
          </ScrollView>
        </>
      )}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontFamily: FONTS.familyBold,
    fontSize: 22,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },

  // ── Segmented control ──────────────────────────────────────────────────────
  segWrap: {
    flexDirection: 'row',
    borderBottomWidth: 0,
  },
  segTab: {
    flex: 1,
    paddingBottom: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  segTabActive: {
    borderBottomColor: COLORS.primary,
  },
  segText: {
    fontFamily: FONTS.familyMedium,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  segTextActive: {
    fontFamily: FONTS.familyBold,
    color: COLORS.primary,
  },

  // ── Date strip ────────────────────────────────────────────────────────────
  dateStrip: {
    backgroundColor: COLORS.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  dateList: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6,
  },
  dateItem: {
    width: 52,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: RADIUS.md,
    backgroundColor: 'transparent',
    gap: 2,
  },
  dateItemActive: {
    backgroundColor: COLORS.primaryLight,
  },
  dateDayName: {
    fontFamily: FONTS.familyMedium,
    fontSize: 11,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  dateDayNameActive: {
    color: COLORS.primary,
    fontFamily: FONTS.familyBold,
  },
  dateDayNum: {
    fontFamily: FONTS.familyBold,
    fontSize: 20,
    color: COLORS.textPrimary,
    lineHeight: 24,
  },
  dateDayNumActive: {
    color: COLORS.primary,
  },
  dateMonth: {
    fontFamily: FONTS.family,
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  dateMonthActive: {
    color: COLORS.primary,
  },
  dateActiveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
    marginTop: 3,
  },

  // ── Timeline ──────────────────────────────────────────────────────────────
  timelineScroll: {
    flex: 1,
  },
  timelineContent: {
    paddingTop: 12,
    paddingBottom: 32,
  },

  // Hour rows
  hourRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: HOUR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  hourLabel: {
    width: TIME_COL_W,
    paddingLeft: 16,
    fontFamily: FONTS.family,
    fontSize: 10,
    color: COLORS.textSecondary,
    letterSpacing: 0.2,
    marginTop: -6,         // float label slightly above the line
  },
  hourDivider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginRight: GRID_PAD_R,
  },
  halfHourTick: {
    position: 'absolute',
    left: TIME_COL_W,
    right: GRID_PAD_R + (SCREEN_W - TIME_COL_W - GRID_PAD_R) * 0.92,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.surface,
  },

  // ── Availability block ─────────────────────────────────────────────────────
  availBlock: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 127, 63, 0.13)',
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
    borderRadius: 6,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    justifyContent: 'space-between',
    paddingVertical: 6,
    overflow: 'hidden',
  },

  // Grabber handle (top / bottom)
  grabberWrap: {
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 10,
  },
  grabberLine: {
    width: 32,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,127,63,0.50)',
  },
  grabberLineShort: {
    width: 20,
    opacity: 0.6,
  },

  // Block content
  availContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 6,
  },
  availLabel: {
    fontFamily: FONTS.familyBold,
    fontSize: 13,
    color: COLORS.primary,
    flex: 1,
  },
  availTime: {
    fontFamily: FONTS.family,
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  // ── Map placeholder ───────────────────────────────────────────────────────
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 12,
  },
  mapPlaceholderTitle: {
    fontFamily: FONTS.familyBold,
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  mapPlaceholderSub: {
    fontFamily: FONTS.family,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
  },
  mapBtn: {
    marginTop: 8,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.pill,
    paddingVertical: 13,
    paddingHorizontal: 32,
  },
  mapBtnText: {
    fontFamily: FONTS.familyBold,
    fontSize: 14,
    color: COLORS.white,
  },
});
