// ─────────────────────────────────────────────────────────────────────────────
//  SavedAddressesScreen  –  List & add addresses  [STUB – Phase 1]
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { SAVED_ADDRESSES } from '../../../mockData';

export default function SavedAddressesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]}
    >
      <View style={styles.card}>
        {SAVED_ADDRESSES.map((addr, i) => (
          <View key={addr.id}>
            {i > 0 && <View style={styles.divider} />}
            <TouchableOpacity style={styles.row} activeOpacity={0.7}>
              <View style={styles.iconWrap}>
                <Ionicons name="location-outline" size={20} color={COLORS.accent} />
              </View>
              <View style={styles.addrText}>
                <Text style={styles.addrLabel}>{addr.label}</Text>
                <Text style={styles.addrStreet}>{addr.street}</Text>
                <Text style={styles.addrArea}>{addr.area}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textDisabled} />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        activeOpacity={0.85}
        onPress={() => Alert.alert('Add Address', 'Address form coming in a future phase.')}
      >
        <Ionicons name="add" size={20} color={COLORS.textOnAccent} />
        <Text style={styles.addBtnText}>Add New Address</Text>
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
    overflow: 'hidden',
    ...SHADOW.card,
  },
  divider: { height: 1, backgroundColor: COLORS.border, marginLeft: 56 },
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, gap: 12,
  },
  iconWrap: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.accentLight,
    alignItems: 'center', justifyContent: 'center',
  },
  addrText:   { flex: 1, gap: 2 },
  addrLabel:  { fontSize: 14, fontWeight: FONTS.semibold, color: COLORS.textPrimary },
  addrStreet: { fontSize: 13, color: COLORS.textSecondary },
  addrArea:   { fontSize: 12, color: COLORS.textDisabled },

  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.lg, paddingVertical: 15,
    ...SHADOW.card,
  },
  addBtnText: { color: COLORS.textOnAccent, fontWeight: FONTS.bold, fontSize: 15 },
});
