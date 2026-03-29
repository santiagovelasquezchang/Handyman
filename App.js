// ─────────────────────────────────────────────────────────────────────────────
//  App.js  –  Navigation root  (Phase 1 Redux)
//  Structure:  Splash → AuthStack (Welcome/Login/Signup)
//                     → AppStack  (MainTabs + booking funnel + profile)
//  Palette: Navy (#1A374D) + Orange (#FF7F3F)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import useFonts from './src/hooks/useFonts';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { TASK_HISTORY } from './mockData';

// Auth context + new screens
import { AuthProvider, useAuth } from './src/context/AuthContext';
import SplashScreen  from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/auth/WelcomeScreen';
import LoginScreen   from './src/screens/auth/LoginScreen';
import SignupScreen  from './src/screens/auth/SignupScreen';

const SCHEDULED_COUNT = TASK_HISTORY.scheduled.length;

// ── BRAND COLORS (mirrors src/theme.js) ──────────────────────────────────────
const NAV_COLORS = {
  primary:    '#1A374D',   // Navy
  accent:     '#FF7F3F',   // Orange
  white:      '#FFFFFF',
  background: '#F1F1F1',
  border:     '#E2E2E2',
  inactive:   '#BCBCBC',
};

// ── MAIN TAB SCREENS ──────────────────────────────────────────────────────────
import HomeScreen      from './src/screens/HomeScreen';
import SearchScreen    from './src/screens/SearchScreen';
import TasksScreen     from './src/screens/TasksScreen';
import MyTaskersScreen from './src/screens/MyTaskersScreen';
import ProfileScreen   from './src/screens/ProfileScreen';

// ── PROFILE SUB-SCREENS ───────────────────────────────────────────────────────
import AccountSettingsScreen      from './src/screens/profile/AccountSettingsScreen';
import SavedAddressesScreen       from './src/screens/profile/SavedAddressesScreen';
import PaymentMethodsScreen       from './src/screens/profile/PaymentMethodsScreen';
import NotificationSettingsScreen from './src/screens/profile/NotificationSettingsScreen';
import InviteFriendsScreen        from './src/screens/profile/InviteFriendsScreen';
import HelpCenterScreen           from './src/screens/profile/HelpCenterScreen';

// ── BOOKING FUNNEL ────────────────────────────────────────────────────────────
import TaskLocationScreen       from './src/screens/booking/TaskLocationScreen';
import TaskScopeStepScreen      from './src/screens/booking/TaskScopeStepScreen';
// Legacy category-specific scope screens (Cleaning funnel – kept for compat)
import TaskScopeRoomsScreen     from './src/screens/booking/TaskScopeRoomsScreen';
import TaskScopeBathsScreen     from './src/screens/booking/TaskScopeBathsScreen';
import TaskScopeConditionScreen from './src/screens/booking/TaskScopeConditionScreen';
import TaskScopePetsScreen      from './src/screens/booking/TaskScopePetsScreen';
import TaskDateTimeScreen       from './src/screens/booking/TaskDateTimeScreen';
import TaskLoadingScreen        from './src/screens/booking/TaskLoadingScreen';
import TaskerListScreen         from './src/screens/booking/TaskerListScreen';
import TaskerProfileScreen      from './src/screens/booking/TaskerProfileScreen';
import TaskDetailsScreen        from './src/screens/booking/TaskDetailsScreen';
import ReviewConfirmScreen      from './src/screens/booking/ReviewConfirmScreen';

// ── NAVIGATOR INSTANCES ───────────────────────────────────────────────────────
const OuterStack = createNativeStackNavigator(); // Splash / Auth / App
const AuthStack  = createNativeStackNavigator(); // Welcome / Login / Signup
const RootStack  = createNativeStackNavigator(); // Tabs + funnel + profile
const Tab        = createBottomTabNavigator();

// ── AUTH NAVIGATOR ─────────────────────────────────────────────────────────────
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login"   component={LoginScreen} />
      <AuthStack.Screen name="Signup"  component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

