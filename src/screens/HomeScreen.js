// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/HomeScreen.js  –  Client Home (Engine A + B hub)
//
//  Layout (top → bottom):
//   ┌──────────────────────────────────────────┐ ← sticky nav header (navy)
//   │  HANDYMAN     ·  notification bell       │   safe-area aware
//   ├──────────────────────────────────────────┤
//   │  [  search bar pill  ]                   │ ← always visible / sticky
//   ├──────────────────────────────────────────┤
//   │  scrollable body:                        │
//   │    • Urgency banner                      │
//   │    • Upcoming booking snapshot           │
//   │    • Quick Book (ServiceCard carousel)   │
//   │    • Space summary card                  │
//   │    • Your Team (rebook strip)            │
//   │    • Maintenance reminder                │
//   └──────────────────────────────────────────┘
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, FlatList,
  TouchableOpacity, Image, Animated, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import {
  USER_PROFILE,
  HOME_QUICK_SERVICES,
  HOME_TRUSTED_PROVIDERS,
  HOME_PRIMARY_SPACE,
  HOME_UPCOMING_BOOKING,
} from '../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../theme';
import { useAuth } from '../context/AuthContext';
import { SectionHeader, ServiceCard, PrimaryButton } from '../components/ui';

const { width: SW } = Dimensions.get('window');
const CARD_SIZE     = 148;
const SEARCH_H      = 50;
const BORDER_W      = 2;

