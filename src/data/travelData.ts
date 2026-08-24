export interface TravelDestination {
  id: string;
  name: string;
  stateOrCircuit: string;
  category: 'Pilgrimage & Spiritual' | 'Heritage & History' | 'Hill Station & Nature' | 'Beach & Leisure';
  bestTimeToVisit: string;
  nearestAirport: string;
  nearestRailwayStation: string;
  topAttractions: string[];
  estimatedBudgetPerPerson: string;
  idealDuration: string;
  overview: string;
  travelTips: string[];
}

export interface TravelServiceGuide {
  id: string;
  title: string;
  category: 'IRCTC & Railway Hacks' | 'Flight & DigiYatra' | 'Passport Seva' | 'Travel Insurance';
  summary: string;
  stepsOrTips: string[];
  officialUrl: string;
  badge?: string;
}

export const TOP_TRAVEL_DESTINATIONS: TravelDestination[] = [
  {
    id: 'bodh-gaya-nalanda-rajgir',
    name: 'Bodh Gaya, Rajgir & Nalanda Circuit',
    stateOrCircuit: 'Bihar Buddhist & Heritage Circuit',
    category: 'Pilgrimage & Spiritual',
    bestTimeToVisit: 'October to March (Pleasant 14°C - 26°C)',
    nearestAirport: 'Gaya International Airport (GAY) / Patna Airport (PAT)',
    nearestRailwayStation: 'Gaya Junction / Rajgir Railway Station',
    topAttractions: [
      'Mahabodhi Temple Complex (UNESCO World Heritage Site)',
      'Ancient Nalanda Mahavihara University Ruins & Multimedia Museum',
      'Rajgir Glass Bridge, Nature Safari & Vishwa Shanti Stupa Ropeway',
      'Venuvana Bamboo Grove & Cyclopean Wall',
      'Great Buddha 80-Foot Statue & International Monasteries',
    ],
    estimatedBudgetPerPerson: '₹4,500 - ₹9,000 (3 Days / 2 Nights)',
    idealDuration: '3 - 4 Days',
    overview: 'One of the most sacred spiritual and historical circuits in the world where Lord Buddha attained supreme enlightenment under the Bodhi Tree, and the world’s first residential international university flourished.',
    travelTips: [
      'Take the aerial ropeway in Rajgir early morning to avoid peak afternoon queues.',
      'Wear modest attire covering shoulders and knees when visiting Mahabodhi Temple.',
      'Hire a verified Bihar Tourism Department certified guide at Nalanda ruins for deep historical context.',
    ],
  },
  {
    id: 'varanasi-kashi-vishwanath',
    name: 'Varanasi (Kashi) & Sarnath',
    stateOrCircuit: 'Uttar Pradesh Spiritual Circuit',
    category: 'Pilgrimage & Spiritual',
    bestTimeToVisit: 'November to February',
    nearestAirport: 'Lal Bahadur Shastri Airport, Babatpur (VNS)',
    nearestRailwayStation: 'Varanasi Junction (BSB) / Banaras (BSBS)',
    topAttractions: [
      'Kashi Vishwanath Corridor & Ganga Aarti at Dashashwamedh Ghat',
      'Sunrise Boat Ride along Assi to Manikarnika Ghat',
      'Sarnath Dhamek Stupa (Where Lord Buddha gave first sermon)',
      'Banaras Hindu University (BHU) & Bharat Kala Bhavan',
    ],
    estimatedBudgetPerPerson: '₹5,000 - ₹11,000 (3 Days)',
    idealDuration: '3 Days',
    overview: 'The world’s oldest continuously inhabited living city, famous for sublime spiritual riverfront ghats, classical music, silk sarees, and divine evening Ganga Aarti.',
    travelTips: [
      'Book Kashi Vishwanath Sugam Darshan ticket online in advance on the official temple portal to skip long general lines.',
      'Opt for hand-rowed wooden boats at 5:30 AM for photography without motor noise.',
    ],
  },
  {
    id: 'goa-coastal-getaway',
    name: 'Goa Coastal & Heritage Getaway',
    stateOrCircuit: 'Western Coast Circuit',
    category: 'Beach & Leisure',
    bestTimeToVisit: 'Mid-November to Mid-March',
    nearestAirport: 'Manohar International Airport (MOPA) / Dabolim (GOI)',
    nearestRailwayStation: 'Madgaon Junction (MAO) / Thivim (THVM)',
    topAttractions: ['Palolem & Agonda Beaches (South Goa serenity)', 'Fort Aguada & Chapora Fort', 'Basilica of Bom Jesus (Old Goa UNESCO churches)', 'Dudhsagar Waterfalls trek'],
    estimatedBudgetPerPerson: '₹12,000 - ₹24,000 (4 Days)',
    idealDuration: '4 - 5 Days',
    overview: 'India’s premier beach and lifestyle destination blending Portuguese colonial architecture, pristine Arabian sea coastline, seafood cuisine, and vibrant water sports.',
    travelTips: [
      'Rent a self-drive scooter (₹350-₹500/day) with helmet and valid licence for easy coastal hopping.',
      'Stay in South Goa for tranquil family trips, or North Goa (Anjuna/Vagator) for lively nightlife.',
    ],
  },
];

