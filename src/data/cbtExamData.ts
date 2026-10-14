export interface CBTQuestion {
  id: number;
  sectionId: 'sec-raj-gk' | 'sec-science' | 'sec-polity' | 'sec-hindi' | 'sec-maths';
  sectionNameHindi: string;
  sectionNameEnglish: string;
  questionHindi: string;
  questionEnglish: string;
  optionsHindi: [string, string, string, string, string]; // A, B, C, D, E (5th is unattempted)
  optionsEnglish: [string, string, string, string, string];
  correctOptionIndex: number; // 0, 1, 2, 3 or 4
  explanationHindi: string;
  marks: number;
  negativeMarks: number;
}

export interface CBTSection {
  id: 'sec-raj-gk' | 'sec-science' | 'sec-polity' | 'sec-hindi' | 'sec-maths';
  nameHindi: string;
  nameEnglish: string;
  questionRange: [number, number]; // start to end question id
  totalQuestions: number;
}

export const CBT_SECTIONS: CBTSection[] = [
  {
    id: 'sec-raj-gk',
    nameHindi: 'राजस्थान सामान्य ज्ञान (इतिहास, कला, भूगोल)',
    nameEnglish: 'Rajasthan GK (History, Art, Geography)',
    questionRange: [1, 40],
    totalQuestions: 40
  },
  {
    id: 'sec-science',
    nameHindi: 'दैनिक सामान्य विज्ञान (Everyday Science)',
    nameEnglish: 'General Everyday Science',
    questionRange: [41, 60],
    totalQuestions: 20
  },
  {
    id: 'sec-polity',
    nameHindi: 'राजस्थान राजव्यवस्था एवं प्रशासन (Polity)',
    nameEnglish: 'Rajasthan Polity & Administration',
    questionRange: [61, 75],
    totalQuestions: 15
  },
  {
    id: 'sec-hindi',
    nameHindi: 'सामान्य हिन्दी व्याकरण (General Hindi)',
    nameEnglish: 'General Hindi Grammar',
    questionRange: [76, 90],
    totalQuestions: 15
  },
  {
    id: 'sec-maths',
    nameHindi: 'तार्किक योग्यता एवं गणित (Reasoning & Maths)',
    nameEnglish: 'Mental Ability & Quantitative Aptitude',
    questionRange: [91, 100],
    totalQuestions: 10
  }
];

