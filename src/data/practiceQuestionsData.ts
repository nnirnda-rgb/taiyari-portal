export interface PracticeQuestion {
  id: string;
  examIds: string[]; // e.g. ['cet', 'patwari', 'lab-assistant', 'all', 'pashu-parichar', 'police-constable', 'ras-pre']
  subjectId: string; // e.g. 'history', 'geography', 'science', 'polity', 'hindi', 'maths', 'animal'
  topic: string;
  questionHindi: string;
  questionEnglish: string;
  optionsHindi: [string, string, string, string, string]; // 5 Options (Mandatory Option E)
  optionsEnglish: [string, string, string, string, string];
  correctOptionIndex: number; // 0, 1, 2, 3
  explanationHindi: string;
  explanationEnglish: string;
  sourceExamRef?: string;
  difficulty: 'सरल' | 'मध्यम' | 'कठिन';
  importantFactHindi?: string;
}

export interface PracticeExam {
  id: string;
  nameHindi: string;
  nameEnglish: string;
  badge: string;
}

import { RAJASTHAN_EXAMS_DIRECTORY } from './rajasthanExams';

export interface PracticeSubject {
  id: string;
  nameHindi: string;
  nameEnglish: string;
  icon: string;
}

export const PRACTICE_EXAMS: PracticeExam[] = [
  { id: 'all', nameHindi: 'सभी परीक्षाएं (All Rajasthan Exams)', nameEnglish: 'All Rajasthan Exams', badge: 'सम्पूर्ण' },
  ...RAJASTHAN_EXAMS_DIRECTORY.map((exam) => ({
    id: exam.id,
    nameHindi: exam.name,
    nameEnglish: exam.nameEnglish,
    badge: exam.board
  }))
];

