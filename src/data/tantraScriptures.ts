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

// Shakta Upasana - Goddess Worship Traditions
export const shaktaUpasana: TantraCategory = {
  id: 'shakta-upasana',
  name: 'Shakta Upasana',
  sanskritName: 'शाक्त उपासना',
  description: 'The path of goddess worship encompassing Śrī Vidyā, sacred geometry, mantra science, and the veneration of the Divine Feminine across various traditions.',
  articles: [
    {
      id: 'sri-vidya',
      name: 'Śrī Vidyā',
      sanskritName: 'श्री विद्या',
      description: 'The supreme tantric tradition centered on the worship of Tripura Sundarī through the sacred Śrī Cakra and the powerful fifteen-syllable mantra.',
      symbolism: 'Śrī Vidyā represents the complete science of consciousness. The Śrī Cakra embodies the cosmos as the body of the Goddess, with nine interlocking triangles representing the dynamic interplay of Śiva and Śakti.',
      mantras: ['ॐ श्रीं ह्रीं क्लीं ऐं सौः', 'का ए ई ल ह्रीं | ह स क ह ल ह्रीं | स क ल ह्रीं'],
      associatedChakra: 'All chakras (complete system)',
      iconography: 'The Śrī Cakra consists of a central bindu surrounded by nine interlocking triangles, enclosed by two lotus circles and three protective squares (bhūpura).',
      worshipPractices: ['Navāvaraṇa Pūjā (nine-enclosure worship)', 'Pañcadaśī mantra japa', 'Śrī Cakra meditation', 'Kumārī Pūjā'],
      philosophicalSignificance: 'Śrī Vidyā integrates Vedāntic non-dualism with Tantric practice. It teaches that the universe is the play of consciousness (Lalitā Līlā) and that the individual can realize their identity with the supreme through systematic practice.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Śrī Cakra with navāvaraṇas', alt: 'Sri Chakra sacred geometry' },
        { url: '/placeholder.svg', caption: 'Traditional Śrī Vidyā pūjā', alt: 'Sri Vidya worship ceremony' }
      ],
      crossReferences: ['tripura-sundari', 'lalita-sahasranama', 'navavarna-puja'],
      citationList: [
        'Brooks, Douglas Renfrew. "Auspicious Wisdom: The Texts and Traditions of Śrīvidyā Śākta Tantrism" (1992)',
        'Rao, S.K. Ramachandra. "Śrīvidyā Koṣa" (2008)',
        'Saundaryalaharī of Śaṅkarācārya'
      ]
    },
    {
      id: 'lalita-sahasranama',
      name: 'Lalitā Sahasranāma',
      sanskritName: 'ललिता सहस्रनाम',
      description: 'The thousand names of the goddess Lalitā, considered one of the most powerful stotras for invoking divine grace and spiritual transformation.',
      symbolism: 'Each of the 1000 names reveals an aspect of the Divine Mother\'s nature, from her cosmic functions to her intimate presence in the heart of devotees. The names form a complete map of consciousness.',
      mantras: ['ॐ ऐं ह्रीं श्रीं श्री मात्रे नमः', 'ॐ श्री ललितायै नमः'],
      iconography: 'Lalitā is depicted seated on a throne of the five Brahmas, red in color, holding the noose, goad, sugarcane bow, and flower arrows.',
      worshipPractices: ['Daily recitation with pūjā', 'Aṣṭottara (108 names) for shorter practice', 'Kumkumārcanā (vermillion offering)'],
      philosophicalSignificance: 'The Sahasranāma encodes the entire philosophy of Śrī Vidyā. Names like "Śiva-Śakti-aikya-rūpiṇī" reveal the non-dual nature of reality, while others describe the stages of spiritual practice.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Lalitā Mahātripurasundarī', alt: 'Goddess Lalita' }
      ],
      crossReferences: ['sri-vidya', 'tripura-sundari', 'navavarna-puja'],
      citationList: [
        'Lalitā Sahasranāma (Brahmāṇḍa Purāṇa)',
        'Bhāskararāya. "Saubhāgya-bhāskara" (commentary)'
      ]
    },
    {
      id: 'navavarna-puja',
      name: 'Navāvaraṇa Pūjā',
      sanskritName: 'नवावरण पूजा',
      description: 'The elaborate ritual worship of the nine enclosures of the Śrī Cakra, invoking the deities residing in each layer from the outer squares to the central bindu.',
      symbolism: 'The nine āvaraṇas represent stages of manifestation and levels of consciousness. Moving inward through worship symbolizes the spiritual journey from multiplicity to unity.',
      mantras: ['Various according to each āvaraṇa', 'Culminating in the Kāmakalā at the bindu'],
      associatedChakra: 'Progressive activation from Mūlādhāra to Sahasrāra',
      iconography: 'The Śrī Cakra mandala with its complex geometry of triangles, lotuses, and squares housing the yoginīs and deities of each enclosure.',
      worshipPractices: ['Full navāvaraṇa takes several hours', 'Each āvaraṇa has specific offerings', 'Requires proper initiation (dīkṣā)'],
      philosophicalSignificance: 'This worship maps the microcosm of the body onto the macrocosm of the universe, allowing the practitioner to experience unity with the Divine through ritual action.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Nine enclosures of Śrī Cakra', alt: 'Navavararna diagram' }
      ],
      crossReferences: ['sri-vidya', 'lalita-sahasranama', 'tripura-sundari'],
      citationList: [
        'Parāśurāma Kalpa Sūtra',
        'Rao, S.K. Ramachandra. "Śrīcakra" (1988)'
      ]
    },
    {
      id: 'shakti-pithas',
      name: 'Shakti Pīṭhas',
      sanskritName: 'शक्ति पीठ',
      description: 'The sacred sites where parts of Satī\'s body fell, creating powerful energy centers across the Indian subcontinent revered by Shakta practitioners.',
      symbolism: 'The 51 (or 108) pīṭhas represent the letters of the Sanskrit alphabet manifested geographically, making the entire land a living body of the Goddess.',
      mantras: ['Specific mantras for each pīṭha', 'ॐ क्रीं कालिकायै नमः (Kālīghāṭ)', 'ॐ कामाख्यायै नमः (Kāmākhyā)'],
      iconography: 'Each pīṭha has its specific form of the Goddess (Śakti) and her consort (Bhairava), often housed in ancient temples.',
      worshipPractices: ['Pilgrimage (tīrtha yātrā)', 'Pīṭha stotra recitation', 'Kumārī Pūjā at specific sites'],
      philosophicalSignificance: 'The pīṭhas teach that the sacred is not confined to temples but pervades the landscape. They also preserve regional goddess traditions within a pan-Indian framework.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Kāmākhyā Temple, Assam', alt: 'Kamakhya temple' },
        { url: '/placeholder.svg', caption: 'Shakti Pīṭha map', alt: 'Map of Shakti Pithas' }
      ],
      crossReferences: ['kali', 'tara', 'dasha-mahavidya'],
      citationList: [
        'Sircar, D.C. "The Śākta Pīṭhas" (1973)',
        'Devī Bhāgavata Purāṇa'
      ]
    },
    {
      id: 'kumari-puja',
      name: 'Kumārī Pūjā',
      sanskritName: 'कुमारी पूजा',
      description: 'The worship of young girls as living embodiments of the Goddess, particularly significant during Navarātri and in Śākta temples.',
      symbolism: 'The kumārī represents the untainted potential of Śakti—consciousness before it becomes conditioned by social roles. Worshipping her is worshipping the Goddess directly.',
      mantras: ['ॐ कुमार्यै नमः', 'ॐ ऐं ह्रीं श्रीं कुमारीभ्यो नमः'],
      iconography: 'Girls aged 1-16 are worshipped, each age associated with a different form of the Goddess. Feet are washed, offerings made, and the child is fed.',
      worshipPractices: ['Navarātri kumārī pūjā', 'Aṣṭamī and Navamī observances', 'Temple kumārī traditions (Nepal)'],
      philosophicalSignificance: 'This practice challenges caste and gender hierarchies by requiring even male householders to prostrate before young girls. It teaches seeing the Divine in the human.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Kumārī Pūjā during Navarātri', alt: 'Kumari worship ceremony' }
      ],
      crossReferences: ['tripura-sundari', 'shakti-pithas', 'navavarna-puja'],
      citationList: [
        'Durgā Pūjā ritual texts',
        'McDaniel, June. "Offering Flowers, Feeding Skulls" (2004)'
      ]
    }
  ]
};

