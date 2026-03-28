// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/booking/TaskDetailsScreen.js  –  "Anything else?" step
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import BottomBar from '../../components/BottomBar';

// ── Booking summary card (top of screen) ─────────────────────────────────────
function BookingSummary({ category, selectedDate, selectedTime, tasker, address }) {
  return (
    <View style={styles.summaryCard}>
      {/* Category + date/time */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryIconWrap}>
          <Ionicons name="construct-outline" size={15} color={COLORS.primary} />
        </View>
        <Text style={styles.summaryPrimary}>{category?.name}</Text>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryIconWrap}>
          <Ionicons name="calendar-outline" size={15} color={COLORS.textSecondary} />
        </View>
        <Text style={styles.summarySecondary}>
          {selectedDate}  ·  {selectedTime}
        </Text>
      </View>

      {/* Tasker */}
      {tasker && (
        <View style={styles.summaryRow}>
          <Image source={{ uri: tasker.avatar }} style={styles.summaryAvatar} />
          <Text style={styles.summaryPrimary}>{tasker.name}</Text>
          <Text style={styles.summaryRate}>  ${tasker.hourlyRate.toFixed(2)}/hr</Text>
        </View>
      )}

      {/* Address */}
      {address?.street ? (
        <View style={styles.summaryRow}>
          <View style={styles.summaryIconWrap}>
            <Ionicons name="location-outline" size={15} color={COLORS.textSecondary} />
          </View>
          <Text style={styles.summarySecondary} numberOfLines={1}>{address.street}</Text>
        </View>
      ) : null}
    </View>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function TaskDetailsScreen({ navigation, route }) {
  const {
    category,
    selectedDate,
    selectedTime,
    tasker,
    address,
  } = route.params ?? {};

  const [instructions, setInstructions] = useState('');

  const handleReview = () => {
    navigation.navigate('ReviewConfirm', { ...route.params, instructions });
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <BookingSummary
          category={category}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          tasker={tasker}
          address={address}
        />

        {/* Label */}
        <View style={styles.labelRow}>
          <Text style={styles.title}>Anything else?</Text>
          <Text style={styles.optionalTag}>Optional</Text>
        </View>

        <Text style={styles.subtitle}>
          Add specific instructions, access notes, or any preferences for your Tasker.
        </Text>

        {/* Multiline input */}
        <TextInput
          style={styles.textInput}
          value={instructions}
          onChangeText={setInstructions}
          placeholder={
            `e.g. "Please focus on the kitchen and master bath. We have a small dog named Coco — she's friendly! Entry code is 1234#."`
          }
          placeholderTextColor={COLORS.textDisabled}
          multiline
          textAlignVertical="top"
          maxLength={500}
        />

        {/* Character counter */}
        <Text style={styles.charCount}>{instructions.length}/500</Text>

        {/* Tips */}
        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>
            <Ionicons name="bulb-outline" size={13} color={COLORS.primary} /> Tips
          </Text>
          {[
            'Mention any rooms or areas to prioritise',
            'Note access codes or parking instructions',
            'Let the Tasker know about pets or allergies',
          ].map((tip) => (
            <View key={tip} style={styles.tipRow}>
              <View style={styles.tipDot} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomBar label="Review task" onPress={handleReview} />
    </KeyboardAvoidingView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroll: {
    padding: 20,
    paddingBottom: 32,
  },

  // Summary card
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 28,
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  summaryIconWrap: {
    width: 26,
    alignItems: 'center',
  },
  summaryAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.border,
  },
  summaryPrimary: {
    fontSize: 14,
    fontWeight: FONTS.semibold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  summarySecondary: {
    fontSize: 13,
    color: COLORS.textSecondary,
    flex: 1,
  },
  summaryRate: {
    fontSize: 13,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
  },

  // Title row
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  optionalTag: {
    fontSize: 12,
    fontWeight: FONTS.semibold,
    color: COLORS.textSecondary,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: 16,
  },

  // Text input
  textInput: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    padding: 14,
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 21,
    minHeight: 140,
    backgroundColor: COLORS.white,
  },
  charCount: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'right',
    marginTop: 6,
    marginBottom: 24,
  },

  // Tips
  tips: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.md,
    padding: 14,
    gap: 8,
  },
  tipsTitle: {
    fontSize: 13,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
    marginBottom: 4,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  tipDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginTop: 5,
  },
  tipText: {
    fontSize: 12,
    color: COLORS.primaryDark,
    lineHeight: 18,
    flex: 1,
  },
});