export const PRACTICE_SUBJECTS: PracticeSubject[] = [
  { id: 'all', nameHindi: 'सभी विषय (All Subjects)', nameEnglish: 'All Subjects', icon: 'BookOpen' },
  { id: 'history', nameHindi: 'राजस्थान का इतिहास एवं कला संस्कृति', nameEnglish: 'Rajasthan History & Culture', icon: 'Castle' },
  { id: 'geography', nameHindi: 'नवीन राजस्थान भूगोल (50 जिले)', nameEnglish: 'Rajasthan Geography (50 Districts)', icon: 'Mountain' },
  { id: 'science', nameHindi: 'दैनिक सामान्य विज्ञान (General Science)', nameEnglish: 'General Everyday Science', icon: 'FlaskConical' },
  { id: 'polity', nameHindi: 'राजस्थान राजव्यवस्था एवं प्रशासनिक ढांचा', nameEnglish: 'Rajasthan Polity & Governance', icon: 'Scale' },
  { id: 'hindi', nameHindi: 'सामान्य हिन्दी व्याकरण (General Hindi)', nameEnglish: 'General Hindi Grammar', icon: 'Languages' },
  { id: 'animal', nameHindi: 'पशुपालन विज्ञान (Pashu Paricharak Part B)', nameEnglish: 'Animal Husbandry (Part B)', icon: 'Sparkles' },
];

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // --- 1. RAJASTHAN HISTORY & CULTURE ---
  {
    id: 'pq-1',
    examIds: ['all', 'rssb-cet-grad', 'rssb-cet-12th', 'rssb-patwari', 'rpsc-ras', 'rpsc-2nd-grade'],
    subjectId: 'history',
    topic: 'प्राचीन सभ्यताएं',
    questionHindi: 'कालीबंगा सभ्यता के उत्खनन में जूते हुए खेत के साक्ष्य मिले हैं। यह पुरातात्विक स्थल वर्तमान में राजस्थान के किस जिले में स्थित है?',
    questionEnglish: 'Evidence of ploughed fields was found in the excavation of the Kalibangan civilization. In which district of present-day Rajasthan is this archaeological site located?',
    optionsHindi: [
      'श्रीगंगानगर',
      'हनुमानगढ़',
      'अनूपगढ़',
      'बीकानेर',
      'अनुत्तरित प्रश्न (Question Not Attempted)'
    ],
    optionsEnglish: [
      'Sri Ganganagar',
      'Hanumangarh',
      'Anupgarh',
      'Bikaner',
      'Question Not Attempted'
    ],
    correctOptionIndex: 1,
    explanationHindi: 'कालीबंगा राजस्थान के हनुमानगढ़ जिले में घग्घर (प्राचीन सरस्वती) नदी के तट पर स्थित है। इसकी खोज 1952 में अमलानंद घोष ने की थी तथा 1961-69 में बी.बी. लाल और बी.के. थापर ने उत्खनन कराया। यहाँ से जूते हुए खेत व भूकंप के प्राचीनतम साक्ष्य मिले हैं। (संदर्भ: RBSE कक्षा 10 इतिहास एवं संस्कृति)',
    explanationEnglish: 'Kalibangan is situated on the left bank of the Ghaggar river in Hanumangarh district. Discovered by Amlanand Ghosh in 1952, its excavation revealed ploughed agricultural fields and seismic evidence.',
    sourceExamRef: 'RSMSSB CET & Patwar Previous Master Papers',
    difficulty: 'सरल',
    importantFactHindi: 'कालीबंगा का शाब्दिक अर्थ \'काले रंग की चूड़ियां\' होता है।'
  },
  {
    id: 'pq-2',
    examIds: ['all', 'rssb-cet-grad', 'rssb-cet-12th', 'rssb-patwari', 'rpsc-ras'],
    subjectId: 'history',
    topic: 'दुर्ग एवं स्थापत्य',
    questionHindi: 'यूनेस्को (UNESCO) की विश्व धरोहर सूची में 2013 में शामिल राजस्थान के 6 पहाड़ी किलों में निम्नलिखित में से कौन सा दुर्ग शामिल नहीं है?',
    questionEnglish: 'Which of the following forts is NOT among the 6 hill forts of Rajasthan included in the UNESCO World Heritage list in 2013?',
    optionsHindi: [
      'कुंभलगढ़ दुर्ग (राजसमंद)',
      'गागरोन दुर्ग (झालावाड़)',
      'मेहरानगढ़ दुर्ग (जोधपुर)',
      'रणथंभौर दुर्ग (सवाई माधोपुर)',
      'अनुत्तरित प्रश्न (Question Not Attempted)'
    ],
    optionsEnglish: [
      'Kumbhalgarh Fort (Rajsamand)',
      'Gagron Fort (Jhalawar)',
      'Mehrangarh Fort (Jodhpur)',
      'Ranthambore Fort (Sawai Madhopur)',
      'Question Not Attempted'
    ],
    correctOptionIndex: 2,
    explanationHindi: 'जून 2013 में यूनेस्को ने राजस्थान के 6 पहाड़ी किलों को विश्व धरोहर का दर्जा दिया: चित्तौड़गढ़, कुंभलगढ़, रणथंभौर, गागरोन, आमेर और जैसलमेर (ट्रिक: चीकू गाजर आम)। मेहरानगढ़ दुर्ग इस 6-किलों की सूची में शामिल नहीं है। (संदर्भ: RBSE कक्षा 10 स्थापत्य)',
    explanationEnglish: 'In 2013, UNESCO inscribed Chittorgarh, Kumbhalgarh, Ranthambore, Gagron, Amer, and Jaisalmer. Mehrangarh Fort is not part of this 6-fort inscription.',
    sourceExamRef: 'RPSC RAS Pre & RSMSSB Patwar',
    difficulty: 'मध्यम',
    importantFactHindi: 'मेमोरी ट्रिक: "ची-कू गा-ज-र आम" (चित्तौड़गढ़, कुंभलगढ़, गागरोन, जैसलमेर, रणथंभौर, आमेर)।'
  },
  {
    id: 'pq-3',
    examIds: ['all', 'rssb-cet-12th', 'rssb-pashu-parichar', 'police-constable'],
    subjectId: 'history',
    topic: 'लोक देवता व संत',
    questionHindi: 'राजस्थान के किस लोक देवता को \'ऊंटों के देवता\' और \'प्लेग रक्षक देवता\' के रूप में पूजा जाता है?',
    questionEnglish: 'Which folk deity of Rajasthan is revered as the \'Deity of Camels\' and the \'Protector from Plague\'?',
    optionsHindi: [
      'गोगाजी चौहान',
      'पाबूजी राठौड़',
      'रामदेवजी तंवर',
      'तेजाजी महाराज',
      'अनुत्तरित प्रश्न (Question Not Attempted)'
    ],
    optionsEnglish: [
      'Gogaji Chauhan',
      'Pabuji Rathore',
      'Ramdevji Tanwar',
      'Tejaji Maharaj',
      'Question Not Attempted'
    ],
    correctOptionIndex: 1,
    explanationHindi: 'पाबूजी राठौड़ को मारवाड़ में सर्वप्रथम ऊंट लाने का श्रेय दिया जाता है। रेबारी जाति इन्हें अपना आराध्य मानती है। इनकी फड़ रावणहत्था वाद्ययंत्र से बांची जाती है। (संदर्भ: राजस्थान हिन्दी ग्रंथ अकादमी - लोक देवता)',
    explanationEnglish: 'Pabuji Rathore is worshipped as the protector of camels and livestock. The Rebari community honors him; his Phad is recited using the Ravanhatha instrument.',
    sourceExamRef: 'RSMSSB Pashu Parichar & CET',
    difficulty: 'सरल',
    importantFactHindi: 'पाबूजी का मुख्य पूजा स्थल कोलू (फलौदी) में स्थित है।'
  },
  {
    id: 'pq-4',
    examIds: ['all', 'rssb-cet-grad', 'rssb-patwari', 'rpsc-ras', 'rpsc-2nd-grade'],
    subjectId: 'history',
    topic: 'प्रजामंडल व एकीकरण',
    questionHindi: 'राजस्थान के एकीकरण के प्रथम चरण में \'मत्स्य संघ\' का गठन 18 मार्च 1948 को हुआ। मत्स्य संघ की राजधानी किसे बनाया गया था?',
    questionEnglish: 'In the first phase of the integration of Rajasthan, \'Matsya Sangh\' was formed on 18 March 1948. Which city was made the capital of Matsya Sangh?',
    optionsHindi: [
      'भरतपुर',
      'अलवर',
      'धौलपुर',
      'करौली',
      'अनुत्तरित प्रश्न (Question Not Attempted)'
    ],
    optionsEnglish: [
      'Bharatpur',
      'Alwar',
      'Dholpur',
      'Karauli',
      'Question Not Attempted'
    ],
    correctOptionIndex: 1,
    explanationHindi: 'मत्स्य संघ में अलवर, भरतपुर, धौलपुर, करौली तथा नीमराणा ठिकाना शामिल थे। इसकी राजधानी अलवर को बनाया गया तथा धौलपुर के उदयभान सिंह को राजप्रमुख बनाया गया। (संदर्भ: RBSE कक्षा 10 एकीकरण)',
    explanationEnglish: 'Matsya Sangh comprised Alwar, Bharatpur, Dholpur, Karauli and Neemrana. Alwar was designated as the capital, with Maharaja Udaybhan Singh of Dholpur as Rajpramukh.',
    sourceExamRef: 'RPSC 2nd Grade & RSMSSB LDC',
    difficulty: 'सरल',
    importantFactHindi: 'मत्स्य संघ का नामकरण कन्हैयालाल माणिक्यलाल (के.एम.) मुंशी के सुझाव पर किया गया था।'
  },

  // --- 2. REORGANIZED RAJASTHAN GEOGRAPHY (50 DISTRICTS) ---
  {
    id: 'pq-5',
    examIds: ['all', 'rssb-cet-grad', 'rssb-cet-12th', 'rssb-patwari', 'rpsc-ras'],
    subjectId: 'geography',
    topic: 'भौतिक प्रदेश एवं 50 जिले',
    questionHindi: 'पुनर्गठित 50 जिलों के अनुसार क्षेत्रफल की दृष्टि से वर्तमान में राजस्थान का सबसे छोटा जिला कौन सा है?',
    questionEnglish: 'According to the reorganized 50 districts, which is currently the smallest district of Rajasthan in terms of geographical area?',
    optionsHindi: [
      'धौलपुर',
      'दूदू (Dudu)',
      'दौसा',
      'कोटपूतली-बहरोड़',
      'अनुत्तरित प्रश्न (Question Not Attempted)'
    ],
    optionsEnglish: [
      'Dholpur',
      'Dudu',
      'Dausa',
      'Kotputli-Behror',
      'Question Not Attempted'
    ],
    correctOptionIndex: 1,
    explanationHindi: 'वर्ष 2023 के नवीन पुनर्गठन के अनुसार दूदू राजस्थान का सबसे छोटा जिला है जिसमें केवल 3 तहसीलें (दूदू, फागी, मौजमाबाद) हैं। इससे पूर्व धौलपुर (3034 वर्ग किमी) सबसे छोटा जिला था। (संदर्भ: राजस्थान राजस्व मंडल अधिसूचना 2023)',
    explanationEnglish: 'Following the 2023 administrative reorganization, Dudu is currently the smallest district comprising 3 tehsils, replacing Dholpur.',
    sourceExamRef: 'RSMSSB CET 2024 New Pattern',
    difficulty: 'मध्यम',
    importantFactHindi: 'दूदू सीधे ग्राम पंचायत से जिला बनने वाला भारत का पहला प्रशासनिक क्षेत्र है।'
  },
  {
    id: 'pq-6',
    examIds: ['all', 'rssb-cet-grad', 'rssb-patwari', 'rpsc-ras'],
    subjectId: 'geography',
    topic: 'अपवाह तंत्र एवं नदियां',
    questionHindi: 'राजस्थान की एकमात्र बारहमासी (नित्यवाही) नदी कौन सी है जो उत्खात भूमि (Badland Topography) के बीहड़ों के लिए कुख्यात है?',
    questionEnglish: 'Which is the only perennial river of Rajasthan notorious for badland topography and ravines (Beehad)?',
    optionsHindi: [
      'बनास नदी',
      'चंबल नदी',
      'माही नदी',
      'लूनी नदी',
      'अनुत्तरित प्रश्न (Question Not Attempted)'
    ],
    optionsEnglish: [
      'Banas River',
      'Chambal River',
      'Mahi River',
      'Luni River',
      'Question Not Attempted'
    ],
    correctOptionIndex: 1,
    explanationHindi: 'चंबल नदी (चर्मण्वती/कामधेनु) मध्य प्रदेश के जनापाव पहाड़ियों से निकलकर चौरासीगढ़ (चित्तौड़गढ़) से राजस्थान में प्रवेश करती है। यह कोटा, बूंदी, सवाई माधोपुर, करौली व धौलपुर में अवनालिका अपरदन द्वारा बीहड़ भूमि बनाती है। (संदर्भ: राजस्थान भूगोल - डॉ. हरिमोहन सक्सेना)',
    explanationEnglish: 'The Chambal River is Rajasthan\'s premier perennial river known for intense gully erosion forming characteristic ravines (Beehad).',
    sourceExamRef: 'RSMSSB Patwar & RPSC RAS',
    difficulty: 'सरल',
    importantFactHindi: 'चंबल नदी पर राजस्थान में राणा प्रताप सागर, जवाहर सागर व कोटा बैराज बांध स्थित हैं।'
  },

  // --- 3. GENERAL SCIENCE ---
  {
    id: 'pq-7',
    examIds: ['all', 'rssb-cet-grad', 'rssb-cet-12th', 'rssb-patwari', 'rpsc-ras'],
    subjectId: 'science',
    topic: 'दैनिक रसायन विज्ञान',
    questionHindi: 'प्लास्टर ऑफ पेरिस (POP) का सही रासायनिक सूत्र क्या है और यह किससे तैयार किया जाता है?',
    questionEnglish: 'What is the correct chemical formula of Plaster of Paris (POP) and from what is it prepared?',
    optionsHindi: [
      'CaSO4.1/2H2O (जिप्सम को 373 K पर गर्म करके)',
      'CaSO4.2H2O (चूना पत्थर से)',
      'CaCO3 (कैल्शियम कार्बोनेट से)',
      'CaOCl2 (ब्लीचिंग पाउडर से)',
      'अनुत्तरित प्रश्न (Question Not Attempted)'
    ],
    optionsEnglish: [
      'CaSO4.1/2H2O (By heating Gypsum at 373 K)',
      'CaSO4.2H2O (From Limestone)',
      'CaCO3 (From Calcium Carbonate)',
      'CaOCl2 (From Bleaching Powder)',
      'Question Not Attempted'
    ],
    correctOptionIndex: 0,
    explanationHindi: 'जिप्सम (CaSO4.2H2O) को 373 K पर गर्म करने पर यह जल के अणुओं का त्याग कर कैल्शियम सल्फेट हेमीहाइड्रेट (CaSO4.1/2H2O) बनाता है, जिसे प्लास्टर ऑफ पेरिस कहते हैं। (संदर्भ: NCERT/RBSE कक्षा 10 विज्ञान)',
    explanationEnglish: 'Heating gypsum (CaSO4.2H2O) at 373 K yields calcium sulfate hemihydrate (CaSO4.1/2H2O), commonly known as Plaster of Paris.',
    sourceExamRef: 'RSMSSB CET 12th & Graduation',
    difficulty: 'मध्यम',
    importantFactHindi: 'POP में पुनः जल मिलाने पर यह कठोर जिप्सम में परिवर्तित हो जाता है।'
  },
  {
    id: 'pq-8',
    examIds: ['all', 'rssb-cet-grad', 'rssb-cet-12th', 'rssb-patwari', 'police-constable'],
    subjectId: 'science',
    topic: 'मानव शरीर क्रिया विज्ञान',
    questionHindi: 'मानव शरीर में इंसुलिन (Insulin) हार्मोन का स्राव किस ग्रंथि की बीटा (β) कोशिकाओं द्वारा किया जाता है?',
    questionEnglish: 'In the human body, which gland\'s beta (β) cells secrete the hormone insulin?',
    optionsHindi: [
      'अग्न्याशय (Pancreas)',
      'थायरॉयड ग्रंथि (Thyroid)',
      'पीयूष ग्रंथि (Pituitary)',
      'अधिवृक्क ग्रंथि (Adrenal)',
      'अनुत्तरित प्रश्न (Question Not Attempted)'
    ],
    optionsEnglish: [
      'Pancreas (Islets of Langerhans)',
      'Thyroid Gland',
      'Pituitary Gland',
      'Adrenal Gland',
      'Question Not Attempted'
    ],
    correctOptionIndex: 0,
    explanationHindi: 'अग्न्याशय एक मिश्रित अंतःस्रावी व बहिःस्रावी ग्रंथि है। इसके लैंगरहेंस द्वीप समूह की बीटा (β) कोशिकाएं इंसुलिन का स्राव करती हैं, जो रक्त में ग्लूकोज का स्तर नियंत्रित करता है। (संदर्भ: NCERT कक्षा 10 नियंत्रण एवं समन्वय)',
    explanationEnglish: 'The beta cells in the Islets of Langerhans of the pancreas secrete insulin, regulating blood sugar levels.',
    sourceExamRef: 'RSMSSB Lab Assistant & Patwar',
    difficulty: 'सरल',
    importantFactHindi: 'इंसुलिन की कमी से मधुमेह (Diabetes Mellitus) रोग हो जाता है।'
  },

  // --- 4. RAJASTHAN POLITY & GOVERNANCE ---
  {
    id: 'pq-9',
    examIds: ['all', 'rssb-cet-grad', 'rssb-patwari', 'rpsc-ras', 'rpsc-2nd-grade'],
    subjectId: 'polity',
    topic: 'राज्य प्रशासन एवं आयोग',
    questionHindi: 'राजस्थान में लोकायुक्त एवं उप-लोकायुक्त अधिनियम किस वर्ष पारित हुआ तथा राज्य के प्रथम लोकायुक्त कौन बने?',
    questionEnglish: 'In which year was the Rajasthan Lokayukta and Up-Lokayuktas Act passed and who was appointed the first Lokayukta of the state?',
    optionsHindi: [
      '1973 - न्यायमूर्ति आई.डी. दुआ',
      '1971 - न्यायमूर्ति एम.एल. जोशी',
      '1975 - न्यायमूर्ति कांता भटनागर',
      '1980 - न्यायमूर्ति जे.एस. वर्मा',
      'अनुत्तरित प्रश्न (Question Not Attempted)'
    ],
    optionsEnglish: [
      '1973 - Justice I.D. Dua',
      '1971 - Justice M.L. Joshi',
      '1975 - Justice Kanta Bhatnagar',
      '1980 - Justice J.S. Verma',
      'Question Not Attempted'
    ],
    correctOptionIndex: 0,
    explanationHindi: 'राजस्थान लोकायुक्त अधिनियम 1973 में लागू हुआ। राज्य के प्रथम लोकायुक्त न्यायमूर्ति आई.डी. दुआ (ID Dua) बने। मुख्यमंत्री, उच्च न्यायालय के न्यायाधीश तथा RPSC अध्यक्ष लोकायुक्त के क्षेत्राधिकार से बाहर हैं। (संदर्भ: डॉ. जनक सिंह मीणा - राजस्थान राजव्यवस्था)',
    explanationEnglish: 'The Rajasthan Lokayukta Act was passed in 1973. Justice I.D. Dua was appointed the first Lokayukta of Rajasthan.',
    sourceExamRef: 'RPSC RAS Prelims & 2nd Grade',
    difficulty: 'कठिन',
    importantFactHindi: 'लोकायुक्त का कार्यकाल 5 वर्ष अथवा 65 वर्ष की आयु (जो भी पहले हो) होता है।'
  },

  // --- 5. GENERAL HINDI ---
  {
    id: 'pq-10',
    examIds: ['all', 'rssb-cet-grad', 'rssb-cet-12th', 'rssb-patwari', 'rpsc-ras'],
    subjectId: 'hindi',
    topic: 'शब्द शुद्धि एवं वर्तनी',
    questionHindi: 'निम्नलिखित में से किस विकल्प के सभी शब्द वर्तनी की दृष्टि से पूर्णतः शुद्ध हैं?',
    questionEnglish: 'In which of the following options are all words completely correct in terms of Hindi spelling (Vartani)?',
    optionsHindi: [
      'उज्ज्वल, कवयित्री, मिष्ठान्न, आशीर्वाद',
      'उज्वल, कवियत्री, मिष्ठान, आशिर्वाद',
      'उज्जवल, कवयित्री, मिष्ठान, आशीर्वाद',
      'उज्ज्वल, कवियत्री, मिष्ठान्न, आशिरवाद',
      'अनुत्तरित प्रश्न (Question Not Attempted)'
    ],
    optionsEnglish: [
      'Ujjwal, Kawayitri, Mishthanna, Aashirwad (All Correct)',
      'Incorrect spelling forms',
      'Partially incorrect forms',
      'Disordered spelling variants',
      'Question Not Attempted'
    ],
    correctOptionIndex: 0,
    explanationHindi: 'उद् + ज्वल = उज्ज्वल (दोनों \'ज\' आधे होते हैं)। कवि का स्त्रीलिंग कवयित्री होता है। मिष्ट + अन्न = मिष्ठान्न शुद्ध रूप है। आशिः + वाद = आशीर्वाद। (संदर्भ: डॉ. राघव प्रकाश - सामान्य हिन्दी)',
    explanationEnglish: 'All words in option A are standard grammatically correct spellings in Hindi.',
    sourceExamRef: 'RPSC SI & RSMSSB Patwar Previous Exams',
    difficulty: 'मध्यम',
    importantFactHindi: '\'कवयित्री\' और \'उज्ज्वल\' राजस्थान भर्ती परीक्षाओं में सर्वाधिक बार पूछे जाने वाले शुद्ध शब्द हैं।'
  },

  // --- 6. PASHU PARICHARAK (ANIMAL HUSBANDRY - PART B) ---
  {
    id: 'pq-11',
    examIds: ['all', 'rssb-pashu-parichar'],
    subjectId: 'animal',
    topic: 'पशु नस्लें एवं दुग्ध विज्ञान',
    questionHindi: 'भैंस की किस नस्ल के दूध में सर्वाधिक वसा (Fat percentage लगभग 12-14%) पाई जाती है और इसका तांबे जैसा रंग होता है?',
    questionEnglish: 'Which buffalo breed has the highest fat percentage (approx 12-14%) in its milk with a characteristic copper body color?',
    optionsHindi: [
      'भदावरी (Bhadawari)',
      'मुर्राह (Murrah)',
      'जाफराबादी (Jafrabadi)',
      'मेहसाणा (Mehsana)',
      'अनुत्तरित प्रश्न (Question Not Attempted)'
    ],
    optionsEnglish: [
      'Bhadawari',
      'Murrah',
      'Jafrabadi',
      'Mehsana',
      'Question Not Attempted'
    ],
    correctOptionIndex: 0,
    explanationHindi: 'भदावरी भैंस का शरीर तांबे जैसे रंग (कॉपर कलर) का होता है तथा इसके दूध में 12% से 14% तक वसा होती है जो सभी भैंसों में सर्वाधिक है। मुर्राह भैंस जलेबी जैसे मुड़े सींगों और सर्वाधिक दुग्ध उत्पादन के लिए जानी जाती है। (संदर्भ: पशुपालन विभाग राजस्थान)',
    explanationEnglish: 'Bhadawari buffalo milk has the highest butterfat content (12-14%) and possesses a characteristic copper skin tone.',
    sourceExamRef: 'RSMSSB Pashu Parichar 2024 Syllabus',
    difficulty: 'मध्यम',
    importantFactHindi: 'मुर्राह भैंस को हरियाणा एवं राजस्थान में \'खुंडी\' या \'ब्लैक ब्यूटी\' भी कहा जाता है।'
  },
  {
    id: 'pq-12',
    examIds: ['all', 'rssb-pashu-parichar'],
    subjectId: 'animal',
    topic: 'पशु पोषण एवं रोग',
    questionHindi: 'गाय व भैंस में प्रसव के तुरंत बाद होने वाला \'मिल्क फीवर\' (दुग्ध ज्वर) रोग शरीर में किस तत्व की कमी से होता है?',
    questionEnglish: 'Milk Fever occurring in cows and buffaloes immediately post-calving is caused by acute deficiency of which element?',
    optionsHindi: [
      'कैल्शियम (Calcium)',
      'फास्फोरस (Phosphorus)',
      'आयरन (Iron)',
      'सोडियम (Sodium)',
      'अनुत्तरित प्रश्न (Question Not Attempted)'
    ],
    optionsEnglish: [
      'Calcium (Acute Hypocalcemia)',
      'Phosphorus',
      'Iron',
      'Sodium',
      'Question Not Attempted'
    ],
    correctOptionIndex: 0,
    explanationHindi: 'मिल्क फीवर (दुग्ध ज्वर) रक्त में कैल्शियम के स्तर के अचानक गिर जाने (Hypocalcemia) से होता है। यह चयापचयी (Metabolic) रोग है जिसमें पशु का तापमान सामान्य से कम हो जाता है। (संदर्भ: पशु चिकित्सा संदर्शिका)',
    explanationEnglish: 'Milk Fever is an acute hypocalcemic metabolic disease resulting from a rapid drop in blood calcium levels post-parturition.',
    sourceExamRef: 'RSMSSB Pashu Parichar Part B',
    difficulty: 'मध्यम',
    importantFactHindi: 'इसके उपचार हेतु पशु को कैल्शियम बोरो-ग्लुकोनेट का इंट्रावेनस (IV) इंजेक्शन दिया जाता है।'
  }
];
