export interface TantraArticle {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  symbolism: string;
  mantras: string[];
  associatedChakra?: string;
  iconography: string;
  worshipPractices: string[];
  philosophicalSignificance: string;
  gallery: {
    url: string;
    caption: string;
    alt: string;
  }[];
  crossReferences: string[];
  citationList: string[];
}

export interface TantraCategory {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  articles: TantraArticle[];
}

// Dasha Mahavidya - The Ten Great Wisdom Goddesses
export const dashaMahavidya: TantraCategory = {
  id: 'dasha-mahavidya',
  name: 'Dasha Mahavidya',
  sanskritName: 'दश महाविद्या',
  description: 'The Ten Great Wisdom Goddesses represent the various aspects of the Divine Feminine (Shakti) in Tantric tradition. Each Mahavidya embodies a specific cosmic function and spiritual truth.',
  articles: [
    {
      id: 'kali',
      name: 'Kālī',
      sanskritName: 'काली',
      description: 'The first and foremost of the Mahavidyas, Kālī represents the power of time and transformation. She is the destroyer of ego and ignorance.',
      symbolism: 'Kālī\'s dark complexion represents the void beyond all form. Her garland of skulls symbolizes the letters of the Sanskrit alphabet (mātṛkā), the basis of all manifestation. Her four arms represent the complete cycle of creation and destruction.',
      mantras: ['ॐ क्रीं काली', 'ॐ क्रीं क्रीं क्रीं हूं हूं ह्रीं ह्रीं दक्षिणे कालिके क्रीं क्रीं क्रीं हूं हूं ह्रीं ह्रीं स्वाहा'],
      associatedChakra: 'Sahasrāra (Crown)',
      iconography: 'Depicted with dark blue or black skin, four arms, a garland of skulls, a skirt of severed arms, standing on Śiva. She holds a sword, a severed head, and makes the abhaya (fearlessness) and varada (boon-giving) mudrās.',
      worshipPractices: ['Kālī Pūjā on Amāvasyā (new moon)', 'Night worship (rātri sādhana)', 'Cremation ground practices'],
      philosophicalSignificance: 'Kālī represents the ultimate reality beyond time. Her worship leads to the dissolution of the ego and liberation from the cycle of birth and death. She embodies the fierce compassion that destroys illusion.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Traditional Kālī iconography', alt: 'Goddess Kali in traditional form' },
        { url: '/placeholder.svg', caption: 'Kālī Yantra for meditation', alt: 'Sacred geometric diagram for Kali worship' }
      ],
      crossReferences: ['tara', 'chinnamasta', 'dhumavati'],
      citationList: [
        'Kinsley, David. "Tantric Visions of the Divine Feminine: The Ten Mahāvidyās" (1997)',
        'Woodroffe, John. "Hymns to the Goddess" (1913)',
        'Devī Māhātmya (Mārkaṇḍeya Purāṇa)'
      ]
    },
    {
      id: 'tara',
      name: 'Tārā',
      sanskritName: 'तारा',
      description: 'The second Mahavidya, Tārā is the goddess who guides souls across the ocean of existence. She represents the protective and guiding aspect of the Divine Mother.',
      symbolism: 'Tārā means "she who saves" or "star." Like a star guiding sailors, she leads devotees through the darkness of ignorance to the shore of liberation.',
      mantras: ['ॐ ह्रीं स्त्रीं हूं फट्', 'ॐ तारे तुत्तारे तुरे स्वाहा'],
      associatedChakra: 'Ājñā (Third Eye)',
      iconography: 'Similar to Kālī but with a more benevolent aspect. Often depicted standing on a corpse, with four arms, wearing a tiger skin. She is blue in color and adorned with serpents.',
      worshipPractices: ['Tārā Jayantī observance', 'Akṣayā Tṛtīyā worship', 'Mantra japa for protection'],
      philosophicalSignificance: 'Tārā embodies the nurturing power of the void. She represents the Word (Śabda Brahman) and the creative power of sound. Her worship grants eloquence, wisdom, and safe passage through difficulties.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Ugra Tārā form', alt: 'Fierce form of Goddess Tara' },
        { url: '/placeholder.svg', caption: 'Tārā in Buddhist tradition', alt: 'Tara in Buddhist iconography' }
      ],
      crossReferences: ['kali', 'bhairavi', 'bagalamukhi'],
      citationList: [
        'Beyer, Stephan. "The Cult of Tārā" (1978)',
        'Shankaranarayanan, S. "The Ten Great Cosmic Powers" (1972)',
        'Tārā Tantra'
      ]
    },
    {
      id: 'tripura-sundari',
      name: 'Tripura Sundarī',
      sanskritName: 'त्रिपुरसुन्दरी',
      description: 'Also known as Ṣoḍaśī or Lalitā, she is the goddess of beauty, grace, and the complete fulfillment of desires. She represents the union of Śiva and Śakti.',
      symbolism: 'Her name means "the beautiful one of the three cities" (referring to the three states of consciousness or the three worlds). She embodies the power of desire (icchā śakti) in its pure, divine form.',
      mantras: ['ॐ ऐं ह्रीं श्रीं त्रिपुरसुन्दर्यै नमः', 'का ए ई ल ह्रीं | ह स क ह ल ह्रीं | स क ल ह्रीं'],
      associatedChakra: 'Anāhata (Heart)',
      iconography: 'Depicted as a beautiful sixteen-year-old maiden, red in complexion, seated on a lotus. She holds a noose, goad, bow of sugarcane, and arrows of flowers. Sometimes shown seated on a throne supported by Brahmā, Viṣṇu, Rudra, and Īśvara.',
      worshipPractices: ['Śrī Vidyā upāsanā', 'Śrī Cakra worship', 'Lalitā Sahasranāma recitation'],
      philosophicalSignificance: 'Tripura Sundarī represents the supreme consciousness that pervades the three states of waking, dreaming, and deep sleep. Her worship is considered the highest form of Tantric practice, leading to the realization of non-dual awareness.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Lalitā on Śrī Cakra throne', alt: 'Goddess Lalita seated on Sri Chakra' },
        { url: '/placeholder.svg', caption: 'Śrī Yantra sacred geometry', alt: 'Sri Yantra geometric pattern' }
      ],
      crossReferences: ['bhuvaneshvari', 'kamala', 'matangi'],
      citationList: [
        'Lalitā Sahasranāma (from Brahmāṇḍa Purāṇa)',
        'Rao, S.K. Ramachandra. "Śrīvidyā Koṣa" (2008)',
        'Brooks, Douglas Renfrew. "Auspicious Wisdom" (1992)'
      ]
    },
    {
      id: 'bhuvaneshvari',
      name: 'Bhuvaneśvarī',
      sanskritName: 'भुवनेश्वरी',
      description: 'The Queen of the Universe, she embodies space itself and the power that creates and sustains all worlds.',
      symbolism: 'Her name means "Mistress of the Worlds." She represents the spatial aspect of consciousness, the container in which all creation exists.',
      mantras: ['ॐ ह्रीं भुवनेश्वर्यै नमः', 'ॐ ऐं ह्रीं श्रीं नमः'],
      associatedChakra: 'Viśuddha (Throat)',
      iconography: 'Golden or red in color, with four arms holding a noose, goad, and making the abhaya and varada mudrās. She is adorned with a crescent moon and seated on a lotus.',
      worshipPractices: ['Worship on Fridays', 'Māyā Bīja (ह्रीं) meditation', 'Space awareness practices'],
      philosophicalSignificance: 'Bhuvaneśvarī is Māyā Śakti, the power of illusion that creates the appearance of diversity within unity. Understanding her nature leads to the recognition that all phenomena are manifestations of one consciousness.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Bhuvaneśvarī holding the cosmos', alt: 'Goddess Bhuvaneshvari' }
      ],
      crossReferences: ['tripura-sundari', 'dhumavati', 'kamala'],
      citationList: [
        'Frawley, David. "Tantric Yoga and the Wisdom Goddesses" (1994)',
        'Bhuvaneśvarī Tantra'
      ]
    },
    {
      id: 'bhairavi',
      name: 'Bhairavī',
      sanskritName: 'भैरवी',
      description: 'The fierce goddess of transformation, she represents the heat of tapas (spiritual austerity) and the power of self-discipline.',
      symbolism: 'Bhairavī embodies the fierce aspect of consciousness that burns away impurities. She is the fire of yoga that purifies the practitioner.',
      mantras: ['ॐ ह्रीं भैरव्यै नमः', 'ॐ हसैं हसकरीं हसैं'],
      associatedChakra: 'Mūlādhāra (Root)',
      iconography: 'Red in color with three eyes, wearing red garments. She holds a mālā, book, and makes the abhaya and varada mudrās. Sometimes depicted holding a sword and severed head.',
      worshipPractices: ['Fire rituals (homa)', 'Tapas and austerities', 'Kuṇḍalinī practices'],
      philosophicalSignificance: 'Bhairavī represents the Tejas (fire element) of spiritual practice. Her worship grants the power to overcome obstacles and burn away negative karmas.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Tripura Bhairavī', alt: 'Fierce form of Bhairavi' }
      ],
      crossReferences: ['kali', 'chinnamasta', 'dhumavati'],
      citationList: [
        'Bhairavī Tantra',
        'White, David Gordon. "Kiss of the Yoginī" (2003)'
      ]
    },
    {
      id: 'chinnamasta',
      name: 'Chinnamastā',
      sanskritName: 'छिन्नमस्ता',
      description: 'The self-decapitated goddess who holds her own severed head while three streams of blood nourish herself and her attendants.',
      symbolism: 'Chinnamastā represents the transcendence of the ego and the life force (prāṇa) that sustains all beings. Her self-sacrifice symbolizes the dissolution of the separate self.',
      mantras: ['ॐ श्रीं ह्रीं क्लीं ऐं वज्रवैरोचनीये ह्रीं ह्रीं फट् स्वाहा'],
      associatedChakra: 'Manipūra (Solar Plexus)',
      iconography: 'Depicted as a young woman standing on a copulating couple (Kāma and Rati), holding her severed head. Three streams of blood flow from her neck to her own mouth and those of her two attendants.',
      worshipPractices: ['Practiced by advanced sādhakas only', 'Prāṇāyāma and energy work', 'Meditation on the cessation of thought'],
      philosophicalSignificance: 'Chinnamastā represents the annihilation of the mind and the redirection of life force from worldly pursuits to spiritual awakening. She embodies the courage required for complete self-surrender.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Chinnamastā iconography', alt: 'Goddess Chinnamasta' }
      ],
      crossReferences: ['kali', 'bhairavi', 'dhumavati'],
      citationList: [
        'Benard, Elisabeth Anne. "Chinnamastā: The Aweful Buddhist and Hindu Tantric Goddess" (1994)',
        'Chinnamastā Tantra'
      ]
    },
    {
      id: 'dhumavati',
      name: 'Dhūmāvatī',
      sanskritName: 'धूमावती',
      description: 'The widow goddess who represents the void, disappointment, and the transformative power of renunciation.',
      symbolism: 'Dhūmāvatī embodies the smoke (dhūma) that remains after the fire of creation. She represents the state of consciousness when all external supports are withdrawn.',
      mantras: ['ॐ धूं धूं धूमावत्यै स्वाहा'],
      associatedChakra: 'Svādhiṣṭhāna (Sacral)',
      iconography: 'Depicted as an old widow in white, riding a crow or sitting on a chariot. She has disheveled hair, missing teeth, and holds a winnowing basket.',
      worshipPractices: ['Worship during difficult periods', 'Renunciation practices', 'Solitary meditation'],
      philosophicalSignificance: 'Dhūmāvatī teaches the value of disappointment and loss as gateways to liberation. She represents the wisdom that comes from withdrawal and the peace of letting go.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Dhūmāvatī on her crow', alt: 'Goddess Dhumavati' }
      ],
      crossReferences: ['kali', 'bagalamukhi', 'chinnamasta'],
      citationList: [
        'Kinsley, David. "Tantric Visions of the Divine Feminine" (1997)',
        'Dhūmāvatī Tantra'
      ]
    },
    {
      id: 'bagalamukhi',
      name: 'Bagalāmukhī',
      sanskritName: 'बगलामुखी',
      description: 'The goddess who paralyzes enemies and stops all motion. She represents the power of stillness and the cessation of mental activity.',
      symbolism: 'Bagalāmukhī means "she whose face has the power to stop." She represents the moment between thoughts, the pause that reveals truth.',
      mantras: ['ॐ ह्लीं बगलामुखी सर्वदुष्टानां वाचं मुखं पदं स्तम्भय जिह्वां कीलय बुद्धिं विनाशय ह्लीं ॐ स्वाहा'],
      associatedChakra: 'Ājñā (Third Eye)',
      iconography: 'Golden-yellow in color, holding a club in her right hand and pulling the tongue of a demon with her left. She wears yellow garments and is seated on a golden throne.',
      worshipPractices: ['Practiced for victory and protection', 'Tongue-pulling meditation', 'Yellow color offerings'],
      philosophicalSignificance: 'Bagalāmukhī represents the power of silence and the stopping of dualistic thought. Her worship grants the ability to silence critics, overcome obstacles, and achieve victory over enemies both external and internal.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Bagalāmukhī pulling demon\'s tongue', alt: 'Goddess Bagalamukhi' }
      ],
      crossReferences: ['dhumavati', 'matangi', 'kamala'],
      citationList: [
        'Bagalāmukhī Tantra',
        'Rao, S.K. Ramachandra. "The Mahāvidyā-s" (1990)'
      ]
    },
    {
      id: 'matangi',
      name: 'Mātaṅgī',
      sanskritName: 'मातङ्गी',
      description: 'The outcaste goddess of arts, music, and speech. She represents the power of expression and the beauty in the margins of society.',
      symbolism: 'Mātaṅgī is associated with impurity and leftovers, teaching that the divine is present even in what society rejects. She is the goddess of the unspeakable, the taboo, and the unconventional.',
      mantras: ['ॐ ह्रीं ऐं श्रीं नमो भगवति उच्छिष्टचाण्डालिनि श्री मातङ्गेश्वरि सर्वजनवशंकरि स्वाहा'],
      associatedChakra: 'Viśuddha (Throat)',
      iconography: 'Green in color (like a parrot), holding a sword, skull, and vīṇā. She is adorned with flowers and makes the varada mudrā.',
      worshipPractices: ['Arts and music offerings', 'Worship with leftovers (ucchiṣṭa)', 'Creative practices'],
      philosophicalSignificance: 'Mātaṅgī challenges social conventions and reveals the sacred in the profane. Her worship grants artistic abilities, eloquent speech, and the power to influence others through words and music.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Rāja Mātaṅgī with vīṇā', alt: 'Goddess Matangi' }
      ],
      crossReferences: ['tripura-sundari', 'bagalamukhi', 'kamala'],
      citationList: [
        'Mātaṅgī Tantra',
        'Urban, Hugh. "The Power of Tantra" (2010)'
      ]
    },
    {
      id: 'kamala',
      name: 'Kamalā',
      sanskritName: 'कमला',
      description: 'The lotus goddess of prosperity, grace, and spiritual fulfillment. She is the Tantric form of Lakṣmī.',
      symbolism: 'Kamalā sits on a lotus, symbol of purity emerging from the mud of existence. She represents the full flowering of consciousness and the attainment of all worthy goals.',
      mantras: ['ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः'],
      associatedChakra: 'Anāhata (Heart)',
      iconography: 'Golden in color, seated on a lotus, with four elephants pouring water over her from golden pots. She holds lotuses and makes the abhaya and varada mudrās.',
      worshipPractices: ['Friday worship', 'Prosperity rituals', 'Lotus offerings'],
      philosophicalSignificance: 'Kamalā represents the culmination of Tantric practice—the integration of spiritual wisdom with worldly fulfillment. She embodies the truth that liberation includes rather than excludes abundance and beauty.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Kamalā with elephants', alt: 'Goddess Kamala' },
        { url: '/placeholder.svg', caption: 'Lotus symbolism', alt: 'Lotus flower sacred imagery' }
      ],
      crossReferences: ['tripura-sundari', 'bhuvaneshvari', 'matangi'],
      citationList: [
        'Śrī Sūkta (Ṛg Veda Khilāni)',
        'Frawley, David. "Tantric Yoga and the Wisdom Goddesses" (1994)'
      ]
    }
  ]
};

export const tantraCategories: TantraCategory[] = [dashaMahavidya];

export const getTantraArticleById = (categoryId: string, articleId: string): TantraArticle | undefined => {
  const category = tantraCategories.find(c => c.id === categoryId);
  return category?.articles.find(a => a.id === articleId);
};

export const getAllTantraArticles = (): TantraArticle[] => {
  return tantraCategories.flatMap(c => c.articles);
};
