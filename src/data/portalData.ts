export interface DignitaryInfo {
  name: string;
  hindiName: string;
  title: string;
  hindiTitle: string;
  initiativeName: string;
  tagline: string;
  photoUrl: string;
  visionQuote: string;
  message: string;
  keyPoints: string[];
}

export const DIGNITARY_DATA: DignitaryInfo = {
  name: "Roopsingh Fanat",
  hindiName: "रूपसिंह फनात",
  title: "Chief Patron & Visionary",
  hindiTitle: "प्रेरक एवं मुख्य मार्गदर्शक",
  initiativeName: "नई सोच, नई पहल",
  tagline: "आइए मिलकर कल को और बेहतर बनाते हैं",
  photoUrl: "/images/roopsingh-fanat.png",
  visionQuote: "रूपसिंह फनात की ओर से युवाओं को समर्पित — उन सभी युवाओं के लिए जो राजस्थान भर्ती परीक्षा की तैयारी कर रहे हैं",
  message: "राजस्थान के कोने-कोने, सुदूर ढाणियों और गांवों के मेहनती युवाओं को प्रशासनिक एवं राज्य सेवाओं में सफलता दिलाने के लिए 'युवा शिक्षा पोर्टल' (नई सोच, नई पहल) पूर्णतः समर्पित है। रूपसिंह फनात की ओर से युवाओं को समर्पित — उन सभी युवाओं के लिए जो राजस्थान भर्ती परीक्षा की तैयारी कर रहे हैं। आइए मिलकर कल को और बेहतर बनाते हैं।",
  keyPoints: [
    "100% निःशुल्क उच्च स्तरीय डिजिटल अध्ययन सामग्री",
    "RPSC एवं RSMSSB के नवीनतम 5-विकल्प परीक्षा पैटर्न पर आधारित टेस्ट",
    "राजस्थान के सुदूर क्षेत्रों के छात्र-छात्राओं को समान अवसर",
    "विगत वर्षों के प्रश्न-पत्रों एवं प्रामाणिक उत्तर पुस्तिकाओं का संग्रह"
  ]
};

export interface ExamInfo {
  id: string;
  board: 'RSMSSB' | 'RPSC';
  title: string;
  category: string;
  totalPosts?: string;
  eligibility: string;
  ageLimit: string;
  examDate: string;
  status: 'आवेदन शुरू' | 'शीघ्र आ रहा है' | 'परीक्षा तिथि घोषित' | 'उत्तर कुंजी जारी';
  description: string;
  syllabusTopics: string[];
  stages: string[];
  paperCount: number;
  totalMarks: number;
  negativeMarking: string;
}