// Nath Sampradaya - The Path of the Siddhas
export const nathSampradaya: TantraCategory = {
  id: 'nath-sampradaya',
  name: 'Nath Sampradaya',
  sanskritName: 'नाथ सम्प्रदाय',
  description: 'The mystical tradition of the Nāth yogīs, masters of Haṭha Yoga, internal alchemy, and the quest for immortality through mastery of the life force.',
  articles: [
    {
      id: 'gorakhnath',
      name: 'Gorakṣanāth',
      sanskritName: 'गोरक्षनाथ',
      description: 'The legendary founder of Haṭha Yoga and the Nāth lineage, said to have achieved physical immortality through yogic powers.',
      symbolism: 'Gorakṣa (protector of cattle/senses) represents the mastery of the sensory faculties through yoga. His split ears symbolize the piercing of duality.',
      mantras: ['ॐ शिव गोरक्ष योगी', 'आदेश आदेश', 'अलख निरंजन'],
      associatedChakra: 'Ājñā and Sahasrāra',
      iconography: 'Depicted as a yogi with split ears (darśanī), wearing ochre robes, holding a begging bowl and chimta (fire tongs). Often shown seated in meditation.',
      worshipPractices: ['Guru Pūrṇimā observances', 'Haṭha yoga practice', 'Nādānusandhāna (sound meditation)', 'Gorakh Vāṇī recitation'],
      philosophicalSignificance: 'Gorakṣanāth bridges the gap between Tantric ritual and yoga. He democratized spiritual practice, teaching that liberation is available to all through proper technique.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Gorakṣanāth in meditation', alt: 'Gorakhnath yogi' },
        { url: '/placeholder.svg', caption: 'Nāth sadhu with chimta', alt: 'Nath tradition practitioner' }
      ],
      crossReferences: ['matsyendranath', 'hatha-yoga', 'nada-yoga'],
      citationList: [
        'White, David Gordon. "The Alchemical Body: Siddha Traditions in Medieval India" (1996)',
        'Gorakṣa Paddhati',
        'Briggs, George Weston. "Gorakhnāth and the Kānphaṭa Yogīs" (1938)'
      ]
    },
    {
      id: 'matsyendranath',
      name: 'Matsyendranāth',
      sanskritName: 'मत्स्येन्द्रनाथ',
      description: 'The guru of Gorakṣanāth and originator of the Kaula tradition, said to have received tantric teachings directly from Śiva while in the form of a fish.',
      symbolism: 'As a fish (matsya), he represents consciousness swimming in the ocean of existence. He received the teachings not meant for human ears, signifying esoteric transmission.',
      mantras: ['ॐ मत्स्येन्द्रनाथाय नमः', 'ॐ नाथाय नमः'],
      associatedChakra: 'Viśuddha (throat)',
      iconography: 'Often shown as an ascetic or depicted with fish imagery. In Nepal, identified with Avalokiteśvara and depicted with elaborate ornamentation.',
      worshipPractices: ['Kaula rituals', 'Guru lineage recitation', 'Pilgrimage to Nepal temples'],
      philosophicalSignificance: 'Matsyendranāth represents the integration of Kaula tantra (emphasizing enjoyment) with yoga (emphasizing renunciation). He taught that liberation and worldly life are not opposed.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Matsyendranāth receiving teachings', alt: 'Matsyendranath legend' }
      ],
      crossReferences: ['gorakhnath', 'kali', 'kaula-tradition'],
      citationList: [
        'Kaulajñāna Nirṇaya (attributed to Matsyendranāth)',
        'White, David Gordon. "Kiss of the Yoginī" (2003)'
      ]
    },
    {
      id: 'hatha-yoga',
      name: 'Haṭha Yoga',
      sanskritName: 'हठ योग',
      description: 'The yoga of force—the systematic practice of āsana, prāṇāyāma, bandha, and mudrā to awaken the kuṇḍalinī and achieve liberation in the body.',
      symbolism: 'Ha (sun) and Ṭha (moon) represent the solar and lunar channels (piṅgalā and iḍā). Haṭha yoga unites these opposites in the central channel (suṣumnā).',
      mantras: ['ॐ हठयोगी', 'हंसः सोऽहम्'],
      associatedChakra: 'All chakras through progressive practice',
      iconography: 'Traditional haṭha yogis depicted in complex āsanas, performing bandhas and mudrās. Illustrations in texts show the subtle body with chakras and nāḍīs.',
      worshipPractices: ['Daily āsana and prāṇāyāma', 'Ṣaṭ-karma purification', 'Guru seva and initiation'],
      philosophicalSignificance: 'Haṭha Yoga teaches that the body is not an obstacle but the vehicle for liberation. By mastering the body, one masters the mind and ultimately realizes the Self.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Classical haṭha yoga āsanas', alt: 'Traditional yoga postures' },
        { url: '/placeholder.svg', caption: 'Subtle body diagram', alt: 'Chakras and nadis' }
      ],
      crossReferences: ['gorakhnath', 'kundalini', 'nada-yoga'],
      citationList: [
        'Haṭha Yoga Pradīpikā of Svātmārāma',
        'Gheraṇḍa Saṃhitā',
        'Śiva Saṃhitā',
        'Mallinson, James & Singleton, Mark. "Roots of Yoga" (2017)'
      ]
    },
    {
      id: 'kaya-sadhana',
      name: 'Kāya Sādhana',
      sanskritName: 'काय साधना',
      description: 'The alchemical transformation of the body into an immortal "diamond body" through yogic and tantric practices.',
      symbolism: 'The body is treated as an alchemical vessel where base elements (gross matter) are transmuted into gold (spiritual substance). Semen retention and breath control are key.',
      mantras: ['ॐ सिद्ध देहाय नमः', 'Specific mantras for each dhātu (tissue)'],
      associatedChakra: 'Focuses on navel center (nābhi/maṇipūra)',
      iconography: 'Siddhas depicted with youthful, radiant bodies despite advanced age. Often shown near alchemical symbols or in caves.',
      worshipPractices: ['Vajrolī mudrā', 'Khecarī mudrā', 'Rasāyana (alchemical) preparations', 'Extended prāṇāyāma retreats'],
      philosophicalSignificance: 'Kāya sādhana rejects the idea that the body is merely transient. It teaches that through proper practice, the physical form can become a vehicle for eternal consciousness.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Siddha in samādhi', alt: 'Immortal yogi in meditation' }
      ],
      crossReferences: ['hatha-yoga', 'gorakhnath', 'rasayana'],
      citationList: [
        'White, David Gordon. "The Alchemical Body" (1996)',
        'Rasārṇava (alchemical text)'
      ]
    },
    {
      id: 'nada-yoga',
      name: 'Nāda Yoga',
      sanskritName: 'नाद योग',
      description: 'The yoga of inner sound—listening to the subtle sounds (anāhata nāda) that arise spontaneously within, leading to the dissolution of mind in pure awareness.',
      symbolism: 'Nāda represents the primordial vibration from which creation emerges. The unstruck sound (anāhata) is consciousness itself, always present but usually unheard.',
      mantras: ['ॐ (praṇava as supreme nāda)', 'हंसः (haṃsa, breath sound)'],
      associatedChakra: 'Anāhata (heart) and beyond',
      iconography: 'The bindu point above the crescent moon in Om represents the source of nāda. Practitioners depicted with closed eyes, hands at ears.',
      worshipPractices: ['Śānmukhi mudrā (six-gate seal)', 'Bhramarī prāṇāyāma', 'Extended silence retreats', 'Concentration on internal sounds'],
      philosophicalSignificance: 'Nāda yoga offers a path that transcends mantra japa. By following the inner sound to its source, the practitioner discovers the ground of being beyond all mental activity.',
      gallery: [
        { url: '/placeholder.svg', caption: 'The four stages of nāda', alt: 'Nada yoga progression' }
      ],
      crossReferences: ['hatha-yoga', 'kundalini', 'spanda'],
      citationList: [
        'Haṭha Yoga Pradīpikā, Chapter 4',
        'Beck, Guy L. "Sonic Theology: Hinduism and Sacred Sound" (1993)'
      ]
    }
  ]
};

