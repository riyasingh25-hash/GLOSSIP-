export interface Product {
  id: string;
  name: string;
  tagline: string;
  type: 'Lip Gloss' | 'Lip Oil' | 'Duo Set';
  price: number;
  originalPrice?: number;
  shadeName: string;
  shadeHex: string;
  mood: 'pink_princess' | 'cherry_girl' | 'nude_crush' | 'clear_obsession';
  moodLabel: string;
  finish: string;
  rating: number;
  reviewCount: number;
  image: string;
  secondaryImage: string;
  isBestseller?: boolean;
  isNew?: boolean;
  isStaffPick?: boolean;
  description: string;
  formulaHighlights: string[];
  packagingSpecs: {
    capColor: string;
    wandType: string;
    tubeFinish: string;
    volume: string;
  };
  ingredients: string;
  howToApply: string;
  availableShades: {
    name: string;
    hex: string;
    toneDesc: string;
    image?: string;
  }[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'glaze-drip-baby-princess',
    name: 'Glaze Drip High-Shine Lip Gloss',
    tagline: 'Main character baby pink with microscopic iridescent crystal flex',
    type: 'Lip Gloss',
    price: 599,
    originalPrice: 699,
    shadeName: 'Baby Princess',
    shadeHex: '#FFAEC9',
    mood: 'pink_princess',
    moodLabel: 'The Pink Princess',
    finish: 'Mirror Glass Shine',
    rating: 4.9,
    reviewCount: 342,
    image: '/src/assets/images/product_lipgloss_pink_1793100405279.jpg',
    secondaryImage: '/src/assets/images/hero_glossip_tubes_1793100403832.jpg',
    isBestseller: true,
    isNew: false,
    isStaffPick: true,
    description: 'The viral baby pink gloss that broke your feed. Glaze Drip delivers extreme wet-look glass shine with zero stickiness. Infused with cold-pressed jojoba oil and vitamin E for pillow-soft cushion lips all day.',
    formulaHighlights: [
      'Zero 2000s stickiness — ultra plush cushion slip',
      'Infused with Jojoba Seed Oil & Vitamin E',
      'Jumbo Cloud doe-foot applicator picks up the exact gloss dose',
      'Sweet strawberry vanilla cotton candy aroma'
    ],
    packagingSpecs: {
      capColor: 'Matte Pastel Baby Pink (#FFC4DC)',
      wandType: 'Oversized XL Cloud Doe-Foot',
      tubeFinish: 'Crystal Clear Acrylic with Silver Starfoil',
      volume: '5.2 ml / 0.17 fl. oz.'
    },
    ingredients: 'Hydrogenated Polyisobutene, Ethylene/Propylene/Styrene Copolymer, Simmondsia Chinensis (Jojoba) Seed Oil, Caprylic/Capric Triglyceride, Tocopheryl Acetate (Vitamin E), Silica Dimethyl Silylate, Fragrance (Strawberry Vanilla), CI 77891, CI 45410.',
    howToApply: 'Swipe the jumbo Cloud doe-foot wand directly onto bare lips for an ethereal everyday glaze, or pat over your favourite brown or mauve lip pencil for the ultimate 90s it-girl lip combo.',
    availableShades: [
      { name: 'Baby Princess', hex: '#FFAEC9', toneDesc: 'Milky petal pink with diamond sparkle' },
      { name: 'Bubblegum Kiss', hex: '#FF88B3', toneDesc: 'Vibrant punchy baby pink' },
      { name: 'Pink Champagne', hex: '#F9D1D9', toneDesc: 'Sheer cool pink with silver flecks' }
    ]
  },
  {
    id: 'nectar-dew-juicy-cherry',
    name: 'Nectar Dew Nourishing Lip Oil',
    tagline: 'A glass of cold cherry syrup for your lips with non-sticky bounce',
    type: 'Lip Oil',
    price: 649,
    originalPrice: 749,
    shadeName: 'Juicy Cherry',
    shadeHex: '#C9204B',
    mood: 'cherry_girl',
    moodLabel: 'The Cherry Girl',
    finish: 'Juicy Sheer Syrup',
    rating: 4.9,
    reviewCount: 418,
    image: '/src/assets/images/product_lipoil_cherry_1793100405418.jpg',
    secondaryImage: '/src/assets/images/glossip_lifestyle_vanity_1793100405397.jpg',
    isBestseller: true,
    isNew: true,
    isStaffPick: false,
    description: 'Like a fresh dip into a bowl of iced cherries. This lip oil melts on contact, coating lips in a sheer ruby tint that brings tired lips to life instantly. Rich in squalane and rosehip fruit oil to repair dry flakiness.',
    formulaHighlights: [
      'Botanical Squalane + Cold-pressed Rosehip Oil',
      'Adapts subtly to your natural lip warmth for a custom tint',
      'Lightweight oil-gel hybrid that cushions without sliding',
      'Fresh tart black cherry scent'
    ],
    packagingSpecs: {
      capColor: 'Metallic Cherry Pink Chrome (#F04F87)',
      wandType: 'Contoured Hugging Paddle Wand',
      tubeFinish: 'Heavy-base Glass-feel Vial with Minimalist Glossip Logo',
      volume: '5.8 ml / 0.19 fl. oz.'
    },
    ingredients: 'Polyglyceryl-2 Isostearate/Dimer Dilinoleate Copolymer, Plant-Derived Squalane, Rosa Canina (Rosehip) Fruit Oil, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Tocopherol, Cherry Extract, CI 15850, CI 45410.',
    howToApply: 'Glide over lips starting from the cupid’s bow outwards. Reapply whenever lips feel thirsty for instant juicy reflection.',
    availableShades: [
      { name: 'Juicy Cherry', hex: '#C9204B', toneDesc: 'Deep sheer ruby cherry' },
      { name: 'Wild Berry', hex: '#991B48', toneDesc: 'Moodier berry punch' },
      { name: 'Crimson Drop', hex: '#D6305C', toneDesc: 'Fresh pop of strawberry red' }
    ]
  },
  {
    id: 'glaze-drip-glass-milk',
    name: 'Glaze Drip High-Shine Lip Gloss',
    tagline: 'The viral liquid mirror gloss — zero color, 100% reflective glass',
    type: 'Lip Gloss',
    price: 549,
    originalPrice: 649,
    shadeName: 'Glass Milk',
    shadeHex: '#F6F6F6',
    mood: 'clear_obsession',
    moodLabel: 'The Clear Obsession',
    finish: 'Pure Glass Reflection',
    rating: 4.8,
    reviewCount: 289,
    image: '/src/assets/images/hero_glossip_tubes_1793100403832.jpg',
    secondaryImage: '/src/assets/images/product_lipgloss_pink_1793100405279.jpg',
    isBestseller: true,
    isNew: false,
    isStaffPick: false,
    description: 'The foundation of every iconic glossy lip look. Glass Milk gives a crystalline water-droplet reflection that makes lips look 2x fuller. Layer it over anything or wear it solo on clean bare lips.',
    formulaHighlights: [
      'Ultra-pure optical clarity with high refractive index',
      'No micro-glitter — pure wet-look finish',
      'Infused with Hyaluronic spheres for cushioned volume',
      'Mild spun-sugar vanilla scent'
    ],
    packagingSpecs: {
      capColor: 'Soft Pastel Butter Yellow (#FFF0B8)',
      wandType: 'Oversized XL Cloud Doe-Foot',
      tubeFinish: 'Ultra-Clear Transparent Tube',
      volume: '5.2 ml / 0.17 fl. oz.'
    },
    ingredients: 'Hydrogenated Polyisobutene, Ethylene/Propylene/Styrene Copolymer, Sodium Hyaluronate, Butyrospermum Parkii (Shea) Butter, Ricinus Communis (Castor) Seed Oil, Tocopheryl Acetate.',
    howToApply: 'Generously coat lips for a wet vinyl shine. Clean the silicone wiper after using over dark lipsticks to keep your vial crystal clear.',
    availableShades: [
      { name: 'Glass Milk', hex: '#FFFFFF', toneDesc: 'Crystal clear water droplet' },
      { name: 'Diamond Spark', hex: '#FFF4E8', toneDesc: 'Clear base with micro micro-prisms' }
    ]
  },
  {
    id: 'glaze-drip-nude-squeeze',
    name: 'Glaze Drip High-Shine Lip Gloss',
    tagline: 'The perfect warm chai-latte nude for everyday college & coffee runs',
    type: 'Lip Gloss',
    price: 599,
    originalPrice: 699,
    shadeName: 'Nude Squeeze',
    shadeHex: '#C58C73',
    mood: 'nude_crush',
    moodLabel: 'The Nude Crush',
    finish: 'Creamy Nude Sheen',
    rating: 4.9,
    reviewCount: 520,
    image: '/src/assets/images/hero_glossip_tubes_1793100403832.jpg',
    secondaryImage: '/src/assets/images/glossip_lifestyle_vanity_1793100405397.jpg',
    isBestseller: true,
    isNew: false,
    isStaffPick: true,
    description: 'Designed specifically for warm South Asian undertones. Nude Squeeze is that warm cinnamon-peach nude that never washes you out. Creamy, juicy, and comfortable enough to wear from morning lectures to evening hangs.',
    formulaHighlights: [
      'Flattering neutral-warm undertones calibrated for Indian skin tones',
      'No white chalky cast — semi-translucent melt',
      'Sunflower Seed & Jojoba Oil base',
      'Salted caramel biscuit scent'
    ],
    packagingSpecs: {
      capColor: 'Pastel Lilac Lavender (#E8DDF8)',
      wandType: 'Oversized XL Cloud Doe-Foot',
      tubeFinish: 'Transparent Acrylic with Warm Rose Gold Lettering',
      volume: '5.2 ml / 0.17 fl. oz.'
    },
    ingredients: 'Hydrogenated Polyisobutene, Simmondsia Chinensis (Jojoba) Seed Oil, Helianthus Annuus (Sunflower) Seed Oil, Caprylic/Capric Triglyceride, Iron Oxides (CI 77491, CI 77492, CI 77499), Titanium Dioxide (CI 77891).',
    howToApply: 'Pair with your favourite deep brown lip liner for the quintessential 90s bombshell lip.',
    availableShades: [
      { name: 'Nude Squeeze', hex: '#C58C73', toneDesc: 'Warm caramel cinnamon nude' },
      { name: 'Chai Latte', hex: '#AA745B', toneDesc: 'Deeper spiced cocoa nude' },
      { name: 'Peachy Keen', hex: '#D9987B', toneDesc: 'Warm toasted peach' }
    ]
  },
  {
    id: 'nectar-dew-rose-petal',
    name: 'Nectar Dew Nourishing Lip Oil',
    tagline: 'Dewy soft petal flush that feels like a drink of water for dry lips',
    type: 'Lip Oil',
    price: 649,
    originalPrice: 749,
    shadeName: 'Rose Petal Dew',
    shadeHex: '#E27B97',
    mood: 'pink_princess',
    moodLabel: 'The Pink Princess',
    finish: 'Dewy Glaze Wash',
    rating: 4.8,
    reviewCount: 194,
    image: '/src/assets/images/product_lipgloss_pink_1793100405279.jpg',
    secondaryImage: '/src/assets/images/product_lipoil_cherry_1793100405418.jpg',
    isBestseller: false,
    isNew: true,
    isStaffPick: false,
    description: 'Infused with cold-pressed Damask rosehip oil and marshmallow root extract. Leaves lips with a sheer English rose flush that blurs dry lines and locks moisture in for 8 full hours.',
    formulaHighlights: [
      '8-hour moisture barrier lock',
      'Rosehip extract + Vitamin E antioxidant shield',
      'Non-tacky lightweight fluid slip',
      'Subtle fresh garden rose scent'
    ],
    packagingSpecs: {
      capColor: 'Blush Cream Pink (#F8DCE7)',
      wandType: 'Contoured Hugging Paddle Wand',
      tubeFinish: 'Glass Vial with Soft Touch Label',
      volume: '5.8 ml / 0.19 fl. oz.'
    },
    ingredients: 'Polyglyceryl-2 Isostearate/Dimer Dilinoleate Copolymer, Rosa Damascena Extract, Squalane, Tocopheryl Acetate, CI 77891, CI 45410.',
    howToApply: 'Use throughout the day as an active treatment gloss, or apply a thick coat before sleep as a dreamy night lip mask.',
    availableShades: [
      { name: 'Rose Petal Dew', hex: '#E27B97', toneDesc: 'Sheer blushing pink rose' },
      { name: 'Lilac Haze', hex: '#D2A1C3', toneDesc: 'Cool-toned pink with violet sheen' }
    ]
  },
  {
    id: 'nectar-dew-honey-glow',
    name: 'Nectar Dew Nourishing Lip Oil',
    tagline: 'Warm amber glow with soothing organic honey essence',
    type: 'Lip Oil',
    price: 649,
    originalPrice: 749,
    shadeName: 'Honey Glow',
    shadeHex: '#EAA855',
    mood: 'nude_crush',
    moodLabel: 'The Nude Crush',
    finish: 'Golden Honey Glaze',
    rating: 4.9,
    reviewCount: 230,
    image: '/src/assets/images/hero_glossip_tubes_1793100403832.jpg',
    secondaryImage: '/src/assets/images/glossip_lifestyle_vanity_1793100405397.jpg',
    isBestseller: false,
    isNew: false,
    isStaffPick: true,
    description: 'Golden hour in a tube. Honey Glow infuses lips with warm sheer amber warmth, smoothing rough winter lips and reflecting ambient light for that viral dewy glow.',
    formulaHighlights: [
      'Propolis & Manuka honey-inspired soothing complex',
      'Restores dry, peeling lips within 1 application',
      'Golden micro-pearls for lit-from-within glow',
      'Wild flower honey scent'
    ],
    packagingSpecs: {
      capColor: 'Butter Yellow Cap (#FFF0B8)',
      wandType: 'Contoured Hugging Paddle Wand',
      tubeFinish: 'Transparent Vial with Gold Glossip foil',
      volume: '5.8 ml / 0.19 fl. oz.'
    },
    ingredients: 'Plant Squalane, Helianthus Annuus Seed Oil, Honey Extract, Tocopherol, Mica, Iron Oxides (CI 77492).',
    howToApply: 'Smooth over lips whenever you need instant golden hydration and a plump bounce.',
    availableShades: [
      { name: 'Honey Glow', hex: '#EAA855', toneDesc: 'Warm amber honey with gold micro-pearl' },
      { name: 'Caramel Glaze', hex: '#C28347', toneDesc: 'Warm caramel drizzle' }
    ]
  },
  {
    id: 'glossip-besties-lip-duo',
    name: 'The Glossip Besties Lip Duo (Limited Box)',
    tagline: '1 Glaze Drip Lip Gloss + 1 Nectar Dew Lip Oil in our pastel collector box',
    type: 'Duo Set',
    price: 1099,
    originalPrice: 1248,
    shadeName: 'Princess & Cherry Pair',
    shadeHex: '#E87A9A',
    mood: 'pink_princess',
    moodLabel: 'The Pink Princess',
    finish: 'Gloss & Oil Combo',
    rating: 5.0,
    reviewCount: 310,
    image: '/src/assets/images/hero_glossip_tubes_1793100403832.jpg',
    secondaryImage: '/src/assets/images/glossip_lifestyle_vanity_1793100405397.jpg',
    isBestseller: true,
    isNew: true,
    isStaffPick: true,
    description: 'Why choose when you can have both? Get our #1 bestselling Glaze Drip in Baby Princess paired with Nectar Dew in Juicy Cherry. Housed in a custom pastel drawer gift carton with satin ribbon pull.',
    formulaHighlights: [
      'Includes 1 full-size Glaze Drip + 1 full-size Nectar Dew',
      'Save ₹149 instantly on the bundle',
      'Comes in a keepsake pastel Glossip slide-out box with stickers',
      'The ultimate gift for your bestie (or your handbag)'
    ],
    packagingSpecs: {
      capColor: 'Collector Duo Edition',
      wandType: 'Both Cloud & Paddle Wands included',
      tubeFinish: 'Two Full-Size Products in Ribbon Box',
      volume: '5.2 ml + 5.8 ml'
    },
    ingredients: 'See individual product listings for Glaze Drip and Nectar Dew ingredients.',
    howToApply: 'Use Nectar Dew in the morning for nourishing botanical hydration, then swipe Glaze Drip right on top for blinding glass reflection.',
    availableShades: [
      { name: 'Princess & Cherry Pair', hex: '#E87A9A', toneDesc: 'Baby Princess Gloss + Juicy Cherry Oil' },
      { name: 'Nude & Glass Pair', hex: '#D6A88E', toneDesc: 'Nude Squeeze Gloss + Glass Milk Clear' }
    ]
  }
];

