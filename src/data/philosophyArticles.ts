export interface CrossReference {
  concept: string;
  description: string;
  articleId?: string;
}

export interface RecommendedRead {
  type: "book" | "audiobook" | "course" | "scripture";
  id: string;
  title: string;
  author?: string;
}

export interface AudiobookSnippet {
  audiobookId: string;
  chapterNumber: number;
  title: string;
  duration?: string;
}

export interface PhilosophyArticle {
  id: string;
  title: string;
  sanskritTitle?: string;
  transliteration?: string;
  canonicalDefinition: string;
  historicalOrigins: string;
  keyPrinciples: string[];
  relationshipToDharma?: string;
  implicationsForEthics?: string;
  cosmologicalSignificance?: string;
  crossReferences: CrossReference[];
  citationList: string[];
  recommendedReads: RecommendedRead[];
  relatedAudiobookSnippets?: AudiobookSnippet[];
  category: "metaphysics" | "ethics" | "cosmology" | "ritual" | "liberation";
  tradition?: string[];
  tags: string[];
}

export const philosophyArticles: PhilosophyArticle[] = [
  {
    id: "rta-cosmic-order",
    title: "ṚTA — The Order Behind Dharma",
    sanskritTitle: "ऋत",
    transliteration: "Ṛta",
    canonicalDefinition: "Ṛta is the cosmic principle of natural order that regulates and coordinates the operation of the universe and everything within it. It is the truth that underlies the physical, moral, and ritual dimensions of existence — the invisible law that ensures the sun rises, seasons turn, and ethical actions bear fruit.",
    historicalOrigins: "The concept of Ṛta appears prominently in the Ṛgveda (c. 1500–1200 BCE), where it denotes the dynamic cosmic order maintained by the gods, particularly Varuṇa and Mitra. Before the later emphasis on Dharma, Ṛta was the supreme regulatory principle — the truth (satya) embedded in the fabric of reality. The term derives from the root 'ṛ' meaning 'to move' or 'to flow', suggesting cosmic motion and regularity.",
    keyPrinciples: [
      "The universe operates according to inherent, discoverable laws",
      "Moral order is inseparable from cosmic order",
      "Truth (Satya) and Ṛta are intimately connected",
      "Violations of Ṛta lead to cosmic and personal imbalance",
      "Ritual (Yajña) participates in maintaining Ṛta"
    ],
    relationshipToDharma: "While Ṛta represents the cosmic, impersonal order of the universe, Dharma evolved as its socio-ethical manifestation. Dharma can be understood as Ṛta applied to human conduct — the individual's participation in maintaining cosmic harmony. In later texts, Dharma largely absorbed and replaced Ṛta in common discourse, but Ṛta remains the deeper metaphysical foundation.",
    implicationsForEthics: "If Ṛta governs all reality, then ethical living is not merely following rules but aligning with the fundamental nature of existence. Unethical actions (anṛta) are not just socially wrong but cosmically dissonant — they disturb the very fabric of reality. This understanding elevates ethics from convention to metaphysical necessity.",
    cosmologicalSignificance: "Ṛta explains why the cosmos is not chaos. The regular movement of celestial bodies, the cycle of seasons, the predictability of natural phenomena — all are manifestations of Ṛta. The Vedic seers observed this order and concluded that the same principle must govern the invisible realms of morality and spirituality.",
    crossReferences: [
      {
        concept: "Dharma",
        description: "The socio-ethical evolution of Ṛta, governing individual and social conduct",
        articleId: "dharma-eternal-law"
      },
      {
        concept: "Karma",
        description: "The mechanism by which Ṛta operates in human affairs — actions and their inevitable consequences",
        articleId: "karma-action-consequence"
      },
      {
        concept: "Yajña",
        description: "Ritual sacrifice as humanity's participation in maintaining cosmic order",
        articleId: "yajna-sacred-exchange"
      },
      {
        concept: "Satya",
        description: "Truth as the expression of Ṛta in speech and thought",
        articleId: "satya-truth-principle"
      },
      {
        concept: "Varuṇa",
        description: "The Vedic deity who guards and enforces Ṛta",
        articleId: "varuna-cosmic-guardian"
      }
    ],
    citationList: [
      "Ṛgveda 1.1.8 — 'Through Ṛta, the waters flow; through Ṛta, the sun traverses the sky'",
      "Ṛgveda 4.23.9 — 'Ṛta is the foundation of the earth; by Ṛta the heavens are upheld'",
      "Ṛgveda 10.190.1 — 'From Ṛta was born Satya (Truth)'",
      "Brereton, Joel P. 'Ṛta and Dharma' in The Fruits of Our Desiring (2004)",
      "Oldenberg, Hermann. Die Religion des Veda (1894)",
      "Brown, W. Norman. 'The Ṛgvedic Equivalent for Hell' in JAOS 61.2 (1941)"
    ],
    recommendedReads: [
      { type: "scripture", id: "rgveda", title: "Ṛgveda — Selected Hymns", author: "Various Seers" },
      { type: "book", id: "fruits-desiring", title: "The Fruits of Our Desiring", author: "Joel P. Brereton" },
      { type: "book", id: "vision-vedic-poets", title: "The Vision of the Vedic Poets", author: "Jan Gonda" },
      { type: "course", id: "vedic-worldview", title: "The Vedic Worldview: An Introduction" }
    ],
    relatedAudiobookSnippets: [
      { audiobookId: "rgveda-audio", chapterNumber: 1, title: "Agni Sūkta — Invocation of Sacred Fire", duration: "12:34" },
      { audiobookId: "upanishads-audio", chapterNumber: 4, title: "Īśā Upaniṣad — The Lord in All Things", duration: "18:22" }
    ],
    category: "metaphysics",
    tradition: ["Vedic", "Pre-Classical"],
    tags: ["cosmic order", "vedic", "satya", "ethics", "cosmology"]
  },
  {
    id: "dharma-eternal-law",
    title: "Dharma — The Eternal Law",
    sanskritTitle: "धर्म",
    transliteration: "Dharma",
    canonicalDefinition: "Dharma is one of the most complex and untranslatable terms in Indian philosophy. At its core, it signifies 'that which upholds' — the cosmic law, moral order, righteous conduct, sacred duty, and the essential nature of beings and things. It is simultaneously descriptive (what is) and prescriptive (what ought to be).",
    historicalOrigins: "Derived from the Sanskrit root 'dhṛ' meaning 'to hold, maintain, keep', Dharma evolved from the Vedic concept of Ṛta. In the Dharmasūtras (c. 600–200 BCE) and Dharmaśāstras, it became codified into elaborate systems of law and ethics. The Mahābhārata famously declares: 'Dharma is subtle' (sūkṣmo dharmaḥ), acknowledging its irreducible complexity.",
    keyPrinciples: [
      "Dharma varies according to context (deśa, kāla, pātra)",
      "Universal (sādhāraṇa) and particular (viśeṣa) duties coexist",
      "Svadharma: one's own dharma takes precedence over another's",
      "Dharma upholds society, cosmos, and individual well-being",
      "Conflict between dharmas requires wisdom (viveka) to resolve"
    ],
    relationshipToDharma: "As the central organizing concept, Dharma relates to all other principles as their ethical and practical application.",
    implicationsForEthics: "Dharma introduces contextual ethics — what is right depends on who you are, when you act, and under what circumstances. This is neither moral relativism nor rigid absolutism, but a sophisticated middle path that honors both universal principles and particular situations.",
    crossReferences: [
      {
        concept: "Ṛta",
        description: "The cosmic order from which Dharma evolved",
        articleId: "rta-cosmic-order"
      },
      {
        concept: "Karma",
        description: "Actions governed by Dharma produce their inevitable fruits",
        articleId: "karma-action-consequence"
      },
      {
        concept: "Mokṣa",
        description: "Liberation — the ultimate purpose beyond worldly Dharma",
        articleId: "moksha-liberation"
      },
      {
        concept: "Svadharma",
        description: "One's own particular duty based on nature and station",
        articleId: "svadharma-own-duty"
      }
    ],
    citationList: [
      "Bhagavad Gītā 3.35 — 'Better is one's own dharma, though imperfect, than the dharma of another well performed'",
      "Mahābhārata, Śānti Parva 109.10 — 'Dharma exists for the welfare of all beings'",
      "Taittirīya Upaniṣad 1.11 — 'Satyaṃ vada, dharmaṃ cara' (Speak truth, practice dharma)",
      "Olivelle, Patrick. Dharmasūtras: The Law Codes of Ancient India (1999)",
      "Davis, Donald R. The Spirit of Hindu Law (2010)"
    ],
    recommendedReads: [
      { type: "scripture", id: "bhagavad-gita", title: "Bhagavad Gītā", author: "Traditional" },
      { type: "book", id: "spirit-hindu-law", title: "The Spirit of Hindu Law", author: "Donald R. Davis Jr." },
      { type: "book", id: "dharmasutras", title: "Dharmasūtras", author: "Patrick Olivelle (trans.)" }
    ],
    category: "ethics",
    tradition: ["Vedic", "Smārta", "All Schools"],
    tags: ["duty", "law", "ethics", "conduct", "svadharma"]
  },
  {
    id: "karma-action-consequence",
    title: "Karma — Action and Consequence",
    sanskritTitle: "कर्म",
    transliteration: "Karma",
    canonicalDefinition: "Karma is the principle that every action produces consequences that return to the actor, not as punishment or reward from an external deity, but as the natural operation of cosmic law. It is the ethical mechanism of Ṛta applied to intentional action — the universe's moral memory.",
    historicalOrigins: "The term 'karma' originally meant 'ritual action' in the Vedic context, particularly sacrificial rites. Its transformation into the doctrine of moral causation appears clearly in the early Upaniṣads (c. 800–500 BCE), especially the Bṛhadāraṇyaka and Chāndogya Upaniṣads. The Buddha and Mahāvīra further developed karma theory, which then re-entered Hindu thought in enriched form.",
    keyPrinciples: [
      "Actions (and their intentions) create impressions (saṃskāras) in the mind",
      "These impressions generate tendencies (vāsanās) that shape future actions",
      "Karma operates across multiple lifetimes (saṃsāra)",
      "Three types: Sañcita (accumulated), Prārabdha (fructifying), Kriyamāṇa (being created)",
      "Karma can be transformed through knowledge, devotion, or selfless action"
    ],
    implicationsForEthics: "Karma removes the need for an external judge — the universe itself is the moral accountant. This creates radical personal responsibility while also offering hope: one's situation is not fixed but is the result of past actions and can be changed through present ones. Karma is not fatalism but empowerment.",
    crossReferences: [
      {
        concept: "Ṛta",
        description: "The cosmic order that karma expresses in the moral realm",
        articleId: "rta-cosmic-order"
      },
      {
        concept: "Saṃsāra",
        description: "The cycle of rebirth driven by karma",
        articleId: "samsara-cycle"
      },
      {
        concept: "Mokṣa",
        description: "Liberation from the karmic cycle",
        articleId: "moksha-liberation"
      },
      {
        concept: "Niṣkāma Karma",
        description: "Selfless action that does not bind",
        articleId: "nishkama-karma"
      }
    ],
    citationList: [
      "Bṛhadāraṇyaka Upaniṣad 4.4.5 — 'You are what your deep, driving desire is'",
      "Bhagavad Gītā 4.17 — 'The nature of action is hard to understand'",
      "Bhagavad Gītā 3.27 — 'All actions are performed by the guṇas of prakṛti'",
      "Reichenbach, Bruce R. The Law of Karma (1990)",
      "Tull, Herman. The Vedic Origins of Karma (1989)"
    ],
    recommendedReads: [
      { type: "scripture", id: "bhagavad-gita", title: "Bhagavad Gītā", author: "Traditional" },
      { type: "book", id: "law-of-karma", title: "The Law of Karma", author: "Bruce R. Reichenbach" },
      { type: "scripture", id: "brihadaranyaka", title: "Bṛhadāraṇyaka Upaniṣad", author: "Traditional" }
    ],
    category: "metaphysics",
    tradition: ["All Schools", "Pan-Indian"],
    tags: ["action", "consequence", "rebirth", "samsara", "ethics"]
  },
  {
    id: "yajna-sacred-exchange",
    title: "Yajña — The Sacred Exchange",
    sanskritTitle: "यज्ञ",
    transliteration: "Yajña",
    canonicalDefinition: "Yajña is the Vedic principle of sacred offering and cosmic reciprocity. Originally referring to elaborate fire rituals, it evolved to encompass any act of selfless offering — the understanding that existence is maintained through continuous giving and receiving between humans, nature, and the divine.",
    historicalOrigins: "The Vedic yajña was a sophisticated fire ritual involving multiple priests, precise recitation, and offerings of soma, ghee, and grains. The Brāhmaṇa texts (c. 900–700 BCE) elaborate these rituals in extraordinary detail. The Bhagavad Gītā spiritualized yajña, teaching that all of life can become sacrifice when offered without selfish attachment.",
    keyPrinciples: [
      "The cosmos is sustained through reciprocal giving (dāna)",
      "Agni (fire) serves as the mediator between realms",
      "The yajña recreates and maintains cosmic order",
      "Inner yajña: offering of ego, desires, and ignorance",
      "All work offered to the divine becomes yajña"
    ],
    cosmologicalSignificance: "In Vedic thought, the cosmos itself was created through the primordial yajña — the self-sacrifice of Puruṣa (cosmic being). Every subsequent yajña reenacts and participates in this creative act, maintaining the connection between the transcendent and the manifest.",
    crossReferences: [
      {
        concept: "Ṛta",
        description: "Yajña maintains and participates in the cosmic order",
        articleId: "rta-cosmic-order"
      },
      {
        concept: "Agni",
        description: "The divine fire that carries offerings to the gods",
        articleId: "agni-sacred-fire"
      },
      {
        concept: "Puruṣa Sūkta",
        description: "The hymn describing cosmic sacrifice",
        articleId: "purusha-cosmic-being"
      }
    ],
    citationList: [
      "Ṛgveda 10.90 (Puruṣa Sūkta) — 'With sacrifice the gods sacrificed to sacrifice'",
      "Bhagavad Gītā 3.10-13 — 'Through yajña, humanity and the gods nourish each other'",
      "Bhagavad Gītā 4.24 — 'Brahman is the offering, Brahman the oblation'",
      "Staal, Frits. Agni: The Vedic Ritual of the Fire Altar (1983)",
      "Heesterman, J.C. The Broken World of Sacrifice (1993)"
    ],
    recommendedReads: [
      { type: "book", id: "agni-fire-altar", title: "Agni: The Vedic Ritual of the Fire Altar", author: "Frits Staal" },
      { type: "scripture", id: "rgveda-10", title: "Ṛgveda Book 10 — Creation Hymns", author: "Various Seers" }
    ],
    category: "ritual",
    tradition: ["Vedic", "Śrauta", "Smārta"],
    tags: ["sacrifice", "ritual", "fire", "offering", "cosmic order"]
  },
  {
    id: "purusha-cosmic-being",
    title: "Puruṣa — The Cosmic Being",
    sanskritTitle: "पुरुष",
    transliteration: "Puruṣa",
    canonicalDefinition: "Puruṣa is the cosmic person or primordial being whose sacrifice created the manifest universe. In Sāṅkhya philosophy, Puruṣa is pure consciousness — eternal, unchanging, and distinct from Prakṛti (matter). The term bridges cosmogony, metaphysics, and soteriology.",
    historicalOrigins: "The Puruṣa Sūkta (Ṛgveda 10.90) describes the cosmic sacrifice from which the world emerged. In the Upaniṣads, Puruṣa becomes associated with Ātman and Brahman. Sāṅkhya systematized Puruṣa as pure consciousness, the witness of all experience but untouched by it.",
    keyPrinciples: [
      "Puruṣa is the conscious principle, Prakṛti is the material",
      "In Sāṅkhya, there are many puruṣas; in Vedānta, one universal consciousness",
      "Liberation (kaivalya) is Puruṣa's recognition of its distinction from Prakṛti",
      "The cosmic Puruṣa sacrifices itself to create the world",
      "Social order (varṇa) originates from parts of the cosmic Puruṣa"
    ],
    crossReferences: [
      {
        concept: "Prakṛti",
        description: "The material principle complementing Puruṣa",
        articleId: "prakriti-nature"
      },
      {
        concept: "Ātman",
        description: "The individual self, often identified with Puruṣa",
        articleId: "atman-self"
      },
      {
        concept: "Sāṅkhya",
        description: "The school that systematized Puruṣa-Prakṛti dualism",
        articleId: "sankhya-school"
      }
    ],
    citationList: [
      "Ṛgveda 10.90.2 — 'Puruṣa is all this, what has been and what will be'",
      "Sāṅkhya Kārikā 19 — 'Therefore, from the union of the two, creation arises'",
      "Larson, Gerald J. Classical Sāṃkhya (1969)"
    ],
    recommendedReads: [
      { type: "scripture", id: "rgveda-purusha", title: "Puruṣa Sūkta", author: "Traditional" },
      { type: "book", id: "classical-samkhya", title: "Classical Sāṃkhya", author: "Gerald J. Larson" }
    ],
    category: "cosmology",
    tradition: ["Vedic", "Sāṅkhya", "Vedānta"],
    tags: ["consciousness", "cosmic", "creation", "self", "sacrifice"]
  },
  {
    id: "moksha-liberation",
    title: "Mokṣa — Liberation",
    sanskritTitle: "मोक्ष",
    transliteration: "Mokṣa",
    canonicalDefinition: "Mokṣa is liberation from the cycle of birth, death, and rebirth (saṃsāra). It is the ultimate goal (puruṣārtha) of human existence — the realization of one's true nature beyond all limitation, suffering, and ignorance. Different schools describe mokṣa variously as union with Brahman, isolation of Puruṣa, or loving communion with the divine.",
    historicalOrigins: "While the concept appears in the early Upaniṣads, mokṣa was fully articulated as the fourth and highest goal of life alongside dharma, artha, and kāma. The term derives from 'muc' (to release, set free). Different schools developed distinct paths to mokṣa: jñāna (knowledge), bhakti (devotion), karma (selfless action), and yoga (meditative discipline).",
    keyPrinciples: [
      "Mokṣa is freedom from avidyā (ignorance) and its effects",
      "It is not a post-mortem state but can be realized in this life (jīvanmukti)",
      "Different schools offer different descriptions of the liberated state",
      "All legitimate paths ultimately lead to mokṣa",
      "Mokṣa is not an achievement but a recognition of what always was"
    ],
    crossReferences: [
      {
        concept: "Saṃsāra",
        description: "The cycle of rebirth from which mokṣa liberates",
        articleId: "samsara-cycle"
      },
      {
        concept: "Avidyā",
        description: "The ignorance that binds one to saṃsāra",
        articleId: "avidya-ignorance"
      },
      {
        concept: "Ātman-Brahman",
        description: "The identity realized in Advaita mokṣa",
        articleId: "atman-brahman"
      }
    ],
    citationList: [
      "Bṛhadāraṇyaka Upaniṣad 4.4.6 — 'He who knows Brahman becomes Brahman'",
      "Bhagavad Gītā 2.72 — 'This is the state of Brahman... attaining it, one is not deluded'",
      "Muṇḍaka Upaniṣad 3.2.9 — 'He who knows that highest Brahman becomes Brahman indeed'",
      "Fort, Andrew O. Jīvanmukti in Transformation (1998)"
    ],
    recommendedReads: [
      { type: "book", id: "jivanmukti", title: "Jīvanmukti in Transformation", author: "Andrew O. Fort" },
      { type: "scripture", id: "mundaka", title: "Muṇḍaka Upaniṣad", author: "Traditional" }
    ],
    category: "liberation",
    tradition: ["All Schools"],
    tags: ["liberation", "freedom", "enlightenment", "purushartha", "goal"]
  }
];

export const getArticleById = (id: string): PhilosophyArticle | undefined => {
  return philosophyArticles.find(article => article.id === id);
};

export const getArticlesByCategory = (category: PhilosophyArticle["category"]): PhilosophyArticle[] => {
  return philosophyArticles.filter(article => article.category === category);
};

export const getArticlesByTag = (tag: string): PhilosophyArticle[] => {
  return philosophyArticles.filter(article => article.tags.includes(tag.toLowerCase()));
};

export const getRelatedArticles = (articleId: string): PhilosophyArticle[] => {
  const article = getArticleById(articleId);
  if (!article) return [];
  
  const relatedIds = article.crossReferences
    .map(ref => ref.articleId)
    .filter((id): id is string => id !== undefined);
  
  return relatedIds
    .map(id => getArticleById(id))
    .filter((a): a is PhilosophyArticle => a !== undefined);
};

export const categoryLabels: Record<PhilosophyArticle["category"], string> = {
  metaphysics: "Metaphysics",
  ethics: "Ethics & Dharma",
  cosmology: "Cosmology",
  ritual: "Ritual & Practice",
  liberation: "Liberation (Mokṣa)"
};
