// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/auth/WelcomeScreen.js
//  Uses assets/logo_no_text.png (LogoMark component)
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { LogoMark } from '../../components/Logo';
import i18n from '../../i18n';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="dark" />

      <View style={styles.centerBlock}>
        <LogoMark size={120} />
        <Text style={styles.appName}>HANDYMAN</Text>
        <Text style={styles.subtitle}>{i18n.t('welcome.subtitle')}</Text>
      </View>

      <View style={styles.buttonBlock}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
        >
          <Text style={styles.loginBtnText}>{i18n.t('welcome.login')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupBtn}
          onPress={() => navigation.navigate('Signup')}
          activeOpacity={0.85}
        >
          <Text style={styles.signupBtnText}>{i18n.t('welcome.signup')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    paddingBottom: 48,
  },
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 14,
  },
  appName: {
    fontFamily: FONTS.familyBold,
    fontSize: 30,
    color: COLORS.primary,
    letterSpacing: 3,
    marginTop: 8,
  },
  subtitle: {
    fontFamily: FONTS.family,
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonBlock: {
    paddingHorizontal: 24,
    gap: 12,
  },
  loginBtn: {
    height: 54,
    borderRadius: RADIUS.pill,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtnText: {
    fontFamily: FONTS.familyBold,
    fontSize: 16,
    color: COLORS.primary,
  },
  signupBtn: {
    height: 54,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW.card,
  },
  signupBtnText: {
    fontFamily: FONTS.familyBold,
    fontSize: 16,
    color: COLORS.white,
  },
});
