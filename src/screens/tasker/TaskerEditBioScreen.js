// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/tasker/TaskerEditBioScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TASKER_PROFILE } from '../../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const MAX_CHARS = 500;

export default function TaskerEditBioScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [bio, setBio] = useState(TASKER_PROFILE.bio);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 32 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.hint}>
          Write a short bio that helps clients understand your experience and specialties.
        </Text>

        {/* Bio input card */}
        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            value={bio}
            onChangeText={(t) => t.length <= MAX_CHARS && setBio(t)}
            multiline
            textAlignVertical="top"
            placeholder="Describe your skills, experience, and what makes you great…"
            placeholderTextColor={COLORS.textDisabled}
          />
          <Text style={styles.charCount}>
            <Text style={bio.length > MAX_CHARS * 0.9 ? styles.charCountWarn : null}>
              {bio.length}
            </Text>
            /{MAX_CHARS}
          </Text>
        </View>

        {/* Tips card */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Tips for a great bio</Text>
          {[
            'Mention your years of experience',
            'List your main specialties',
            'Add any certifications or tools you use',
            'Keep it friendly and professional',
          ].map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <View style={styles.tipDot} />
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Save button */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.85}
        >
          <Text style={styles.saveBtnText}>Save Bio</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F9FA' },
  scroll: { padding: 16 },

  hint: {
    fontFamily: FONTS.family,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 21,
    marginBottom: 16,
  },

  inputCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 16,
    ...SHADOW.card,
  },
  input: {
    fontFamily: FONTS.family,
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 22,
    minHeight: 180,
    padding: 0,
  },
  charCount: {
    fontFamily: FONTS.family,
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'right',
    marginTop: 8,
  },
  charCountWarn: { color: COLORS.accent },

  tipsCard: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 24,
    gap: 8,
  },
  tipsTitle: {
    fontFamily: FONTS.familySemibold,
    fontSize: 13,
    color: COLORS.primary,
    marginBottom: 4,
  },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  tipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
    marginTop: 6,
  },
  tipText: { fontFamily: FONTS.family, fontSize: 13, color: COLORS.primary, flex: 1 },

  saveBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.pill,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: { fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.white },
});
