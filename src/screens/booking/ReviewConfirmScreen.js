// ─────────────────────────────────────────────────────────────────────────────
//  src/screens/booking/ReviewConfirmScreen.js  –  Review & Confirm
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  FREQUENCY_OPTIONS,
  FREQUENCY_DISCOUNTS,
  TRUST_AND_SUPPORT_FEE,
} from '../../../mockData';
import { COLORS, FONTS, RADIUS, SHADOW } from '../../theme';

// ── Helpers ───────────────────────────────────────────────────────────────────
const calcRate = (baseRate, freqKey) =>
  baseRate * (1 - (FREQUENCY_DISCOUNTS[freqKey] ?? 0));

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, children, noPad }) {
  return (
    <View style={[styles.section, noPad && { paddingHorizontal: 0 }]}>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
      {children}
    </View>
  );
}

function SectionDivider() {
  return <View style={styles.sectionDivider} />;
}

// ── Tasker summary card ───────────────────────────────────────────────────────
function TaskerSummaryCard({ tasker, category, selectedDate, selectedTime, address }) {
  return (
    <View style={styles.taskerCard}>
      <View style={styles.taskerCardTop}>
        <Image source={{ uri: tasker?.avatar }} style={styles.taskerAvatar} />
        <View style={styles.taskerMeta}>
          <Text style={styles.taskerName}>{tasker?.name}</Text>
          <View style={styles.taskerStars}>
            <Ionicons name="star" size={12} color={COLORS.star} />
            <Text style={styles.taskerRating}> {tasker?.rating}</Text>
            <Text style={styles.taskerReviews}> ({tasker?.reviewCount})</Text>
          </View>
          <Text style={styles.taskerCategory}>{category?.name}</Text>
        </View>
      </View>

      <View style={styles.taskerDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={14} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>
            {selectedDate}{selectedTime ? `  ·  ${selectedTime}` : ''}
          </Text>
        </View>
        {address?.street ? (
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={14} color={COLORS.textSecondary} />
            <Text style={styles.detailText} numberOfLines={1}>{address.street}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

// ── Frequency option ──────────────────────────────────────────────────────────
function FrequencyOption({ option, selected, onPress, discountedRate }) {
  return (
    <TouchableOpacity
      style={[styles.freqRow, selected && styles.freqRowSelected]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Radio */}
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>

      {/* Label */}
      <Text style={[styles.freqLabel, selected && styles.freqLabelSelected]}>
        {option.label}
      </Text>

      {/* Save badge */}
      {option.badge ? (
        <View style={styles.saveBadge}>
          <Text style={styles.saveBadgeText}>{option.badge}</Text>
        </View>
      ) : null}

      {/* Rate for selected */}
      {selected && (
        <Text style={styles.freqRate}>${discountedRate.toFixed(2)}/hr</Text>
      )}
    </TouchableOpacity>
  );
}

// ── Tap row (Payment / Promos) ────────────────────────────────────────────────
function TapRow({ icon, label, value, onPress }) {
  return (
    <TouchableOpacity style={styles.tapRow} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.tapRowLeft}>
        <Ionicons name={icon} size={18} color={COLORS.textSecondary} />
        <Text style={styles.tapRowLabel}>{label}</Text>
      </View>
      <View style={styles.tapRowRight}>
        <Text style={styles.tapRowValue}>{value}</Text>
        <Ionicons name="chevron-forward" size={16} color={COLORS.inactive} />
      </View>
    </TouchableOpacity>
  );
}

// ── Price row ─────────────────────────────────────────────────────────────────
function PriceRow({ label, value, original, isTotal }) {
  return (
    <View style={[styles.priceRow, isTotal && styles.priceTotalRow]}>
      <Text style={[styles.priceLabel, isTotal && styles.priceTotalLabel]}>{label}</Text>
      <View style={styles.priceRight}>
        {original ? (
          <Text style={styles.priceOriginal}>${original.toFixed(2)}/hr</Text>
        ) : null}
        <Text style={[styles.priceValue, isTotal && styles.priceTotalValue]}>{value}</Text>
      </View>
    </View>
  );
}

// ── Success overlay ───────────────────────────────────────────────────────────
function SuccessOverlay({ visible, tasker, selectedDate, selectedTime, onGoHome }) {
  const scale = useRef(new Animated.Value(0)).current;
  const fade  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fade, {
          toValue: 1, duration: 300, useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1, friction: 6, tension: 90, useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Animated.View style={[styles.successOverlay, { opacity: fade }]}>
        <View style={styles.successCard}>
          {/* Animated check circle */}
          <Animated.View style={[styles.checkCircleWrap, { transform: [{ scale }] }]}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={42} color={COLORS.white} />
            </View>
          </Animated.View>

          <Text style={styles.successTitle}>You're all set!</Text>
          <Text style={styles.successSub}>
            <Text style={{ fontWeight: FONTS.bold }}>{tasker?.name}</Text>
            {' '}is confirmed{'\n'}
            {selectedDate === 'Right Now' ? (
              <Text style={{ fontWeight: FONTS.bold }}>Right Now (ASAP)</Text>
            ) : (
              <>
                <Text>{'for '}</Text>
                <Text style={{ fontWeight: FONTS.bold }}>{selectedDate}</Text>
                {selectedTime ? (
                  <>
                    <Text>{' at '}</Text>
                    <Text style={{ fontWeight: FONTS.bold }}>{selectedTime}</Text>
                  </>
                ) : null}
              </>
            )}
          </Text>

          <Text style={styles.successNote}>
            You'll receive a confirmation on your registered contact.
          </Text>

          <TouchableOpacity
            style={styles.homeBtn}
            onPress={onGoHome}
            activeOpacity={0.85}
          >
            <Text style={styles.homeBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function ReviewConfirmScreen({ navigation, route }) {
  const {
    category,
    selectedDate,
    selectedTime,
    tasker,
    address,
    instructions,
    rooms,
    baths,
  } = route.params ?? {};

  const insets = useSafeAreaInsets();
  const [frequency, setFrequency] = useState('once');
  const [confirmed, setConfirmed] = useState(false);

  const baseRate      = tasker?.hourlyRate ?? 0;
  const discount      = FREQUENCY_DISCOUNTS[frequency] ?? 0;
  const discountedRate = calcRate(baseRate, frequency);
  const total         = discountedRate + TRUST_AND_SUPPORT_FEE;

  const handleConfirm = () => setConfirmed(true);

  const handleGoHome = () => {
    // Reset the root ClientNavigator stack to ClientTabs (clears booking funnel history),
    // then jump to the HomeTab so the user lands on the Home screen.
    navigation.reset({
      index: 0,
      routes: [{ name: 'ClientTabs', params: { screen: 'HomeTab' } }],
    });
  };

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ── Tasker summary ── */}
        <View style={{ padding: 16 }}>
          <TaskerSummaryCard
            tasker={tasker}
            category={category}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            address={address}
          />
        </View>

        <SectionDivider />

        {/* ── Frequency ── */}
        <Section title="Frequency">
          {FREQUENCY_OPTIONS.map((opt) => (
            <FrequencyOption
              key={opt.key}
              option={opt}
              selected={frequency === opt.key}
              onPress={() => setFrequency(opt.key)}
              discountedRate={calcRate(baseRate, opt.key)}
            />
          ))}
        </Section>

        <SectionDivider />

        {/* ── Payment + Promos ── */}
        <Section>
          <TapRow
            icon="card-outline"
            label="Payment"
            value="Add payment method"
            onPress={() => {}}
          />
          <View style={styles.inlineDivider} />
          <TapRow
            icon="pricetag-outline"
            label="Promos"
            value="Add code"
            onPress={() => {}}
          />
        </Section>

        <SectionDivider />

        {/* ── Price Details ── */}
        <Section title="Price Details">
          <PriceRow
            label="Hourly Rate"
            original={discount > 0 ? baseRate : null}
            value={`$${discountedRate.toFixed(2)}/hr`}
          />
          {discount > 0 && (
            <View style={styles.discountNote}>
              <Ionicons name="checkmark-circle" size={13} color={COLORS.primary} />
              <Text style={styles.discountNoteText}>
                {(discount * 100).toFixed(0)}% frequency discount applied
              </Text>
            </View>
          )}
          <PriceRow
            label="Trust & Support Fee"
            value={`$${TRUST_AND_SUPPORT_FEE.toFixed(2)}`}
          />
          <View style={styles.priceSeparator} />
          <PriceRow
            label="Total Rate"
            value={`$${total.toFixed(2)}/hr`}
            isTotal
          />

          {/* Booking summary chips */}
          {(rooms || baths) && (
            <View style={styles.scopeChips}>
              {rooms  && <View style={styles.scopeChip}><Text style={styles.scopeChipText}>{rooms}</Text></View>}
              {baths  && <View style={styles.scopeChip}><Text style={styles.scopeChipText}>{baths}</Text></View>}
            </View>
          )}

          <Text style={styles.priceNote}>
            * The total rate is an estimate. Final invoice is based on actual hours worked.
          </Text>

          {/* Instructions preview */}
          {instructions?.trim().length > 0 && (
            <View style={styles.instructionsBox}>
              <Text style={styles.instructionsLabel}>Your instructions</Text>
              <Text style={styles.instructionsText}>{instructions}</Text>
            </View>
          )}
        </Section>
      </ScrollView>

      {/* ── Fixed bottom bar ── */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>
            ${total.toFixed(2)}
            <Text style={styles.totalUnit}>/hr</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={handleConfirm}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmBtnText}>Confirm</Text>
        </TouchableOpacity>
      </View>

      {/* ── Success overlay ── */}
      <SuccessOverlay
        visible={confirmed}
        tasker={tasker}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onGoHome={handleGoHome}
      />
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  sectionDivider: {
    height: 8,
    backgroundColor: COLORS.background,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 14,
  },

  // Tasker card
  taskerCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  taskerCardTop: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  taskerAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.border,
  },
  taskerMeta: {
    flex: 1,
    gap: 3,
  },
  taskerName: {
    fontSize: 16,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  taskerStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskerRating: {
    fontSize: 13,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  taskerReviews: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  taskerCategory: {
    fontSize: 12,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
  },
  taskerDetails: {
    gap: 6,
    paddingTop: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    flex: 1,
  },

  // Frequency
  freqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: 10,
    gap: 10,
  },
  freqRowSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: COLORS.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  freqLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: FONTS.semibold,
    color: COLORS.textPrimary,
  },
  freqLabelSelected: {
    color: COLORS.primary,
  },
  saveBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  saveBadgeText: {
    fontSize: 11,
    fontWeight: FONTS.bold,
    color: COLORS.white,
  },
  freqRate: {
    fontSize: 13,
    fontWeight: FONTS.bold,
    color: COLORS.primary,
  },

  // Tap rows
  tapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  tapRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tapRowLabel: {
    fontSize: 14,
    fontWeight: FONTS.semibold,
    color: COLORS.textPrimary,
  },
  tapRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tapRowValue: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  inlineDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
  },

  // Price rows
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
  },
  priceTotalRow: {
    paddingVertical: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: FONTS.medium,
  },
  priceTotalLabel: {
    fontSize: 15,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  priceRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  priceOriginal: {
    fontSize: 12,
    color: COLORS.inactive,
    textDecorationLine: 'line-through',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: FONTS.semibold,
    color: COLORS.textPrimary,
  },
  priceTotalValue: {
    fontSize: 17,
    fontWeight: FONTS.bold,
    color: COLORS.primary,
  },
  priceSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  discountNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  discountNoteText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: FONTS.medium,
  },
  scopeChips: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    flexWrap: 'wrap',
  },
  scopeChip: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  scopeChipText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  priceNote: {
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 16,
    marginTop: 14,
  },
  instructionsBox: {
    marginTop: 14,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  instructionsLabel: {
    fontSize: 11,
    fontWeight: FONTS.semibold,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 5,
  },
  instructionsText: {
    fontSize: 13,
    color: COLORS.textPrimary,
    lineHeight: 19,
  },

  // Bottom bar
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
    ...SHADOW.bar,
  },
  totalLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
  },
  totalUnit: {
    fontSize: 13,
    fontWeight: FONTS.regular,
    color: COLORS.textSecondary,
  },
  confirmBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  confirmBtnText: {
    fontSize: 16,
    fontWeight: FONTS.bold,
    color: COLORS.white,
    letterSpacing: 0.3,
  },

  // Success overlay
  successOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  successCard: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 36,
    width: '100%',
    alignItems: 'center',
    gap: 12,
    ...SHADOW.card,
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 10,
  },
  checkCircleWrap: {
    marginBottom: 8,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  successSub: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 23,
  },
  successNote: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 4,
  },
  homeBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    height: 52,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  homeBtnText: {
    fontSize: 16,
    fontWeight: FONTS.bold,
    color: COLORS.white,
    letterSpacing: 0.3,
  },
});
