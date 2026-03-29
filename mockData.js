// ─────────────────────────────────────────────────────────────────────────────
//  mockData.js  –  All static data for the Handyman app (Venezuelan market)
//  No network calls, no database. Import what you need in each screen.
// ─────────────────────────────────────────────────────────────────────────────

// ── IMAGE HELPERS ─────────────────────────────────────────────────────────────
// All images use stable Picsum seeds so they look consistent every reload.
const pic = (seed, w = 400, h = 400) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// pravatar gives consistent square avatar photos by numeric ID (1-70).
const avatar = (n) => `https://i.pravatar.cc/150?img=${n}`;

// ── SERVICE CATEGORIES ────────────────────────────────────────────────────────
// Each category owns its dynamic funnel steps via `scoping_details`.
// The booking funnel renders each step generically from these definitions.
//
// Step types:
//   'button_select'  – pill/chip button row (single select)
//   'card_select'    – larger tappable cards (single select)
//
// Steps start at 2 (Step 1 = Location is always first).
// Step 5 (Finding Taskers loading screen) is always injected automatically.
// ─────────────────────────────────────────────────────────────────────────────
export const CATEGORIES = [
  // ── 01 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c1',
    name: 'TV Mounting',
    icon: 'tv-outline',
    image: pic('tvmount', 300, 300),
    baseRate: 35,
    scoping_details: [
      {
        step: 2,
        title: 'What size is the TV?',
        key: 'screen_size',
        type: 'button_select',
        options: ['Under 40"', '40" – 55"', '55" – 65"', '65" – 75"', '75"+'],
      },
      {
        step: 3,
        title: 'What type of wall?',
        key: 'wall_type',
        type: 'card_select',
        options: ['Drywall', 'Concrete / Block', 'Brick', 'Not sure'],
      },
      {
        step: 4,
        title: 'Do you already have the wall mount?',
        key: 'has_mount',
        type: 'button_select',
        options: ['Yes, I have it', 'No, I need one'],
      },
    ],
  },

  // ── 02 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c2',
    name: 'Cleaning',
    icon: 'sparkles-outline',
    image: pic('cleaning', 300, 300),
    baseRate: 22,
    scoping_details: [
      {
        step: 2,
        title: 'How many rooms need cleaning?',
        key: 'room_count',
        type: 'button_select',
        options: ['Studio', '1 room', '2 rooms', '3 rooms', '4+ rooms'],
      },
      {
        step: 3,
        title: 'How many bathrooms?',
        key: 'bath_count',
        type: 'button_select',
        options: ['None', '1 bathroom', '2 bathrooms', '3 bathrooms', '4+'],
      },
      {
        step: 4,
        title: 'What condition is the space in?',
        key: 'condition',
        type: 'card_select',
        options: ['Cleaned regularly', 'Needs a deep clean', 'Post-move / Post-construction'],
      },
      {
        step: 4.5,
        title: 'Are there any pets in the home?',
        key: 'pets',
        type: 'button_select',
        options: ['No pets', 'Dogs', 'Cats', 'Dogs & Cats'],
      },
    ],
  },

  // ── 03 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c3',
    name: 'Interior Painting',
    icon: 'color-palette-outline',
    image: pic('intpaint', 300, 300),
    baseRate: 25,
    scoping_details: [
      {
        step: 2,
        title: 'What do you need painted?',
        key: 'paint_scope',
        type: 'card_select',
        options: ['Full room(s)', 'Accent wall', 'Ceiling only', 'Trim / Baseboards', 'Touch-ups'],
      },
      {
        step: 3,
        title: 'How many rooms?',
        key: 'room_count',
        type: 'button_select',
        options: ['1 room', '2 rooms', '3 rooms', '4+ rooms'],
      },
      {
        step: 4,
        title: 'Do you have the paint already?',
        key: 'has_paint',
        type: 'button_select',
        options: ['Yes, I have paint', 'No, I need paint sourced'],
      },
    ],
  },

  // ── 04 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c4',
    name: 'Drywall Repair',
    icon: 'construct-outline',
    image: pic('drywall', 300, 300),
    baseRate: 30,
    scoping_details: [
      {
        step: 2,
        title: 'What size is the damage?',
        key: 'damage_size',
        type: 'card_select',
        options: ['Small holes (nail/screw)', 'Medium (door-handle size)', 'Large (fist+)', 'Full section replacement'],
      },
      {
        step: 3,
        title: 'How many areas need repair?',
        key: 'area_count',
        type: 'button_select',
        options: ['1', '2 – 3', '4 – 6', '7+'],
      },
      {
        step: 4,
        title: 'Do you need painting after the repair?',
        key: 'needs_paint',
        type: 'button_select',
        options: ['Yes, include paint match', 'No, just the repair'],
      },
    ],
  },

  // ── 05 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c5',
    name: 'Flat Rate Moving',
    icon: 'home-outline',
    image: pic('flatmove', 300, 300),
    baseRate: 120,
    scoping_details: [
      {
        step: 2,
        title: "How big is the space you're moving from?",
        key: 'inventory_size',
        type: 'card_select',
        options: ['Studio / Room', '1-Bedroom', '2-Bedroom', '3-Bedroom', '4+ Bedrooms'],
      },
      {
        step: 3,
        title: 'Stairs or elevator access?',
        key: 'access_type',
        type: 'button_select',
        options: ['Ground floor', 'Elevator', 'Stairs (up to 2 floors)', 'Stairs (3+ floors)'],
      },
      {
        step: 4,
        title: 'Do you need a truck / van?',
        key: 'truck_needed',
        type: 'button_select',
        options: ['Yes, include a truck', 'No, I have transport'],
      },
    ],
  },

  // ── 06 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c6',
    name: 'Help Moving',
    icon: 'cube-outline',
    image: pic('helpmove', 300, 300),
    baseRate: 28,
    scoping_details: [
      {
        step: 2,
        title: 'What do you need help moving?',
        key: 'move_type',
        type: 'card_select',
        options: ['A few items', 'Several boxes', 'Furniture only', 'Full apartment contents'],
      },
      {
        step: 3,
        title: 'How many helpers do you need?',
        key: 'helper_count',
        type: 'button_select',
        options: ['1 person', '2 people', '3 people', '4+ people'],
      },
      {
        step: 4,
        title: 'Stairs or elevator access?',
        key: 'access_type',
        type: 'button_select',
        options: ['Ground floor', 'Elevator available', 'Stairs only'],
      },
    ],
  },

  // ── 07 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c7',
    name: 'Lifting Heavy Items',
    icon: 'barbell-outline',
    image: pic('heavylift', 300, 300),
    baseRate: 22,
    scoping_details: [
      {
        step: 2,
        title: 'What needs to be lifted or moved?',
        key: 'item_type',
        type: 'card_select',
        options: ['Appliance (fridge, washer)', 'Large furniture', 'Piano / Safe', 'Gym equipment', 'Other heavy item'],
      },
      {
        step: 3,
        title: 'How many items?',
        key: 'item_count',
        type: 'button_select',
        options: ['1 item', '2 items', '3 items', '4+ items'],
      },
      {
        step: 4,
        title: 'Same space or different address?',
        key: 'move_scope',
        type: 'button_select',
        options: ['Same room / building', 'Different address'],
      },
    ],
  },

  // ── 08 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c8',
    name: 'Door/Cabinet Repair',
    icon: 'grid-outline',
    image: pic('doorrep', 300, 300),
    baseRate: 30,
    scoping_details: [
      {
        step: 2,
        title: 'What needs repair?',
        key: 'repair_type',
        type: 'card_select',
        options: ['Interior door', 'Exterior door', 'Cabinet door(s)', 'Drawer(s)', 'Hinges / Hardware only'],
      },
      {
        step: 3,
        title: "What's the issue?",
        key: 'issue',
        type: 'button_select',
        options: ["Won't close properly", 'Broken hinge', 'Damaged frame', 'Stuck / jammed', 'Cosmetic damage'],
      },
      {
        step: 4,
        title: 'How many doors / cabinets?',
        key: 'item_count',
        type: 'button_select',
        options: ['1', '2 – 3', '4 – 6', '7+'],
      },
    ],
  },

  // ── 09 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c9',
    name: 'Electrical Help',
    icon: 'flash-outline',
    image: pic('electrical', 300, 300),
    baseRate: 45,
    scoping_details: [
      {
        step: 2,
        title: 'What type of electrical work?',
        key: 'electrical_type',
        type: 'card_select',
        options: ['Outlet / Switch install', 'Light fixture install', 'Circuit breaker issue', 'Electrical panel work', 'Generator / UPS wiring', 'General troubleshooting'],
      },
      {
        step: 3,
        title: 'How many units / fixtures?',
        key: 'unit_count',
        type: 'button_select',
        options: ['1', '2 – 4', '5 – 8', '9+'],
      },
      {
        step: 4,
        title: 'Do you have the parts / fixtures?',
        key: 'has_parts',
        type: 'button_select',
        options: ['Yes, I have everything', 'No, I need parts sourced'],
      },
    ],
  },

  // ── 10 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c10',
    name: 'Plumbing',
    icon: 'water-outline',
    image: pic('plumbing', 300, 300),
    baseRate: 40,
    scoping_details: [
      {
        step: 2,
        title: 'What type of plumbing work?',
        key: 'plumbing_type',
        type: 'card_select',
        options: ['Leaky faucet / pipe', 'Toilet repair', 'Drain unclogging', 'Water heater', 'Pipe installation', 'General inspection'],
      },
      {
        step: 3,
        title: 'Where is the issue?',
        key: 'location_type',
        type: 'button_select',
        options: ['Kitchen', 'Bathroom', 'Laundry area', 'Outdoor / Terrace', 'Multiple areas'],
      },
      {
        step: 4,
        title: 'Is this an emergency?',
        key: 'urgency',
        type: 'button_select',
        options: ['Yes – active leak', 'No – can schedule'],
      },
    ],
  },

  // ── 11 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c11',
    name: 'Window/Blind Repair',
    icon: 'sunny-outline',
    image: pic('windows', 300, 300),
    baseRate: 28,
    scoping_details: [
      {
        step: 2,
        title: 'What needs attention?',
        key: 'repair_type',
        type: 'card_select',
        options: ["Window won't open/close", 'Broken glass', 'Blind installation', 'Blind cord / mechanism', 'Screen repair / replace'],
      },
      {
        step: 3,
        title: 'How many windows or blinds?',
        key: 'item_count',
        type: 'button_select',
        options: ['1', '2 – 3', '4 – 6', '7+'],
      },
      {
        step: 4,
        title: 'Do you have the replacement parts?',
        key: 'has_parts',
        type: 'button_select',
        options: ['Yes, I have them', 'No, please bring materials'],
      },
    ],
  },

  // ── 12 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c12',
    name: 'Light Carpentry',
    icon: 'hammer-outline',
    image: pic('carpentry', 300, 300),
    baseRate: 32,
    scoping_details: [
      {
        step: 2,
        title: 'What type of carpentry work?',
        key: 'carpentry_type',
        type: 'card_select',
        options: ['Shelf installation', 'Furniture assembly / repair', 'Custom storage', 'Crown / base molding', 'Wood trim / paneling'],
      },
      {
        step: 3,
        title: 'Approximate scope?',
        key: 'scope_size',
        type: 'button_select',
        options: ['Small (1 – 2 items)', 'Medium (3 – 5 items)', 'Large (6+ items / full room)'],
      },
      {
        step: 4,
        title: 'Do you have the materials?',
        key: 'has_materials',
        type: 'button_select',
        options: ['Yes, I have all materials', 'No, please source materials'],
      },
    ],
  },

  // ── 13 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c13',
    name: 'Floor/Tile Help',
    icon: 'apps-outline',
    image: pic('floortile', 300, 300),
    baseRate: 35,
    scoping_details: [
      {
        step: 2,
        title: 'What type of flooring work?',
        key: 'floor_type',
        type: 'card_select',
        options: ['Ceramic / Porcelain tile', 'Vinyl / Laminate', 'Hardwood repair', 'Grout repair', 'Tile removal'],
      },
      {
        step: 3,
        title: 'Approximate area size?',
        key: 'area_size',
        type: 'button_select',
        options: ['< 10 m²', '10 – 25 m²', '25 – 50 m²', '50 m²+'],
      },
      {
        step: 4,
        title: 'Do you have the tiles / materials?',
        key: 'has_materials',
        type: 'button_select',
        options: ['Yes, I have them', 'No, please source materials'],
      },
    ],
  },

  // ── 14 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c14',
    name: 'Yard Work',
    icon: 'leaf-outline',
    image: pic('yardwork', 300, 300),
    baseRate: 20,
    scoping_details: [
      {
        step: 2,
        title: 'What yard services do you need?',
        key: 'yard_type',
        type: 'card_select',
        options: ['Lawn mowing', 'Tree / hedge trimming', 'Garden cleanup', 'Leaf / debris removal', 'Planting / landscaping'],
      },
      {
        step: 3,
        title: 'Approximate yard size?',
        key: 'yard_size',
        type: 'button_select',
        options: ['Small terrace', 'Small yard (< 50 m²)', 'Medium yard (50 – 150 m²)', 'Large yard (150 m²+)'],
      },
      {
        step: 4,
        title: 'Do you have the tools / equipment?',
        key: 'has_tools',
        type: 'button_select',
        options: ['Yes, tools available', 'No, please bring equipment'],
      },
    ],
  },

  // ── 15 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c15',
    name: 'Exterior Painting',
    icon: 'brush-outline',
    image: pic('extpaint', 300, 300),
    baseRate: 28,
    scoping_details: [
      {
        step: 2,
        title: 'What needs exterior painting?',
        key: 'paint_scope',
        type: 'card_select',
        options: ['Full house facade', 'Fence / gate', 'Garage / carport', 'Balcony / terrace', 'Specific wall only'],
      },
      {
        step: 3,
        title: 'Approximate surface area?',
        key: 'surface_area',
        type: 'button_select',
        options: ['Small (< 30 m²)', 'Medium (30 – 80 m²)', 'Large (80 – 150 m²)', 'Very large (150 m²+)'],
      },
      {
        step: 4,
        title: 'Do you have the paint already?',
        key: 'has_paint',
        type: 'button_select',
        options: ['Yes, I have paint', 'No, please source paint'],
      },
    ],
  },

  // ── 16 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c16',
    name: 'AC Repair',
    icon: 'thermometer-outline',
    image: pic('acrepair', 300, 300),
    baseRate: 50,
    scoping_details: [
      {
        step: 2,
        title: 'What AC service do you need?',
        key: 'ac_service',
        type: 'card_select',
        options: ['AC not cooling', 'AC installation', 'Refrigerant recharge', 'Coil / filter cleaning', 'Thermostat / controller', 'Noise / vibration issue'],
      },
      {
        step: 3,
        title: 'How many AC units?',
        key: 'unit_count',
        type: 'button_select',
        options: ['1 unit', '2 units', '3 units', '4+ units'],
      },
      {
        step: 4,
        title: 'AC brand?',
        key: 'ac_brand',
        type: 'button_select',
        options: ['LG', 'Samsung', 'Carrier', 'Trane', 'Local brand', 'Not sure'],
      },
    ],
  },

  // ── 17 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c17',
    name: 'Locksmith',
    icon: 'key-outline',
    image: pic('locksmith', 300, 300),
    baseRate: 38,
    scoping_details: [
      {
        step: 2,
        title: 'What locksmith service do you need?',
        key: 'lock_service',
        type: 'card_select',
        options: ['Locked out of home', 'Lock change / replacement', 'Key duplication', 'New lock installation', 'Safe / security box', 'Mailbox / storage lock'],
      },
      {
        step: 3,
        title: 'How many locks / doors?',
        key: 'lock_count',
        type: 'button_select',
        options: ['1', '2 – 3', '4 – 6', '7+'],
      },
      {
        step: 4,
        title: 'Is this an emergency?',
        key: 'urgency',
        type: 'button_select',
        options: ['Yes – locked out now', 'No – can schedule'],
      },
    ],
  },

  // ── 18 ──────────────────────────────────────────────────────────────────────
  {
    id: 'c18',
    name: 'Welder',
    icon: 'flame-outline',
    image: pic('welding', 300, 300),
    baseRate: 55,
    scoping_details: [
      {
        step: 2,
        title: 'What type of welding work?',
        key: 'weld_type',
        type: 'card_select',
        options: ['Security gate / railing', 'Structural metal repair', 'Custom metal fabrication', 'Vehicle / machinery', 'Furniture / decorative'],
      },
      {
        step: 3,
        title: 'Approximate project size?',
        key: 'project_size',
        type: 'button_select',
        options: ['Small repair (< 1 hr)', 'Medium job (1 – 3 hrs)', 'Large project (3+ hrs / multi-day)'],
      },
      {
        step: 4,
        title: 'Material type?',
        key: 'material',
        type: 'button_select',
        options: ['Steel / Iron', 'Aluminum', 'Stainless steel', 'Mixed / not sure'],
      },
    ],
  },
];

