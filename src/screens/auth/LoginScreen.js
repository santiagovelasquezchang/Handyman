// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/auth/LoginScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';
import { LogoFull } from '../../components/Logo';
import i18n from '../../i18n';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused]   = useState(null);

  const handleLogin = () => {
    const name = email.split('@')[0] || 'User';
    login({ name: name.charAt(0).toUpperCase() + name.slice(1), email, phone: '' });
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.logoBlock}>
            <LogoFull />
            <Text style={styles.title}>{i18n.t('login.title')}</Text>
            <Text style={styles.subtitle}>{i18n.t('login.subtitle')}</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>{i18n.t('login.email')}</Text>
              <TextInput
                style={[styles.input, focused === 'email' && styles.inputFocused]}
                value={email} onChangeText={setEmail}
                keyboardType="email-address" autoCapitalize="none" autoCorrect={false}
                placeholder="you@example.com" placeholderTextColor={COLORS.textDisabled}
                onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
              />
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>{i18n.t('login.password')}</Text>
              <TextInput
                style={[styles.input, focused === 'password' && styles.inputFocused]}
                value={password} onChangeText={setPassword}
                secureTextEntry placeholder="••••••••" placeholderTextColor={COLORS.textDisabled}
                onFocus={() => setFocused('password')} onBlur={() => setFocused(null)}
              />
            </View>
            <TouchableOpacity style={styles.forgotWrap} activeOpacity={0.7}>
              <Text style={styles.forgotText}>{i18n.t('login.forgotPassword')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn} onPress={handleLogin} activeOpacity={0.85}>
              <Text style={styles.submitBtnText}>{i18n.t('login.btn')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>{i18n.t('login.noAccount')} </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} activeOpacity={0.7}>
              <Text style={styles.footerLink}>{i18n.t('login.signupLink')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 40 },
  logoBlock: { alignItems: 'center', marginBottom: 32, gap: 10 },
  title: { fontFamily: FONTS.familyBold, fontSize: 24, color: COLORS.primary },
  subtitle: { fontFamily: FONTS.family, fontSize: 14, color: COLORS.textSecondary },
  form: { gap: 16 },
  fieldGroup: { gap: 6 },
  label: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textPrimary },
  input: {
    height: 50, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.md,
    paddingHorizontal: 14, fontFamily: FONTS.family, fontSize: 15, color: COLORS.textPrimary,
    backgroundColor: COLORS.white,
  },
  inputFocused: { borderColor: COLORS.accent },
  forgotWrap: { alignSelf: 'flex-end' },
  forgotText: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.accent },
  submitBtn: {
    height: 54, borderRadius: RADIUS.pill, backgroundColor: COLORS.accent,
    alignItems: 'center', justifyContent: 'center', marginTop: 4, ...SHADOW.card,
  },
  submitBtnText: { fontFamily: FONTS.familyBold, fontSize: 16, color: COLORS.white },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 28 },
  footerText: { fontFamily: FONTS.family, fontSize: 14, color: COLORS.textSecondary },
  footerLink: { fontFamily: FONTS.familyBold, fontSize: 14, color: COLORS.accent },
});
