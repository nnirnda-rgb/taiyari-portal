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
  limit 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { CBT_MOCK_TEST_CET, CbtQuestion } from '@/data/cbtExamData';

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

  // Return static CET mock questions
  return CBT_MOCK_TEST_CET.questions;
}

// =========================================================================
// 5. SEED INITIAL MOCK TEST AND QUESTIONS TO FIRESTORE
// =========================================================================
export async function seedInitialDataToFirestore(): Promise<{ success: boolean; message: string }> {
  if (!db || !isFirebaseConfigured()) {
    return { 
      success: false, 
      message: 'Firebase is not yet configured with cloud credentials. Local offline persistence active.' 
    };
  }

  try {
    // 1. Seed Mock Test meta
    const testDoc = doc(db, 'mock_tests', CBT_MOCK_TEST_CET.id);
    await setDoc(testDoc, {
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
      updatedAt: serverTimestamp(),
    }, { merge: true });

    // 2. Seed Questions
    for (const q of CBT_MOCK_TEST_CET.questions) {
      const qDoc = doc(db, 'questions', `${CBT_MOCK_TEST_CET.id}_q_${q.id}`);
      await setDoc(qDoc, {
        ...q,
        testId: CBT_MOCK_TEST_CET.id,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    }

    return { 
      success: true, 
      message: `Successfully seeded test '${CBT_MOCK_TEST_CET.title}' and ${CBT_MOCK_TEST_CET.questions.length} questions to Cloud Firestore.` 
    };
  } catch (err: any) {
    console.error('Error seeding data to Firestore:', err);
    return { success: false, message: err?.message || 'Failed to seed Firestore data.' };
  }
}

// =========================================================================
// 6. FETCH AUTO-PUBLISHED PRACTICE QUESTIONS (AGENT 2 PIPELINE)
// =========================================================================
export async function fetchAutoPublishedPracticeQuestions(): Promise<any[]> {
  if (db && isFirebaseConfigured()) {
    try {
      const q = query(
        collection(db, 'practice_questions'),
        orderBy('publishedAt', 'desc'),
        limit(30)
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
  return [];
}

// =========================================================================
// 7. FETCH AUTO-PUBLISHED CIRCULARS & NOTIFICATIONS (AGENT 3 PIPELINE)
// =========================================================================
export async function fetchAutoPublishedCirculars(): Promise<any[]> {
  if (db && isFirebaseConfigured()) {
    try {
      const q = query(
        collection(db, 'circular_notifications'),
        orderBy('publishedAt', 'desc'),
        limit(15)
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
  return [];
}

// =========================================================================
// 8. FETCH AUTO-PUBLISHED WATERMARKED PYQS (AGENT 5 PIPELINE)
// =========================================================================
export async function fetchAutoPublishedPYQs(): Promise<any[]> {
  if (db && isFirebaseConfigured()) {
    try {
      const q = query(
        collection(db, 'pyq_repository'),
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
      console.warn('Firestore pyq_repository read fallback:', e);
    }
  }
  return [];
}

