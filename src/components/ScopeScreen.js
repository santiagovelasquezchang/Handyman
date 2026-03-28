// ─────────────────────────────────────────────────────────────────────────────
//  src/components/ScopeScreen.js
//  Shared layout for all scope steps (rooms, baths, condition, pets).
//  Keeps each individual screen file thin.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../theme';
import ScopeOptionButton from './ScopeOptionButton';
import BottomBar from './BottomBar';

// ── Thin progress bar ─────────────────────────────────────────────────────────
function ProgressBar({ step, total }) {
  const pct = `${Math.round((step / total) * 100)}%`;
  return (
    <View style={progress.track}>
      <View style={[progress.fill, { width: pct }]} />
    </View>
  );
}
const progress = StyleSheet.create({
  track: {
    height: 3,
    backgroundColor: COLORS.border,
  },
  fill: {
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
});

// ── Category context chip ─────────────────────────────────────────────────────
function CategoryChip({ name }) {
  return (
    <View style={chip.wrap}>
      <Text style={chip.text}>{name}</Text>
    </View>
  );
}
const chip = StyleSheet.create({
  wrap: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 18,
  },
  text: {
    fontSize: 12,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
  },
});

// ── Main layout ───────────────────────────────────────────────────────────────

/**
 * @param {number}   step       – current funnel step (1-based)
 * @param {number}   totalSteps – total number of steps (default 5)
 * @param {object}   category   – { name } from mockData
 * @param {string}   title      – question shown in large text
 * @param {string}   [hint]     – optional small subtitle below title
 * @param {Array}    options    – [{ label, subtitle?, emoji?, key? }]
 * @param {string}   selected   – currently selected option key/label
 * @param {Function} onSelect   – called with the option key/label
 * @param {Function} onContinue – called when Continue is pressed
 */
export default function ScopeScreen({
  step,
  totalSteps = 5,
  category,
  title,
  hint,
  options,
  selected,
  onSelect,
  onContinue,
}) {
  return (
    <View style={styles.root}>
      <ProgressBar step={step} total={totalSteps} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <CategoryChip name={category?.name ?? 'Service'} />

        <Text style={styles.title}>{title}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}

        <View style={styles.options}>
          {options.map((opt) => {
            const key = opt.key ?? opt.label;
            return (
              <ScopeOptionButton
                key={key}
                label={opt.label}
                subtitle={opt.subtitle}
                emoji={opt.emoji}
                selected={selected === key}
                onPress={() => onSelect(key)}
              />
            );
          })}
        </View>
      </ScrollView>

      <BottomBar
        label="Continue"
        onPress={onContinue}
        disabled={!selected}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroll: {
    padding: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    lineHeight: 30,
    marginBottom: 8,
  },
  hint: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: 22,
  },
  options: {
    marginTop: 14,
  },
});
