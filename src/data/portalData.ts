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
    id: "mod-raj-current",
    subject: "Rajasthan Current Affairs",
    hindiTitle: "राजस्थान समसामयिकी (Current Affairs)",
    iconName: "Sparkles",
    badge: "2025-2026 अपडेटेड",
    topicsCount: 18,
    pdfNotesCount: 22,
    summary: "राजस्थान राज्य बजट, जनकल्याणकारी फ्लैगशिप योजनाएं, राष्ट्रीय खेल एवं पुरस्कार, चर्चित व्यक्तित्व, नवीनतम नियुक्तियां एवं राज्य की प्रमुख नीतियां।",
    keyTopics: ["राजस्थान बजट व प्रमुख नीतियां", "मुख्यमंत्री आयुष्मान आरोग्य योजना", "राइजिंग राजस्थान ग्लोबल इन्वेस्टमेंट समिट", "नवीनतम खेल उपलब्धियां एवं पदक विजेता", "राज्य के प्रमुख पुरस्कार एवं योजनाएं"]
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
      "अनुत्तरित प्रश्न (Question Not Attempted)"
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
  board: 'RSMSSB' | 'RPSC' | 'Police' | 'High Court';
  year: number;
  stage: string;
  shift?: string;
  questionsCount: number;
  fileSize: string;
  masterPaperUrl: string;
  answerKeyUrl: string;
  mirrorPaperUrl: string;
  mirrorAnswerKeyUrl: string;
  officialSourcePortal: string;
  hasAnswerKey: boolean;
}

