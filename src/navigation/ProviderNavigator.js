// ─────────────────────────────────────────────────────────────────────────────
//  src/navigation/ProviderNavigator.js
//  Provider (Tasker) app — 5-tab structure + all stack screens
//
//  Tabs:
//   1. Dashboard  (DashboardTab)
//   2. Calendar   (CalendarTab)
//   3. Jobs       (JobsTab)
//   4. Earnings   (EarningsTab)
//   5. Profile    (ProviderProfileTab)
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { createBottomTabNavigator    } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY  = '#1A374D';
const ACCENT   = '#FF7F3F';
const WHITE    = '#FFFFFF';
const BORDER   = '#E2E2E2';
const INACTIVE = '#BCBCBC';
const BG       = '#F1F1F1';

// ── Provider screens ──────────────────────────────────────────────────────────
import ProviderDashboardScreen  from '../screens/provider/ProviderDashboardScreen';
import ProviderCalendarScreen   from '../screens/provider/ProviderCalendarScreen';
import ProviderJobsScreen       from '../screens/provider/ProviderJobsScreen';
import ProviderEarningsScreen   from '../screens/provider/ProviderEarningsScreen';
import ProviderProfileScreen    from '../screens/provider/ProviderProfileScreen';
import JobDetailsScreen         from '../screens/provider/JobDetailsScreen';
import AvailabilitySettingsScreen from '../screens/provider/AvailabilitySettingsScreen';
import OperatingAreasScreen     from '../screens/provider/OperatingAreasScreen';
import SkillsAndServicesScreen  from '../screens/provider/SkillsAndServicesScreen';
import VerificationScreen       from '../screens/provider/VerificationScreen';
import ProviderSettingsScreen   from '../screens/provider/ProviderSettingsScreen';

// ── Existing tasker sub-screens (re-used) ─────────────────────────────────────
import TaskerEditBioScreen     from '../screens/tasker/TaskerEditBioScreen';
import TaskerPortfolioScreen   from '../screens/tasker/TaskerPortfolioScreen';
import TaskerBankDetailsScreen from '../screens/tasker/TaskerBankDetailsScreen';
import ActiveTaskDetailsScreen from '../screens/tasker/ActiveTaskDetailsScreen';
import HelpCenterScreen        from '../screens/profile/HelpCenterScreen';

// ── Shared ────────────────────────────────────────────────────────────────────
import ChatScreen from '../screens/chat/ChatScreen';

// ── Navigator instances ───────────────────────────────────────────────────────
const Tab         = createBottomTabNavigator();
const RootStack   = createNativeStackNavigator();

const TAB_ICONS = {
  DashboardTab:      ['hammer',        'hammer-outline'],
  CalendarTab:       ['calendar',      'calendar-outline'],
  JobsTab:           ['briefcase',     'briefcase-outline'],
  EarningsTab:       ['cash',          'cash-outline'],
  ProviderProfileTab:['person-circle', 'person-circle-outline'],
};

const STACK_HEADER = {
  headerStyle:         { backgroundColor: WHITE },
  headerTintColor:     PRIMARY,
  headerTitleStyle:    { fontWeight: '700', fontSize: 17, color: PRIMARY },
  headerShadowVisible: false,
  contentStyle:        { backgroundColor: BG },
};

// ── Provider tabs ─────────────────────────────────────────────────────────────
function ProviderTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor:   ACCENT,
        tabBarInactiveTintColor: INACTIVE,
        tabBarStyle: {
          backgroundColor: WHITE,
          borderTopColor:  BORDER,
          borderTopWidth:  1,
          height:          76,
          paddingBottom:   12,
          paddingTop:      8,
        },
        tabBarIcon: ({ focused, color }) => {
          const [on, off] = TAB_ICONS[route.name] ?? ['cube', 'cube-outline'];
          return <Ionicons name={focused ? on : off} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="DashboardTab"       component={ProviderDashboardScreen} />
      <Tab.Screen name="CalendarTab"        component={ProviderCalendarScreen} />
      <Tab.Screen name="JobsTab"            component={ProviderJobsScreen} />
      <Tab.Screen name="EarningsTab"        component={ProviderEarningsScreen} />
      <Tab.Screen name="ProviderProfileTab" component={ProviderProfileScreen} />
    </Tab.Navigator>
  );
}

// ── Root provider stack ───────────────────────────────────────────────────────
export default function ProviderNavigator() {
  return (
    <RootStack.Navigator screenOptions={STACK_HEADER}>
      <RootStack.Screen name="ProviderTabs" component={ProviderTabs} options={{ headerShown: false }} />

      {/* Job management */}
      <RootStack.Screen name="JobDetails"         component={JobDetailsScreen}          options={{ title: '', headerBackTitle: '' }} />
      <RootStack.Screen name="ActiveTaskDetails"  component={ActiveTaskDetailsScreen}   options={{ title: '', headerBackTitle: '' }} />

      {/* Calendar */}
      <RootStack.Screen name="AvailabilitySettings" component={AvailabilitySettingsScreen} options={{ title: 'Availability', headerBackTitle: '' }} />

      {/* Profile sub-screens */}
      <RootStack.Screen name="TaskerEditBio"      component={TaskerEditBioScreen}       options={{ title: 'Edit Bio',         headerBackTitle: '' }} />
      <RootStack.Screen name="SkillsAndServices"  component={SkillsAndServicesScreen}   options={{ title: 'Skills & Services',headerBackTitle: '' }} />
      <RootStack.Screen name="Portfolio"          component={TaskerPortfolioScreen}     options={{ title: 'Portfolio',        headerBackTitle: '' }} />
      <RootStack.Screen name="Verification"       component={VerificationScreen}        options={{ title: 'Verification',     headerBackTitle: '' }} />
      <RootStack.Screen name="OperatingAreas"     component={OperatingAreasScreen}      options={{ title: 'Service Areas',    headerBackTitle: '' }} />
      <RootStack.Screen name="TaskerBankDetails"  component={TaskerBankDetailsScreen}   options={{ title: 'Bank Details',     headerBackTitle: '' }} />
      <RootStack.Screen name="TaskerEarnings"     component={ProviderEarningsScreen}    options={{ title: 'Earnings',         headerBackTitle: '' }} />
      <RootStack.Screen name="EarningsBreakdown"  component={ProviderEarningsScreen}    options={{ title: 'Earnings Breakdown', headerBackTitle: '' }} />
      <RootStack.Screen name="ProviderSettings"   component={ProviderSettingsScreen}    options={{ title: 'Settings',         headerBackTitle: '' }} />
      <RootStack.Screen name="HelpCenter"         component={HelpCenterScreen}          options={{ title: 'Help Center',      headerBackTitle: '' }} />

      {/* Shared */}
      <RootStack.Screen name="Chat" component={ChatScreen} options={{ title: '', headerBackTitle: '' }} />
    </RootStack.Navigator>
  );
}