// ── CATEGORY HELPERS ──────────────────────────────────────────────────────────
export const getCategoryById = (id) => CATEGORIES.find((c) => c.id === id) || null;

// ── HOME SCREEN SECTIONS ──────────────────────────────────────────────────────
export const HOME_SECTIONS = [
  {
    id: 's1',
    title: 'Most Popular',
    subtitle: 'Top picks in your area',
    categoryIds: ['c2', 'c1', 'c17', 'c16', 'c10'],
  },
  {
    id: 's2',
    title: 'Moving Checklist',
    subtitle: 'Everything to settle in fast',
    categoryIds: ['c5', 'c6', 'c7', 'c12', 'c1'],
  },
  {
    id: 's3',
    title: 'Home Improvement',
    subtitle: 'Upgrade your space',
    categoryIds: ['c16', 'c3', 'c4', 'c13', 'c15'],
  },
];

export const getSectionCategories = (section) =>
  section.categoryIds.map((id) => CATEGORIES.find((c) => c.id === id)).filter(Boolean);

// ── SEARCH AUTOCOMPLETE DATA ──────────────────────────────────────────────────
export const SEARCH_SUGGESTIONS = {
  tv:     ['TV Mounting', 'TV Wall Bracket Install', 'TV Cable Management'],
  mount:  ['TV Mounting', 'Mirror Mounting', 'Shelf Mounting'],
  clean:  ['Cleaning', 'Deep Cleaning', 'Post-construction Clean', 'Move-out Clean'],
  paint:  ['Interior Painting', 'Exterior Painting', 'Accent Wall Paint', 'Touch-up Painting'],
  dry:    ['Drywall Repair', 'Drywall Patching', 'Wall Hole Repair'],
  move:   ['Flat Rate Moving', 'Help Moving', 'Furniture Moving', 'Box Packing'],
  lift:   ['Lifting Heavy Items', 'Appliance Moving', 'Piano Moving'],
  door:   ['Door/Cabinet Repair', 'Door Hinge Repair', 'Cabinet Door Fix'],
  electr: ['Electrical Help', 'Outlet Install', 'Light Fixture', 'Circuit Breaker'],
  plumb:  ['Plumbing', 'Leaky Faucet', 'Pipe Install', 'Toilet Repair'],
  window: ['Window/Blind Repair', 'Blind Install', 'Screen Repair'],
  blind:  ['Window/Blind Repair', 'Blind Installation', 'Blind Cord Repair'],
  carp:   ['Light Carpentry', 'Shelf Install', 'Custom Storage'],
  floor:  ['Floor/Tile Help', 'Tile Install', 'Grout Repair', 'Hardwood Repair'],
  tile:   ['Floor/Tile Help', 'Ceramic Tile', 'Grout Cleaning'],
  yard:   ['Yard Work', 'Lawn Mowing', 'Tree Trimming', 'Garden Cleanup'],
  ac:     ['AC Repair', 'AC Installation', 'AC Cleaning', 'Refrigerant Recharge'],
  lock:   ['Locksmith', 'Lock Change', 'Key Duplication', 'Locked Out'],
  weld:   ['Welder', 'Security Gate', 'Metal Fabrication', 'Railing Repair'],
};

