// ─────────────────────────────────────────────────────────────────────────────
//  AccountSettingsScreen  –  Edit profile info  [STUB – Phase 1]
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TextInput, TouchableOpacity, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { USER_PROFILE } from '../../../mockData';

export default function AccountSettingsScreen() {
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState({
    firstName: USER_PROFILE.firstName,
    lastName:  USER_PROFILE.lastName,
    email:     USER_PROFILE.email,
    phone:     USER_PROFILE.phone,
    zipCode:   USER_PROFILE.zipCode,
  });

  const field = (label, key, keyboardType = 'default') => (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={form[key]}
        onChangeText={(v) => setForm((f) => ({ ...f, [key]: v }))}
        keyboardType={keyboardType}
        placeholderTextColor={COLORS.textDisabled}
      />
    </View>
  );

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        {field('First Name', 'firstName')}
        {field('Last Name',  'lastName')}
        {field('Email',      'email',   'email-address')}
        {field('Phone',      'phone',   'phone-pad')}
        {field('Zip / Postal Code', 'zipCode', 'numeric')}
      </View>

      <TouchableOpacity
        style={styles.saveBtn}
        activeOpacity={0.85}
        onPress={() => Alert.alert('Saved', 'Your account details have been updated.')}
      >
        <Text style={styles.saveBtnText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteBtn}
        activeOpacity={0.85}
        onPress={() =>
          Alert.alert('Delete Account', 'This action is permanent. Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => {} },
          ])
        }
      >
        <Text style={styles.deleteBtnText}>Delete Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root:    { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, gap: 16 },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: 20,
    gap: 16,
    ...SHADOW.card,
  },
  fieldWrap: { gap: 6 },
  label: { fontSize: 12, fontWeight: FONTS.semibold, color: COLORS.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: {
    borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.sm,
    paddingHorizontal: 14, paddingVertical: 11,
    fontSize: 15, color: COLORS.textPrimary, backgroundColor: COLORS.white,
  },

  saveBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.lg,
    paddingVertical: 15,
    alignItems: 'center',
    ...SHADOW.card,
  },
  saveBtnText: { color: COLORS.textOnAccent, fontWeight: FONTS.bold, fontSize: 16 },

  deleteBtn: {
    borderWidth: 1.5, borderColor: COLORS.accent,
    borderRadius: RADIUS.lg, paddingVertical: 14, alignItems: 'center',
  },
  deleteBtnText: { color: COLORS.accent, fontWeight: FONTS.semibold, fontSize: 15 },
});