// ─────────────────────────────────────────────────────────────────────────────
//  Animated Search Bar  (rotating orange border + white pill)
// ─────────────────────────────────────────────────────────────────────────────
function SearchBar({ onPress }) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1, duration: 2400, useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate   = rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const SPIN_SZ  = SW * 1.6;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={s.searchOuter}>
      {/* rotating half-orange square clipped to pill */}
      <Animated.View
        pointerEvents="none"
        style={{ position: 'absolute', width: SPIN_SZ, height: SPIN_SZ, transform: [{ rotate }] }}
      >
        <View style={{
          position: 'absolute', left: 0, top: 0,
          width: SPIN_SZ / 2, height: SPIN_SZ,
          backgroundColor: COLORS.accent,
        }} />
      </Animated.View>

      {/* white pill sits on top with inset = BORDER_W */}
      <View style={s.searchPill}>
        <Ionicons name="search-outline" size={16} color={COLORS.textSecondary} style={{ marginRight: 8 }} />
        <Text style={s.searchPlaceholder}>What do you need help with?</Text>
        <View style={s.searchMic}>
          <Ionicons name="mic-outline" size={15} color={COLORS.textSecondary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Urgency Banner
// ─────────────────────────────────────────────────────────────────────────────
function UrgencyBanner({ onPress }) {
  return (
    <TouchableOpacity style={s.urgencyCard} onPress={onPress} activeOpacity={0.88}>
      <LinearGradient
        colors={[COLORS.primary, '#0F2233']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      />
      {/* background decorative circle */}
      <View style={s.urgencyCircle} />
      <View style={s.urgencyLeft}>
        <View style={s.urgencyIconWrap}>
          <Ionicons name="flash" size={22} color={COLORS.accent} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.urgencyTitle}>Need Help Right Now?</Text>
          <Text style={s.urgencySub}>Provider dispatched within 60 minutes</Text>
        </View>
      </View>
      <View style={s.urgencyBtn}>
        <Text style={s.urgencyBtnText}>Get Help</Text>
        <Ionicons name="arrow-forward" size={13} color={COLORS.white} style={{ marginLeft: 4 }} />
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Upcoming Booking Snapshot
// ─────────────────────────────────────────────────────────────────────────────
function UpcomingBookingCard({ booking, onPress }) {
  return (
    <TouchableOpacity style={s.upcomingCard} onPress={onPress} activeOpacity={0.85}>
      <View style={s.upcomingLeft}>
        <View style={s.upcomingDateBox}>
          <Text style={s.upcomingDateMonth}>APR</Text>
          <Text style={s.upcomingDateDay}>5</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.upcomingService}>{booking.service}</Text>
          <Text style={s.upcomingTime}>{booking.date} · {booking.time}</Text>
          <View style={s.upcomingMeta}>
            <Ionicons name="location-outline" size={11} color={COLORS.textSecondary} />
            <Text style={s.upcomingMetaText}>{booking.spaceLabel}</Text>
          </View>
        </View>
      </View>
      <View style={s.upcomingRight}>
        <Image source={{ uri: booking.providerAvatar }} style={s.upcomingAvatar} />
        <Text style={s.upcomingProviderName} numberOfLines={1}>{booking.provider}</Text>
        <View style={s.upcomingStatusDot} />
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Space Summary Card
// ─────────────────────────────────────────────────────────────────────────────
function SpaceSummaryCard({ space, onPress }) {
  return (
    <TouchableOpacity style={s.spaceCard} onPress={onPress} activeOpacity={0.85}>
      <View style={s.spaceIconWrap}>
        <Ionicons name="home-outline" size={22} color={COLORS.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.spaceName}>{space.name}</Text>
        <Text style={s.spaceAddr} numberOfLines={1}>{space.address}</Text>
        <View style={s.spaceHealthRow}>
          <View style={[s.healthDot, { backgroundColor: space.healthColor }]} />
          <Text style={s.healthLabel}>{space.healthLabel}</Text>
        </View>
      </View>
      <View style={s.spaceRight}>
        {space.activeRecurring > 0 && (
          <View style={s.spaceChip}>
            <Ionicons name="repeat-outline" size={11} color={COLORS.accent} />
            <Text style={s.spaceChipText}>{space.activeRecurring} recurring</Text>
          </View>
        )}
        <Ionicons name="chevron-forward" size={15} color={COLORS.inactive} style={{ marginTop: 4 }} />
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Provider Rebook Card  (single item in the "Your Team" horizontal list)
// ─────────────────────────────────────────────────────────────────────────────
function ProviderRebookCard({ provider, onPress }) {
  return (
    <TouchableOpacity style={s.providerCard} onPress={onPress} activeOpacity={0.85}>
      <View style={s.providerAvatarWrap}>
        <Image source={{ uri: provider.avatar }} style={s.providerAvatar} />
        <View style={s.providerOnline} />
      </View>
      <Text style={s.providerName} numberOfLines={1}>{provider.name.split(' ')[0]}</Text>
      <Text style={s.providerSpecialty} numberOfLines={1}>{provider.specialty}</Text>
      <View style={s.providerStarRow}>
        <Ionicons name="star" size={10} color={COLORS.accent} />
        <Text style={s.providerRating}>{provider.rating}</Text>
      </View>
      <TouchableOpacity style={s.rebookBtn} onPress={onPress} activeOpacity={0.8}>
        <Text style={s.rebookBtnText}>Rebook</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Maintenance Reminder  (subtle upsell to recurring / plan)
// ─────────────────────────────────────────────────────────────────────────────
function MaintenanceCard({ onPress }) {
  return (
    <TouchableOpacity style={s.maintCard} onPress={onPress} activeOpacity={0.88}>
      <View style={s.maintLeft}>
        <View style={s.maintIcon}>
          <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.accent} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.maintTitle}>Stay ahead of maintenance</Text>
          <Text style={s.maintSub}>Set up recurring services and save up to 20%</Text>
        </View>
      </View>
      <Ionicons name="arrow-forward-circle" size={26} color={COLORS.accent} />
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Main Screen
// ─────────────────────────────────────────────────────────────────────────────
export default function HomeScreen({ navigation }) {
  const insets    = useSafeAreaInsets();
  const firstName = USER_PROFILE.firstName;

  const navigate = (screen, params) => navigation.navigate(screen, params);

  return (
    <View style={s.root}>
      {/* ── Sticky navy header ──────────────────────────────────────────────── */}
      <View style={[s.header, { paddingTop: insets.top + 12 }]}>
        <View style={s.headerRow}>
          <Text style={s.brandName}>HANDYMAN</Text>
          <View style={s.headerRight}>
            <TouchableOpacity
              style={s.notifBtn}
              onPress={() => navigate('NotificationSettings')}
              activeOpacity={0.8}
            >
              <Ionicons name="notifications-outline" size={20} color={COLORS.white} />
              {/* unread dot */}
              <View style={s.notifDot} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={s.greeting}>
          Hi, <Text style={s.greetingName}>{firstName}</Text> 👋
        </Text>
        <Text style={s.greetingSub}>What can we help you with today?</Text>

        {/* Search bar lives inside header so it scrolls away with the greeting */}
        <View style={s.searchWrap}>
          <SearchBar onPress={() => navigate('Search')} />
        </View>
      </View>

      {/* ── Scrollable body ─────────────────────────────────────────────────── */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={[s.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[]}   // no sticky items inside scroll body
      >

        {/* 1 ─ Urgency module */}
        <UrgencyBanner onPress={() => navigate('EmergencyRequest')} />

        {/* 2 ─ Upcoming booking snapshot */}
        {HOME_UPCOMING_BOOKING && (
          <View style={s.section}>
            <SectionHeader
              title="Upcoming"
              onSeeAll={() => navigate('ActivityTab')}
            />
            <UpcomingBookingCard
              booking={HOME_UPCOMING_BOOKING}
              onPress={() => navigate('BookingDetails', { booking: HOME_UPCOMING_BOOKING })}
            />
          </View>
        )}

        {/* 3 ─ Quick Book carousel */}
        <View style={s.section}>
          <SectionHeader
            title="Quick Book"
            onSeeAll={() => navigate('ServicesTab')}
          />
          <FlatList
            data={HOME_QUICK_SERVICES}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
            snapToInterval={CARD_SIZE + 12}
            decelerationRate="fast"
            renderItem={({ item }) => (
              <ServiceCard
                service={item}
                size={CARD_SIZE}
                onPress={() => navigate('BookService', { service: item.name })}
              />
            )}
          />
        </View>

        {/* 4 ─ Space summary */}
        <View style={s.section}>
          <SectionHeader
            title="My Spaces"
            onSeeAll={() => navigate('Spaces')}
          />
          <SpaceSummaryCard
            space={HOME_PRIMARY_SPACE}
            onPress={() => navigate('SpaceDetails', { space: HOME_PRIMARY_SPACE })}
          />
          {/* Add space CTA */}
          <TouchableOpacity
            style={s.addSpaceRow}
            onPress={() => navigate('AddSpace')}
            activeOpacity={0.8}
          >
            <Ionicons name="add-circle-outline" size={16} color={COLORS.accent} />
            <Text style={s.addSpaceText}>Add another space</Text>
          </TouchableOpacity>
        </View>

        {/* 5 ─ Your Team rebook strip */}
        {HOME_TRUSTED_PROVIDERS.length > 0 && (
          <View style={s.section}>
            <SectionHeader
              title="Your Team"
              onSeeAll={() => navigate('MyTeam')}
            />
            <FlatList
              data={HOME_TRUSTED_PROVIDERS}
              keyExtractor={(p) => p.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12 }}
              renderItem={({ item }) => (
                <ProviderRebookCard
                  provider={item}
                  onPress={() => navigate('BookService', { service: item.specialty })}
                />
              )}
            />
          </View>
        )}

        {/* 6 ─ Maintenance / plans teaser */}
        <View style={s.section}>
          <MaintenanceCard onPress={() => navigate('PlansTab')} />
        </View>

      </ScrollView>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Styles
// ─────────────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  root:   { flex: 1, backgroundColor: '#F8F9FA' },

  // ── Sticky header ────────────────────────────────────────────────────────
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingBottom: 20,
    // Android elevation + iOS shadow both contribute to the "floating" feel
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  brandName: {
    fontFamily: FONTS.familyBold,
    fontSize: 18,
    color: COLORS.white,
    letterSpacing: 3,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  notifBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center', justifyContent: 'center',
  },
  notifDot: {
    position: 'absolute', top: 7, right: 7,
    width: 7, height: 7, borderRadius: 3.5,
    backgroundColor: COLORS.accent,
    borderWidth: 1.5, borderColor: COLORS.primary,
  },
  greeting:     { fontFamily: FONTS.familyBold, fontSize: 22, color: COLORS.white, letterSpacing: -0.3 },
  greetingName: { color: COLORS.accent },
  greetingSub:  { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 2, marginBottom: 16 },

  // ── Search bar ───────────────────────────────────────────────────────────
  searchWrap: { /* no extra margin — paddingBottom on header handles it */ },
  searchOuter: {
    height: SEARCH_H,
    borderRadius: SEARCH_H / 2,
    overflow: 'hidden',
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchPill: {
    position: 'absolute',
    top: BORDER_W, bottom: BORDER_W, left: BORDER_W, right: BORDER_W,
    borderRadius: (SEARCH_H / 2) - BORDER_W,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  searchPlaceholder: {
    flex: 1,
    fontFamily: FONTS.family,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  searchMic: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: COLORS.background,
    alignItems: 'center', justifyContent: 'center',
  },

  // ── Scroll body ──────────────────────────────────────────────────────────
  scroll:        { flex: 1 },
  scrollContent: { paddingTop: 20 },
  section:       { paddingHorizontal: 20, marginBottom: 28 },

  // ── Urgency card ─────────────────────────────────────────────────────────
  urgencyCard: {
    marginHorizontal: 20,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginBottom: 28,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    ...SHADOW.card,
  },
  urgencyCircle: {
    position: 'absolute', right: -24, top: -24,
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: 'rgba(255,127,63,0.12)',
  },
  urgencyLeft:    { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  urgencyIconWrap:{
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(255,127,63,0.18)',
    alignItems: 'center', justifyContent: 'center',
  },
  urgencyTitle: { fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.white },
  urgencySub:   { fontFamily: FONTS.family, fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2 },
  urgencyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  urgencyBtnText: { fontFamily: FONTS.familyBold, fontSize: 12, color: COLORS.white },

  // ── Upcoming booking ─────────────────────────────────────────────────────
  upcomingCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SHADOW.card,
  },
  upcomingLeft:      { flexDirection: 'row', alignItems: 'flex-start', gap: 14, flex: 1 },
  upcomingDateBox:   {
    width: 48, minHeight: 52,
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  upcomingDateMonth: { fontFamily: FONTS.familySemibold, fontSize: 9, color: COLORS.primary, letterSpacing: 0.5 },
  upcomingDateDay:   { fontFamily: FONTS.familyBold, fontSize: 22, color: COLORS.primary, lineHeight: 26 },
  upcomingService:   { fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.textPrimary },
  upcomingTime:      { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  upcomingMeta:      { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 5 },
  upcomingMetaText:  { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },
  upcomingRight:     { alignItems: 'center', gap: 4 },
  upcomingAvatar:    { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: COLORS.accent },
  upcomingProviderName: { fontFamily: FONTS.familySemibold, fontSize: 11, color: COLORS.textPrimary, maxWidth: 64, textAlign: 'center' },
  upcomingStatusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.success },

  // ── Space card ────────────────────────────────────────────────────────────
  spaceCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    ...SHADOW.card,
  },
  spaceIconWrap: {
    width: 50, height: 50, borderRadius: RADIUS.md,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  spaceName:     { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  spaceAddr:     { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  spaceHealthRow:{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  healthDot:     { width: 7, height: 7, borderRadius: 3.5 },
  healthLabel:   { fontFamily: FONTS.family, fontSize: 11, color: COLORS.textSecondary },
  spaceRight:    { alignItems: 'flex-end', gap: 0 },
  spaceChip:     {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: COLORS.accentLight,
    borderRadius: RADIUS.pill, paddingHorizontal: 8, paddingVertical: 3,
  },
  spaceChipText: { fontFamily: FONTS.familySemibold, fontSize: 10, color: COLORS.accent },
  addSpaceRow:   {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginTop: 12, paddingVertical: 2,
  },
  addSpaceText:  { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.accent },

  // ── Provider rebook card ──────────────────────────────────────────────────
  providerCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 14,
    width: 110,
    alignItems: 'center',
    gap: 4,
    ...SHADOW.card,
  },
  providerAvatarWrap: { position: 'relative' },
  providerAvatar:     { width: 56, height: 56, borderRadius: 28, borderWidth: 2, borderColor: COLORS.border },
  providerOnline:     {
    position: 'absolute', bottom: 1, right: 1,
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: COLORS.success,
    borderWidth: 2, borderColor: COLORS.white,
  },
  providerName:     { fontFamily: FONTS.familySemibold, fontSize: 12, color: COLORS.textPrimary, textAlign: 'center' },
  providerSpecialty:{ fontFamily: FONTS.family, fontSize: 10, color: COLORS.textSecondary, textAlign: 'center' },
  providerStarRow:  { flexDirection: 'row', alignItems: 'center', gap: 3 },
  providerRating:   { fontFamily: FONTS.familySemibold, fontSize: 11, color: COLORS.textPrimary },
  rebookBtn:   {
    marginTop: 2,
    backgroundColor: COLORS.accentLight,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 12, paddingVertical: 5,
  },
  rebookBtnText: { fontFamily: FONTS.familyBold, fontSize: 11, color: COLORS.accent },

  // ── Maintenance card ─────────────────────────────────────────────────────
  maintCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    ...SHADOW.card,
  },
  maintLeft:  { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  maintIcon:  {
    width: 42, height: 42, borderRadius: RADIUS.md,
    backgroundColor: COLORS.accentLight,
    alignItems: 'center', justifyContent: 'center',
  },
  maintTitle: { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  maintSub:   { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2, lineHeight: 17 },
});