export const getSearchSuggestions = (query) => {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const matches = new Set();

  CATEGORIES.forEach((cat) => {
    if (cat.name.toLowerCase().includes(q)) matches.add(cat.name);
  });

  Object.keys(SEARCH_SUGGESTIONS).forEach((key) => {
    if (q.includes(key) || key.includes(q)) {
      SEARCH_SUGGESTIONS[key].forEach((s) => matches.add(s));
    }
  });

  return Array.from(matches).slice(0, 6);
};

// ── TASKERS ───────────────────────────────────────────────────────────────────
export const TASKERS = [
  {
    id: 't1',
    name: 'José Rodríguez',
    avatar: avatar(11),
    hourlyRate: 35.0,
    isElite: true,
    rating: 4.9,
    reviewCount: 247,
    totalTasks: 312,
    workPhotoCount: 48,
    bio: 'Certified electrician and general handyman with 10+ years of experience in Caracas. Fast, clean, reliable.',
    tools: ['Power Drill', 'Level', 'Stud Finder', 'Multimeter', 'Oscilloscope', 'Pipe Wrench'],
    skills: `I've worked across residential and commercial properties in Altamira, Las Mercedes, and Chacao for over a decade. Specialties include TV mounting (over 800 TVs mounted), carpentry, electrical panel work, and general home repairs. I bring all necessary tools and always leave the space cleaner than I found it. Fully bilingual (Spanish/English) and accustomed to working in expat and corporate residences.`,
    categoryIds: ['c1', 'c9', 'c12'],
    photos: [
      { id: 'p1', uri: pic('jose1', 400, 300), label: 'TV wall mount – Las Mercedes' },
      { id: 'p2', uri: pic('jose2', 400, 300), label: 'Shelf installation – Altamira' },
      { id: 'p3', uri: pic('jose3', 400, 300), label: 'Electrical panel upgrade – Chacao' },
      { id: 'p4', uri: pic('jose4', 400, 300), label: 'Furniture assembly – El Rosal' },
      { id: 'p5', uri: pic('jose5', 400, 300), label: 'Custom shelving unit' },
    ],
    ratingBreakdown: { 5: 218, 4: 20, 3: 5, 2: 2, 1: 2 },
    reviews: [
      { id: 'r1', userName: 'Ana García',           userAvatar: avatar(1),  date: '2025-03-10', rating: 5, comment: 'José mounted my 75" TV perfectly. Super professional, brought all equipment and finished in under an hour. Highly recommend!' },
      { id: 'r2', userName: 'Carlos Méndez',        userAvatar: avatar(3),  date: '2025-02-28', rating: 5, comment: 'He assembled my entire IKEA bedroom set in 3 hours. Very organized and left the room spotless.' },
      { id: 'r3', userName: 'Luisa Fernández',      userAvatar: avatar(5),  date: '2025-02-14', rating: 4, comment: 'Great work on the electrical fix. Arrived on time and explained everything clearly. Would hire again.' },
      { id: 'r4', userName: 'Miguel Ángel Torres',  userAvatar: avatar(8),  date: '2025-01-20', rating: 5, comment: 'Mounted two TVs and installed floating shelves. Excellent craftsmanship and very reasonable rate.' },
    ],
  },

  {
    id: 't2',
    name: 'María Salcedo',
    avatar: avatar(20),
    hourlyRate: 22.0,
    isElite: true,
    rating: 4.95,
    reviewCount: 389,
    totalTasks: 451,
    workPhotoCount: 73,
    bio: 'Professional deep cleaner based in Caracas. Eco-friendly products, meticulous attention to detail, always on time.',
    tools: ['Commercial Vacuum', 'Steam Cleaner', 'Pressure Washer', 'Microfiber System', 'Eco-Cleaning Kit'],
    skills: `I've been providing residential and commercial cleaning services in Caracas for 8 years. My method covers everything from standard maintenance cleans to post-construction deep cleans. I use only eco-friendly, non-toxic products safe for children and pets. My clients in El Hatillo, Caurimare, and La Florida trust me with their keys for recurring visits. Fully insured; move-in/move-out cleans and Airbnb turnovers available.`,
    categoryIds: ['c2'],
    photos: [
      { id: 'p1', uri: pic('maria1', 400, 300), label: 'Kitchen deep clean – before' },
      { id: 'p2', uri: pic('maria2', 400, 300), label: 'Kitchen deep clean – after' },
      { id: 'p3', uri: pic('maria3', 400, 300), label: 'Bathroom restoration – Chacao' },
      { id: 'p4', uri: pic('maria4', 400, 300), label: 'Post-construction clean' },
      { id: 'p5', uri: pic('maria5', 400, 300), label: 'Terrace power wash' },
      { id: 'p6', uri: pic('maria6', 400, 300), label: 'Living room deep clean' },
    ],
    ratingBreakdown: { 5: 360, 4: 22, 3: 4, 2: 2, 1: 1 },
    reviews: [
      { id: 'r1', userName: 'Patricia Oliveira', userAvatar: avatar(9),  date: '2025-03-15', rating: 5, comment: 'María is absolutely incredible. My apartment looks brand new. She even cleaned behind the refrigerator!' },
      { id: 'r2', userName: 'Roberto Castillo',  userAvatar: avatar(12), date: '2025-03-02', rating: 5, comment: 'Post-construction clean after our reno. The place was a disaster. María and her team transformed it in 5 hours.' },
      { id: 'r3', userName: 'Valentina Ríos',    userAvatar: avatar(16), date: '2025-02-20', rating: 5, comment: "I use María for my Airbnb turnovers every week. She's never missed a beat. Guests always comment on cleanliness." },
      { id: 'r4', userName: 'Alejandro Bravo',   userAvatar: avatar(19), date: '2025-01-30', rating: 4, comment: 'Really thorough clean. Small scheduling hiccup but she communicated proactively. Final result was A+.' },
    ],
  },

  {
    id: 't3',
    name: 'Alejandro Peña',
    avatar: avatar(33),
    hourlyRate: 42.0,
    isElite: false,
    rating: 4.7,
    reviewCount: 93,
    totalTasks: 118,
    workPhotoCount: 24,
    bio: 'Licensed plumber, 12 years in the field. From leaky faucets to full pipe reroutes — Maracaibo and surroundings.',
    tools: ['Pipe Wrench', 'Drain Snake', 'Pipe Cutter', 'Soldering Kit', 'Pressure Gauge', 'Channel-Lock Pliers'],
    skills: `Fully licensed plumber (Registro de Contratistas #RCV-4921) with 12 years in Maracaibo. Expert in leak detection, water heater installation, bathroom and kitchen remodels, drain cleaning, and full piping reroutes. Works with copper, CPVC, and PEX. Emergency service available; written warranty on all repairs.`,
    categoryIds: ['c10'],
    photos: [
      { id: 'p1', uri: pic('alej1', 400, 300), label: 'Pipe reroute – Maracaibo' },
      { id: 'p2', uri: pic('alej2', 400, 300), label: 'Water heater install' },
      { id: 'p3', uri: pic('alej3', 400, 300), label: 'Bathroom remodel – plumbing' },
      { id: 'p4', uri: pic('alej4', 400, 300), label: 'Drain system repair' },
    ],
    ratingBreakdown: { 5: 74, 4: 13, 3: 4, 2: 1, 1: 1 },
    reviews: [
      { id: 'r1', userName: 'Gladys Suárez',    userAvatar: avatar(25), date: '2025-03-05', rating: 5, comment: "Fixed a major leak that two other plumbers couldn't find. Honest pricing and super clean work." },
      { id: 'r2', userName: 'Ernesto Gutiérrez', userAvatar: avatar(27), date: '2025-02-11', rating: 4, comment: 'Installed a new water heater. Came prepared, finished same day. Slightly over estimated time but great result.' },
      { id: 'r3', userName: 'Daniela Moreno',   userAvatar: avatar(30), date: '2025-01-25', rating: 5, comment: 'Our bathroom pipes were a nightmare. Alejandro sorted everything in one day. 10/10 will hire again.' },
    ],
  },

  {
    id: 't4',
    name: 'Carmen Villalobos',
    avatar: avatar(44),
    hourlyRate: 28.0,
    isElite: true,
    rating: 4.85,
    reviewCount: 176,
    totalTasks: 209,
    workPhotoCount: 37,
    bio: 'Professional painter and home décor specialist. Interior & exterior. Precision work with premium, durable paints.',
    tools: ['Airless Sprayer', 'Roller Set', 'Brush Collection', "Painter's Tape", 'Drop Cloths', 'Color Wheel'],
    skills: `Professional painter with 9 years of experience in Caracas, Valencia, and Mérida. Specializes in interior accent walls, full-room repaints, decorative finishes (venetian plaster, textures), and exterior weatherproofing coats. Uses only premium Sherwin-Williams and Sur-Ika brands. Every project: prep + primer + two finish coats + walk-through. 1-year guarantee against peeling.`,
    categoryIds: ['c3', 'c15'],
    photos: [
      { id: 'p1', uri: pic('carm1', 400, 300), label: 'Living room repaint – Altamira' },
      { id: 'p2', uri: pic('carm2', 400, 300), label: 'Accent wall – La Florida' },
      { id: 'p3', uri: pic('carm3', 400, 300), label: 'Exterior weathercoat – Valencia' },
      { id: 'p4', uri: pic('carm4', 400, 300), label: 'Venetian plaster finish' },
      { id: 'p5', uri: pic('carm5', 400, 300), label: "Children's room mural" },
    ],
    ratingBreakdown: { 5: 154, 4: 16, 3: 4, 2: 1, 1: 1 },
    reviews: [
      { id: 'r1', userName: 'Isabella Martínez', userAvatar: avatar(40), date: '2025-03-18', rating: 5, comment: "Carmen repainted our entire apartment in two days. Zero mess, perfect lines, beautiful color advice. She's our go-to now." },
      { id: 'r2', userName: 'Héctor Ramírez',    userAvatar: avatar(42), date: '2025-02-25', rating: 5, comment: 'Did an accent wall with a textured finish. Came out better than the reference photos we showed her.' },
      { id: 'r3', userName: 'Sofía Lozada',      userAvatar: avatar(45), date: '2025-02-08', rating: 4, comment: 'Great work overall. The exterior paint held up through the rainy season.' },
      { id: 'r4', userName: 'Nicolás Rondón',    userAvatar: avatar(48), date: '2025-01-15', rating: 5, comment: 'She transformed our office space. The venetian plaster wall is a conversation piece for every visitor.' },
    ],
  },

  {
    id: 't5',
    name: 'Luis Chirinos',
    avatar: avatar(57),
    hourlyRate: 48.0,
    isElite: true,
    rating: 4.92,
    reviewCount: 134,
    totalTasks: 160,
    workPhotoCount: 29,
    bio: 'Certified HVAC & electrical technician. AC install, repair, and maintenance. 15 years experience. Caracas & surroundings.',
    tools: ['Manifold Gauge Set', 'Refrigerant Recovery Unit', 'Multimeter', 'Vacuum Pump', 'Leak Detector', 'Torque Wrench'],
    skills: `Certified HVAC technician (COVENIN 2771) and licensed electrician with 15 years of experience. Services all major AC brands: Carrier, Trane, LG, Samsung, and local brands. Also handles generator wiring and UPS installation — critical for Venezuelan power reliability. Emergency service available 7 days a week.`,
    categoryIds: ['c9', 'c16'],
    photos: [
      { id: 'p1', uri: pic('luis1', 400, 300), label: 'Split AC install – Caracas' },
      { id: 'p2', uri: pic('luis2', 400, 300), label: 'Refrigerant recharge' },
      { id: 'p3', uri: pic('luis3', 400, 300), label: 'Generator wiring – El Hatillo' },
      { id: 'p4', uri: pic('luis4', 400, 300), label: 'Electrical panel – La California' },
      { id: 'p5', uri: pic('luis5', 400, 300), label: 'UPS system install' },
    ],
    ratingBreakdown: { 5: 122, 4: 9, 3: 2, 2: 1, 1: 0 },
    reviews: [
      { id: 'r1', userName: 'Fernando Blanco',   userAvatar: avatar(51), date: '2025-03-20', rating: 5, comment: "Luis installed three ACs in our new house. Impeccable work, no shortcuts. He's the only tech I'll call from now on." },
      { id: 'r2', userName: 'Mariana Ochoa',     userAvatar: avatar(54), date: '2025-03-01', rating: 5, comment: 'Emergency AC repair at 9pm. He showed up in 45 minutes and fixed it in under 2 hours. Lifesaver in this heat.' },
      { id: 'r3', userName: 'Gonzalo Escalante', userAvatar: avatar(58), date: '2025-02-17', rating: 5, comment: 'He also wired our generator and the UPS for the office. Incredibly knowledgeable and very fair pricing.' },
      { id: 'r4', userName: 'Rebeca Acosta',     userAvatar: avatar(62), date: '2025-01-28', rating: 4, comment: 'Great work on the electrical panel upgrade. Thorough and explained all options. Very trustworthy.' },
    ],
  },

  {
    id: 't6',
    name: 'Gabriela Useche',
    avatar: avatar(65),
    hourlyRate: 25.0,
    isElite: false,
    rating: 4.75,
    reviewCount: 61,
    totalTasks: 74,
    workPhotoCount: 15,
    bio: 'Moving & heavy lifting specialist. Fast, careful, friendly team. Covering all of Caracas Metro Area.',
    tools: ['Moving Dollies', 'Furniture Sliders', 'Packing Blankets', 'Stretch Wrap', 'Box Cutters', 'Ratchet Straps'],
    skills: `I lead a two-person moving team covering the full Caracas metro area — from Petare to El Junquito. We handle single-item moves to full-apartment relocations. Experienced with tight stairwells and the narrow streets of older Caracas neighborhoods. We provide all packing materials and disassemble/reassemble furniture as needed. Flat-rate pricing available for full moves.`,
    categoryIds: ['c5', 'c6', 'c7'],
    photos: [
      { id: 'p1', uri: pic('gabi1', 400, 300), label: 'Full apartment move – Los Palos Grandes' },
      { id: 'p2', uri: pic('gabi2', 400, 300), label: 'Piano move – Altamira' },
      { id: 'p3', uri: pic('gabi3', 400, 300), label: 'Packing & wrap service' },
      { id: 'p4', uri: pic('gabi4', 400, 300), label: 'Furniture reassembly' },
    ],
    ratingBreakdown: { 5: 48, 4: 10, 3: 2, 2: 1, 1: 0 },
    reviews: [
      { id: 'r1', userName: 'Andrés Querales', userAvatar: avatar(60), date: '2025-03-12', rating: 5, comment: 'Gabi and her team moved my full 3-bedroom apartment. Zero scratches, super fast, very reasonably priced.' },
      { id: 'r2', userName: 'Mónica Herrera',  userAvatar: avatar(63), date: '2025-02-22', rating: 5, comment: 'They moved a grand piano up three floors with no elevator. Incredible coordination.' },
      { id: 'r3', userName: 'Simón Alvarado',  userAvatar: avatar(67), date: '2025-01-18', rating: 4, comment: 'Good team, careful with furniture. Took a bit longer due to traffic but great result. Would hire again.' },
    ],
  },

  {
    id: 't7',
    name: 'Rafael Herrera',
    avatar: avatar(48),
    hourlyRate: 55.0,
    isElite: true,
    rating: 4.88,
    reviewCount: 72,
    totalTasks: 89,
    workPhotoCount: 21,
    bio: 'Master welder and metalwork specialist. Security gates, railings, custom fabrication. Serving Caracas & Valencia.',
    tools: ['MIG Welder', 'TIG Welder', 'Angle Grinder', 'Plasma Cutter', 'Metal Bender', 'Drill Press'],
    skills: `Master welder with 14 years in structural and decorative metalwork. Specializes in security gates, protective railings, custom steel furniture, and structural repairs. All work meets Venezuelan construction code standards. Fabricates on-site or in workshop; clean welds with polished finish guaranteed. Portfolio spans residential and commercial properties in Caracas and Valencia.`,
    categoryIds: ['c18'],
    photos: [
      { id: 'p1', uri: pic('raf1', 400, 300), label: 'Security gate – Las Mercedes' },
      { id: 'p2', uri: pic('raf2', 400, 300), label: 'Custom staircase railing – Altamira' },
      { id: 'p3', uri: pic('raf3', 400, 300), label: 'Steel door frame – commercial' },
      { id: 'p4', uri: pic('raf4', 400, 300), label: 'Decorative metalwork – residential' },
    ],
    ratingBreakdown: { 5: 61, 4: 9, 3: 1, 2: 1, 1: 0 },
    reviews: [
      { id: 'r1', userName: 'Diego Palacios',  userAvatar: avatar(35), date: '2025-03-08', rating: 5, comment: 'Rafael built a beautiful security gate for our building entrance. Exceptional quality and finish.' },
      { id: 'r2', userName: 'Laura Vásquez',   userAvatar: avatar(38), date: '2025-02-14', rating: 5, comment: 'Custom railing for our staircase came out perfect. He brought the design to life exactly as envisioned.' },
      { id: 'r3', userName: 'Marcos Quintero', userAvatar: avatar(41), date: '2025-01-22', rating: 4, comment: 'Great structural work. Slightly longer lead time than quoted but the quality is worth it.' },
    ],
  },
];

