// ─────────────────────────────────────────────────────────────────────────────
//  src/navigation/ClientNavigator.js
//  Client app — 5-tab structure + all stack screens
//
//  Tabs:
//   1. Home       (HomeTab)
//   2. Services   (ServicesTab)
//   3. Plans      (PlansTab)
//   4. Activity   (ActivityTab)
//   5. Profile    (ProfileTab)
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// ── Brand tokens (mirrors src/theme.js so no import-cycle risk) ──────────────
const PRIMARY  = '#1A374D';
const ACCENT   = '#FF7F3F';
const WHITE    = '#FFFFFF';
const BORDER   = '#E2E2E2';
const INACTIVE = '#BCBCBC';
const BG       = '#F1F1F1';

// ── HOME ─────────────────────────────────────────────────────────────────────
import HomeScreen          from '../screens/HomeScreen';
import SearchScreen        from '../screens/SearchScreen';

// ── SERVICES ─────────────────────────────────────────────────────────────────
import ServicesHomeScreen  from '../screens/services/ServicesHomeScreen';
import ServiceCategoryScreen from '../screens/services/ServiceCategoryScreen';
import BookServiceScreen   from '../screens/services/BookServiceScreen';
import EmergencyRequestScreen from '../screens/services/EmergencyRequestScreen';

// ── PLANS ────────────────────────────────────────────────────────────────────
import PlansHomeScreen         from '../screens/plans/PlansHomeScreen';
import PlanDetailsScreen       from '../screens/plans/PlanDetailsScreen';
import ActiveSubscriptionScreen from '../screens/plans/ActiveSubscriptionScreen';
import SubscriptionBenefitsScreen from '../screens/plans/SubscriptionBenefitsScreen';

// ── ACTIVITY ─────────────────────────────────────────────────────────────────
import ActivityHomeScreen          from '../screens/activity/ActivityHomeScreen';
import BookingDetailsScreen        from '../screens/activity/BookingDetailsScreen';
import RecurringServiceDetailsScreen from '../screens/activity/RecurringServiceDetailsScreen';

// ── PROFILE ──────────────────────────────────────────────────────────────────
import ProfileScreen               from '../screens/ProfileScreen';
import AccountSettingsScreen       from '../screens/profile/AccountSettingsScreen';
import SavedAddressesScreen        from '../screens/profile/SavedAddressesScreen';
import PaymentMethodsScreen        from '../screens/profile/PaymentMethodsScreen';
import NotificationSettingsScreen  from '../screens/profile/NotificationSettingsScreen';
import InviteFriendsScreen         from '../screens/profile/InviteFriendsScreen';
import HelpCenterScreen            from '../screens/profile/HelpCenterScreen';
import MyTeamScreen                from '../screens/profile/MyTeamScreen';
import MembershipSummaryScreen     from '../screens/profile/MembershipSummaryScreen';

// ── SPACES ───────────────────────────────────────────────────────────────────
import SpacesListScreen            from '../screens/spaces/SpacesListScreen';
import AddSpaceScreen              from '../screens/spaces/AddSpaceScreen';
import SpaceDetailsScreen          from '../screens/spaces/SpaceDetailsScreen';
import SpaceServiceHistoryScreen   from '../screens/spaces/SpaceServiceHistoryScreen';
import SpaceRecurringServicesScreen from '../screens/spaces/SpaceRecurringServicesScreen';

// ── RECURRING ────────────────────────────────────────────────────────────────
import SetUpRecurringServiceScreen    from '../screens/recurring/SetUpRecurringServiceScreen';
import RecurringScheduleDetailsScreen from '../screens/recurring/RecurringScheduleDetailsScreen';

// ── BOOKING FUNNEL ────────────────────────────────────────────────────────────
import TaskLocationScreen       from '../screens/booking/TaskLocationScreen';
import TaskScopeStepScreen      from '../screens/booking/TaskScopeStepScreen';
import TaskScopeRoomsScreen     from '../screens/booking/TaskScopeRoomsScreen';
import TaskScopeBathsScreen     from '../screens/booking/TaskScopeBathsScreen';
import TaskScopeConditionScreen from '../screens/booking/TaskScopeConditionScreen';
import TaskScopePetsScreen      from '../screens/booking/TaskScopePetsScreen';
import TaskDateTimeScreen       from '../screens/booking/TaskDateTimeScreen';
import TaskLoadingScreen        from '../screens/booking/TaskLoadingScreen';
import TaskerListScreen         from '../screens/booking/TaskerListScreen';
import BookingTaskerProfileScreen from '../screens/booking/TaskerProfileScreen';
import TaskDetailsScreen        from '../screens/booking/TaskDetailsScreen';
import ReviewConfirmScreen      from '../screens/booking/ReviewConfirmScreen';

// ── SHARED ────────────────────────────────────────────────────────────────────
import ChatScreen          from '../screens/chat/ChatScreen';
import ManageTaskScreen    from '../screens/ManageTaskScreen';

