import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  limit,
  onSnapshot,
  Unsubscribe 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { CBT_MOCK_TEST_CET, CbtQuestion, getExamQuestions, FULL_100_CBT_QUESTIONS } from '@/data/cbtExamData';
import { PRACTICE_QUESTIONS } from '@/data/practiceQuestionsData';
import { PREVIOUS_PAPERS_DATA, PORTAL_NOTIFICATIONS, PreviousPaper } from '@/data/portalData';
import { RAJASTHAN_EXAMS_DIRECTORY as RAJASTHAN_EXAMS, RajasthanExam } from '@/data/rajasthanExams';
import { AUTHENTIC_STUDY_NOTES, StudyNoteTopic } from '@/data/notesData';
import { RAJASTHAN_REVISION_NOTES, RevisionNote } from '@/data/rajasthanNotesData';

export interface MockTestModel {
  id: string;
  title: string;
  examBoard: 'RSMSSB' | 'RPSC';
  examCategory: string;
  totalQuestions: number;
  durationMinutes: number;
  totalMarks: number;
  negativeMarking: string;
  hasFifthOption: boolean;
  createdAt?: any;
}

export interface QuestionModel {
  id: string;
  testId: string;
  qNumber: number;
  subject: string;
  questionHindi: string;
  questionEnglish: string;
  options: {
    key: string;
    hindi: string;
    english: string;
  }[];
  correctOption: string;
  explanationHindi: string;
  explanationEnglish?: string;
}

export interface SubjectStrengthReport {
  subject: string;
  total: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  accuracy: number;
  status: 'Strong' | 'Average' | 'Needs Improvement';
}

export interface StudentTestHistory {
  id?: string;
  attemptId: string;
  studentId: string;
  studentName: string;
  testId: string;
  testTitle: string;
  examBoard: string;
  score: number;
  totalMarks: number;
  percentage: number;
  totalAttempted: number;
  correctCount: number;
  incorrectCount: number;
  negativeMarksDeducted: number;
  unattemptedCount: number;
  fifthOptionCount: number;
  accuracy: number;
  timeTakenSeconds: number;
  submittedAt: string;
  subjectStrengths: SubjectStrengthReport[];
  answers: Record<number, string | number>;
  isSyncedToCloud?: boolean;
}

const LOCAL_STORAGE_HISTORIES_KEY = 'taiyari_student_test_histories_v1';
const LOCAL_STORAGE_STUDENT_ID_KEY = 'taiyari_anonymous_student_id';

// Helper to get or create persistent anonymous student ID
export const getOrCreateStudentId = (): string => {
  if (typeof window === 'undefined') return 'student_demo_default';
  let sId = localStorage.getItem(LOCAL_STORAGE_STUDENT_ID_KEY);
  if (!sId) {
    sId = 'std_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
    localStorage.setItem(LOCAL_STORAGE_STUDENT_ID_KEY, sId);
  }
  return sId;
};

