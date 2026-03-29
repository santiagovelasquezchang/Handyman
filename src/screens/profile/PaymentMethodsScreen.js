// ─────────────────────────────────────────────────────────────────────────────
//  PaymentMethodsScreen  –  List & add payment methods  [STUB – Phase 1]
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { PAYMENT_METHODS } from '../../../mockData';

const BRAND_ICON = { visa: 'card', mastercard: 'card' };
const BRAND_COLOR = { visa: '#1A1F71', mastercard: '#EB001B' };

export default function PaymentMethodsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]}
    >
      <View style={styles.card}>
        {PAYMENT_METHODS.map((pm, i) => (
          <View key={pm.id}>
            {i > 0 && <View style={styles.divider} />}
            <TouchableOpacity style={styles.row} activeOpacity={0.7}>
              <View style={[styles.iconWrap, { backgroundColor: COLORS.primaryLight }]}>
                <Ionicons name="card-outline" size={20} color={COLORS.primary} />
              </View>
              <View style={styles.pmText}>
                <Text style={styles.pmName}>
                  {pm.type.charAt(0).toUpperCase() + pm.type.slice(1)} ···· {pm.last4}
                  {pm.isDefault ? '  ✓ Default' : ''}
                </Text>
                <Text style={styles.pmExpiry}>Expires {pm.expiry}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textDisabled} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        activeOpacity={0.85}
        onPress={() => Alert.alert('Add Card', 'Payment form coming in a future phase.')}
      >
        <Ionicons name="add" size={20} color={COLORS.textOnAccent} />
        <Text style={styles.addBtnText}>Add Credit Card</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root:    { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, gap: 16 },

  card: {
    backgroundColor: COLORS.white, borderRadius: RADIUS.md,
    overflow: 'hidden', ...SHADOW.card,
  },
  divider: { height: 1, backgroundColor: COLORS.border, marginLeft: 56 },
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, gap: 12,
  },
  iconWrap: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  pmText:   { flex: 1, gap: 3 },
  pmName:   { fontSize: 14, fontWeight: FONTS.semibold, color: COLORS.textPrimary },
  pmExpiry: { fontSize: 12, color: COLORS.textSecondary },

  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: COLORS.accent, borderRadius: RADIUS.lg, paddingVertical: 15,
    ...SHADOW.card,
  },
  addBtnText: { color: COLORS.textOnAccent, fontWeight: FONTS.bold, fontSize: 15 },
});
