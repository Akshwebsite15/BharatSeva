export interface HospitalItem {
  id: string;
  name: string;
  city: string;
  state: string;
  type: 'Premier Government AIIMS' | 'Autonomous Govt Super-Specialty' | 'NABH Accredited Private Hospital';
  specialties: string[];
  bedCount: string;
  ayushmanEmpanelled: boolean;
  emergencyHelpline: string;
  website: string;
  highlights: string;
}

export interface GenericMedicineComparison {
  genericName: string;
  brandedMarketName: string;
  usedFor: string;
  brandedPrice: string;
  janAushadhiPrice: string;
  savingsPercentage: string;
}

export interface SurgeryCostEstimate {
  procedureName: string;
  category: 'Cardiology' | 'Orthopedics' | 'Ophthalmology' | 'Gastroenterology' | 'General Surgery';
  govtHospitalCost: string;
  privateHospitalCost: string;
  ayushmanCovered: boolean;
  recoveryTime: string;
  recommendedHospitalStay: string;
}

export const TOP_HOSPITALS_DATA: HospitalItem[] = [
  {
    id: 'aiims-new-delhi',
    name: 'All India Institute of Medical Sciences (AIIMS)',
    city: 'New Delhi',
    state: 'Delhi',
    type: 'Premier Government AIIMS',
    specialties: ['Cardiology & CTVS', 'Oncology & Cancer Care', 'Neurology & Neurosurgery', 'Organ Transplants', 'Pediatrics'],
    bedCount: '2,500+ Beds',
    ayushmanEmpanelled: true,
    emergencyHelpline: '011-26588500 / 102',
    website: 'https://www.aiims.edu',
    highlights: 'India’s #1 medical research and tertiary care hospital offering world-class super-specialty treatment at subsidized or zero cost under central schemes.',
  },
  {
    id: 'aiims-patna',
    name: 'AIIMS Patna (Phulwarisharif)',
    city: 'Patna',
    state: 'Bihar',
    type: 'Premier Government AIIMS',
    specialties: ['Trauma & Emergency Care', 'Cardiothoracic Surgery', 'Nephrology & Dialysis', 'Medical Oncology', 'Gastroenterology'],
    bedCount: '960+ Beds',
    ayushmanEmpanelled: true,
    emergencyHelpline: '0612-2451070 / 1800-345-6677',
    website: 'https://aiimspatna.edu.in',
    highlights: 'Premier national institute in Bihar with 24x7 Level-1 Trauma Centre, modern linear accelerators for radiotherapy, and automated online OPD registration.',
  },
  {
    id: 'igims-patna',
    name: 'Indira Gandhi Institute of Medical Sciences (IGIMS)',
    city: 'Patna (Sheikhpura)',
    state: 'Bihar',
    type: 'Autonomous Govt Super-Specialty',
    specialties: ['Gastroenterology', 'Renal Transplant', 'Urology', 'Regional Cancer Centre (State Cancer Institute)', 'Neurology'],
    bedCount: '1,200+ Beds',
    ayushmanEmpanelled: true,
    emergencyHelpline: '0612-2297099',
    website: 'http://www.igims.org',
    highlights: 'Autonomous state super-specialty hospital with dedicated Eye Bank, Kidney Transplant Unit, and comprehensive State Cancer Institute.',
  },
  {
    id: 'medanta-medicity',
    name: 'Medanta - The Medicity & Medanta Gurugram / Patna',
    city: 'Gurugram / Patna (Kankarbagh)',
    state: 'Haryana / Bihar',
    type: 'NABH Accredited Private Hospital',
    specialties: ['Heart Institute (Dr. Naresh Trehan)', 'Liver & Biliary Sciences', 'Neurosciences', 'Robotic Joint Replacement'],
    bedCount: '1,250+ Beds',
    ayushmanEmpanelled: true,
    emergencyHelpline: '1068 / 0124-4141414',
    website: 'https://www.medanta.org',
    highlights: 'Internationally accredited multi-super specialty hospital renowned for robotic heart surgeries, living donor liver transplants, and advanced critical care.',
  },
];