export const MOODS = [
  {
    id: 'pink_princess',
    name: 'The Pink Princess',
    tagline: 'Soft baby pink, dreamy sparkles & main character femininity',
    shadeHex: '#FFAEC9',
    accentBg: '#FFC4DC',
    textColor: '#563A45',
    emoji: '🌸',
    recommendedShade: 'Baby Princess'
  },
  {
    id: 'cherry_girl',
    name: 'The Cherry Girl',
    tagline: 'Juicy cherry tones, moody berry drip & spicy confidence',
    shadeHex: '#C9204B',
    accentBg: '#F8DCE7',
    textColor: '#563A45',
    emoji: '🍒',
    recommendedShade: 'Juicy Cherry'
  },
  {
    id: 'nude_crush',
    name: 'The Nude Crush',
    tagline: 'Warm caramel chai tones made for everyday effortless beauty',
    shadeHex: '#C58C73',
    accentBg: '#FFF0B8',
    textColor: '#563A45',
    emoji: '☕',
    recommendedShade: 'Nude Squeeze'
  },
  {
    id: 'clear_obsession',
    name: 'The Clear Obsession',
    tagline: 'Pure liquid mirror, water-drop finish with blinding high shine',
    shadeHex: '#E2E8F0',
    accentBg: '#E8DDF8',
    textColor: '#563A45',
    emoji: '✨',
    recommendedShade: 'Glass Milk'
  }
];

