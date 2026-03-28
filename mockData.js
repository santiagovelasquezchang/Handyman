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
export const CATEGORIES = [
  {
    id: 'c1',
    name: 'TV Mounting',
    icon: 'tv',
    image: pic('tvmount', 300, 300),
    baseRate: 35,
  },
  {
    id: 'c2',
    name: 'Furniture Assembly',
    icon: 'cube-outline',
    image: pic('furniture', 300, 300),
    baseRate: 28,
  },
  {
    id: 'c3',
    name: 'Deep Cleaning',
    icon: 'sparkles',
    image: pic('cleaning', 300, 300),
    baseRate: 22,
  },
  {
    id: 'c4',
    name: 'Plumbing',
    icon: 'water',
    image: pic('plumbing', 300, 300),
    baseRate: 40,
  },
  {
    id: 'c5',
    name: 'Electrical',
    icon: 'flash',
    image: pic('electrical', 300, 300),
    baseRate: 45,
  },
  {
    id: 'c6',
    name: 'Moving Help',
    icon: 'cube',
    image: pic('moving', 300, 300),
    baseRate: 30,
  },
  {
    id: 'c7',
    name: 'Painting',
    icon: 'color-palette',
    image: pic('painting', 300, 300),
    baseRate: 25,
  },
  {
    id: 'c8',
    name: 'Yard Work',
    icon: 'leaf',
    image: pic('yardwork', 300, 300),
    baseRate: 20,
  },
  {
    id: 'c9',
    name: 'AC Repair',
    icon: 'thermometer',
    image: pic('acrepair', 300, 300),
    baseRate: 50,
  },
  {
    id: 'c10',
    name: 'Locksmith',
    icon: 'key',
    image: pic('locksmith', 300, 300),
    baseRate: 38,
  },
  {
    id: 'c11',
    name: 'Outdoor Clean Up',
    icon: 'trash',
    image: pic('outdoor', 300, 300),
    baseRate: 18,
  },
  {
    id: 'c12',
    name: 'Power Washing',
    icon: 'water-outline',
    image: pic('powerwash', 300, 300),
    baseRate: 24,
  },
  {
    id: 'c13',
    name: 'Curtain Hanging',
    icon: 'options',
    image: pic('curtains', 300, 300),
    baseRate: 20,
  },
  {
    id: 'c14',
    name: 'Heavy Lifting',
    icon: 'barbell',
    image: pic('heavylift', 300, 300),
    baseRate: 22,
  },
  {
    id: 'c15',
    name: 'General Handyman',
    icon: 'construct',
    image: pic('handyman', 300, 300),
    baseRate: 30,
  },
];

// ── HOME SCREEN SECTIONS ──────────────────────────────────────────────────────
export const HOME_SECTIONS = [
  {
    id: 's1',
    title: 'Spring Favorites',
    subtitle: 'Popular this season',
    categoryIds: ['c3', 'c8', 'c11', 'c12', 'c7'],
  },
  {
    id: 's2',
    title: 'Your Moving Checklist',
    subtitle: 'Everything you need to settle in',
    categoryIds: ['c6', 'c2', 'c1', 'c13', 'c14'],
  },
  {
    id: 's3',
    title: 'Home Improvement Help',
    subtitle: 'Upgrade your space',
    categoryIds: ['c4', 'c5', 'c9', 'c15', 'c7'],
  },
];

// Helper: resolve a section's categories to full objects
export const getSectionCategories = (section) =>
  section.categoryIds.map((id) => CATEGORIES.find((c) => c.id === id)).filter(Boolean);

// ── SEARCH AUTOCOMPLETE DATA ──────────────────────────────────────────────────
// Maps a lowercase keyword fragment → array of suggestion strings.
export const SEARCH_SUGGESTIONS = {
  clean: [
    'Deep Cleaning',
    'Outdoor Clean Up',
    'Power Washing',
    'Move-out Cleaning',
    'Post-construction Cleaning',
  ],
  tv: ['TV Mounting', 'TV Wall Bracket Install', 'TV Cable Management'],
  mount: ['TV Mounting', 'Curtain Hanging', 'Mirror Mounting', 'Shelf Mounting'],
  furni: ['Furniture Assembly', 'Furniture Disassembly', 'IKEA Assembly'],
  ikea: ['IKEA Assembly', 'IKEA Disassembly'],
  plumb: ['Plumbing', 'Leaky Faucet Repair', 'Pipe Installation', 'Toilet Repair'],
  leak: ['Leaky Faucet Repair', 'Roof Leak Repair', 'Pipe Leak Fix'],
  electr: ['Electrical', 'Light Fixture Install', 'Outlet Repair', 'Circuit Breaker'],
  paint: ['Painting', 'Interior Painting', 'Exterior Painting', 'Touch-up Painting'],
  yard: ['Yard Work', 'Lawn Mowing', 'Tree Trimming', 'Garden Cleanup'],
  move: ['Moving Help', 'Heavy Lifting', 'Furniture Moving', 'Box Packing'],
  ac: ['AC Repair', 'AC Installation', 'AC Cleaning', 'AC Filter Replacement'],
  lock: ['Locksmith', 'Lock Replacement', 'Key Duplication', 'Door Lock Install'],
  hang: ['TV Mounting', 'Curtain Hanging', 'Picture Hanging', 'Mirror Hanging'],
  assem: ['Furniture Assembly', 'IKEA Assembly', 'Desk Assembly', 'Shelf Assembly'],
};