// ── TASKER HELPERS ────────────────────────────────────────────────────────────
export const getTaskerById = (id) => TASKERS.find((t) => t.id === id) || null;
export const getTaskersByCategory = (categoryId) =>
  TASKERS.filter((t) => t.categoryIds.includes(categoryId));

// ── RECENT ADDRESSES ──────────────────────────────────────────────────────────
export const RECENT_ADDRESSES = [
  { id: 'a1', street: 'Av. Francisco de Miranda, Torre BFC, Piso 12', area: 'Altamira, Caracas'        },
  { id: 'a2', street: 'Calle La Joya, Res. Los Mangos, Apto 3B',      area: 'El Hatillo, Caracas'      },
  { id: 'a3', street: 'Av. Principal de Las Mercedes, CC El Recreo',   area: 'Las Mercedes, Caracas'   },
  { id: 'a4', street: 'Urb. Los Palos Grandes, Calle 8, Casa 22',      area: 'Los Palos Grandes, Caracas' },
];

// ── SAVED ADDRESSES (Profile sub-screen) ─────────────────────────────────────
export const SAVED_ADDRESSES = [
  { id: 'sa1', label: 'Home',   street: 'Av. Francisco de Miranda, Torre BFC, Piso 12', area: 'Altamira, Caracas'      },
  { id: 'sa2', label: 'Office', street: 'Av. Principal de Las Mercedes, CC El Recreo',  area: 'Las Mercedes, Caracas' },
];

