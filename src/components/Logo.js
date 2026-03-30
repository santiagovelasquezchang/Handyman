// ─────────────────────────────────────────────────────────────────────────────
//  src/components/Logo.js
//
//  Three logo variants matching the Handyman brand assets.
//  When the PNG files are placed in /assets, swap the components to:
//    <Image source={require('../../assets/full_logo.png')} ... />
//    <Image source={require('../../assets/logo_no_text.png')} ... />
//    <Image source={require('../../assets/text_logo.png')} ... />
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../theme';

const SW = Dimensions.get('window').width;

// ── Detect if asset exists (returns false when file is missing) ───────────────
let FULL_LOGO    = null;
let LOGO_NO_TEXT = null;
let TEXT_LOGO    = null;
try { FULL_LOGO    = require('../../images/fulllogo.png');    } catch (_) {}
try { LOGO_NO_TEXT = require('../../images/logonotext.png'); } catch (_) {}
try { TEXT_LOGO    = require('../../images/textlogo.png');    } catch (_) {}

// ── LogoMark: circle with crossed hammer + wrench ─────────────────────────────
export function LogoMark({ size = SW * 0.5 }) {
  if (LOGO_NO_TEXT) {
    return (
      <Image
        source={LOGO_NO_TEXT}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    );
  }
  const stroke = size * 0.065;
  return (
    <View style={[
      styles.markCircle,
      { width: size, height: size, borderRadius: size / 2, borderWidth: stroke },
    ]}>
      {/* Hammer (orange) */}
      <View style={[styles.hammerWrap, { transform: [{ rotate: '-35deg' }] }]}>
        <Ionicons name="hammer" size={size * 0.36} color={COLORS.accent} />
      </View>
      {/* Wrench (orange, mirrored) */}
      <View style={[styles.wrenchWrap, { transform: [{ rotate: '35deg' }, { scaleX: -1 }] }]}>
        <Ionicons name="construct" size={size * 0.3} color={COLORS.accent} />
      </View>
    </View>
  );
}

// ── LogoText: "HANDYMAN" word-mark ────────────────────────────────────────────
export function LogoText({ fontSize = 28, color = COLORS.primary }) {
  if (TEXT_LOGO) {
    return (
      <Image
        source={TEXT_LOGO}
        style={{ width: SW * 0.55, height: 70 }}
        resizeMode="contain"
      />
    );
  }
  return (
    <Text style={[styles.wordmark, { fontSize, color }]}>
      HANDYMAN
    </Text>
  );
}

// ── LogoFull: mark + wordmark stacked ─────────────────────────────────────────
export function LogoFull({ size = 90 }) {
  if (FULL_LOGO) {
    return (
      <Image
        source={FULL_LOGO}
        style={{ width: SW * 0.82, height: SW * 0.82 }}
        resizeMode="contain"
      />
    );
  }
  return (
    <View style={styles.fullWrap}>
      <LogoMark size={size} />
      <LogoText fontSize={size * 0.32} color={COLORS.primary} />
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  markCircle: {
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  hammerWrap: {
    position: 'absolute',
    left: '15%',
    top: '22%',
  },
  wrenchWrap: {
    position: 'absolute',
    right: '10%',
    bottom: '20%',
  },
  wordmark: {
    fontFamily: 'Inter_700Bold',
    letterSpacing: 2.5,
  },
  fullWrap: {
    alignItems: 'center',
    gap: 10,
  },
});
