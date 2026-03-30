// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/auth/SignupScreen.js
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

export default function SignupScreen({ navigation }) {
  const { login } = useAuth();
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [phone, setPhone]       = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused]   = useState(null);

  const field = (key, value, setter, opts = {}) => (
    <View style={styles.fieldGroup} key={key}>
      <Text style={styles.label}>{i18n.t(`signup.${key}`)}</Text>
      <TextInput
        style={[styles.input, focused === key && styles.inputFocused]}
        value={value} onChangeText={setter}
        placeholderTextColor={COLORS.textDisabled}
        onFocus={() => setFocused(key)} onBlur={() => setFocused(null)}
        {...opts}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.logoBlock}>
            <LogoFull />
            <Text style={styles.title}>{i18n.t('signup.title')}</Text>
            <Text style={styles.subtitle}>{i18n.t('signup.subtitle')}</Text>
          </View>

          <View style={styles.form}>
            {field('name', name, setName, { placeholder: 'Juan Pérez', autoCapitalize: 'words' })}
            {field('email', email, setEmail, { placeholder: 'you@example.com', keyboardType: 'email-address', autoCapitalize: 'none', autoCorrect: false })}
            {field('phone', phone, setPhone, { placeholder: '+58 412 555 0100', keyboardType: 'phone-pad' })}
            {field('password', password, setPassword, { placeholder: '••••••••', secureTextEntry: true })}

            <TouchableOpacity style={styles.submitBtn} onPress={() => login({ name: name || 'User', email, phone })} activeOpacity={0.85}>
              <Text style={styles.submitBtnText}>{i18n.t('signup.btn')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>{i18n.t('signup.hasAccount')} </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
              <Text style={styles.footerLink}>{i18n.t('signup.loginLink')}</Text>
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
  logoBlock: { alignItems: 'center', marginBottom: 28, gap: 10 },
  title: { fontFamily: FONTS.familyBold, fontSize: 24, color: COLORS.primary },
  subtitle: { fontFamily: FONTS.family, fontSize: 14, color: COLORS.textSecondary },
  form: { gap: 14 },
  fieldGroup: { gap: 6 },
  label: { fontFamily: FONTS.familySemibold, fontSize: 13, color: COLORS.textPrimary },
  input: {
    height: 50, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.md,
    paddingHorizontal: 14, fontFamily: FONTS.family, fontSize: 15, color: COLORS.textPrimary,
    backgroundColor: COLORS.white,
  },
  inputFocused: { borderColor: COLORS.accent },
  submitBtn: {
    height: 54, borderRadius: RADIUS.pill, backgroundColor: COLORS.accent,
    alignItems: 'center', justifyContent: 'center', marginTop: 6, ...SHADOW.card,
  },
  submitBtnText: { fontFamily: FONTS.familyBold, fontSize: 16, color: COLORS.white },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { fontFamily: FONTS.family, fontSize: 14, color: COLORS.textSecondary },
  footerLink: { fontFamily: FONTS.familyBold, fontSize: 14, color: COLORS.accent },
});
