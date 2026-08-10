export interface AdmitCardItem {
  id: string;
  category: 'SSC' | 'Railway' | 'Banking' | 'UPSC' | 'BPSC' | 'Bihar Police' | 'Teaching' | 'Defence' | 'State exams';
  examName: string;
  admitCardName: string;
  organization: string;
  releaseDate: string;
  examDate: string;
  downloadUrl: string;
  instructions: string[];
  status: 'Live Download' | 'City Intimation Active' | 'Expected Soon' | 'Updated';
}

export const initialAdmitCardsData: AdmitCardItem[] = [
  // BPSC
  {
    id: 'ac-bpsc-1',
    category: 'BPSC',
    examName: 'BPSC 71st Combined Competitive Preliminary Exam (CCE 2026)',
    admitCardName: 'BPSC 71st Prelims E-Admit Card & Roll Number Allotment',
    organization: 'Bihar Public Service Commission',
    releaseDate: 'August 8, 2026',
    examDate: 'September 13, 2026',
    downloadUrl: 'https://onlinebpsc.bihar.gov.in',
    instructions: [
      'Login with username & password on BPSC portal',
      'Upload a clear passport size photograph (within 25 KB) if photo is unclear',
      'Download E-Admit Card and check exam center district name'
    ],
    status: 'Live Download'
  },
  {
    id: 'ac-bpsc-2',
    category: 'BPSC',
    examName: 'BPSC Assistant Engineer (AE Civil & Mechanical) Mains 2026',
    admitCardName: 'BPSC AE Mains Written Test Hall Ticket',
    organization: 'Bihar Public Service Commission',
    releaseDate: 'August 5, 2026',
    examDate: 'August 28, 2026',
    downloadUrl: 'https://bpsc.bih.nic.in',
    instructions: [
      'Carry 2 printed copies of hall ticket to examination center',
      'Original photo ID proof (Aadhaar Card / Voter ID / Driving License) is mandatory'
    ],
    status: 'Live Download'
  },

  // Bihar Police
  {
    id: 'ac-police-1',
    category: 'Bihar Police',
    examName: 'CSBC Bihar Police Constable 21,391 Posts Written Exam',
    admitCardName: 'CSBC Constable Written Examination E-Admit Card 2026',
    organization: 'Central Selection Board of Constable (CSBC Bihar)',
    releaseDate: 'August 8, 2026',
    examDate: 'November 18, 2026',
    downloadUrl: 'https://csbc.bih.nic.in',
    instructions: [
      'Download admit card using Registration ID / Roll Number and Mobile Number',
      'Verify shift timing (Morning 10 AM / Afternoon 2 PM) and center code',
      'Black / Blue ballpoint pen allowed inside exam hall'
    ],
    status: 'Live Download'
  },
  {
    id: 'ac-police-2',
    category: 'Bihar Police',
    examName: 'BPSSC Bihar Police Sub-Inspector (Daroga) Mains 2026',
    admitCardName: 'BPSSC SI Mains Written Test Call Letter',
    organization: 'Bihar Police Subordinate Services Commission',
    releaseDate: 'July 30, 2026',
    examDate: 'August 24, 2026',
    downloadUrl: 'https://bpssc.bih.nic.in',
    instructions: [
      'Check paper-I (Hindi) and paper-II (General Studies) timetable',
      'Biometric verification will be conducted at entry'
    ],
    status: 'Live Download'
  },

  // SSC
  {
    id: 'ac-ssc-1',
    category: 'SSC',
    examName: 'SSC CGL 2026 Tier-1 Combined Graduate Level Examination',
    admitCardName: 'SSC CGL Tier-1 Computer Based Test Call Letter & City Slip',
    organization: 'Staff Selection Commission (SSC New Delhi)',
    releaseDate: 'August 6, 2026',
    examDate: 'September 9 - 26, 2026',
    downloadUrl: 'https://ssc.gov.in',
    instructions: [
      'City intimation slip released 10 days before exam date',
      'Final admit card available 4 days prior to candidate shift date',
      'Two recent passport photos with clear DOB printed on ID proof required'
    ],
    status: 'City Intimation Active'
  },
  {
    id: 'ac-ssc-2',
    category: 'SSC',
    examName: 'SSC GD Constable in CAPFs, SSF & Rifleman (GD) 2026',
    admitCardName: 'SSC GD Physical Standard Test (PST) / PET Call Letter',
    organization: 'Staff Selection Commission',
    releaseDate: 'August 2, 2026',
    examDate: 'September 2026',
    downloadUrl: 'https://ssc.gov.in',
    instructions: [
      'Carry medical fitness certificate and physical admit card copy',
      'Original caste & domicile certificates required at ground'
    ],
    status: 'Live Download'
  },

  // Railway
  {
    id: 'ac-rail-1',
    category: 'Railway',
    examName: 'RRB Junior Engineer (JE / DMS / CMA) CEN 03/2025 CBT-1',
    admitCardName: 'RRB JE CBT-1 Exam City Intimation & SC/ST Travel Pass',
    organization: 'Railway Recruitment Board (RRB)',
    releaseDate: 'August 4, 2026',
    examDate: 'October 14, 2026',
    downloadUrl: 'https://rrbcdg.gov.in',
    instructions: [
      'Free railway travel pass for SC/ST candidates included in hall ticket',
      'Aadhaar linked biometric authentication mandatory at RRB exam venue'
    ],
    status: 'City Intimation Active'
  },
  {
    id: 'ac-rail-2',
    category: 'Railway',
    examName: 'RRB ALP (Assistant Loco Pilot) CEN 01/2025 CBT-2 Exam',
    admitCardName: 'RRB ALP Stage-2 E-Call Letter',
    organization: 'Railway Recruitment Board',
    releaseDate: 'August 1, 2026',
    examDate: 'August 20, 2026',
    downloadUrl: 'https://rrbcdg.gov.in',
    instructions: [
      'Vision certificate in prescribed Form A-1 for ALP candidates required'
    ],
    status: 'Live Download'
  },

  // Banking
  {
    id: 'ac-bank-1',
    category: 'Banking',
    examName: 'IBPS PO / Management Trainee CRP PO/MT-XIV Prelims 2026',
    admitCardName: 'IBPS PO Prelims Online Exam Call Letter',
    organization: 'Institute of Banking Personnel Selection',
    releaseDate: 'August 7, 2026',
    examDate: 'August 23 & 24, 2026',
    downloadUrl: 'https://ibps.in',
    instructions: [
      'Affix passport photo on call letter matching online registration photo',
      'Staple photocopy of photo ID proof with original ID'
    ],
    status: 'Live Download'
  },
  {
    id: 'ac-bank-2',
    category: 'Banking',
    examName: 'SBI Junior Associate (Customer Support & Sales) Clerk Prelims',
    admitCardName: 'SBI Clerk Prelims Hall Ticket 2026',
    organization: 'State Bank of India',
    releaseDate: 'July 29, 2026',
    examDate: 'August 18, 2026',
    downloadUrl: 'https://sbi.co.in/careers',
    instructions: [
      'Check venue details and report 15 minutes before gate closing time'
    ],
    status: 'Live Download'
  },

  // UPSC
  {
    id: 'ac-upsc-1',
    category: 'UPSC',
    examName: 'UPSC Civil Services (Mains) Examination 2026',
    admitCardName: 'UPSC CSE Mains E-Admit Card & Exam Schedule',
    organization: 'Union Public Service Commission',
    releaseDate: 'August 9, 2026',
    examDate: 'September 20 - 24, 2026',
    downloadUrl: 'https://upsc.gov.in',
    instructions: [
      'Check subject wise paper timings (Forenoon 9 AM - 12 PM / Afternoon 2 PM - 5 PM)',
      'e-Admit Card must be preserved till final declaration of result'
    ],
    status: 'Live Download'
  },

  // Teaching
  {
    id: 'ac-teach-1',
    category: 'Teaching',
    examName: 'CTET August 2026 Central Teacher Eligibility Test',
    admitCardName: 'CTET Paper-I & Paper-II Final Admit Card',
    organization: 'Central Board of Secondary Education (CBSE)',
    releaseDate: 'August 6, 2026',
    examDate: 'August 17, 2026',
    downloadUrl: 'https://ctet.nic.in',
    instructions: [
      'Verify Paper-1 (Primary Class 1-5) and Paper-2 (Elementary Class 6-8) shifts',
      'Only transparent ballpoint pen allowed inside hall'
    ],
    status: 'Live Download'
  },

  // Defence
  {
    id: 'ac-def-1',
    category: 'Defence',
    examName: 'NDA & NA (II) 2026 Examination',
    admitCardName: 'UPSC NDA-2 Written Exam e-Admit Card',
    organization: 'Union Public Service Commission & Ministry of Defence',
    releaseDate: 'August 5, 2026',
    examDate: 'September 1, 2026',
    downloadUrl: 'https://upsconline.nic.in',
    instructions: [
      'Mathematics (Code 01) & General Ability Test (Code 02) shift schedule'
    ],
    status: 'Live Download'
  },

  // State exams
  {
    id: 'ac-state-1',
    category: 'State exams',
    examName: 'BSSC 2nd Inter Level Combined Competitive Exam 2026',
    admitCardName: 'BSSC Inter Level Prelims Admit Card & Roll No',
    organization: 'Bihar Staff Selection Commission',
    releaseDate: 'August 3, 2026',
    examDate: 'December 2026',
    downloadUrl: 'https://bssc.bihar.gov.in',
    instructions: [
      'Check OMR sheet coding guidelines and roll number grid fill-up rules'
    ],
    status: 'Updated'
  }
];
