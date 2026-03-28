// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/booking/TaskLoadingScreen.js  –  "Finding Taskers…"
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { COLORS, FONTS } from '../../theme';

// Steps that cycle on screen while waiting
const COPY_STEPS = [
  'Checking availability…',
  'Matching your preferences…',
  'Finding the best Taskers…',
  'Almost ready!',
];

export default function TaskLoadingScreen({ navigation, route }) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.88)).current;
  const stepIndex = useRef(0);
  const stepText  = useRef(new Animated.Value(1)).current;
  const [displayStep, setDisplayStep] = React.useState(COPY_STEPS[0]);

  // Entrance animation
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Cycle through copy steps
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(stepText, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        stepIndex.current = (stepIndex.current + 1) % COPY_STEPS.length;
        setDisplayStep(COPY_STEPS[stepIndex.current]);
        Animated.timing(stepText, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Navigate after 2.8s — replace so back button skips the loader
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('TaskerList', route.params);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.root}>
      <Animated.View
        style={[
          styles.card,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        {/* Spinner */}
        <View style={styles.spinnerWrap}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>

        {/* Headline */}
        <Text style={styles.headline}>Finding Taskers</Text>

        {/* Cycling sub-text */}
        <Animated.Text style={[styles.step, { opacity: stepText }]}>
          {displayStep}
        </Animated.Text>

        {/* Context summary */}
        {route.params?.category?.name ? (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{route.params.category.name}</Text>
          </View>
        ) : null}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  card: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 40,
    width: '100%',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  spinnerWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  headline: {
    fontSize: 20,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  step: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  chip: {
    marginTop: 8,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  chipText: {
    fontSize: 12,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
  },
});
