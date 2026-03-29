// ─────────────────────────────────────────────────────────────────────────────
//  InviteFriendsScreen  –  Referral / share  [STUB – Phase 1]
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const PROMO_CODE = 'HANDYMAN25';

export default function InviteFriendsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]}
    >
      {/* Hero image placeholder */}
      <View style={styles.hero}>
        <Ionicons name="people" size={64} color={COLORS.accent} />
        <Text style={styles.heroTitle}>Invite Friends, Earn Credit</Text>
        <Text style={styles.heroSub}>
          Give $10 off their first task and get $10 credit when they complete it.
        </Text>
      </View>

      {/* Promo code block */}
      <View style={styles.card}>
        <Text style={styles.codeLabel}>Your referral code</Text>
        <View style={styles.codeRow}>
          <Text style={styles.codeText}>{PROMO_CODE}</Text>
          <TouchableOpacity
            style={styles.copyBtn}
            onPress={() => Alert.alert('Copied!', `Code "${PROMO_CODE}" copied to clipboard.`)}
          >
            <Ionicons name="copy-outline" size={18} color={COLORS.accent} />
            <Text style={styles.copyBtnText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Share button */}
      <TouchableOpacity
        style={styles.shareBtn}
        activeOpacity={0.85}
        onPress={() => Alert.alert('Share', 'Share sheet coming in a future phase.')}
      >
        <Ionicons name="share-social-outline" size={20} color={COLORS.textOnAccent} />
        <Text style={styles.shareBtnText}>Share My Invite Link</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root:    { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, gap: 16, alignItems: 'stretch' },

  hero: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: 32,
    gap: 12,
    ...SHADOW.card,
  },
  heroTitle: { fontSize: 20, fontWeight: FONTS.bold, color: COLORS.primary, textAlign: 'center' },
  heroSub:   { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 20 },

  card: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.md,
    padding: 20, gap: 10, ...SHADOW.card,
  },
  codeLabel: { fontSize: 12, fontWeight: FONTS.semibold, color: COLORS.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
  codeRow:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  codeText:  { fontSize: 26, fontWeight: FONTS.bold, color: COLORS.primary, letterSpacing: 2 },
  copyBtn:   { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 8 },
  copyBtnText: { fontSize: 14, fontWeight: FONTS.semibold, color: COLORS.accent },

  shareBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: COLORS.accent, borderRadius: RADIUS.lg, paddingVertical: 15,
    ...SHADOW.card,
  },
  shareBtnText: { color: COLORS.textOnAccent, fontWeight: FONTS.bold, fontSize: 15 },
});
