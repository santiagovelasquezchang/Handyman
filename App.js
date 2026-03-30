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

// Contexts
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { AppModeProvider, useAppMode } from './src/context/AppModeContext';
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

// ── CLIENT TAB SCREENS ────────────────────────────────────────────────────────
import HomeScreen      from './src/screens/HomeScreen';
import SearchScreen    from './src/screens/SearchScreen';
import TasksScreen     from './src/screens/TasksScreen';
import MyTaskersScreen from './src/screens/MyTaskersScreen';
import ProfileScreen   from './src/screens/ProfileScreen';
import ManageTaskScreen from './src/screens/ManageTaskScreen';

// ── TASKER SCREENS ────────────────────────────────────────────────────────────
import TaskerDashboardScreen    from './src/screens/tasker/TaskerDashboardScreen';
import TaskerAvailabilityScreen  from './src/screens/tasker/TaskerAvailabilityScreen';
import TaskerTasksScreen        from './src/screens/tasker/TaskerTasksScreen';
import TaskerProfileScreen      from './src/screens/tasker/TaskerProfileScreen';
import ActiveTaskDetailsScreen  from './src/screens/tasker/ActiveTaskDetailsScreen';
import TaskerEditBioScreen      from './src/screens/tasker/TaskerEditBioScreen';
import TaskerSkillsRatesScreen  from './src/screens/tasker/TaskerSkillsRatesScreen';
import TaskerPortfolioScreen    from './src/screens/tasker/TaskerPortfolioScreen';
import TaskerBankDetailsScreen  from './src/screens/tasker/TaskerBankDetailsScreen';
import TaskerEarningsScreen     from './src/screens/tasker/TaskerEarningsScreen';

// ── SHARED SCREENS ────────────────────────────────────────────────────────────
import ChatScreen from './src/screens/chat/ChatScreen';

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
import BookingTaskerProfileScreen from './src/screens/booking/TaskerProfileScreen';
import TaskDetailsScreen        from './src/screens/booking/TaskDetailsScreen';
import ReviewConfirmScreen      from './src/screens/booking/ReviewConfirmScreen';

// ── NAVIGATOR INSTANCES ───────────────────────────────────────────────────────
const OuterStack   = createNativeStackNavigator(); // Splash / Auth / App
const AuthStack    = createNativeStackNavigator(); // Welcome / Login / Signup
const RootStack    = createNativeStackNavigator(); // Client tabs + funnel + profile
const TaskerStack  = createNativeStackNavigator(); // Tasker tabs + task screens
const Tab          = createBottomTabNavigator();
const TaskerTab    = createBottomTabNavigator();

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
        tabBarShowLabel: false,
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

// ── TASKER BOTTOM TABS ────────────────────────────────────────────────────────
function TaskerTabs() {
  return (
    <TaskerTab.Navigator
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
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color }) => {
          const icons = {
            DashboardTab: focused ? 'hammer'         : 'hammer-outline',
            ScheduleTab:  focused ? 'calendar'       : 'calendar-outline',
            TTasksTab:    focused ? 'briefcase'      : 'briefcase-outline',
            TProfileTab:  focused ? 'person-circle' : 'person-circle-outline',
          };
          return <Ionicons name={icons[route.name]} size={24} color={color} />;
        },
      })}
    >
      <TaskerTab.Screen name="DashboardTab" component={TaskerDashboardScreen}    options={{ title: 'Dashboard' }} />
      <TaskerTab.Screen name="ScheduleTab"  component={TaskerAvailabilityScreen} options={{ title: 'Schedule'  }} />
      <TaskerTab.Screen name="TTasksTab"    component={TaskerTasksScreen}        options={{ title: 'My Tasks'  }} />
      <TaskerTab.Screen name="TProfileTab"  component={TaskerProfileScreen}      options={{ title: 'Profile'   }} />
    </TaskerTab.Navigator>
  );
}

// ── TASKER NAVIGATOR (stack wrapping tabs + task detail screens) ──────────────
function TaskerNavigator() {
  return (
    <TaskerStack.Navigator
      screenOptions={{
        headerStyle:         { backgroundColor: NAV_COLORS.white },
        headerTintColor:     NAV_COLORS.primary,
        headerTitleStyle:    { fontWeight: '700', fontSize: 17, color: NAV_COLORS.primary },
        headerShadowVisible: false,
        contentStyle:        { backgroundColor: NAV_COLORS.background },
      }}
    >
      <TaskerStack.Screen
        name="TaskerTabs"
        component={TaskerTabs}
        options={{ headerShown: false }}
      />
      <TaskerStack.Screen
        name="ActiveTaskDetails"
        component={ActiveTaskDetailsScreen}
        options={{ title: '', headerBackTitle: '' }}
      />
      <TaskerStack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: '', headerBackTitle: '' }}
      />
      <TaskerStack.Screen
        name="TaskerEditBio"
        component={TaskerEditBioScreen}
        options={{ title: 'Edit Bio', headerBackTitle: '' }}
      />
      <TaskerStack.Screen
        name="TaskerSkillsRates"
        component={TaskerSkillsRatesScreen}
        options={{ title: 'Skills & Rates', headerBackTitle: '' }}
      />
      <TaskerStack.Screen
        name="TaskerPortfolio"
        component={TaskerPortfolioScreen}
        options={{ title: 'Portfolio', headerBackTitle: '' }}
      />
      <TaskerStack.Screen
        name="TaskerBankDetails"
        component={TaskerBankDetailsScreen}
        options={{ title: 'Bank Details', headerBackTitle: '' }}
      />
      <TaskerStack.Screen
        name="TaskerEarnings"
        component={TaskerEarningsScreen}
        options={{ title: 'Earnings', headerBackTitle: '' }}
      />
    </TaskerStack.Navigator>
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

      {/* ── Manage Task ── */}
      <RootStack.Screen
        name="ManageTask"
        component={ManageTaskScreen}
        options={{ title: 'Manage Task' }}
      />

      {/* ── Chat (shared) ── */}
      <RootStack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: '', headerBackTitle: '' }}
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
        component={BookingTaskerProfileScreen}
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

// ── ROOT NAVIGATOR (decides Splash → Auth → Client or Tasker app) ────────────
function RootNavigator() {
  const [showSplash, setShowSplash] = useState(true);
  const { isLoggedIn }  = useAuth();
  const { isTaskerMode } = useAppMode();

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <OuterStack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {isLoggedIn ? (
        isTaskerMode ? (
          <OuterStack.Screen name="TaskerApp" component={TaskerNavigator} />
        ) : (
          <OuterStack.Screen name="App" component={AppNavigator} />
        )
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