export const PREVIOUS_PAPERS_DATA: PreviousPaper[] = [
  // =========================================================================
  // 1. समान पात्रता परीक्षा (CET) - स्नातक स्तर (All Shifts 2024 & 2023)
  // =========================================================================
  {
    id: "pyq-cet-grad-2024-s1",
    examTitle: "RSMSSB समान पात्रता परीक्षा (CET) स्नातक स्तर 2024 - 27 सितंबर Shift 1 (मास्टर पेपर 131A)",
    board: "RSMSSB",
    year: 2024,
    stage: "Official Master Question Paper (Full 150 Qs)",
    shift: "27 सितंबर 2024 (प्रातः 09:00 से 12:00)",
    questionsCount: 150,
    fileSize: "4.8 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_Grad_2024_27Sept_Shift1_Master_QP.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_Grad_2024_27Sept_Shift1_Final_AnswerKey.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_Grad_2024_27Sept_Shift1_Master.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_Grad_2024_27Sept_Shift1_Key.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in",
    hasAnswerKey: true
  },
  {
    id: "pyq-cet-grad-2024-s2",
    examTitle: "RSMSSB समान पात्रता परीक्षा (CET) स्नातक स्तर 2024 - 27 सितंबर Shift 2 (मास्टर पेपर 131B)",
    board: "RSMSSB",
    year: 2024,
    stage: "Official Master Question Paper (Full 150 Qs)",
    shift: "27 सितंबर 2024 (दोपहर 03:00 से 06:00)",
    questionsCount: 150,
    fileSize: "4.9 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_Grad_2024_27Sept_Shift2_Master_QP.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_Grad_2024_27Sept_Shift2_Final_AnswerKey.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_Grad_2024_27Sept_Shift2_Master.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_Grad_2024_27Sept_Shift2_Key.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in",
    hasAnswerKey: true
  },
  {
    id: "pyq-cet-grad-2024-s3",
    examTitle: "RSMSSB समान पात्रता परीक्षा (CET) स्नातक स्तर 2024 - 28 सितंबर Shift 1 (मास्टर पेपर 131C)",
    board: "RSMSSB",
    year: 2024,
    stage: "Official Master Question Paper (Full 150 Qs)",
    shift: "28 सितंबर 2024 (प्रातः 09:00 से 12:00)",
    questionsCount: 150,
    fileSize: "4.7 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_Grad_2024_28Sept_Shift1_Master_QP.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_Grad_2024_28Sept_Shift1_Final_AnswerKey.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_Grad_2024_28Sept_Shift1_Master.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_Grad_2024_28Sept_Shift1_Key.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in",
    hasAnswerKey: true
  },
  {
    id: "pyq-cet-grad-2024-s4",
    examTitle: "RSMSSB समान पात्रता परीक्षा (CET) स्नातक स्तर 2024 - 28 सितंबर Shift 2 (मास्टर पेपर 131D)",
    board: "RSMSSB",
    year: 2024,
    stage: "Official Master Question Paper (Full 150 Qs)",
    shift: "28 सितंबर 2024 (दोपहर 03:00 से 06:00)",
    questionsCount: 150,
    fileSize: "4.8 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_Grad_2024_28Sept_Shift2_Master_QP.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_Grad_2024_28Sept_Shift2_Final_AnswerKey.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_Grad_2024_28Sept_Shift2_Master.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_Grad_2024_28Sept_Shift2_Key.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in",
    hasAnswerKey: true
  },
  {
    id: "pyq-cet-grad-2023-s1",
    examTitle: "RSMSSB समान पात्रता परीक्षा (CET) स्नातक स्तर 2023 - 07 जनवरी प्रथम पारी मास्टर पेपर",
    board: "RSMSSB",
    year: 2023,
    stage: "Official Master Question Paper (Full 150 Qs)",
    shift: "07 जनवरी 2023 (पारी-I)",
    questionsCount: 150,
    fileSize: "5.1 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_Grad_2023_07Jan_Shift1_Master.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_Grad_2023_07Jan_Shift1_Final_Key.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_Grad_2023_07Jan_Shift1.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_Grad_2023_07Jan_Shift1_Key.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in",
    hasAnswerKey: true
  },

  // =========================================================================
  // 2. समान पात्रता परीक्षा (CET) - 12वीं स्तर (All Shifts 2024 & 2023)
  // =========================================================================
  {
    id: "pyq-cet-12th-2024-s1",
    examTitle: "RSMSSB CET 12वीं स्तर (Senior Secondary) 2024 - 22 अक्टूबर Shift 1 मास्टर पेपर",
    board: "RSMSSB",
    year: 2024,
    stage: "Official Master Question Paper (Full 150 Qs)",
    shift: "22 अक्टूबर 2024 (मॉर्निंग शिफ्ट)",
    questionsCount: 150,
    fileSize: "4.2 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_12th_2024_22Oct_Shift1_Master_QP.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_12th_2024_22Oct_Shift1_Final_AnswerKey.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_12th_2024_22Oct_Shift1.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_12th_2024_22Oct_Shift1_Key.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in",
    hasAnswerKey: true
  },
  {
    id: "pyq-cet-12th-2024-s2",
    examTitle: "RSMSSB CET 12वीं स्तर (Senior Secondary) 2024 - 23 अक्टूबर Shift 1 मास्टर पेपर",
    board: "RSMSSB",
    year: 2024,
    stage: "Official Master Question Paper (Full 150 Qs)",
    shift: "23 अक्टूबर 2024 (मॉर्निंग शिफ्ट)",
    questionsCount: 150,
    fileSize: "4.3 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_12th_2024_23Oct_Shift1_Master_QP.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_12th_2024_23Oct_Shift1_Final_AnswerKey.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_12th_2024_23Oct_Shift1.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_12th_2024_23Oct_Shift1_Key.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in",
    hasAnswerKey: true
  },
  {
    id: "pyq-cet-12th-2024-s3",
    examTitle: "RSMSSB CET 12वीं स्तर (Senior Secondary) 2024 - 24 अक्टूबर Shift 1 मास्टर पेपर",
    board: "RSMSSB",
    year: 2024,
    stage: "Official Master Question Paper (Full 150 Qs)",
    shift: "24 अक्टूबर 2024 (मॉर्निंग शिफ्ट)",
    questionsCount: 150,
    fileSize: "4.1 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_12th_2024_24Oct_Shift1_Master_QP.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_12th_2024_24Oct_Shift1_Final_AnswerKey.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_12th_2024_24Oct_Shift1.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_12th_2024_24Oct_Shift1_Key.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in",
    hasAnswerKey: true
  },
  {
    id: "pyq-cet-12th-2023-s1",
    examTitle: "RSMSSB CET 12वीं स्तर 2023 - 04 फरवरी प्रथम पारी मास्टर प्रश्न-पत्र",
    board: "RSMSSB",
    year: 2023,
    stage: "Official Master Question Paper (Full 150 Qs)",
    shift: "04 फरवरी 2023 (पारी-I)",
    questionsCount: 150,
    fileSize: "4.5 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_12th_2023_04Feb_Shift1_Master.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/CET_12th_2023_04Feb_Shift1_Final_Key.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_12th_2023_04Feb.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/CET_12th_2023_04Feb_Key.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in",
    hasAnswerKey: true
  },

  // =========================================================================
  // 3. राजस्थान पटवारी सीधी भर्ती (All Shifts 104A, 104B, 104C, 104D)
  // =========================================================================
  {
    id: "pyq-patwar-2021-m104a",
    examTitle: "RSMSSB पटवार सीधी भर्ती परीक्षा 2021 - 23 अक्टूबर Shift 1 (मास्टर कोड 104A)",
    board: "RSMSSB",
    year: 2021,
    stage: "Official Master Question Paper (Full 150 Qs)",
    shift: "23 अक्टूबर 2021 (प्रथम पारी)",
    questionsCount: 150,
    fileSize: "4.6 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/Patwari_2021_23Oct_Shift1_Master_QP.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/Patwari_2021_23Oct_Shift1_Final_AnswerKey.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Patwar_2021_Master_104A.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Patwar_2021_Final_Key_104A.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in",
    hasAnswerKey: true
  },
  {
    id: "pyq-patwar-2021-m104b",
    examTitle: "RSMSSB पटवार सीधी भर्ती परीक्षा 2021 - 23 अक्टूबर Shift 2 (मास्टर कोड 104B)",
    board: "RSMSSB",
    year: 2021,
    stage: "Official Master Question Paper (Full 150 Qs)",
    shift: "23 अक्टूबर 2021 (द्वितीय पारी)",
    questionsCount: 150,
    fileSize: "4.7 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/Patwari_2021_23Oct_Shift2_Master_QP.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/Patwari_2021_23Oct_Shift2_Final_AnswerKey.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Patwar_2021_Master_104B.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Patwar_2021_Final_Key_104B.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in",
    hasAnswerKey: true
  },
  {
    id: "pyq-patwar-2021-m104c",
    examTitle: "RSMSSB पटवार सीधी भर्ती परीक्षा 2021 - 24 अक्टूबर Shift 1 (मास्टर कोड 104C)",
    board: "RSMSSB",
    year: 2021,
    stage: "Official Master Question Paper (Full 150 Qs)",
    shift: "24 अक्टूबर 2021 (तृतीय पारी)",
    questionsCount: 150,
    fileSize: "4.5 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/Patwari_2021_24Oct_Shift1_Master_QP.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/Patwari_2021_24Oct_Shift1_Final_AnswerKey.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Patwar_2021_Master_104C.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Patwar_2021_Final_Key_104C.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in",
    hasAnswerKey: true
  },
  {
    id: "pyq-patwar-2021-m104d",
    examTitle: "RSMSSB पटवार सीधी भर्ती परीक्षा 2021 - 24 अक्टूबर Shift 2 (मास्टर कोड 104D)",
    board: "RSMSSB",
    year: 2021,
    stage: "Official Master Question Paper (Full 150 Qs)",
    shift: "24 अक्टूबर 2021 (चतुर्थ पारी)",
    questionsCount: 150,
    fileSize: "4.6 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/Patwari_2021_24Oct_Shift2_Master_QP.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/Patwari_2021_24Oct_Shift2_Final_AnswerKey.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Patwar_2021_Master_104D.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Patwar_2021_Final_Key_104D.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in",
    hasAnswerKey: true
  },

  // =========================================================================
  // 4. राजस्थान पुलिस कांस्टेबल भर्ती (All Shifts 2022)
  // =========================================================================
  {
    id: "pyq-police-constable-2022-s1",
    examTitle: "राजस्थान पुलिस कांस्टेबल भर्ती परीक्षा 2022 - 13 मई Shift 1 मास्टर प्रश्न-पत्र",
    board: "Police",
    year: 2022,
    stage: "Official Written Master Paper (Full 150 Qs)",
    shift: "13 मई 2022 (मॉर्निंग शिफ्ट)",
    questionsCount: 150,
    fileSize: "4.3 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/Raj_Police_Constable_13May2022_Shift1_Master.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/Raj_Police_Constable_13May2022_Shift1_AnswerKey.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Police_Constable_2022_Shift1.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Police_Constable_2022_Key_Shift1.pdf",
    officialSourcePortal: "https://police.rajasthan.gov.in",
    hasAnswerKey: true
  },
  {
    id: "pyq-police-constable-2022-s2",
    examTitle: "राजस्थान पुलिस कांस्टेबल भर्ती परीक्षा 2022 - 14 मई Shift 1 मास्टर प्रश्न-पत्र",
    board: "Police",
    year: 2022,
    stage: "Official Written Master Paper (Full 150 Qs)",
    shift: "14 मई 2022 (मॉर्निंग शिफ्ट)",
    questionsCount: 150,
    fileSize: "4.4 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/Raj_Police_Constable_14May2022_Shift1_Master.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/Raj_Police_Constable_14May2022_Shift1_AnswerKey.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Police_Constable_2022_Shift2.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Police_Constable_2022_Key_Shift2.pdf",
    officialSourcePortal: "https://police.rajasthan.gov.in",
    hasAnswerKey: true
  },

  // =========================================================================
  // 5. पशु परिचारक (Animal Attendant 2024/2025)
  // =========================================================================
  {
    id: "pyq-pashu-parichar-2024",
    examTitle: "RSMSSB पशु परिचर (Animal Attendant) भर्ती - अधिकृत मॉडल मास्टर प्रश्न-पत्र (भाग अ + ब)",
    board: "RSMSSB",
    year: 2024,
    stage: "Official Model Master Paper (भाग अ + भाग ब 150 Qs)",
    shift: "दिसंबर 2024 सत्र (105 Qs GK/Maths/Sci + 45 Qs Animal Husbandry)",
    questionsCount: 150,
    fileSize: "3.9 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/RSMSSB_Pashu_Paricharak_Master_Paper_2024.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/RSMSSB_Pashu_Paricharak_Master_Key_2024.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Animal_Attendant_Master_Paper.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Animal_Attendant_Master_Key.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in",
    hasAnswerKey: true
  },

  // =========================================================================
  // 6. RPSC आरएएस प्रारंभिक परीक्षा (RAS Prelims 2023, 2021, 2018)
  // =========================================================================
  {
    id: "pyq-ras-pre-2023",
    examTitle: "RPSC RAS / RTS संयुक्त प्रतियोगी (प्रारंभिक) परीक्षा 2023 - मास्टर प्रश्न-पत्र",
    board: "RPSC",
    year: 2023,
    stage: "Official Master Question Paper (Full 150 Qs)",
    shift: "01 अक्टूबर 2023 (एकल सत्र 200 अंक)",
    questionsCount: 150,
    fileSize: "5.4 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/RPSC_RAS_Prelims_2023_Master_Question_Paper.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/RPSC_RAS_Prelims_2023_Final_Answer_Key.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/RAS_Pre_2023_Master.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/RAS_Pre_2023_Final_Key.pdf",
    officialSourcePortal: "https://rpsc.rajasthan.gov.in",
    hasAnswerKey: true
  },
  {
    id: "pyq-ras-pre-2021",
    examTitle: "RPSC RAS / RTS संयुक्त प्रतियोगी (प्रारंभिक) परीक्षा 2021 - मास्टर प्रश्न-पत्र",
    board: "RPSC",
    year: 2021,
    stage: "Official Master Question Paper (Full 150 Qs)",
    shift: "27 अक्टूबर 2021 (एकल सत्र 200 अंक)",
    questionsCount: 150,
    fileSize: "5.2 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/RPSC_RAS_Prelims_2021_Master_Question_Paper.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/RPSC_RAS_Prelims_2021_Final_Answer_Key.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/RAS_Pre_2021_Master.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/RAS_Pre_2021_Final_Key.pdf",
    officialSourcePortal: "https://rpsc.rajasthan.gov.in",
    hasAnswerKey: true
  },

  // =========================================================================
  // 7. RPSC वरिष्ठ अध्यापक (2nd Grade Teacher) 2022
  // =========================================================================
  {
    id: "pyq-second-grade-gk-2022-ga",
    examTitle: "RPSC वरिष्ठ अध्यापक (2nd Grade Teacher) परीक्षा 2022 - सामान्य ज्ञान Paper 1 (Group A)",
    board: "RPSC",
    year: 2022,
    stage: "Official Master Question Paper (Full 100 Qs)",
    shift: "21 दिसंबर 2022 (Group A मॉर्निंग)",
    questionsCount: 100,
    fileSize: "3.7 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/RPSC_2nd_Grade_2022_GroupA_GK_Master_QP.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/RPSC_2nd_Grade_2022_GroupA_GK_Final_Key.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/2nd_Grade_2022_GK_GroupA.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/2nd_Grade_2022_GK_Key_GroupA.pdf",
    officialSourcePortal: "https://rpsc.rajasthan.gov.in",
    hasAnswerKey: true
  },
  {
    id: "pyq-second-grade-gk-2022-gb",
    examTitle: "RPSC वरिष्ठ अध्यापक (2nd Grade Teacher) परीक्षा 2022 - सामान्य ज्ञान Paper 1 (Group B)",
    board: "RPSC",
    year: 2022,
    stage: "Official Master Question Paper (Full 100 Qs)",
    shift: "22 दिसंबर 2022 (Group B मॉर्निंग)",
    questionsCount: 100,
    fileSize: "3.8 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/RPSC_2nd_Grade_2022_GroupB_GK_Master_QP.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/RPSC_2nd_Grade_2022_GroupB_GK_Final_Key.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/2nd_Grade_2022_GK_GroupB.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/2nd_Grade_2022_GK_Key_GroupB.pdf",
    officialSourcePortal: "https://rpsc.rajasthan.gov.in",
    hasAnswerKey: true
  },

  // =========================================================================
  // 8. RSMSSB प्रयोगशाला सहायक (Lab Assistant 2022 Science & Geography)
  // =========================================================================
  {
    id: "pyq-lab-assistant-2022-p1",
    examTitle: "RSMSSB प्रयोगशाला सहायक (Lab Assistant Science) 2022 - पेपर-1 (सामान्य ज्ञान व मनोविज्ञान)",
    board: "RSMSSB",
    year: 2022,
    stage: "Official Master Question Paper (Full 100 Qs)",
    shift: "28 जून 2022 (मॉर्निंग शिफ्ट)",
    questionsCount: 100,
    fileSize: "3.6 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/Lab_Assistant_2022_Paper1_GK_Master_QP.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/Lab_Assistant_2022_Paper1_GK_Final_Key.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Lab_Assistant_2022_P1_Master.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Lab_Assistant_2022_P1_Key.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in",
    hasAnswerKey: true
  },
  {
    id: "pyq-lab-assistant-2022-p2",
    examTitle: "RSMSSB प्रयोगशाला सहायक (Lab Assistant Science) 2022 - पेपर-2 (भौतिक, रसायन व जीव विज्ञान)",
    board: "RSMSSB",
    year: 2022,
    stage: "Official Master Question Paper (Full 100 Qs)",
    shift: "29 जून 2022 (मॉर्निंग शिफ्ट)",
    questionsCount: 100,
    fileSize: "4.1 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/Lab_Assistant_2022_Paper2_Science_Master_QP.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/Lab_Assistant_2022_Paper2_Science_Final_Key.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Lab_Assistant_2022_P2_Master.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Lab_Assistant_2022_P2_Key.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in",
    hasAnswerKey: true
  },
  {
    id: "pyq-vdo-mains-2022",
    examTitle: "RSMSSB ग्राम विकास अधिकारी (VDO) मुख्य भर्ती परीक्षा 2022 - मास्टर प्रश्न-पत्र",
    board: "RSMSSB",
    year: 2022,
    stage: "Official Mains Master Question Paper (Full 160 Qs)",
    shift: "09 जुलाई 2022",
    questionsCount: 160,
    fileSize: "5.2 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/VDO_Mains_2022_Master_Paper.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/VDO_Mains_2022_Final_Key.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/VDO_Mains_2022_Master.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/VDO_Mains_2022_Key.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in",
    hasAnswerKey: true
  },
  {
    id: "pyq-police-si-2021",
    examTitle: "RPSC सब-इंस्पेक्टर / प्लाटून कमांडर (Police SI) परीक्षा 2021 - सामान्य हिन्दी (Paper 1)",
    board: "RPSC",
    year: 2021,
    stage: "Official Master Question Paper (Full 100 Qs)",
    shift: "13 सितंबर 2021",
    questionsCount: 100,
    fileSize: "3.5 MB",
    masterPaperUrl: "https://archive.org/download/rajasthan-pyqs-archive/RPSC_Police_SI_2021_Hindi.pdf",
    answerKeyUrl: "https://archive.org/download/rajasthan-pyqs-archive/RPSC_Police_SI_2021_Hindi_Key.pdf",
    mirrorPaperUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Police_SI_2021_Hindi_Master.pdf",
    mirrorAnswerKeyUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/pyqs/Police_SI_2021_Hindi_Key.pdf",
    officialSourcePortal: "https://rpsc.rajasthan.gov.in",
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
  board: 'RSMSSB' | 'RPSC' | 'Police';
  department: string;
  summary: string;
  keyDetails: CircularDetail[];
  fileSize: string;
  isNew: boolean;
  isUrgent: boolean;
  linkText: string;
  downloadUrl?: string;
  mirrorUrl?: string;
  pdfUrl?: string;
  mirrorPdfUrl?: string;
  officialSourcePortal?: string;
}

export const PORTAL_NOTIFICATIONS: PortalNotification[] = [
  {
    id: "notif-rsmssb-calendar-2025",
    circularNo: "प.14(70)प.क/आरएसएसबी/परीक्षा/2025/104",
    date: "15 जनवरी 2025",
    tag: "परीक्षा तिथि",
    title: "RSMSSB संशोधित वार्षिक परीक्षा कैलेंडर 2025-2026 - आगामी परीक्षाओं की अधिकृत समय-सारणी",
    board: "RSMSSB",
    department: "राजस्थान कर्मचारी चयन बोर्ड, जयपुर",
    summary: "वर्ष 2025-26 में आयोजित होने वाली पटवार भर्ती, पशु परिचर, कनिष्ठ अनुदेशक, सीईटी (स्नातक व 12वीं) एवं महिला सुपरवाइजर सहित 18 प्रमुख भर्ती परीक्षाओं की तिथिवार आधिकारिक समय-सारणी।",
    keyDetails: [
      { label: "कैलेंडर सत्र", value: "2025 - 2026" },
      { label: "कुल परीक्षाएं", value: "18 प्रमुख सीधी भर्तियां" },
      { label: "निरीक्षण नियम", value: "बायोमेट्रिक व 5वां विकल्प अनिवार्य" },
      { label: "बोर्ड स्थिति", value: "आधिकारिक अधिसूचना जारी" }
    ],
    fileSize: "1.4 MB",
    isNew: true,
    isUrgent: true,
    linkText: "आधिकारिक परीक्षा कैलेंडर (PDF)",
    downloadUrl: "https://rssb.rajasthan.gov.in/Static/files/Exam_Calendar_2025_26_Official.pdf",
    mirrorUrl: "https://archive.org/download/rajasthan-recruitment-pyqs/RSMSSB_Calendar_2025_26.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in"
  },
  {
    id: "notif-rsmssb-patwar-2025",
    circularNo: "प.14(88)प.क/आरएसएसबी/पटवार/2025/219",
    date: "08 जनवरी 2025",
    tag: "नई भर्ती",
    title: "राजस्व मंडल राजस्थान (अजमेर) - पटवार सीधी भर्ती 2025 विस्तृत विज्ञापन एवं चयन योजना",
    board: "RSMSSB",
    department: "राजस्व विभाग, राजस्थान सरकार",
    summary: "गैर-अनुसूचित क्षेत्र एवं अनुसूचित क्षेत्र के कुल 3,820 रिक्त पदों पर सीधी भर्ती हेतु शैक्षणिक अर्हता, न्यूनतम आयु सीमा, CET कट-ऑफ एवं ऑनलाइन आवेदन दिशा-निर्देश।",
    keyDetails: [
      { label: "कुल रिक्त पद", value: "3,820 पद" },
      { label: "अनिवार्य योग्यता", value: "स्नातक + RSCIT / समकक्ष कंप्यूटर डिप्लोमा" },
      { label: "वेतनमान", value: "पे मैट्रिक्स लेवल L-5" },
      { label: "परीक्षा पैटर्न", value: "150 प्रश्न (300 अंक) - 1/3 नेगेटिव" }
    ],
    fileSize: "2.1 MB",
    isNew: true,
    isUrgent: true,
    linkText: "विस्तृत भर्ती विज्ञप्ति (PDF)",
    downloadUrl: "https://rssb.rajasthan.gov.in/Static/files/Patwar_Bharti_2025_Detailed_Advt.pdf",
    mirrorUrl: "https://archive.org/download/rajasthan-recruitment-pyqs/Patwar_2025_Detailed_Notification.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in"
  },
  {
    id: "notif-rpsc-ras-2024-25",
    circularNo: "वि.सं. 07/परीक्षा/आरएएस-आरटीएस/2024-25",
    date: "28 दिसंबर 2024",
    tag: "नई भर्ती",
    title: "RPSC RAS / RTS संयुक्त प्रतियोगी परीक्षा 2024-25 - राज्य एवं अधीनस्थ सेवाओं की अधिसूचना",
    board: "RPSC",
    department: "कार्मिक (क-2) विभाग, राजस्थान सरकार",
    summary: "राजस्थान प्रशासनिक सेवा (RAS), राजस्थान पुलिस सेवा (RPS), राजस्थान लेखा सेवा सहित कुल 905+ प्रशासनिक पदों पर चयन हेतु विस्तृत पाठ्यक्रम, प्रारंभिक परीक्षा प्रारूप एवं पद वर्गीकरण।",
    keyDetails: [
      { label: "प्रशासनिक पद", value: "905+ रिक्तियां" },
      { label: "आयु सीमा", value: "21 से 40 वर्ष (छूट नियमानुसार)" },
      { label: "प्रीलिम्स प्रारूप", value: "सामान्य ज्ञान एवं सामान्य विज्ञान (200 अंक)" },
      { label: "5वां विकल्प नियम", value: "अनुत्तरित प्रश्न पर Option E अनिवार्य" }
    ],
    fileSize: "3.4 MB",
    isNew: true,
    isUrgent: false,
    linkText: "आधिकारिक RAS विज्ञप्ति (PDF)",
    downloadUrl: "https://rpsc.rajasthan.gov.in/Static/files/RAS_RTS_2024_25_Detailed_Advt.pdf",
    mirrorUrl: "https://archive.org/download/rajasthan-recruitment-pyqs/RAS_2024_25_Notification.pdf",
    officialSourcePortal: "https://rpsc.rajasthan.gov.in"
  },
  {
    id: "notif-rsmssb-cet-scorecard",
    circularNo: "प.14(52)प.क/आरएसएसबी/सीईटी/2024/1840",
    date: "18 दिसंबर 2024",
    tag: "परिणाम",
    title: "समान पात्रता परीक्षा (CET स्नातक एवं 12th स्तर) - प्राप्तांक स्कोरकार्ड एवं 15 गुणा चयन नियम",
    board: "RSMSSB",
    department: "गोपनीय एवं मूल्यांकन प्रकोष्ठ, RSMSSB",
    summary: "सीईटी परीक्षाओं के सामान्यीकृत प्राप्तांक (Normalized Score), वर्गवार कट-ऑफ एवं आगामी पदों (पटवारी, कनिष्ठ सहायक, पर्यवेक्षक) हेतु 15 गुणा मुख्य परीक्षा आमंत्रण का फॉर्मूला जारी।",
    keyDetails: [
      { label: "स्कोरकार्ड वैधता", value: "1 वर्ष (जारी तिथि से)" },
      { label: "15 गुणा नियम", value: "विज्ञापित पदों के 15 गुणा वर्गवार अभ्यर्थी" },
      { label: "डाउनलोड माध्यम", value: "SSO Recruitment Portal" },
      { label: "आपत्ति निस्तारण", value: "संशोधित अंतिम उत्तर कुंजी लागू" }
    ],
    fileSize: "980 KB",
    isNew: false,
    isUrgent: false,
    linkText: "स्कोरकार्ड व कट-ऑफ दिशा-निर्देश (PDF)",
    downloadUrl: "https://rssb.rajasthan.gov.in/Static/files/CET_Scorecard_Formula_2025.pdf",
    mirrorUrl: "https://archive.org/download/rajasthan-recruitment-pyqs/CET_2025_Scorecard_Notice.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in"
  },
  {
    id: "notif-police-constable-2025",
    circularNo: "क्रमांक: पु.मु./भर्ती/कांस्टेबल/2025/890",
    date: "10 दिसंबर 2024",
    tag: "परीक्षा तिथि",
    title: "राजस्थान पुलिस कांस्टेबल भर्ती 2024-25 - शारीरिक दक्षता (PET/PST) एवं CBT परीक्षा कार्यक्रम",
    board: "Police",
    department: "पुलिस मुख्यालय (PHQ), राजस्थान, जयपुर",
    summary: "कांस्टेबल सामान्य, चालक, घुड़सवार व श्वानदल पदों हेतु शारीरिक दक्षता एवं कम्प्यूटर आधारित परीक्षा (CBT) का जिला-वार कार्यक्रम एवं प्रवेश पत्र दिशा-निर्देश।",
    keyDetails: [
      { label: "परीक्षा चरण", value: "PET/PST शारीरिक दक्षता + CBT लिखित" },
      { label: "CBT अंक विभाजन", value: "150 प्रश्न (150 अंक, 2 घंटे)" },
      { label: "दौड़ मापदंड", value: "पुरुष 5 किमी 25 मिनट, महिला 35 मिनट" },
      { label: "नेगेटिव मार्किंग", value: "25% (1/4 अंक)" }
    ],
    fileSize: "1.1 MB",
    isNew: true,
    isUrgent: false,
    linkText: "पुलिस मुख्यालय परिपत्र (PDF)",
    downloadUrl: "https://police.rajasthan.gov.in/Static/files/Constable_Recruitment_Schedule_2025.pdf",
    mirrorUrl: "https://archive.org/download/rajasthan-recruitment-pyqs/Raj_Police_Constable_Schedule_2025.pdf",
    officialSourcePortal: "https://police.rajasthan.gov.in"
  },
  {
    id: "notif-rpsc-teacher-2025",
    circularNo: "वि.सं. 08/मा.शि./आरपीएससी/2025-26",
    date: "02 दिसंबर 2024",
    tag: "नई भर्ती",
    title: "माध्यमिक शिक्षा विभाग प्राध्यापक (1st Grade) एवं वरिष्ठ अध्यापक (2nd Grade) भर्ती 2025",
    board: "RPSC",
    department: "माध्यमिक शिक्षा अनुभाग, RPSC अजमेर",
    summary: "स्कूल लेक्चरर एवं 2nd Grade शिक्षक के 4,500+ पदों हेतु विस्तृत विषय-वार वर्गीकरण, अनिवार्य B.Ed/शिक्षा शास्त्री योग्यता एवं संशोधित पाठ्यक्रम।",
    keyDetails: [
      { label: "कुल पद", value: "4,500+ पद (24 ऐच्छिक विषय)" },
      { label: "शैक्षणिक अर्हता", value: "स्नातकोत्तर (PG) / स्नातक + B.Ed" },
      { label: "अंक योजना", value: "पेपर 1: 150 अंक (GK), पेपर 2: 300 अंक (विषय)" },
      { label: "न्यूनतम उत्तीर्णांक", value: "प्रत्येक पेपर में 40% (SC/ST 35%)" }
    ],
    fileSize: "2.6 MB",
    isNew: false,
    isUrgent: false,
    linkText: "विस्तृत शिक्षक भर्ती अधिसूचना (PDF)",
    downloadUrl: "https://rpsc.rajasthan.gov.in/Static/files/Teacher_Recruitment_Detailed_2025.pdf",
    mirrorUrl: "https://archive.org/download/rajasthan-recruitment-pyqs/RPSC_Teacher_2025_Advt.pdf",
    officialSourcePortal: "https://rpsc.rajasthan.gov.in"
  },
  {
    id: "notif-rsmssb-pashu-parichar-admit",
    circularNo: "प.14(65)प.क/आरएसएसबी/पशुपालन/2024/1620",
    date: "25 नवंबर 2024",
    tag: "प्रवेश पत्र",
    title: "पशु परिचर (Animal Attendant) सीधी भर्ती परीक्षा - ई-प्रवेश पत्र एवं OMR 5वां विकल्प नियम",
    board: "RSMSSB",
    department: "पशुपालन विभाग, राजस्थान सरकार",
    summary: "कुल 5,934 पदों हेतु आयोजित परीक्षा के ई-प्रवेश पत्र डाउनलोड करने, ड्रेस कोड, पहचान पत्र सत्यापन एवं OMR में 5वें विकल्प भरने के अनिवार्य नियम।",
    keyDetails: [
      { label: "कुल पद", value: "5,934 पद" },
      { label: "प्रवेश पत्र माध्यम", value: "SSO पोर्टल एवं आधिकारिक वेबसाइट" },
      { label: "OMR 5वां विकल्प", value: "प्रश्नों में कोई एक गोला भरना अनिवार्य" },
      { label: "ड्रेस कोड", value: "पारदर्शी कलम, कोई मेटल वस्तु अनुमत नहीं" }
    ],
    fileSize: "1.2 MB",
    isNew: true,
    isUrgent: true,
    linkText: "प्रवेश पत्र एवं OMR निर्देश (PDF)",
    downloadUrl: "https://rssb.rajasthan.gov.in/Static/files/Animal_Attendant_AdmitCard_Instructions.pdf",
    mirrorUrl: "https://archive.org/download/rajasthan-recruitment-pyqs/Animal_Attendant_Admit_Card_Notice.pdf",
    officialSourcePortal: "https://rssb.rajasthan.gov.in"
  }
];

export const BREAKING_TICKER = [
  "⚡ 'युवा शिक्षा पोर्टल' (नई सोच, नई पहल) — रूपसिंह फनात की ओर से युवाओं को समर्पित • आइए मिलकर कल को और बेहतर बनाते हैं",
  "📢 RSMSSB परीक्षा कैलेंडर 2025-2026: पशु परिचर, पटवार, कनिष्ठ अनुदेशक व सीईटी परीक्षाओं का आधिकारिक समय-सारणी जारी",
  "🎯 RPSC RAS / RTS एवं 1st / 2nd Grade शिक्षक भर्ती 2025 हेतु अद्यतन प्रश्न-बैंक एवं मॉडल टेस्ट 'तैयारी' अनुभाग में लाइव",
  "📝 RPSC/RSMSSB 5वें विकल्प (Option E: अनुत्तरित प्रश्न) नियम के साथ नवीनतम 100% प्रामाणिक CBT टेस्ट सीरीज उपलब्ध",
  "📥 2021 से 2024 तक के समस्त RPSC एवं RSMSSB आधिकारिक मास्टर प्रश्न-पत्र (100-150 प्रश्न) एवं फाइनल आंसर-की डाउनलोड हेतु उपलब्ध"
];