export const RSMSSB_EXAMS: ExamInfo[] = [
  {
    id: "rsmssb-patwar",
    board: "RSMSSB",
    title: "राजस्थान पटवार सीधी भर्ती 2024-25",
    category: "प्रशासनिक एवं राजस्व",
    totalPosts: "3,000+ संभावित पद",
    eligibility: "स्नातक (Graduation) + RSCIT या समकक्ष कंप्यूटर डिप्लोमा",
    ageLimit: "18 से 40 वर्ष (आरक्षण अनुसार छूट)",
    examDate: "फरवरी - मार्च 2025",
    status: "परीक्षा तिथि घोषित",
    description: "पटवारी भर्ती के लिए सामान्य ज्ञान, राजस्थान का इतिहास, भूगोल, सामान्य विज्ञान, गणित, रीजनिंग, सामान्य हिन्दी व कंप्यूटर ज्ञान का समग्र पाठ्यक्रम।",
    syllabusTopics: [
      "सामान्य विज्ञान, भारत का इतिहास, भूगोल, राजनीति (38 प्रश्न / 76 अंक)",
      "राजस्थान का भूगोल, इतिहास, संस्कृति एवं राजनीति (30 प्रश्न / 60 अंक)",
      "सामान्य अंग्रेजी एवं हिन्दी (22 प्रश्न / 44 अंक)",
      "मानसिक योग्यता एवं रीजनिंग, बेसिक न्यूमेरिकल दक्षता (45 प्रश्न / 90 अंक)",
      "बेसिक कंप्यूटर ज्ञान (15 प्रश्न / 30 अंक)"
    ],
    stages: ["लिखित परीक्षा (300 अंक / 150 प्रश्न)", "दस्तावेज सत्यापन (DV)", "मेरिट सूची"],
    paperCount: 1,
    totalMarks: 300,
    negativeMarking: "1/3 अंक प्रति गलत उत्तर (5वां विकल्प नियम लागू)"
  },
  {
    id: "rsmssb-cet-grad",
    board: "RSMSSB",
    title: "समान पात्रता परीक्षा (CET) - स्नातक स्तर",
    category: "पात्रता परीक्षा (Graduation Level)",
    totalPosts: "विभिन्न विभागों में 8,000+ पद",
    eligibility: "किसी भी मान्यता प्राप्त विश्वविद्यालय से स्नातक",
    ageLimit: "18 से 40 वर्ष",
    examDate: "आयोजित (स्कोरकार्ड उपलब्ध)",
    status: "उत्तर कुंजी जारी",
    description: "प्लाटून कमांडर, जिलेदार, पटवारी, कनिष्ठ लेखाकार, तहसील राजस्व लेखाकार एवं पर्यवेक्षक पदों हेतु अनिवार्य पात्रता परीक्षा।",
    syllabusTopics: [
      "भारतीय राष्ट्रीय आंदोलन एवं राजस्थान का इतिहास",
      "राजस्थान का कला, संस्कृति, साहित्य एवं विरासत",
      "भारत एवं राजस्थान का भूगोल",
      "राजस्थान पर विशेष बल के साथ भारतीय राजनीतिक व्यवस्था",
      "राजस्थान की अर्थव्यवस्था",
      "समसामयिक घटनाएं (Current Affairs)"
    ],
    stages: ["एकल वस्तुनिष्ठ लिखित परीक्षा (300 अंक, 3 घंटे)"],
    paperCount: 1,
    totalMarks: 300,
    negativeMarking: "लागू नहीं (पात्रता आधारित)"
  },
  {
    id: "rsmssb-cet-12th",
    board: "RSMSSB",
    title: "समान पात्रता परीक्षा (CET) - 12वीं स्तर",
    category: "पात्रता परीक्षा (Senior Secondary Level)",
    totalPosts: "10,000+ विभिन्न पद",
    eligibility: "12वीं कक्षा उत्तीर्ण (Senior Secondary)",
    ageLimit: "18 से 40 वर्ष",
    examDate: "अक्टूबर 2024 (सकुशल संपन्न)",
    status: "उत्तर कुंजी जारी",
    description: "वनपाल, छात्रावास अधीक्षक, कनिष्ठ सहायक, लिपिक ग्रेड-II, जमादार ग्रेड-II एवं कांस्टेबल पदों हेतु अनिवार्य पात्रता परीक्षा।",
    syllabusTopics: [
      "राजस्थान का इतिहास, कला, सांस्कृतिक विरासत",
      "भारत एवं राजस्थान का भूगोल",
      "राजस्थान पर विशेष बल के साथ भारतीय राजनीतिक व्यवस्था",
      "दैनिक विज्ञान (Everyday Science)",
      "तार्किक विवेचन एवं मानसिक योग्यता",
      "सामान्य हिन्दी एवं अंग्रेजी",
      "कंप्यूटर ज्ञान"
    ],
    stages: ["लिखित परीक्षा (150 प्रश्न / 300 अंक)"],
    paperCount: 1,
    totalMarks: 300,
    negativeMarking: "लागू नहीं"
  },
  {
    id: "rsmssb-pashu-parichar",
    board: "RSMSSB",
    title: "पशु परिचर (Animal Attendant) सीधी भर्ती",
    category: "पशुपालन विभाग",
    totalPosts: "5,934 पद",
    eligibility: "10वीं कक्षा उत्तीर्ण (Secondary)",
    ageLimit: "18 से 40 वर्ष",
    examDate: "15-18 दिसंबर 2024",
    status: "परीक्षा तिथि घोषित",
    description: "पशुपालन विभाग में 5934 रिक्तियों हेतु। भाग 'अ' (70%) सामान्य ज्ञान व भाग 'ब' (30%) पशुपालन विज्ञान से संबंधित।",
    syllabusTopics: [
      "भाग अ: राजस्थान का भूगोल, इतिहास, संस्कृति, सामान्य विज्ञान, गणित (105 प्रश्न / 105 अंक)",
      "भाग ब: पशुपालन, नस्लें, कृत्रिम गर्भाधान, दुग्ध दोहन, पशु आहार, टीकाकरण, पशु रोग (45 प्रश्न / 45 अंक)"
    ],
    stages: ["लिखित परीक्षा (150 प्रश्न, 150 अंक, 3 घंटे)", "दस्तावेज सत्यापन"],
    paperCount: 1,
    totalMarks: 150,
    negativeMarking: "1/4 अंक"
  },
  {
    id: "rsmssb-vdo",
    board: "RSMSSB",
    title: "ग्राम विकास अधिकारी (VDO) भर्ती",
    category: "पंचायती राज विभाग",
    totalPosts: "आगामी 2,500+ पद",
    eligibility: "स्नातक + RSCIT कंप्यूटर योग्यता",
    ageLimit: "18 से 40 वर्ष",
    examDate: "शीघ्र संभावित",
    status: "शीघ्र आ रहा है",
    description: "राजस्थान ग्रामीण विकास एवं पंचायती राज विभाग में ग्राम विकास अधिकारी पदों हेतु पूर्ण पाठ्यक्रम व मॉडल टेस्ट।",
    syllabusTopics: [
      "सामयिक विषय - राज्य, राष्ट्रीय एवं अंतर्राष्ट्रीय स्तर",
      "भूगोल और प्राकृतिक संसाधन",
      "भारत और राजस्थान के विशेष संदर्भ के साथ कृषि और आर्थिक विकास",
      "इतिहास और संस्कृति - जनजाति, बोलियां, संगीत, नृत्य, मेले",
      "साधारण मानसिक योग्यता और तर्कशक्ति"
    ],
    stages: ["प्रारंभिक परीक्षा (Prelims)", "मुख्य परीक्षा (Mains)", "दस्तावेज जांच"],
    paperCount: 2,
    totalMarks: 200,
    negativeMarking: "1/3 अंक"
  },
  {
    id: "rsmssb-ldc",
    board: "RSMSSB",
    title: "कनिष्ठ सहायक / लिपिक ग्रेड-II (LDC) भर्ती",
    category: "सचिवालय एवं अधीनस्थ विभाग",
    totalPosts: "4,197 पद",
    eligibility: "12वीं उत्तीर्ण + CET 12th Level स्कोर + कंप्यूटर प्रमाण पत्र",
    ageLimit: "18 से 40 वर्ष",
    examDate: "आयोजित (टाइपिंग टेस्ट आगामी)",
    status: "परीक्षा तिथि घोषित",
    description: "शासन सचिवालय, राजस्थान लोक सेवा आयोग एवं अधीनस्थ कार्यालयों में क्लर्क ग्रेड-II एवं कनिष्ठ सहायक पद।",
    syllabusTopics: [
      "पेपर 1: सामान्य ज्ञान, दैनिक विज्ञान एवं गणित (100 अंक)",
      "पेपर 2: सामान्य हिन्दी एवं सामान्य अंग्रेजी (100 अंक)",
      "फेज 2: कंप्यूटर पर हिन्दी एवं अंग्रेजी टंकण दक्षता (100 अंक)"
    ],
    stages: ["फेज-1 लिखित परीक्षा (200 अंक)", "फेज-2 टंकण एवं दक्षता परीक्षण (100 अंक)"],
    paperCount: 2,
    totalMarks: 300,
    negativeMarking: "1/3 अंक"
  }
];

