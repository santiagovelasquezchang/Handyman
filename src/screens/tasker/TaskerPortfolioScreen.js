// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/tasker/TaskerPortfolioScreen.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, Alert, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

const SCREEN_W = Dimensions.get('window').width;
const TILE_SIZE = (SCREEN_W - 16 * 2 - 10) / 3;

const MOCK_PHOTOS = Array.from({ length: 8 }, (_, i) => ({
  id: `p${i + 1}`,
  uri: `https://picsum.photos/seed/portfolio${i + 1}/300/300`,
  label: ['Electrical panel', 'TV mounted', 'Clean bathroom', 'Painted wall',
          'Sink install', 'Fan install', 'Door repair', 'Deck built'][i],
}));

export default function TaskerPortfolioScreen() {
  const insets = useSafeAreaInsets();
  const [photos, setPhotos] = useState(MOCK_PHOTOS);

  const handleDelete = (id) => {
    Alert.alert('Remove Photo', 'Remove this photo from your portfolio?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () =>
          setPhotos((prev) => prev.filter((p) => p.id !== id)) },
    ]);
  };

  const handleUpload = () => Alert.alert('Upload Photo', 'Photo library would open here.');

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.hint}>
          Showcase your best work. Great photos help you win more bookings.
        </Text>

        {/* Photo grid */}
        <View style={styles.grid}>
          {photos.map((photo) => (
            <View key={photo.id} style={styles.tile}>
              <Image source={{ uri: photo.uri }} style={styles.tileImage} resizeMode="cover" />
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleDelete(photo.id)}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              >
                <Ionicons name="close-circle" size={20} color={COLORS.white} />
              </TouchableOpacity>
              <View style={styles.tileLabel}>
                <Text style={styles.tileLabelText} numberOfLines={1}>{photo.label}</Text>
              </View>
            </View>
          ))}

          {/* Upload tile */}
          <TouchableOpacity style={styles.uploadTile} onPress={handleUpload} activeOpacity={0.75}>
            <Ionicons name="add" size={28} color={COLORS.accent} />
            <Text style={styles.uploadText}>Upload Photo</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.countNote}>{photos.length} photos · Up to 20 allowed</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F9FA' },
  scroll: { padding: 16 },

  hint: {
    fontFamily: FONTS.family,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    backgroundColor: COLORS.border,
    ...SHADOW.card,
  },
  tileImage: {
    width: '100%',
    height: '100%',
  },
  deleteBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  tileLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  tileLabelText: {
    fontFamily: FONTS.familySemibold,
    fontSize: 9,
    color: COLORS.white,
  },

  uploadTile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: COLORS.accentLight,
  },
  uploadText: {
    fontFamily: FONTS.familySemibold,
    fontSize: 11,
    color: COLORS.accent,
  },

  countNote: {
    fontFamily: FONTS.family,
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
});