// Kashmir Shaivism - The Non-dual Traditions of Kashmir
export const kashmirShaivism: TantraCategory = {
  id: 'kashmir-shaivism',
  name: 'Kashmir Shaivism',
  sanskritName: 'काश्मीर शैव दर्शन',
  description: 'The sophisticated non-dual Śaiva traditions of Kashmir, including Pratyabhijñā (Recognition), Spanda (Divine Vibration), and Trika (the Threefold Science).',
  articles: [
    {
      id: 'pratyabhijna',
      name: 'Pratyabhijñā',
      sanskritName: 'प्रत्यभिज्ञा',
      description: 'The philosophy of Recognition—the doctrine that liberation consists in recognizing one\'s true identity as Śiva, which has never been lost, only forgotten.',
      symbolism: 'Pratyabhijñā means "re-cognition"—knowing again what was always known. It symbolizes the return to the home that was never left.',
      mantras: ['अहं ब्रह्मास्मि (I am Brahman)', 'शिवोऽहम् (I am Śiva)', 'ॐ नमः शिवाय'],
      iconography: 'Śiva as Paramaśiva—beyond all attributes yet containing all. The tradition emphasizes inner experience over external form.',
      worshipPractices: ['Self-inquiry (ātma-vicāra)', 'Study of pratyabhijñā texts', 'Guru\'s grace (śaktipāta)', 'Recognition practices (pratyabhijñā-upāya)'],
      philosophicalSignificance: 'Unlike paths requiring gradual purification, pratyabhijñā teaches that the Self is already pure and complete. Liberation is not achieved but recognized.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Utpaladeva, author of Pratyabhijñā texts', alt: 'Kashmir Shaivism master' }
      ],
      crossReferences: ['spanda', 'trika', 'abhinavagupta'],
      citationList: [
        'Utpaladeva. "Īśvara-pratyabhijñā-kārikā"',
        'Abhinavagupta. "Īśvara-pratyabhijñā-vimarśinī"',
        'Dyczkowski, Mark S.G. "The Doctrine of Vibration" (1987)'
      ]
    },
    {
      id: 'spanda',
      name: 'Spanda',
      sanskritName: 'स्पन्द',
      description: 'The doctrine of Divine Pulsation—the understanding that consciousness is not static but vibrates with creative power, manifesting as the universe.',
      symbolism: 'Spanda is the throb of awareness recognizing itself. Like the heartbeat of existence, it is the dynamic aspect of unchanging consciousness.',
      mantras: ['ॐ स्पन्दाय नमः', 'Focus on the throb between thoughts'],
      iconography: 'No specific iconography; Spanda is experienced rather than depicted. Sometimes symbolized by waves emanating from a still center.',
      worshipPractices: ['Awareness of gaps between thoughts', 'Noticing the "startle" moment', 'Spanda-nirṇaya study', 'Meditation on arising and subsiding'],
      philosophicalSignificance: 'Spanda bridges absolute and relative reality. It explains how the unchanging can appear to change without contradiction—through its own creative vibration.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Spanda—the pulse of consciousness', alt: 'Divine vibration concept' }
      ],
      crossReferences: ['pratyabhijna', 'trika', 'vijnanabhairava'],
      citationList: [
        'Vasugupta. "Spanda Kārikā"',
        'Kṣemarāja. "Spanda Nirṇaya"',
        'Singh, Jaideva. "Spanda-Kārikās" (translation, 1980)'
      ]
    },
    {
      id: 'trika',
      name: 'Trika System',
      sanskritName: 'त्रिक',
      description: 'The threefold science of Śiva, Śakti, and Nara (the individual)—a comprehensive framework for understanding reality and the path to liberation.',
      symbolism: 'Trika means "three." The system recognizes three fundamental principles whose understanding and integration leads to wholeness.',
      mantras: ['ॐ परा शक्त्यै नमः', 'ॐ परापराय नमः', 'ॐ अपराय नमः'],
      associatedChakra: 'System of 36 tattvas transcending chakra model',
      iconography: 'The three goddesses Parā, Parāparā, and Aparā representing the three levels of reality. Śiva with Śakti as his inseparable power.',
      worshipPractices: ['Trika initiation', 'Krama ritual cycles', 'Study of 36 tattvas', 'Āṇava, śākta, and śāmbhava upāyas'],
      philosophicalSignificance: 'Trika provides a complete ontology mapping all levels of existence from the Absolute to gross matter. It offers multiple paths (upāyas) suited to different aspirants.',
      gallery: [
        { url: '/placeholder.svg', caption: 'The 36 tattvas of Trika', alt: 'Kashmir Shaivism cosmology' }
      ],
      crossReferences: ['pratyabhijna', 'spanda', 'abhinavagupta'],
      citationList: [
        'Abhinavagupta. "Tantrāloka"',
        'Mālinīvijayottara Tantra',
        'Muller-Ortega, Paul. "The Triadic Heart of Śiva" (1989)'
      ]
    },
    {
      id: 'vijnanabhairava',
      name: 'Vijñāna Bhairava',
      sanskritName: 'विज्ञान भैरव',
      description: 'The "Wisdom of Bhairava"—a compendium of 112 meditation techniques (dhāraṇās) for realizing the nature of consciousness.',
      symbolism: 'Each technique is a door to the same room—the recognition of one\'s identity as Bhairava (ultimate consciousness). The 112 methods show that enlightenment is accessible through any aspect of experience.',
      mantras: ['Focus on technique rather than mantra', 'ॐ विज्ञान भैरवाय नमः'],
      iconography: 'Bhairava in conversation with Bhairavī (Śakti). The text is structured as a dialogue between the divine couple.',
      worshipPractices: ['Daily practice of one dhāraṇā', 'Experiment with different techniques', 'Integration into ordinary activities'],
      philosophicalSignificance: 'The Vijñāna Bhairava is practical spirituality at its finest. It teaches that liberation is available right now, through any experience—not just in special states.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Selected dhāraṇās illustrated', alt: 'Meditation techniques' },
        { url: '/placeholder.svg', caption: 'Bhairava-Bhairavī dialogue', alt: 'Shiva and Shakti conversation' }
      ],
      crossReferences: ['spanda', 'pratyabhijna', 'trika'],
      citationList: [
        'Vijñāna Bhairava Tantra',
        'Singh, Jaideva. "Vijñānabhairava or Divine Consciousness" (1979)',
        'Lakshman Joo. "Vijñāna Bhairava: The Practice of Centring Awareness" (2007)'
      ]
    },
    {
      id: 'abhinavagupta',
      name: 'Abhinavagupta',
      sanskritName: 'अभिनवगुप्त',
      description: 'The brilliant polymath who synthesized all streams of Kashmir Śaivism and Tantra into a coherent philosophical system in the 10th-11th century.',
      symbolism: 'Abhinava ("ever-new") + Gupta ("secret/protected")—the ever-fresh secret. He represents the living transmission of wisdom that renews itself in each generation.',
      mantras: ['ॐ अभिनवगुप्तपादेभ्यो नमः', 'Guru lineage recitation'],
      iconography: 'Depicted as a scholar-yogi, often shown writing or in meditation. Historical sources describe him surrounded by disciples.',
      worshipPractices: ['Study of his works', 'Guru paramparā meditation', 'Practice according to Tantrāloka'],
      philosophicalSignificance: 'Abhinavagupta\'s genius was integration. He showed how seemingly contradictory practices and philosophies express a single truth. His work remains the summit of Tantric scholarship.',
      gallery: [
        { url: '/placeholder.svg', caption: 'Traditional depiction of Abhinavagupta', alt: 'Kashmir Shaivism master' },
        { url: '/placeholder.svg', caption: 'Tantrāloka manuscript page', alt: 'Ancient tantra text' }
      ],
      crossReferences: ['trika', 'pratyabhijna', 'vijnanabhairava'],
      citationList: [
        'Abhinavagupta. "Tantrāloka"',
        'Abhinavagupta. "Tantrasāra"',
        'Sanderson, Alexis. "The Śaiva Age" (2009)',
        'Lawrence, David Peter. "The Teachings of the Odd-Eyed One" (2008)'
      ]
    }
  ]
};

export const tantraCategories: TantraCategory[] = [dashaMahavidya, shaktaUpasana, nathSampradaya, kashmirShaivism];

export const getTantraArticleById = (categoryId: string, articleId: string): TantraArticle | undefined => {
  const category = tantraCategories.find(c => c.id === categoryId);
  return category?.articles.find(a => a.id === articleId);
};

export const getAllTantraArticles = (): TantraArticle[] => {
  return tantraCategories.flatMap(c => c.articles);
};
