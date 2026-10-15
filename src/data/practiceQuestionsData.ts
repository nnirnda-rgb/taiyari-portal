export interface PracticeQuestion {
  id: string;
  examIds: string[]; // e.g. ['cet', 'patwari', 'lab-assistant', 'all']
  subjectId: string; // e.g. 'history', 'geography', 'science', 'polity', 'hindi'
  topic: string;
  questionHindi: string;
  questionEnglish: string;
  optionsHindi: string[];
  optionsEnglish: string[];
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
  { id: 'all', nameHindi: 'सभी परीक्षाएं (All 45+ Exams)', nameEnglish: 'All Rajasthan Exams', badge: 'सम्पूर्ण' },
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
];

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // --- RAJASTHAN HISTORY & CULTURE ---
  {
    id: 'pq-1',
    examIds: ['all', 'cet', 'patwari', 'ras-pre'],
    subjectId: 'history',
    topic: 'प्राचीन सभ्यताएं',
    questionHindi: 'कालीबंगा सभ्यता के उत्खनन में जूते हुए खेत के साक्ष्य मिले हैं। यह पुरातात्विक स्थल वर्तमान में राजस्थान के किस जिले में स्थित है?',
    questionEnglish: 'Evidence of ploughed fields was found in the excavation of the Kalibangan civilization. In which district of present-day Rajasthan is this archaeological site located?',
    optionsHindi: [
      'श्रीगंगानगर',
      'हनुमानगढ़',
      'अनूपगढ़',
      'बीकानेर'
    ],
    optionsEnglish: [
      'Sri Ganganagar',
      'Hanumangarh',
      'Anupgarh',
      'Bikaner'
    ],
    correctOptionIndex: 1,
    explanationHindi: 'कालीबंगा राजस्थान के हनुमानगढ़ जिले में घग्घर (प्राचीन सरस्वती) नदी के बाएं तट पर स्थित है। इसकी खोज 1952 में अमलानंद घोष ने की थी तथा 1961-69 में बी.बी. लाल और बी.के. थापर ने उत्खनन कराया। यहाँ से विश्व में जूते हुए खेत के प्राचीनतम साक्ष्य, भूकंप के साक्ष्य और सात अग्नि वेदिकाएं मिली हैं।',
    explanationEnglish: 'Kalibangan is situated on the left bank of the Ghaggar (ancient Saraswati) river in the Hanumangarh district of Rajasthan. Discovered by Amlanand Ghosh in 1952, its excavation was carried out by B.B. Lal and B.K. Thapar (1961-69). It provided the world\'s earliest evidence of ploughed agricultural fields, seismic shocks (earthquake), and seven fire altars.',
    sourceExamRef: 'RSMSSB CET & Patwar Previous Year',
    difficulty: 'सरल',
    importantFactHindi: 'कालीबंगा का शाब्दिक अर्थ \'काले रंग की चूड़ियां\' होता है।'
  },
  {
    id: 'pq-2',
    examIds: ['all', 'cet', 'patwari', 'ras-pre'],
    subjectId: 'history',
    topic: 'दुर्ग एवं स्थापत्य',
    questionHindi: 'यूनेस्को (UNESCO) की विश्व धरोहर सूची में 2013 में शामिल राजस्थान के 6 पहाड़ी किलों में निम्नलिखित में से कौन सा दुर्ग शामिल नहीं है?',
    questionEnglish: 'Which of the following forts is NOT among the 6 hill forts of Rajasthan included in the UNESCO World Heritage list in 2013?',
    optionsHindi: [
      'कुंभलगढ़ दुर्ग (राजसमंद)',
      'गागरोन दुर्ग (झालावाड़)',
      'मेहरानगढ़ दुर्ग (जोधपुर)',
      'रणथंभौर दुर्ग (सवाई माधोपुर)'
    ],
    optionsEnglish: [
      'Kumbhalgarh Fort (Rajsamand)',
      'Gagron Fort (Jhalawar)',
      'Mehrangarh Fort (Jodhpur)',
      'Ranthambore Fort (Sawai Madhopur)'
    ],
    correctOptionIndex: 2,
    explanationHindi: 'जून 2013 में कंबोडिया के नोम पेन्ह में यूनेस्को की बैठक में राजस्थान के 6 पहाड़ी किलों को विश्व धरोहर का दर्जा दिया गया था: (1) चित्तौड़गढ़, (2) कुंभलगढ़, (3) रणथंभौर, (4) गागरोन, (5) आमेर, और (6) जैसलमेर (सोनारगढ़)। याद रखने की ट्रिक: "चीकू गाजर आम"। मेहरानगढ़ दुर्ग (जोधपुर) इस सूची में शामिल नहीं है।',
    explanationEnglish: 'In June 2013, UNESCO inscribed 6 hill forts of Rajasthan: Chittorgarh, Kumbhalgarh, Ranthambore, Gagron, Amer, and Jaisalmer. Mehrangarh Fort (Jodhpur) is famous and magnificent, but is NOT part of this specific UNESCO 6-fort inscription.',
    sourceExamRef: 'RPSC RAS Pre & RSMSSB Patwar',
    difficulty: 'मध्यम',
    importantFactHindi: 'मेमोरी ट्रिक: "ची-कू गा-ज-र आम" (चित्तौड़गढ़, कुंभलगढ़, गागरोन, जैसलमेर, रणथंभौर, आमेर)।'
  },
  {
    id: 'pq-3',
    examIds: ['all', 'cet', 'patwari', 'pashu-parichar'],
    subjectId: 'history',
    topic: 'लोक देवता व संत',
    questionHindi: 'राजस्थान के किस लोक देवता को \'ऊंटों के देवता\' और \'प्लेग रक्षक देवता\' के रूप में पूजा जाता है?',
    questionEnglish: 'Which folk deity of Rajasthan is revered as the \'Deity of Camels\' and the \'Protector from Plague\'?',
    optionsHindi: [
      'गोगाजी चौहान',
      'पाबूजी राठौड़',
      'रामदेवजी तंवर',
      'तेजाजी महाराज'
    ],
    optionsEnglish: [
      'Gogaji Chauhan',
      'Pabuji Rathore',
      'Ramdevji Tanwar',
      'Tejaji Maharaj'
    ],
    correctOptionIndex: 1,
    explanationHindi: 'पाबूजी राठौड़ को मारवाड़ में सर्वप्रथम ऊंट (सांड) लाने का श्रेय दिया जाता है। ऊंट बीमार होने पर रेबारी (राईका) जाति द्वारा पाबूजी की फड़ का वाचन रावणहत्था वाद्ययंत्र के साथ किया जाता है। पाबूजी को लक्ष्मण जी का अवतार, प्लेग रक्षक देवता एवं हाड़-फाड़ के देवता के रूप में भी पूजा जाता है।',
    explanationEnglish: 'Pabuji Rathore is credited with bringing camels to the Marwar region for the first time. The Rebari/Raika community worships him; when camels fall ill, Pabuji\'s Phad is recited using the Ravanhatha musical instrument. He is regarded as an incarnation of Lakshmana.',
    sourceExamRef: 'RSMSSB Pashu Parichar & CET',
    difficulty: 'सरल',
    importantFactHindi: 'पाबूजी का मुख्य पूजा स्थल कोलू (फलौदी) में स्थित है।'
  },
  {
    id: 'pq-4',
    examIds: ['all', 'cet', 'patwari', 'ras-pre'],
    subjectId: 'history',
    topic: 'प्रजामंडल व एकीकरण',
    questionHindi: 'राजस्थान के एकीकरण के प्रथम चरण में \'मत्स्य संघ\' का गठन 18 मार्च 1948 को हुआ। मत्स्य संघ की राजधानी किसे बनाया गया था?',
    questionEnglish: 'In the first phase of the integration of Rajasthan, \'Matsya Sangh\' was formed on 18 March 1948. Which city was made the capital of Matsya Sangh?',
    optionsHindi: [
      'भरतपुर',
      'अलवर',
      'धौलपुर',
      'करौली'
    ],
    optionsEnglish: [
      'Bharatpur',
      'Alwar',
      'Dholpur',
      'Karauli'
    ],
    correctOptionIndex: 1,
    explanationHindi: 'मत्स्य संघ में चार रियासतें (अलवर, भरतपुर, धौलपुर, करौली) तथा नीमराणा ठिकाना शामिल थे। के.एम. मुंशी के सुझाव पर इसका नाम \'मत्स्य संघ\' रखा गया। इसकी राजधानी अलवर बनाई गई, धौलपुर के उदयभान सिंह को राजप्रमुख, करौली के गणेशपाल को उपराजप्रमुख तथा शोभाराम कुमावत (अलवर) को प्रधानमंत्री बनाया गया था।',
    explanationEnglish: 'The Matsya Sangh was formed with Alwar, Bharatpur, Dholpur, Karauli, and the Neemrana estate. On K.M. Munshi\'s suggestion, it was named Matsya Sangh. Alwar was designated as its capital, with Shobha Ram Kumawat serving as Prime Minister.',
    sourceExamRef: 'RSMSSB Patwar & CET 2024',
    difficulty: 'मध्यम',
    importantFactHindi: 'मत्स्य संघ का उद्घाटन एन.वी. गाडगिल (केंद्रीय मंत्री) ने भरतपुर दुर्ग में किया था।'
  },

  // --- RAJASTHAN GEOGRAPHY (50 DISTRICTS) ---
  {
    id: 'pq-5',
    examIds: ['all', 'cet', 'patwari', 'lab-assistant', 'ras-pre'],
    subjectId: 'geography',
    topic: 'नवीन प्रशासनिक स्वरूप (50 जिले)',
    questionHindi: 'पुनर्गठित राजस्थान के अनुसार क्षेत्रफल की दृष्टि से राज्य का सबसे छोटा जिला वर्तमान में कौन सा है?',
    questionEnglish: 'According to the reorganized administrative districts of Rajasthan, which is currently the smallest district by area?',
    optionsHindi: [
      'धौलपुर',
      'दूदू',
      'दौसा',
      'कोटपूतली-बहरोड़'
    ],
    optionsEnglish: [
      'Dholpur',
      'Dudu',
      'Dausa',
      'Kotputli-Behror'
    ],
    correctOptionIndex: 1,
    explanationHindi: 'अगस्त 2023 में नए जिलों के गठन के पश्चात \'दूदू\' जिला क्षेत्रफल और ग्राम पंचायतों की संख्या की दृष्टि से राजस्थान का सबसे छोटा जिला बन गया है। पहले धौलपुर (3034 वर्ग किमी) सबसे छोटा जिला हुआ करता था। दूदू सीधे ग्राम पंचायत से जिला बनने वाला राजस्थान का पहला विशिष्ट जिला है।',
    explanationEnglish: 'Following the August 2023 reorganization of districts in Rajasthan, \'Dudu\' became the smallest district in Rajasthan both in area and population/panchayats, superseding Dholpur which was previously the smallest. Dudu is notable for being directly upgraded from a gram panchayat to a district.',
    sourceExamRef: 'RSMSSB CET 2024 (नवीन भूगोल)',
    difficulty: 'सरल',
    importantFactHindi: 'दूदू में केवल 3 उपखंड और 3 तहसीलें (दूदू, फागी, मौजमाबाद) सम्मिलित हैं।'
  },
  {
    id: 'pq-6',
    examIds: ['all', 'cet', 'patwari', 'lab-assistant'],
    subjectId: 'geography',
    topic: 'अपवाह तंत्र व नदियां',
    questionHindi: 'राजस्थान की कौन सी नदी \'कामधेनु\' एवं \'चर्मण्वती\' के उपनाम से प्रसिद्ध है तथा राज्य में सर्वाधिक सतही जल रखती है?',
    questionEnglish: 'Which river of Rajasthan is known by the epithets \'Kamdhenu\' and \'Charmanyavati\', holding the highest surface water in the state?',
    optionsHindi: [
      'बनास नदी',
      'चंबल नदी',
      'माही नदी',
      'लूनी नदी'
    ],
    optionsEnglish: [
      'Banas River',
      'Chambal River',
      'Mahi River',
      'Luni River'
    ],
    correctOptionIndex: 1,
    explanationHindi: 'चंबल नदी मध्य प्रदेश में जानापाव की पहाड़ियों (महू) से निकलती है और चौरासीगढ़ (चित्तौड़गढ़) के निकट राजस्थान में प्रवेश करती है। यह राजस्थान की एकमात्र नित्यवाही (वर्षपर्यंत बहने वाली) नदी है। इसे राजस्थान की कामधेनु व चर्मण्वती कहते हैं। इस पर गांधी सागर, राणा प्रताप सागर, जवाहर सागर व कोटा बैराज बांध निर्मित हैं।',
    explanationEnglish: 'The Chambal River originates from the Janapao Hills near Mhow in Madhya Pradesh and enters Rajasthan near Chaurasigarh (Chittorgarh). It is Rajasthan\'s perennial river, known as Kamdhenu/Charmanyavati. Four major dams (Gandhi Sagar, Rana Pratap Sagar, Jawahar Sagar, and Kota Barrage) harness its waters.',
    sourceExamRef: 'RSMSSB Lab Assistant & Patwar',
    difficulty: 'सरल',
    importantFactHindi: 'चंबल नदी भारत में सर्वाधिक अवनालिका अपरदन (Gully Erosion) तथा बीहड़ (Badlands) भूमि का निर्माण करती है।'
  },
  {
    id: 'pq-7',
    examIds: ['all', 'cet', 'patwari', 'lab-assistant', 'ras-pre'],
    subjectId: 'geography',
    topic: 'भौतिक प्रदेश व चोटियां',
    questionHindi: 'अरावली पर्वतमाला की चोटियों को उनकी ऊंचाई के घटते क्रम (अवरोही क्रम) में व्यवस्थित करने पर सही क्रम क्या होगा?',
    questionEnglish: 'What will be the correct descending order of the peaks of the Aravalli mountain range according to their elevation?',
    optionsHindi: [
      'गुरुशिखर, सेर, दिलवाड़ा, जरगा, अचलगढ़',
      'गुरुशिखर, जरगा, सेर, अचलगढ़, दिलवाड़ा',
      'सेर, गुरुशिखर, दिलवाड़ा, अचलगढ़, कुंभलगढ़',
      'गुरुशिखर, दिलवाड़ा, सेर, जरगा, तारागढ़'
    ],
    optionsEnglish: [
      'Guru Shikhar, Ser, Dilwara, Jarga, Achalgarh',
      'Guru Shikhar, Jarga, Ser, Achalgarh, Dilwara',
      'Ser, Guru Shikhar, Dilwara, Achalgarh, Kumbhalgarh',
      'Guru Shikhar, Dilwara, Ser, Jarga, Taragarh'
    ],
    correctOptionIndex: 0,
    explanationHindi: 'अरावली की प्रमुख चोटियों की ऊंचाई: \n1. गुरुशिखर (माउंट आबू, सिरोही) - 1722 मीटर\n2. सेर (सिरोही) - 1597 मीटर\n3. दिलवाड़ा (सिरोही) - 1442 मीटर\n4. जरगा (उदयपुर) - 1431 मीटर\n5. अचलगढ़ (सिरोही) - 1380 मीटर।\nयाद रखने की लोकप्रिय ट्रिक: "गुरु से दिल जरा आ" (गुरुशिखर, सेर, दिलवाड़ा, जरगा, अचलगढ़)।',
    explanationEnglish: 'Heights of major Aravalli peaks in descending order:\n1. Guru Shikhar (1722 m, Sirohi)\n2. Ser (1597 m, Sirohi)\n3. Dilwara (1442 m, Sirohi)\n4. Jarga (1431 m, Udaipur)\n5. Achalgarh (1380 m, Sirohi).',
    sourceExamRef: 'RPSC RAS Pre & RSMSSB Lab Assistant',
    difficulty: 'मध्यम',
    importantFactHindi: 'कर्नल जेम्स टॉड ने गुरुशिखर को \'संतों का शिखर\' कहा था।'
  },

  // --- GENERAL SCIENCE (LAB ASSISTANT & CET & PATWARI SPECIAL) ---
  {
    id: 'pq-8',
    examIds: ['all', 'lab-assistant', 'cet', 'patwari'],
    subjectId: 'science',
    topic: 'मानव शरीर क्रिया विज्ञान',
    questionHindi: 'मानव नेत्र में किसी वस्तु का वास्तविक एवं उल्टा प्रतिबिंब किस भाग पर बनता है?',
    questionEnglish: 'On which part of the human eye is a real and inverted image of an object formed?',
    optionsHindi: [
      'कॉर्निया (स्वच्छ मंडल)',
      'पुतली (Pupil)',
      'रेटिना (दृष्टिपटल)',
      'परितारिका (Iris)'
    ],
    optionsEnglish: [
      'Cornea',
      'Pupil',
      'Retina',
      'Iris'
    ],
    correctOptionIndex: 2,
    explanationHindi: 'मानव नेत्र में प्रकाश कॉर्निया से होकर प्रवेश करता है तथा उत्तल लेंस द्वारा अपवर्तित होकर रेटिना (दृष्टिपटल) पर केंद्रित होता है। रेटिना पर वस्तु का प्रतिबिंब वास्तविक और उल्टा बनता है। रेटिना में स्थित शलाका (Rods) प्रकाश तीव्रता तथा शंकु (Cones) रंगों की पहचान के लिए उत्तरदायी होते हैं। दृक तंत्रिका द्वारा यह संकेत मस्तिष्क तक पहुंचते हैं जहाँ सीधा अनुभव होता है।',
    explanationEnglish: 'In the human eye, incoming light rays are refracted by the crystalline convex lens and focused on the Retina, creating a real and inverted image. Rod and cone photoreceptor cells convert light into electrical nerve impulses transmitted via the optic nerve to the brain.',
    sourceExamRef: 'RSMSSB Lab Assistant & CET Science',
    difficulty: 'सरल',
    importantFactHindi: 'नेत्रदान में दाता की आंख का केवल \'कॉर्निया\' (Cornea) प्रत्यारोपित किया जाता है।'
  },
  {
    id: 'pq-9',
    examIds: ['all', 'lab-assistant', 'cet', 'patwari'],
    subjectId: 'science',
    topic: 'भौतिक विज्ञान (प्रकाशिकी व गति)',
    questionHindi: 'वाहनों के साइड मिरर (रियर व्यू मिरर) के रूप में किस प्रकार के दर्पण का उपयोग किया जाता है और क्यों?',
    questionEnglish: 'Which type of mirror is used as a rear-view (side) mirror in automobiles and why?',
    optionsHindi: [
      'अवतल दर्पण, क्योंकि यह बड़ा प्रतिबिंब बनाता है',
      'उत्तल दर्पण, क्योंकि यह सदैव सीधा व छोटा प्रतिबिंब तथा विस्तृत दृष्टि क्षेत्र देता है',
      'समतल दर्पण, क्योंकि यह समान आकार का प्रतिबिंब बनाता है',
      'परवलयिक दर्पण, क्योंकि यह प्रकाश को केंद्रित करता है'
    ],
    optionsEnglish: [
      'Concave mirror, because it forms an enlarged image',
      'Convex mirror, because it always gives an erect, diminished image and a wide field of view',
      'Plane mirror, because it makes a normal size image',
      'Parabolic mirror, because it focuses light rays'
    ],
    correctOptionIndex: 1,
    explanationHindi: 'वाहनों में साइड रियर-व्यू मिरर के रूप में उत्तल दर्पण (Convex Mirror) का उपयोग होता है क्योंकि: (1) यह वस्तु का हमेशा सीधा (आभासी) प्रतिबिंब बनाता है, (2) प्रतिबिंब छोटा होने के कारण चालक को पीछे का बहुत बड़ा क्षेत्र (Wide field of view) दिखाई देता है। अवतल दर्पण का उपयोग दंत चिकित्सक व हेडलाइट परावर्तक में होता है।',
    explanationEnglish: 'Convex mirrors are preferred as rear-view mirrors in vehicles because they always produce an upright, virtual, and diminished image, offering a much wider field of view than plane or concave mirrors.',
    sourceExamRef: 'RSMSSB Lab Assistant & CET',
    difficulty: 'सरल',
    importantFactHindi: 'उत्तल दर्पण में फोकस बिंदु दर्पण के पीछे काल्पनिक होता है।'
  },
  {
    id: 'pq-10',
    examIds: ['all', 'lab-assistant', 'cet'],
    subjectId: 'science',
    topic: 'रसायन विज्ञान (दैनिक जीवन में रसायन)',
    questionHindi: 'बेकिंग सोडा (खाने का सोडा) का रासायनिक नाम और सूत्र क्या है?',
    questionEnglish: 'What is the chemical name and formula of Baking Soda?',
    optionsHindi: [
      'सोडियम कार्बोनेट (Na2CO3.10H2O)',
      'सोडियम हाइड्रोजन कार्बोनेट (NaHCO3)',
      'सोडियम हाइड्रोक्साइड (NaOH)',
      'कैल्शियम ऑक्सीक्लोराइड (CaOCl2)'
    ],
    optionsEnglish: [
      'Sodium Carbonate (Na2CO3.10H2O)',
      'Sodium Hydrogen Carbonate (NaHCO3)',
      'Sodium Hydroxide (NaOH)',
      'Calcium Oxychloride (CaOCl2)'
    ],
    correctOptionIndex: 1,
    explanationHindi: 'बेकिंग सोडा का रासायनिक नाम सोडियम बाइकार्बोनेट अथवा सोडियम हाइड्रोजन कार्बोनेट (NaHCO3) है। इसका उपयोग खाद्य पदार्थों को स्पंजी बनाने, एंटासिड (पेट की अम्लता कम करने) तथा अग्निशामक यंत्रों में किया जाता है। विकल्प A धोने का सोडा (Washing Soda) है तथा विकल्प D विरंजक चूर्ण (Bleaching Powder) है।',
    explanationEnglish: 'Baking soda is chemically Sodium Hydrogen Carbonate or Sodium Bicarbonate (NaHCO3). It decomposes on heating to release carbon dioxide gas, making cakes and dough porous and fluffy. Na2CO3.10H2O is Washing Soda, while CaOCl2 is Bleaching Powder.',
    sourceExamRef: 'RSMSSB Lab Assistant Chemistry & CET',
    difficulty: 'मध्यम',
    importantFactHindi: 'टार्टरिक अम्ल के साथ बेकिंग सोडा मिलाने पर \'बेकिंग पाउडर\' बनता है।'
  },

  // --- RAJASTHAN POLITY & GOVERNANCE ---
  {
    id: 'pq-11',
    examIds: ['all', 'cet', 'patwari', 'ras-pre'],
    subjectId: 'polity',
    topic: 'राज्यपाल एवं विधानसभा',
    questionHindi: 'संविधान के किस अनुच्छेद के तहत राज्यपाल राज्य विधानसभा में अभिभाषण करता है और संदेश भेज सकता है?',
    questionEnglish: 'Under which Article of the Constitution does the Governor address and send messages to the State Legislative Assembly?',
    optionsHindi: [
      'अनुच्छेद 163',
      'अनुच्छेद 174',
      'अनुच्छेद 175',
      'अनुच्छेद 213'
    ],
    optionsEnglish: [
      'Article 163',
      'Article 174',
      'Article 175',
      'Article 213'
    ],
    correctOptionIndex: 2,
    explanationHindi: 'भारतीय संविधान के अनुच्छेद 175 के तहत राज्यपाल को राज्य विधानमंडल के किसी सदन में या दोनों सदनों के संयुक्त सत्र में अभिभाषण करने तथा विचाराधीन विधेयकों के संबंध में संदेश भेजने का अधिकार है। अनुच्छेद 174 में सत्राहूत, सत्रावसान व विघटन का प्रावधान है, अनुच्छेद 163 में मंत्रिपरिषद की सलाह तथा अनुच्छेद 213 में राज्यपाल की अध्यादेश जारी करने की शक्ति है।',
    explanationEnglish: 'Article 175 grants the Governor the right to address either House of the Legislature of the State, or both Houses assembled together, and to send messages. Article 174 deals with sessions, prorogation, and dissolution, while Article 213 empowers the Governor to promulgate ordinances.',
    sourceExamRef: 'RPSC RAS Pre & RSMSSB CET Graduate',
    difficulty: 'कठिन',
    importantFactHindi: 'अनुच्छेद 176 में प्रत्येक वर्ष के प्रथम सत्र और नई विधानसभा के गठन पर राज्यपाल के विशेष अभिभाषण का प्रावधान है।'
  },

  // --- GENERAL HINDI ---
  {
    id: 'pq-12',
    examIds: ['all', 'cet', 'patwari', 'ras-pre'],
    subjectId: 'hindi',
    topic: 'संधि एवं समास',
    questionHindi: 'निम्नलिखित में से किस शब्द में \'द्विगु समास\' है?',
    questionEnglish: 'Which of the following words exhibits the \'Dvigu Samas\' (numeral determinative compound)?',
    optionsHindi: [
      'पीताम्बर',
      'त्रिलोकी (त्रिलोक)',
      'यथाशक्ति',
      'नीलकमल'
    ],
    optionsEnglish: [
      'Pitambar',
      'Triloki (Trilok)',
      'Yathashakti',
      'Neelkamal'
    ],
    correctOptionIndex: 1,
    explanationHindi: 'जिस समास का पहला पद संख्यावाचक विशेषण हो और वह किसी समूह (समाहार) का बोध कराए, उसे द्विगु समास कहते हैं। \'त्रिलोकी/त्रिलोक\' का विग्रह \'तीन लोकों का समाहार\' होता है, अतः इसमें द्विगु समास है। पीताम्बर में बहुव्रीहि/कर्मधारय, यथाशक्ति में अव्ययीभाव तथा नीलकमल में कर्मधारय समास है।',
    explanationEnglish: 'In Hindi grammar, a \'Dvigu Samas\' has a numeral adjective as its first component denoting a collective group. \'Triloki\' means the congregation/summation of three worlds (त्रिलोक), making it a Dvigu compound.',
    sourceExamRef: 'RSMSSB Patwar & CET General Hindi',
    difficulty: 'सरल',
    importantFactHindi: 'यदि संख्यावाची पद मिलकर किसी तीसरे विशेष व्यक्ति/देवता की ओर संकेत करे (जैसे दशानन = रावण), तो वह बहुव्रीहि समास बन जाता है।'
  }
];
