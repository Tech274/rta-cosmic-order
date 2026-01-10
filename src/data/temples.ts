export interface Temple {
  id: string;
  name: string;
  sanskritName: string;
  deity: string;
  location: {
    city: string;
    state: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  description: string;
  history: string;
  architecture: string;
  legends: string[];
  festivals: {
    name: string;
    month: string;
    description: string;
  }[];
  howToReach: {
    byAir: string;
    byTrain: string;
    byRoad: string;
  };
  linkedScriptures: string[];
  imageUrl: string;
  significance: string;
  timings: string;
  dressCode: string;
}

export const temples: Temple[] = [
  {
    id: "kashi-vishwanath",
    name: "Kashi Vishwanath Temple",
    sanskritName: "काशी विश्वनाथ मन्दिर",
    deity: "Lord Shiva (Vishwanath)",
    location: {
      city: "Varanasi",
      state: "Uttar Pradesh",
      country: "India",
      coordinates: { lat: 25.3109, lng: 83.0107 }
    },
    description: "One of the most sacred Hindu temples dedicated to Lord Shiva, located on the western bank of the holy river Ganga. It is one of the twelve Jyotirlingas.",
    history: "The temple has been destroyed and rebuilt several times throughout history. The current structure was built in 1780 by Ahilyabai Holkar, the Maratha ruler of Indore.",
    architecture: "The temple has three domes, all covered with gold donated by Maharaja Ranjit Singh. The spire is 15.5 meters tall and made of pure gold.",
    legends: [
      "Kashi is believed to be the place where Shiva and Parvati first settled on Earth",
      "It is said that Brahma performed his first yajna here after the creation of the universe",
      "The city is believed to rest on the tip of Shiva's trident"
    ],
    festivals: [
      { name: "Mahashivaratri", month: "February/March", description: "The night of Shiva, celebrated with night-long vigils and worship" },
      { name: "Dev Deepawali", month: "November", description: "The Diwali of the Gods, celebrated 15 days after regular Diwali" },
      { name: "Shravan Month", month: "July/August", description: "Entire month dedicated to Shiva worship with Kanwar Yatra" }
    ],
    howToReach: {
      byAir: "Lal Bahadur Shastri International Airport, Varanasi (26 km)",
      byTrain: "Varanasi Junction Railway Station (2 km)",
      byRoad: "Well connected by NH-2 and state highways"
    },
    linkedScriptures: ["Skanda Purana", "Kashi Khanda", "Shiva Purana"],
    imageUrl: "/placeholder.svg",
    significance: "Liberation (Moksha) is believed to be attained by those who die in Kashi",
    timings: "3:00 AM - 11:00 PM (with breaks)",
    dressCode: "Traditional attire preferred; modest clothing required"
  },
  {
    id: "tirupati-balaji",
    name: "Tirumala Venkateswara Temple",
    sanskritName: "तिरुमला वेंकटेश्वर मन्दिर",
    deity: "Lord Venkateswara (Vishnu)",
    location: {
      city: "Tirupati",
      state: "Andhra Pradesh",
      country: "India",
      coordinates: { lat: 13.6833, lng: 79.3500 }
    },
    description: "The richest and most visited temple in the world, located atop the seven hills of Tirumala. Devotees believe that worship here fulfills all wishes.",
    history: "The temple is believed to be over 2000 years old. Historical records date back to 300 CE with inscriptions from the Pallava dynasty.",
    architecture: "Dravidian architecture with the main sanctum (Garbhagriha) covered in gold plates. The Vimana (tower) is called Ananda Nilayam.",
    legends: [
      "Lord Vishnu descended to Earth as Venkateswara to save humanity during Kali Yuga",
      "He borrowed wealth from Kubera to marry Padmavati and devotees repay through donations",
      "The seven hills represent the seven heads of Adishesha"
    ],
    festivals: [
      { name: "Brahmotsavam", month: "September/October", description: "Nine-day annual festival with grand processions of the deity" },
      { name: "Vaikuntha Ekadashi", month: "December/January", description: "The gateway to Vaikuntha (heaven) opens on this day" },
      { name: "Rathasaptami", month: "January/February", description: "The birthday of Lord Surya, celebrated grandly" }
    ],
    howToReach: {
      byAir: "Tirupati Airport (15 km from Tirupati town)",
      byTrain: "Tirupati Railway Station (well connected to major cities)",
      byRoad: "NH-65 and NH-71 connect Tirupati to major cities"
    },
    linkedScriptures: ["Bhagavad Gita", "Vishnu Purana", "Garuda Purana"],
    imageUrl: "/placeholder.svg",
    significance: "Known as the 'Kaliyuga Vaikunta' - heaven on earth during this age",
    timings: "2:30 AM - 1:30 AM (practically 24 hours with short breaks)",
    dressCode: "Traditional Hindu attire mandatory; no pants or shorts"
  },
  {
    id: "somnath",
    name: "Somnath Temple",
    sanskritName: "सोमनाथ मन्दिर",
    deity: "Lord Shiva (Somnath)",
    location: {
      city: "Veraval",
      state: "Gujarat",
      country: "India",
      coordinates: { lat: 20.8880, lng: 70.4013 }
    },
    description: "The first among the twelve Jyotirlingas, Somnath temple stands majestically on the western coast of Gujarat, at the point where the Arabian Sea meets the shore.",
    history: "The temple has been destroyed and rebuilt seventeen times, symbolizing the eternal spirit of Hinduism. The current temple was built in 1951 under Sardar Vallabhbhai Patel's vision.",
    architecture: "Chalukya style of temple architecture. The temple is built in a way that there is no land in a straight line between the shore of Somnath and Antarctica.",
    legends: [
      "The moon god Soma built the original temple in gold after being cursed by Daksha",
      "The arrow that killed Lord Krishna flew from this location",
      "The temple marks the site where the Triveni Sangam of three rivers meets the sea"
    ],
    festivals: [
      { name: "Mahashivaratri", month: "February/March", description: "Grand celebrations with thousands of devotees" },
      { name: "Kartik Purnima", month: "November", description: "Special prayers and sea rituals on this full moon day" }
    ],
    howToReach: {
      byAir: "Diu Airport (90 km), Rajkot Airport (165 km)",
      byTrain: "Veraval Railway Station (6 km)",
      byRoad: "Well connected by Gujarat State Highway network"
    },
    linkedScriptures: ["Shiva Purana", "Skanda Purana", "Rig Veda"],
    imageUrl: "/placeholder.svg",
    significance: "First Jyotirlinga; symbolizes eternal reconstruction of faith",
    timings: "6:00 AM - 9:00 PM",
    dressCode: "Traditional attire preferred"
  },
  {
    id: "meenakshi-amman",
    name: "Meenakshi Amman Temple",
    sanskritName: "मीनाक्षी अम्मन मन्दिर",
    deity: "Goddess Meenakshi (Parvati) and Lord Sundareswarar (Shiva)",
    location: {
      city: "Madurai",
      state: "Tamil Nadu",
      country: "India",
      coordinates: { lat: 9.9195, lng: 78.1193 }
    },
    description: "A historic Hindu temple located on the southern bank of the Vaigai River. It is dedicated to Meenakshi, a form of Parvati, and her consort Sundareswarar (Shiva).",
    history: "The original temple was built by Kulasekhara Pandya around 6th century BCE. The current structure dates to the 17th century, rebuilt after Malik Kafur's invasion.",
    architecture: "Dravidian architecture at its finest with 14 gopurams (gateway towers). The temple complex covers 14 acres with thousands of pillars, each uniquely carved.",
    legends: [
      "Meenakshi was born with fish-shaped eyes from the sacred fire",
      "She ruled as a fierce queen until she met Shiva and her third breast disappeared",
      "The temple marks the site of their divine wedding"
    ],
    festivals: [
      { name: "Chithirai Thiruvizha", month: "April/May", description: "The celestial wedding of Meenakshi and Sundareswarar, celebrated for 10 days" },
      { name: "Navaratri", month: "September/October", description: "Nine nights of goddess worship with cultural events" },
      { name: "Float Festival", month: "January/February", description: "Deities are taken on a float in the temple tank" }
    ],
    howToReach: {
      byAir: "Madurai Airport (12 km)",
      byTrain: "Madurai Junction (1 km)",
      byRoad: "Well connected by NH-44 and NH-85"
    },
    linkedScriptures: ["Thiruvilaiyadal Puranam", "Shiva Purana", "Tiruvilaiyatar Puranam"],
    imageUrl: "/placeholder.svg",
    significance: "One of the Pancha Sabhai where Shiva performed his cosmic dance",
    timings: "5:00 AM - 12:30 PM, 4:00 PM - 9:30 PM",
    dressCode: "Traditional attire; men should remove shirts inside main shrine"
  },
  {
    id: "jagannath-puri",
    name: "Jagannath Temple",
    sanskritName: "जगन्नाथ मन्दिर",
    deity: "Lord Jagannath (Krishna) with Balabhadra and Subhadra",
    location: {
      city: "Puri",
      state: "Odisha",
      country: "India",
      coordinates: { lat: 19.8048, lng: 85.8181 }
    },
    description: "One of the Char Dham pilgrimage sites, the temple is famous for the annual Rath Yatra and the unique wooden deities of Jagannath, Balabhadra, and Subhadra.",
    history: "Built in the 12th century by King Anantavarman Chodaganga Deva of the Eastern Ganga Dynasty. The temple has remained an important pilgrimage site for over 800 years.",
    architecture: "Kalinga architecture with the main temple rising 214 feet. The Singha Dwara (Lion Gate) faces east toward the sea. The temple has four gates in four directions.",
    legends: [
      "The original deity was a log found at sea containing Krishna's heart from his cremation",
      "Vishwakarma carved the deities on condition of no one watching, but was interrupted",
      "The flag atop the temple always flies opposite to the wind direction"
    ],
    festivals: [
      { name: "Rath Yatra", month: "June/July", description: "The world-famous chariot festival where millions pull the deities' chariots" },
      { name: "Snana Yatra", month: "May/June", description: "The bathing ceremony of the deities" },
      { name: "Nabakalebara", month: "Variable", description: "The ritual replacement of the wooden deities, held every 12-19 years" }
    ],
    howToReach: {
      byAir: "Biju Patnaik International Airport, Bhubaneswar (60 km)",
      byTrain: "Puri Railway Station (2 km)",
      byRoad: "Well connected by NH-316 to Bhubaneswar and other cities"
    },
    linkedScriptures: ["Skanda Purana", "Brahma Purana", "Padma Purana"],
    imageUrl: "/placeholder.svg",
    significance: "One of the Char Dham; Mahaprasad served here has no caste distinctions",
    timings: "5:00 AM - 11:00 PM",
    dressCode: "Only Hindus allowed; traditional attire required"
  },
  {
    id: "kedarnath",
    name: "Kedarnath Temple",
    sanskritName: "केदारनाथ मन्दिर",
    deity: "Lord Shiva (Kedareshwar)",
    location: {
      city: "Kedarnath",
      state: "Uttarakhand",
      country: "India",
      coordinates: { lat: 30.7352, lng: 79.0669 }
    },
    description: "Situated at an altitude of 3,583 meters near the Mandakini River, this ancient temple is one of the twelve Jyotirlingas and part of the Char Dham.",
    history: "The original temple is believed to have been built by the Pandavas. The current structure was built by Adi Shankaracharya in the 8th century.",
    architecture: "Simple stone architecture built to withstand the harsh Himalayan weather. The temple survived the devastating 2013 floods while surrounding structures were destroyed.",
    legends: [
      "The Pandavas sought Shiva's forgiveness here after the Kurukshetra war",
      "Shiva hid as a bull but Bhima caught him; the hump remained as the Jyotirlinga",
      "Adi Shankaracharya attained samadhi behind this temple"
    ],
    festivals: [
      { name: "Kedarnath Opening", month: "April/May", description: "The temple opens on Akshaya Tritiya with elaborate rituals" },
      { name: "Shravan Month", month: "July/August", description: "Special month for Shiva worship with Kanwar Yatra" },
      { name: "Kedarnath Closing", month: "November", description: "Temple closes on Bhai Dooj with the deity moving to Ukhimath" }
    ],
    howToReach: {
      byAir: "Jolly Grant Airport, Dehradun (238 km)",
      byTrain: "Rishikesh Railway Station (216 km)",
      byRoad: "Gaurikund is the last motorable point; 16 km trek to temple"
    },
    linkedScriptures: ["Shiva Purana", "Skanda Purana", "Mahabharata"],
    imageUrl: "/placeholder.svg",
    significance: "Part of Char Dham; one of the Panch Kedar temples",
    timings: "4:00 AM - 9:00 PM (Open April to November only)",
    dressCode: "Warm traditional clothing; modest dress required"
  }
];

export const getTempleById = (id: string): Temple | undefined => {
  return temples.find(temple => temple.id === id);
};

export const getTemplesByState = (state: string): Temple[] => {
  return temples.filter(temple => temple.location.state.toLowerCase() === state.toLowerCase());
};

export const getTemplesByDeity = (deity: string): Temple[] => {
  return temples.filter(temple => temple.deity.toLowerCase().includes(deity.toLowerCase()));
};
