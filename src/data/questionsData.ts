export interface PhilosophicalQuestion {
  id: string;
  question: string;
  sanskrit: string;
  description: string;
  answer: string;
  relatedConcepts: string[];
  sources: string[];
}

export const philosophicalQuestions: PhilosophicalQuestion[] = [
  {
    id: 'koham',
    question: 'Who am I?',
    sanskrit: 'कोऽहम्',
    description: 'The inquiry into Self, Ātman, and identity',
    answer: `The question "Who am I?" (कोऽहम्) is the foundational inquiry of Vedānta and Advaita philosophy. According to the Upaniṣads, the true Self (Ātman) is not the body, mind, or ego, but pure consciousness—identical with Brahman, the ultimate reality.

**The Process of Self-Inquiry (Ātma Vicāra)**

Śrī Ramaṇa Maharṣi taught that by persistently asking "Who am I?" and tracing the source of the "I"-thought, one discovers that the individual self dissolves into pure awareness. This is not an intellectual answer but a direct experience.

**The Vedāntic Answer**

The Māṇḍūkya Upaniṣad reveals that beyond the waking, dreaming, and deep sleep states lies Turīya—the fourth state of pure consciousness that is one's true nature. The Bṛhadāraṇyaka Upaniṣad declares: "Ayam Ātmā Brahma" (This Self is Brahman).

**Practical Implications**

Understanding one's true identity liberates from fear, desire, and the cycle of suffering. When one realizes "I am not this body-mind complex but eternal consciousness," the search for fulfillment in external objects naturally ceases.`,
    relatedConcepts: ['ātman', 'brahman', 'advaita', 'mokṣa', 'jñāna-yoga'],
    sources: ['Bṛhadāraṇyaka Upaniṣad', 'Māṇḍūkya Upaniṣad', 'Vivekacūḍāmaṇi of Śaṅkarācārya', 'Who Am I? by Ramaṇa Maharṣi']
  },
  {
    id: 'dharma-kim',
    question: 'What is Dharma?',
    sanskrit: 'धर्मः किम्',
    description: 'Cosmic law, ethics, and righteous conduct',
    answer: `Dharma (धर्म) is one of the most comprehensive concepts in Hindu philosophy, defying simple translation. It encompasses cosmic order, ethical duty, righteous conduct, and the essential nature of things.

**Etymological Understanding**

Derived from the root "dhṛ" (to hold, support, maintain), Dharma literally means "that which upholds." It is the foundation upon which the universe operates and individuals should conduct their lives.

**Multiple Dimensions of Dharma**

1. **Ṛta Dharma** — The cosmic order governing natural phenomena
2. **Varṇa Dharma** — Duties according to one's aptitude and station
3. **Āśrama Dharma** — Responsibilities at different life stages
4. **Svadharma** — One's personal path and essential nature
5. **Sādhāraṇa Dharma** — Universal ethical principles (ahiṃsā, satya, etc.)

**The Mahābhārata's Insight**

"Dharma exists for the welfare of all beings. Hence, that by which the welfare of all living beings is sustained, that is Dharma." — Śānti Parva

**Dynamic Nature**

Dharma is not static rules but responsive wisdom. The right action (dharma) in one context may differ in another. This is why scriptures speak of dharma-sūkṣma (the subtlety of dharma) that requires viveka (discrimination) to discern.`,
    relatedConcepts: ['ṛta', 'karma', 'svadharma', 'viveka', 'nyāya'],
    sources: ['Bhagavad Gītā', 'Mahābhārata', 'Manusmṛti', 'Dharmasūtras']
  },
  {
    id: 'moksha-kim',
    question: 'What is Moksha?',
    sanskrit: 'मोक्षः किम्',
    description: 'Liberation from the cycle of existence',
    answer: `Mokṣa (मोक्ष) represents the ultimate goal of human existence in Hindu philosophy—liberation from the cycle of birth and death (saṃsāra) and the realization of one's true nature.

**The Nature of Bondage**

According to Vedānta, bondage is not physical but epistemic—it arises from avidyā (ignorance) that causes misidentification of the Self with the body-mind complex. This false identification creates desire, action, and the perpetuation of karma.

**Different Paths to Mokṣa**

1. **Jñāna Mārga** — The path of knowledge through discrimination between the real and unreal
2. **Bhakti Mārga** — The path of devotion through surrender to the Divine
3. **Karma Mārga** — The path of selfless action without attachment to fruits
4. **Yoga Mārga** — The path of meditation and inner discipline

**Types of Liberation**

- **Jīvanmukti** — Liberation while living in the body
- **Videhamukti** — Liberation at the time of death
- **Sālokya, Sāmīpya, Sārūpya, Sāyujya** — Progressive stages of union with the Divine in bhakti traditions

**The Paradox of Mokṣa**

The Advaita tradition teaches that mokṣa is not something to be attained but recognized—it is one's eternal nature, merely obscured by ignorance. As the Upaniṣads declare: "You are already That" (Tat Tvam Asi).`,
    relatedConcepts: ['saṃsāra', 'karma', 'jñāna', 'bhakti', 'ātman'],
    sources: ['Bhagavad Gītā', 'Brahma Sūtras', 'Muktikopaniṣad', 'Yoga Sūtras of Patañjali']
  },
  {
    id: 'karma-kim',
    question: 'What is Karma?',
    sanskrit: 'कर्म किम्',
    description: 'Action, consequence, and cosmic justice',
    answer: `Karma (कर्म) is the universal law of cause and effect that governs all action and its consequences. Far from being fatalistic determinism, karma is the basis of ethical responsibility and spiritual evolution.

**The Law of Karma**

Every action (mental, verbal, or physical) creates an impression (saṃskāra) that influences future experiences. Good actions create merit (puṇya); harmful actions create demerit (pāpa). This is not reward or punishment but natural consequence.

**Three Types of Karma**

1. **Sañcita Karma** — The accumulated storehouse of all past karmas
2. **Prārabdha Karma** — The portion of sañcita currently manifesting as one's present life circumstances
3. **Kriyamāṇa (Āgāmi) Karma** — New karmas being created in the present

**Beyond the Fruit of Action**

The Bhagavad Gītā's revolutionary teaching is nishkāma karma—action without attachment to results. When action is performed as worship, without selfish desire, it does not bind: "Karmaṇy evādhikāras te mā phaleṣu kadācana" (2.47).

**Karma and Free Will**

While prārabdha determines circumstances, response to circumstances is free. This is the space of spiritual growth—one cannot change what happens, but can always choose how to respond.`,
    relatedConcepts: ['dharma', 'saṃsāra', 'punarjanma', 'nishkāma karma', 'yoga'],
    sources: ['Bhagavad Gītā', 'Yoga Sūtras', 'Brahma Sūtras', 'Manusmṛti']
  },
  {
    id: 'duhkha-kim',
    question: 'What is Suffering?',
    sanskrit: 'दुःखम् किम्',
    description: 'The nature of pain and its transcendence',
    answer: `Duḥkha (दुःख) in Hindu philosophy refers to the inherent unsatisfactoriness of conditioned existence—a suffering that goes beyond physical pain to include psychological and existential dimensions.

**The Three Types of Suffering**

1. **Ādhyātmika** — Suffering arising from one's own body and mind (disease, mental anguish)
2. **Ādhibhautika** — Suffering caused by other beings (animals, humans)
3. **Ādhidaivika** — Suffering from natural forces and cosmic events

**The Root Cause**

According to Sāṅkhya philosophy, the root cause of suffering is avidyā—the failure to discriminate between Puruṣa (consciousness) and Prakṛti (matter). The Yoga Sūtras identify five kleśas (afflictions): ignorance, ego, attachment, aversion, and clinging to life.

**The Path Beyond Suffering**

The Gītā teaches equanimity (samatva) as the solution—remaining balanced in pleasure and pain, success and failure. The Yogī who has "sama-duḥkha-sukha" (equal in suffering and happiness) attains peace.

**Suffering as Teacher**

Hindu philosophy does not merely seek to escape suffering but to understand its teaching. Suffering can be the doorway to awakening, prompting the inquiry that leads to liberation. As Kṛṣṇa tells Arjuna, grief itself becomes the occasion for the highest teaching.`,
    relatedConcepts: ['avidyā', 'kleśa', 'vairāgya', 'mokṣa', 'yoga'],
    sources: ['Yoga Sūtras', 'Bhagavad Gītā', 'Sāṅkhya Kārikā', 'Vivekacūḍāmaṇi']
  },
  {
    id: 'satya-kim',
    question: 'What is Reality?',
    sanskrit: 'सत्यं किम्',
    description: 'The metaphysics of existence and illusion',
    answer: `Satya (सत्य) or Reality in Hindu philosophy refers to that which exists unchangingly across all times—past, present, and future. The investigation into the nature of reality is the core of Vedāntic inquiry.

**Levels of Reality**

Advaita Vedānta distinguishes three levels:

1. **Pāramārthika Satya** — Absolute reality (Brahman alone)
2. **Vyāvahārika Satya** — Empirical reality (the world of transactions)
3. **Prātibhāsika Satya** — Apparent reality (dreams, illusions)

**The World as Māyā**

The world is neither absolutely real nor absolutely unreal—it is mithyā (neither sat nor asat). Like the rope mistaken for a snake, the world has apparent but not ultimate reality. This is not nihilism but a precise metaphysical statement.

**Sat-Cit-Ānanda**

Ultimate reality is described as Sat (existence), Cit (consciousness), and Ānanda (bliss). This is not a God with attributes but the very nature of awareness itself.

**Practical Implications**

Understanding the relative nature of empirical reality does not mean rejecting the world but engaging with it wisely—without absolute attachment or absolute aversion. The jñānī sees Brahman in all things and all things in Brahman.`,
    relatedConcepts: ['brahman', 'māyā', 'avidyā', 'viveka', 'advaita'],
    sources: ['Māṇḍūkya Upaniṣad', 'Brahma Sūtras', 'Vivekacūḍāmaṇi', 'Drg-Drśya-Viveka']
  }
];

export const getQuestionById = (id: string): PhilosophicalQuestion | undefined => {
  return philosophicalQuestions.find(q => q.id === id);
};