export const GENERIC_MEDICINES_DATA: GenericMedicineComparison[] = [
  {
    genericName: 'Paracetamol 650mg (10 Tablets)',
    brandedMarketName: 'Dolo 650 / Calpol 650',
    usedFor: 'Fever, Body Ache, Mild-to-Moderate Pain',
    brandedPrice: '₹34.00',
    janAushadhiPrice: '₹7.50',
    savingsPercentage: '78% Savings',
  },
  {
    genericName: 'Metformin 500mg SR (10 Tablets)',
    brandedMarketName: 'Glycomet 500 / Gluconorm',
    usedFor: 'Type-2 Diabetes Blood Sugar Control',
    brandedPrice: '₹48.00',
    janAushadhiPrice: '₹6.20',
    savingsPercentage: '87% Savings',
  },
  {
    genericName: 'Atorvastatin 10mg (10 Tablets)',
    brandedMarketName: 'Atorva 10 / Lipitor',
    usedFor: 'High Cholesterol & Cardiovascular Protection',
    brandedPrice: '₹115.00',
    janAushadhiPrice: '₹14.00',
    savingsPercentage: '88% Savings',
  },
  {
    genericName: 'Pantoprazole 40mg + Domperidone (10 Caps)',
    brandedMarketName: 'Pan-D / Pantocid-D',
    usedFor: 'Acidity, GERD, Acid Reflux, Indigestion',
    brandedPrice: '₹198.00',
    janAushadhiPrice: '₹22.50',
    savingsPercentage: '89% Savings',
  },
  {
    genericName: 'Telmisartan 40mg (10 Tablets)',
    brandedMarketName: 'Telma 40 / Telmikind',
    usedFor: 'High Blood Pressure (Hypertension)',
    brandedPrice: '₹120.00',
    janAushadhiPrice: '₹11.00',
    savingsPercentage: '91% Savings',
  },
];

export const SURGERY_COSTS_DATA: SurgeryCostEstimate[] = [
  {
    procedureName: 'Coronary Artery Bypass Grafting (CABG / Open Heart)',
    category: 'Cardiology',
    govtHospitalCost: '₹40,000 - ₹90,000 (Free in PM-JAY)',
    privateHospitalCost: '₹2,50,000 - ₹5,50,000',
    ayushmanCovered: true,
    recoveryTime: '6 - 8 Weeks',
    recommendedHospitalStay: '7 - 10 Days',
  },
  {
    procedureName: 'Total Knee Replacement (Unilateral / Single Knee)',
    category: 'Orthopedics',
    govtHospitalCost: '₹35,000 - ₹65,000 (Implant cost capped)',
    privateHospitalCost: '₹1,60,000 - ₹3,20,000',
    ayushmanCovered: true,
    recoveryTime: '4 - 6 Weeks',
    recommendedHospitalStay: '3 - 5 Days',
  },
  {
    procedureName: 'Phacoemulsification Cataract Surgery with Monofocal IOL',
    category: 'Ophthalmology',
    govtHospitalCost: '₹0 (Free in Govt & NPCB camps)',
    privateHospitalCost: '₹25,000 - ₹65,000 per eye',
    ayushmanCovered: true,
    recoveryTime: '1 - 2 Weeks',
    recommendedHospitalStay: 'Day Care (3-4 Hours)',
  },
  {
    procedureName: 'Laparoscopic Cholecystectomy (Gallbladder Stone Removal)',
    category: 'General Surgery',
    govtHospitalCost: '₹5,000 - ₹15,000 (Free in PM-JAY)',
    privateHospitalCost: '₹60,000 - ₹1,40,000',
    ayushmanCovered: true,
    recoveryTime: '1 - 2 Weeks',
    recommendedHospitalStay: '1 - 2 Days',
  },
];
