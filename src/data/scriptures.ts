export interface Verse {
  number: number;
  sanskrit: string;
  transliteration: string;
  meaning: string;
  commentary?: string;
}

export interface Chapter {
  number: number;
  name: string;
  sanskritName: string;
  summary: string;
  verseCount: number;
  verses: Verse[];
  themes: string[];
}

export interface Scripture {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  chapters: Chapter[];
  linkedTemples: string[];
  philosophyTags: string[];
  tradition: string;
}

export const bhagavadGita: Scripture = {
  id: "bhagavad-gita",
  name: "Bhagavad Gita",
  sanskritName: "श्रीमद्भगवद्गीता",
  description: "The Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture that is part of the epic Mahabharata. It contains a conversation between Pandava prince Arjuna and his guide Lord Krishna on a variety of philosophical issues.",
  linkedTemples: ["tirupati-balaji", "jagannath-puri"],
  philosophyTags: ["Karma Yoga", "Bhakti Yoga", "Jnana Yoga", "Raja Yoga", "Dharma", "Moksha"],
  tradition: "Vedanta",
  chapters: [
    {
      number: 1,
      name: "Arjuna's Dilemma",
      sanskritName: "अर्जुन विषाद योग",
      summary: "Arjuna observes the armies ready for battle and becomes overwhelmed with grief upon seeing his relatives, teachers, and friends on the opposing side. He expresses his moral dilemma to Krishna.",
      verseCount: 47,
      themes: ["Moral dilemma", "Compassion", "Family duty", "Grief"],
      verses: [
        {
          number: 1,
          sanskrit: "धृतराष्ट्र उवाच। धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः। मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥",
          transliteration: "dhṛtarāṣṭra uvāca dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ māmakāḥ pāṇḍavāś caiva kim akurvata sañjaya",
          meaning: "Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled on the holy field of Kurukshetra, eager to fight?",
          commentary: "The blind king Dhritarashtra asks Sanjaya about the events on the battlefield, signifying his attachment to his sons and his anxiety about the outcome."
        },
        {
          number: 2,
          sanskrit: "सञ्जय उवाच। दृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा। आचार्यमुपसङ्गम्य राजा वचनमब्रवीत्॥",
          transliteration: "sañjaya uvāca dṛṣṭvā tu pāṇḍavānīkaṁ vyūḍhaṁ duryodhanas tadā ācāryam upasaṅgamya rājā vacanam abravīt",
          meaning: "Sanjaya said: At that time, King Duryodhana, seeing the army of the Pandavas arrayed in battle formation, approached his teacher Drona and spoke these words.",
          commentary: "Duryodhana's approach to Drona reveals his concern about the formidable Pandava army."
        },
        {
          number: 47,
          sanskrit: "एवमुक्त्वार्जुनः सङ्ख्ये रथोपस्थ उपाविशत्। विसृज्य सशरं चापं शोकसंविग्नमानसः॥",
          transliteration: "evam uktvārjunaḥ saṅkhye rathopastha upāviśat visṛjya sa-śaraṁ cāpaṁ śoka-saṁvigna-mānasaḥ",
          meaning: "Having thus spoken on the battlefield, Arjuna cast aside his bow and arrows and sat down on the chariot, his mind overwhelmed with grief.",
          commentary: "This verse marks the climax of Arjuna's despair, setting the stage for Krishna's teachings."
        }
      ]
    },
    {
      number: 2,
      name: "The Yoga of Knowledge",
      sanskritName: "सांख्य योग",
      summary: "Krishna begins teaching Arjuna about the nature of the soul, the importance of performing one's duty without attachment to results, and introduces the concepts of Sankhya philosophy and Karma Yoga.",
      verseCount: 72,
      themes: ["Immortality of soul", "Duty", "Detachment", "Self-knowledge"],
      verses: [
        {
          number: 11,
          sanskrit: "अशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे। गतासूनगतासूंश्च नानुशोचन्ति पण्डिताः॥",
          transliteration: "aśocyān anvaśocas tvaṁ prajñā-vādāṁś ca bhāṣase gatāsūn agatāsūṁś ca nānuśocanti paṇḍitāḥ",
          meaning: "You grieve for those who should not be grieved for, yet you speak words of wisdom. The wise grieve neither for the living nor for the dead.",
          commentary: "Krishna begins his teachings by pointing out the contradiction in Arjuna's behavior—speaking wise words while lamenting."
        },
        {
          number: 14,
          sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः। आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥",
          transliteration: "mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ āgamāpāyino 'nityās tāṁs titikṣasva bhārata",
          meaning: "O son of Kunti, the contact of the senses with their objects gives rise to feelings of cold and heat, pleasure and pain. They are transitory, arising and passing away. Bear them patiently, O Bharata.",
          commentary: "Krishna teaches the importance of equanimity in the face of sensory experiences."
        },
        {
          number: 47,
          sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
          transliteration: "karmaṇy evādhikāras te mā phaleṣu kadācana mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi",
          meaning: "You have the right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
          commentary: "This is one of the most famous verses of the Gita, encapsulating the essence of Karma Yoga—action without attachment to results."
        }
      ]
    },
    {
      number: 3,
      name: "The Yoga of Action",
      sanskritName: "कर्म योग",
      summary: "Krishna explains the importance of selfless action (Karma Yoga) and how performing one's duty without attachment leads to liberation. He discusses the nature of action and the importance of setting an example.",
      verseCount: 43,
      themes: ["Selfless action", "Sacrifice", "Social responsibility", "Liberation through action"],
      verses: [
        {
          number: 19,
          sanskrit: "तस्मादसक्तः सततं कार्यं कर्म समाचर। असक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः॥",
          transliteration: "tasmād asaktaḥ satataṁ kāryaṁ karma samācara asakto hy ācaran karma param āpnoti pūruṣaḥ",
          meaning: "Therefore, without attachment, perform always the work that has to be done; for by performing action without attachment, one attains the Supreme.",
          commentary: "Krishna emphasizes that detached action leads to spiritual liberation."
        },
        {
          number: 21,
          sanskrit: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः। स यत्प्रमाणं कुरुते लोकस्तदनुवर्तते॥",
          transliteration: "yad yad ācarati śreṣṭhas tat tad evetaro janaḥ sa yat pramāṇaṁ kurute lokas tad anuvartate",
          meaning: "Whatever a great man does, others follow. Whatever standards he sets, the world pursues.",
          commentary: "This verse highlights the responsibility of leaders to set righteous examples."
        }
      ]
    },
    {
      number: 4,
      name: "The Yoga of Knowledge and Action",
      sanskritName: "ज्ञान कर्म संन्यास योग",
      summary: "Krishna reveals the divine nature of his incarnations, the importance of spiritual knowledge, and how wisdom transforms action into a means of liberation.",
      verseCount: 42,
      themes: ["Divine incarnation", "Wisdom", "Sacrifice", "Liberation"],
      verses: [
        {
          number: 7,
          sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
          transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata abhyutthānam adharmasya tadātmānaṁ sṛjāmy aham",
          meaning: "Whenever there is a decline of righteousness and rise of unrighteousness, O Arjuna, then I manifest Myself.",
          commentary: "This famous verse explains the purpose of divine incarnations—to restore dharma."
        },
        {
          number: 8,
          sanskrit: "परित्राणाय साधूनां विनाशाय च दुष्कृताम्। धर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥",
          transliteration: "paritrāṇāya sādhūnāṁ vināśāya ca duṣkṛtām dharma-saṁsthāpanārthāya sambhavāmi yuge yuge",
          meaning: "For the protection of the good, for the destruction of the wicked, and for the establishment of righteousness, I am born in every age.",
          commentary: "Krishna declares his recurring presence across ages to maintain cosmic order."
        }
      ]
    },
    {
      number: 5,
      name: "The Yoga of Renunciation",
      sanskritName: "कर्म संन्यास योग",
      summary: "Krishna explains the relationship between renunciation and action, showing how true renunciation is about inner detachment rather than external abandonment of duties.",
      verseCount: 29,
      themes: ["True renunciation", "Inner peace", "Equality of vision", "Self-realization"],
      verses: [
        {
          number: 18,
          sanskrit: "विद्याविनयसम्पन्ने ब्राह्मणे गवि हस्तिनि। शुनि चैव श्वपाके च पण्डिताः समदर्शिनः॥",
          transliteration: "vidyā-vinaya-sampanne brāhmaṇe gavi hastini śuni caiva śva-pāke ca paṇḍitāḥ sama-darśinaḥ",
          meaning: "The wise see with equal vision a learned and humble Brahmin, a cow, an elephant, a dog, and an outcaste.",
          commentary: "This verse teaches the spiritual equality of all beings in the eyes of a realized soul."
        }
      ]
    },
    {
      number: 6,
      name: "The Yoga of Meditation",
      sanskritName: "ध्यान योग",
      summary: "Krishna teaches the practice of meditation, describing the proper posture, mental focus, and the balanced life required for spiritual practice.",
      verseCount: 47,
      themes: ["Meditation", "Self-control", "Mind discipline", "Balanced living"],
      verses: [
        {
          number: 5,
          sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
          transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet ātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ",
          meaning: "Let one lift oneself by one's own self; let one not degrade oneself. For the self alone is the friend of the self, and the self alone is the enemy of the self.",
          commentary: "This profound verse emphasizes self-reliance in spiritual development."
        },
        {
          number: 34,
          sanskrit: "चञ्चलं हि मनः कृष्ण प्रमाथि बलवद्दृढम्। तस्याहं निग्रहं मन्ये वायोरिव सुदुष्करम्॥",
          transliteration: "cañcalaṁ hi manaḥ kṛṣṇa pramāthi balavad dṛḍham tasyāhaṁ nigrahaṁ manye vāyor iva su-duṣkaram",
          meaning: "The mind is restless, turbulent, obstinate and very strong, O Krishna. To subdue it seems to me more difficult than controlling the wind.",
          commentary: "Arjuna voices the universal challenge of controlling the wandering mind."
        }
      ]
    },
    {
      number: 7,
      name: "Knowledge and Realization",
      sanskritName: "ज्ञान विज्ञान योग",
      summary: "Krishna reveals his divine nature in full, explaining both his transcendent and immanent aspects, and the different types of devotees who seek him.",
      verseCount: 30,
      themes: ["Divine nature", "Material nature", "Types of seekers", "Devotion"],
      verses: [
        {
          number: 7,
          sanskrit: "मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय। मयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव॥",
          transliteration: "mattaḥ parataraṁ nānyat kiñcid asti dhanañjaya mayi sarvam idaṁ protaṁ sūtre maṇi-gaṇā iva",
          meaning: "There is nothing higher than Me, O Arjuna. All this is strung on Me, as clusters of gems on a string.",
          commentary: "Krishna reveals his supreme position as the ultimate reality underlying all existence."
        }
      ]
    },
    {
      number: 8,
      name: "The Imperishable Absolute",
      sanskritName: "अक्षर ब्रह्म योग",
      summary: "Krishna explains the nature of the imperishable Brahman, the importance of remembering God at the time of death, and the cosmic cycles of creation.",
      verseCount: 28,
      themes: ["Brahman", "Death and rebirth", "Cosmic cycles", "Remembrance"],
      verses: [
        {
          number: 5,
          sanskrit: "अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम्। यः प्रयाति स मद्भावं याति नास्त्यत्र संशयः॥",
          transliteration: "anta-kāle ca mām eva smaran muktvā kalevaram yaḥ prayāti sa mad-bhāvaṁ yāti nāsty atra saṁśayaḥ",
          meaning: "Whoever, at the end of life, quits the body remembering Me alone, attains My nature. Of this there is no doubt.",
          commentary: "The importance of consciousness at the moment of death is emphasized."
        }
      ]
    },
    {
      number: 9,
      name: "The Royal Knowledge",
      sanskritName: "राजविद्या राजगुह्य योग",
      summary: "Krishna reveals the most confidential knowledge—the path of devotion—and explains how the Supreme pervades all creation while remaining transcendent.",
      verseCount: 34,
      themes: ["Royal secret", "Devotion", "Divine omnipresence", "Grace"],
      verses: [
        {
          number: 22,
          sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते। तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",
          transliteration: "ananyāś cintayanto māṁ ye janāḥ paryupāsate teṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham",
          meaning: "To those who worship Me alone, thinking of no other, who are ever devoted, I secure what they lack and preserve what they have.",
          commentary: "Krishna's promise to care for his devoted ones completely."
        },
        {
          number: 26,
          sanskrit: "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति। तदहं भक्त्युपहृतमश्नामि प्रयतात्मनः॥",
          transliteration: "patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati tad ahaṁ bhakty-upahṛtam aśnāmi prayatātmanaḥ",
          meaning: "If one offers Me with love and devotion a leaf, a flower, a fruit, or water, I will accept it.",
          commentary: "The simplicity and accessibility of devotion—God accepts even the humblest offering when given with love."
        }
      ]
    },
    {
      number: 10,
      name: "Divine Glories",
      sanskritName: "विभूति योग",
      summary: "Krishna describes his divine manifestations in the world, showing how he is present as the best and most excellent in all categories of existence.",
      verseCount: 42,
      themes: ["Divine manifestations", "Glory", "Omnipresence", "Excellence"],
      verses: [
        {
          number: 20,
          sanskrit: "अहमात्मा गुडाकेश सर्वभूताशयस्थितः। अहमादिश्च मध्यं च भूतानामन्त एव च॥",
          transliteration: "aham ātmā guḍākeśa sarva-bhūtāśaya-sthitaḥ aham ādiś ca madhyaṁ ca bhūtānām anta eva ca",
          meaning: "I am the Self, O Gudakesha, seated in the hearts of all creatures. I am the beginning, the middle, and the end of all beings.",
          commentary: "Krishna reveals his presence as the innermost Self of all beings."
        }
      ]
    },
    {
      number: 11,
      name: "The Cosmic Vision",
      sanskritName: "विश्वरूप दर्शन योग",
      summary: "Upon Arjuna's request, Krishna reveals his universal cosmic form, showing all of creation, destruction, and divinity in one terrifying and awe-inspiring vision.",
      verseCount: 55,
      themes: ["Cosmic form", "Universal vision", "Awe", "Divine revelation"],
      verses: [
        {
          number: 32,
          sanskrit: "कालोऽस्मि लोकक्षयकृत्प्रवृद्धो लोकान्समाहर्तुमिह प्रवृत्तः। ऋतेऽपि त्वां न भविष्यन्ति सर्वे येऽवस्थिताः प्रत्यनीकेषु योधाः॥",
          transliteration: "kālo 'smi loka-kṣaya-kṛt pravṛddho lokān samāhartum iha pravṛttaḥ ṛte 'pi tvāṁ na bhaviṣyanti sarve ye 'vasthitāḥ pratyanīkeṣu yodhāḥ",
          meaning: "I am Time, the great destroyer of the worlds, and I have come here to destroy all people. Even without your participation, all the warriors on the opposing side shall cease to exist.",
          commentary: "One of the most powerful verses, revealing Krishna as Time itself, the ultimate destroyer."
        }
      ]
    },
    {
      number: 12,
      name: "The Yoga of Devotion",
      sanskritName: "भक्ति योग",
      summary: "Krishna describes the path of devotion as the highest and easiest path to him, and lists the qualities of a true devotee.",
      verseCount: 20,
      themes: ["Devotion", "Surrender", "Divine qualities", "Love of God"],
      verses: [
        {
          number: 13,
          sanskrit: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च। निर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥",
          transliteration: "adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca nirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī",
          meaning: "One who is not envious but is a kind friend to all living entities, who does not think himself a proprietor, who is free from false ego, and equal in both happiness and distress, who is forgiving.",
          commentary: "The beginning of Krishna's description of the ideal devotee's qualities."
        }
      ]
    },
    {
      number: 13,
      name: "The Field and the Knower",
      sanskritName: "क्षेत्र क्षेत्रज्ञ विभाग योग",
      summary: "Krishna explains the distinction between the body (the field) and the soul (the knower of the field), and describes true knowledge.",
      verseCount: 35,
      themes: ["Body and soul", "Knowledge", "Nature and consciousness", "Liberation"],
      verses: [
        {
          number: 2,
          sanskrit: "क्षेत्रज्ञं चापि मां विद्धि सर्वक्षेत्रेषु भारत। क्षेत्रक्षेत्रज्ञयोर्ज्ञानं यत्तज्ज्ञानं मतं मम॥",
          transliteration: "kṣetra-jñaṁ cāpi māṁ viddhi sarva-kṣetreṣu bhārata kṣetra-kṣetrajñayor jñānaṁ yat taj jñānaṁ mataṁ mama",
          meaning: "Know Me to be the knower of the field in all fields, O Bharata. The knowledge of the field and the knower of the field I consider to be true knowledge.",
          commentary: "Krishna identifies himself as the ultimate consciousness present in all beings."
        }
      ]
    },
    {
      number: 14,
      name: "The Three Gunas",
      sanskritName: "गुणत्रय विभाग योग",
      summary: "Krishna explains the three qualities (gunas) of material nature—sattva (goodness), rajas (passion), and tamas (ignorance)—and how they bind the soul.",
      verseCount: 27,
      themes: ["Three gunas", "Material nature", "Bondage", "Transcendence"],
      verses: [
        {
          number: 5,
          sanskrit: "सत्त्वं रजस्तम इति गुणाः प्रकृतिसम्भवाः। निबध्नन्ति महाबाहो देहे देहिनमव्ययम्॥",
          transliteration: "sattvaṁ rajas tama iti guṇāḥ prakṛti-sambhavāḥ nibadhnanti mahā-bāho dehe dehinam avyayam",
          meaning: "The three modes of material nature—goodness, passion, and ignorance—born of nature, bind the imperishable soul to the body, O mighty-armed one.",
          commentary: "The mechanism of how the eternal soul becomes bound to material existence."
        }
      ]
    },
    {
      number: 15,
      name: "The Supreme Person",
      sanskritName: "पुरुषोत्तम योग",
      summary: "Using the metaphor of an inverted cosmic tree, Krishna explains the nature of the material world and reveals himself as the Supreme Person beyond both the perishable and imperishable.",
      verseCount: 20,
      themes: ["Cosmic tree", "Supreme Person", "Detachment", "Transcendence"],
      verses: [
        {
          number: 15,
          sanskrit: "सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च। वेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम्॥",
          transliteration: "sarvasya cāhaṁ hṛdi sanniviṣṭo mattaḥ smṛtir jñānam apohanaṁ ca vedaiś ca sarvair aham eva vedyo vedānta-kṛd veda-vid eva cāham",
          meaning: "I am seated in the hearts of all. From Me come memory, knowledge, and their removal. I am indeed to be known by all the Vedas. I am the author of Vedanta, and I am the knower of the Vedas.",
          commentary: "Krishna's presence as the inner guide of all beings and the goal of all scriptures."
        }
      ]
    },
    {
      number: 16,
      name: "Divine and Demonic Natures",
      sanskritName: "दैवासुर सम्पद विभाग योग",
      summary: "Krishna describes the qualities that lead to liberation (divine nature) and those that lead to bondage (demonic nature).",
      verseCount: 24,
      themes: ["Divine qualities", "Demonic qualities", "Character", "Destiny"],
      verses: [
        {
          number: 1,
          sanskrit: "अभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः। दानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम्॥",
          transliteration: "abhayaṁ sattva-saṁśuddhir jñāna-yoga-vyavasthitiḥ dānaṁ damaś ca yajñaś ca svādhyāyas tapa ārjavam",
          meaning: "Fearlessness, purification of one's existence, cultivation of spiritual knowledge, charity, self-control, sacrifice, study of the Vedas, austerity, and simplicity.",
          commentary: "The beginning of the list of divine qualities that lead to liberation."
        }
      ]
    },
    {
      number: 17,
      name: "The Three Divisions of Faith",
      sanskritName: "श्रद्धात्रय विभाग योग",
      summary: "Krishna explains how faith, food, sacrifice, austerity, and charity are all influenced by the three gunas, and the significance of 'Om Tat Sat'.",
      verseCount: 28,
      themes: ["Faith", "Food", "Sacrifice", "Om Tat Sat"],
      verses: [
        {
          number: 3,
          sanskrit: "सत्त्वानुरूपा सर्वस्य श्रद्धा भवति भारत। श्रद्धामयोऽयं पुरुषो यो यच्छ्रद्धः स एव सः॥",
          transliteration: "sattvānurūpā sarvasya śraddhā bhavati bhārata śraddhā-mayo 'yaṁ puruṣo yo yac-chraddhaḥ sa eva saḥ",
          meaning: "The faith of each is in accordance with one's own nature, O Bharata. One is made of faith. As one's faith is, so is one.",
          commentary: "Faith shapes a person's character and destiny."
        }
      ]
    },
    {
      number: 18,
      name: "The Yoga of Liberation",
      sanskritName: "मोक्ष संन्यास योग",
      summary: "The final chapter summarizes all teachings, explains true renunciation, describes liberation, and ends with Krishna's ultimate instruction to surrender completely to him.",
      verseCount: 78,
      themes: ["Renunciation", "Duty", "Surrender", "Liberation", "Grace"],
      verses: [
        {
          number: 63,
          sanskrit: "इति ते ज्ञानमाख्यातं गुह्याद्गुह्यतरं मया। विमृश्यैतदशेषेण यथेच्छसि तथा कुरु॥",
          transliteration: "iti te jñānam ākhyātaṁ guhyād guhyataraṁ mayā vimṛśyaitad aśeṣeṇa yathecchasi tathā kuru",
          meaning: "Thus I have explained to you knowledge more secret than all secrets. Deliberate on this fully, and then do as you wish.",
          commentary: "Krishna grants Arjuna complete freedom to choose, respecting human free will."
        },
        {
          number: 66,
          sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
          transliteration: "sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja ahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ",
          meaning: "Abandon all varieties of dharma and simply surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
          commentary: "The ultimate teaching of the Gita—complete surrender to the Divine."
        },
        {
          number: 78,
          sanskrit: "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः। तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम॥",
          transliteration: "yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanur-dharaḥ tatra śrīr vijayo bhūtir dhruvā nītir matir mama",
          meaning: "Wherever there is Krishna, the Lord of Yoga, and wherever there is Arjuna, the wielder of the bow, there will certainly be fortune, victory, prosperity, and righteousness. This is my conclusion.",
          commentary: "Sanjaya's concluding verse—wherever there is divine guidance and righteous action, success is assured."
        }
      ]
    }
  ]
};

export const scriptures: Scripture[] = [bhagavadGita];

export const getScriptureById = (id: string): Scripture | undefined => {
  return scriptures.find(s => s.id === id);
};

export const getChapterByNumber = (scriptureId: string, chapterNumber: number): Chapter | undefined => {
  const scripture = getScriptureById(scriptureId);
  return scripture?.chapters.find(c => c.number === chapterNumber);
};

export const getVerseByNumber = (scriptureId: string, chapterNumber: number, verseNumber: number): Verse | undefined => {
  const chapter = getChapterByNumber(scriptureId, chapterNumber);
  return chapter?.verses.find(v => v.number === verseNumber);
};
