// ─────────────────────────────────────────────────────────────────────────────
//  App.js  –  Navigation root
//  Palette: Navy (#1A374D) + Orange (#FF7F3F)
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { TASK_HISTORY } from './mockData';

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
// Legacy category-specific scope screens (Cleaning funnel – kept for compat)
import TaskScopeRoomsScreen     from './src/screens/booking/TaskScopeRoomsScreen';
import TaskScopeBathsScreen     from './src/screens/booking/TaskScopeBathsScreen';
import TaskScopeConditionScreen from './src/screens/booking/TaskScopeConditionScreen';
import TaskScopePetsScreen      from './src/screens/booking/TaskScopePetsScreen';
import TaskLoadingScreen        from './src/screens/booking/TaskLoadingScreen';
import TaskerListScreen         from './src/screens/booking/TaskerListScreen';
import TaskerProfileScreen      from './src/screens/booking/TaskerProfileScreen';
import TaskDetailsScreen        from './src/screens/booking/TaskDetailsScreen';
import ReviewConfirmScreen      from './src/screens/booking/ReviewConfirmScreen';

// ── NAVIGATOR INSTANCES ───────────────────────────────────────────────────────
const RootStack = createNativeStackNavigator();
const Tab       = createBottomTabNavigator();

// ── BOTTOM TAB NAVIGATOR ──────────────────────────────────────────────────────
// Tab bar is intentionally taller than the OS default for visual emphasis.
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor:   NAV_COLORS.primary,
        tabBarInactiveTintColor: NAV_COLORS.inactive,
        tabBarStyle: {
          backgroundColor: NAV_COLORS.white,
          borderTopColor:  NAV_COLORS.border,
          borderTopWidth:  1,
          height:          72,      // taller than standard 49pt
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

// ── ROOT STACK ────────────────────────────────────────────────────────────────
// Sits above the tabs so modals and funnels cover the tab bar entirely.
function RootNavigator() {
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
          Step 1  – TaskLocation          (fixed)
          Steps 2-4
            Cleaning category    → TaskScopeRooms → TaskScopeBaths
                                 → TaskScopeCondition → TaskScopePets
            All other categories → TaskScopeStep (generic, reads
                                   category.scoping_details[stepIndex])
          Step 5  – TaskLoading           (spinner)
          Step 6  – TaskerList
          Step 7  – TaskerProfile
          Step 8  – TaskDetails
          Step 9  – ReviewConfirm
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
        component={TaskScopeRoomsScreen}
        options={{ title: '', headerBackTitle: '' }}
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

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
