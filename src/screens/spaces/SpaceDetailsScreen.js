// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/spaces/SpaceDetailsScreen.js
//  Operational hub for a single property.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

function QuickAction({ icon, label, onPress, color = COLORS.primary }) {
  return (
    <TouchableOpacity style={styles.qa} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.qaIcon, { backgroundColor: color + '18' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.qaLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function MenuRow({ icon, label, subtitle, onPress }) {
  return (
    <TouchableOpacity style={styles.menuRow} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.menuIcon}>
        <Ionicons name={icon} size={17} color={COLORS.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.menuLabel}>{label}</Text>
        {subtitle ? <Text style={styles.menuSub}>{subtitle}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={15} color={COLORS.inactive} />
    </TouchableOpacity>
  );
}

export default function SpaceDetailsScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const space  = route?.params?.space ?? { name: 'Space', address: '—', type: 'home', activeRecurring: 0, lastService: '—' };

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.heroIconWrap}>
            <Ionicons name="home-outline" size={28} color={COLORS.white} />
          </View>
          <Text style={styles.heroName}>{space.name}</Text>
          <Text style={styles.heroAddress}>{space.address}</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{space.activeRecurring}</Text>
              <Text style={styles.statLabel}>Recurring</Text>
            </View>
            <View style={styles.statDiv} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Total Jobs</Text>
            </View>
            <View style={styles.statDiv} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.9</Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {/* Quick actions */}
          <View style={styles.qaRow}>
            <QuickAction icon="add-circle-outline"  label="Book Service" color={COLORS.accent}
              onPress={() => navigation.navigate('Services')} />
            <QuickAction icon="repeat-outline"      label="Recurring"   color={COLORS.primary}
              onPress={() => navigation.navigate('SpaceRecurringServices', { space })} />
            <QuickAction icon="time-outline"        label="History"     color="#4A6CF7"
              onPress={() => navigation.navigate('SpaceServiceHistory', { space })} />
            <QuickAction icon="create-outline"      label="Edit"        color={COLORS.textSecondary}
              onPress={() => navigation.navigate('EditSpace', { space })} />
          </View>

          {/* Management */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Manage Space</Text>
            <MenuRow icon="repeat-outline"     label="Recurring Services"
              subtitle={`${space.activeRecurring} active`}
              onPress={() => navigation.navigate('SpaceRecurringServices', { space })} />
            <MenuRow icon="time-outline"       label="Service History"
              subtitle={`Last: ${space.lastService}`}
              onPress={() => navigation.navigate('SpaceServiceHistory', { space })} />
            <MenuRow icon="key-outline"        label="Access & Notes"
              subtitle="Gate code, instructions"
              onPress={() => {}} />
            <MenuRow icon="person-outline"     label="Preferred Provider"
              subtitle="Not set"
              onPress={() => navigation.navigate('MyTeam')} />
          </View>

          {/* Upcoming at this space */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Upcoming</Text>
            <View style={styles.upcomingPlaceholder}>
              <Ionicons name="calendar-outline" size={22} color={COLORS.border} />
              <Text style={styles.upcomingText}>No upcoming bookings</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Services')}
                activeOpacity={0.8}
              >
                <Text style={styles.upcomingLink}>Book a service →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },

  hero: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20, paddingVertical: 28,
    alignItems: 'center', gap: 6,
  },
  heroIconWrap: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  heroName:    { fontFamily: FONTS.familyBold, fontSize: 20, color: COLORS.white },
  heroAddress: { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  statsRow:    { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: RADIUS.md, marginTop: 14, paddingVertical: 12, paddingHorizontal: 16, gap: 0 },
  statItem:    { flex: 1, alignItems: 'center' },
  statDiv:     { width: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: 4 },
  statValue:   { fontFamily: FONTS.familyBold, fontSize: 18, color: COLORS.white },
  statLabel:   { fontFamily: FONTS.family, fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2 },

  body: { padding: 16, gap: 14 },

  qaRow: { flexDirection: 'row', gap: 10 },
  qa:    { flex: 1, backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 12, alignItems: 'center', gap: 7, ...SHADOW.card },
  qaIcon:{ width: 42, height: 42, borderRadius: RADIUS.md, alignItems: 'center', justifyContent: 'center' },
  qaLabel:{ fontFamily: FONTS.familySemibold, fontSize: 11, color: COLORS.textPrimary, textAlign: 'center' },

  card:      { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 16, gap: 0, ...SHADOW.card },
  cardTitle: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary, marginBottom: 12 },

  menuRow:  { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border },
  menuIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: COLORS.primaryLight, alignItems: 'center', justifyContent: 'center' },
  menuLabel:{ fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  menuSub:  { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 1 },

  upcomingPlaceholder: { alignItems: 'center', paddingVertical: 24, gap: 8 },
  upcomingText:        { fontFamily: FONTS.family, fontSize: 13, color: COLORS.textSecondary },
  upcomingLink:        { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.accent },
});
