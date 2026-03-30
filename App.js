// ─────────────────────────────────────────────────────────────────────────────
//  App.js  –  Navigation root
//
//  Architecture:
//   Splash → Auth (Welcome / Login / Signup)
//          → ClientNavigator   (5 tabs + all client stacks)
//          → ProviderNavigator (5 tabs + all provider stacks)
//
//  Mode switching:
//   isTaskerMode (AppModeContext) controls which navigator is shown post-auth.
//   Toggle in ProfileScreen ("Switch to Provider Mode") /
//           ProviderProfileScreen ("Switch to Client Mode").
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer       } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider          } from 'react-native-safe-area-context';
import { StatusBar                 } from 'expo-status-bar';

import useFonts from './src/hooks/useFonts';

// ── Contexts ──────────────────────────────────────────────────────────────────
import { AuthProvider,    useAuth    } from './src/context/AuthContext';
import { AppModeProvider, useAppMode } from './src/context/AppModeContext';

// ── Auth screens ──────────────────────────────────────────────────────────────
import SplashScreen  from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/auth/WelcomeScreen';
import LoginScreen   from './src/screens/auth/LoginScreen';
import SignupScreen  from './src/screens/auth/SignupScreen';

// ── Mode navigators ───────────────────────────────────────────────────────────
import ClientNavigator   from './src/navigation/ClientNavigator';
import ProviderNavigator from './src/navigation/ProviderNavigator';

// ── Navigator instances ───────────────────────────────────────────────────────
const OuterStack = createNativeStackNavigator();
const AuthStack  = createNativeStackNavigator();

// ── Auth navigator ────────────────────────────────────────────────────────────
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login"   component={LoginScreen} />
      <AuthStack.Screen name="Signup"  component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

// ── Root navigator: Splash → Auth → Client or Provider ───────────────────────
function RootNavigator() {
  const [showSplash, setShowSplash] = useState(true);
  const { isLoggedIn  } = useAuth();
  const { isTaskerMode } = useAppMode();

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <OuterStack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {isLoggedIn ? (
        isTaskerMode ? (
          <OuterStack.Screen name="ProviderApp" component={ProviderNavigator} />
        ) : (
          <OuterStack.Screen name="ClientApp"   component={ClientNavigator} />
        )
      ) : (
        <OuterStack.Screen name="Auth"          component={AuthNavigator} />
      )}
    </OuterStack.Navigator>
  );
}

// ── App root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [fontsLoaded] = useFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#FF7F3F" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <AppModeProvider>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </AppModeProvider>
    </AuthProvider>
  );
}
