export const HABIT_CATEGORIES = {
  DIET: "Diet",
  FITNESS: "Fitness",
  MINDSET: "Mindset",
  RECOVERY: "Recovery",
};

export const ALL_HABITS = [
  // Diet — 10 habits
  {
    id: "h1",
    label: "Drink 8 glasses of water",
    category: HABIT_CATEGORIES.DIET,
    xp: 3,
    icon: "💧",
    description: "Stay hydrated throughout the day",
  },
  {
    id: "h2",
    label: "Eat 5 servings of vegetables",
    category: HABIT_CATEGORIES.DIET,
    xp: 4,
    icon: "🥦",
    description: "Fill your plate with color",
  },
  {
    id: "h3",
    label: "No refined sugar today",
    category: HABIT_CATEGORIES.DIET,
    xp: 4,
    icon: "🚫",
    description: "Avoid sweets, candy, and sugary drinks",
  },
  {
    id: "h4",
    label: "Eat a protein-rich breakfast",
    category: HABIT_CATEGORIES.DIET,
    xp: 3,
    icon: "🥚",
    description: "Start the day with lasting fuel",
  },
  {
    id: "h5",
    label: "No alcohol today",
    category: HABIT_CATEGORIES.DIET,
    xp: 4,
    icon: "🧃",
    description: "Clear-headed and clean",
  },
  {
    id: "h6",
    label: "Eat mindfully — no screens at meals",
    category: HABIT_CATEGORIES.DIET,
    xp: 3,
    icon: "🍽️",
    description: "Be present with your food",
  },
  {
    id: "h7",
    label: "Meal prep or cook at home",
    category: HABIT_CATEGORIES.DIET,
    xp: 4,
    icon: "👨‍🍳",
    description: "Know exactly what you're eating",
  },
  {
    id: "h8",
    label: "Eat a healthy snack (not junk)",
    category: HABIT_CATEGORIES.DIET,
    xp: 2,
    icon: "🫐",
    description: "Nuts, fruit, or veggies between meals",
  },
  {
    id: "h9",
    label: "Skip processed food entirely",
    category: HABIT_CATEGORIES.DIET,
    xp: 4,
    icon: "🌿",
    description: "Real food only today",
  },
  {
    id: "h10",
    label: "Take your supplements / vitamins",
    category: HABIT_CATEGORIES.DIET,
    xp: 2,
    icon: "💊",
    description: "Support your body from within",
  },

  // Fitness — 10 habits
  {
    id: "h11",
    label: "Walk 10,000 steps",
    category: HABIT_CATEGORIES.FITNESS,
    xp: 4,
    icon: "👟",
    description: "Keep the body in motion",
  },
  {
    id: "h12",
    label: "Complete a workout (30+ min)",
    category: HABIT_CATEGORIES.FITNESS,
    xp: 5,
    icon: "🏋️",
    description: "Strength, cardio, or HIIT — push yourself",
  },
  {
    id: "h13",
    label: "Stretch or do yoga (10+ min)",
    category: HABIT_CATEGORIES.FITNESS,
    xp: 3,
    icon: "🧘",
    description: "Mobility is longevity",
  },
  {
    id: "h14",
    label: "Go outside for fresh air",
    category: HABIT_CATEGORIES.FITNESS,
    xp: 2,
    icon: "🌤️",
    description: "Sunlight and open air reset the mind",
  },
  {
    id: "h15",
    label: "Do 50 pushups / bodyweight reps",
    category: HABIT_CATEGORIES.FITNESS,
    xp: 4,
    icon: "💪",
    description: "Earn your strength",
  },
  {
    id: "h16",
    label: "Go for a run (any distance)",
    category: HABIT_CATEGORIES.FITNESS,
    xp: 4,
    icon: "🏃",
    description: "Move at pace that challenges you",
  },
  {
    id: "h17",
    label: "No elevator — take the stairs",
    category: HABIT_CATEGORIES.FITNESS,
    xp: 2,
    icon: "🪜",
    description: "Micro-choices accumulate",
  },
  {
    id: "h18",
    label: "Cold shower (30+ seconds)",
    category: HABIT_CATEGORIES.FITNESS,
    xp: 3,
    icon: "🚿",
    description: "Build resilience every morning",
  },
  {
    id: "h19",
    label: "Active recovery (foam roll / massage)",
    category: HABIT_CATEGORIES.FITNESS,
    xp: 3,
    icon: "🛁",
    description: "Repair so you can perform again",
  },
  {
    id: "h20",
    label: "Bike, swim, or sport (30+ min)",
    category: HABIT_CATEGORIES.FITNESS,
    xp: 4,
    icon: "🚴",
    description: "Joyful movement is still movement",
  },

  // Mindset — 8 habits
  {
    id: "h21",
    label: "Meditate for 10 minutes",
    category: HABIT_CATEGORIES.MINDSET,
    xp: 4,
    icon: "🧠",
    description: "Train the mind the way you train the body",
  },
  {
    id: "h22",
    label: "Journal one full page",
    category: HABIT_CATEGORIES.MINDSET,
    xp: 3,
    icon: "📓",
    description: "Write to understand yourself",
  },
  {
    id: "h23",
    label: "Read 20+ pages of a book",
    category: HABIT_CATEGORIES.MINDSET,
    xp: 3,
    icon: "📖",
    description: "Feed the mind with depth",
  },
  {
    id: "h24",
    label: "No social media before noon",
    category: HABIT_CATEGORIES.MINDSET,
    xp: 3,
    icon: "📵",
    description: "Protect your morning attention",
  },
  {
    id: "h25",
    label: "Write 3 things you're grateful for",
    category: HABIT_CATEGORIES.MINDSET,
    xp: 2,
    icon: "🙏",
    description: "Gratitude rewires your baseline",
  },
  {
    id: "h26",
    label: "Set clear intentions for the day",
    category: HABIT_CATEGORIES.MINDSET,
    xp: 2,
    icon: "🎯",
    description: "Choose your priorities before they choose you",
  },
  {
    id: "h27",
    label: "Do a digital detox (1+ hour)",
    category: HABIT_CATEGORIES.MINDSET,
    xp: 3,
    icon: "🌙",
    description: "Time away from screens is time gained",
  },
  {
    id: "h28",
    label: "Learn something new",
    category: HABIT_CATEGORIES.MINDSET,
    xp: 3,
    icon: "💡",
    description: "Keep the mind growing",
  },

  // Recovery — 7 habits
  {
    id: "h29",
    label: "Sleep 8 hours",
    category: HABIT_CATEGORIES.RECOVERY,
    xp: 5,
    icon: "😴",
    description: "Recovery is where growth happens",
  },
  {
    id: "h30",
    label: "In bed by 10:30pm",
    category: HABIT_CATEGORIES.RECOVERY,
    xp: 3,
    icon: "🌛",
    description: "Discipline at night enables discipline at dawn",
  },
  {
    id: "h31",
    label: "No screens 30 min before bed",
    category: HABIT_CATEGORIES.RECOVERY,
    xp: 3,
    icon: "📴",
    description: "Protect your sleep quality",
  },
  {
    id: "h32",
    label: "Take a 20-min nap or rest",
    category: HABIT_CATEGORIES.RECOVERY,
    xp: 2,
    icon: "🛌",
    description: "Strategic rest is not laziness",
  },
  {
    id: "h33",
    label: "Spend quality time with someone",
    category: HABIT_CATEGORIES.RECOVERY,
    xp: 3,
    icon: "❤️",
    description: "Human connection is essential fuel",
  },
  {
    id: "h34",
    label: "Spend time in nature",
    category: HABIT_CATEGORIES.RECOVERY,
    xp: 3,
    icon: "🌲",
    description: "Ground yourself in what is real",
  },
  {
    id: "h35",
    label: "Practice deep breathing (5 min)",
    category: HABIT_CATEGORIES.RECOVERY,
    xp: 2,
    icon: "🫁",
    description: "Regulate the nervous system with breath",
  },
];

// Default daily selection (15 habits) — balanced mix
export const DEFAULT_DAILY_HABITS = [
  "h1", "h2", "h4", "h5",       // Diet
  "h11", "h12", "h13", "h15",   // Fitness
  "h21", "h22", "h24", "h25",   // Mindset
  "h29", "h30", "h35",          // Recovery
];

// Max XP earnable per day from default habits
export const MAX_DAILY_XP = DEFAULT_DAILY_HABITS.reduce((sum, id) => {
  const h = ALL_HABITS.find(h => h.id === id);
  return sum + (h ? h.xp : 0);
}, 0);

// Levels per tier = 100; XP per level = 10
// Max levels per day = MAX_DAILY_XP / XP_PER_LEVEL
export const XP_PER_LEVEL = 10;
export const LEVELS_PER_TIER = 100;