// ── PAYMENT METHODS ───────────────────────────────────────────────────────────
export const PAYMENT_METHODS = [
  { id: 'pm1', type: 'visa',       last4: '4242', expiry: '12/26', isDefault: true  },
  { id: 'pm2', type: 'mastercard', last4: '8301', expiry: '09/27', isDefault: false },
];

// ── NOTIFICATION SETTINGS ─────────────────────────────────────────────────────
export const NOTIFICATION_SETTINGS = [
  {
    id: 'ns1',
    category: 'Marketing',
    items: [
      { id: 'n1', label: 'Promotions & Discounts', push: true,  email: false },
      { id: 'n2', label: 'New Services Near You',  push: false, email: true  },
    ],
  },
  {
    id: 'ns2',
    category: 'Activity',
    items: [
      { id: 'n3', label: 'Task Confirmations', push: true,  email: true  },
      { id: 'n4', label: 'Tasker On The Way',  push: true,  email: false },
      { id: 'n5', label: 'Task Completed',     push: true,  email: true  },
      { id: 'n6', label: 'Payment Receipts',   push: false, email: true  },
    ],
  },
  {
    id: 'ns3',
    category: 'Tips',
    items: [
      { id: 'n7', label: 'Home Maintenance Tips', push: false, email: true  },
      { id: 'n8', label: 'Safety Reminders',      push: true,  email: false },
    ],
  },
];