export const TRAVEL_SERVICES_GUIDES: TravelServiceGuide[] = [
  {
    id: 'irctc-tatkal-booking-hacks',
    title: 'IRCTC Tatkal & Premium Tatkal Ticket Booking Hacks 2026',
    category: 'IRCTC & Railway Hacks',
    summary: 'Guaranteed steps to secure confirmed train tickets during peak holiday rush using IRCTC e-Wallet, pre-filled Master Passenger List, and synchronized NTP clocks.',
    stepsOrTips: [
      '1. Tatkal Timing: AC Classes (1A/2A/3A/CC) open precisely at 10:00 AM; Sleeper (SL/2S) opens at 11:00 AM one day before journey.',
      '2. Pre-Fill Passenger Master List: Go to My Profile -> Add/Modify Master List in IRCTC before 9:45 AM. During booking, simply select with 1 click.',
      '3. Fund IRCTC e-Wallet or UPI Auto-Pay: Avoid bank net-banking OTP delays. IRCTC e-Wallet processes payment in under 2 seconds without external gateway redirect.',
      '4. Login Window: Login at 9:58 AM (not too early to avoid 10-minute session timeout).',
      '5. Select "Book only if confirm berths are allotted" to prevent unwanted waitlisted ticket charges.',
    ],
    officialUrl: 'https://www.irctc.co.in',
    badge: '100% Verified Hack',
  },
  {
    id: 'digiyatra-airport-entry',
    title: 'DigiYatra App: Seamless Facial Recognition Airport Boarding',
    category: 'Flight & DigiYatra',
    summary: 'How to bypass 45-minute airport security and gate queues at Delhi, Patna, Bengaluru, Mumbai, and 24+ Indian airports using biometric DigiYatra.',
    stepsOrTips: [
      '1. Download DigiYatra App and link your Aadhaar using DigiLocker OTP.',
      '2. Take a clear selfie for facial verification stored securely on your phone.',
      '3. Scan your Flight Boarding Pass barcode or link PNR.',
      '4. Share credentials with the departure airport on the day of travel.',
      '5. Walk through the dedicated DigiYatra e-Gate in 5 seconds via contactless face scan without physical ID/ticket checks.',
    ],
    officialUrl: 'https://www.digiyatrafoundation.com',
    badge: 'Save 45 Mins',
  },
  {
    id: 'passport-seva-tatkaal-guide',
    title: 'Passport Seva Kendra (PSK) & Tatkaal Passport Process 2026',
    category: 'Passport Seva',
    summary: 'Complete guide for fresh 36/60-page Indian passport, renewal of expired passport, and fast-track Tatkaal passport dispatch within 3 business days.',
    stepsOrTips: [
      '1. Register on Passport Seva Online Portal (passportindia.gov.in) or mPassport Seva App.',
      '2. Fill Form with accurate details matching 10th Class certificate and Aadhaar.',
      '3. Pay Fee online (Normal: ₹1,500 | Tatkaal: ₹3,500) and book appointment at nearest PSK / Post Office Passport Seva Kendra (POPSK).',
      '4. Documents to carry: Original Aadhaar Card, PAN Card, 10th Marksheet (for Non-ECR status), and Bank Passbook with photo.',
      '5. Biometrics & photo taken at Counter A, Verification at Counter B, Final Granting at Counter C.',
      '6. Track automated Police Verification status on mPassport Police App.',
    ],
    officialUrl: 'https://www.passportindia.gov.in',
    badge: 'Official PSK Guide',
  },
];
