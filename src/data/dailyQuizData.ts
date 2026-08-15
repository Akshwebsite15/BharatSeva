export interface QuizQuestion {
  id: string;
  category: string;
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctAnswer: number; // 0-3
  explanationEn: string;
  explanationHi: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  relevantExams: string[];
}

export const dailyQuizQuestions: QuizQuestion[] = [
  {
    id: 'q-1',
    category: 'Current Affairs 2026',
    questionEn: 'Which country successfully hosted the International Climate & Energy Summit 2026?',
    questionHi: 'अंतर्राष्ट्रीय जलवायु और ऊर्जा शिखर सम्मेलन 2026 की मेजबानी किस देश ने सफलतापूर्वक की?',
    optionsEn: ['India (New Delhi)', 'Japan (Tokyo)', 'Brazil (Rio de Janeiro)', 'Germany (Berlin)'],
    optionsHi: ['भारत (नई दिल्ली)', 'जापान (टोक्यो)', 'ब्राजील (रियो डी जनेरियो)', 'जर्मनी (बर्लिन)'],
    correctAnswer: 0,
    explanationEn: 'India hosted the International Climate & Energy Summit 2026 at Bharat Mandapam, New Delhi, focusing on green hydrogen and solar energy expansion across the Global South.',
    explanationHi: 'भारत ने नई दिल्ली के भारत मंडपम में अंतर्राष्ट्रीय जलवायु और ऊर्जा शिखर सम्मेलन 2026 की मेजबानी की, जिसमें हरित हाइड्रोजन और सौर ऊर्जा के विस्तार पर जोर दिया गया।',
    difficulty: 'Medium',
    relevantExams: ['UPSC CSE', 'BPSC', 'SSC CGL', 'State PCS'],
  },
  {
    id: 'q-2',
    category: 'Indian Polity & Constitution',
    questionEn: 'Under which Article of the Indian Constitution is the Comptroller and Auditor General (CAG) of India appointed?',
    questionHi: 'भारतीय संविधान के किस अनुच्छेद के तहत भारत के नियंत्रक एवं महालेखापरीक्षक (CAG) की नियुक्ति की जाती है?',
    optionsEn: ['Article 148', 'Article 280', 'Article 324', 'Article 76'],
    optionsHi: ['अनुच्छेद 148', 'अनुच्छेद 280', 'अनुच्छेद 324', 'अनुच्छेद 76'],
    correctAnswer: 0,
    explanationEn: 'Article 148 provides for an independent office of the CAG of India, who is appointed by the President of India and acts as the guardian of the public purse.',
    explanationHi: 'अनुच्छेद 148 भारत के CAG के एक स्वतंत्र कार्यालय का प्रावधान करता है, जो राष्ट्रपति द्वारा नियुक्त किए जाते हैं और सार्वजनिक धन के संरक्षक होते हैं।',
    difficulty: 'Easy',
    relevantExams: ['SSC CGL', 'BPSC', 'Railway NTPC', 'UPSC'],
  },
  {
    id: 'q-3',
    category: 'Bihar GK & History',
    questionEn: 'Who led the famous 1857 Revolt in Bihar from Jagdishpur (Bhojpur)?',
    questionHi: 'बिहार में जगदीशपुर (भोजपुर) से 1857 के प्रसिद्ध विद्रोह का नेतृत्व किसने किया था?',
    optionsEn: ['Babu Veer Kunwar Singh', 'Pir Ali Khan', 'Maulvi Ahmadullah', 'Amar Singh'],
    optionsHi: ['बाबू वीर कुंवर सिंह', 'पीर अली खान', 'मौलवी अहमदुल्लाह', 'अमर सिंह'],
    correctAnswer: 0,
    explanationEn: 'Babu Veer Kunwar Singh, the 80-year-old chieftain of Jagdishpur in modern-day Bhojpur district, brilliantly led the armed revolt against the British forces in 1857.',
    explanationHi: 'भोजपुर जिले के जगदीशपुर के 80 वर्षीय वीर कुंवर सिंह ने 1857 के संग्राम में अंग्रेजों के खिलाफ बिहार में ऐतिहासिक और अद्वितीय नेतृत्व प्रदान किया था।',
    difficulty: 'Easy',
    relevantExams: ['BPSC 71st', 'Bihar Police SI', 'Bihar Teacher TRE', 'BSSC'],
  },
  {
    id: 'q-4',
    category: 'General Science & Tech',
    questionEn: 'Which optical phenomenon is primarily responsible for the sparkling brilliance of a diamond?',
    questionHi: 'हीरे की असाधारण चमक और जगमगाहट के लिए मुख्य रूप से कौन सी प्रकाशीय घटना जिम्मेदार है?',
    optionsEn: ['Total Internal Reflection', 'Refraction of light', 'Dispersion only', 'Diffraction'],
    optionsHi: ['पूर्ण आंतरिक परावर्तन (Total Internal Reflection)', 'प्रकाश का अपवर्तन', 'केवल विक्षेपण', 'विवर्तन'],
    correctAnswer: 0,
    explanationEn: 'The critical angle for a diamond-air interface is very small (approx 24.4°). Light entering the diamond suffers multiple Total Internal Reflections (TIR), creating intense brilliance.',
    explanationHi: 'हीरे का क्रांतिक कोण बहुत कम (लगभग 24.4°) होता है। हीरे में प्रवेश करने वाला प्रकाश बार-बार पूर्ण आंतरिक परावर्तन से गुजरता है, जिससे अत्यधिक चमक उत्पन्न होती है।',
    difficulty: 'Medium',
    relevantExams: ['Railway ALP', 'SSC CGL', 'NDA / CDS', 'BPSC'],
  },
  {
    id: 'q-5',
    category: 'Indian Geography & Environment',
    questionEn: 'Which is the largest freshwater lake in Northeast India, famous for its floating phumdis?',
    questionHi: 'पूर्वोत्तर भारत की सबसे बड़ी मीठे पानी की झील कौन सी है, जो तैरते हुए फूमदी (phumdis) के लिए प्रसिद्ध है?',
    optionsEn: ['Loktak Lake (Manipur)', 'Wular Lake (J&K)', 'Chilika Lake (Odisha)', 'Vembanad Lake (Kerala)'],
    optionsHi: ['लोकटक झील (मणिपुर)', 'वुलर झील (जम्मू-कश्मीर)', 'चिल्का झील (ओडिशा)', 'वेम्बनाड झील (केरल)'],
    correctAnswer: 0,
    explanationEn: 'Loktak Lake in Manipur is the largest freshwater lake in Northeast India. It is famous for phumdis (heterogeneous mass of vegetation) and hosts Keibul Lamjao, the world’s only floating national park.',
    explanationHi: 'मणिपुर की लोकटक झील पूर्वोत्तर भारत की सबसे बड़ी ताजे पानी की झील है। यह फूमदी और विश्व के एकमात्र तैरते राष्ट्रीय उद्यान केबुल लामजाओ के लिए विख्यात है।',
    difficulty: 'Medium',
    relevantExams: ['UPSC CSE', 'SSC CHSL', 'BPSC', 'State PSC'],
  },
];