// Returns an ordered list of suggestions for a given query string.
export const getSearchSuggestions = (query) => {
  if (!query || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const matches = new Set();

  // Exact category name matches first
  CATEGORIES.forEach((cat) => {
    if (cat.name.toLowerCase().includes(q)) matches.add(cat.name);
  });

  // Then keyword-fragment matches
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
    tools: [
      'Power Drill',
      'Level',
      'Stud Finder',
      'Multimeter',
      'Oscilloscope',
      'Pipe Wrench',
    ],
    skills: `I've worked across residential and commercial properties in Altamira, Las Mercedes, and Chacao for over a decade. Specialties include TV mounting (over 800 TVs mounted), full furniture assembly, electrical panel work, and general home repairs. I bring all necessary tools and always leave the space cleaner than I found it. I'm fully bilingual (Spanish/English) and am accustomed to working in expat and corporate residences.`,
    categoryIds: ['c1', 'c2', 'c5', 'c15'],
    photos: [
      { id: 'p1', uri: pic('jose1', 400, 300), label: 'TV wall mount – Las Mercedes' },
      { id: 'p2', uri: pic('jose2', 400, 300), label: 'Shelf installation – Altamira' },
      { id: 'p3', uri: pic('jose3', 400, 300), label: 'Electrical panel upgrade – Chacao' },
      { id: 'p4', uri: pic('jose4', 400, 300), label: 'Furniture assembly – El Rosal' },
      { id: 'p5', uri: pic('jose5', 400, 300), label: 'Custom shelving unit' },
    ],
    ratingBreakdown: { 5: 218, 4: 20, 3: 5, 2: 2, 1: 2 },
    reviews: [
      {
        id: 'r1',
        userName: 'Ana García',
        userAvatar: avatar(1),
        date: '2025-03-10',
        rating: 5,
        comment:
          'José mounted my 75" TV perfectly. Super professional, brought all equipment and finished in under an hour. Highly recommend!',
      },
      {
        id: 'r2',
        userName: 'Carlos Méndez',
        userAvatar: avatar(3),
        date: '2025-02-28',
        rating: 5,
        comment:
          'He assembled my entire IKEA bedroom set in 3 hours. Very organized and left the room spotless.',
      },
      {
        id: 'r3',
        userName: 'Luisa Fernández',
        userAvatar: avatar(5),
        date: '2025-02-14',
        rating: 4,
        comment:
          'Great work on the electrical fix. Arrived on time and explained everything clearly. Would hire again.',
      },
      {
        id: 'r4',
        userName: 'Miguel Ángel Torres',
        userAvatar: avatar(8),
        date: '2025-01-20',
        rating: 5,
        comment:
          'Mounted two TVs and installed floating shelves. Excellent craftsmanship and very reasonable rate for the quality.',
      },
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
    tools: [
      'Commercial Vacuum',
      'Steam Cleaner',
      'Pressure Washer',
      'Microfiber System',
      'Eco-Cleaning Kit',
    ],
    skills: `I've been providing residential and commercial cleaning services in Caracas for 8 years. My method covers everything from standard maintenance cleans to post-construction deep cleans. I use only eco-friendly, non-toxic products safe for children and pets. My clients in El Hatillo, Caurimare, and La Florida trust me with their keys for recurring visits. I'm fully insured and bonded. I also provide move-in/move-out cleans and Airbnb turnovers.`,
    categoryIds: ['c3', 'c11', 'c12'],
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
      {
        id: 'r1',
        userName: 'Patricia Oliveira',
        userAvatar: avatar(9),
        date: '2025-03-15',
        rating: 5,
        comment:
          'María is absolutely incredible. My apartment looks brand new. She even cleaned behind the refrigerator!',
      },
      {
        id: 'r2',
        userName: 'Roberto Castillo',
        userAvatar: avatar(12),
        date: '2025-03-02',
        rating: 5,
        comment:
          'Post-construction clean after our reno. The place was a disaster. María and her team transformed it in 5 hours.',
      },
      {
        id: 'r3',
        userName: 'Valentina Ríos',
        userAvatar: avatar(16),
        date: '2025-02-20',
        rating: 5,
        comment:
          "I use María for my Airbnb turnovers every week. She's never missed a beat. Guests always comment on cleanliness.",
      },
      {
        id: 'r4',
        userName: 'Alejandro Bravo',
        userAvatar: avatar(19),
        date: '2025-01-30',
        rating: 4,
        comment:
          'Really thorough clean. Small scheduling hiccup but she communicated proactively. Final result was A+.',
      },
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
    bio: 'Licensed plumber, 12 years in the field. From leaky faucets to full pipe reroutes — I handle it all in Maracaibo and surroundings.',
    tools: [
      'Pipe Wrench',
      'Drain Snake',
      'Pipe Cutter',
      'Soldering Kit',
      'Pressure Gauge',
      'Channel-Lock Pliers',
    ],
    skills: `Fully licensed plumber (Registro de Contratistas #RCV-4921) with 12 years of experience in Maracaibo. Expert in leak detection and repair, water heater installation, bathroom and kitchen remodels, drain cleaning, and full piping reroutes. I work with copper, CPVC, and PEX materials. Available for emergencies. I provide a written warranty on all repairs.`,
    categoryIds: ['c4', 'c15'],
    photos: [
      { id: 'p1', uri: pic('alej1', 400, 300), label: 'Pipe reroute – Maracaibo' },
      { id: 'p2', uri: pic('alej2', 400, 300), label: 'Water heater install' },
      { id: 'p3', uri: pic('alej3', 400, 300), label: 'Bathroom remodel – plumbing' },
      { id: 'p4', uri: pic('alej4', 400, 300), label: 'Drain system repair' },
    ],
    ratingBreakdown: { 5: 74, 4: 13, 3: 4, 2: 1, 1: 1 },
    reviews: [
      {
        id: 'r1',
        userName: 'Gladys Suárez',
        userAvatar: avatar(25),
        date: '2025-03-05',
        rating: 5,
        comment:
          "Fixed a major leak that two other plumbers couldn't find. Honest pricing and super clean work.",
      },
      {
        id: 'r2',
        userName: 'Ernesto Gutiérrez',
        userAvatar: avatar(27),
        date: '2025-02-11',
        rating: 4,
        comment:
          'Installed a new water heater. Came prepared, finished same day. Slightly over the estimated time but great result.',
      },
      {
        id: 'r3',
        userName: 'Daniela Moreno',
        userAvatar: avatar(30),
        date: '2025-01-25',
        rating: 5,
        comment:
          'Our bathroom pipes were a nightmare. Alejandro sorted everything in one day. 10/10 will hire again.',
      },
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
    tools: [
      'Airless Sprayer',
      'Roller Set',
      'Brush Collection',
      'Painter\'s Tape',
      'Drop Cloths',
      'Color Wheel',
    ],
    skills: `I'm a professional painter with 9 years of experience transforming homes in Caracas, Valencia, and Mérida. I specialize in interior accent walls, full-room repaints, decorative finishes (venetian plaster, textures), and exterior weatherproofing coats. I use only premium Sherwin-Williams and Sur-Ika brands. Every project includes prep, primer, two finish coats, and a walk-through. My work includes a 1-year guarantee against peeling.`,
    categoryIds: ['c7', 'c15'],
    photos: [
      { id: 'p1', uri: pic('carm1', 400, 300), label: 'Living room repaint – Altamira' },
      { id: 'p2', uri: pic('carm2', 400, 300), label: 'Accent wall – La Florida' },
      { id: 'p3', uri: pic('carm3', 400, 300), label: 'Exterior weathercoat – Valencia' },
      { id: 'p4', uri: pic('carm4', 400, 300), label: 'Venetian plaster finish' },
      { id: 'p5', uri: pic('carm5', 400, 300), label: 'Children\'s room mural' },
    ],
    ratingBreakdown: { 5: 154, 4: 16, 3: 4, 2: 1, 1: 1 },
    reviews: [
      {
        id: 'r1',
        userName: 'Isabella Martínez',
        userAvatar: avatar(40),
        date: '2025-03-18',
        rating: 5,
        comment:
          "Carmen repainted our entire apartment in two days. Zero mess, perfect lines, beautiful color advice. She's our go-to now.",
      },
      {
        id: 'r2',
        userName: 'Héctor Ramírez',
        userAvatar: avatar(42),
        date: '2025-02-25',
        rating: 5,
        comment:
          'Did an accent wall with a textured finish. Came out better than the reference photos we showed her.',
      },
      {
        id: 'r3',
        userName: 'Sofía Lozada',
        userAvatar: avatar(45),
        date: '2025-02-08',
        rating: 4,
        comment:
          'Great work overall. The exterior paint held up perfectly through the rainy season. Only minor comment: slightly slow on prep day.',
      },
      {
        id: 'r4',
        userName: 'Nicolás Rondón',
        userAvatar: avatar(48),
        date: '2025-01-15',
        rating: 5,
        comment:
          'She transformed our office space. The venetian plaster wall is a conversation piece for every visitor.',
      },
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
    tools: [
      'Manifold Gauge Set',
      'Refrigerant Recovery Unit',
      'Multimeter',
      'Vacuum Pump',
      'Leak Detector',
      'Torque Wrench',
    ],
    skills: `Certified HVAC technician (COVENIN 2771) and licensed electrician with 15 years of experience. I service all major AC brands including Carrier, Trane, LG, Samsung, and local brands. Services include full AC installation (split, duct, cassette), refrigerant recharge, coil cleaning, thermostat replacement, and electrical load analysis. I also handle generator wiring and UPS system installation — critical for Venezuelan power reliability. Emergency service available 7 days a week.`,
    categoryIds: ['c5', 'c9', 'c15'],
    photos: [
      { id: 'p1', uri: pic('luis1', 400, 300), label: 'Split AC install – Caracas' },
      { id: 'p2', uri: pic('luis2', 400, 300), label: 'Refrigerant recharge' },
      { id: 'p3', uri: pic('luis3', 400, 300), label: 'Generator wiring – El Hatillo' },
      { id: 'p4', uri: pic('luis4', 400, 300), label: 'Electrical panel – La California' },
      { id: 'p5', uri: pic('luis5', 400, 300), label: 'UPS system install' },
    ],
    ratingBreakdown: { 5: 122, 4: 9, 3: 2, 2: 1, 1: 0 },
    reviews: [
      {
        id: 'r1',
        userName: 'Fernando Blanco',
        userAvatar: avatar(51),
        date: '2025-03-20',
        rating: 5,
        comment:
          "Luis installed three ACs in our new house. Impeccable work, no shortcuts. He's the only tech I'll call from now on.",
      },
      {
        id: 'r2',
        userName: 'Mariana Ochoa',
        userAvatar: avatar(54),
        date: '2025-03-01',
        rating: 5,
        comment:
          'Emergency AC repair at 9pm. He showed up in 45 minutes and had it fixed in under 2 hours. Lifesaver in this heat.',
      },
      {
        id: 'r3',
        userName: 'Gonzalo Escalante',
        userAvatar: avatar(58),
        date: '2025-02-17',
        rating: 5,
        comment:
          'He also wired our generator and the UPS for the office. Incredibly knowledgeable and very fair pricing.',
      },
      {
        id: 'r4',
        userName: 'Rebeca Acosta',
        userAvatar: avatar(62),
        date: '2025-01-28',
        rating: 4,
        comment:
          'Great work on the electrical panel upgrade. Thorough and explained all options. Very trustworthy.',
      },
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
    tools: [
      'Moving Dollies',
      'Furniture Sliders',
      'Packing Blankets',
      'Stretch Wrap',
      'Box Cutters',
      'Ratchet Straps',
    ],
    skills: `I lead a two-person moving team covering the full Caracas metropolitan area — from Petare to El Junquito. We handle everything from single-item moves to full-apartment relocations. We pack, wrap, and protect all furniture. We're experienced with tight stairwells, elevators, and the narrow streets of older Caracas neighborhoods. We provide all packing materials and can disassemble/reassemble furniture as needed. Flat-rate pricing available for full moves.`,
    categoryIds: ['c6', 'c14', 'c2'],
    photos: [
      { id: 'p1', uri: pic('gabi1', 400, 300), label: 'Full apartment move – Los Palos Grandes' },
      { id: 'p2', uri: pic('gabi2', 400, 300), label: 'Piano move – Altamira' },
      { id: 'p3', uri: pic('gabi3', 400, 300), label: 'Packing & wrap service' },
      { id: 'p4', uri: pic('gabi4', 400, 300), label: 'Furniture reassembly' },
    ],
    ratingBreakdown: { 5: 48, 4: 10, 3: 2, 2: 1, 1: 0 },
    reviews: [
      {
        id: 'r1',
        userName: 'Andrés Querales',
        userAvatar: avatar(60),
        date: '2025-03-12',
        rating: 5,
        comment:
          'Gabi and her team moved my full 3-bedroom apartment. Zero scratches, super fast, and very reasonably priced.',
      },
      {
        id: 'r2',
        userName: 'Mónica Herrera',
        userAvatar: avatar(63),
        date: '2025-02-22',
        rating: 5,
        comment:
          'They moved a grand piano up three floors with no elevator. Incredible coordination. Very professional.',
      },
      {
        id: 'r3',
        userName: 'Simón Alvarado',
        userAvatar: avatar(67),
        date: '2025-01-18',
        rating: 4,
        comment:
          'Good team, careful with furniture. Took a bit longer than estimated but that was because of traffic. Would hire again.',
      },
    ],
  },
];

// ── TASKER HELPERS ────────────────────────────────────────────────────────────
export const getTaskerById = (id) => TASKERS.find((t) => t.id === id) || null;

// Returns taskers that serve a given category id
export const getTaskersByCategory = (categoryId) =>
  TASKERS.filter((t) => t.categoryIds.includes(categoryId));

// ── RECENT ADDRESSES ──────────────────────────────────────────────────────────
export const RECENT_ADDRESSES = [
  {
    id: 'a1',
    street: 'Av. Francisco de Miranda, Torre BFC, Piso 12',
    area: 'Altamira, Caracas',
  },
  {
    id: 'a2',
    street: 'Calle La Joya, Res. Los Mangos, Apto 3B',
    area: 'El Hatillo, Caracas',
  },
  {
    id: 'a3',
    street: 'Av. Principal de Las Mercedes, CC El Recreo',
    area: 'Las Mercedes, Caracas',
  },
  {
    id: 'a4',
    street: 'Urb. Los Palos Grandes, Calle 8, Casa 22',
    area: 'Los Palos Grandes, Caracas',
  },
];

// ── BOOKING SCOPE OPTIONS ─────────────────────────────────────────────────────
export const ROOM_OPTIONS = ['1 room', '2 rooms', '3 rooms', '4+ rooms'];
export const BATH_OPTIONS = ['None', '1 bathroom', '2 bathrooms', '3 bathrooms', '4+ bathrooms'];
export const CONDITION_OPTIONS = ['Cleaned regularly', 'Needs a deep clean', 'Post-construction'];
export const PET_OPTIONS = ['None', 'Dogs', 'Cats', 'Dogs & Cats'];

// ── TASKER LIST FILTER CHIPS ──────────────────────────────────────────────────
export const TASKER_FILTERS = ['Within A Week', 'Flexible', 'Price'];

// ── TASK HISTORY (for the Tasks tab) ─────────────────────────────────────────
export const TASK_HISTORY = {
  scheduled: [
    {
      id: 'th1',
      categoryId: 'c3',
      categoryName: 'Deep Cleaning',
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
      categoryId: 'c9',
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
  name: 'Wilmer González',
  email: 'wilmer.gonzalez@gmail.com',
  phone: '+58 412-555-0199',
  avatar: null, // null = show grey placeholder
  paymentMethod: null,
  promoCode: null,
  favoriteTaskerIds: [],
  pastTaskerIds: ['t1', 't2', 't5'],
};

// ── PRICING CONSTANTS ─────────────────────────────────────────────────────────
export const TRUST_AND_SUPPORT_FEE = 8.16;
export const FREQUENCY_DISCOUNTS = {
  weekly: 0.15,
  biweekly: 0.10,
  monthly: 0.05,
  once: 0,
};
export const FREQUENCY_OPTIONS = [
  { key: 'weekly',    label: 'Weekly',        badge: 'Save 15%' },
  { key: 'biweekly', label: 'Every 2 weeks',  badge: 'Save 10%' },
  { key: 'monthly',  label: 'Every 4 weeks',  badge: 'Save 5%'  },
  { key: 'once',     label: 'Just Once',       badge: null       },
];

// ── AVAILABLE SCHEDULE SLOTS ──────────────────────────────────────────────────
// Simulates what a real API would return for the next 7 days.
const TODAY = new Date('2026-03-28');
const addDays = (d, n) => {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
};
const fmtDate = (d) =>
  d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

export const AVAILABLE_SLOTS = Array.from({ length: 7 }, (_, i) => ({
  date: fmtDate(addDays(TODAY, i + 1)),
  times: ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'],
}));
