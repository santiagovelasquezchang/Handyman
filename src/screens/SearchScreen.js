// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/SearchScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES, getSearchSuggestions } from '../../mockData';
import { COLORS, FONTS, RADIUS } from '../theme';

// ── Popular categories shown when input is empty ──────────────────────────────
const POPULAR = CATEGORIES.slice(0, 8);

// ── Sub-components ────────────────────────────────────────────────────────────

function SuggestionRow({ text, onPress }) {
  return (
    <TouchableOpacity
      style={styles.suggestionRow}
      onPress={onPress}
      activeOpacity={0.65}
    >
      <View style={styles.suggestionIconWrap}>
        <Ionicons name="search-outline" size={15} color={COLORS.primary} />
      </View>
      <Text style={styles.suggestionText} numberOfLines={1}>
        {text}
      </Text>
      <Ionicons name="arrow-forward-outline" size={15} color={COLORS.inactive} />
    </TouchableOpacity>
  );
}

function PopularCard({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.popularCard}
      onPress={onPress}
      activeOpacity={0.78}
    >
      {/* Colored accent bar */}
      <View style={styles.popularAccent} />
      <Text style={styles.popularLabel} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.popularRate}>from ${item.baseRate}/hr</Text>
    </TouchableOpacity>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────

export default function SearchScreen({ navigation }) {
  const insets           = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const inputRef          = useRef(null);
  const fadeAnim          = useRef(new Animated.Value(0)).current;

  // Auto-focus on mount
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, []);

  // Fade in suggestions when they appear
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [query]);

  const suggestions = getSearchSuggestions(query);

  const resolveCategory = useCallback(
    (name) =>
      CATEGORIES.find((c) => c.name === name) || {
        id:       `custom_${Date.now()}`,
        name,
        icon:     'construct',
        baseRate: 30,
        image:    `https://picsum.photos/seed/${encodeURIComponent(name)}/300/300`,
      },
    []
  );

  const handleSelect = useCallback(
    (name) => {
      Keyboard.dismiss();
      navigation.navigate('TaskLocation', { category: resolveCategory(name) });
    },
    [navigation, resolveCategory]
  );

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  // ── Render helpers
  const renderSuggestion = ({ item }) => (
    <SuggestionRow text={item} onPress={() => handleSelect(item)} />
  );

  const renderPopular = ({ item }) => (
    <PopularCard item={item} onPress={() => handleSelect(item.name)} />
  );

  const EmptyResults = () => (
    <View style={styles.emptyWrap}>
      <Ionicons name="search-outline" size={44} color={COLORS.border} />
      <Text style={styles.emptyTitle}>No suggestions found</Text>
      <Text style={styles.emptyBody}>
        We didn't find suggestions for "{query}", but you can still book it.
      </Text>
      <TouchableOpacity
        style={styles.searchAnywayBtn}
        onPress={() => handleSelect(query.trim())}
        activeOpacity={0.8}
      >
        <Text style={styles.searchAnywayText}>Book "{query}"</Text>
      </TouchableOpacity>
    </View>
  );

  // ── View
  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            navigation.goBack();
          }}
          style={styles.backBtn}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>

        <View style={styles.inputWrap}>
          <Ionicons name="search" size={15} color={COLORS.textSecondary} style={{ marginRight: 6 }} />
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={query}
            onChangeText={setQuery}
            placeholder="Search for a service..."
            placeholderTextColor={COLORS.textSecondary}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            onSubmitEditing={() => query.trim() && handleSelect(query.trim())}
          />
          {query.length > 0 && (
            <TouchableOpacity
              onPress={handleClear}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close-circle" size={18} color={COLORS.inactive} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            navigation.goBack();
          }}
          style={styles.cancelBtn}
          hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* ── Suggestions (while typing) ──────────────────────────────────── */}
      {query.length >= 2 ? (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <FlatList
            data={suggestions}
            renderItem={renderSuggestion}
            keyExtractor={(item) => item}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<EmptyResults />}
          />
        </Animated.View>
      ) : (
        /* ── Popular grid (when idle) ────────────────────────────────── */
        <FlatList
          data={POPULAR}
          renderItem={renderPopular}
          keyExtractor={(item) => item.id}
          numColumns={2}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.popularContainer}
          columnWrapperStyle={styles.popularRow}
          ListHeaderComponent={
            <View style={styles.popularHeader}>
              <Text style={styles.popularTitle}>Popular Services</Text>
              <Text style={styles.popularSubtitle}>Tap any service to get started</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // ── Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  backBtn: {
    padding: 2,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    height: 42,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: FONTS.regular,
    paddingVertical: 0, // removes default Android padding
  },
  cancelBtn: {
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },

  // ── Suggestion rows
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  suggestionIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: FONTS.medium,
    color: COLORS.textPrimary,
  },

  // ── Empty state (no suggestions)
  emptyWrap: {
    alignItems: 'center',
    paddingTop: 52,
    paddingHorizontal: 32,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  emptyBody: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  searchAnywayBtn: {
    marginTop: 8,
    paddingVertical: 11,
    paddingHorizontal: 24,
    borderRadius: RADIUS.pill,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  searchAnywayText: {
    fontSize: 14,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
  },

  // ── Popular grid
  popularContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  popularRow: {
    gap: 12,
    marginBottom: 12,
  },
  popularHeader: {
    marginBottom: 16,
  },
  popularTitle: {
    fontSize: 17,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  popularSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  popularCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: 14,
    minHeight: 88,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  popularAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: RADIUS.md,
    borderTopRightRadius: RADIUS.md,
  },
  popularLabel: {
    fontSize: 13,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    lineHeight: 18,
    marginBottom: 4,
  },
  popularRate: {
    fontSize: 11,
    fontWeight: FONTS.medium,
    color: COLORS.textSecondary,
  },
});
