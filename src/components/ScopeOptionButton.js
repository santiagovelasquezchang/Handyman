// ─────────────────────────────────────────────────────────────────────────────
//  src/components/ScopeOptionButton.js  –  Single-select option row
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS } from '../theme';

export default function ScopeOptionButton({ label, subtitle, emoji, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, selected && styles.buttonSelected]}
      onPress={onPress}
      activeOpacity={0.72}
    >
      {/* Left: emoji (optional) + text */}
      <View style={styles.left}>
        {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
        <View style={styles.textBlock}>
          <Text style={[styles.label, selected && styles.labelSelected]}>
            {label}
          </Text>
          {subtitle ? (
            <Text style={[styles.subtitle, selected && styles.subtitleSelected]}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      {/* Right: check indicator */}
      {selected ? (
        <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />
      ) : (
        <View style={styles.emptyCircle} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  buttonSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  emoji: {
    fontSize: 22,
    lineHeight: 28,
  },
  textBlock: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: FONTS.semibold,
    color: COLORS.textPrimary,
  },
  labelSelected: {
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 3,
    lineHeight: 17,
  },
  subtitleSelected: {
    color: COLORS.primaryDark,
  },
  emptyCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: COLORS.borderStrong,
  },
});