// ── TASKER LIST FILTER CHIPS ──────────────────────────────────────────────────
export const TASKER_FILTERS = ['Within A Week', 'Flexible', 'Price'];

// ── TASK HISTORY (Tasks tab) ──────────────────────────────────────────────────
export const TASK_HISTORY = {
  scheduled: [
    {
      id: 'th1',
      categoryId: 'c2',
      categoryName: 'Cleaning',
      taskerId: 't2',
      taskerName: 'María Salcedo',
      taskerAvatar: avatar(20),
      date: '2026-04-05',
      time: '10:00 AM',
      address: 'Av. Francisco de Miranda, Torre BFC, Piso 12 – Altamira',
      status: 'scheduled',
      rooms: '3 rooms',
      baths: '2 bathrooms',
      totalRate: 88.0,
    },
  ],
  completed: [
    {
      id: 'th2',
      categoryId: 'c1',
      categoryName: 'TV Mounting',
      taskerId: 't1',
      taskerName: 'José Rodríguez',
      taskerAvatar: avatar(11),
      date: '2026-03-10',
      time: '2:00 PM',
      address: 'Urb. Los Palos Grandes, Calle 8, Casa 22',
      status: 'completed',
      totalRate: 70.0,
    },
    {
      id: 'th3',
      categoryId: 'c16',
      categoryName: 'AC Repair',
      taskerId: 't5',
      taskerName: 'Luis Chirinos',
      taskerAvatar: avatar(57),
      date: '2026-02-18',
      time: '11:00 AM',
      address: 'Calle La Joya, Res. Los Mangos, Apto 3B – El Hatillo',
      status: 'completed',
      totalRate: 96.0,
    },
  ],
};

