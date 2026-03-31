// ─────────────────────────────────────────────────────────────────────────────
//  src/components/ui.js  –  Shared design-system primitives
//  Phase 2.5: Premium UX — haptics, animated pressables, tinted shadows,
//             beautiful empty states, and refined typography.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useCallback } from 'react';
import {
  View, Text, Image, TouchableOpacity, Animated,
  ScrollView, StyleSheet, Dimensions, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { COLORS, FONTS, RADIUS, SHADOW } from '../theme';

const { width: SW } = Dimensions.get('window');

// ─────────────────────────────────────────────────────────────────────────────
//  AnimatedPressable
//  A drop-in replacement for TouchableOpacity that adds:
//    • Smooth spring scale-down on press (0.97)
//    • Haptic feedback on release
//  Props: haptic ('light' | 'medium' | 'heavy' | 'none'), all TouchableOpacity props
// ─────────────────────────────────────────────────────────────────────────────
export function AnimatedPressable({
  children, style, innerStyle, onPress, haptic = 'light',
  scaleTo = 0.97, activeOpacity = 1, ...rest
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: scaleTo,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  }, [scaleTo]);

  const onPressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 28,
      bounciness: 8,
    }).start();
    if (haptic !== 'none') {
      const feedbackStyle =
        haptic === 'heavy'  ? Haptics.ImpactFeedbackStyle.Heavy :
        haptic === 'medium' ? Haptics.ImpactFeedbackStyle.Medium :
                              Haptics.ImpactFeedbackStyle.Light;
      Haptics.impactAsync(feedbackStyle).catch(() => {});
    }
  }, [haptic]);

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={activeOpacity}
        style={innerStyle}
        {...rest}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ScreenContainer
