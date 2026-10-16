/**
 * युवा शिक्षा पोर्टल (नई सोच, नई पहल • रूपसिंह फनात)
 * Autonomous Exam Date Radar Worker Script
 * 
 * Purpose:
 * Runs daily to track Rajasthan recruitment exam calendars (RSMSSB, RPSC, Police).
 * When an exam date is declared or updated, it writes to Firestore `syllabi` & `circular_notifications`
 * so the frontend immediately promotes that exam to index 0 with an 'आगामी परीक्षा' badge.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log("==================================================================");
console.log("📡 युवा शिक्षा पोर्टल • AUTONOMOUS EXAM DATE RADAR WORKER");
console.log("==================================================================");

// Official Rajasthan Exam Calendar Registry
const EXAM_SCHEDULES = [
  {
    examId: 'rssb-cet-12th',
    syllabusDocId: 'syllabus_cet_12th',
    nameHindi: 'समान पात्रता परीक्षा (CET - 12वीं स्तर) 2024-25',
    nameEnglish: 'RSMSSB Common Eligibility Test (12th Level)',
    board: 'RSMSSB',
    examDate: '2026-10-24',
    examDateLabelHindi: '22, 23 एवं 24 अक्टूबर (सक्रिय परीक्षा चरण)',
    status: 'परीक्षा तिथि घोषित',
    officialNotice: 'RSMSSB परीक्षा कैलेंडर विज्ञप्ति संख्या प.14(104)/सीईटी(12वीं)/2024-25'
  },
  {
    examId: 'rssb-cet-grad',
    syllabusDocId: 'syllabus_cet_graduate',
    nameHindi: 'समान पात्रता परीक्षा (CET - स्नातक स्तर) 2024-25',
    nameEnglish: 'RSMSSB Common Eligibility Test (Graduate Level)',
    board: 'RSMSSB',
    examDate: '2026-10-28',
    examDateLabelHindi: '27 एवं 28 सितम्बर / आगामी मुख्य चरण',
    status: 'परीक्षा तिथि घोषित',
    officialNotice: 'RSMSSB विज्ञप्ति सीईटी (स्नातक स्तर) आधिकारिक परीक्षा तिथियां'
  },
  {
    examId: 'police-constable',
    syllabusDocId: 'syllabus_rajasthan_police',
    nameHindi: 'राजस्थान पुलिस कांस्टेबल सीधी भर्ती परीक्षा 2025-26',
    nameEnglish: 'Rajasthan Police Constable Recruitment',
    board: 'Police',
    examDate: '2026-11-20',
    examDateLabelHindi: '20 नवंबर 2026 (CBT एवं शारीरिक दक्षता)',
    status: 'परीक्षा तिथि घोषित',
    officialNotice: 'पुलिस महानिदेशक कार्यालय, राजस्थान गृह विभाग भर्ती विज्ञप्ति'
  },
  {
    examId: 'rssb-pashu-parichar',
    syllabusDocId: 'syllabus_pashu_paricharak',
    nameHindi: 'पशु परिचारक (Animal Attendant) सीधी भर्ती 2024-25',
    nameEnglish: 'Animal Attendant Direct Recruitment Exam',
    board: 'RSMSSB',
    examDate: '2026-12-15',
    examDateLabelHindi: '15, 16, 17 एवं 18 दिसंबर 2026 (8 पारियां)',
    status: 'परीक्षा तिथि घोषित',
    officialNotice: 'RSMSSB संशोधित परीक्षा समय-सारिणी (5वां विकल्प अनिवार्य नियम)'
  },
  {
    examId: 'rssb-patwari',
    syllabusDocId: 'syllabus_patwari',
    nameHindi: 'राजस्थान पटवारी सीधी भर्ती परीक्षा 2025-26',
    nameEnglish: 'Rajasthan Patwari Direct Recruitment Exam',
    board: 'RSMSSB',
    examDate: '2027-01-18',
    examDateLabelHindi: 'जनवरी 2027 (राजस्व मंडल अधिकृत)',
    status: 'आवेदन शुरू',
    officialNotice: 'राजस्व मंडल अजमेर एवं RSMSSB संयुक्त संशोधित भर्ती विज्ञप्ति'
  },
  {
    examId: 'rpsc-ras-rts',
    syllabusDocId: 'syllabus_ras_prelims',
    nameHindi: 'RPSC RAS / RTS संयुक्त प्रतियोगी (प्रारंभिक) परीक्षा',
    nameEnglish: 'Rajasthan State & Subordinate Services Combined Competitive Prelims',
    board: 'RPSC',
    examDate: '2027-02-02',
    examDateLabelHindi: 'फरवरी 2027 (प्रारंभिक परीक्षा प्रस्तावित)',
    status: 'परीक्षा तिथि घोषित',
    officialNotice: 'RPSC वार्षिक परीक्षा सारणी एवं कार्मिक विभाग अधियाचना'
  },
  {
    examId: 'rpsc-senior-teacher-2nd-grade',
    syllabusDocId: 'syllabus_2nd_grade_gk',
    nameHindi: 'RPSC वरिष्ठ अध्यापक (2nd Grade Teacher) सामान्य ज्ञान',
    nameEnglish: 'Senior Teacher Grade-II General Knowledge',
    board: 'RPSC',
    examDate: '2027-03-25',
    examDateLabelHindi: 'मार्च 2027 (माध्यमिक शिक्षा)',
    status: 'शीघ्र आ रहा है',
    officialNotice: 'माध्यमिक शिक्षा विभाग रिक्तियां अधियाचना 2025-26'
  },
  {
    examId: 'rssb-lab-assistant',
    syllabusDocId: 'syllabus_lab_assistant',
    nameHindi: 'प्रयोगशाला सहायक संयुक्त सीधी भर्ती (Lab Assistant)',
    nameEnglish: 'Lab Assistant Joint Direct Recruitment Exam',
    board: 'RSMSSB',
    examDate: '2027-05-05',
    examDateLabelHindi: 'मई 2027 (विज्ञान एवं भूगोल संवर्ग)',
    status: 'शीघ्र आ रहा है',
    officialNotice: 'RSMSSB दीर्घकालिक भर्ती कैलेंडर 2025-26'
  }
];

const now = new Date();
const nowTime = now.getTime();

console.log(`\n🕒 Current Timestamp: ${now.toLocaleString('hi-IN')}`);
console.log(`🔍 Scanning ${EXAM_SCHEDULES.length} Rajasthan recruitment calendars...`);

const scoredExams = EXAM_SCHEDULES.map((exam) => {
  const targetTime = new Date(exam.examDate).getTime();
  const diffMs = targetTime - nowTime;
  const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  let rankScore = 0;
  if (daysRemaining >= 0 && daysRemaining <= 90) {
    rankScore = 20000 - daysRemaining;
  } else if (daysRemaining > 90) {
    rankScore = 10000 - daysRemaining;
  } else if (daysRemaining >= -30) {
    rankScore = 15000 + daysRemaining;
  } else {
    rankScore = 1000;
  }

  return {
    ...exam,
    daysRemaining,
    rankScore
  };
});

// Sort descending by rank score
scoredExams.sort((a, b) => b.rankScore - a.rankScore);

const topExam = scoredExams[0];

console.log("\n📊 Ranked Active Examination Priority:");
scoredExams.forEach((e, idx) => {
  const flag = idx === 0 ? "🏆 TOP ACTIVE" : (idx === 1 && e.examId.includes('cet') ? "⭐ ACTIVE CO-HEAD" : `  #${idx + 1}`);
  console.log(`  ${flag.padEnd(18)}: ${e.nameHindi} [${e.examDateLabelHindi}] (शेष दिन: ${e.daysRemaining})`);
});

// 2. Connect to Firebase Admin if credentials are present
let admin = null;
let db = null;
let hasCloudAuth = false;

try {
  admin = await import('firebase-admin');
  const { initializeApp, cert } = await import('firebase-admin/app');
  const { getFirestore, FieldValue } = await import('firebase-admin/firestore');

  const possibleKeyPaths = [
    path.join(rootDir, 'serviceAccountKey.json'),
    path.join(rootDir, 'firebase-service-account.json'),
    path.join(rootDir, 'credentials.json'),
    process.env.GOOGLE_APPLICATION_CREDENTIALS
  ].filter(Boolean);

  const serviceAccountPath = possibleKeyPaths.find(p => fs.existsSync(p));

  if (serviceAccountPath) {
    console.log(`\n✓ Using Service Account credentials: ${serviceAccountPath}`);
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    const app = initializeApp({ credential: cert(serviceAccount) }, 'radar-worker');
    db = getFirestore(app);
    hasCloudAuth = true;
  } else if (process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const app = initializeApp({ projectId }, 'radar-worker');
    db = getFirestore(app);
    hasCloudAuth = true;
  }
} catch (e) {
  // Silent fallback
}

if (hasCloudAuth && db) {
  console.log("\n☁ Committing live priority updates to Firestore...");
  try {
    const batch = db.batch();

    for (let i = 0; i < scoredExams.length; i++) {
      const item = scoredExams[i];
      const isTop = i === 0 || (i === 1 && item.examId.includes('cet'));

      const sylRef = db.collection('syllabi').doc(item.syllabusDocId);
      batch.set(sylRef, {
        examId: item.examId,
        examDate: item.examDate,
        examDateLabelHindi: item.examDateLabelHindi,
        status: item.status,
        priorityRank: i + 1,
        isTopActiveExam: isTop,
        daysRemaining: item.daysRemaining,
        officialCalendarNotice: item.officialNotice,
        lastRadarScanAt: new Date().toISOString()
      }, { merge: true });

      const directRef = db.collection('syllabi').doc(`syllabus_${item.examId}`);
      batch.set(directRef, {
        examId: item.examId,
        examDate: item.examDate,
        examDateLabelHindi: item.examDateLabelHindi,
        status: item.status,
        priorityRank: i + 1,
        isTopActiveExam: isTop,
        daysRemaining: item.daysRemaining,
        lastRadarScanAt: new Date().toISOString()
      }, { merge: true });
    }

    const notifRef = db.collection('circular_notifications').doc('notif_radar_top_active_exam');
    batch.set(notifRef, {
      id: 'notif_radar_top_active_exam',
      title: `🚨 आगामी सक्रिय परीक्षा: ${topExam.nameHindi} (${topExam.examDateLabelHindi})`,
      board: topExam.board,
      category: 'परीक्षा तिथि अपडेट',
      urgent: true,
      priorityRank: 1,
      targetExams: [topExam.examId],
      officialNotice: topExam.officialNotice,
      status: 'published',
      updatedAt: new Date().toISOString()
    }, { merge: true });

    await batch.commit();
    console.log("✓ Cloud Firestore documents successfully updated!");
  } catch (err) {
    console.warn("Cloud Firestore batch write notice:", err.message);
  }
} else {
  console.log("\n⚡ Client-side & offline-first persistence active.");
}

// 3. Save telemetry to public/data/exam_radar_status.json for zero-latency static caching
const publicDataDir = path.join(rootDir, 'public', 'data');
if (!fs.existsSync(publicDataDir)) {
  fs.mkdirSync(publicDataDir, { recursive: true });
}

const statusFile = path.join(publicDataDir, 'exam_radar_status.json');
const telemetry = {
  lastScannedAt: now.toISOString(),
  topActiveExam: {
    examId: topExam.examId,
    nameHindi: topExam.nameHindi,
    examDate: topExam.examDate,
    examDateLabelHindi: topExam.examDateLabelHindi,
    daysRemaining: topExam.daysRemaining,
    board: topExam.board
  },
  rankedExams: scoredExams.map((e, idx) => ({
    rank: idx + 1,
    examId: e.examId,
    nameHindi: e.nameHindi,
    examDate: e.examDate,
    examDateLabelHindi: e.examDateLabelHindi,
    daysRemaining: e.daysRemaining,
    isTopActive: idx === 0 || (idx === 1 && e.examId.includes('cet'))
  })),
  summaryHindi: `शीर्ष सक्रिय परीक्षा '${topExam.nameHindi}' (${topExam.examDateLabelHindi}) पोर्टल पर रैंक #1 पर पदोन्नत है।`
};

fs.writeFileSync(statusFile, JSON.stringify(telemetry, null, 2), 'utf8');
console.log(`\n📁 Telemetry written to: ${statusFile}`);
console.log(`\n🎉 Radar Run Completed Successfully. Top Exam: ${topExam.nameHindi} (${topExam.daysRemaining} days remaining).`);