// =========================================================================
// 1. SAVE STUDENT TEST HISTORY (FIREBASE + LOCAL 4G OFFLINE PERSISTENCE)
// =========================================================================
export async function saveStudentTestHistory(
  history: Omit<StudentTestHistory, 'id'>
): Promise<{ success: boolean; id: string; cloudSynced: boolean }> {
  const attemptId = history.attemptId || `att_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const recordWithMeta: StudentTestHistory = {
    ...history,
    attemptId,
    id: attemptId,
    submittedAt: history.submittedAt || new Date().toISOString(),
    isSyncedToCloud: false,
  };

  // 1. Always save immediately to LocalStorage for low-bandwidth 4G instant speed
  try {
    if (typeof window !== 'undefined') {
      const existingStr = localStorage.getItem(LOCAL_STORAGE_HISTORIES_KEY);
      const list: StudentTestHistory[] = existingStr ? JSON.parse(existingStr) : [];
      // Prepend the latest attempt
      const updatedList = [recordWithMeta, ...list.filter(item => item.attemptId !== attemptId)].slice(0, 30);
      localStorage.setItem(LOCAL_STORAGE_HISTORIES_KEY, JSON.stringify(updatedList));
    }
  } catch (err) {
    console.warn('LocalStorage save error (storage quota):', err);
  }

  // 2. Sync to Cloud Firestore if connected
  let cloudSynced = false;
  if (db && isFirebaseConfigured()) {
    try {
      const docRef = doc(db, 'student_test_histories', attemptId);
      await setDoc(docRef, {
        ...recordWithMeta,
        createdAt: serverTimestamp(),
      });
      cloudSynced = true;
      recordWithMeta.isSyncedToCloud = true;

      // Update local storage flag
      if (typeof window !== 'undefined') {
        const existingStr = localStorage.getItem(LOCAL_STORAGE_HISTORIES_KEY);
        if (existingStr) {
          const list: StudentTestHistory[] = JSON.parse(existingStr);
          const updated = list.map(item => item.attemptId === attemptId ? { ...item, isSyncedToCloud: true } : item);
          localStorage.setItem(LOCAL_STORAGE_HISTORIES_KEY, JSON.stringify(updated));
        }
      }
    } catch (err) {
      console.warn('Firestore cloud sync deferred (offline/network slow). Saved to local cache:', err);
    }
  }

  return { success: true, id: attemptId, cloudSynced };
}

// =========================================================================
// 2. FETCH STUDENT TEST HISTORIES
// =========================================================================
export async function fetchStudentHistories(studentId?: string): Promise<StudentTestHistory[]> {
  const targetStudentId = studentId || getOrCreateStudentId();

  // Try fetching from Firestore first if configured
  if (db && isFirebaseConfigured()) {
    try {
      const q = query(
        collection(db, 'student_test_histories'),
        where('studentId', '==', targetStudentId),
        orderBy('submittedAt', 'desc'),
        limit(20)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const cloudList: StudentTestHistory[] = [];
        snapshot.forEach(docSnap => {
          cloudList.push({ id: docSnap.id, ...(docSnap.data() as any) });
        });
        return cloudList;
      }
    } catch (err) {
      console.warn('Firestore fetch failed, falling back to local cache:', err);
    }
  }

  // Fallback to local 4G cache
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(LOCAL_STORAGE_HISTORIES_KEY);
    if (cached) {
      try {
        const list: StudentTestHistory[] = JSON.parse(cached);
        return list.filter(item => !item.studentId || item.studentId === targetStudentId);
      } catch {
        return [];
      }
    }
  }

  return [];
}

// =========================================================================
// 3. FETCH MOCK TESTS (FIRESTORE OR LOCAL SEED)
// =========================================================================
export async function fetchMockTests(): Promise<MockTestModel[]> {
  if (db && isFirebaseConfigured()) {
    try {
      const snapshot = await getDocs(collection(db, 'mock_tests'));
      if (!snapshot.empty) {
        const list: MockTestModel[] = [];
        snapshot.forEach(docSnap => {
          list.push({ id: docSnap.id, ...(docSnap.data() as any) });
        });
        return list;
      }
    } catch (err) {
      console.warn('Firestore mock_tests read failed, using static data:', err);
    }
  }

  // Fallback to static mock test suite
  return [
    {
      id: CBT_MOCK_TEST_CET.id,
      title: CBT_MOCK_TEST_CET.title,
      examBoard: CBT_MOCK_TEST_CET.board,
      examCategory: CBT_MOCK_TEST_CET.category,
      totalQuestions: CBT_MOCK_TEST_CET.totalQuestions,
      durationMinutes: CBT_MOCK_TEST_CET.durationMinutes,
      totalMarks: CBT_MOCK_TEST_CET.totalMarks,
      negativeMarking: CBT_MOCK_TEST_CET.negativeMarking,
      hasFifthOption: CBT_MOCK_TEST_CET.hasFifthOption,
    },
    {
      id: 'mock-test-patwar-2024',
      title: 'RSMSSB पटवार सीधी भर्ती 2024-25 फुल लेंथ मॉडल टेस्ट',
      examBoard: 'RSMSSB',
      examCategory: 'राजस्व विभाग सीधी भर्ती',
      totalQuestions: 150,
      durationMinutes: 180,
      totalMarks: 300,
      negativeMarking: '1/3 अंक',
      hasFifthOption: true,
    },
    {
      id: 'mock-test-ras-pre-2025',
      title: 'RPSC RAS/RTS संयुक्त प्रतियोगी (प्रारंभिक) परीक्षा 2025 टेस्ट',
      examBoard: 'RPSC',
      examCategory: 'राजस्थान राज्य एवं अधीनस्थ सेवाएं',
      totalQuestions: 150,
      durationMinutes: 180,
      totalMarks: 200,
      negativeMarking: '1/3 अंक',
      hasFifthOption: true,
    }
  ];
}

// =========================================================================
// 4. FETCH TEST QUESTIONS (FIRESTORE OR LOCAL SEED)
// =========================================================================
export async function fetchTestQuestions(testId: string): Promise<CbtQuestion[]> {
  if (db && isFirebaseConfigured()) {
    try {
      const q = query(
        collection(db, 'questions'),
        where('testId', '==', testId)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const list: CbtQuestion[] = [];
        snapshot.forEach(docSnap => {
          list.push(docSnap.data() as CbtQuestion);
        });
        return list.sort((a, b) => a.id - b.id);
      }
    } catch (err) {
      console.warn('Firestore questions fetch failed, using local seed questions:', err);
    }
  }

  // Return exam-specific authentic questions matching blueprint
  return getExamQuestions(testId);
}

// =========================================================================
// 5. SEED INITIAL MOCK TESTS, QUESTIONS, PYQS, NOTICES, & SYLLABI TO FIRESTORE
// =========================================================================
export async function seedInitialDataToFirestore(): Promise<{ 
  success: boolean; 
  message: string; 
  stats?: {
    mockTests: number;
    questions: number;
    practiceQuestions: number;
    pyqs: number;
    notifications: number;
    syllabi: number;
  };
}> {
  if (!db || !isFirebaseConfigured()) {
    return { 
      success: false, 
      message: 'Firebase is not yet configured with cloud credentials. Local offline persistence active.' 
    };
  }

  try {
    let mockTestsCount = 0;
    let questionsCount = 0;
    let practiceCount = 0;
    let pyqCount = 0;
    let notifCount = 0;
    let syllabiCount = 0;

    // 1. Seed Mock Tests
    const mockTests = [
      {
        id: CBT_MOCK_TEST_CET.id,
        title: CBT_MOCK_TEST_CET.title,
        examBoard: CBT_MOCK_TEST_CET.board,
        examCategory: CBT_MOCK_TEST_CET.category,
        totalQuestions: CBT_MOCK_TEST_CET.totalQuestions,
        durationMinutes: CBT_MOCK_TEST_CET.durationMinutes,
        totalMarks: CBT_MOCK_TEST_CET.totalMarks,
        negativeMarking: CBT_MOCK_TEST_CET.negativeMarking,
        hasFifthOption: CBT_MOCK_TEST_CET.hasFifthOption,
        subjectBreakdown: CBT_MOCK_TEST_CET.subjectBreakdown,
      },
      {
        id: 'mock-test-patwar-2025',
        title: 'RSMSSB पटवार सीधी भर्ती 2025 फुल लेंथ मॉडल टेस्ट',
        examBoard: 'RSMSSB',
        examCategory: 'राजस्व विभाग सीधी भर्ती',
        totalQuestions: 100,
        durationMinutes: 120,
        totalMarks: 200,
        negativeMarking: '1/3 अंक (0.66 अंक)',
        hasFifthOption: true,
      },
      {
        id: 'mock-test-pashu-parichar-2025',
        title: 'RSMSSB पशु परिचर (Animal Attendant) भर्ती परीक्षा 2025 मॉडल पेपर',
        examBoard: 'RSMSSB',
        examCategory: 'पशुपालन विभाग सीधी भर्ती',
        totalQuestions: 20,
        durationMinutes: 30,
        totalMarks: 20,
        negativeMarking: '1/4 अंक',
        hasFifthOption: true,
      },
      {
        id: 'mock-test-ras-pre-2025',
        title: 'RPSC RAS/RTS संयुक्त प्रतियोगी (प्रारंभिक) परीक्षा 2025 टेस्ट',
        examBoard: 'RPSC',
        examCategory: 'राजस्थान राज्य एवं अधीनस्थ सेवाएं',
        totalQuestions: 100,
        durationMinutes: 120,
        totalMarks: 200,
        negativeMarking: '1/3 अंक',
        hasFifthOption: true,
      },
      {
        id: 'mock-test-police-constable-2025',
        title: 'राजस्थान पुलिस कांस्टेबल भर्ती परीक्षा 2025 सीबीटी टेस्ट',
        examBoard: 'Police',
        examCategory: 'गृह (पुलिस) विभाग',
        totalQuestions: 100,
        durationMinutes: 120,
        totalMarks: 150,
        negativeMarking: '1/4 अंक',
        hasFifthOption: true,
      },
      {
        id: 'mock-test-2nd-grade-2025',
        title: 'RPSC वरिष्ठ अध्यापक (2nd Grade) पेपर-1 सामान्य ज्ञान मॉडल टेस्ट',
        examBoard: 'RPSC',
        examCategory: 'माध्यमिक शिक्षा विभाग',
        totalQuestions: 100,
        durationMinutes: 120,
        totalMarks: 200,
        negativeMarking: '1/3 अंक',
        hasFifthOption: true,
      }
    ];

    for (const test of mockTests) {
      const testDoc = doc(db, 'mock_tests', test.id);
      await setDoc(testDoc, {
        ...test,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      mockTestsCount++;
    }

    // 2. Seed CBT Questions for tests
    const cetQuestions = getExamQuestions('mock-test-cet-grad-2024');
    for (const q of cetQuestions) {
      const qDoc = doc(db, 'questions', `cet_q_${q.id}`);
      await setDoc(qDoc, {
        ...q,
        testId: 'mock-test-cet-grad-2024',
        updatedAt: serverTimestamp(),
      }, { merge: true });
      questionsCount++;
    }

    const pashuQuestions = getExamQuestions('mock-test-pashu-parichar-2025');
    for (const q of pashuQuestions) {
      const qDoc = doc(db, 'questions', `pashu_q_${q.id}`);
      await setDoc(qDoc, {
        ...q,
        testId: 'mock-test-pashu-parichar-2025',
        updatedAt: serverTimestamp(),
      }, { merge: true });
      questionsCount++;
    }

    // 3. Seed Practice Questions collection
    for (const pq of PRACTICE_QUESTIONS) {
      const pqDoc = doc(db, 'practice_questions', `pq_${pq.id}`);
      await setDoc(pqDoc, {
        ...pq,
        publishedAt: serverTimestamp(),
        hasFifthOption: true,
      }, { merge: true });
      practiceCount++;
    }

    // 4. Seed Master PYQs (with original 100-150 question master PDF & answer key links)
    for (const pyq of PREVIOUS_PAPERS_DATA) {
      const pyqDoc = doc(db, 'pyqs', `pyq_${pyq.id}`);
      await setDoc(pyqDoc, {
        ...pyq,
        isOriginalMasterPaper: true,
        publishedAt: serverTimestamp(),
      }, { merge: true });
      pyqCount++;
    }

    // 5. Seed Real 2025-2026 Notifications & Circulars
    for (const notif of PORTAL_NOTIFICATIONS) {
      const notifDoc = doc(db, 'circular_notifications', `notif_${notif.id}`);
      await setDoc(notifDoc, {
        ...notif,
        publishedAt: serverTimestamp(),
      }, { merge: true });
      notifCount++;
    }

    // 6. Seed Official Syllabi with Exact Subject-Wise Marks Distribution
    const SYLLABI_DETAILED_BLUEPRINTS = [
      {
        id: "syllabus_cet_graduate",
        examId: "rssb-cet-grad",
        examNameHindi: "समान पात्रता परीक्षा (CET) स्नातक स्तर",
        board: "RSMSSB",
        totalQuestions: 150,
        totalMarks: 300,
        durationMinutes: 180,
        negativeMarking: "लागू नहीं (पात्रता आधारित)",
        subjectDistribution: [
          { subject: "भारतीय राष्ट्रीय आन्दोलन एवं राजस्थान का इतिहास, कला, संस्कृति, साहित्य", questions: 35, marks: 70 },
          { subject: "भारत एवं राजस्थान का भूगोल", questions: 30, marks: 60 },
          { subject: "राजस्थान पर विशेष बल के साथ भारतीय राजनीतिक एवं प्रशासनिक व्यवस्था", questions: 25, marks: 50 },
          { subject: "भारत एवं राजस्थान की अर्थव्यवस्था", questions: 20, marks: 40 },
          { subject: "दैनिक विज्ञान (General Science) एवं रीजनिंग (Mental Ability)", questions: 20, marks: 40 },
          { subject: "सामान्य हिन्दी एवं General English", questions: 10, marks: 20 },
          { subject: "कम्प्यूटर ज्ञान एवं समसामयिक घटनाएं (Current Affairs)", questions: 10, marks: 20 }
        ],
        officialPdfUrl: "https://archive.org/download/rajasthan-recruitment-pyqs/CET_Graduation_Syllabus.pdf",
        downloadMirrorUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/syllabi/CET_Graduate_Syllabus.pdf",
        isVerified: true
      },
      {
        id: "syllabus_cet_12th",
        examId: "rssb-cet-12th",
        examNameHindi: "समान पात्रता परीक्षा (CET) 12वीं (सीनियर सेकंडरी) स्तर",
        board: "RSMSSB",
        totalQuestions: 150,
        totalMarks: 300,
        durationMinutes: 180,
        negativeMarking: "लागू नहीं (पात्रता आधारित)",
        subjectDistribution: [
          { subject: "राजस्थान का इतिहास, कला, सांस्कृतिक विरासत, साहित्य, परंपराएं व मेले-त्योहार", questions: 35, marks: 70 },
          { subject: "भारत एवं राजस्थान का भूगोल (नवीन 50 जिलों के अनुसार)", questions: 30, marks: 60 },
          { subject: "राजस्थान पर विशेष बल के साथ भारतीय राजनीतिक व्यवस्था", questions: 20, marks: 40 },
          { subject: "दैनिक विज्ञान (Everyday Science)", questions: 20, marks: 40 },
          { subject: "तार्किक विवेचन एवं मानसिक योग्यता (Reasoning)", questions: 15, marks: 30 },
          { subject: "सामान्य हिन्दी", questions: 12, marks: 24 },
          { subject: "General English", questions: 8, marks: 16 },
          { subject: "कम्प्यूटर ज्ञान एवं समसामयिकी (Current Affairs)", questions: 10, marks: 20 }
        ],
        officialPdfUrl: "https://archive.org/download/rajasthan-recruitment-pyqs/CET_12th_Syllabus.pdf",
        downloadMirrorUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/syllabi/CET_12th_Syllabus.pdf",
        isVerified: true
      },
      {
        id: "syllabus_patwari",
        examId: "rssb-patwari",
        examNameHindi: "राजस्थान पटवारी सीधी भर्ती परीक्षा",
        board: "RSMSSB",
        totalQuestions: 150,
        totalMarks: 300,
        durationMinutes: 180,
        negativeMarking: "1/3 अंक प्रति गलत उत्तर (5वां विकल्प नियम लागू)",
        subjectDistribution: [
          { subject: "General Science, History, Polity & Geography of India; General Knowledge, Current Affairs", weightage: "25%", questions: 38, marks: 76 },
          { subject: "Geography, History, Culture and Polity of Rajasthan", weightage: "20%", questions: 30, marks: 60 },
          { subject: "General English & Hindi", weightage: "15%", questions: 22, marks: 44 },
          { subject: "Mental ability and Reasoning, Basic Numerical efficiency", weightage: "30%", questions: 45, marks: 90 },
          { subject: "Basic Computer", weightage: "10%", questions: 15, marks: 30 }
        ],
        officialPdfUrl: "https://archive.org/download/rajasthan-recruitment-pyqs/Patwari_Official_Syllabus.pdf",
        downloadMirrorUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/syllabi/Patwari_Official_Syllabus.pdf",
        isVerified: true
      },
      {
        id: "syllabus_pashu_paricharak",
        examId: "rssb-pashu-parichar",
        examNameHindi: "पशु परिचारक सीधी भर्ती परीक्षा (Animal Attendant)",
        board: "RSMSSB",
        totalQuestions: 150,
        totalMarks: 150,
        durationMinutes: 180,
        negativeMarking: "1/4 अंक (0.25 अंक) प्रति गलत उत्तर",
        subjectDistribution: [
          { part: "भाग 'अ' (भारांक 70%)", subject: "राजस्थान का भूगोल, इतिहास, संस्कृति, दैनिक विज्ञान एवं गणित (माध्यमिक स्तर)", questions: 105, marks: 105 },
          { part: "भाग 'ब' (भारांक 30%)", subject: "पशुपालन, देशी नस्लें, दुग्ध दोहन, कृत्रिम गर्भाधान, पशु रोग, टीकाकरण, चारा एवं पशु गणना", questions: 45, marks: 45 }
        ],
        officialPdfUrl: "https://archive.org/download/rajasthan-recruitment-pyqs/Pashu_Paricharak_Official_Syllabus.pdf",
        downloadMirrorUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/syllabi/Pashu_Paricharak_Syllabus.pdf",
        isVerified: true
      },
      {
        id: "syllabus_rajasthan_police",
        examId: "police-constable-gd",
        examNameHindi: "राजस्थान पुलिस कांस्टेबल भर्ती परीक्षा",
        board: "Police",
        totalQuestions: 150,
        totalMarks: 150,
        durationMinutes: 120,
        negativeMarking: "1/4 अंक (0.25 अंक) प्रति गलत उत्तर",
        subjectDistribution: [
          { subject: "विवेचना एवं तार्किक योग्यता तथा कम्प्यूटर का सामान्य ज्ञान", questions: 60, marks: 60 },
          { subject: "सामान्य ज्ञान, सामान्य विज्ञान, सामाजिक विज्ञान एवं समसामयिक विषय तथा महिला एवं बाल अपराध", questions: 45, marks: 45 },
          { subject: "राजस्थान के इतिहास, संस्कृति, कला, भूगोल, राजनीति एवं आर्थिक स्थिति", questions: 45, marks: 45 }
        ],
        officialPdfUrl: "https://archive.org/download/rajasthan-recruitment-pyqs/Police_Constable_Syllabus.pdf",
        downloadMirrorUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/syllabi/Police_Constable_Syllabus.pdf",
        isVerified: true
      },
      {
        id: "syllabus_ras_prelims",
        examId: "rpsc-ras-rts",
        examNameHindi: "राजस्थान राज्य एवं अधीनस्थ सेवाएं संयुक्त प्रतियोगी (प्रारंभिक) परीक्षा (RAS Prelims)",
        board: "RPSC",
        totalQuestions: 150,
        totalMarks: 200,
        durationMinutes: 180,
        negativeMarking: "1/3 अंक प्रति गलत उत्तर (5वां विकल्प नियम लागू)",
        subjectDistribution: [
          { subject: "राजस्थान का इतिहास, कला, संस्कृति, साहित्य, परंपरा एवं विरासत", questions: 25, marks: 33.3 },
          { subject: "भारतीय इतिहास (प्राचीन, मध्यकालीन, आधुनिक)", questions: 15, marks: 20.0 },
          { subject: "भारत एवं विश्व का भूगोल", questions: 15, marks: 20.0 },
          { subject: "राजस्थान का भूगोल", questions: 15, marks: 20.0 },
          { subject: "भारतीय संविधान, राजनीतिक व्यवस्था एवं शासन प्रणाली", questions: 20, marks: 26.6 },
          { subject: "राजस्थान की प्रशासनिक एवं राजनीतिक व्यवस्था", questions: 15, marks: 20.0 },
          { subject: "आर्थिक अवधारणाएं एवं भारतीय व राजस्थान की अर्थव्यवस्था", questions: 20, marks: 26.6 },
          { subject: "विज्ञान एवं प्रौद्योगिकी (Science & Tech)", questions: 15, marks: 20.0 },
          { subject: "तार्किक विवेचन एवं मानसिक योग्यता (Reasoning & Mental Ability)", questions: 20, marks: 26.6 },
          { subject: "समसामयिक घटनाएं (Current Affairs)", questions: 15, marks: 20.0 }
        ],
        officialPdfUrl: "https://archive.org/download/rajasthan-recruitment-pyqs/RAS_RTS_Official_Syllabus.pdf",
        downloadMirrorUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/syllabi/RAS_Prelims_Syllabus.pdf",
        isVerified: true
      },
      {
        id: "syllabus_2nd_grade_gk",
        examId: "rpsc-senior-teacher-2nd-grade",
        examNameHindi: "वरिष्ठ अध्यापक (2nd Grade Teacher) - Paper-1 सामान्य ज्ञान",
        board: "RPSC",
        totalQuestions: 100,
        totalMarks: 200,
        durationMinutes: 120,
        negativeMarking: "1/3 अंक प्रति गलत उत्तर (5वां विकल्प नियम लागू)",
        subjectDistribution: [
          { subject: "Geographical, Historical, Cultural and General Knowledge of Rajasthan", questions: 40, marks: 80 },
          { subject: "Current Affairs of Rajasthan", questions: 10, marks: 20 },
          { subject: "General Knowledge of World and India", questions: 30, marks: 60 },
          { subject: "Educational Psychology (शिक्षा मनोविज्ञान)", questions: 20, marks: 40 }
        ],
        officialPdfUrl: "https://archive.org/download/rajasthan-recruitment-pyqs/2nd_Grade_Teacher_Syllabus.pdf",
        downloadMirrorUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/syllabi/2nd_Grade_Teacher_Syllabus.pdf",
        isVerified: true
      },
      {
        id: "syllabus_lab_assistant",
        examId: "rssb-lab-assistant",
        examNameHindi: "प्रयोगशाला सहायक संयुक्त सीधी भर्ती (Lab Assistant Science)",
        board: "RSMSSB",
        totalQuestions: 200,
        totalMarks: 400,
        durationMinutes: 240,
        negativeMarking: "1/3 अंक प्रति गलत उत्तर",
        subjectDistribution: [
          { part: "प्रश्न पत्र-I", subject: "राजस्थान का सामान्य ज्ञान (भूगोल, इतिहास, संस्कृति) एवं समसामयिकी तथा शिक्षा मनोविज्ञान", questions: 100, marks: 200 },
          { part: "प्रश्न पत्र-II", subject: "भौतिक विज्ञान, रसायन विज्ञान एवं जीव विज्ञान (सीनियर सैकण्डरी स्तर)", questions: 100, marks: 200 }
        ],
        officialPdfUrl: "https://archive.org/download/rajasthan-recruitment-pyqs/Lab_Assistant_Official_Syllabus.pdf",
        downloadMirrorUrl: "https://raw.githubusercontent.com/rajasthan-open-data/exam-repository/main/syllabi/Lab_Assistant_Syllabus.pdf",
        isVerified: true
      }
    ];

    for (const blueprint of SYLLABI_DETAILED_BLUEPRINTS) {
      const syllabusDoc = doc(db, 'syllabi', blueprint.id);
      await setDoc(syllabusDoc, {
        ...blueprint,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      syllabiCount++;
    }

    // Also populate general exams directory in syllabi collection
    for (const exam of RAJASTHAN_EXAMS) {
      const syllabusDoc = doc(db, 'syllabi', `syllabus_${exam.id}`);
      await setDoc(syllabusDoc, {
        examId: exam.id,
        examNameHindi: exam.name,
        examNameEnglish: exam.nameEnglish,
        board: exam.board,
        department: exam.department,
        officialSyllabusUrl: exam.mirrorSyllabusUrl || exam.officialSyllabusUrl || null,
        mirrorSyllabusUrl: exam.mirrorSyllabusUrl || null,
        syllabusHighlights: exam.syllabusHighlights,
        negativeMarking: exam.negativeMarking,
        totalMarks: exam.totalMarks,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      syllabiCount++;
    }

    // 7. Seed Structured Pure Hindi Revision Capsules into 'notes' collection
    let notesCount = 0;
    for (const revNote of RAJASTHAN_REVISION_NOTES) {
      const noteDoc = doc(db, 'notes', revNote.id);
      await setDoc(noteDoc, {
        ...revNote,
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true });
      notesCount++;
    }

    // Also seed into 'study_notes' for multi-topic portal reader compatibility
    for (const note of AUTHENTIC_STUDY_NOTES) {
      const noteDoc = doc(db, 'study_notes', note.id);
      await setDoc(noteDoc, {
        ...note,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    }

    const stats = {
      mockTests: mockTestsCount,
      questions: questionsCount,
      practiceQuestions: practiceCount,
      pyqs: pyqCount,
      notifications: notifCount,
      syllabi: syllabiCount,
      notes: notesCount,
    };

    return { 
      success: true, 
      message: `Successfully seeded genuine Rajasthan recruitment study materials (Notes, PYQs, Syllabi) to Cloud Firestore!`,
      stats
    };
  } catch (err: any) {
    console.error('Error seeding data to Firestore:', err);
    return { success: false, message: err?.message || 'Failed to seed Firestore data.' };
  }
}

// =========================================================================
// 6. FETCH AUTO-PUBLISHED PRACTICE QUESTIONS (AGENT PIPELINE + FALLBACK)
// =========================================================================
export async function fetchAutoPublishedPracticeQuestions(): Promise<any[]> {
  if (db && isFirebaseConfigured()) {
    try {
      const q = query(
        collection(db, 'practice_questions'),
        orderBy('publishedAt', 'desc'),
        limit(50)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const list: any[] = [];
        snapshot.forEach(docSnap => {
          list.push({ id: docSnap.id, ...docSnap.data() });
        });
        return list;
      }
    } catch (e) {
      console.warn('Firestore practice_questions read fallback:', e);
    }
  }
  return PRACTICE_QUESTIONS;
}

// =========================================================================
// 7. FETCH AUTO-PUBLISHED CIRCULARS & NOTIFICATIONS (AGENT PIPELINE + FALLBACK)
// =========================================================================
export async function fetchAutoPublishedCirculars(): Promise<any[]> {
  if (db && isFirebaseConfigured()) {
    try {
      const q = query(
        collection(db, 'circular_notifications'),
        orderBy('publishedAt', 'desc'),
        limit(20)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const list: any[] = [];
        snapshot.forEach(docSnap => {
          list.push({ id: docSnap.id, ...docSnap.data() });
        });
        return list;
      }
    } catch (e) {
      console.warn('Firestore circular_notifications read fallback:', e);
    }
  }
  return PORTAL_NOTIFICATIONS;
}

// =========================================================================
// 8. FETCH AUTO-PUBLISHED MASTER PYQS (AGENT PIPELINE + FALLBACK)
// =========================================================================
export async function fetchAutoPublishedPYQs(): Promise<PreviousPaper[]> {
  if (db && isFirebaseConfigured()) {
    try {
      const q = query(
        collection(db, 'pyqs'),
        orderBy('publishedAt', 'desc'),
        limit(30)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const list: PreviousPaper[] = [];
        snapshot.forEach(docSnap => {
          list.push({ id: docSnap.id, ...docSnap.data() } as PreviousPaper);
        });
        return list;
      }
    } catch (e) {
      console.warn('Firestore pyqs read fallback:', e);
    }
  }
  return PREVIOUS_PAPERS_DATA;
}

// =========================================================================
// 9. FETCH AUTHENTIC STUDY NOTES (FIRESTORE OR LOCAL SEED)
// =========================================================================
export async function fetchStudyNotes(): Promise<StudyNoteTopic[]> {
  if (db && isFirebaseConfigured()) {
    try {
      const q = query(
        collection(db, 'study_notes'),
        orderBy('lastUpdated', 'desc')
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const list: StudyNoteTopic[] = [];
        snapshot.forEach(docSnap => {
          list.push({ id: docSnap.id, ...(docSnap.data() as any) });
        });
        return list;
      }
    } catch (err) {
      console.warn('Firestore study_notes read fallback:', err);
    }
  }
  return AUTHENTIC_STUDY_NOTES;
}

// =========================================================================
// 10. REAL-TIME LISTENER: STUDY NOTES (AUTHENTIC READING ROOM)
// =========================================================================
export function subscribeToStudyNotes(
  callback: (notes: StudyNoteTopic[]) => void,
  onError?: (err: any) => void
): Unsubscribe {
  // If db not configured or SSR environment, invoke immediately with authentic notes
  if (!db || !isFirebaseConfigured() || typeof window === 'undefined') {
    callback(AUTHENTIC_STUDY_NOTES);
    return () => {};
  }

  try {
    const q = query(collection(db, 'study_notes'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: StudyNoteTopic[] = [];
          snapshot.forEach(docSnap => {
            list.push({ id: docSnap.id, ...(docSnap.data() as any) });
          });
          callback(list);
        } else {
          callback(AUTHENTIC_STUDY_NOTES);
        }
      },
      (error) => {
        console.warn('Realtime study_notes listener warning, fallback to authentic seed data:', error);
        if (onError) onError(error);
        callback(AUTHENTIC_STUDY_NOTES);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('Realtime study_notes setup failed, using authentic seed data:', err);
    callback(AUTHENTIC_STUDY_NOTES);
    return () => {};
  }
}

// =========================================================================
// 11. REAL-TIME LISTENER: PREVIOUS YEARS PAPERS (PYQ MASTER BANK)
// =========================================================================
export function subscribeToPYQs(
  callback: (pyqs: PreviousPaper[]) => void,
  onError?: (err: any) => void
): Unsubscribe {
  if (!db || !isFirebaseConfigured() || typeof window === 'undefined') {
    callback(PREVIOUS_PAPERS_DATA);
    return () => {};
  }

  try {
    const q = query(collection(db, 'pyqs'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: PreviousPaper[] = [];
          snapshot.forEach(docSnap => {
            list.push({ id: docSnap.id, ...(docSnap.data() as any) });
          });
          callback(list);
        } else {
          callback(PREVIOUS_PAPERS_DATA);
        }
      },
      (error) => {
        console.warn('Realtime pyqs listener warning, fallback to authentic seed data:', error);
        if (onError) onError(error);
        callback(PREVIOUS_PAPERS_DATA);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('Realtime pyqs setup failed, using authentic seed data:', err);
    callback(PREVIOUS_PAPERS_DATA);
    return () => {};
  }
}

// =========================================================================
// 12. REAL-TIME LISTENER: OFFICIAL SYLLABI (EXAMS DIRECTORY)
// =========================================================================
export function subscribeToSyllabi(
  callback: (syllabi: RajasthanExam[]) => void,
  onError?: (err: any) => void
): Unsubscribe {
  if (!db || !isFirebaseConfigured() || typeof window === 'undefined') {
    callback(RAJASTHAN_EXAMS);
    return () => {};
  }

  try {
    const q = query(collection(db, 'syllabi'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const cloudMap = new Map<string, any>();
          snapshot.forEach(docSnap => {
            const data = docSnap.data();
            cloudMap.set(data.examId || docSnap.id, data);
          });
          
          // Merge with rich base directory for complete UI fidelity
          const merged = RAJASTHAN_EXAMS.map(exam => {
            const cloudData = cloudMap.get(exam.id) || cloudMap.get(`syllabus_${exam.id}`);
            if (cloudData) {
              return {
                ...exam,
                officialSyllabusUrl: cloudData.officialSyllabusUrl || exam.officialSyllabusUrl,
                mirrorSyllabusUrl: cloudData.mirrorSyllabusUrl || exam.mirrorSyllabusUrl,
                syllabusHighlights: cloudData.syllabusHighlights || exam.syllabusHighlights,
              };
            }
            return exam;
          });
          callback(merged);
        } else {
          callback(RAJASTHAN_EXAMS);
        }
      },
      (error) => {
        console.warn('Realtime syllabi listener warning, fallback to local directory:', error);
        if (onError) onError(error);
        callback(RAJASTHAN_EXAMS);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('Realtime syllabi setup failed, using local directory:', err);
    callback(RAJASTHAN_EXAMS);
    return () => {};
  }
}