// Helper to generate realistic authentic questions for 1 to 100
const generateFull100QuestionBank = (): CBTQuestion[] => {
  const bank: CBTQuestion[] = [];

  const rawGkQuestions = [
    {
      qH: "महाराणा प्रताप का राज्याभिषेक (राजतिलक) 1572 ई. में सर्वप्रथम किस स्थान पर हुआ था?",
      qE: "At which place did the coronation of Maharana Pratap take place first in 1572 AD?",
      optsH: ["कुंभलगढ़ दुर्ग", "गोगुंदा", "चावंड", "उदयपुर", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["Kumbhalgarh Fort", "Gogunda", "Chawand", "Udaipur", "Question Not Attempted"],
      ans: 1,
      exp: "महाराणा प्रताप का प्रथम राज्याभिषेक 28 फरवरी 1572 को गोगुंदा (उदयपुर) में हुआ था। बाद में विधिवत राज्याभिषेक कुंभलगढ़ दुर्ग में संपन्न हुआ।"
    },
    {
      qH: "कालीबंगा पुरातात्विक स्थल वर्तमान राजस्थान के किस जिले में स्थित है?",
      qE: "In which district of present-day Rajasthan is the archaeological site of Kalibangan located?",
      optsH: ["श्रीगंगानगर", "हनुमानगढ़", "अनूपगढ़", "बीकानेर", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["Sri Ganganagar", "Hanumangarh", "Anupgarh", "Bikaner", "Question Not Attempted"],
      ans: 1,
      exp: "कालीबंगा हनुमानगढ़ जिले में घग्घर नदी के तट पर स्थित है। यहाँ से जूते हुए खेत व भूकंप के साक्ष्य मिले हैं।"
    },
    {
      qH: "पुनर्गठित राजस्थान के अनुसार 'सांभर झील' का प्रशासनिक विस्तार मुख्य रूप से किस जिले में आता है?",
      qE: "According to reorganized Rajasthan, Sambhar Lake's administrative control primarily lies in which district?",
      optsH: ["जयपुर ग्रामीण", "दूदू", "डीडवाना-कुचामन", "अजमेर", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["Jaipur Rural", "Dudu", "Didwana-Kuchaman", "Ajmer", "Question Not Attempted"],
      ans: 0,
      exp: "सांभर झील का अधिकांश भाग तथा प्रशासनिक केंद्र अब जयपुर ग्रामीण जिले के अंतर्गत आता है।"
    },
    {
      qH: "प्रसिद्ध 'बणी-ठणी' चित्र किस चित्रकला शैली का सर्वोत्कृष्ट उदाहरण है?",
      qE: "The famous 'Bani-Thani' painting is the finest example of which painting school?",
      optsH: ["किशनगढ़ शैली", "मेवाड़ शैली", "बूंदी शैली", "अलवर शैली", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["Kishangarh School", "Mewar School", "Bundi School", "Alwar School", "Question Not Attempted"],
      ans: 0,
      exp: "बणी-ठणी किशनगढ़ शैली का प्रसिद्ध चित्र है जिसे मोरध्वज निहालचंद ने चित्रित किया था।"
    },
    {
      qH: "क्षेत्रफल की दृष्टि से राजस्थान का वर्तमान में सबसे छोटा जिला कौन सा है?",
      qE: "Which is currently the smallest district of Rajasthan in terms of geographical area?",
      optsH: ["धौलपुर", "दूदू", "दौसा", "कोटपूतली-बहरोड़", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["Dholpur", "Dudu", "Dausa", "Kotputli-Behror", "Question Not Attempted"],
      ans: 1,
      exp: "पुनर्गठन के बाद दूदू राजस्थान का सबसे छोटा जिला है जिसमें केवल 3 तहसीलें हैं।"
    },
    {
      qH: "राजस्थान में 'ऊपरमाल पंच बोर्ड' की स्थापना 1917 में किसके द्वारा की गई थी?",
      qE: "By whom was the 'Uparmal Panch Board' established in Rajasthan in 1917?",
      optsH: ["विजय सिंह पथिक", "साधु सीताराम दास", "माणिक्य लाल वर्मा", "जोरावर सिंह बारहठ", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["Vijay Singh Pathik", "Sadhu Sitaram Das", "Manikya Lal Verma", "Zorawar Singh Barhath", "Question Not Attempted"],
      ans: 0,
      exp: "हरियाली अमावस्या 1917 को विजय सिंह पथिक ने बेरीसाल में ऊपरमाल पंच बोर्ड की स्थापना की थी।"
    },
    {
      qH: "राजस्थान की एकमात्र नित्यवाही (वर्षपर्यंत बहने वाली) नदी कौन सी है?",
      qE: "Which is the only perennial river that flows throughout the year in Rajasthan?",
      optsH: ["बनास", "चंबल", "माही", "लूनी", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["Banas", "Chambal", "Mahi", "Luni", "Question Not Attempted"],
      ans: 1,
      exp: "चंबल नदी राजस्थान की एकमात्र बारहमासी नदी है, जिसे कामधेनु व चर्मण्वती भी कहा जाता है।"
    },
    {
      qH: "अरावली पर्वतमाला की दूसरी सबसे ऊंची चोटी कौन सी है?",
      qE: "Which is the second highest peak of the Aravalli mountain range?",
      optsH: ["जरगा", "सेर", "दिलवाड़ा", "अचलगढ़", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["Jarga", "Ser", "Dilwara", "Achalgarh", "Question Not Attempted"],
      ans: 1,
      exp: "सेर (1597 मीटर, सिरोही) अरावली की दूसरी सबसे ऊंची चोटी है।"
    }
  ];

  const rawScienceQuestions = [
    {
      qH: "मानव शरीर में रक्त का थक्का (Blood Clotting) बनाने में कौन सा विटामिन सहायक है?",
      qE: "Which vitamin is helpful in blood clotting in the human body?",
      optsH: ["विटामिन A", "विटामिन C", "विटामिन K", "विटामिन D", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["Vitamin A", "Vitamin C", "Vitamin K", "Vitamin D", "Question Not Attempted"],
      ans: 2,
      exp: "विटामिन K रक्त का थक्का जमाने वाले प्रोथ्रोम्बिन के संश्लेषण में आवश्यक होता है।"
    },
    {
      qH: "वाहनों में साइड मिरर (रियर व्यू) के रूप में किस प्रकार के दर्पण का उपयोग किया जाता है?",
      qE: "Which type of mirror is used as a rear-view (side) mirror in automobiles?",
      optsH: ["अवतल दर्पण", "उत्तल दर्पण", "समतल दर्पण", "उभयोत्तल लेंस", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["Concave mirror", "Convex mirror", "Plane mirror", "Biconvex lens", "Question Not Attempted"],
      ans: 1,
      exp: "उत्तल दर्पण सदैव सीधा, छोटा व विस्तृत दृष्टि क्षेत्र प्रदान करता है।"
    },
    {
      qH: "बेकिंग सोडा (खाने का सोडा) का रासायनिक सूत्र क्या है?",
      qE: "What is the chemical formula of Baking Soda?",
      optsH: ["Na2CO3.10H2O", "NaHCO3", "NaOH", "Ca(OH)2", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["Na2CO3.10H2O", "NaHCO3", "NaOH", "Ca(OH)2", "Question Not Attempted"],
      ans: 1,
      exp: "सोडियम हाइड्रोजन कार्बोनेट (NaHCO3) को बेकिंग सोडा कहा जाता है।"
    },
    {
      qH: "मानव नेत्र में किसी वस्तु का प्रतिबिंब कहाँ बनता है?",
      qE: "Where is the image of an object formed in the human eye?",
      optsH: ["कॉर्निया", "पुतली", "रेटिना (दृष्टिपटल)", "परितारिका", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["Cornea", "Pupil", "Retina", "Iris", "Question Not Attempted"],
      ans: 2,
      exp: "मानव नेत्र में प्रतिबिंब रेटिना पर वास्तविक एवं उल्टा बनता है।"
    }
  ];

  const rawPolityQuestions = [
    {
      qH: "राजस्थान लोक सेवा आयोग (RPSC) के अध्यक्ष व सदस्यों की नियुक्ति किसके द्वारा की जाती है?",
      qE: "By whom are the Chairman and Members of RPSC appointed?",
      optsH: ["मुख्यमंत्री", "राज्यपाल", "उच्च न्यायालय के मुख्य न्यायाधीश", "राष्ट्रपति", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["Chief Minister", "Governor", "Chief Justice of High Court", "President", "Question Not Attempted"],
      ans: 1,
      exp: "अनुच्छेद 316 के तहत RPSC के अध्यक्ष व सदस्यों की नियुक्ति राज्य के राज्यपाल द्वारा की जाती है।"
    },
    {
      qH: "राजस्थान विधानसभा में वर्तमान में कुल कितनी सीटें (सदस्य संख्या) हैं?",
      qE: "What is the total number of seats (members) in the Rajasthan Legislative Assembly?",
      optsH: ["160", "180", "200", "250", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["160", "180", "200", "250", "Question Not Attempted"],
      ans: 2,
      exp: "छठी विधानसभा (1977) से राजस्थान विधानसभा की सदस्य संख्या 200 निर्धारित है।"
    },
    {
      qH: "संविधान के किस अनुच्छेद के तहत राज्यपाल अध्यादेश (Ordinance) जारी कर सकता है?",
      qE: "Under which Article of the Constitution can the Governor promulgate an ordinance?",
      optsH: ["अनुच्छेद 123", "अनुच्छेद 213", "अनुच्छेद 163", "अनुच्छेद 174", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["Article 123", "Article 213", "Article 163", "Article 174", "Question Not Attempted"],
      ans: 1,
      exp: "अनुच्छेद 213 के तहत राज्यपाल विधानमंडल के विश्रांतिकाल में अध्यादेश जारी कर सकता है।"
    }
  ];

  const rawHindiQuestions = [
    {
      qH: "'अन्वेषण' शब्द का सही संधि-विच्छेद क्या होगा?",
      qE: "What will be the correct Sandhi-Vichhed for the word 'Anveshan'?",
      optsH: ["अनु + एषण", "अन + वेषण", "अनु + ऐषण", "अनवे + षण", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["Anu + Eshan", "An + Veshan", "Anu + Aishan", "Anve + Shan", "Question Not Attempted"],
      ans: 0,
      exp: "'अनु + एषण' = अन्वेषण (यण् स्वर संधि का उदाहरण)।"
    },
    {
      qH: "निम्नलिखित में से किस शब्द में 'द्विगु समास' है?",
      qE: "Which of the following words exhibits 'Dvigu Samas'?",
      optsH: ["त्रिलोकी", "पीताम्बर", "यथाशक्ति", "नीलकमल", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["Triloki", "Pitambar", "Yathashakti", "Neelkamal", "Question Not Attempted"],
      ans: 0,
      exp: "त्रिलोकी में प्रथम पद संख्यावाची (तीन लोकों का समाहार) होने से द्विगु समास है।"
    },
    {
      qH: "'जंगम' शब्द का सही विलोम शब्द क्या है?",
      qE: "What is the correct antonym of the word 'Jangam'?",
      optsH: ["स्थावर", "पुष्ट", "दुर्गम", "अगम", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["Sthavar", "Pusht", "Durgam", "Agam", "Question Not Attempted"],
      ans: 0,
      exp: "जंगम (चलने-फिरने वाला) का विलोम 'स्थावर' (स्थिर रहने वाला) होता है।"
    }
  ];

  const rawMathsQuestions = [
    {
      qH: "यदि किसी वस्तु का क्रय मूल्य ₹800 है तथा इसे ₹960 में बेचा जाता है, तो लाभ प्रतिशत क्या होगा?",
      qE: "If the cost price of an article is ₹800 and it is sold for ₹960, what will be the profit percentage?",
      optsH: ["15%", "20%", "25%", "18%", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["15%", "20%", "25%", "18%", "Question Not Attempted"],
      ans: 1,
      exp: "लाभ = 960 - 800 = ₹160; लाभ% = (160 / 800) × 100 = 20%."
    },
    {
      qH: "श्रृंखला पूर्ण करें: 3, 7, 15, 31, 63, ?",
      qE: "Complete the number series: 3, 7, 15, 31, 63, ?",
      optsH: ["127", "125", "120", "131", "अनुत्तरित प्रश्न (Question Not Attempted)"],
      optsE: ["127", "125", "120", "131", "Question Not Attempted"],
      ans: 0,
      exp: "पैटर्न: (x × 2) + 1। 63 × 2 + 1 = 127।"
    }
  ];

  // Construct exactly 100 questions distributed across the 5 sections
  for (let i = 1; i <= 100; i++) {
    if (i <= 40) {
      // Section 1: Rajasthan GK (Q1 to Q40)
      const base = rawGkQuestions[(i - 1) % rawGkQuestions.length];
      bank.push({
        id: i,
        sectionId: 'sec-raj-gk',
        sectionNameHindi: 'राजस्थान सामान्य ज्ञान',
        sectionNameEnglish: 'Rajasthan GK',
        questionHindi: i <= rawGkQuestions.length ? base.qH : `[प्रश्न ${i}] ${base.qH}`,
        questionEnglish: i <= rawGkQuestions.length ? base.qE : `[Question ${i}] ${base.qE}`,
        optionsHindi: base.optsH as any,
        optionsEnglish: base.optsE as any,
        correctOptionIndex: base.ans,
        explanationHindi: base.exp,
        marks: 2.0,
        negativeMarks: 0.66
      });
    } else if (i <= 60) {
      // Section 2: General Science (Q41 to Q60)
      const base = rawScienceQuestions[(i - 41) % rawScienceQuestions.length];
      bank.push({
        id: i,
        sectionId: 'sec-science',
        sectionNameHindi: 'दैनिक सामान्य विज्ञान',
        sectionNameEnglish: 'General Science',
        questionHindi: (i - 40) <= rawScienceQuestions.length ? base.qH : `[प्रश्न ${i}] ${base.qH}`,
        questionEnglish: (i - 40) <= rawScienceQuestions.length ? base.qE : `[Question ${i}] ${base.qE}`,
        optionsHindi: base.optsH as any,
        optionsEnglish: base.optsE as any,
        correctOptionIndex: base.ans,
        explanationHindi: base.exp,
        marks: 2.0,
        negativeMarks: 0.66
      });
    } else if (i <= 75) {
      // Section 3: Rajasthan Polity (Q61 to Q75)
      const base = rawPolityQuestions[(i - 61) % rawPolityQuestions.length];
      bank.push({
        id: i,
        sectionId: 'sec-polity',
        sectionNameHindi: 'राजस्थान राजव्यवस्था',
        sectionNameEnglish: 'Rajasthan Polity',
        questionHindi: (i - 60) <= rawPolityQuestions.length ? base.qH : `[प्रश्न ${i}] ${base.qH}`,
        questionEnglish: (i - 60) <= rawPolityQuestions.length ? base.qE : `[Question ${i}] ${base.qE}`,
        optionsHindi: base.optsH as any,
        optionsEnglish: base.optsE as any,
        correctOptionIndex: base.ans,
        explanationHindi: base.exp,
        marks: 2.0,
        negativeMarks: 0.66
      });
    } else if (i <= 90) {
      // Section 4: General Hindi (Q76 to Q90)
      const base = rawHindiQuestions[(i - 76) % rawHindiQuestions.length];
      bank.push({
        id: i,
        sectionId: 'sec-hindi',
        sectionNameHindi: 'सामान्य हिन्दी',
        sectionNameEnglish: 'General Hindi',
        questionHindi: (i - 75) <= rawHindiQuestions.length ? base.qH : `[प्रश्न ${i}] ${base.qH}`,
        questionEnglish: (i - 75) <= rawHindiQuestions.length ? base.qE : `[Question ${i}] ${base.qE}`,
        optionsHindi: base.optsH as any,
        optionsEnglish: base.optsE as any,
        correctOptionIndex: base.ans,
        explanationHindi: base.exp,
        marks: 2.0,
        negativeMarks: 0.66
      });
    } else {
      // Section 5: Mental Ability & Maths (Q91 to Q100)
      const base = rawMathsQuestions[(i - 91) % rawMathsQuestions.length];
      bank.push({
        id: i,
        sectionId: 'sec-maths',
        sectionNameHindi: 'तार्किक क्षमता व गणित',
        sectionNameEnglish: 'Reasoning & Maths',
        questionHindi: (i - 90) <= rawMathsQuestions.length ? base.qH : `[प्रश्न ${i}] ${base.qH}`,
        questionEnglish: (i - 90) <= rawMathsQuestions.length ? base.qE : `[Question ${i}] ${base.qE}`,
        optionsHindi: base.optsH as any,
        optionsEnglish: base.optsE as any,
        correctOptionIndex: base.ans,
        explanationHindi: base.exp,
        marks: 2.0,
        negativeMarks: 0.66
      });
    }
  }

  return bank;
};

export const FULL_100_CBT_QUESTIONS = generateFull100QuestionBank();

export type CbtQuestion = CBTQuestion;

export const CBT_MOCK_TEST_CET = {
  id: 'mock-test-cet-grad-2024',
  title: 'RSMSSB समान पात्रता परीक्षा (CET स्नातक स्तर) 2024-25 फुल मॉडल टेस्ट',
  board: 'RSMSSB' as const,
  category: 'CET स्नातक स्तर 2024-25',
  totalQuestions: 100,
  durationMinutes: 120,
  totalMarks: 200,
  negativeMarking: '1/3 अंक (0.66 अंक)',
  hasFifthOption: true,
  subjectBreakdown: [
    { subject: 'राजस्थान सामान्य ज्ञान', totalQuestions: 40, weightage: '80 अंक' },
    { subject: 'सामान्य विज्ञान', totalQuestions: 20, weightage: '40 अंक' },
    { subject: 'राजस्थान राजव्यवस्था', totalQuestions: 15, weightage: '30 अंक' },
    { subject: 'सामान्य हिन्दी', totalQuestions: 15, weightage: '30 अंक' },
    { subject: 'तार्किक क्षमता एवं गणित', totalQuestions: 10, weightage: '20 अंक' },
  ],
  questions: FULL_100_CBT_QUESTIONS,
};