export const RPSC_EXAMS: ExamInfo[] = [
  {
    id: "rpsc-ras",
    board: "RPSC",
    title: "राजस्थान राज्य एवं अधीनस्थ सेवाएं (RAS / RTS)",
    category: "प्रशासनिक सेवा (State Civil Services)",
    totalPosts: "905+ पद (नयी विज्ञप्ति प्रतीक्षित)",
    eligibility: "किसी भी विषय में स्नातक डिग्री",
    ageLimit: "21 से 40 वर्ष",
    examDate: "2024-25 आगामी",
    status: "शीघ्र आ रहा है",
    description: "राजस्थान की सर्वोच्च प्रशासनिक परीक्षा। एसडीएम, डीएसपी, तहसीलदार, वाणिज्यिक कर अधिकारी आदि प्रतिष्ठित पदों हेतु।",
    syllabusTopics: [
      "प्रीलिम्स: राजस्थान का इतिहास, कला, भूगोल, भारतीय इतिहास, विश्व व भारत भूगोल, संविधान, अर्थशास्त्र, विज्ञान एवं करंट अफेयर्स (200 अंक)",
      "मेन्स पेपर I: सामान्य अध्ययन I (इतिहास, अर्थशास्त्र, समाजशास्त्र, प्रबंधन, लेखांकन) - 200 अंक",
      "मेन्स पेपर II: सामान्य अध्ययन II (प्रशासनिक नीतिशास्त्र, सामान्य विज्ञान व तकनीक, भूगोल) - 200 अंक",
      "मेन्स पेपर III: सामान्य अध्ययन III (भारतीय राजनीतिक व्यवस्था, लोक प्रशासन, खेल व योग, विधि, व्यवहार) - 200 अंक",
      "मेन्स पेपर IV: सामान्य हिन्दी (120 अंक) एवं सामान्य अंग्रेजी (80 अंक) - 200 अंक"
    ],
    stages: ["प्रारंभिक परीक्षा (Screening - 200 अंक)", "मुख्य परीक्षा (Descriptive - 800 अंक)", "साक्षात्कार (Personality Test - 100 अंक)"],
    paperCount: 5,
    totalMarks: 900,
    negativeMarking: "प्री में 1/3 अंक"
  },
  {
    id: "rpsc-1st-grade",
    board: "RPSC",
    title: "प्राध्यापक / स्कूल व्याख्याता (1st Grade Teacher)",
    category: "माध्यमिक शिक्षा विभाग",
    totalPosts: "4,000+ पद प्रस्तावित",
    eligibility: "संबंधित विषय में स्नातकोत्तर (PG) + B.Ed.",
    ageLimit: "21 से 40 वर्ष",
    examDate: "मध्य 2025",
    status: "शीघ्र आ रहा है",
    description: "राजस्थान माध्यमिक विद्यालयों में कक्षा 11-12 के अध्यापन हेतु प्रथम श्रेणी शिक्षक भर्ती।",
    syllabusTopics: [
      "पेपर 1: सामान्य अध्ययन (राजस्थान इतिहास, भारतीय राष्ट्रीय आंदोलन, मानसिक क्षमता, सांख्यिकी, गणित, हिन्दी, अंग्रेजी, करंट, विज्ञान, राजनीति, भूगोल, शैक्षिक प्रबंधन - 150 अंक)",
      "पेपर 2: संबंधित विषय ज्ञान (उच्च माध्यमिक, स्नातक, स्नातकोत्तर स्तर एवं शैक्षणिक मनोविज्ञान, शिक्षाशास्त्र - 300 अंक)"
    ],
    stages: ["पेपर 1 (सामान्य अध्ययन - 150 अंक)", "पेपर 2 (विषय ज्ञान - 300 अंक)"],
    paperCount: 2,
    totalMarks: 450,
    negativeMarking: "1/3 अंक"
  },
  {
    id: "rpsc-2nd-grade",
    board: "RPSC",
    title: "वरिष्ठ अध्यापक भर्ती (2nd Grade Teacher)",
    category: "माध्यमिक शिक्षा विभाग",
    totalPosts: "3,500+ पद",
    eligibility: "संबंधित विषय में स्नातक (Graduate) + B.Ed.",
    ageLimit: "18 से 40 वर्ष",
    examDate: "2025 प्रस्तावित",
    status: "शीघ्र आ रहा है",
    description: "कक्षा 6 से 10 तक शिक्षण हेतु सामाजिक विज्ञान, विज्ञान, गणित, हिन्दी, अंग्रेजी, संस्कृत आदि विषयों में वरिष्ठ अध्यापक।",
    syllabusTopics: [
      "पेपर 1: सामान्य ज्ञान (राजस्थान का भौगोलिक, ऐतिहासिक, सांस्कृतिक व सामान्य ज्ञान, राजस्थान करंट, विश्व व भारत का ज्ञान, शैक्षिक मनोविज्ञान - 200 अंक)",
      "पेपर 2: संबंधित विषय ज्ञान (माध्यमिक व वरिष्ठ माध्यमिक स्तर, स्नातक स्तर, शिक्षण विधियां - 300 अंक)"
    ],
    stages: ["पेपर-I (200 अंक, 100 प्रश्न)", "पेपर-II (300 अंक, 150 प्रश्न)"],
    paperCount: 2,
    totalMarks: 500,
    negativeMarking: "1/3 अंक"
  },
  {
    id: "rpsc-si",
    board: "RPSC",
    title: "सब-इंस्पेक्टर / प्लाटून कमांडर (Rajasthan Police SI)",
    category: "राजस्थान पुलिस विभाग",
    totalPosts: "नयी विज्ञप्ति प्रक्रियाधीन",
    eligibility: "स्नातक + शारीरिक मानक (Physical Standards)",
    ageLimit: "20 से 25 वर्ष (आयु सीमा में छूट नियमानुसार)",
    examDate: "2025",
    status: "शीघ्र आ रहा है",
    description: "राजस्थान पुलिस में दो सितारा उप-निरीक्षक पद हेतु लिखित परीक्षा, शारीरिक दक्षता (PET) एवं साक्षात्कार।",
    syllabusTopics: [
      "पेपर 1: सामान्य हिन्दी (शब्द रचना, शब्द प्रकार, व्याकरण कोटियां, वाक्य रचना, विराम चिन्ह, मुहावरे, लोकोक्तियां - 200 अंक / 100 प्रश्न)",
      "पेपर 2: सामान्य ज्ञान एवं सामान्य विज्ञान (राजस्थान ज्ञान, भारत व विश्व का सामान्य ज्ञान, दैनिक विज्ञान, करंट अफेयर्स - 200 अंक / 100 प्रश्न)"
    ],
    stages: ["लिखित परीक्षा (400 अंक)", "शारीरिक दक्षता परीक्षा (PET - 100 अंक Qualifying)", "साक्षात्कार (50 अंक)"],
    paperCount: 2,
    totalMarks: 450,
    negativeMarking: "1/3 अंक"
  }
];

export interface StudyModule {
  id: string;
  subject: string;
  hindiTitle: string;
  iconName: string;
  badge: string;
  topicsCount: number;
  pdfNotesCount: number;
  summary: string;
  keyTopics: string[];
}