// ── BOTTOM TAB NAVIGATOR ──────────────────────────────────────────────────────
// Tab bar is intentionally taller than the OS default for visual emphasis.
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor:   NAV_COLORS.accent,
        tabBarInactiveTintColor: NAV_COLORS.inactive,
        tabBarStyle: {
          backgroundColor: NAV_COLORS.white,
          borderTopColor:  NAV_COLORS.border,
          borderTopWidth:  1,
          height:          75,
          paddingBottom:   12,
          paddingTop:      8,
        },
        tabBarLabelStyle: {
          fontSize:   11,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color }) => {
          const icons = {
            HomeTab:      focused ? 'home'          : 'home-outline',
            TasksTab:     focused ? 'calendar'      : 'calendar-outline',
            MyTaskersTab: focused ? 'people'        : 'people-outline',
            ProfileTab:   focused ? 'person-circle' : 'person-circle-outline',
          };
          return <Ionicons name={icons[route.name]} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="TasksTab"
        component={TasksScreen}
        options={{
          title: 'Tasks',
          tabBarBadge: SCHEDULED_COUNT > 0 ? SCHEDULED_COUNT : undefined,
          tabBarBadgeStyle: {
            backgroundColor: NAV_COLORS.accent,
            fontSize: 10,
            minWidth: 16,
            height: 16,
            lineHeight: 16,
          },
        }}
      />
      <Tab.Screen
        name="MyTaskersTab"
        component={MyTaskersScreen}
        options={{ title: 'My Taskers' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

// ── MAIN APP STACK (tabs + funnel + profile sub-screens) ─────────────────────
function AppNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle:         { backgroundColor: NAV_COLORS.white },
        headerTintColor:     NAV_COLORS.primary,
        headerTitleStyle:    { fontWeight: '700', fontSize: 17, color: NAV_COLORS.primary },
        headerShadowVisible: false,
        contentStyle:        { backgroundColor: NAV_COLORS.background },
      }}
    >
      {/* ── Main app (tabs) ── */}
      <RootStack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />

      {/* ── Search modal ── */}
      <RootStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          presentation: 'fullScreenModal',
          headerShown:  false,
          animation:    'fade',
        }}
      />

      {/* ────────────────────────────────────────────────────────────────────
          PROFILE SUB-STACK
          Navigate from ProfileScreen: navigation.navigate('AccountSettings')
      ──────────────────────────────────────────────────────────────────── */}
      <RootStack.Screen
        name="AccountSettings"
        component={AccountSettingsScreen}
        options={{ title: 'Account Settings' }}
      />
      <RootStack.Screen
        name="SavedAddresses"
        component={SavedAddressesScreen}
        options={{ title: 'Saved Addresses' }}
      />
      <RootStack.Screen
        name="PaymentMethods"
        component={PaymentMethodsScreen}
        options={{ title: 'Payment Methods' }}
      />
      <RootStack.Screen
        name="NotificationSettings"
        component={NotificationSettingsScreen}
        options={{ title: 'Notifications' }}
      />
      <RootStack.Screen
        name="InviteFriends"
        component={InviteFriendsScreen}
        options={{ title: 'Invite Friends' }}
      />
      <RootStack.Screen
        name="HelpCenter"
        component={HelpCenterScreen}
        options={{ title: 'Help Center' }}
      />

      {/* ────────────────────────────────────────────────────────────────────
          BOOKING FUNNEL
          Step 1  – TaskLocation          (address entry)
          Steps 2+ – TaskScopeStep        (dynamic, reads scoping_details)
          Step N  – TaskDateTime          (date/time or Right Now ASAP)
          Step N+1– TaskLoading           (spinner, then replaces to TaskerList)
          Step N+2– TaskerList
          Step N+3– TaskerProfile         (Select & Continue → TaskDetails)
          Step N+4– TaskDetails           (extra instructions)
          Step N+5– ReviewConfirm         (checkout)
      ──────────────────────────────────────────────────────────────────── */}
      <RootStack.Screen
        name="TaskLocation"
        component={TaskLocationScreen}
        options={{ title: "Where's the job?" }}
      />

      {/* Cleaning-specific scope screens (legacy) */}
      <RootStack.Screen
        name="TaskScopeRooms"
        component={TaskScopeRoomsScreen}
        options={{ title: '', headerBackTitle: '' }}
      />
      <RootStack.Screen
        name="TaskScopeBaths"
        component={TaskScopeBathsScreen}
        options={{ title: '', headerBackTitle: '' }}
      />
      <RootStack.Screen
        name="TaskScopeCondition"
        component={TaskScopeConditionScreen}
        options={{ title: '', headerBackTitle: '' }}
      />
      <RootStack.Screen
        name="TaskScopePets"
        component={TaskScopePetsScreen}
        options={{ title: '', headerBackTitle: '' }}
      />

      {/*
        Generic dynamic scope screen — "TaskScopeStep"
        Params: { category, stepIndex, answers }
        Reads category.scoping_details[stepIndex] to render each question.
        On select → pushes TaskScopeStep (next step) or TaskLoading.
        Full implementation: src/screens/booking/TaskScopeStepScreen.js (Phase 3)
        Using TaskScopeRoomsScreen as placeholder until that file is built.
      */}
      <RootStack.Screen
        name="TaskScopeStep"
        component={TaskScopeStepScreen}
        options={{ title: '', headerBackTitle: '' }}
      />

      <RootStack.Screen
        name="TaskDateTime"
        component={TaskDateTimeScreen}
        options={{ title: '', headerShown: false }}
      />
      <RootStack.Screen
        name="TaskLoading"
        component={TaskLoadingScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <RootStack.Screen
        name="TaskerList"
        component={TaskerListScreen}
        options={{ title: 'Select a Tasker' }}
      />
      <RootStack.Screen
        name="TaskerProfile"
        component={TaskerProfileScreen}
        options={{ title: '', headerBackTitle: '' }}
      />
      <RootStack.Screen
        name="TaskDetails"
        component={TaskDetailsScreen}
        options={{ title: 'Task Details' }}
      />
      <RootStack.Screen
        name="ReviewConfirm"
        component={ReviewConfirmScreen}
        options={{ title: 'Review & Confirm' }}
      />
    </RootStack.Navigator>
  );
}

// ── ROOT NAVIGATOR (decides Splash → Auth or App) ────────────────────────────
function RootNavigator() {
  const [showSplash, setShowSplash] = useState(true);
  const { isLoggedIn } = useAuth();

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <OuterStack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {isLoggedIn ? (
        <OuterStack.Screen name="App"  component={AppNavigator} />
      ) : (
        <OuterStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </OuterStack.Navigator>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
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
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
