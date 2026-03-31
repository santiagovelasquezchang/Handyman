// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/spaces/AddSpaceScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { useSpaces } from '../../context/SpacesContext';

const TYPES = [
  { key: 'home',      label: 'Home',       icon: 'home-outline' },
  { key: 'apartment', label: 'Apartment',  icon: 'business-outline' },
  { key: 'office',    label: 'Office',     icon: 'briefcase-outline' },
  { key: 'store',     label: 'Store',      icon: 'storefront-outline' },
  { key: 'other',     label: 'Other',      icon: 'location-outline' },
];

const TYPE_ICONS = {
  home:      'home-outline',
  apartment: 'business-outline',
  office:    'briefcase-outline',
  store:     'storefront-outline',
  other:     'location-outline',
};

export default function AddSpaceScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { addSpace } = useSpaces();
  const [name,    setName]    = useState('');
  const [address, setAddress] = useState('');
  const [type,    setType]    = useState('home');
  const [notes,   setNotes]   = useState('');

  const handleSave = () => {
    if (!name.trim() || !address.trim()) {
      Alert.alert('Missing Fields', 'Please enter a name and address.');
      return;
    }
    addSpace({ name: name.trim(), address: address.trim(), type, notes: notes.trim(), icon: TYPE_ICONS[type] });
    navigation.goBack();
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
        <Text style={styles.sectionLabel}>Space Type</Text>
        <View style={styles.typeRow}>
          {TYPES.map((t) => (
            <TouchableOpacity
              key={t.key}
              style={[styles.typeBtn, type === t.key && styles.typeBtnActive]}
              onPress={() => setType(t.key)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={t.icon}
                size={18}
                color={type === t.key ? COLORS.white : COLORS.textSecondary}
              />
              <Text style={[styles.typeBtnText, type === t.key && styles.typeBtnTextActive]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Space Details</Text>
        <View style={styles.formCard}>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Space Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g. My Home, Office Floor 3"
              placeholderTextColor={COLORS.textDisabled}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Full address"
              placeholderTextColor={COLORS.textDisabled}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Access Notes (optional)</Text>
            <TextInput
              style={[styles.input, { minHeight: 70, textAlignVertical: 'top' }]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Gate code, parking instructions, etc."
              placeholderTextColor={COLORS.textDisabled}
              multiline
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>Add Space</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 16 },

  sectionLabel: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textSecondary, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 10, marginTop: 6 },

  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  typeBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: RADIUS.pill, borderWidth: 1.5, borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  typeBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  typeBtnText:   { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textSecondary },
  typeBtnTextActive: { color: COLORS.white },

  formCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 16, marginBottom: 20, ...SHADOW.card },
  fieldGroup:{ gap: 6 },
  fieldLabel:{ fontFamily: FONTS.familySemibold, fontSize: 11, color: COLORS.textSecondary, letterSpacing: 0.3, textTransform: 'uppercase' },
  input:     { fontFamily: FONTS.family, fontSize: 15, color: COLORS.textPrimary, paddingVertical: 8, borderBottomWidth: 0 },
  divider:   { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.border, marginVertical: 12 },

  saveBtn:     { backgroundColor: COLORS.accent, borderRadius: RADIUS.pill, height: 52, alignItems: 'center', justifyContent: 'center' },
  saveBtnText: { fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.white },
});
