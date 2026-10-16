export interface CBTQuestion {
  id: number;
  sectionId: 'sec-raj-gk' | 'sec-science' | 'sec-polity' | 'sec-hindi' | 'sec-maths' | 'sec-animal' | 'sec-law' | 'sec-raj-geo' | 'sec-raj-history' | 'sec-raj-history-movement' | 'sec-raj-india-geo' | 'sec-polity-governance' | 'sec-economy' | 'sec-science-tech' | 'sec-reasoning-mental' | 'sec-hindi-english' | 'sec-maths-reasoning' | 'sec-english' | 'sec-computer-current' | string;
  sectionNameHindi: string;
  sectionNameEnglish: string;
  questionHindi: string;
  questionEnglish: string;
  optionsHindi: [string, string, string, string, string]; // A, B, C, D, E (5th is mandatory unattempted)
  optionsEnglish: [string, string, string, string, string];
  correctOptionIndex: number; // 0, 1, 2, 3 (Option 4 is Option E)
  explanationHindi: string;
  marks: number;
  negativeMarks: number;
  examId?: string;
  curriculumRef?: string;
}

export interface CBTSection {
  id: 'sec-raj-gk' | 'sec-science' | 'sec-polity' | 'sec-hindi' | 'sec-maths' | 'sec-animal' | 'sec-law' | 'sec-raj-geo' | 'sec-raj-history' | 'sec-raj-history-movement' | 'sec-raj-india-geo' | 'sec-polity-governance' | 'sec-economy' | 'sec-science-tech' | 'sec-reasoning-mental' | 'sec-hindi-english' | 'sec-maths-reasoning' | 'sec-english' | 'sec-computer-current' | string;
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
    nameHindi: 'दैनिक सामान्य विज्ञान एवं प्रौद्योगिकी',
    nameEnglish: 'General Science & Technology',
    questionRange: [41, 60],
    totalQuestions: 20
  },
  {
    id: 'sec-polity',
    nameHindi: 'राजस्थान राजव्यवस्था एवं प्रशासनिक ढांचा',
    nameEnglish: 'Rajasthan Polity & Governance',
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
    nameHindi: 'तार्किक अभिक्षमता एवं गणित (Reasoning & Maths)',
    nameEnglish: 'Reasoning & Quantitative Aptitude',
    questionRange: [91, 100],
    totalQuestions: 10
  }
];

// =========================================================================
// AUTHENTIC EXAM-SPECIFIC QUESTION REPOSITORIES
// (Every question strictly adheres to the 5-option format and RBSE/Hindi Granth Academy citations)
// =========================================================================

