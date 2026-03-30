// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/tasker/TaskerBankDetailsScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

function FormField({ label, value, onChange, placeholder, keyboardType, secureEntry, icon }) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.fieldRow, focused && styles.fieldRowFocused]}>
        {icon && (
          <Ionicons name={icon} size={17} color={focused ? COLORS.primary : COLORS.textSecondary} style={styles.fieldIcon} />
        )}
        <TextInput
          style={styles.fieldInput}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textDisabled}
          keyboardType={keyboardType ?? 'default'}
          secureTextEntry={secureEntry}
          autoCapitalize="none"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    </View>
  );
}

export default function TaskerBankDetailsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [holder,  setHolder]  = useState('Carlos Rodríguez');
  const [bank,    setBank]    = useState('Banco de Venezuela');
  const [routing, setRouting] = useState('012010082');
  const [account, setAccount] = useState('');

  const handleSave = () => {
    if (!holder || !bank || !routing || !account) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    Alert.alert('Saved', 'Bank details updated successfully.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

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
        {/* Security note */}
        <View style={styles.securityCard}>
          <Ionicons name="shield-checkmark" size={18} color={COLORS.success} />
          <Text style={styles.securityText}>
            Your banking info is encrypted and never shared with clients.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formCard}>
          <FormField
            label="Account Holder Name"
            value={holder}
            onChange={setHolder}
            placeholder="Full legal name"
            icon="person-outline"
          />
          <View style={styles.fieldDivider} />
          <FormField
            label="Bank Name"
            value={bank}
            onChange={setBank}
            placeholder="e.g. Banco de Venezuela"
            icon="business-outline"
          />
          <View style={styles.fieldDivider} />
          <FormField
            label="Routing Number"
            value={routing}
            onChange={setRouting}
            placeholder="9-digit routing number"
            keyboardType="numeric"
            icon="git-branch-outline"
          />
          <View style={styles.fieldDivider} />
          <FormField
            label="Account Number"
            value={account}
            onChange={setAccount}
            placeholder="Enter account number"
            keyboardType="numeric"
            secureEntry
            icon="lock-closed-outline"
          />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>Save Bank Details</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F9FA' },
  scroll: { padding: 16 },

  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: RADIUS.lg,
    padding: 14,
    marginBottom: 16,
  },
  securityText: {
    flex: 1,
    fontFamily: FONTS.family,
    fontSize: 13,
    color: COLORS.success,
    lineHeight: 19,
  },

  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 20,
    gap: 0,
    ...SHADOW.card,
  },
  fieldDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  fieldGroup: { gap: 6 },
  fieldLabel: {
    fontFamily: FONTS.familySemibold,
    fontSize: 12,
    color: COLORS.textSecondary,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    height: 50,
    paddingHorizontal: 12,
    gap: 8,
    backgroundColor: COLORS.white,
  },
  fieldRowFocused: { borderColor: COLORS.primary },
  fieldIcon: {},
  fieldInput: {
    flex: 1,
    fontFamily: FONTS.family,
    fontSize: 15,
    color: COLORS.textPrimary,
    padding: 0,
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