// ── Navigator instances ───────────────────────────────────────────────────────
const Tab   = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TAB_ICONS = {
  HomeTab:     ['home', 'home-outline'],
  ServicesTab: ['grid', 'grid-outline'],
  PlansTab:    ['shield-checkmark', 'shield-checkmark-outline'],
  ActivityTab: ['calendar', 'calendar-outline'],
  ProfileTab:  ['person-circle', 'person-circle-outline'],
};

const STACK_HEADER = {
  headerStyle:         { backgroundColor: WHITE },
  headerTintColor:     PRIMARY,
  headerTitleStyle:    { fontWeight: '700', fontSize: 17, color: PRIMARY },
  headerShadowVisible: false,
  contentStyle:        { backgroundColor: BG },
};

// ── Individual tab stacks ─────────────────────────────────────────────────────

function HomeStack() {
  const S = createNativeStackNavigator();
  return (
    <S.Navigator screenOptions={STACK_HEADER}>
      <S.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <S.Screen name="Search" component={SearchScreen}
        options={{ presentation: 'fullScreenModal', headerShown: false, animation: 'fade' }} />
    </S.Navigator>
  );
}

function ServicesStack() {
  const S = createNativeStackNavigator();
  return (
    <S.Navigator screenOptions={STACK_HEADER}>
      <S.Screen name="ServicesHome"    component={ServicesHomeScreen}    options={{ headerShown: false }} />
      <S.Screen name="ServiceCategory" component={ServiceCategoryScreen} options={{ title: '' }} />
      <S.Screen name="BookService"     component={BookServiceScreen}     options={{ title: '', headerBackTitle: '' }} />
      <S.Screen name="EmergencyRequest" component={EmergencyRequestScreen} options={{ title: 'Urgent Help', headerBackTitle: '' }} />
    </S.Navigator>
  );
}

function PlansStack() {
  const S = createNativeStackNavigator();
  return (
    <S.Navigator screenOptions={STACK_HEADER}>
      <S.Screen name="PlansHome"           component={PlansHomeScreen}           options={{ headerShown: false }} />
      <S.Screen name="PlanDetails"         component={PlanDetailsScreen}         options={{ title: '', headerBackTitle: '' }} />
      <S.Screen name="ActiveSubscription"  component={ActiveSubscriptionScreen}  options={{ title: 'My Plan', headerBackTitle: '' }} />
      <S.Screen name="SubscriptionBenefits" component={SubscriptionBenefitsScreen} options={{ title: 'Compare Plans', headerBackTitle: '' }} />
      <S.Screen name="UpgradePlan"         component={PlanDetailsScreen}         options={{ title: 'Upgrade Plan', headerBackTitle: '' }} />
    </S.Navigator>
  );
}

function ActivityStack() {
  const S = createNativeStackNavigator();
  return (
    <S.Navigator screenOptions={STACK_HEADER}>
      <S.Screen name="ActivityHome"             component={ActivityHomeScreen}            options={{ headerShown: false }} />
      <S.Screen name="BookingDetails"           component={BookingDetailsScreen}          options={{ title: 'Booking Details', headerBackTitle: '' }} />
      <S.Screen name="RecurringServiceDetails"  component={RecurringServiceDetailsScreen} options={{ title: 'Recurring Service', headerBackTitle: '' }} />
      <S.Screen name="RecurringScheduleDetails" component={RecurringScheduleDetailsScreen} options={{ title: 'Schedule', headerBackTitle: '' }} />
      <S.Screen name="SetUpRecurringService"    component={SetUpRecurringServiceScreen}   options={{ title: 'Set Recurring', headerBackTitle: '' }} />
      {/* Re-entry points from Activity */}
      <S.Screen name="Chat" component={ChatScreen} options={{ title: '', headerBackTitle: '' }} />
    </S.Navigator>
  );
}