export const FAQS = [
  {
    question: 'Is Glossip lip gloss sticky like the early 2000s ones?',
    answer: 'Hard no! We formulated Glossip specifically to end sticky hair moments. Our Glaze Drip formula uses a high-cushion polymer blend combined with pure cold-pressed jojoba oil and plant squalane, giving you that blinding vinyl glass reflection with zero tackiness.'
  },
  {
    question: 'What is the real difference between Glossip Lip Gloss and Lip Oil?',
    answer: 'Glossip Lip Gloss is all about extreme glass shine, plumping cushion volume, and high light reflection for your main-character lip looks. Glossip Lip Oil is an intensive nourishing oil-gel treatment loaded with rosehip and squalane that deeply moisturizes dry lips with a sheer juicy tint.'
  },
  {
    question: 'How long does shipping take in India?',
    answer: 'Orders are processed from our warehouse within 24 hours. Metro deliveries (Mumbai, Delhi NCR, Bangalore, Pune, Hyderabad, Kolkata, Chennai) typically arrive in 2–3 business days. Rest of India takes 3–5 business days. Free shipping applies automatically to all orders over ₹999!'
  },
  {
    question: 'Are Glossip formulas suitable for sensitive lips?',
    answer: 'Yes! All Glossip products are dermatologist-tested, mineral oil-free, paraben-free, and 100% cruelty-free. We formulate with skin-loving botanical oils (jojoba, squalane, sunflower seed) and antioxidant Vitamin E.'
  },
  {
    question: 'Can I wear Glaze Drip gloss over my lipstick or lip liner?',
    answer: '100% yes! In fact, that is our favourite way to style it. Trace your lips with a warm brown or mauve liner, blend inwards, and tap Glaze Drip in the center for an iconic 90s juicy lip combo.'
  }
];