export const TAIYARI_MODULES: StudyModule[] = [
  {
    id: "mod-raj-gk",
    subject: "Rajasthan History & Culture",
    hindiTitle: "राजस्थान का इतिहास, कला एवं संस्कृति",
    iconName: "Castle",
    badge: "सर्वाधिक महत्वपूर्ण",
    topicsCount: 24,
    pdfNotesCount: 32,
    summary: "प्राचीन सभ्यताएं (कालीबंगा, आहड़), प्रमुख राजवंश (गुहिल, राठौड़, कछवाहा, चौहान), 1857 की क्रांति, किसान व प्रजामंडल आंदोलन, लोक देवता-देवियां, दुर्ग, महल, चित्रकला शैलियां, मेले-त्योहार व आभूषण।",
    keyTopics: ["प्रमुख दुर्ग एवं वास्तुकला", "लोक नृत्य एवं लोक संगीत", "हस्तशिल्प एवं चित्रशैलियां", "प्रजामंडल एवं किसान आंदोलन", "राजस्थान का एकीकरण"]
  },
  {
    id: "mod-raj-geo",
    subject: "Rajasthan Geography",
    hindiTitle: "राजस्थान का भूगोल एवं अर्थव्यवस्था",
    iconName: "Mountain",
    badge: "50 जिलों का नया भूगोल",
    topicsCount: 20,
    pdfNotesCount: 26,
    summary: "पुनर्गठित 50 जिलों के अनुसार भौतिक प्रदेश (अरावली, थार मरुस्थल, हाड़ौती पठार), नदियां व झीलें, जलवायु, मृदा, वनस्पति, वन्यजीव अभयारण्य, खनिज संपदा एवं ऊर्जा संसाधन।",
    keyTopics: ["नवीन 50 जिलों की सीमाएं व संभाग", "अफवाह तंत्र (चंबल, बनास, लूनी)", "खनिज एवं औद्योगिक परिदृश्य", "कृषि जलवायु क्षेत्र व सिंचाई परियोजनाएं", "जनगणना 2011 एवं आर्थिक समीक्षा"]
  },
  {
    id: "mod-raj-polity",
    subject: "Rajasthan Polity & Governance",
    hindiTitle: "राजस्थान की राजव्यवस्था एवं प्रशासन",
    iconName: "Scale",
    badge: "सटीक अंक प्रदाता",
    topicsCount: 16,
    pdfNotesCount: 18,
    summary: "राज्यपाल की शक्तियां, मुख्यमंत्री व मंत्रिपरिषद, राज्य विधानसभा, राजस्थान उच्च न्यायालय, लोकायुक्त, RPSC, राज्य निर्वाचन आयोग एवं राज्य मानवाधिकार आयोग।",
    keyTopics: ["राज्यपाल एवं मुख्यमंत्री अनुच्छेद", "विधानसभा प्रक्रिया व प्रमुख समितियां", "RPSC एवं लोकायुक्त संरचना", "73वां व 74वां संविधान संशोधन (पंचायती राज)", "राज्य सूचना आयोग व जनसूचना पोर्टल"]
  },
  {
    id: "mod-cur-affairs",
    subject: "Current Affairs & Schemes",
    hindiTitle: "राजस्थान समसामयिकी एवं फ्लैगशिप योजनाएं",
    iconName: "Sparkles",
    badge: "अक्टूबर 2024 तक अपडेटेड",
    topicsCount: 18,
    pdfNotesCount: 22,
    summary: "राजस्थान राज्य बजट 2024-25, जनकल्याणकारी फ्लैगशिप योजनाएं, राष्ट्रीय खेल एवं पुरस्कार, चर्चित व्यक्तित्व, नवीनतम नियुक्तियां एवं राज्य की प्रमुख नीतियां।",
    keyTopics: ["राजस्थान बजट 2024-25 मुख्य घोषणाएं", "मुख्यमंत्री आयुष्मान आरोग्य योजना", "राइजिंग राजस्थान ग्लोबल इन्वेस्टमेंट समिट", "नवीनतम खेल उपलब्धियां एवं पदक विजेता", "राज्य के प्रमुख पुरस्कार 2024"]
  },
  {
    id: "mod-gen-hindi",
    subject: "General Hindi",
    hindiTitle: "सामान्य हिन्दी व्याकरण",
    iconName: "BookOpen",
    badge: "स्कोर बूस्टर",
    topicsCount: 22,
    pdfNotesCount: 28,
    summary: "संधि, समास, उपसर्ग, प्रत्यय, तत्सम-तद्भव, पर्यायवाची, विलोम शब्द, शब्द-युग्म, वाक्यांश के लिए एक शब्द, वाक्य शुद्धि, मुहावरे एवं लोकोक्तियां, पारिभाषिक शब्दावली।",
    keyTopics: ["संधि एवं संधि विच्छेद (स्वर, व्यंजन, विसर्ग)", "समास के भेद व उदाहरण", "वाक्य शुद्धि के 20 गोल्डन नियम", "प्रशासनिक पारिभाषिक शब्दावली", "पत्र लेखन एवं प्रारूप"]
  },
  {
    id: "mod-reasoning-maths",
    subject: "Maths & Mental Ability",
    hindiTitle: "गणित एवं तार्किक अभिक्षमता",
    iconName: "Calculator",
    badge: "शॉर्ट ट्रिक्स सहित",
    topicsCount: 19,
    pdfNotesCount: 21,
    summary: "प्रतिशत, लाभ-हानि, अनुपात-समानुपात, साधारण व चक्रवृद्धि ब्याज, समय व कार्य, कोडिंग-डिकोडिंग, रक्त संबंध, दिशा ज्ञान, वेन आरेख, बैठने की व्यवस्था।",
    keyTopics: ["अनुपात, प्रतिशत व औसत ट्रिक्स", "साधारण व चक्रवृद्धि ब्याज अंतर", "रक्त संबंध व पहेली परीक्षण", "कथन एवं निष्कर्ष (Syllogism)", "डेटा इंटरप्रिटेशन (DI)"]
  }
];

export interface QuizQuestion {
  id: number;
  subject: string;
  questionHindi: string;
  questionEnglish?: string;
  options: string[];
  correctOptionIndex: number; // 0, 1, 2, 3 (or 4 for option E)
  explanationHindi: string;
}