function ProfileStack() {
  const S = createNativeStackNavigator();
  return (
    <S.Navigator screenOptions={STACK_HEADER}>
      <S.Screen name="ProfileHome"           component={ProfileScreen}               options={{ headerShown: false }} />
      <S.Screen name="AccountSettings"       component={AccountSettingsScreen}       options={{ title: 'Account Settings' }} />
      <S.Screen name="SavedAddresses"        component={SavedAddressesScreen}        options={{ title: 'Saved Addresses' }} />
      <S.Screen name="PaymentMethods"        component={PaymentMethodsScreen}        options={{ title: 'Payment Methods' }} />
      <S.Screen name="NotificationSettings"  component={NotificationSettingsScreen}  options={{ title: 'Notifications' }} />
      <S.Screen name="InviteFriends"         component={InviteFriendsScreen}         options={{ title: 'Invite Friends' }} />
      <S.Screen name="HelpCenter"            component={HelpCenterScreen}            options={{ title: 'Help Center' }} />
      <S.Screen name="MyTeam"                component={MyTeamScreen}                options={{ title: 'My Team', headerShown: false }} />
      <S.Screen name="MembershipSummary"     component={MembershipSummaryScreen}     options={{ title: 'Membership' }} />
      {/* Spaces (accessible from Profile) */}
      <S.Screen name="Spaces"                component={SpacesListScreen}            options={{ title: 'My Spaces', headerShown: false }} />
      <S.Screen name="AddSpace"              component={AddSpaceScreen}              options={{ title: 'Add Space', headerBackTitle: '' }} />
      <S.Screen name="SpaceDetails"          component={SpaceDetailsScreen}          options={{ title: '', headerBackTitle: '' }} />
      <S.Screen name="EditSpace"             component={AddSpaceScreen}              options={{ title: 'Edit Space', headerBackTitle: '' }} />
      <S.Screen name="SpaceServiceHistory"   component={SpaceServiceHistoryScreen}   options={{ title: 'Service History', headerBackTitle: '' }} />
      <S.Screen name="SpaceRecurringServices" component={SpaceRecurringServicesScreen} options={{ title: 'Recurring Services', headerBackTitle: '' }} />
      <S.Screen name="SetUpRecurringService" component={SetUpRecurringServiceScreen} options={{ title: 'Set Recurring', headerBackTitle: '' }} />
      <S.Screen name="RecurringServiceDetails" component={RecurringServiceDetailsScreen} options={{ title: 'Recurring Service', headerBackTitle: '' }} />
      <S.Screen name="RecurringScheduleDetails" component={RecurringScheduleDetailsScreen} options={{ title: 'Schedule', headerBackTitle: '' }} />
      <S.Screen name="ActiveSubscription"   component={ActiveSubscriptionScreen}    options={{ title: 'My Plan', headerBackTitle: '' }} />
      <S.Screen name="UpgradePlan"          component={PlanDetailsScreen}           options={{ title: 'Upgrade Plan', headerBackTitle: '' }} />
      <S.Screen name="Plans"                component={PlansHomeScreen}             options={{ title: 'Plans', headerShown: false }} />
    </S.Navigator>
  );
}

// ── Bottom tab navigator ──────────────────────────────────────────────────────
function ClientTabs() {
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
      <Tab.Screen name="HomeTab"     component={HomeStack} />
      <Tab.Screen name="ServicesTab" component={ServicesStack} />
      <Tab.Screen name="PlansTab"    component={PlansStack} />
      <Tab.Screen name="ActivityTab" component={ActivityStack} />
      <Tab.Screen name="ProfileTab"  component={ProfileStack} />
    </Tab.Navigator>
  );
}

// ── Root client stack (tabs + booking funnel + global modals) ─────────────────
export default function ClientNavigator() {
  return (
    <Stack.Navigator screenOptions={STACK_HEADER}>
      <Stack.Screen name="ClientTabs" component={ClientTabs} options={{ headerShown: false }} />

      {/* Global booking funnel (launched from Home, Services, SpaceDetails, etc.) */}
      <Stack.Screen name="TaskLocation"      component={TaskLocationScreen}   options={{ title: "Where's the job?" }} />
      <Stack.Screen name="TaskScopeRooms"    component={TaskScopeRoomsScreen} options={{ title: '', headerBackTitle: '' }} />
      <Stack.Screen name="TaskScopeBaths"    component={TaskScopeBathsScreen} options={{ title: '', headerBackTitle: '' }} />
      <Stack.Screen name="TaskScopeCondition" component={TaskScopeConditionScreen} options={{ title: '', headerBackTitle: '' }} />
      <Stack.Screen name="TaskScopePets"     component={TaskScopePetsScreen}  options={{ title: '', headerBackTitle: '' }} />
      <Stack.Screen name="TaskScopeStep"     component={TaskScopeStepScreen}  options={{ title: '', headerBackTitle: '' }} />
      <Stack.Screen name="TaskDateTime"      component={TaskDateTimeScreen}   options={{ title: '', headerShown: false }} />
      <Stack.Screen name="TaskLoading"       component={TaskLoadingScreen}    options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="TaskerList"        component={TaskerListScreen}     options={{ title: 'Select a Provider' }} />
      <Stack.Screen name="TaskerProfile"     component={BookingTaskerProfileScreen} options={{ title: '', headerBackTitle: '' }} />
      <Stack.Screen name="TaskDetails"       component={TaskDetailsScreen}    options={{ title: 'Task Details' }} />
      <Stack.Screen name="ReviewConfirm"     component={ReviewConfirmScreen}  options={{ title: 'Review & Confirm' }} />

      {/* Global modals */}
      <Stack.Screen name="ManageTask" component={ManageTaskScreen} options={{ title: 'Manage Task' }} />
      <Stack.Screen name="Chat"       component={ChatScreen}       options={{ title: '', headerBackTitle: '' }} />
      <Stack.Screen name="Search"     component={SearchScreen}     options={{ presentation: 'fullScreenModal', headerShown: false, animation: 'fade' }} />
    </Stack.Navigator>
  );
}
