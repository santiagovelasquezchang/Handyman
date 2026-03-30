// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/provider/SkillsAndServicesScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { TASKER_PROFILE } from '../../../mockData';

const INITIAL = TASKER_PROFILE.skills.map((skill, i) => ({
  id: `s${i}`,
  name: skill,
  rate: (TASKER_PROFILE.hourlyRate + i * 5).toString(),
  enabled: true,
}));

export default function SkillsAndServicesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [skills, setSkills] = useState(INITIAL);

  const update = (id, patch) =>
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  return (
    <View style={styles.root}>
      <FlatList
        data={skills}
        keyExtractor={(s) => s.id}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.hint}>Toggle the services you offer and set your hourly rate for each.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.toggle, item.enabled && styles.toggleOn]}
              onPress={() => update(item.id, { enabled: !item.enabled })}
              activeOpacity={0.8}
            >
              <View style={[styles.thumb, item.enabled && styles.thumbOn]} />
            </TouchableOpacity>
            <Text style={[styles.skillName, !item.enabled && { color: COLORS.textSecondary }]}>
              {item.name}
            </Text>
            <View style={[styles.rateWrap, !item.enabled && { opacity: 0.4 }]}>
              <Text style={styles.dollar}>$</Text>
              <TextInput
                style={styles.rateInput}
                value={item.rate}
                onChangeText={(v) => update(item.id, { rate: v })}
                keyboardType="numeric"
                editable={item.enabled}
                selectTextOnFocus
              />
              <Text style={styles.perHr}>/hr</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  hint: { fontFamily: FONTS.family, fontSize: 14, color: COLORS.textSecondary, lineHeight: 20, marginBottom: 16 },
  row:  { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, paddingHorizontal: 16, paddingVertical: 14, gap: 12, ...SHADOW.card },
  toggle: { width: 40, height: 22, borderRadius: 11, backgroundColor: COLORS.border, justifyContent: 'center', paddingHorizontal: 2 },
  toggleOn: { backgroundColor: COLORS.accent },
  thumb:    { width: 18, height: 18, borderRadius: 9, backgroundColor: COLORS.white },
  thumbOn:  { alignSelf: 'flex-end' },
  skillName:{ flex: 1, fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  rateWrap: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingHorizontal: 10, paddingVertical: 6, gap: 2 },
  dollar:   { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textSecondary },
  rateInput:{ fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.textPrimary, minWidth: 36, textAlign: 'center', padding: 0 },
  perHr:    { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },
  footer:   { paddingHorizontal: 16, paddingTop: 12, backgroundColor: COLORS.white, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.border },
  saveBtn:  { backgroundColor: COLORS.accent, borderRadius: RADIUS.pill, height: 52, alignItems: 'center', justifyContent: 'center' },
  saveBtnText:{ fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.white },
});
