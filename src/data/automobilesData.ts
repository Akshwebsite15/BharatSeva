export interface VehicleItem {
  id: string;
  name: string;
  brand: string;
  type: 'Car / SUV' | 'Electric Vehicle (EV)' | 'Motorcycle' | 'Scooter';
  fuel: 'Petrol' | 'Diesel' | 'CNG' | 'Electric';
  priceRangeExShowroom: string;
  mileageOrRange: string;
  transmission: string;
  safetyRating: string;
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  officialUrl?: string;
  badge?: string;
}

export interface AutomobilePortalService {
  title: string;
  portalName: string;
  description: string;
  directUrl: string;
  actionLabel: string;
}

export const TOP_VEHICLES_DATA: VehicleItem[] = [
  {
    id: 'tata-nexon-ev-long-range',
    name: 'Tata Nexon.ev (Long Range 45kWh)',
    brand: 'Tata Motors',
    type: 'Electric Vehicle (EV)',
    fuel: 'Electric',
    priceRangeExShowroom: '₹14.49 Lakh - ₹19.49 Lakh',
    mileageOrRange: '489 km claimed (340-370 km real-world)',
    transmission: 'Automatic Single Speed',
    safetyRating: '5 Stars (Bharat NCAP & Global NCAP)',
    keyFeatures: ['V2V and V2L vehicle-to-load charging', '12.3-inch Cinematic touchscreen', 'Arcade.ev apps suite', 'Paddle shifters for 4-level regen braking'],
    pros: ['Lowest running cost (~₹1.10/km)', 'Instant electric torque & quiet cabin', 'Top-tier 5-star structural safety'],
    cons: ['DC fast charging infrastructure on rural highways still expanding'],
    badge: 'Best Selling Electric SUV',
  },
  {
    id: 'hyundai-creta-facelift',
    name: 'Hyundai Creta (1.5L Turbo / Diesel / Petrol)',
    brand: 'Hyundai',
    type: 'Car / SUV',
    fuel: 'Petrol',
    priceRangeExShowroom: '₹11.00 Lakh - ₹20.15 Lakh',
    mileageOrRange: '17.4 - 21.8 km/l (Diesel)',
    transmission: '6-Speed Manual / IVT / 7-Speed DCT / 6-Speed AT',
    safetyRating: 'Level 2 ADAS (19 Autonomous safety features)',
    keyFeatures: ['Panoramic sunroof with voice commands', 'Dual 10.25-inch curved screens', 'Ventilated front seats', 'Bose 8-speaker premium sound system'],
    pros: ['Class-leading comfort and feature-rich cabin', 'Refined diesel and explosive turbo-petrol engines', 'High resale value across India'],
    cons: ['Long waiting periods on top variants'],
    badge: 'Segment Leader',
  },
  {
    id: 'maruti-suzuki-brezza-cng',
    name: 'Maruti Suzuki Brezza (Smart Hybrid & S-CNG)',
    brand: 'Maruti Suzuki',
    type: 'Car / SUV',
    fuel: 'CNG',
    priceRangeExShowroom: '₹8.34 Lakh - ₹14.14 Lakh',
    mileageOrRange: '25.51 km/kg (CNG) | 19.89 km/l (Petrol)',
    transmission: '5-Speed Manual / 6-Speed Torque Converter',
    safetyRating: '4 Stars (Global NCAP)',
    keyFeatures: ['Factory fitted S-CNG with dual inter-dependent ECUs', '360 View Camera & Head-up display', 'Wireless Android Auto / Apple CarPlay'],
    pros: ['Unbeatable fuel economy & low maintenance cost', 'Vast Maruti service network in every tier-2/3 town', 'Spacious cabin and high ground clearance (200mm)'],
    cons: ['CNG tank occupies majority of boot luggage space'],
    badge: 'Best Mileage Compact SUV',
  },
  {
    id: 'ola-s1-pro-gen2',
    name: 'Ola S1 Pro (Gen 2 - 4kWh Battery)',
    brand: 'Ola Electric',
    type: 'Scooter',
    fuel: 'Electric',
    priceRangeExShowroom: '₹1.34 Lakh - ₹1.40 Lakh',
    mileageOrRange: '195 km claimed (143 km Eco real-world)',
    transmission: 'Automatic Twist & Go',
    safetyRating: 'Front & Rear Disc Brakes with CBS / MoveOS 4',
    keyFeatures: ['120 km/h top speed (0-40 in 2.6s)', '7-inch Touchscreen with onboard navigation', 'Party mode speakers & cruise control', 'Proximity unlock & hill hold'],
    pros: ['Superb acceleration and high top speed', 'Massive under-seat 34L boot space', 'Low daily running cost (~₹0.20/km)'],
    cons: ['Software glitches reported on older MoveOS versions'],
    badge: 'Top Performance EV Scooter',
  },
  {
    id: 'royal-enfield-classic-350',
    name: 'Royal Enfield Classic 350 (J-Series Engine)',
    brand: 'Royal Enfield',
    type: 'Motorcycle',
    fuel: 'Petrol',
    priceRangeExShowroom: '₹1.93 Lakh - ₹2.30 Lakh',
    mileageOrRange: '36.2 km/l',
    transmission: '5-Speed Constant Mesh',
    safetyRating: 'Dual Channel ABS with 300mm front disc',
    keyFeatures: ['Smooth counterbalanced 349cc J-Series engine', 'Classic teardrop tank & signature thump', 'Tripper navigation pod option'],
    pros: ['Timeless iconic retro cruiser styling', 'Ultra-refined engine with zero vibration at cruising speeds', 'Superb metal build and highway stability'],
    cons: ['Heavy kerb weight (195 kg) in tight city traffic'],
    badge: 'Iconic Cruiser',
  },
];

export const PARIVAHAN_SERVICES: AutomobilePortalService[] = [
  {
    title: 'Driving Licence (LL / DL / Renewal)',
    portalName: 'Sarathi Parivahan (MoRTH)',
    description: 'Apply for Learner’s Licence from home with Aadhaar OTP, book slot for Permanent DL driving test, renew licence, or apply for International Driving Permit (IDP).',
    directUrl: 'https://sarathi.parivahan.gov.in',
    actionLabel: 'Open Sarathi Portal',
  },
  {
    title: 'Check & Pay Traffic e-Challan',
    portalName: 'Parivahan eChallan Payment Gateway',
    description: 'Instant verification of pending traffic camera challans, speed violation notices, and digital receipt download using Vehicle Number or Challan Number.',
    directUrl: 'https://echallan.parivahan.gov.in',
    actionLabel: 'Check Challan Status',
  },
  {
    title: 'Vehicle Registration & RC Status (Vahan)',
    portalName: 'Vahan Citizen Services',
    description: 'Verify RC owner details, hypothecation termination (loan removal), NOC for inter-state vehicle transfer, and road tax payment.',
    directUrl: 'https://vahan.parivahan.gov.in',
    actionLabel: 'Check Vahan RC',
  },
  {
    title: 'High Security Registration Plate (HSRP)',
    portalName: 'Book-My-HSRP Official Portal',
    description: 'Mandatory color-coded laser-etched HSRP number plate and fuel sticker booking with home delivery or authorized dealer fitment.',
    directUrl: 'https://bookmyhsrp.com',
    actionLabel: 'Book HSRP Plate',
  },
];
