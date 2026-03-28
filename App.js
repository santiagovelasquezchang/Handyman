// ─────────────────────────────────────────────────────────────────────────────
//  App.js  –  Navigation root (updated in Phase 2)
//  Real screens replace stubs as each phase completes.
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

// ── REAL SCREENS ─────────────────────────────────────────────────────────────
// Phase 2
import HomeScreen      from './src/screens/HomeScreen';
import SearchScreen    from './src/screens/SearchScreen';
// Phase 6 – Tab screens
import TasksScreen     from './src/screens/TasksScreen';
import MyTaskersScreen from './src/screens/MyTaskersScreen';
import ProfileScreen   from './src/screens/ProfileScreen';
// Phase 3 – Booking funnel
import TaskLocationScreen       from './src/screens/booking/TaskLocationScreen';
import TaskScopeRoomsScreen     from './src/screens/booking/TaskScopeRoomsScreen';
import TaskScopeBathsScreen     from './src/screens/booking/TaskScopeBathsScreen';
import TaskScopeConditionScreen from './src/screens/booking/TaskScopeConditionScreen';
import TaskScopePetsScreen      from './src/screens/booking/TaskScopePetsScreen';
import TaskLoadingScreen        from './src/screens/booking/TaskLoadingScreen';
// Phase 4 – Tasker selection
import TaskerListScreen    from './src/screens/booking/TaskerListScreen';
import TaskerProfileScreen from './src/screens/booking/TaskerProfileScreen';
// Phase 5 – Booking close
import TaskDetailsScreen   from './src/screens/booking/TaskDetailsScreen';
import ReviewConfirmScreen from './src/screens/booking/ReviewConfirmScreen';

// ── THEME ─────────────────────────────────────────────────────────────────────
const COLORS = {
  primary:      '#007A5E',
  white:        '#FFFFFF',
  border:       '#E8E8E8',
  textPrimary:  '#1A1A1A',
  inactive:     '#BCBCBC',
  tabBar:       '#FFFFFF',
};

// ── NAVIGATOR INSTANCES ───────────────────────────────────────────────────────
const RootStack = createNativeStackNavigator();
const Tab       = createBottomTabNavigator();

// ── BOTTOM TAB NAVIGATOR ──────────────────────────────────────────────────────
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor:   COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarStyle: {
          backgroundColor: COLORS.tabBar,
          borderTopColor:  COLORS.border,
          borderTopWidth:  1,
          height:          60,
          paddingBottom:   8,
          paddingTop:      6,
        },
        tabBarLabelStyle: {
          fontSize:   10,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            HomeTab:       focused ? 'home'               : 'home-outline',
            TasksTab:      focused ? 'calendar'           : 'calendar-outline',
            MyTaskersTab:  focused ? 'people'             : 'people-outline',
            ProfileTab:    focused ? 'person-circle'      : 'person-circle-outline',
          };
          return <Ionicons name={icons[route.name]} size={22} color={color} />;
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
            backgroundColor: COLORS.primary,
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

// ── ROOT STACK NAVIGATOR ──────────────────────────────────────────────────────
// The root stack sits above the tabs so the booking funnel and search modal
// can cover the tab bar entirely when needed.
function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle:        { backgroundColor: COLORS.white },
        headerTintColor:    COLORS.textPrimary,
        headerTitleStyle:   { fontWeight: '700', fontSize: 17 },
        headerShadowVisible: false,
        contentStyle:       { backgroundColor: COLORS.white },
      }}
    >
      {/* ── Main app (tabs) – no header at root level ── */}
      <RootStack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />

      {/* ── Search – presented as a full-screen modal ── */}
      <RootStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          presentation: 'fullScreenModal',
          headerShown:  false,
          animation:    'fade',
        }}
      />

      {/* ── Booking Funnel ── */}
      <RootStack.Screen
        name="TaskLocation"
        component={TaskLocationScreen}
        options={{ title: "Where's the job?" }}
      />
      <RootStack.Screen
        name="TaskScopeRooms"
        component={TaskScopeRoomsScreen}
        options={{ title: '' }}
      />
      <RootStack.Screen
        name="TaskScopeBaths"
        component={TaskScopeBathsScreen}
        options={{ title: '' }}
      />
      <RootStack.Screen
        name="TaskScopeCondition"
        component={TaskScopeConditionScreen}
        options={{ title: '' }}
      />
      <RootStack.Screen
        name="TaskScopePets"
        component={TaskScopePetsScreen}
        options={{ title: '' }}
      />
      <RootStack.Screen
        name="TaskLoading"
        component={TaskLoadingScreen}
        options={{
          headerShown: false,
          gestureEnabled: false, // prevent swipe-back during loading
        }}
      />
      <RootStack.Screen
        name="TaskerList"
        component={TaskerListScreen}
        options={{ title: 'Select a Tasker' }}
      />
      <RootStack.Screen
        name="TaskerProfile"
        component={TaskerProfileScreen}
        options={{ title: '' }}
      />
      <RootStack.Screen
        name="TaskDetails"
        component={TaskDetailsScreen}
        options={{ title: 'Task details' }}
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