//  SafeAreaView equivalent — light-grey bg, optional scroll, safe insets.
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenContainer({ children, style, scrollable = true, padded = true }) {
  const insets = useSafeAreaInsets();
  const Wrap   = scrollable ? ScrollView : View;
  const inner  = [
    { paddingTop: insets.top },
    padded && { padding: 16, paddingTop: insets.top + 16 },
    { paddingBottom: insets.bottom + 40 },
    style,
  ];
  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <Wrap
        showsVerticalScrollIndicator={false}
        contentContainerStyle={scrollable ? inner : undefined}
        style={!scrollable ? inner : undefined}
      >
        {children}
      </Wrap>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  TopHeaderBackground
//  Edge-to-edge colored header that extends to the top of the screen.
//  The background color bleeds into the status bar area, but inner content
//  is pushed down by paddingTop: insets.top + extraPadding.
//  Accepts LinearGradient-style props (colors, start, end) or a flat color.
// ─────────────────────────────────────────────────────────────────────────────
export function TopHeaderBackground({
  children, style, color = COLORS.primary,
  colors, start, end, extraPadding = 16,
}) {
  const insets = useSafeAreaInsets();
  const contentPadding = { paddingTop: insets.top + extraPadding };

  if (colors) {
    return (
      <LinearGradient
        colors={colors}
        start={start ?? { x: 0, y: 0 }}
        end={end ?? { x: 1, y: 1 }}
        style={[style]}
      >
        <View style={contentPadding}>{children}</View>
      </LinearGradient>
    );
  }

  return (
    <View style={[{ backgroundColor: color }, style]}>
      <View style={contentPadding}>{children}</View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  SectionHeader
//  Bold navy title (20 px) + optional orange "See All" link.
// ─────────────────────────────────────────────────────────────────────────────
export function SectionHeader({ title, onSeeAll, style }) {
  return (
    <View style={[sh.row, style]}>
      <Text style={sh.title}>{title}</Text>
      {onSeeAll ? (
        <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 12, right: 4 }}>
          <Text style={sh.link}>See All</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ServiceCard
//  Square card with animated press + haptic feedback.
//  Image background, dark gradient bottom 40%, white text.
// ─────────────────────────────────────────────────────────────────────────────
export function ServiceCard({ service, size = 148, onPress }) {
  return (
    <AnimatedPressable
      style={[{ width: size, height: size }, sc.shadow]}
      onPress={onPress}
      haptic="light"
      scaleTo={0.95}
      innerStyle={{ flex: 1 }}
    >
      <View style={sc.root}>
        {/* background image with fallback color */}
        <Image
          source={{ uri: service.image }}
          style={sc.image}
          resizeMode="cover"
        />
        {/* gradient overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(10,22,34,0.82)']}
          style={sc.gradient}
          start={{ x: 0, y: 0.45 }}
          end={{ x: 0, y: 1 }}
        />
        {/* icon badge */}
        <View style={sc.iconBadge}>
          <Ionicons name={service.icon} size={14} color={COLORS.white} />
        </View>
        {/* label */}
        <View style={sc.labelWrap}>
          <Text style={sc.label} numberOfLines={2}>{service.name}</Text>
          {service.baseRate ? (
            <Text style={sc.rate}>from ${service.baseRate}/hr</Text>
          ) : null}
        </View>
      </View>
    </AnimatedPressable>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PrimaryButton
//  Large pill-shaped orange button with medium haptic feedback.
//  secondary=true -> navy outline variant.
// ─────────────────────────────────────────────────────────────────────────────
export function PrimaryButton({ label, onPress, style, secondary = false, icon, small = false }) {
  return (
    <AnimatedPressable
      style={style}
      onPress={onPress}
      haptic={secondary ? 'light' : 'medium'}
      scaleTo={0.96}
    >
      <View
        style={[
          pb.btn,
          secondary && pb.secondary,
          small && pb.small,
        ]}
      >
        {icon
          ? <Ionicons
              name={icon}
              size={small ? 15 : 18}
              color={secondary ? COLORS.primary : COLORS.white}
              style={{ marginRight: 7 }}
            />
          : null}
        <Text style={[pb.text, secondary && pb.textSecondary, small && pb.textSmall]}>
          {label}
        </Text>
      </View>
    </AnimatedPressable>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ServiceListRow
//  Clean white card row: coloured icon square, name, right chevron.
//  Now with AnimatedPressable for subtle press feedback.
// ─────────────────────────────────────────────────────────────────────────────
export function ServiceListRow({ service, onPress, isFirst, isLast }) {
  return (
    <AnimatedPressable
      onPress={onPress}
      haptic="light"
      scaleTo={0.98}
    >
      <View
        style={[
          slr.row,
          isFirst && slr.rowFirst,
          isLast  && slr.rowLast,
        ]}
      >
        <View style={[slr.iconWrap, { backgroundColor: service.groupColor + '18' }]}>
          <Ionicons name={service.icon} size={18} color={service.groupColor ?? COLORS.primary} />
        </View>
        <View style={slr.content}>
          <Text style={slr.name}>{service.name}</Text>
          {service.baseRate
            ? <Text style={slr.rate}>from ${service.baseRate}/hr</Text>
            : null}
        </View>
        <Ionicons name="chevron-forward" size={16} color={COLORS.inactive} />
      </View>
    </AnimatedPressable>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  SectionCard
//  White card container with optional header title + "See all" link.
// ─────────────────────────────────────────────────────────────────────────────
export function SectionCard({ title, children, style, action, onAction }) {
  return (
    <View style={[card.root, style]}>
      {(title || action) && (
        <View style={card.header}>
          {title ? <Text style={card.title}>{title}</Text> : null}
          {action ? (
            <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
              <Text style={card.action}>{action}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      )}
      {children}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  TopTabBar
//  Horizontal segmented-control style tab row.
// ─────────────────────────────────────────────────────────────────────────────
export function TopTabBar({ tabs, active, onSelect }) {
  return (
    <View style={tt.bar}>
      {tabs.map((t) => (
        <TouchableOpacity
          key={t.key}
          style={[tt.tab, active === t.key && tt.tabActive]}
          onPress={() => onSelect(t.key)}
          activeOpacity={0.75}
        >
          <Text style={[tt.label, active === t.key && tt.labelActive]}>
            {t.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  EmptyState  –  Premium centered empty state with translucent icon circle
//  Props: icon, title (Bold 20px Navy), description (Regular 15px), buttonText
// ─────────────────────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, subtitle, description, action, buttonText, onAction }) {
  const desc = description || subtitle;
  const btnLabel = buttonText || action;
  return (
    <View style={es.root}>
      <View style={es.iconWrap}>
        <Ionicons name={icon ?? 'cube-outline'} size={34} color={COLORS.accent} />
      </View>
      <Text style={es.title}>{title}</Text>
      {desc ? <Text style={es.subtitle}>{desc}</Text> : null}
      {btnLabel ? (
        <AnimatedPressable
          onPress={onAction}
          haptic="medium"
          scaleTo={0.96}
          style={{ marginTop: 16 }}
        >
          <View style={es.btn}>
            <Text style={es.btnText}>{btnLabel}</Text>
          </View>
        </AnimatedPressable>
      ) : null}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PlaceholderListItem  (kept for provider screens that already use it)
// ─────────────────────────────────────────────────────────────────────────────
export function PlaceholderListItem({
  icon, iconColor, iconBg, title, subtitle,
  rightText, onPress, isLast,
}) {
  const Wrap = onPress ? AnimatedPressable : View;
  const wrapProps = onPress ? { onPress, haptic: 'light', scaleTo: 0.98 } : {};
  return (
    <Wrap {...wrapProps}>
      <View style={[li.row, isLast && { borderBottomWidth: 0 }]}>
        {icon ? (
          <View style={[li.iconWrap, { backgroundColor: iconBg ?? COLORS.accentLight }]}>
            <Ionicons name={icon} size={17} color={iconColor ?? COLORS.accent} />
          </View>
        ) : null}
        <View style={li.content}>
          <Text style={li.title}>{title}</Text>
          {subtitle ? <Text style={li.subtitle}>{subtitle}</Text> : null}
        </View>
        {rightText ? <Text style={li.right}>{rightText}</Text> : null}
        {onPress   ? <Ionicons name="chevron-forward" size={15} color={COLORS.inactive} /> : null}
      </View>
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  HeaderBlock  (kept for existing provider screens)
// ─────────────────────────────────────────────────────────────────────────────
export function HeaderBlock({ title, subtitle, icon, color = COLORS.primary }) {
  return (
    <View style={[hb.root, { backgroundColor: color }]}>
      {icon ? (
        <View style={hb.iconWrap}>
          <Ionicons name={icon} size={26} color={COLORS.white} />
        </View>
      ) : null}
      <Text style={hb.title}>{title}</Text>
      {subtitle ? <Text style={hb.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  StatPill  (kept for provider/profile screens)
// ─────────────────────────────────────────────────────────────────────────────
export function StatPill({ stats }) {
  return (
    <View style={sp.root}>
      {stats.map((s, i) => (
        <React.Fragment key={i}>
          {i > 0 && <View style={sp.divider} />}
          <View style={sp.item}>
            <Text style={sp.value}>{s.value}</Text>
            <Text style={sp.label}>{s.label}</Text>
          </View>
        </React.Fragment>
      ))}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  StyleSheets
// ─────────────────────────────────────────────────────────────────────────────

const sh = StyleSheet.create({
  row:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontFamily: FONTS.familyBold, fontSize: 20, color: COLORS.textPrimary, letterSpacing: -0.3 },
  link:  { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.accent },
});

const sc = StyleSheet.create({
  shadow: {
    ...SHADOW.card,
  },
  root: {
    flex: 1,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: '#D0D0D0',
  },
  image: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  iconBadge: {
    position: 'absolute', top: 10, left: 10,
    width: 26, height: 26, borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center', justifyContent: 'center',
    zIndex: 2,
  },
  labelWrap: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10, zIndex: 2 },
  label: { fontFamily: FONTS.familyBold, fontSize: 13, color: COLORS.white, lineHeight: 17 },
  rate:  { fontFamily: FONTS.family, fontSize: 11, color: 'rgba(255,255,255,0.78)', marginTop: 2 },
});

const pb = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.pill,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    ...SHADOW.card,
  },
  secondary:     { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: COLORS.primary, shadowOpacity: 0 },
  small:         { height: 38, paddingHorizontal: 16 },
  text:          { fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.white },
  textSecondary: { color: COLORS.primary },
  textSmall:     { fontSize: 13 },
});

const slr = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  rowFirst: { borderTopLeftRadius: RADIUS.lg, borderTopRightRadius: RADIUS.lg },
  rowLast:  { borderBottomLeftRadius: RADIUS.lg, borderBottomRightRadius: RADIUS.lg, borderBottomWidth: 0 },
  iconWrap: { width: 40, height: 40, borderRadius: RADIUS.md, alignItems: 'center', justifyContent: 'center' },
  content:  { flex: 1 },
  name:     { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  rate:     { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
});

const card = StyleSheet.create({
  root:   { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: 16, marginBottom: 14, ...SHADOW.card },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title:  { fontFamily: FONTS.familySemibold, fontSize: 15, color: COLORS.textPrimary },
  action: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.accent },
});

const tt = StyleSheet.create({
  bar:        { flexDirection: 'row', backgroundColor: COLORS.white, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border },
  tab:        { flex: 1, paddingVertical: 13, alignItems: 'center', borderBottomWidth: 2.5, borderBottomColor: 'transparent' },
  tabActive:  { borderBottomColor: COLORS.accent },
  label:      { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textSecondary },
  labelActive:{ color: COLORS.accent },
});

const es = StyleSheet.create({
  root:     { alignItems: 'center', paddingVertical: 64, gap: 14, paddingHorizontal: 40 },
  iconWrap: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,127,63,0.10)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 4,
  },
  title:    { fontFamily: FONTS.familyBold, fontSize: 20, color: COLORS.textPrimary, textAlign: 'center' },
  subtitle: { fontFamily: FONTS.family, fontSize: 15, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 22 },
  btn:      {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.pill,
    paddingVertical: 14,
    paddingHorizontal: 32,
    ...SHADOW.card,
  },
  btnText:  { fontFamily: FONTS.familyBold, fontSize: 15, color: COLORS.white },
});

const li = StyleSheet.create({
  row:      { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.border },
  iconWrap: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  content:  { flex: 1 },
  title:    { fontFamily: FONTS.familySemibold, fontSize: 14, color: COLORS.textPrimary },
  subtitle: { fontFamily: FONTS.family, fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  right:    { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textSecondary },
});

const hb = StyleSheet.create({
  root:     { borderRadius: RADIUS.lg, padding: 20, marginBottom: 14, gap: 6 },
  iconWrap: { width: 46, height: 46, borderRadius: 23, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  title:    { fontFamily: FONTS.familyBold, fontSize: 20, color: COLORS.white },
  subtitle: { fontFamily: FONTS.family, fontSize: 13, color: 'rgba(255,255,255,0.78)', lineHeight: 19 },
});

const sp = StyleSheet.create({
  root:    { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.18)', borderRadius: RADIUS.md, marginTop: 14, padding: 12 },
  item:    { flex: 1, alignItems: 'center' },
  divider: { width: 1, backgroundColor: 'rgba(255,255,255,0.25)', marginVertical: 4 },
  value:   { fontFamily: FONTS.familyBold, fontSize: 18, color: COLORS.white },
  label:   { fontFamily: FONTS.family, fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
});
