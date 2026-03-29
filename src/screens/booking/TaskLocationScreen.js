// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/booking/TaskLocationScreen.js  –  Step 1: Address entry
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RECENT_ADDRESSES } from '../../../mockData';
import { COLORS, FONTS, RADIUS } from '../../theme';
import BottomBar from '../../components/BottomBar';

// ── Progress bar (step 1/5) ───────────────────────────────────────────────────
function ProgressBar() {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: '20%' }]} />
    </View>
  );
}

// ── Input field with icon ─────────────────────────────────────────────────────
function AddressInput({ label, optional, icon, value, onChange, placeholder, inputRef, onSubmit }) {
  const active = value.length > 0;
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.inputLabel}>
        {label}{' '}
        {optional ? <Text style={styles.optionalTag}>(optional)</Text> : null}
      </Text>
      <View style={[styles.inputRow, active && styles.inputRowActive]}>
        <Ionicons name={icon} size={17} color={active ? COLORS.primary : COLORS.textSecondary} style={styles.inputIcon} />
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textDisabled}
          autoCapitalize="words"
          returnKeyType={onSubmit ? 'next' : 'done'}
          onSubmitEditing={onSubmit}
          blurOnSubmit={!onSubmit}
        />
        {active && !optional ? (
          <TouchableOpacity
            onPress={() => onChange('')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="close-circle" size={18} color={COLORS.inactive} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

// ── Recent address row ────────────────────────────────────────────────────────
function RecentRow({ addr, onPress }) {
  return (
    <TouchableOpacity style={styles.recentRow} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.recentIcon}>
        <Ionicons name="time-outline" size={17} color={COLORS.textSecondary} />
      </View>
      <View style={styles.recentText}>
        <Text style={styles.recentStreet} numberOfLines={1}>{addr.street}</Text>
        <Text style={styles.recentArea}>{addr.area}</Text>
      </View>
      <Ionicons name="arrow-up-outline" size={14} color={COLORS.inactive} />
    </TouchableOpacity>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function TaskLocationScreen({ navigation, route }) {
  const { category } = route.params;
  const unitRef = useRef(null);

  const [street, setStreet] = useState('');
  const [unit, setUnit]     = useState('');

  const handleContinue = () => {
    navigation.navigate('TaskScopeStep', {
      category,
      address: { street: street.trim(), unit: unit.trim() },
      stepIndex: 0,
      answers: {},
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <ProgressBar />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Category chip */}
        <View style={styles.categoryChip}>
          <Text style={styles.categoryChipText}>{category.name}</Text>
        </View>

        <Text style={styles.title}>Where would you like{'\n'}the service?</Text>
        <Text style={styles.subtitle}>
          Your address is only shared with the Tasker after booking.
        </Text>

        {/* Street address */}
        <AddressInput
          label="Street address"
          icon="location-outline"
          value={street}
          onChange={setStreet}
          placeholder="e.g. Av. Francisco de Miranda, Torre BFC"
          onSubmit={() => unitRef.current?.focus()}
        />

        {/* Unit */}
        <AddressInput
          label="Unit or apt #"
          optional
          icon="business-outline"
          inputRef={unitRef}
          value={unit}
          onChange={setUnit}
          placeholder="Apt, piso, oficina…"
        />

        {/* Recent addresses */}
        {RECENT_ADDRESSES.length > 0 && (
          <View style={styles.recentSection}>
            <Text style={styles.recentHeader}>Recent</Text>
            {RECENT_ADDRESSES.map((addr) => (
              <RecentRow
                key={addr.id}
                addr={addr}
                onPress={() => setStreet(addr.street)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <BottomBar
        label="Continue"
        onPress={handleContinue}
        disabled={street.trim().length < 5}
      />
    </KeyboardAvoidingView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // Progress
  progressTrack: {
    height: 3,
    backgroundColor: COLORS.border,
  },
  progressFill: {
    height: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },

  // Scroll
  scroll: {
    padding: 20,
    paddingBottom: 32,
  },

  // Category chip
  categoryChip: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 18,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
  },

  // Title
  title: {
    fontSize: 22,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    lineHeight: 30,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: 28,
  },

  // Input
  fieldGroup: {
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: FONTS.semibold,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  optionalTag: {
    fontWeight: FONTS.regular,
    color: COLORS.textSecondary,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    height: 52,
    paddingHorizontal: 14,
    gap: 10,
  },
  inputRowActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  inputIcon: {},
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    paddingVertical: 0,
  },

  // Recent
  recentSection: {
    marginTop: 8,
  },
  recentHeader: {
    fontSize: 13,
    fontWeight: FONTS.semibold,
    color: COLORS.textSecondary,
    marginBottom: 4,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  recentIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentText: {
    flex: 1,
  },
  recentStreet: {
    fontSize: 14,
    fontWeight: FONTS.medium,
    color: COLORS.textPrimary,
  },
  recentArea: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
