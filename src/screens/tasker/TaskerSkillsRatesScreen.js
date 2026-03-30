// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/tasker/TaskerSkillsRatesScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput,
  TouchableOpacity, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TASKER_PROFILE } from '../../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const INITIAL = TASKER_PROFILE.skills.map((skill, i) => ({
  id: `s${i}`,
  name: skill,
  rate: (TASKER_PROFILE.hourlyRate + i * 5).toString(),
  enabled: true,
}));

function SkillRow({ item, onRateChange, onToggle }) {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={[styles.toggle, item.enabled && styles.toggleOn]}
        onPress={onToggle}
        activeOpacity={0.75}
      >
        <View style={[styles.toggleThumb, item.enabled && styles.toggleThumbOn]} />
      </TouchableOpacity>

      <Text style={[styles.skillName, !item.enabled && styles.skillNameOff]}>
        {item.name}
      </Text>

      <View style={[styles.rateInput, !item.enabled && styles.rateInputOff]}>
        <Text style={styles.dollarSign}>$</Text>
        <TextInput
          style={styles.rateField}
          value={item.rate}
          onChangeText={onRateChange}
          keyboardType="numeric"
          editable={item.enabled}
          selectTextOnFocus
        />
        <Text style={styles.perHr}>/hr</Text>
      </View>
    </View>
  );
}

export default function TaskerSkillsRatesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [skills, setSkills] = useState(INITIAL);

  const update = (id, patch) =>
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        data={skills}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 100 }]}
        ListHeaderComponent={
          <Text style={styles.hint}>
            Toggle the services you offer and set your hourly rate for each.
          </Text>
        }
        renderItem={({ item }) => (
          <SkillRow
            item={item}
            onRateChange={(v) => update(item.id, { rate: v })}
            onToggle={() => update(item.id, { enabled: !item.enabled })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        showsVerticalScrollIndicator={false}
      />

      {/* Save button */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F9FA' },
  list: { padding: 16 },
  hint: {
    fontFamily: FONTS.family,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    ...SHADOW.card,
  },
  sep: { height: 10 },

  // Toggle switch
  toggle: {
    width: 40,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleOn: { backgroundColor: COLORS.accent },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.white,
  },
  toggleThumbOn: { alignSelf: 'flex-end' },

  skillName: {
    flex: 1,
    fontFamily: FONTS.familySemibold,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  skillNameOff: { color: COLORS.textSecondary },

  rateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 2,
  },
  rateInputOff: { opacity: 0.4 },
  dollarSign: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textSecondary },
  rateField: {
    fontFamily: FONTS.familyBold,
    fontSize: 15,
    color: COLORS.textPrimary,
    minWidth: 36,
    textAlign: 'center',
    padding: 0,
  },
  perHr: { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },

  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: COLORS.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },
  saveBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.pill,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: { fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.white },
});