// ── USER PROFILE ──────────────────────────────────────────────────────────────
export const USER_PROFILE = {
  id: 'u1',
  firstName: 'Wilmer',
  lastName: 'González',
  name: 'Wilmer González',
  email: 'wilmer.gonzalez@gmail.com',
  phone: '+58 412-555-0199',
  zipCode: '1060',
  avatar: null,
  memberSince: 'January 2025',
  paymentMethod: null,
  promoCode: null,
  favoriteTaskerIds: ['t1', 't5'],
  pastTaskerIds: ['t1', 't2', 't5'],
};

// ── PRICING CONSTANTS ─────────────────────────────────────────────────────────
export const TRUST_AND_SUPPORT_FEE = 8.16;
export const FREQUENCY_DISCOUNTS = {
  weekly:   0.15,
  biweekly: 0.10,
  monthly:  0.05,
  once:     0,
};
export const FREQUENCY_OPTIONS = [
  { key: 'weekly',    label: 'Weekly',       badge: 'Save 15%' },
  { key: 'biweekly', label: 'Every 2 weeks', badge: 'Save 10%' },
  { key: 'monthly',  label: 'Every 4 weeks', badge: 'Save 5%'  },
  { key: 'once',     label: 'Just Once',     badge: null       },
];

// ── AVAILABLE SCHEDULE SLOTS ──────────────────────────────────────────────────
const TODAY = new Date('2026-03-28');
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
const fmtDate = (d) =>
  d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

export const AVAILABLE_SLOTS = Array.from({ length: 7 }, (_, i) => ({
  date: fmtDate(addDays(TODAY, i + 1)),
  times: ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'],
}));

// ── HELP CENTER CATEGORIES ────────────────────────────────────────────────────
export const HELP_CATEGORIES = [
  { id: 'h1', icon: 'calendar-outline',   label: 'Booking & Scheduling' },
  { id: 'h2', icon: 'card-outline',       label: 'Payments & Billing'   },
  { id: 'h3', icon: 'person-outline',     label: 'Account & Profile'    },
  { id: 'h4', icon: 'people-outline',     label: 'Taskers'              },
  { id: 'h5', icon: 'shield-outline',     label: 'Safety & Trust'       },
  { id: 'h6', icon: 'chatbubble-outline', label: 'Reviews & Ratings'    },
];
