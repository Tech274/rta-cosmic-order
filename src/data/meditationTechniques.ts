export interface MeditationTechnique {
  id: string;
  name: string;
  sanskritName: string;
  category: 'breath' | 'mantra' | 'visualization' | 'awareness' | 'devotional';
  description: string;
  instructions: string[];
  benefits: string[];
  duration: number; // recommended duration in seconds
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tradition: string;
}

export interface AmbientSound {
  id: string;
  name: string;
  icon: string;
  frequency?: number; // Hz for generated tones
  type: 'nature' | 'instrument' | 'frequency';
}

export const meditationTechniques: MeditationTechnique[] = [
  {
    id: 'anapana',
    name: 'Breath Awareness',
    sanskritName: 'आनापान',
    category: 'breath',
    description: 'Simple observation of natural breath, the foundation of many meditation practices.',
    instructions: [
      'Sit comfortably with spine erect',
      'Close your eyes gently',
      'Bring attention to the natural flow of breath',
      'Observe the breath at the nostrils or abdomen',
      'When mind wanders, gently return to the breath',
      'Do not try to control the breath, simply observe'
    ],
    benefits: ['Calms the mind', 'Develops concentration', 'Reduces anxiety', 'Foundation for deeper practices'],
    duration: 15 * 60,
    difficulty: 'beginner',
    tradition: 'Vipassana'
  },
  {
    id: 'so-ham',
    name: 'So-Ham Meditation',
    sanskritName: 'सोऽहम्',
    category: 'mantra',
    description: 'Meditation on the natural mantra of breath - "So" on inhale, "Ham" on exhale, meaning "I am That".',
    instructions: [
      'Sit in a comfortable position',
      'Observe your natural breath',
      'On inhale, mentally hear "So"',
      'On exhale, mentally hear "Ham"',
      'Let the mantra arise naturally with breath',
      'Feel the meaning: I am the universal consciousness'
    ],
    benefits: ['Self-inquiry', 'Union with universal consciousness', 'Natural and effortless', 'Deepens breath awareness'],
    duration: 20 * 60,
    difficulty: 'beginner',
    tradition: 'Vedanta'
  },
  {
    id: 'trataka',
    name: 'Candle Gazing',
    sanskritName: 'त्राटक',
    category: 'visualization',
    description: 'Steady gazing at a candle flame to purify the eyes and develop concentration.',
    instructions: [
      'Place a candle at eye level, arm\'s length away',
      'Gaze at the flame without blinking',
      'When eyes water, close them gently',
      'Visualize the flame at the third eye center',
      'When image fades, open eyes and repeat',
      'Practice for 10-20 minutes'
    ],
    benefits: ['Improves concentration', 'Strengthens eye muscles', 'Develops willpower', 'Prepares for deeper meditation'],
    duration: 15 * 60,
    difficulty: 'intermediate',
    tradition: 'Hatha Yoga'
  },
  {
    id: 'yoga-nidra',
    name: 'Yogic Sleep',
    sanskritName: 'योग निद्रा',
    category: 'awareness',
    description: 'A state of conscious deep sleep for profound relaxation and healing.',
    instructions: [
      'Lie down in Shavasana (corpse pose)',
      'Set a Sankalpa (intention)',
      'Rotate awareness through body parts systematically',
      'Observe breath and sensations',
      'Visualize suggested images',
      'Return to Sankalpa before coming out'
    ],
    benefits: ['Deep relaxation', 'Stress relief', 'Heals psychosomatic conditions', 'Improves sleep quality'],
    duration: 30 * 60,
    difficulty: 'beginner',
    tradition: 'Tantra Yoga'
  },
  {
    id: 'japa-dhyana',
    name: 'Mantra Meditation',
    sanskritName: 'जप ध्यान',
    category: 'mantra',
    description: 'Repetition of sacred mantras to focus the mind and invoke divine presence.',
    instructions: [
      'Choose a mantra (Om, Om Namah Shivaya, etc.)',
      'Sit in a comfortable meditation posture',
      'Close eyes and relax the body',
      'Begin repeating the mantra mentally',
      'Synchronize with breath if helpful',
      'Let the mantra become subtler over time'
    ],
    benefits: ['Purifies the mind', 'Invokes spiritual energy', 'Develops one-pointed focus', 'Transforms consciousness'],
    duration: 20 * 60,
    difficulty: 'beginner',
    tradition: 'Bhakti Yoga'
  },
  {
    id: 'chakra-dhyana',
    name: 'Chakra Meditation',
    sanskritName: 'चक्र ध्यान',
    category: 'visualization',
    description: 'Meditation on the seven energy centers along the spine.',
    instructions: [
      'Sit with spine erect',
      'Begin at Muladhara (base of spine)',
      'Visualize each chakra with its color and symbol',
      'Chant the bija mantra for each center',
      'Move awareness upward through all seven chakras',
      'Rest attention at Sahasrara (crown)'
    ],
    benefits: ['Balances energy centers', 'Awakens kundalini gradually', 'Enhances vitality', 'Expands awareness'],
    duration: 30 * 60,
    difficulty: 'intermediate',
    tradition: 'Tantra Yoga'
  },
  {
    id: 'atma-vichara',
    name: 'Self-Inquiry',
    sanskritName: 'आत्म विचार',
    category: 'awareness',
    description: 'Direct investigation into the nature of the self through the question "Who am I?"',
    instructions: [
      'Sit quietly and turn attention inward',
      'Ask "Who am I?" with genuine curiosity',
      'Reject all answers that are objects (body, mind, etc.)',
      'Trace the feeling of "I" back to its source',
      'Rest in the pure awareness that remains',
      'Return to inquiry when thoughts arise'
    ],
    benefits: ['Direct path to self-realization', 'Dissolves ego identification', 'Reveals true nature', 'Ultimate liberation'],
    duration: 20 * 60,
    difficulty: 'advanced',
    tradition: 'Advaita Vedanta'
  },
  {
    id: 'metta-bhavana',
    name: 'Loving-Kindness',
    sanskritName: 'मैत्री भावना',
    category: 'devotional',
    description: 'Cultivation of unconditional love and goodwill towards all beings.',
    instructions: [
      'Begin by directing love towards yourself',
      'Extend to loved ones',
      'Include neutral people',
      'Include difficult people',
      'Expand to all beings everywhere',
      'Rest in boundless love'
    ],
    benefits: ['Opens the heart', 'Heals relationships', 'Reduces anger and fear', 'Cultivates compassion'],
    duration: 20 * 60,
    difficulty: 'beginner',
    tradition: 'Buddhist/Yogic'
  }
];

