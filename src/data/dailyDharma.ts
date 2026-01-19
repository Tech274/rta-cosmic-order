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
  | "silence"
  | "charity"
  | "freedom"
  | "honesty"
  | "inclusion"
  | "life"
  | "money"
  | "power"
  | "reason"
  | "self-reliance";

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
  silence: "Silence",
  charity: "Charity",
  freedom: "Freedom",
  honesty: "Honesty",
  inclusion: "Inclusion",
  life: "Life & Death",
  money: "Money",
  power: "Power",
  reason: "Reason",
  "self-reliance": "Self-Reliance"
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
  silence: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  charity: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  freedom: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  honesty: "bg-lime-500/20 text-lime-300 border-lime-500/30",
  inclusion: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  life: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  money: "bg-green-500/20 text-green-300 border-green-500/30",
  power: "bg-red-600/20 text-red-300 border-red-600/30",
  reason: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "self-reliance": "bg-orange-600/20 text-orange-300 border-orange-600/30"
};

export const subhashitas: Subhashita[] = [
  // Original quotes
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
    category: "charity",
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
  },

  // Chanakya Niti quotes
  {
    id: "13",
    sanskrit: "विद्वत्वं च नृपत्वं च नैव तुल्यं कदाचन",
    transliteration: "Vidvatvaṁ ca nṛpatvaṁ ca naiva tulyaṁ kadācana",
    translation: "Scholarship and kingship can never be compared",
    meaning: "The power of knowledge transcends temporal authority. While a king rules his kingdom, a scholar's wisdom influences generations across borders.",
    category: "knowledge",
    source: "Chanakya Niti"
  },
  {
    id: "14",
    sanskrit: "अर्थस्य मूलं राज्यम्",
    transliteration: "Arthasya mūlaṁ rājyam",
    translation: "Good governance is the root of prosperity",
    meaning: "Economic prosperity flows from righteous governance. When leaders rule with dharma, the entire kingdom flourishes.",
    category: "leadership",
    source: "Chanakya Niti"
  },
  {
    id: "15",
    sanskrit: "दुष्टा भार्या शठं मित्रं भृत्यश्चोत्तरदायकः",
    transliteration: "Duṣṭā bhāryā śaṭhaṁ mitraṁ bhṛtyaścottaradāyakaḥ",
    translation: "A wicked spouse, a deceitful friend, and an insolent servant bring misery",
    meaning: "Guard carefully who you allow into your inner circle. Betrayal from those closest causes the deepest wounds.",
    category: "wisdom",
    source: "Chanakya Niti"
  },
  {
    id: "16",
    sanskrit: "न चोरहार्यं न च राजहार्यं न भ्रातृभाज्यं न च भारकारी",
    transliteration: "Na corahāryaṁ na ca rājahāryaṁ na bhrātṛbhājyaṁ na ca bhārakārī",
    translation: "Education cannot be stolen, confiscated, divided, nor is it a burden",
    meaning: "Unlike material wealth, knowledge once gained can never be taken away. It grows when shared and lightens rather than weighs us down.",
    category: "knowledge",
    source: "Chanakya Niti"
  },
  {
    id: "17",
    sanskrit: "अर्थागमो नित्यमरोगिता च प्रिया च भार्या प्रियवादिनी च",
    transliteration: "Arthāgamo nityamarogitā ca priyā ca bhāryā priyavādinī ca",
    translation: "Regular income, good health, a loving spouse, and sweet speech bring happiness",
    meaning: "True contentment comes from simple blessings: financial stability, wellness, harmonious relationships, and kind communication.",
    category: "life",
    source: "Chanakya Niti"
  },
  {
    id: "18",
    sanskrit: "एकेनापि सुपुत्रेण विद्यायुक्तेन साधुना",
    transliteration: "Ekenāpi suputreṇa vidyāyuktena sādhunā",
    translation: "Even one virtuous and learned child brings glory to the family",
    meaning: "Quality surpasses quantity. One child of noble character and wisdom illuminates an entire lineage like the moon lights the night.",
    category: "character",
    source: "Chanakya Niti"
  },
  {
    id: "19",
    sanskrit: "धनहीनो न हीनश्च धनिकः स सुनिश्चितम्",
    transliteration: "Dhanahīno na hīnaśca dhanikaḥ sa suniścitam",
    translation: "One who lacks wealth but has knowledge is truly rich",
    meaning: "Poverty of mind is the only true poverty. A learned person, though materially poor, possesses wealth that cannot be counted or diminished.",
    category: "money",
    source: "Chanakya Niti"
  },
  {
    id: "20",
    sanskrit: "आलस्यं हि मनुष्याणां शरीरस्थो महान् रिपुः",
    transliteration: "Ālasyaṁ hi manuṣyāṇāṁ śarīrastho mahān ripuḥ",
    translation: "Laziness is the greatest enemy dwelling within the body",
    meaning: "Our fiercest adversary lives not outside but within. Sloth destroys potential more surely than any external threat.",
    category: "action",
    source: "Chanakya Niti"
  },

  // Panchatantra quotes
  {
    id: "21",
    sanskrit: "मित्रसंग्रहो बुद्धिः सर्वत्र साधनम्",
    transliteration: "Mitrasaṁgraho buddhiḥ sarvatra sādhanam",
    translation: "The wisdom of gathering friends accomplishes all things",
    meaning: "Building genuine friendships is itself a form of intelligence. Together, we can overcome obstacles that would defeat us alone.",
    category: "love",
    source: "Panchatantra"
  },
  {
    id: "22",
    sanskrit: "अनित्यानि शरीराणि विभवो नैव शाश्वतः",
    transliteration: "Anityāni śarīrāṇi vibhavo naiva śāśvataḥ",
    translation: "Bodies are impermanent, wealth is never eternal",
    meaning: "All that we cling to will pass away. Understanding impermanence is the doorway to living fully in each precious moment.",
    category: "life",
    source: "Panchatantra"
  },
  {
    id: "23",
    sanskrit: "सहसा विदधीत न क्रियाम्",
    transliteration: "Sahasā vidadhīta na kriyām",
    translation: "Never act in haste",
    meaning: "Rushed decisions often lead to regret. Wisdom pauses to consider consequences before committing to action.",
    category: "reason",
    source: "Panchatantra"
  },
  {
    id: "24",
    sanskrit: "अविश्वासः फलं श्रेष्ठम्",
    transliteration: "Aviśvāsaḥ phalaṁ śreṣṭham",
    translation: "Healthy skepticism yields the best results",
    meaning: "Blind trust invites exploitation. Wise caution, tempered with openness, protects us while allowing genuine connections.",
    category: "reason",
    source: "Panchatantra"
  },
  {
    id: "25",
    sanskrit: "स्वभावो नोपदेशेन शक्यते कर्तुमन्यथा",
    transliteration: "Svabhāvo nopadeśena śakyate kartumanyathā",
    translation: "One's nature cannot be changed by mere instruction",
    meaning: "Deep change comes from within, not from external lectures. True transformation requires personal effort and inner awakening.",
    category: "character",
    source: "Panchatantra"
  },
  {
    id: "26",
    sanskrit: "अतिपरिचयादवज्ञा",
    transliteration: "Atiparicayādavajñā",
    translation: "Excessive familiarity breeds contempt",
    meaning: "Even precious relationships require space and respect. Maintain healthy boundaries to preserve the sweetness of connection.",
    category: "love",
    source: "Panchatantra"
  },
  {
    id: "27",
    sanskrit: "एको दोषो गुणसन्निपाते निमज्जतीव",
    transliteration: "Eko doṣo guṇasannipāte nimajjatīva",
    translation: "A single flaw drowns in a sea of virtues",
    meaning: "Focus on strengths rather than weaknesses. Many virtues can outweigh one shortcoming in a person of good character.",
    category: "inclusion",
    source: "Panchatantra"
  },
  {
    id: "28",
    sanskrit: "यस्य बुद्धिर्बलं तस्य निर्बुद्धेस्तु कुतो बलम्",
    transliteration: "Yasya buddhirbalaṁ tasya nirbuddhestut kuto balam",
    translation: "Intelligence is strength; what strength has the foolish?",
    meaning: "Physical might without wisdom is blind force. True power lies in the ability to think clearly and act wisely.",
    category: "knowledge",
    source: "Panchatantra"
  },

  // Hitopadesha quotes
  {
    id: "29",
    sanskrit: "पुस्तकेषु च या विद्या परहस्तेषु च यद्धनम्",
    transliteration: "Pustakeṣu ca yā vidyā parahasteu ca yaddhanam",
    translation: "Knowledge only in books, and wealth in others' hands, are useless when needed",
    meaning: "Applied wisdom matters more than stored information. Knowledge must be internalized and wealth must be accessible to serve us.",
    category: "self-reliance",
    source: "Hitopadesha"
  },
  {
    id: "30",
    sanskrit: "सर्वे गुणाः कांचनमाश्रयन्ते",
    transliteration: "Sarve guṇāḥ kāñcanamāśrayante",
    translation: "All virtues take refuge in gold",
    meaning: "Material resources amplify the ability to do good. Wealth rightly used becomes a vehicle for expressing all virtues.",
    category: "money",
    source: "Hitopadesha"
  },
  {
    id: "31",
    sanskrit: "अनभ्यासे विषं शास्त्रम्",
    transliteration: "Anabhyāse viṣaṁ śāstram",
    translation: "Scripture becomes poison without practice",
    meaning: "Religious knowledge without application corrupts the mind with pride. True learning must be lived, not merely memorized.",
    category: "knowledge",
    source: "Hitopadesha"
  },
  {
    id: "32",
    sanskrit: "वज्रादपि कठोराणि मृदूनि कुसुमादपि",
    transliteration: "Vajrādapi kaṭhorāṇi mṛdūni kusumādapi",
    translation: "Harder than diamond, softer than flowers",
    meaning: "The wise cultivate both strength and gentleness. Knowing when to be firm and when to yield is the art of living.",
    category: "character",
    source: "Hitopadesha"
  },
  {
    id: "33",
    sanskrit: "दातृत्वं प्रियवक्तृत्वं धीरत्वमुचितज्ञता",
    transliteration: "Dātṛtvaṁ priyavaktṛtvaṁ dhīratvamucitajñatā",
    translation: "Generosity, sweet speech, courage, and propriety mark the noble",
    meaning: "Four qualities distinguish the truly refined: giving freely, speaking kindly, acting bravely, and knowing what is appropriate.",
    category: "character",
    source: "Hitopadesha"
  },
  {
    id: "34",
    sanskrit: "न कश्चित्कस्यचिन्मित्रं न कश्चित्कस्यचिद्रिपुः",
    transliteration: "Na kaścitkasyacinmitraṁ na kaścitkasyacidripuḥ",
    translation: "None is inherently friend or foe to another",
    meaning: "Relationships are not fixed. Today's enemy may become tomorrow's friend. Approach all beings with openness.",
    category: "inclusion",
    source: "Hitopadesha"
  },
  {
    id: "35",
    sanskrit: "आपदि मित्रपरीक्षा",
    transliteration: "Āpadi mitraparīkṣā",
    translation: "Adversity is the test of friendship",
    meaning: "True friends reveal themselves in difficult times. Fair-weather companions fade when storms arrive; real friends stand firm.",
    category: "love",
    source: "Hitopadesha"
  },
  {
    id: "36",
    sanskrit: "दुर्जनं सज्जनं कर्तुं उपायो नहि भूतले",
    transliteration: "Durjanaṁ sajjanaṁ kartuṁ upāyo nahi bhūtale",
    translation: "There is no way on earth to make a wicked person good",
    meaning: "While we should help all, recognize that transformation must come from within. You cannot force change upon the unwilling.",
    category: "wisdom",
    source: "Hitopadesha"
  },

  // Additional wisdom quotes
  {
    id: "37",
    sanskrit: "स्वतन्त्रता सर्वसुखप्रदा",
    transliteration: "Svatantratā sarvasukhapradā",
    translation: "Freedom is the giver of all happiness",
    meaning: "True joy springs from liberty — the freedom to think, to choose, and to live according to one's own dharma.",
    category: "freedom",
    source: "Subhashita"
  },
  {
    id: "38",
    sanskrit: "सत्यं ब्रूयात् प्रियं ब्रूयात्",
    transliteration: "Satyaṁ brūyāt priyaṁ brūyāt",
    translation: "Speak truth, speak pleasantly",
    meaning: "Honesty need not be harsh. The art of communication lies in delivering truth with kindness and compassion.",
    category: "honesty",
    source: "Manusmriti"
  },
  {
    id: "39",
    sanskrit: "दानेन तुल्यो न भवेत् समुन्नतिः",
    transliteration: "Dānena tulyo na bhavet samunnatiḥ",
    translation: "No elevation equals that from giving",
    meaning: "The act of giving elevates the giver more than any worldly achievement. Generosity expands the soul.",
    category: "charity",
    source: "Subhashita"
  },
  {
    id: "40",
    sanskrit: "शठे शाठ्यं समाचरेत्",
    transliteration: "Śaṭhe śāṭhyaṁ samācaret",
    translation: "With the crooked, act accordingly",
    meaning: "Wisdom adapts to circumstances. While maintaining integrity, one must respond appropriately to different situations and people.",
    category: "power",
    source: "Chanakya Niti"
  },
  {
    id: "41",
    sanskrit: "आत्मनः प्रतिकूलानि परेषां न समाचरेत्",
    transliteration: "Ātmanaḥ pratikūlāni pareṣāṁ na samācaret",
    translation: "Do not do unto others what is disagreeable to yourself",
    meaning: "The golden rule of dharma: empathy guides action. Before acting, consider how you would feel receiving the same treatment.",
    category: "character",
    source: "Mahabharata"
  },
  {
    id: "42",
    sanskrit: "स्वदेशे पूज्यते राजा विद्वान् सर्वत्र पूज्यते",
    transliteration: "Svadeśe pūjyate rājā vidvān sarvatra pūjyate",
    translation: "A king is honored in his own land, but a scholar is honored everywhere",
    meaning: "Political power is local and temporary; wisdom is universal and enduring. The learned are respected across all boundaries.",
    category: "knowledge",
    source: "Chanakya Niti"
  },
  {
    id: "43",
    sanskrit: "अलसस्य कुतो विद्या अविद्यस्य कुतो धनम्",
    transliteration: "Alasasya kuto vidyā avidyasya kuto dhanam",
    translation: "Where is knowledge for the lazy? Where is wealth for the ignorant?",
    meaning: "Success requires both effort and wisdom. Laziness blocks learning, and ignorance blocks prosperity.",
    category: "self-reliance",
    source: "Chanakya Niti"
  },
  {
    id: "44",
    sanskrit: "मृत्युर्जन्मवतां वार्ता",
    transliteration: "Mṛtyurjanmavatāṁ vārtā",
    translation: "Death is the news for all who are born",
    meaning: "Mortality is the great equalizer. Remembering death reminds us to live meaningfully and let go of petty concerns.",
    category: "life",
    source: "Panchatantra"
  },
  {
    id: "45",
    sanskrit: "वसुधैव कुटुम्बकम्",
    transliteration: "Vasudhaiva kuṭumbakam",
    translation: "The world is one family",
    meaning: "Beyond all divisions of nation, race, and creed, we are one human family sharing one home. This vision is the foundation of universal harmony.",
    category: "inclusion",
    source: "Maha Upanishad"
  },

  // Additional Chanakya Niti
  {
    id: "46",
    sanskrit: "परस्परस्य मर्माणि ये भाषन्ते नराधमाः",
    transliteration: "Parasparasya marmāṇi ye bhāṣante narādhamāḥ",
    translation: "Those who reveal others' secrets are the lowest of men",
    meaning: "Betraying confidences destroys trust and marks a person as untrustworthy. Guard the secrets entrusted to you as sacred.",
    category: "honesty",
    source: "Chanakya Niti"
  },
  {
    id: "47",
    sanskrit: "लोकयात्रा भयं लज्जा दाक्षिण्यं त्यागशीलता",
    transliteration: "Lokayātrā bhayaṁ lajjā dākṣiṇyaṁ tyāgaśīlatā",
    translation: "Worldly conduct, fear of wrongdoing, modesty, courtesy, and generosity",
    meaning: "These five qualities define a cultured person. Together they form the foundation of civilized society.",
    category: "character",
    source: "Chanakya Niti"
  },
  {
    id: "48",
    sanskrit: "न विश्वसेत् कुमित्रे च मित्रे चापि न विश्वसेत्",
    transliteration: "Na viśvaset kumitre ca mitre cāpi na viśvaset",
    translation: "Trust not a bad friend, and trust not even a good friend too much",
    meaning: "Prudent caution protects the wise. Even trusted friends may falter; maintain appropriate boundaries.",
    category: "wisdom",
    source: "Chanakya Niti"
  },
  {
    id: "49",
    sanskrit: "विपदि धैर्यमथाभ्युदये क्षमा",
    transliteration: "Vipadi dhairyamathābhyudaye kṣamā",
    translation: "Courage in adversity, forgiveness in prosperity",
    meaning: "The wise remain steadfast when times are hard and humble when fortune smiles. This balance reflects true maturity.",
    category: "courage",
    source: "Chanakya Niti"
  },
  {
    id: "50",
    sanskrit: "सेवितव्यो महावृक्षः फलच्छायासमन्वितः",
    transliteration: "Sevitavyo mahāvṛkṣaḥ phalacchāyāsamanvitaḥ",
    translation: "Seek shelter under a great tree that provides both fruit and shade",
    meaning: "Choose mentors and associations wisely. The truly great offer both tangible benefits and protective guidance.",
    category: "leadership",
    source: "Chanakya Niti"
  },

  // Additional Panchatantra
  {
    id: "51",
    sanskrit: "अर्थार्थी जीवलोकोऽयं श्मशानमपि सेवते",
    transliteration: "Arthārthī jīvaloko'yaṁ śmaśānamapi sevate",
    translation: "For wealth, even the cremation ground is visited",
    meaning: "The pursuit of wealth drives humans to extreme lengths. Observe how attachment to money shapes behavior.",
    category: "money",
    source: "Panchatantra"
  },
  {
    id: "52",
    sanskrit: "अनागतं यः कुरुते स शोभते",
    transliteration: "Anāgataṁ yaḥ kurute sa śobhate",
    translation: "One who prepares for the future prospers",
    meaning: "Foresight and planning distinguish the wise. Prepare today for tomorrow's challenges.",
    category: "action",
    source: "Panchatantra"
  },
  {
    id: "53",
    sanskrit: "अश्वं नैव गजं नैव व्याघ्रं नैव च नैव च",
    transliteration: "Aśvaṁ naiva gajaṁ naiva vyāghraṁ naiva ca naiva ca",
    translation: "Not a horse, not an elephant, not even a tiger",
    meaning: "A book is the best companion — it never tires, never disappoints, and travels easily. Unlike animals, books require no maintenance.",
    category: "knowledge",
    source: "Panchatantra"
  },
  {
    id: "54",
    sanskrit: "संघे शक्तिः कलौ युगे",
    transliteration: "Saṁghe śaktiḥ kalau yuge",
    translation: "In unity there is strength, especially in this age",
    meaning: "Collective action accomplishes what individuals cannot. In difficult times, solidarity becomes even more essential.",
    category: "leadership",
    source: "Panchatantra"
  },
  {
    id: "55",
    sanskrit: "दुर्बलस्य बलं राजा बालानां रोदनं बलम्",
    transliteration: "Durbalasya balaṁ rājā bālānāṁ rodanaṁ balam",
    translation: "The king is the strength of the weak; crying is the strength of children",
    meaning: "Each being has appropriate means of protection. Recognize and use the resources available to your situation.",
    category: "power",
    source: "Panchatantra"
  },

  // Additional Hitopadesha
  {
    id: "56",
    sanskrit: "उपकारिषु यः साधुः साधुत्वे तत्र का कथा",
    transliteration: "Upakāriṣu yaḥ sādhuḥ sādhutve tatra kā kathā",
    translation: "Being good to benefactors is no great virtue",
    meaning: "True nobility shows in kindness to those who cannot repay. Anyone can reciprocate; the saint gives without expectation.",
    category: "charity",
    source: "Hitopadesha"
  },
  {
    id: "57",
    sanskrit: "येषां न विद्या न तपो न दानं ज्ञानं न शीलं न गुणो न धर्मः",
    transliteration: "Yeṣāṁ na vidyā na tapo na dānaṁ jñānaṁ na śīlaṁ na guṇo na dharmaḥ",
    translation: "Those without learning, austerity, charity, wisdom, character, virtue, or dharma",
    meaning: "Such persons burden the earth like beasts in human form. Cultivate at least one noble quality.",
    category: "character",
    source: "Hitopadesha"
  },
  {
    id: "58",
    sanskrit: "यथा ह्येकेन चक्रेण न रथस्य गतिर्भवेत्",
    transliteration: "Yathā hyekena cakreṇa na rathasya gatirbhavet",
    translation: "As a chariot cannot move with one wheel",
    meaning: "Success requires multiple supporting elements working together. Balance theory with practice, knowledge with action.",
    category: "wisdom",
    source: "Hitopadesha"
  },
  {
    id: "59",
    sanskrit: "न हि कश्चित् विजानाति किं कस्य श्वो भविष्यति",
    transliteration: "Na hi kaścit vijānāti kiṁ kasya śvo bhaviṣyati",
    translation: "No one knows what tomorrow holds for anyone",
    meaning: "Life's uncertainty counsels both humility and urgency. Do good today; tomorrow is promised to none.",
    category: "life",
    source: "Hitopadesha"
  },
  {
    id: "60",
    sanskrit: "सुखार्थिनः कुतो विद्या विद्यार्थिनः कुतो सुखम्",
    transliteration: "Sukhārthinaḥ kuto vidyā vidyārthinaḥ kuto sukham",
    translation: "Where is knowledge for the comfort-seeker? Where is comfort for the knowledge-seeker?",
    meaning: "Learning demands sacrifice. Those unwilling to endure hardship cannot attain wisdom; those pursuing wisdom must accept discomfort.",
    category: "perseverance",
    source: "Hitopadesha"
  },

  // Additional wisdom from various sources
  {
    id: "61",
    sanskrit: "यस्मिन् देशे न सम्मानो न वृत्तिर्न च बान्धवाः",
    transliteration: "Yasmin deśe na sammāno na vṛttirna ca bāndhavāḥ",
    translation: "Where there is no respect, no livelihood, and no relatives",
    meaning: "Such a place should be abandoned. A wise person seeks environments that support growth and wellbeing.",
    category: "freedom",
    source: "Chanakya Niti"
  },
  {
    id: "62",
    sanskrit: "स्वयं कर्म करोत्यात्मा स्वयं तत्फलमश्नुते",
    transliteration: "Svayaṁ karma karotyātmā svayaṁ tatphalamaśnute",
    translation: "The self performs actions and the self enjoys their fruits",
    meaning: "We are the architects of our destiny. No one else creates our karma; no one else can liberate us from it.",
    category: "self-reliance",
    source: "Mahabharata"
  },
  {
    id: "63",
    sanskrit: "तृणं ब्रह्मविदः स्वर्गस्तृणं शूरस्य जीवितम्",
    transliteration: "Tṛṇaṁ brahmavidaḥ svargastṛṇaṁ śūrasya jīvitam",
    translation: "Heaven is straw to the knower of Brahman; life is straw to the hero",
    meaning: "Those who have attained the highest wisdom care nothing for lesser rewards. The truly brave are indifferent to death.",
    category: "courage",
    source: "Subhashita"
  },
  {
    id: "64",
    sanskrit: "अयं निजः परो वेति गणना लघुचेतसाम्",
    transliteration: "Ayaṁ nijaḥ paro veti gaṇanā laghucetasām",
    translation: "'This one is mine, that one is a stranger' — such thinking belongs to the small-minded",
    meaning: "Narrow identity creates division. The expansive heart sees all beings as family.",
    category: "inclusion",
    source: "Maha Upanishad"
  },
  {
    id: "65",
    sanskrit: "शरीरमाद्यं खलु धर्मसाधनम्",
    transliteration: "Śarīramādyaṁ khalu dharmasādhanam",
    translation: "The body is indeed the primary instrument for practicing dharma",
    meaning: "Physical health enables spiritual practice. Care for the body as the temple that houses the soul.",
    category: "life",
    source: "Kumarasambhava"
  },
  {
    id: "66",
    sanskrit: "अकृत्वा परसन्तापमगत्वा खलनम्रताम्",
    transliteration: "Akṛtvā parasantāpamagatvā khalanammratām",
    translation: "Without causing others pain, without bowing to the wicked",
    meaning: "One can succeed ethically. Neither harming others nor compromising with evil is necessary for prosperity.",
    category: "honesty",
    source: "Subhashita"
  },
  {
    id: "67",
    sanskrit: "अर्थस्य पुरुषो दासो दासस्त्वर्थो न कस्यचित्",
    transliteration: "Arthasya puruṣo dāso dāsastvartho na kasyacit",
    translation: "Man is the slave of money; money is nobody's slave",
    meaning: "Wealth controls its possessor, not the reverse. Recognize this dynamic to avoid becoming money's servant.",
    category: "money",
    source: "Chanakya Niti"
  },
  {
    id: "68",
    sanskrit: "परित्यज्य गुणान् सर्वान् दोषान् य इच्छति",
    transliteration: "Parityajya guṇān sarvān doṣān ya icchati",
    translation: "One who ignores virtues and seeks only faults",
    meaning: "Such a person poisons their own mind. The fault-finder destroys their own peace before harming others.",
    category: "reason",
    source: "Subhashita"
  },
  {
    id: "69",
    sanskrit: "नास्ति विद्यासमो बन्धुर्नास्ति विद्यासमः सुहृत्",
    transliteration: "Nāsti vidyāsamo bandhurnāsti vidyāsamaḥ suhṛt",
    translation: "There is no relative like knowledge, no friend like learning",
    meaning: "Education is the most reliable companion through life's journey. Unlike people, knowledge never abandons us.",
    category: "knowledge",
    source: "Chanakya Niti"
  },
  {
    id: "70",
    sanskrit: "कालः पचति भूतानि कालः संहरते प्रजाः",
    transliteration: "Kālaḥ pacati bhūtāni kālaḥ saṁharate prajāḥ",
    translation: "Time cooks all beings, time takes away all creatures",
    meaning: "Nothing escapes time's relentless march. Understanding impermanence liberates us from futile attachment.",
    category: "life",
    source: "Mahabharata"
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

export const getRandomSubhashita = (category?: SubhashitaCategory): Subhashita => {
  const filtered = category ? getSubhashitasByCategory(category) : subhashitas;
  return filtered[Math.floor(Math.random() * filtered.length)];
};
