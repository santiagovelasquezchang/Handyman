// ─────────────────────────────────────────────────────────────────────────────
//  src/theme.js  –  Single source of truth for all design tokens
// ─────────────────────────────────────────────────────────────────────────────

export const COLORS = {
  primary:       '#007A5E',
  primaryLight:  '#E6F4F0',
  primaryDark:   '#005C46',
  white:         '#FFFFFF',
  background:    '#F8F8F8',
  surface:       '#F2F2F2',
  border:        '#E8E8E8',
  borderStrong:  '#D0D0D0',
  textPrimary:   '#1A1A1A',
  textSecondary: '#6B6B6B',
  textDisabled:  '#BCBCBC',
  tabBar:        '#FFFFFF',
  inactive:      '#BCBCBC',
  error:         '#E53E3E',
  star:          '#F6C90E',
  eliteBg:       '#007A5E',
  eliteText:     '#FFFFFF',
  overlay:       'rgba(0,0,0,0.45)',
};

export const FONTS = {
  regular:  '400',
  medium:   '500',
  semibold: '600',
  bold:     '700',
};

export const RADIUS = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   22,
  pill: 100,
};

export const SHADOW = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  bar: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 4,
  },
};