export const ambientSounds: AmbientSound[] = [
  { id: 'silence', name: 'Silence', icon: '🔇', type: 'nature' },
  { id: 'om-drone', name: 'Om Drone', icon: '🕉️', frequency: 136.1, type: 'frequency' },
  { id: 'tibetan-bowls', name: 'Singing Bowls', icon: '🔔', type: 'instrument' },
  { id: 'rain', name: 'Rain', icon: '🌧️', type: 'nature' },
  { id: 'ocean', name: 'Ocean Waves', icon: '🌊', type: 'nature' },
  { id: 'forest', name: 'Forest', icon: '🌲', type: 'nature' },
  { id: 'temple-bells', name: 'Temple Bells', icon: '🛕', type: 'instrument' },
  { id: 'solfeggio-528', name: '528 Hz', icon: '✨', frequency: 528, type: 'frequency' },
  { id: 'binaural-theta', name: 'Theta Waves', icon: '🧠', frequency: 6, type: 'frequency' },
];

export const timerPresets = [
  { label: '5 min', seconds: 5 * 60 },
  { label: '10 min', seconds: 10 * 60 },
  { label: '15 min', seconds: 15 * 60 },
  { label: '20 min', seconds: 20 * 60 },
  { label: '30 min', seconds: 30 * 60 },
  { label: '45 min', seconds: 45 * 60 },
  { label: '60 min', seconds: 60 * 60 },
  { label: '90 min', seconds: 90 * 60 },
];

export const categoryLabels: Record<MeditationTechnique['category'], string> = {
  breath: 'Breath-Based',
  mantra: 'Mantra',
  visualization: 'Visualization',
  awareness: 'Awareness',
  devotional: 'Devotional'
};

export const categoryIcons: Record<MeditationTechnique['category'], string> = {
  breath: '🌬️',
  mantra: '🕉️',
  visualization: '👁️',
  awareness: '💫',
  devotional: '🙏'
};
