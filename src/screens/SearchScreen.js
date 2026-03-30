// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/SearchScreen.js  –  Full-screen search modal
//  Real-time category filtering as the user types.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  FlatList, Image, Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../theme';
import i18n from '../i18n';

// ── Result row ────────────────────────────────────────────────────────────────
function ResultRow({ category, onPress }) {
  return (
    <TouchableOpacity style={styles.resultRow} onPress={() => onPress(category)} activeOpacity={0.7}>
      <Image source={{ uri: category.image }} style={styles.resultThumb} resizeMode="cover" />
      <View style={styles.resultText}>
        <Text style={styles.resultName}>{category.name}</Text>
        <Text style={styles.resultRate}>From ${category.baseRate}/hr</Text>
      </View>
      <Ionicons name="arrow-forward" size={16} color={COLORS.accent} />
    </TouchableOpacity>
  );
}

// ── Popular chips (shown when no query) ──────────────────────────────────────
function PopularGrid({ onPress }) {
  return (
    <View style={styles.content}>
      <Text style={styles.popularTitle}>Popular Services</Text>
      <View style={styles.popularGrid}>
        {CATEGORIES.slice(0, 6).map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.popularChip}
            onPress={() => onPress(cat)}
            activeOpacity={0.8}
          >
            <Ionicons name={cat.icon} size={16} color={COLORS.accent} />
            <Text style={styles.popularChipText}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function SearchScreen({ navigation }) {
  const insets   = useSafeAreaInsets();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return [];
    return CATEGORIES.filter((cat) => cat.name.toLowerCase().includes(q));
  }, [query]);

  const handleSelect = (category) => {
    Keyboard.dismiss();
    // Dismiss the modal first, then navigate to the funnel in the parent stack
    navigation.goBack();
    navigation.navigate('TaskLocation', { category });
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Search input */}
      <View style={styles.searchRow}>
        <View style={styles.inputWrap}>
          <Ionicons name="search" size={17} color={COLORS.textSecondary} />
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholder={i18n.t('home.searchPlaceholder')}
            placeholderTextColor={COLORS.textDisabled}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Ionicons name="close-circle" size={18} color={COLORS.inactive} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => { Keyboard.dismiss(); navigation.goBack(); }} activeOpacity={0.7}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {query.length === 0 ? (
        <PopularGrid onPress={handleSelect} />
      ) : results.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={44} color={COLORS.border} />
          <Text style={styles.emptyTitle}>No results for "{query}"</Text>
          <Text style={styles.emptySub}>Try a different keyword.</Text>
          <TouchableOpacity style={styles.browseBtn} onPress={() => setQuery('')} activeOpacity={0.85}>
            <Text style={styles.browseBtnText}>Browse all services</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ResultRow category={item} onPress={handleSelect} />}
          contentContainerStyle={styles.resultsList}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  searchRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border,
    gap: 10,
  },
  inputWrap: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.background, borderRadius: RADIUS.lg,
    height: 44, paddingHorizontal: 12, gap: 8,
  },
  input: { flex: 1, fontFamily: FONTS.family, fontSize: 15, color: COLORS.textPrimary },
  cancelBtn: { paddingVertical: 6 },
  cancelText: { fontFamily: FONTS.familySemibold, fontSize: 15, color: COLORS.accent },

  content: { padding: 16 },
  popularTitle: { fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.primary, marginBottom: 12 },
  popularGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  popularChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 9,
    backgroundColor: COLORS.background, borderRadius: RADIUS.pill,
    borderWidth: 1, borderColor: COLORS.border,
  },
  popularChipText: { fontFamily: FONTS.familyMedium, fontSize: 13, color: COLORS.textPrimary },

  resultsList: { paddingVertical: 8 },
  resultRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, gap: 12,
  },
  resultThumb: { width: 50, height: 50, borderRadius: RADIUS.sm, backgroundColor: COLORS.surface },
  resultText: { flex: 1 },
  resultName: { fontFamily: FONTS.familySemibold, fontSize: 15, color: COLORS.textPrimary },
  resultRate: { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  separator: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.border, marginLeft: 78 },

  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 36, gap: 10 },
  emptyTitle: { fontFamily: FONTS.familyBold, fontSize: 18, color: COLORS.textPrimary, textAlign: 'center' },
  emptySub: { fontFamily: FONTS.family, fontSize: 14, color: COLORS.textSecondary, textAlign: 'center' },
  browseBtn: { marginTop: 8, paddingVertical: 12, paddingHorizontal: 28, backgroundColor: COLORS.accent, borderRadius: RADIUS.pill, ...SHADOW.card },
  browseBtnText: { fontFamily: FONTS.familyBold, fontSize: 14, color: COLORS.white },
});