export const SAMPLE_MOCK_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    subject: "राजस्थान का इतिहास",
    questionHindi: "महाराणा कुंभा द्वारा रचित ग्रंथ 'संगीतराज' कितने कोशों (भागों) में विभक्त है?",
    questionEnglish: "In how many parts (Koshas) is 'Sangeet Raj' composed by Maharana Kumbha divided?",
    options: [
      "तीन (3)",
      "चार (4)",
      "पाँच (5)",
      "सात (7)",
      "अनुत्तरित प्रश्न (Question Not Attempted)"
    ],
    correctOptionIndex: 2,
    explanationHindi: "महाराणा कुंभा द्वारा रचित 'संगीतराज' 5 कोशों में विभक्त है: (1) पाठ्य रत्नकोश, (2) गीत रत्नकोश, (3) वाद्य रत्नकोश, (4) नृत्य रत्नकोश, (5) रस रत्नकोश। कुंभा को 'अभिनव भरताचार्य' भी कहा जाता है।"
  },
  {
    id: 2,
    subject: "राजस्थान का भूगोल",
    questionHindi: "पुनर्गठित राजस्थान के संदर्भ में 'छप्पन का मैदान' किन दो जिलों के मध्य मुख्यतः विस्तृत है?",
    questionEnglish: "In reference to reorganized Rajasthan, between which two districts is the 'Chhappan Plain' mainly spread?",
    options: [
      "बांसवाड़ा और प्रतापगढ़",
      "डूंगरपुर और उदयपुर",
      "झालावाड़ और कोटा",
      "चित्तौड़गढ़ और भीलवाड़ा",
      "अनुत्तरित प्रश्न (Question Not Attempted)"
    ],
    correctOptionIndex: 0,
    explanationHindi: "माही नदी के प्रवाह क्षेत्र में बांसवाड़ा और प्रतापगढ़ के मध्य 56 गांवों/नालों के समूह को 'छप्पन का मैदान' कहा जाता है। यह क्षेत्र कावेरी सदृश उपजाऊ कांप मिट्टी से निर्मित है।"
  },
  {
    id: 3,
    subject: "राजस्थान की राजव्यवस्था",
    questionHindi: "राजस्थान लोक सेवा आयोग (RPSC) के अध्यक्ष एवं सदस्यों की नियुक्ति भारतीय संविधान के किस अनुच्छेद के अंतर्गत की जाती है?",
    questionEnglish: "Under which Article of the Indian Constitution are the Chairman and members of RPSC appointed?",
    options: [
      "अनुच्छेद 312",
      "अनुच्छेद 316",
      "अनुच्छेद 320",
      "अनुच्छेद 324",
      "अनुच्छेद प्रश्न (Question Not Attempted)"
    ],
    correctOptionIndex: 1,
    explanationHindi: "अनुच्छेद 316(1) के तहत राज्य लोक सेवा आयोग के अध्यक्ष व सदस्यों की नियुक्ति राज्य के राज्यपाल द्वारा की जाती है। आयोग के सदस्य 6 वर्ष या 62 वर्ष की आयु तक पद धारण करते हैं।"
  },
  {
    id: 4,
    subject: "कला एवं संस्कृति",
    questionHindi: "प्रसिद्ध 'बणी-ठणी' चित्र किस चित्रकला शैली से संबंधित है और इसके मुख्य चित्रकार कौन थे?",
    questionEnglish: "The famous 'Bani-Thani' painting belongs to which painting style and who was its chief artist?",
    options: [
      "मेवाड़ शैली - साहिबदीन",
      "किशनगढ़ शैली - निहालचंद",
      "मारवाड़ शैली - डालचंद",
      "बूंदी शैली - सुरजन सिंह",
      "अनुत्तरित प्रश्न (Question Not Attempted)"
    ],
    correctOptionIndex: 1,
    explanationHindi: "बणी-ठणी किशनगढ़ शैली का उत्कृष्ट चित्र है, जिसे महाराजा सावंत सिंह (नागरीदास) के समय मोरध्वज निहालचंद ने चित्रित किया था। एरिक डिक्सन ने इसे 'भारत की मोनालिसा' कहा है।"
  },
  {
    id: 5,
    subject: "राजस्थान समसामयिकी",
    questionHindi: "'नई सोच, नई पहल' जन-कल्याणकारी शैक्षिक अभियान का मुख्य उद्देश्य क्या है?",
    questionEnglish: "What is the primary objective of 'Nayi Soch, Nayi Pehal' educational initiative?",
    options: [
      "केवल निजी कोचिंग संस्थानों का प्रचार करना",
      "राजस्थान के ग्रामीण व वंचित युवाओं को निःशुल्क प्रतियोगी परीक्षा संबल प्रदान करना",
      "प्रतियोगी पुस्तकों पर केवल छूट देना",
      "प्राइवेट नौकरी हेतु मेला आयोजित करना",
      "अनुत्तरित प्रश्न (Question Not Attempted)"
    ],
    correctOptionIndex: 1,
    explanationHindi: "'युवा शिक्षा पोर्टल' (नई सोच, नई पहल) — रूपसिंह फनात की ओर से युवाओं को समर्पित। इसका मुख्य संकल्प राजस्थान के प्रत्येक प्रतियोगी छात्र को निःशुल्क, प्रामाणिक एवं पारदर्शी परीक्षा तैयारी संबल उपलब्ध कराना है। आइए मिलकर कल को और बेहतर बनाते हैं।"
  },
  {
    id: 6,
    subject: "सामान्य विज्ञान",
    questionHindi: "मानव शरीर में रक्त का थक्का (Blood Clotting) बनने में कौन सा विटामिन अनिवार्य भूमिका निभाता है?",
    questionEnglish: "Which vitamin plays an essential role in blood clotting in the human body?",
    options: [
      "विटामिन A",
      "विटामिन C",
      "विटामिन K",
      "विटामिन E",
      "अनुत्तरित प्रश्न (Question Not Attempted)"
    ],
    correctOptionIndex: 2,
    explanationHindi: "विटामिन K (फाइलोक्विनोन) यकृत में प्रोथ्रोम्बिन और फाइब्रिनोजेन जैसे थक्का जमाने वाले कारकों के संश्लेषण के लिए आवश्यक होता है। इसकी कमी से रक्त का थक्का जमने में देरी होती है।"
  },
  {
    id: 7,
    subject: "राजस्थान का इतिहास",
    questionHindi: "बिजोलिया किसान आंदोलन के दूसरे चरण (1916-1923) का नेतृत्व किसने किया था?",
    questionEnglish: "Who led the second phase (1916-1923) of the Bijolia Peasant Movement?",
    options: [
      "साधु सीताराम दास",
      "विजय सिंह पथिक (भूप सिंह)",
      "माणिक्य लाल वर्मा",
      "रामनारायण चौधरी",
      "अनुत्तरित प्रश्न (Question Not Attempted)"
    ],
    correctOptionIndex: 1,
    explanationHindi: "विजय सिंह पथिक ने 1916 में साधु सीताराम दास के आग्रह पर बिजोलिया आंदोलन की बागडोर संभाली। 1917 में पथिक जी ने हरियाली अमावस्या के दिन 'ऊपरमाल पंच बोर्ड' की स्थापना की।"
  },
  {
    id: 8,
    subject: "सामान्य हिन्दी",
    questionHindi: "'अन्वेषण' शब्द का सही संधि-विच्छेद क्या होगा?",
    questionEnglish: "What will be the correct Sandhi-Vichhed for the word 'Anveshan'?",
    options: [
      "अनु + एषण",
      "अन + वेषण",
      "अनु + ऐषण",
      "अनवे + षण",
      "अनुत्तरित प्रश्न (Question Not Attempted)"
    ],
    correctOptionIndex: 0,
    explanationHindi: "'अनु + एषण' = अन्वेषण। यह 'यण् स्वर संधि' का उदाहरण है (उ/ऊ + ए = वे)।"
  }
];

export interface PreviousPaper {
  id: string;
  examTitle: string;
  board: 'RSMSSB' | 'RPSC';
  year: number;
  stage: string;
  shift?: string;
  questionsCount: number;
  fileSize: string;
  downloadUrl: string;
  hasAnswerKey: boolean;
}

