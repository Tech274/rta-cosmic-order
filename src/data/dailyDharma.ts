export interface Subhashita {
  id: string;
  sanskrit: string;
  transliteration: string;
  translation: string;
  meaning: string;
  category: SubhashitaCategory;
  source?: string;
}

export type SubhashitaCategory = 
  | "wisdom"
  | "action"
  | "character"
  | "courage"
  | "knowledge"
  | "perseverance"
  | "humility"
  | "leadership"
  | "love"
  | "silence";

export const categoryLabels: Record<SubhashitaCategory, string> = {
  wisdom: "Wisdom",
  action: "Action",
  character: "Character",
  courage: "Courage",
  knowledge: "Knowledge",
  perseverance: "Perseverance",
  humility: "Humility",
  leadership: "Leadership",
  love: "Love & Friendship",
  silence: "Silence"
};

export const categoryColors: Record<SubhashitaCategory, string> = {
  wisdom: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  action: "bg-red-500/20 text-red-300 border-red-500/30",
  character: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  courage: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  knowledge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  perseverance: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  humility: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  leadership: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  love: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  silence: "bg-slate-500/20 text-slate-300 border-slate-500/30"
};

export const subhashitas: Subhashita[] = [
  {
    id: "1",
    sanskrit: "विद्या ददाति विनयं विनयाद्याति पात्रताम्",
    transliteration: "Vidyā dadāti vinayaṁ vinayādyāti pātratām",
    translation: "Knowledge gives humility, from humility comes worthiness",
    meaning: "True education manifests as humility. The more we learn, the more we realize how much we don't know. This humility makes us worthy of receiving more wisdom.",
    category: "knowledge",
    source: "Hitopadesha"
  },
  {
    id: "2",
    sanskrit: "उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः",
    transliteration: "Udyamena hi sidhyanti kāryāṇi na manorathaiḥ",
    translation: "Success comes through effort, not mere wishes",
    meaning: "Dreams alone accomplish nothing. It is persistent effort and action that transforms aspirations into reality. The universe rewards those who strive.",
    category: "action",
    source: "Panchatantra"
  },
  {
    id: "3",
    sanskrit: "सत्यमेव जयते नानृतम्",
    transliteration: "Satyameva jayate nānṛtam",
    translation: "Truth alone triumphs, not falsehood",
    meaning: "In the eternal struggle between truth and falsehood, truth always prevails. This is the cosmic order — Ṛta itself.",
    category: "character",
    source: "Mundaka Upanishad"
  },
  {
    id: "4",
    sanskrit: "अहिंसा परमो धर्मः",
    transliteration: "Ahiṁsā paramo dharmaḥ",
    translation: "Non-violence is the highest dharma",
    meaning: "The greatest righteousness lies in causing no harm — not just in action, but in thought and word. This principle underlies all ethical living.",
    category: "character",
    source: "Mahabharata"
  },
  {
    id: "5",
    sanskrit: "धैर्यं सर्वत्र साधनम्",
    transliteration: "Dhairyaṁ sarvatra sādhanam",
    translation: "Patience is the means to achieve everything",
    meaning: "With patience, all obstacles can be overcome. It is the quiet strength that allows us to persist when others give up.",
    category: "perseverance",
    source: "Subhashita Ratna Bhandagara"
  },
  {
    id: "6",
    sanskrit: "मौनं सर्वार्थसाधनम्",
    transliteration: "Maunaṁ sarvārthasādhanam",
    translation: "Silence is the means to accomplish all goals",
    meaning: "In silence, we find clarity. Words scatter energy; silence conserves and focuses it. The wise speak little but accomplish much.",
    category: "silence",
    source: "Chanakya Niti"
  },
  {
    id: "7",
    sanskrit: "परोपकाराय सतां विभूतयः",
    transliteration: "Paropakārāya satāṁ vibhūtayaḥ",
    translation: "The wealth of the noble is for helping others",
    meaning: "True nobility is measured not by what we accumulate, but by what we give. The purpose of abundance is service to others.",
    category: "humility",
    source: "Subhashita"
  },
  {
    id: "8",
    sanskrit: "क्षमा वीरस्य भूषणम्",
    transliteration: "Kṣamā vīrasya bhūṣaṇam",
    translation: "Forgiveness is the ornament of the brave",
    meaning: "It takes greater strength to forgive than to retaliate. The truly courageous adorn themselves with compassion, not vengeance.",
    category: "courage",
    source: "Hitopadesha"
  },
  {
    id: "9",
    sanskrit: "आत्मवत् सर्वभूतेषु यः पश्यति स पण्डितः",
    transliteration: "Ātmavat sarvabhūteṣu yaḥ paśyati sa paṇḍitaḥ",
    translation: "One who sees all beings as oneself is truly wise",
    meaning: "The highest wisdom is recognizing the Self in all beings. When we truly see others as ourselves, compassion becomes natural.",
    category: "wisdom",
    source: "Panchatantra"
  },
  {
    id: "10",
    sanskrit: "नायकस्य गुणान् वक्तुं के समर्थाः",
    transliteration: "Nāyakasya guṇān vaktuṁ ke samarthāḥ",
    translation: "Who is capable of describing all the qualities of a leader?",
    meaning: "True leadership encompasses countless virtues — vision, courage, wisdom, compassion, and integrity. A great leader inspires by example.",
    category: "leadership",
    source: "Nitishataka"
  },
  {
    id: "11",
    sanskrit: "मित्रं प्रीतिरसायनम्",
    transliteration: "Mitraṁ prītirasāyanam",
    translation: "A friend is an elixir of love",
    meaning: "True friendship is a healing balm for the soul. In the presence of a genuine friend, we find renewal and joy.",
    category: "love",
    source: "Subhashita"
  },
  {
    id: "12",
    sanskrit: "गतं न शोच्यम्",
    transliteration: "Gataṁ na śocyam",
    translation: "Don't grieve over the past",
    meaning: "What has passed cannot be changed. Dwelling on yesterday's sorrows only steals today's peace. Live fully in the present moment.",
    category: "wisdom",
    source: "Chanakya Niti"
  }
];

export const getSubhashitasByCategory = (category: SubhashitaCategory): Subhashita[] => {
  return subhashitas.filter(s => s.category === category);
};

export const getDailySubhashita = (): Subhashita => {
  // Use the day of year to get a consistent daily quote
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return subhashitas[dayOfYear % subhashitas.length];
};

export const getRandomSubhashita = (): Subhashita => {
  return subhashitas[Math.floor(Math.random() * subhashitas.length)];
};
