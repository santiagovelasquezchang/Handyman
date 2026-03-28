// ─────────────────────────────────────────────────────────────────────────────
//  src/components/TopTabs.js  –  Animated sliding-indicator tab switcher
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { COLORS, FONTS } from '../theme';

/**
 * @param {Array}    tabs     – [{ key: string, label: string }]
 * @param {string}   active   – key of the active tab
 * @param {Function} onChange – called with the new key on press
 */
export default function TopTabs({ tabs, active, onChange }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const indicatorPos = useRef(new Animated.Value(0)).current;
  const tabWidth     = containerWidth > 0 ? containerWidth / tabs.length : 0;

  // Set position instantly on first layout, animate on subsequent changes
  const handleLayout = (e) => {
    const w = e.nativeEvent.layout.width;
    setContainerWidth(w);
    const idx = tabs.findIndex((t) => t.key === active);
    indicatorPos.setValue(idx * (w / tabs.length));
  };

  useEffect(() => {
    if (containerWidth === 0) return;
    const idx = tabs.findIndex((t) => t.key === active);
    Animated.spring(indicatorPos, {
      toValue: idx * tabWidth,
      friction: 9,
      tension: 90,
      useNativeDriver: true,
    }).start();
  }, [active, containerWidth]);

  return (
    <View
      style={styles.container}
      onLayout={handleLayout}
    >
      {/* Tabs */}
      {tabs.map(({ key, label }) => {
        const isActive = active === key;
        return (
          <TouchableOpacity
            key={key}
            style={styles.tab}
            onPress={() => onChange(key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Animated underline indicator */}
      {tabWidth > 0 && (
        <Animated.View
          style={[
            styles.indicator,
            {
              width:     tabWidth,
              transform: [{ translateX: indicatorPos }],
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: FONTS.semibold,
    color: COLORS.textSecondary,
  },
  labelActive: {
    color: COLORS.primary,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2.5,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
});
