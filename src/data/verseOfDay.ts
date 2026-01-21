import { Verse } from "./scriptures";

export interface VerseOfDay {
  id: string;
  scripture: string;
  scriptureSanskrit: string;
  chapter?: number;
  chapterName?: string;
  verse: Verse;
  source: string; // e.g., "Bhagavad Gita 2.47" or "Isha Upanishad 1"
}

// Curated collection of profound verses for daily inspiration
export const verseCollection: VerseOfDay[] = [
  // Bhagavad Gita verses
  {
    id: "gita-2-47",
    scripture: "Bhagavad Gita",
    scriptureSanskrit: "श्रीमद्भगवद्गीता",
    chapter: 2,
    chapterName: "Sankhya Yoga",
    source: "Bhagavad Gita 2.47",
    verse: {
      number: 47,
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
      transliteration: "karmaṇy evādhikāras te mā phaleṣu kadācana mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi",
      meaning: "You have the right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
      commentary: "The essence of Karma Yoga—action without attachment to results."
    }
  },
  {
    id: "gita-2-14",
    scripture: "Bhagavad Gita",
    scriptureSanskrit: "श्रीमद्भगवद्गीता",
    chapter: 2,
    chapterName: "Sankhya Yoga",
    source: "Bhagavad Gita 2.14",
    verse: {
      number: 14,
      sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः। आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥",
      transliteration: "mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ āgamāpāyino 'nityās tāṁs titikṣasva bhārata",
      meaning: "The contact of the senses with their objects gives rise to feelings of cold and heat, pleasure and pain. They are transitory, arising and passing away. Bear them patiently, O Bharata.",
      commentary: "Equanimity in the face of life's dualities."
    }
  },
  {
    id: "gita-4-7",
    scripture: "Bhagavad Gita",
    scriptureSanskrit: "श्रीमद्भगवद्गीता",
    chapter: 4,
    chapterName: "Jnana Karma Sannyasa Yoga",
    source: "Bhagavad Gita 4.7",
    verse: {
      number: 7,
      sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
      transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata abhyutthānam adharmasya tadātmānaṁ sṛjāmy aham",
      meaning: "Whenever there is a decline of righteousness and rise of unrighteousness, O Arjuna, then I manifest Myself.",
      commentary: "The divine promise of restoration of dharma."
    }
  },
  {
    id: "gita-6-5",
    scripture: "Bhagavad Gita",
    scriptureSanskrit: "श्रीमद्भगवद्गीता",
    chapter: 6,
    chapterName: "Dhyana Yoga",
    source: "Bhagavad Gita 6.5",
    verse: {
      number: 5,
      sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
      transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet ātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ",
      meaning: "Let one lift oneself by one's own self; let one not degrade oneself. For the self alone is the friend of the self, and the self alone is the enemy of the self.",
      commentary: "Self-reliance and inner strength on the spiritual path."
    }
  },
  {
    id: "gita-9-22",
    scripture: "Bhagavad Gita",
    scriptureSanskrit: "श्रीमद्भगवद्गीता",
    chapter: 9,
    chapterName: "Raja Vidya Raja Guhya Yoga",
    source: "Bhagavad Gita 9.22",
    verse: {
      number: 22,
      sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते। तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",
      transliteration: "ananyāś cintayanto māṁ ye janāḥ paryupāsate teṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham",
      meaning: "To those who worship Me alone, thinking of no other, who are ever devoted, I secure what they lack and preserve what they have.",
      commentary: "The divine promise of protection for devoted ones."
    }
  },
  {
    id: "gita-18-66",
    scripture: "Bhagavad Gita",
    scriptureSanskrit: "श्रीमद्भगवद्गीता",
    chapter: 18,
    chapterName: "Moksha Sannyasa Yoga",
    source: "Bhagavad Gita 18.66",
    verse: {
      number: 66,
      sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
      transliteration: "sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja ahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ",
      meaning: "Abandon all varieties of dharma and surrender unto Me alone. I shall deliver you from all sinful reactions; do not fear.",
      commentary: "The ultimate instruction—complete surrender to the Divine."
    }
  },
  // Upanishad verses
  {
    id: "isha-1",
    scripture: "Isha Upanishad",
    scriptureSanskrit: "ईशावास्योपनिषद्",
    source: "Isha Upanishad 1",
    verse: {
      number: 1,
      sanskrit: "ईशावास्यमिदं सर्वं यत्किञ्च जगत्यां जगत्। तेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम्॥",
      transliteration: "īśāvāsyam idaṁ sarvaṁ yat kiñca jagatyāṁ jagat tena tyaktena bhuñjīthā mā gṛdhaḥ kasya svid dhanam",
      meaning: "All this, whatever moves in this moving world, is pervaded by the Lord. Enjoy it by renunciation. Do not covet anyone's wealth.",
      commentary: "The opening verse establishing divine immanence and the spirit of renunciation."
    }
  },
  {
    id: "kena-1-1",
    scripture: "Kena Upanishad",
    scriptureSanskrit: "केनोपनिषद्",
    source: "Kena Upanishad 1.1",
    verse: {
      number: 1,
      sanskrit: "केनेषितं पतति प्रेषितं मनः केन प्राणः प्रथमः प्रैति युक्तः। केनेषितां वाचमिमां वदन्ति चक्षुः श्रोत्रं क उ देवो युनक्ति॥",
      transliteration: "keneṣitaṁ patati preṣitaṁ manaḥ kena prāṇaḥ prathamaḥ praiti yuktaḥ keneṣitāṁ vācam imāṁ vadanti cakṣuḥ śrotraṁ ka u devo yunakti",
      meaning: "By whom commanded does the mind go forth? By whom ordered does the first breath proceed? By whom is this speech uttered that men speak? What god directs the eyes and ears?",
      commentary: "The fundamental inquiry into the nature of consciousness behind all faculties."
    }
  },
  {
    id: "katha-2-23",
    scripture: "Katha Upanishad",
    scriptureSanskrit: "कठोपनिषद्",
    source: "Katha Upanishad 2.23",
    verse: {
      number: 23,
      sanskrit: "नायमात्मा प्रवचनेन लभ्यो न मेधया न बहुना श्रुतेन। यमेवैष वृणुते तेन लभ्यस्तस्यैष आत्मा विवृणुते तनूं स्वाम्॥",
      transliteration: "nāyam ātmā pravacanena labhyo na medhayā na bahunā śrutena yam evaiṣa vṛṇute tena labhyas tasyaiṣa ātmā vivṛṇute tanūṁ svām",
      meaning: "This Self cannot be attained by study, nor by intellect, nor by much hearing. Only the one whom the Self chooses can attain It; to such a one the Self reveals Its own form.",
      commentary: "Grace and sincere seeking are the keys to Self-realization."
    }
  },
  {
    id: "mundaka-3-1-6",
    scripture: "Mundaka Upanishad",
    scriptureSanskrit: "मुण्डकोपनिषद्",
    source: "Mundaka Upanishad 3.1.6",
    verse: {
      number: 6,
      sanskrit: "सत्येन लभ्यस्तपसा ह्येष आत्मा सम्यग्ज्ञानेन ब्रह्मचर्येण नित्यम्। अन्तःशरीरे ज्योतिर्मयो हि शुभ्रो यं पश्यन्ति यतयः क्षीणदोषाः॥",
      transliteration: "satyena labhyas tapasā hy eṣa ātmā samyag jñānena brahmacaryeṇa nityam antaḥ śarīre jyotirmayo hi śubhro yaṁ paśyanti yatayaḥ kṣīṇadoṣāḥ",
      meaning: "This Self is attained by truth, by austerity, by right knowledge, and by constant celibacy. Within the body, shining and pure, It is seen by the seekers whose faults are eliminated.",
      commentary: "The qualifications for realizing the luminous Self within."
    }
  },
  {
    id: "brihadaranyaka-1-3-28",
    scripture: "Brihadaranyaka Upanishad",
    scriptureSanskrit: "बृहदारण्यकोपनिषद्",
    source: "Brihadaranyaka Upanishad 1.3.28",
    verse: {
      number: 28,
      sanskrit: "असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्मा अमृतं गमय॥",
      transliteration: "asato mā sad gamaya tamaso mā jyotir gamaya mṛtyor mā amṛtaṁ gamaya",
      meaning: "Lead me from the unreal to the Real. Lead me from darkness to Light. Lead me from death to Immortality.",
      commentary: "The timeless prayer for spiritual awakening and liberation."
    }
  },
  {
    id: "mandukya-7",
    scripture: "Mandukya Upanishad",
    scriptureSanskrit: "माण्डूक्योपनिषद्",
    source: "Mandukya Upanishad 7",
    verse: {
      number: 7,
      sanskrit: "नान्तःप्रज्ञं न बहिष्प्रज्ञं नोभयतःप्रज्ञं न प्रज्ञानघनं न प्रज्ञं नाप्रज्ञम्। अदृष्टमव्यवहार्यमग्राह्यमलक्षणमचिन्त्यमव्यपदेश्यमेकात्मप्रत्ययसारं प्रपञ्चोपशमं शान्तं शिवमद्वैतं चतुर्थं मन्यन्ते स आत्मा स विज्ञेयः॥",
      transliteration: "nāntaḥ-prajñaṁ na bahiṣ-prajñaṁ nobhayataḥ-prajñaṁ na prajñāna-ghanaṁ na prajñaṁ nāprajñam adṛṣṭam avyavahāryam agrāhyam alakṣaṇam acintyam avyapadeśyam ekātma-pratyaya-sāraṁ prapañcopaśamaṁ śāntaṁ śivam advaitaṁ caturthaṁ manyante sa ātmā sa vijñeyaḥ",
      meaning: "That which is not conscious of the internal world, nor conscious of the external world, nor conscious of both, nor a mass of consciousness, nor conscious, nor unconscious—which is unseen, beyond relation, beyond grasp, without attributes, unthinkable, indescribable, whose sole essence is the experience of its own self, the cessation of all phenomena, peaceful, blissful, non-dual—that is the Fourth (Turiya). That is the Self. That is to be known.",
      commentary: "The profound description of the Fourth State—pure consciousness beyond waking, dream, and deep sleep."
    }
  },
  {
    id: "taittiriya-2-1",
    scripture: "Taittiriya Upanishad",
    scriptureSanskrit: "तैत्तिरीयोपनिषद्",
    source: "Taittiriya Upanishad 2.1",
    verse: {
      number: 1,
      sanskrit: "सत्यं ज्ञानमनन्तं ब्रह्म। यो वेद निहितं गुहायां परमे व्योमन्। सोऽश्नुते सर्वान् कामान् सह ब्रह्मणा विपश्चितेति॥",
      transliteration: "satyaṁ jñānam anantaṁ brahma yo veda nihitaṁ guhāyāṁ parame vyoman so 'śnute sarvān kāmān saha brahmaṇā vipaściteti",
      meaning: "Brahman is Truth, Knowledge, Infinite. One who knows It as hidden in the cave of the heart, in the highest heaven, realizes all desires together with the omniscient Brahman.",
      commentary: "The nature of Brahman and the fulfillment that comes from knowing It."
    }
  },
  {
    id: "chandogya-6-8-7",
    scripture: "Chandogya Upanishad",
    scriptureSanskrit: "छान्दोग्योपनिषद्",
    source: "Chandogya Upanishad 6.8.7",
    verse: {
      number: 7,
      sanskrit: "स य एषोऽणिमैतदात्म्यमिदं सर्वं तत्सत्यं स आत्मा तत्त्वमसि श्वेतकेतो॥",
      transliteration: "sa ya eṣo 'ṇimaitad ātmyam idaṁ sarvaṁ tat satyaṁ sa ātmā tat tvam asi śvetaketo",
      meaning: "That which is the subtle essence, this whole world has That as its Self. That is the Truth. That is the Self. Thou art That, Shvetaketu.",
      commentary: "One of the four Mahavakyas—the great declarations of Vedantic truth."
    }
  },
  {
    id: "gita-3-21",
    scripture: "Bhagavad Gita",
    scriptureSanskrit: "श्रीमद्भगवद्गीता",
    chapter: 3,
    chapterName: "Karma Yoga",
    source: "Bhagavad Gita 3.21",
    verse: {
      number: 21,
      sanskrit: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः। स यत्प्रमाणं कुरुते लोकस्तदनुवर्तते॥",
      transliteration: "yad yad ācarati śreṣṭhas tat tad evetaro janaḥ sa yat pramāṇaṁ kurute lokas tad anuvartate",
      meaning: "Whatever a great man does, others follow. Whatever standards he sets, the world pursues.",
      commentary: "The responsibility of leaders to set righteous examples."
    }
  },
  {
    id: "gita-5-18",
    scripture: "Bhagavad Gita",
    scriptureSanskrit: "श्रीमद्भगवद्गीता",
    chapter: 5,
    chapterName: "Karma Sannyasa Yoga",
    source: "Bhagavad Gita 5.18",
    verse: {
      number: 18,
      sanskrit: "विद्याविनयसम्पन्ने ब्राह्मणे गवि हस्तिनि। शुनि चैव श्वपाके च पण्डिताः समदर्शिनः॥",
      transliteration: "vidyā-vinaya-sampanne brāhmaṇe gavi hastini śuni caiva śva-pāke ca paṇḍitāḥ sama-darśinaḥ",
      meaning: "The wise see with equal vision a learned and humble Brahmin, a cow, an elephant, a dog, and an outcaste.",
      commentary: "Spiritual equality of all beings in the eyes of a realized soul."
    }
  }
];

// Get verse of the day based on the date
export function getVerseOfDay(): VerseOfDay {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  const index = dayOfYear % verseCollection.length;
  return verseCollection[index];
}

// Get a random verse (for refresh functionality)
export function getRandomVerse(): VerseOfDay {
  const randomIndex = Math.floor(Math.random() * verseCollection.length);
  return verseCollection[randomIndex];
}