export const PREVIOUS_PAPERS_DATA: PreviousPaper[] = [
  {
    id: "pyq-cet-grad-2024",
    examTitle: "RSMSSB CET (Graduation Level) - Shift 1",
    board: "RSMSSB",
    year: 2024,
    stage: "Official Question Paper",
    shift: "मॉर्निंग शिफ्ट (27 सितंबर 2024)",
    questionsCount: 150,
    fileSize: "4.2 MB",
    downloadUrl: "#",
    hasAnswerKey: true
  },
  {
    id: "pyq-cet-12th-2024",
    examTitle: "RSMSSB CET (12th Level) - Shift 2",
    board: "RSMSSB",
    year: 2024,
    stage: "Official Question Paper",
    shift: "ईवनिंग शिफ्ट (23 अक्टूबर 2024)",
    questionsCount: 150,
    fileSize: "3.8 MB",
    downloadUrl: "#",
    hasAnswerKey: true
  },
  {
    id: "pyq-ras-pre-2023",
    examTitle: "RPSC RAS / RTS संयुक्त प्रतियोगी (प्रारंभिक) परीक्षा 2023",
    board: "RPSC",
    year: 2023,
    stage: "Prelims GS Paper",
    shift: "एकल सत्र (01 अक्टूबर 2023)",
    questionsCount: 150,
    fileSize: "5.1 MB",
    downloadUrl: "#",
    hasAnswerKey: true
  },
  {
    id: "pyq-patwar-2021-m1",
    examTitle: "RSMSSB पटवार भर्ती परीक्षा 2021 (Master Paper)",
    board: "RSMSSB",
    year: 2021,
    stage: "Written Exam",
    shift: "23 अक्टूबर प्रथम पारी",
    questionsCount: 150,
    fileSize: "4.6 MB",
    downloadUrl: "#",
    hasAnswerKey: true
  },
  {
    id: "pyq-2nd-grade-gk-2022",
    examTitle: "RPSC वरिष्ठ अध्यापक (2nd Grade) - Group A (GK)",
    board: "RPSC",
    year: 2022,
    stage: "Paper-1 (General Knowledge)",
    shift: "प्रातः 9:00 बजे",
    questionsCount: 100,
    fileSize: "3.2 MB",
    downloadUrl: "#",
    hasAnswerKey: true
  },
  {
    id: "pyq-vdo-mains-2022",
    examTitle: "RSMSSB ग्राम विकास अधिकारी (VDO) मुख्य परीक्षा 2022",
    board: "RSMSSB",
    year: 2022,
    stage: "Mains Examination",
    shift: "09 जुलाई 2022",
    questionsCount: 160,
    fileSize: "4.9 MB",
    downloadUrl: "#",
    hasAnswerKey: true
  },
  {
    id: "pyq-police-si-2021",
    examTitle: "RPSC सब-इंस्पेक्टर भर्ती परीक्षा 2021 (Paper 1 - Hindi)",
    board: "RPSC",
    year: 2021,
    stage: "Paper 1 General Hindi",
    shift: "13 सितंबर 2021",
    questionsCount: 100,
    fileSize: "2.9 MB",
    downloadUrl: "#",
    hasAnswerKey: true
  },
  {
    id: "pyq-junior-acc-2024",
    examTitle: "RSMSSB कनिष्ठ लेखाकार (Junior Accountant) Paper 1 & 2",
    board: "RSMSSB",
    year: 2024,
    stage: "Combined Papers",
    shift: "11 फरवरी 2024",
    questionsCount: 300,
    fileSize: "6.8 MB",
    downloadUrl: "#",
    hasAnswerKey: true
  }
];

export type NotificationTag = 'नई भर्ती' | 'परीक्षा तिथि' | 'सिलेबस' | 'प्रवेश पत्र' | 'परिणाम';

export interface CircularDetail {
  label: string;
  value: string;
}

export interface PortalNotification {
  id: string;
  circularNo: string;
  date: string;
  tag: NotificationTag;
  title: string;
  board: 'RSMSSB' | 'RPSC';
  department: string;
  summary: string;
  keyDetails: CircularDetail[];
  fileSize: string;
  isNew: boolean;
  isUrgent: boolean;
  linkText: string;
  downloadUrl?: string;
}

