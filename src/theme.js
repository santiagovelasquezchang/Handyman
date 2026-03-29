// ─────────────────────────────────────────────────────────────────────────────
//  src/theme.js  –  Single source of truth for all design tokens
//  Palette: Navy (#1A374D) + Orange (#FF7F3F) + Light Grey (#F1F1F1)
// ─────────────────────────────────────────────────────────────────────────────

export const COLORS = {
  // ── Brand ──────────────────────────────────────────────────────────────────
  primary:       '#1A374D',   // Navy – headers, nav, active icons, labels
  primaryLight:  '#E8EFF4',   // Tinted navy bg for chips / badges
  primaryDark:   '#0F2233',   // Pressed / darker navy
  accent:        '#FF7F3F',   // Orange – CTAs, active states, logo, stars
  accentLight:   '#FFF0E8',   // Tinted orange bg
  accentDark:    '#E5621A',   // Pressed orange

  // ── Neutrals ───────────────────────────────────────────────────────────────
  white:         '#FFFFFF',   // Cards, form inputs, content containers
  background:    '#F1F1F1',   // Main interface background (light grey)
  surface:       '#E8E8E8',   // Slightly darker surface / dividers
  border:        '#E2E2E2',   // Default borders
  borderStrong:  '#C8C8C8',   // Focused / emphasis borders

  // ── Text ───────────────────────────────────────────────────────────────────
  textPrimary:   '#1A374D',   // Main body text = Navy
  textSecondary: '#5A7080',   // Secondary / meta text
  textDisabled:  '#BCBCBC',   // Placeholder / disabled
  textOnAccent:  '#FFFFFF',   // Text on orange buttons
  textOnPrimary: '#FFFFFF',   // Text on navy surfaces

  // ── Tab bar ────────────────────────────────────────────────────────────────
  tabBar:        '#FFFFFF',
  inactive:      '#BCBCBC',

  // ── Semantic ───────────────────────────────────────────────────────────────
  error:         '#E53E3E',
  success:       '#2E8B57',
  star:          '#FF7F3F',   // Stars use orange to match accent
  eliteBg:       '#1A374D',   // Elite badge = Navy
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
