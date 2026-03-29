// ─────────────────────────────────────────────────────────────────────────────
//  HelpCenterScreen  –  Search bar + category list  [STUB – Phase 1]
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { HELP_CATEGORIES } from '../../../mockData';

export default function HelpCenterScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]}
      keyboardShouldPersistTaps="handled"
    >
      {/* Search bar */}
      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={18} color={COLORS.textDisabled} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search help articles…"
          placeholderTextColor={COLORS.textDisabled}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
        />
      </View>

      <Text style={styles.sectionTitle}>Browse by Category</Text>

      <View style={styles.grid}>
        {HELP_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.tile}
            activeOpacity={0.75}
            onPress={() => Alert.alert(cat.label, 'Help articles coming in a future phase.')}
          >
            <View style={styles.tileIcon}>
              <Ionicons name={cat.icon} size={24} color={COLORS.accent} />
            </View>
            <Text style={styles.tileLabel}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root:    { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, gap: 16 },

  searchRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    paddingHorizontal: 14, borderWidth: 1, borderColor: COLORS.border,
    ...SHADOW.card,
  },
  searchIcon:  { marginRight: 8 },
  searchInput: { flex: 1, height: 46, fontSize: 15, color: COLORS.textPrimary },

  sectionTitle: {
    fontSize: 16, fontWeight: FONTS.bold, color: COLORS.primary, marginTop: 4,
  },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tile: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: 18,
    alignItems: 'center',
    gap: 10,
    ...SHADOW.card,
  },
  tileIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: COLORS.accentLight,
    alignItems: 'center', justifyContent: 'center',
  },
  tileLabel: { fontSize: 13, fontWeight: FONTS.semibold, color: COLORS.textPrimary, textAlign: 'center' },
});