export const PORTAL_NOTIFICATIONS: PortalNotification[] = [
  {
    id: "rsmssb-notif-pashu",
    circularNo: "प.14(65)प.क/आरएसएसबी/भर्ती/2024/1142",
    date: "14 अक्टूबर 2024",
    tag: "नई भर्ती",
    title: "पशु परिचर (Animal Attendant) सीधी भर्ती 2023-24 कुल 5,934 पदों हेतु संशोधित विस्तृत विज्ञप्ति",
    board: "RSMSSB",
    department: "पशुपालन विभाग, राजस्थान सरकार",
    summary: "पशुपालन विभाग में गैर-अनुसूचित क्षेत्र के 5288 एवं अनुसूचित क्षेत्र के 646 कुल 5934 रिक्त पदों पर सीधी भर्ती हेतु ऑनलाइन आवेदन, पात्रता मापदंड एवं परीक्षा दिशा-निर्देश।",
    keyDetails: [
      { label: "कुल पद", value: "5,934 पद" },
      { label: "वेतनमान", value: "पे मैट्रिक्स लेवल L-1" },
      { label: "शैक्षणिक योग्यता", value: "10वीं कक्षा उत्तीर्ण (Secondary)" },
      { label: "आयु सीमा", value: "18 से 40 वर्ष (नियमानुसार छूट)" }
    ],
    fileSize: "1.2 MB",
    isNew: true,
    isUrgent: true,
    linkText: "विस्तृत विज्ञप्ति (PDF)"
  },
  {
    id: "rsmssb-notif-exam-date",
    circularNo: "क्रमांक: प.14(88)प.क/आरएसएसबी/परीक्षा/2024/908",
    date: "12 अक्टूबर 2024",
    tag: "परीक्षा तिथि",
    title: "राजस्थान कर्मचारी चयन बोर्ड द्वारा वर्ष 2024-25 की आगामी प्रतियोगी परीक्षाओं का संशोधित परीक्षा पंचांग",
    board: "RSMSSB",
    department: "परीक्षा नियंत्रण प्रकोष्ठ, RSMSSB जयपुर",
    summary: "पशु परिचर परीक्षा (15 से 18 दिसंबर 2024), कनिष्ठ अनुदेशक, छात्रावास अधीक्षक एवं महिला सुपरवाइजर परीक्षाओं की निश्चित समय-सारणी एवं पारी-वार रिपोर्टिंग समय जारी।",
    keyDetails: [
      { label: "पशु परिचर परीक्षा", value: "15, 16, 17 व 18 दिसंबर 2024" },
      { label: "परीक्षा पारियां", value: "प्रतिदिन दो पारियां (प्रातः व सायं)" },
      { label: "रिपोर्टिंग समय", value: "परीक्षा प्रारंभ से 2 घंटे पूर्व" },
      { label: "5वां विकल्प समय", value: "अतिरिक्त 10 मिनट OMR भरने हेतु" }
    ],
    fileSize: "780 KB",
    isNew: true,
    isUrgent: false,
    linkText: "परीक्षा कैलेंडर (PDF)"
  },
  {
    id: "rsmssb-notif-cet-syllabus",
    circularNo: "प.14(32)प.क/आरएसएसबी/पाठ्यक्रम/2024/764",
    date: "09 अक्टूबर 2024",
    tag: "सिलेबस",
    title: "समान पात्रता परीक्षा (CET) सीनियर सेकंडरी स्तर 2024 नवीन विस्तृत पाठ्यक्रम एवं अंक-विभाजन योजना",
    board: "RSMSSB",
    department: "पाठ्यक्रम एवं मूल्यांकन प्रकोष्ठ, RSMSSB जयपुर",
    summary: "सीईटी सीनियर सेकंडरी परीक्षा हेतु राजस्थान का सामान्य ज्ञान, राजस्थान की अर्थव्यवस्था, दैनिक विज्ञान, गणित, रीजनिंग, हिन्दी, अंग्रेजी एवं कंप्यूटर विषयों का विस्तृत टॉपिक-वार सिलेबस जारी।",
    keyDetails: [
      { label: "कुल प्रश्न", value: "150 बहुविकल्पीय प्रश्न" },
      { label: "पूर्णांक", value: "300 अंक" },
      { label: "समय अवधि", value: "3 घंटे (180 मिनट + 10 मिनट)" },
      { label: "नेगेटिव मार्किंग", value: "ऋणात्मक अंकन लागू नहीं (पात्रता आधारित)" }
    ],
    fileSize: "950 KB",
    isNew: false,
    isUrgent: false,
    linkText: "विस्तृत सिलेबस (PDF)"
  },
  {
    id: "rpsc-notif-ras-bharti",
    circularNo: "वि.सं. 08/परीक्षा/आरएएस/आरपीएससी/2024-25",
    date: "11 अक्टूबर 2024",
    tag: "नई भर्ती",
    title: "राजस्थान राज्य एवं अधीनस्थ सेवाएं (RAS/RTS) संयुक्त प्रतियोगी परीक्षा 2024-25 सीधी भर्ती विस्तृत विज्ञापन",
    board: "RPSC",
    department: "कार्मिक (क-4) विभाग, राजस्थान सरकार",
    summary: "राजस्थान प्रशासनिक सेवा (RAS), राजस्थान पुलिस सेवा (RPS), राजस्थान लेखा सेवा एवं अधीनस्थ सेवाओं के कुल 733 पदों पर ऑनलाइन आवेदन आमंत्रित किए जाते हैं।",
    keyDetails: [
      { label: "कुल रिक्तियां", value: "733 पद (346 राज्य + 387 अधीनस्थ)" },
      { label: "शैक्षणिक योग्यता", value: "विधि द्वारा स्थापित किसी भी वि.वि. से स्नातक" },
      { label: "आयु सीमा", value: "21 से 40 वर्ष (1 जनवरी 2025 को)" },
      { label: "आवेदन प्रक्रिया", value: "SSO पोर्टल पर One Time Registration (OTR)" }
    ],
    fileSize: "2.4 MB",
    isNew: true,
    isUrgent: true,
    linkText: "आधिकारिक विज्ञापन (PDF)"
  },
  {
    id: "rpsc-notif-calendar-2025",
    circularNo: "प.12(3)परीक्षा/कैलेंडर/आरपीएससी/2024/652",
    date: "08 अक्टूबर 2024",
    tag: "परीक्षा तिथि",
    title: "राजस्थान लोक सेवा आयोग (RPSC) अजमेर द्वारा वर्ष 2025 हेतु प्रस्तावित वार्षिक प्रतियोगी परीक्षा कैलेंडर",
    board: "RPSC",
    department: "परीक्षा शाखा, RPSC अजमेर",
    summary: "सहायक अभियोजन अधिकारी (APO), जनसंपर्क अधिकारी (PRO), स्कूल प्राध्यापक (School Lecturer), वरिष्ठ अध्यापक (2nd Grade) एवं सहायक अभियंता प्रतियोगी परीक्षाओं की तिथियां।",
    keyDetails: [
      { label: "APO संयुक्त परीक्षा", value: "19 जनवरी 2025" },
      { label: "स्कूल लेक्चरर 2025", value: "अप्रैल - मई 2025" },
      { label: "2nd Grade वरिष्ठ शिक्षक", value: "जुलाई 2025" },
      { label: "कृषि अधिकारी परीक्षा", value: "20 अप्रैल 2025" }
    ],
    fileSize: "620 KB",
    isNew: false,
    isUrgent: false,
    linkText: "वार्षिक कैलेंडर (PDF)"
  },
  {
    id: "rpsc-notif-ras-syllabus",
    circularNo: "पाठ्यक्रम/आरएएस-प्री/आरपीएससी/2024/421",
    date: "06 अक्टूबर 2024",
    tag: "सिलेबस",
    title: "RAS/RTS प्रारंभिक एवं मुख्य परीक्षा (Prelims & Mains) 2024-25 हेतु नवीन विस्तृत पाठ्यक्रम एवं परीक्षा योजना",
    board: "RPSC",
    department: "परीक्षा एवं मूल्यांकन प्रभाग, RPSC अजमेर",
    summary: "प्रारंभिक परीक्षा का 200 अंकों का एकल प्रश्न-पत्र तथा मुख्य परीक्षा के 4 प्रश्न-पत्रों (सामान्य अध्ययन I, II, III एवं सामान्य हिन्दी व अंग्रेजी) का मानक पाठ्यक्रम। OMR में 5वें विकल्प का नियम अनिवार्य।",
    keyDetails: [
      { label: "प्रारंभिक परीक्षा", value: "200 अंक (150 प्रश्न, 3 घंटे)" },
      { label: "मुख्य परीक्षा", value: "800 अंक (4 प्रश्न-पत्र x 200 अंक)" },
      { label: "नेगेटिव मार्किंग", value: "1/3 अंक काटा जाएगा" },
      { label: "5वां विकल्प नियम", value: "10% से अधिक खाली छोड़ने पर अयोग्य" }
    ],
    fileSize: "1.8 MB",
    isNew: false,
    isUrgent: false,
    linkText: "नवीन पाठ्यक्रम (PDF)"
  },
  {
    id: "rsmssb-notif-patwar",
    circularNo: "प.14(19)प.क/आरएसएसबी/राजस्व/2024/532",
    date: "04 अक्टूबर 2024",
    tag: "नई भर्ती",
    title: "राजस्व मंडल राजस्थान, अजमेर हेतु पटवार सीधी भर्ती 2024-25 के रिक्त 3,250 पदों की विज्ञप्ति प्रारूप",
    board: "RSMSSB",
    department: "राजस्व विभाग, राजस्थान सरकार",
    summary: "पटवारी संवर्ग के गैर-अनुसूचित एवं अनुसूचित क्षेत्र के कुल 3250 पदों पर भर्ती हेतु शैक्षणिक योग्यता, सीईटी पात्रता कट-ऑफ और ऑनलाइन आवेदन का विभागीय प्रारूप।",
    keyDetails: [
      { label: "संभावित पद", value: "3,250 रिक्तियां" },
      { label: "योग्यता", value: "मान्यता प्राप्त स्नातक + RSCIT कंप्यूटर डिप्लोमा" },
      { label: "चयन आधार", value: "लिखित परीक्षा एवं CET मेरिट" },
      { label: "वेतनमान", value: "पे मैट्रिक्स L-5" }
    ],
    fileSize: "890 KB",
    isNew: true,
    isUrgent: false,
    linkText: "प्रारूप विज्ञप्ति (PDF)"
  },
  {
    id: "rpsc-notif-first-grade",
    circularNo: "वि.सं. 11/मा.शि./प्राध्यापक/आरपीएससी/2024-25",
    date: "02 अक्टूबर 2024",
    tag: "नई भर्ती",
    title: "माध्यमिक शिक्षा विभाग में प्राध्यापक (स्कूल शिक्षा / 1st Grade Teacher) कुल 2,202 पदों हेतु विज्ञापन",
    board: "RPSC",
    department: "माध्यमिक शिक्षा विभाग, राजस्थान",
    summary: "हिन्दी, अंग्रेजी, इतिहास, राजनीति विज्ञान, भूगोल, जीव विज्ञान, भौतिक विज्ञान, रसायन विज्ञान व गणित सहित 24 विभिन्न ऐच्छिक विषयों के 2202 रिक्त पदों हेतु आवेदन।",
    keyDetails: [
      { label: "कुल पद", value: "2,202 पद (24 विषय)" },
      { label: "शैक्षणिक योग्यता", value: "संबंधित विषय में स्नातकोत्तर (PG) + B.Ed / शिक्षा शास्त्री" },
      { label: "आयु सीमा", value: "21 से 40 वर्ष" },
      { label: "चयन प्रक्रिया", value: "प्रतियोगी परीक्षा (पेपर-1: 150 अंक, पेपर-2: 300 अंक)" }
    ],
    fileSize: "3.1 MB",
    isNew: false,
    isUrgent: false,
    linkText: "विस्तृत विज्ञापन (PDF)"
  },
  {
    id: "rsmssb-notif-cet-anskey",
    circularNo: "प.14(44)प.क/आरएसएसबी/उत्तरकुंजी/2024/819",
    date: "30 सितंबर 2024",
    tag: "परीक्षा तिथि",
    title: "समान पात्रता परीक्षा (CET) स्नातक स्तर 2024 की प्राथमिक उत्तर कुंजी एवं मास्टर प्रश्न-पत्र पर आपत्ति सूचना",
    board: "RSMSSB",
    department: "गोपनीय शाखा, RSMSSB जयपुर",
    summary: "27 व 28 सितंबर 2024 को आयोजित सीईटी स्नातक परीक्षा के सभी चरणों के मास्टर प्रश्न-पत्र एवं प्राथमिक उत्तर कुंजियां बोर्ड वेबसाइट पर उपलब्ध। प्रति आपत्ति ₹100 निर्धारित शुल्क देय।",
    keyDetails: [
      { label: "आपत्ति दर्ज अवधि", value: "02 से 04 अक्टूबर 2024 (मध्यरात्रि तक)" },
      { label: "शुल्क", value: "₹100 प्रति प्रश्न ऑनलाइन" },
      { label: "आपत्ति आधार", value: "मानक व प्रामाणिक पुस्तकों के साक्ष्य आवश्यक" },
      { label: "उत्तर कुंजी स्थिति", value: "प्राथमिक उत्तर कुंजी जारी" }
    ],
    fileSize: "1.1 MB",
    isNew: false,
    isUrgent: false,
    linkText: "आपत्ति दिशा-निर्देश (PDF)"
  },
  {
    id: "rpsc-notif-second-grade-syllabus",
    circularNo: "वि.सं. 09/पा./वरिष्ठअध्यापक/आरपीएससी/2024",
    date: "26 सितंबर 2024",
    tag: "सिलेबस",
    title: "वरिष्ठ अध्यापक (Senior Teacher - 2nd Grade) प्रतियोगी परीक्षा हेतु पेपर-1 व पेपर-2 का संशोधित विस्तृत सिलेबस",
    board: "RPSC",
    department: "माध्यमिक शिक्षा अनुभाग, RPSC अजमेर",
    summary: "पेपर-1 (राजस्थान का भौगोलिक, ऐतिहासिक, सांस्कृतिक ज्ञान व शैक्षिक मनोविज्ञान - 200 अंक) एवं पेपर-2 (संबंधित विषय ज्ञान - 300 अंक) का आधिकारिक संशोधित पाठ्यक्रम।",
    keyDetails: [
      { label: "पेपर-1 (सामान्य ज्ञान)", value: "100 प्रश्न (200 अंक, समय 2 घंटे)" },
      { label: "पेपर-2 (ऐच्छिक विषय)", value: "150 प्रश्न (300 अंक, समय 2:30 घंटे)" },
      { label: "न्यूनतम उत्तीर्णांक", value: "प्रत्येक पेपर में न्यूनतम 40% (SC/ST 35%)" },
      { label: "ऋणात्मक अंकन", value: "1/3 अंक काटा जाएगा" }
    ],
    fileSize: "1.5 MB",
    isNew: false,
    isUrgent: false,
    linkText: "पाठ्यक्रम देखें (PDF)"
  }
];

export const BREAKING_TICKER = [
  "⚡ 'युवा शिक्षा पोर्टल' (नई सोच, नई पहल) — रूपसिंह फनात की ओर से युवाओं को समर्पित • आइए मिलकर कल को और बेहतर बनाते हैं",
  "📢 RSMSSB पशु परिचर सीधी भर्ती परीक्षा 15-18 दिसंबर 2024 को आयोजित होगी, तैयारी अनुभाग से निःशुल्क मॉडल टेस्ट हल करें",
  "🎯 RPSC RAS एवं 1st / 2nd Grade शिक्षक भर्ती हेतु विषय-वार अद्यतन नोट्स 'तैयारी' सेक्शन में उपलब्ध",
  "📝 RPSC/RSMSSB 5वें विकल्प (Option E) नियम के साथ नवीनतम 'स्वयं की जांच' टेस्ट सीरीज लाइव",
  "📥 2021 से 2024 तक के 50+ विगत वर्षों के प्रश्न-पत्र (PYQs) मॉडल आंसर-की सहित निःशुल्क डाउनलोड करें"
];