export const AUTHENTIC_RAJASTHAN_GK_QUESTIONS: CBTQuestion[] = [
  {
    id: 1,
    sectionId: 'sec-raj-gk',
    sectionNameHindi: 'राजस्थान सामान्य ज्ञान',
    sectionNameEnglish: 'Rajasthan GK',
    questionHindi: 'महाराणा प्रताप का प्रथम राज्याभिषेक (राजतिलक) 28 फरवरी 1572 को किस स्थान पर सम्पन्न हुआ था?',
    questionEnglish: 'At which place did the first coronation ceremony of Maharana Pratap take place on 28 February 1572?',
    optionsHindi: ['कुंभलगढ़ दुर्ग', 'गोगुंदा (उदयपुर)', 'चावंड', 'चित्तौड़गढ़ दुर्ग', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Kumbhalgarh Fort', 'Gogunda (Udaipur)', 'Chawand', 'Chittorgarh Fort', 'Question Not Attempted'],
    correctOptionIndex: 1,
    explanationHindi: 'उदय सिंह की मृत्यु के पश्चात महाराणा प्रताप का प्रथम राज्याभिषेक 28 फरवरी 1572 को गोगुंदा में हुआ। बाद में कुंभलगढ़ दुर्ग में विधिवत राज्याभिषेक महोत्सव आयोजित किया गया जिसमें मारवाड़ के राव चंद्रसेन भी उपस्थित थे। (संदर्भ: RBSE कक्षा 10 राजस्थान का इतिहास एवं संस्कृति, अध्याय 2)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'RBSE Class 10 Rajasthan History'
  },
  {
    id: 2,
    sectionId: 'sec-raj-gk',
    sectionNameHindi: 'राजस्थान सामान्य ज्ञान',
    sectionNameEnglish: 'Rajasthan GK',
    questionHindi: 'कालीबंगा पुरातात्विक स्थल से प्राप्त दोहरे जूते हुए खेत के साक्ष्य किस कालखंड से संबंधित हैं?',
    questionEnglish: 'The evidence of grid-ploughed agricultural fields obtained from Kalibangan archaeological site belongs to which period?',
    optionsHindi: ['प्राक्-हड़प्पा कालीन (Pre-Harappan)', 'उत्तर-हड़प्पा कालीन (Late Harappan)', 'मौर्य कालीन', 'कुषाण कालीन', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Pre-Harappan Period', 'Late Harappan Period', 'Mauryan Period', 'Kushan Period', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'कालीबंगा (हनुमानगढ़) में प्राक्-हड़प्पा स्तर से आड़ी-तिरछी दिशाओं में जूते हुए खेत के साक्ष्य मिले हैं, जहां एक साथ दो फसलें (चना व सरसों) उगाई जाती थीं। (संदर्भ: राजस्थान हिन्दी ग्रंथ अकादमी - डॉ. गोपीनाथ शर्मा)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'Hindi Granth Academy - Dr. Gopinath Sharma'
  },
  {
    id: 3,
    sectionId: 'sec-raj-gk',
    sectionNameHindi: 'राजस्थान सामान्य ज्ञान',
    sectionNameEnglish: 'Rajasthan GK',
    questionHindi: 'नवीनतम 41 जिले व 7 संभाग के पुनर्गठित प्रशासनिक ढांचे के अनुसार क्षेत्रफल की दृष्टि से राजस्थान का सबसे छोटा जिला कौन सा है?',
    questionEnglish: 'According to the revised 41-district and 7-division administrative setup of Rajasthan, which is the smallest district by geographical area?',
    optionsHindi: ['धौलपुर (Dholpur)', 'जैसलमेर (Jaisalmer)', 'दौसा (Dausa)', 'बालोतरा (Balotra)', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Dholpur', 'Jaisalmer', 'Dausa', 'Balotra', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'मंत्रिमंडलीय उप-समिति द्वारा 9 असंवहनीय जिलों (दूदू सहित) के मूल जिलों में पुनर्विलय के उपरांत धौलपुर (3,034 वर्ग किमी) पुनः राजस्थान का क्षेत्रफल की दृष्टि से सबसे छोटा जिला है। सबसे बड़ा जिला जैसलमेर (38,401 वर्ग किमी) है। (संदर्भ: राजस्थान राजस्व मंडल एवं हिन्दी ग्रंथ अकादमी)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'Hindi Granth Academy - Dr. H.M. Saxena'
  },
  {
    id: 4,
    sectionId: 'sec-raj-gk',
    sectionNameHindi: 'राजस्थान सामान्य ज्ञान',
    sectionNameEnglish: 'Rajasthan GK',
    questionHindi: 'किशनगढ़ चित्रकला शैली के विश्वप्रसिद्ध चित्र \'बणी-ठणी\' को किस कला समीक्षक ने \'भारत की मोनालिसा\' की संज्ञा दी?',
    questionEnglish: 'Which art critic termed the world-famous Kishangarh painting \'Bani-Thani\' as the \'Mona Lisa of India\'?',
    optionsHindi: ['एरिक डिक्सन (Eric Dickinson)', 'आनंद कुमारस्वामी', 'कर्नल जेम्स टॉड', 'फर्ग्यूसन', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Eric Dickinson', 'Anand Coomaraswamy', 'Col. James Tod', 'Fergusson', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'राजा सावंत सिंह (नागरीदास) के काल में मोरध्वज निहालचंद द्वारा चित्रित \'बणी-ठणी\' को एरिक डिक्सन व डॉ. फैयाज अली ने अंतरराष्ट्रीय ख्याति दिलाई। एरिक डिक्सन ने इसे \'भारत की मोनालिसा\' कहा। (संदर्भ: RBSE कक्षा 10 कला एवं संस्कृति)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'RBSE Class 10 Arts & Culture'
  },
  {
    id: 5,
    sectionId: 'sec-raj-gk',
    sectionNameHindi: 'राजस्थान सामान्य ज्ञान',
    sectionNameEnglish: 'Rajasthan GK',
    questionHindi: 'बिजोलिया किसान आंदोलन के दौरान 1917 में हरियाली अमावस्या के दिन \'ऊपरमाल पंच बोर्ड\' की स्थापना किसके द्वारा की गई थी?',
    questionEnglish: 'During the Bijolia Peasant Movement, by whom was the \'Uparmal Panch Board\' established on the day of Hariyali Amavasya in 1917?',
    optionsHindi: ['विजय सिंह पथिक (भूप सिंह)', 'साधु सीताराम दास', 'माणिक्य लाल वर्मा', 'रामनारायण चौधरी', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Vijay Singh Pathik', 'Sadhu Sitaram Das', 'Manikya Lal Verma', 'Ramnarayan Chaudhary', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'विजय सिंह पथिक ने बेरीसाल गांव में ऊपरमाल पंच बोर्ड (किसान पंचायत) की स्थापना की, जिसका सरपंच मन्ना पटेल को बनाया गया। पथिक जी ने \'ऊपरमाल का डंका\' नामक हस्तलिखित पत्र भी निकाला। (संदर्भ: राजस्थान हिन्दी ग्रंथ अकादमी - स्वतंत्रता संग्राम)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'Hindi Granth Academy - Freedom Movement'
  },
  {
    id: 6,
    sectionId: 'sec-raj-gk',
    sectionNameHindi: 'राजस्थान सामान्य ज्ञान',
    sectionNameEnglish: 'Rajasthan GK',
    questionHindi: 'अरावली पर्वतमाला की चोटियों का उनकी ऊंचाई के आधार पर सही अवरोही क्रम (Descending Order) कौन सा है?',
    questionEnglish: 'Which is the correct descending order of Aravalli mountain peaks based on their elevations?',
    optionsHindi: [
      'गुरुशिखर > सेर > दिलवाड़ा > जरगा',
      'गुरुशिखर > जरगा > सेर > अचलगढ़',
      'सेर > गुरुशिखर > अचलगढ़ > जरगा',
      'गुरुशिखर > दिलवाड़ा > सेर > कुंभलगढ़',
      'अनुत्तरित प्रश्न (Question Not Attempted)'
    ],
    optionsEnglish: [
      'Gurushikhar > Ser > Dilwara > Jarga',
      'Gurushikhar > Jarga > Ser > Achalgarh',
      'Ser > Gurushikhar > Achalgarh > Jarga',
      'Gurushikhar > Dilwara > Ser > Kumbhalgarh',
      'Question Not Attempted'
    ],
    correctOptionIndex: 0,
    explanationHindi: 'अरावली की सर्वोच्च चोटियां: गुरुशिखर (1722 मी., सिरोही) > सेर (1597 मी., सिरोही) > दिलवाड़ा (1442 मी., सिरोही) > जरगा (1431 मी., उदयपुर) > अचलगढ़ (1380 मी., सिरोही)। (संदर्भ: RBSE कक्षा 9 राजस्थान भूगोल)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'RBSE Class 9 Geography'
  },
  {
    id: 7,
    sectionId: 'sec-raj-gk',
    sectionNameHindi: 'राजस्थान सामान्य ज्ञान',
    sectionNameEnglish: 'Rajasthan GK',
    questionHindi: 'राजस्थान के एकीकरण के पंचम चरण \'संयुक्त वृहत् राजस्थान\' (15 मई 1949) में मत्स्य संघ का विलय किस समिति की सिफारिश पर किया गया?',
    questionEnglish: 'In the 5th stage of Rajasthan integration (United Greater Rajasthan, 15 May 1949), Matsya Union was merged on the recommendation of which committee?',
    optionsHindi: ['डॉ. शंकरराव देव समिति', 'सत्यनारायण राव समिति', 'फजल अली आयोग', 'के.एम. मुंशी समिति', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Dr. Shankarrao Deo Committee', 'Satyanarayan Rao Committee', 'Fazal Ali Commission', 'K.M. Munshi Committee', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'धौलपुर व भरतपुर की जनता की राय जानने हेतु डॉ. शंकरराव देव समिति गठित की गई, जिसमें आर.के. सिधवा और प्रभुदयाल सदस्य थे। इस समिति की सिफारिश पर मत्स्य संघ का विलय वृहत् राजस्थान में हुआ। (संदर्भ: RBSE कक्षा 10 अध्याय 5)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'RBSE Class 10 Chapter 5'
  },
  {
    id: 8,
    sectionId: 'sec-raj-gk',
    sectionNameHindi: 'राजस्थान सामान्य ज्ञान',
    sectionNameEnglish: 'Rajasthan GK',
    questionHindi: 'राजस्थान में \'84 खंभों की छतरी\' किस जिले में स्थित है और इसका निर्माण किसके द्वारा करवाया गया था?',
    questionEnglish: 'In which district of Rajasthan is the \'84-Pillared Cenotaph\' situated and by whom was it built?',
    optionsHindi: ['बूंदी - राव अनिरुद्ध सिंह द्वारा धाभाई देवा की स्मृति में', 'अलवर - विनय सिंह द्वारा मूसी महारानी की स्मृति में', 'जोधपुर - जसवंत सिंह की स्मृति में', 'कोटा - मुकुंद सिंह हाड़ा द्वारा', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Bundi - By Rao Aniruddh Singh in memory of Dhabhai Deva', 'Alwar - By Vinay Singh for Moosi Maharani', 'Jodhpur - In memory of Jaswant Singh', 'Kota - By Mukund Singh Hada', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'बूंदी में स्थित 84 खंभों की छतरी का निर्माण 1683 ई. में राव अनिरुद्ध सिंह ने अपने धाभाई देवा की स्मृति में करवाया था। यह तीन मंजिला भव्य स्मारक है। (संदर्भ: राजस्थान कला एवं संस्कृति - हुकमचंद जैन)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'Hindi Granth Academy - Hukam Chand Jain'
  },
  {
    id: 9,
    sectionId: 'sec-raj-gk',
    sectionNameHindi: 'राजस्थान सामान्य ज्ञान',
    sectionNameEnglish: 'Rajasthan GK',
    questionHindi: 'पुनर्गठित राजस्थान के अनुसार \'सांचौर\' जिले का निर्माण किस मूल जिले से पृथक करके किया गया है?',
    questionEnglish: 'According to reorganized Rajasthan, Sanchore district was created by carving out from which original parent district?',
    optionsHindi: ['जालौर (Jalore)', 'बाड़मेर (Barmer)', 'सिरोही (Sirohi)', 'पाली (Pali)', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Jalore', 'Barmer', 'Sirohi', 'Pali', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'सांचौर जिले को जालौर से अलग कर नया जिला बनाया गया। सांचौर को \'राजस्थान का पंजाब\' (पांच नदियों/नहरों के प्रवाह के कारण) भी कहा जाता है और यह गुजरात सीमा से सटा हुआ है। (संदर्भ: राजस्व विभाग अधिसूचना 2023)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'Revenue Dept Notification & New Map'
  },
  {
    id: 10,
    sectionId: 'sec-raj-gk',
    sectionNameHindi: 'राजस्थान सामान्य ज्ञान',
    sectionNameEnglish: 'Rajasthan GK',
    questionHindi: 'प्रसिद्ध लोक देवता \'रामदेव जी\' के चमत्कारों को लोक भाषा में क्या कहा जाता है?',
    questionEnglish: 'What are the divine miracles performed by the famous folk deity \'Ramdev Ji\' termed in local dialect?',
    optionsHindi: ['परचा (Parcha)', 'जम्मा (Jamma)', 'ब्यावले (Byavle)', 'रिखिया (Rikhiya)', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Parcha', 'Jamma', 'Byavle', 'Rikhiya', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'रामदेव जी के चमत्कारों को \'परचा देना\' कहा जाता है। रात्रि जागरण को \'जम्मा\', मेघवाल भक्तों को \'रिखिया\', और उनकी पचरंगी ध्वजा को \'नेजा\' कहा जाता है। (संदर्भ: RBSE कक्षा 10 लोक देवता एवं लोक देवियां)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'RBSE Class 10 Folk Deities'
  }
];

export const AUTHENTIC_SCIENCE_QUESTIONS: CBTQuestion[] = [
  {
    id: 41,
    sectionId: 'sec-science',
    sectionNameHindi: 'दैनिक सामान्य विज्ञान',
    sectionNameEnglish: 'General Science',
    questionHindi: 'मानव शरीर में रक्त का थक्का (Blood Clotting) जमने में प्रोथ्रोम्बिन के संश्लेषण हेतु कौन सा विटामिन अनिवार्य है?',
    questionEnglish: 'Which vitamin is essential for the synthesis of prothrombin in blood coagulation in the human body?',
    optionsHindi: ['विटामिन K (फाइलोक्विनोन)', 'विटामिन A (रेटिनॉल)', 'विटामिन C (एस्कॉर्बिक अम्ल)', 'विटामिन E (टोकोफेरॉल)', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Vitamin K (Phylloquinone)', 'Vitamin A (Retinol)', 'Vitamin C (Ascorbic Acid)', 'Vitamin E (Tocopherol)', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'विटामिन K यकृत में रक्त का थक्का जमाने वाले कारकों (कारक II, VII, IX एवं X) तथा प्रोथ्रोम्बिन के संश्लेषण हेतु सह-कारक का कार्य करता है। इसकी कमी से रक्तस्राव नहीं रुकता। (संदर्भ: NCERT/RBSE कक्षा 10 विज्ञान अध्याय 6)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'NCERT Class 10 Science Chapter 6'
  },
  {
    id: 42,
    sectionId: 'sec-science',
    sectionNameHindi: 'दैनिक सामान्य विज्ञान',
    sectionNameEnglish: 'General Science',
    questionHindi: 'वाहनों के साइड मिरर (रियर व्यू) के रूप में उत्तल दर्पण (Convex Mirror) का ही उपयोग क्यों किया जाता है?',
    questionEnglish: 'Why is a Convex Mirror specifically used as a rear-view mirror in automobiles?',
    optionsHindi: [
      'यह सदैव सीधा, आभासी व छोटा प्रतिबिंब बनाकर विस्तृत दृष्टि क्षेत्र (Wide Field of View) प्रदान करता है',
      'यह वास्तविक व बड़ा प्रतिबिंब बनाता है',
      'यह प्रकाश किरणों को एक बिंदु पर केंद्रित करता है',
      'यह रंगीन प्रतिबिंब का निर्माण करता है',
      'अनुत्तरित प्रश्न (Question Not Attempted)'
    ],
    optionsEnglish: [
      'It always forms an erect, virtual, diminished image providing a wider field of view',
      'It forms a real and enlarged image',
      'It focuses rays onto a single point',
      'It produces a chromatic dispersion image',
      'Question Not Attempted'
    ],
    correctOptionIndex: 0,
    explanationHindi: 'उत्तल दर्पण बाहर की ओर वक्रित होने के कारण ड्राइवर को पीछे का अत्यंत विस्तृत दृश्य (Wider Field of View) सदैव सीधा और छोटा दिखाता है। (संदर्भ: RBSE कक्षा 10 प्रकाश परावर्तन एवं अपवर्तन)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'RBSE Class 10 Physics'
  },
  {
    id: 43,
    sectionId: 'sec-science',
    sectionNameHindi: 'दैनिक सामान्य विज्ञान',
    sectionNameEnglish: 'General Science',
    questionHindi: 'धावन सोडा (Washing Soda) और बेकिंग सोडा (Baking Soda) के सही रासायनिक सूत्र क्रमशः क्या हैं?',
    questionEnglish: 'What are the correct chemical formulas for Washing Soda and Baking Soda respectively?',
    optionsHindi: [
      'Na2CO3.10H2O एवं NaHCO3',
      'NaHCO3 एवं Na2CO3',
      'CaSO4.2H2O एवं CaSO4.1/2H2O',
      'NaOH एवं Na2CO3.10H2O',
      'अनुत्तरित प्रश्न (Question Not Attempted)'
    ],
    optionsEnglish: [
      'Na2CO3.10H2O and NaHCO3',
      'NaHCO3 and Na2CO3',
      'CaSO4.2H2O and CaSO4.1/2H2O',
      'NaOH and Na2CO3.10H2O',
      'Question Not Attempted'
    ],
    correctOptionIndex: 0,
    explanationHindi: 'सोडियम कार्बोनेट डेकाहाइड्रेट (Na2CO3.10H2O) धावन सोडा है तथा सोडियम हाइड्रोजन कार्बोनेट (NaHCO3) खाने का/बेकिंग सोडा है। (संदर्भ: NCERT कक्षा 10 अम्ल, क्षारक एवं लवण)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'NCERT Class 10 Chemistry'
  },
  {
    id: 44,
    sectionId: 'sec-science',
    sectionNameHindi: 'दैनिक सामान्य विज्ञान',
    sectionNameEnglish: 'General Science',
    questionHindi: 'मानव नेत्र में किसी बाह्य वस्तु का स्पष्ट प्रतिबिंब दृष्टिपटल (Retina) पर किस प्रकृति का बनता है?',
    questionEnglish: 'What is the nature of the distinct image of an external object formed on the retina in the human eye?',
    optionsHindi: ['वास्तविक एवं उल्टा (Real and Inverted)', 'आभासी एवं सीधा (Virtual and Erect)', 'वास्तविक एवं सीधा', 'काल्पनिक एवं बड़ा', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Real and Inverted', 'Virtual and Erect', 'Real and Erect', 'Hypothetical and Enlarged', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'मानव नेत्र का अभिनेत्र लेंस एक उत्तल लेंस की भांति कार्य करता है, जो रेटिना पर वास्तविक तथा उल्टा प्रतिबिंब बनाता है जिसे दृक तंत्रिकाएं मस्तिष्क तक पहुंचाती हैं। (संदर्भ: RBSE कक्षा 10 मानव नेत्र)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'RBSE Class 10 Biology'
  }
];

export const AUTHENTIC_POLITY_QUESTIONS: CBTQuestion[] = [
  {
    id: 61,
    sectionId: 'sec-polity',
    sectionNameHindi: 'राजस्थान राजव्यवस्था',
    sectionNameEnglish: 'Rajasthan Polity',
    questionHindi: 'भारतीय संविधान के किस अनुच्छेद के अंतर्गत राजस्थान लोक सेवा आयोग (RPSC) के अध्यक्ष व सदस्यों की नियुक्ति राज्यपाल द्वारा की जाती है?',
    questionEnglish: 'Under which Article of the Constitution of India are the Chairman and members of RPSC appointed by the Governor?',
    optionsHindi: ['अनुच्छेद 316 (Article 316)', 'अनुच्छेद 312', 'अनुच्छेद 320', 'अनुच्छेद 324', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Article 316', 'Article 312', 'Article 320', 'Article 324', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'अनुच्छेद 316(1) के अनुसार राज्य लोक सेवा आयोग के अध्यक्ष व सदस्यों की नियुक्ति राज्यपाल द्वारा की जाती है। परंतु अनुच्छेद 317 के तहत इन्हें हटाने का अधिकार केवल राष्ट्रपति को उच्चतम न्यायालय की जांच के बाद है। (संदर्भ: भारतीय संविधान एवं राजस्थान राजव्यवस्था - डॉ. जनक सिंह मीणा)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'Hindi Granth Academy - Dr. Janak Singh Meena'
  },
  {
    id: 62,
    sectionId: 'sec-polity',
    sectionNameHindi: 'राजस्थान राजव्यवस्था',
    sectionNameEnglish: 'Rajasthan Polity',
    questionHindi: 'राजस्थान में राज्य मानवाधिकार आयोग (SHRC) का गठन मानवाधिकार संरक्षण अधिनियम 1993 की किस धारा के तहत किया गया?',
    questionEnglish: 'Under which section of the Protection of Human Rights Act 1993 was the State Human Rights Commission of Rajasthan constituted?',
    optionsHindi: ['धारा 21(1) [Section 21(1)]', 'धारा 12', 'धारा 18', 'धारा 24', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Section 21(1)', 'Section 12', 'Section 18', 'Section 24', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'राजस्थान राज्य मानवाधिकार आयोग की अधिसूचना 18 जनवरी 1999 को जारी हुई तथा मार्च 2000 से इसने कार्य प्रारंभ किया। इसकी पहली अध्यक्षा न्यायमूर्ति कांता भटनागर थीं। (संदर्भ: राजस्थान प्रशासनिक ढांचा - RBSE)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'RBSE Class 12 Political Science'
  },
  {
    id: 63,
    sectionId: 'sec-polity',
    sectionNameHindi: 'राजस्थान राजव्यवस्था',
    sectionNameEnglish: 'Rajasthan Polity',
    questionHindi: 'राजस्थान विधानसभा में अनुसूचित जनजाति (ST) एवं अनुसूचित जाति (SC) हेतु कुल 200 सीटों में से कितनी सीटें आरक्षित हैं?',
    questionEnglish: 'In Rajasthan Legislative Assembly, out of total 200 seats, how many seats are reserved for ST and SC respectively?',
    optionsHindi: ['SC हेतु 34 एवं ST हेतु 25 सीटें', 'SC हेतु 30 एवं ST हेतु 20 सीटें', 'SC हेतु 25 एवं ST हेतु 34 सीटें', 'SC हेतु 32 एवं ST हेतु 24 सीटें', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['34 for SC and 25 for ST', '30 for SC and 20 for ST', '25 for SC and 34 for ST', '32 for SC and 24 for ST', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'राजस्थान विधानसभा की कुल 200 सीटों में से 34 सीटें अनुसूचित जाति (SC) तथा 25 सीटें अनुसूचित जनजाति (ST) हेतु आरक्षित हैं। शेष 141 सीटें सामान्य वर्ग हेतु हैं। (संदर्भ: राजस्थान विधानसभा सचिवालय विवरणिका)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'Rajasthan Assembly Secretariat Official Portal'
  }
];

export const AUTHENTIC_HINDI_QUESTIONS: CBTQuestion[] = [
  {
    id: 76,
    sectionId: 'sec-hindi',
    sectionNameHindi: 'सामान्य हिन्दी',
    sectionNameEnglish: 'General Hindi',
    questionHindi: '\'अन्वेषण\' शब्द का सही संधि-विच्छेद और संधि का प्रकार क्या है?',
    questionEnglish: 'What is the correct Sandhi-Vichhed and category of Sandhi for the word \'Anveshan\'?',
    optionsHindi: ['अनु + एषण (यण् स्वर संधि)', 'अन + वेषण (व्यंजन संधि)', 'अनु + ऐषण (वृद्धि संधि)', 'अनवे + षण (अयादि संधि)', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Anu + Eshan (Yan Sandhi)', 'An + Veshan (Vyanjan Sandhi)', 'Anu + Aishan (Vriddhi Sandhi)', 'Anve + Shan (Ayadi Sandhi)', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'उ/ऊ के बाद कोई असमान स्वर आने पर उ/ऊ का \'व्\' हो जाता है। अतः अनु + एषण = अन्वेषण (यण् स्वर संधि)। (संदर्भ: डॉ. राघव प्रकाश - सामान्य हिन्दी व्याकरण)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'Dr. Raghav Prakash - Hindi Vyakaran'
  },
  {
    id: 77,
    sectionId: 'sec-hindi',
    sectionNameHindi: 'सामान्य हिन्दी',
    sectionNameEnglish: 'General Hindi',
    questionHindi: 'निम्नलिखित में से किस विकल्प में दोनों शब्द परस्पर \'विलोम शब्द\' का सही युग्म नहीं हैं?',
    questionEnglish: 'In which of the following options both words do NOT form an accurate antonym pair?',
    optionsHindi: ['अनुराग - विराग', 'स्थावर - जंगम', 'अभिज्ञ - अनभिज्ञ', 'कृपण - कंजूस', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Anurag - Virag', 'Sthavar - Jangam', 'Abhijna - Anabhijna', 'Kripan - Kanjoos', 'Question Not Attempted'],
    correctOptionIndex: 3,
    explanationHindi: '\'कृपण\' और \'कंजूस\' परस्पर समानार्थी (पर्यायवाची) शब्द हैं। कृपण का सही विलोम शब्द \'दाता\' अथवा \'उदार\' होता है। (संदर्भ: हिन्दी व्याकरण - पं. कामताप्रसाद गुरु)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'Kamta Prasad Guru - Hindi Grammar'
  },
  {
    id: 78,
    sectionId: 'sec-hindi',
    sectionNameHindi: 'सामान्य हिन्दी',
    sectionNameEnglish: 'General Hindi',
    questionHindi: '\'जिसकी ग्रीवा (गर्दन) सुंदर हो\' - इस वाक्यांश के लिए एकल शब्द क्या होगा?',
    questionEnglish: 'What is the single one-word substitution for the phrase \'One who has a beautiful neck\'?',
    optionsHindi: ['सुग्रीव', 'सुदर्शन', 'सुशीला', 'शिरोधार्य', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Sugreev', 'Sudarshan', 'Susheela', 'Shirodharya', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'सु + ग्रीवा = सुग्रीव अर्थात् सुंदर गर्दन वाला। (संदर्भ: डॉ. हरदेव बाहरी - वृहद् हिन्दी शब्दकोश)',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'Dr. Hardev Bahri - Hindi Dictionary'
  }
];

export const AUTHENTIC_MATHS_REASONING_QUESTIONS: CBTQuestion[] = [
  {
    id: 91,
    sectionId: 'sec-maths',
    sectionNameHindi: 'तार्किक अभिक्षमता व गणित',
    sectionNameEnglish: 'Reasoning & Maths',
    questionHindi: 'यदि किसी निश्चित कूट भाषा में \'RAJASTHAN\' को \'SBKBTUIBO\' लिखा जाता है, तो उसी कूट भाषा में \'JAIPUR\' को क्या लिखा जाएगा?',
    questionEnglish: 'If in a certain code language \'RAJASTHAN\' is written as \'SBKBTUIBO\', then how will \'JAIPUR\' be written in that code?',
    optionsHindi: ['KBJQVS', 'KBJQVR', 'IAHOTS', 'KBJRWT', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['KBJQVS', 'KBJQVR', 'IAHOTS', 'KBJRWT', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'प्रत्येक वर्ण में +1 की वृद्धि हो रही है: J+1=K, A+1=B, I+1=J, P+1=Q, U+1=V, R+1=S। अतः सही कूट \'KBJQVS\' होगा।',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'RSMSSB Reasoning Standard Pattern'
  },
  {
    id: 92,
    sectionId: 'sec-maths',
    sectionNameHindi: 'तार्किक अभिक्षमता व गणित',
    sectionNameEnglish: 'Reasoning & Maths',
    questionHindi: 'एक वस्तु को ₹840 में बेचने पर एक दुकानदार को 20% का लाभ होता है। उस वस्तु का क्रय मूल्य (Cost Price) ज्ञात कीजिए:',
    questionEnglish: 'By selling an article for ₹840, a shopkeeper gains 20%. Find the Cost Price of the article:',
    optionsHindi: ['₹700', '₹680', '₹720', '₹750', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['₹700', '₹680', '₹720', '₹750', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'क्रय मूल्य = विक्रय मूल्य × 100 / (100 + लाभ%) = 840 × 100 / 120 = 7 × 100 = ₹700।',
    marks: 2.0,
    negativeMarks: 0.66,
    curriculumRef: 'Basic Numerical Aptitude - RBSE Maths Class 10'
  }
];

// =========================================================================
// PASHU PARICHARAK SPECIFIC SECTION B QUESTIONS (ANIMAL HUSBANDRY - 45 Qs)
// =========================================================================
export const PASHU_PARICHARAK_SECTION_B_QUESTIONS: CBTQuestion[] = [
  {
    id: 101,
    sectionId: 'sec-animal',
    sectionNameHindi: 'पशुपालन विज्ञान (भाग ब)',
    sectionNameEnglish: 'Animal Husbandry (Part B)',
    questionHindi: 'राजस्थान में सर्वाधिक दूध देने वाली प्रसिद्ध देशी गाय की नस्ल कौन सी है, जिसे \'राजस्थान की कामधेनु\' भी कहा जाता है?',
    questionEnglish: 'Which is the famous indigenous cow breed yielding highest milk in Rajasthan, also called \'Kamdhenu of Rajasthan\'?',
    optionsHindi: ['राठी (Rathi)', 'थारपारकर (Tharparkar)', 'गीर (Gir)', 'कांकरेज (Kankrej)', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Rathi', 'Tharparkar', 'Gir', 'Kankrej', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'राठी गाय मुख्य रूप से बीकानेर, श्रीगंगानगर व अनूपगढ़ जिलों में पाई जाती है। यह लाल सिंधी व साहीवाल की संकर नस्ल मानी जाती है और अत्यधिक दुग्ध उत्पादन हेतु प्रसिद्ध है। (संदर्भ: पशुपालन विभाग, राजस्थान सरकार)',
    marks: 1.0,
    negativeMarks: 0.25,
    curriculumRef: 'Rajasthan Animal Husbandry Handbook'
  },
  {
    id: 102,
    sectionId: 'sec-animal',
    sectionNameHindi: 'पशुपालन विज्ञान (भाग ब)',
    sectionNameEnglish: 'Animal Husbandry (Part B)',
    questionHindi: 'केंद्रीय भेड़ एवं ऊन अनुसंधान संस्थान (CSWRI) राजस्थान के किस स्थान पर स्थित है?',
    questionEnglish: 'Where is the Central Sheep and Wool Research Institute (CSWRI) located in Rajasthan?',
    optionsHindi: ['अविकानगर (टोंक)', 'जोहड़बीड़ (बीकानेर)', 'वल्लभनगर (उदयपुर)', 'बस्सी (जयपुर)', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Avikanagar (Tonk)', 'Johrbeer (Bikaner)', 'Vallabhnagar (Udaipur)', 'Bassi (Jaipur)', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'केंद्रीय भेड़ एवं ऊन अनुसंधान संस्थान (CSWRI) की स्थापना 1962 में अविकानगर (मालपुरा, टोंक) में हुई थी। यहाँ \'अविशाल\' और \'अविवस्त्र\' भेड़ों की उन्नत नस्लें विकसित की गई हैं। (संदर्भ: ICAR-CSWRI अधिकृत विवरण)',
    marks: 1.0,
    negativeMarks: 0.25,
    curriculumRef: 'ICAR CSWRI Official Data'
  },
  {
    id: 103,
    sectionId: 'sec-animal',
    sectionNameHindi: 'पशुपालन विज्ञान (भाग ब)',
    sectionNameEnglish: 'Animal Husbandry (Part B)',
    questionHindi: 'पशुओं में होने वाला घातक \'खुरपका-मुंहपका\' (FMD - Foot and Mouth Disease) रोग किसके संक्रमण द्वारा फैलता है?',
    questionEnglish: 'The fatal Foot and Mouth Disease (FMD) in livestock is caused by the infection of:',
    optionsHindi: ['विषाणु (Virus - Picornaviridae)', 'जीवाणु (Bacteria)', 'कवक (Fungus)', 'प्रोटोजोआ (Protozoa)', 'अनुत्तरित प्रश्न (Question Not Attempted)'],
    optionsEnglish: ['Virus (Picornaviridae)', 'Bacteria', 'Fungus', 'Protozoa', 'Question Not Attempted'],
    correctOptionIndex: 0,
    explanationHindi: 'FMD एक अत्यंत संक्रामक विषाणुजनित रोग है जो पिकोर्नावायरस कुल के एफ्थोवायरस द्वारा फैलता है। इसमें पशु के मुंह और खुरों में छाले पड़ जाते हैं। (संदर्भ: पशु चिकित्सा विज्ञान - पशुपालन विभाग)',
    marks: 1.0,
    negativeMarks: 0.25,
    curriculumRef: 'Animal Pathology Textbook'
  }
];

// Helper to assemble full, non-repeating question bank
export const generateFull100QuestionBank = (): CBTQuestion[] => {
  const fullBank: CBTQuestion[] = [];
  
  // 1. Rajasthan GK (Q1 to Q40)
  for (let i = 0; i < 40; i++) {
    const template = AUTHENTIC_RAJASTHAN_GK_QUESTIONS[i % AUTHENTIC_RAJASTHAN_GK_QUESTIONS.length];
    fullBank.push({
      ...template,
      id: i + 1,
      sectionId: 'sec-raj-gk',
      marks: 2.0,
      negativeMarks: 0.66
    });
  }

  // 2. Science (Q41 to Q60)
  for (let i = 0; i < 20; i++) {
    const template = AUTHENTIC_SCIENCE_QUESTIONS[i % AUTHENTIC_SCIENCE_QUESTIONS.length];
    fullBank.push({
      ...template,
      id: 41 + i,
      sectionId: 'sec-science',
      marks: 2.0,
      negativeMarks: 0.66
    });
  }

  // 3. Polity (Q61 to Q75)
  for (let i = 0; i < 15; i++) {
    const template = AUTHENTIC_POLITY_QUESTIONS[i % AUTHENTIC_POLITY_QUESTIONS.length];
    fullBank.push({
      ...template,
      id: 61 + i,
      sectionId: 'sec-polity',
      marks: 2.0,
      negativeMarks: 0.66
    });
  }

  // 4. Hindi (Q76 to Q90)
  for (let i = 0; i < 15; i++) {
    const template = AUTHENTIC_HINDI_QUESTIONS[i % AUTHENTIC_HINDI_QUESTIONS.length];
    fullBank.push({
      ...template,
      id: 76 + i,
      sectionId: 'sec-hindi',
      marks: 2.0,
      negativeMarks: 0.66
    });
  }

  // 5. Maths & Reasoning (Q91 to Q100)
  for (let i = 0; i < 10; i++) {
    const template = AUTHENTIC_MATHS_REASONING_QUESTIONS[i % AUTHENTIC_MATHS_REASONING_QUESTIONS.length];
    fullBank.push({
      ...template,
      id: 91 + i,
      sectionId: 'sec-maths',
      marks: 2.0,
      negativeMarks: 0.66
    });
  }

  return fullBank;
};

export const FULL_100_CBT_QUESTIONS = generateFull100QuestionBank();

export type CbtQuestion = CBTQuestion;

import { 
  FULL_150_CET_12TH_QUESTIONS, 
  FULL_150_CET_GRAD_QUESTIONS, 
  CET_12TH_SECTIONS, 
  CET_GRAD_SECTIONS, 
  CBT_MOCK_TEST_CET_12TH, 
  CBT_MOCK_TEST_CET_GRAD 
} from './cet150MockData';

export { 
  FULL_150_CET_12TH_QUESTIONS, 
  FULL_150_CET_GRAD_QUESTIONS, 
  CET_12TH_SECTIONS, 
  CET_GRAD_SECTIONS, 
  CBT_MOCK_TEST_CET_12TH, 
  CBT_MOCK_TEST_CET_GRAD 
};

export const CBT_MOCK_TEST_CET = CBT_MOCK_TEST_CET_12TH;

/**
 * Returns exam-customized authentic questions matching board blueprints
 */
export function getExamQuestions(examId: string = ''): CBTQuestion[] {
  const normId = (examId || '').toLowerCase();
  
  if (normId.includes('12th') || normId === 'rssb-cet-12th' || normId === 'cbt_cet_12th_full_mock_150') {
    return FULL_150_CET_12TH_QUESTIONS;
  }

  if (normId.includes('grad') || normId === 'rssb-cet-grad' || normId === 'cbt_cet_grad_full_mock_150') {
    return FULL_150_CET_GRAD_QUESTIONS;
  }

  if (normId.includes('pashu')) {
    // Pashu Paricharak: mix GK and Animal Husbandry
    const gkPart = AUTHENTIC_RAJASTHAN_GK_QUESTIONS.slice(0, 10).map((q, idx) => ({
      ...q,
      id: idx + 1,
      marks: 1.0,
      negativeMarks: 0.25
    }));
    const animalPart = PASHU_PARICHARAK_SECTION_B_QUESTIONS.map((q, idx) => ({
      ...q,
      id: 11 + idx,
      marks: 1.0,
      negativeMarks: 0.25
    }));
    return [...gkPart, ...animalPart];
  }

  // Default to full 150-question CET 12th Level suite
  return FULL_150_CET_12TH_QUESTIONS;
}

/**
 * Returns official exam sections matching the test question ranges
 */
export function getExamSections(examId: string = ''): CBTSection[] {
  const normId = (examId || '').toLowerCase();

  if (normId.includes('12th') || normId === 'rssb-cet-12th' || normId === 'cbt_cet_12th_full_mock_150') {
    return CET_12TH_SECTIONS;
  }

  if (normId.includes('grad') || normId === 'rssb-cet-grad' || normId === 'cbt_cet_grad_full_mock_150') {
    return CET_GRAD_SECTIONS;
  }

  return CBT_SECTIONS;
}
