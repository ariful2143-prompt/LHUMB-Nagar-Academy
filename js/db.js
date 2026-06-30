

const DB_KEYS = {
  STUDENTS:    'school_students',
  TEACHERS:    'school_teachers',
  NOTICES:     'school_notices',
  RESULTS:     'school_results',
  ATTENDANCE:  'school_attendance',
  EVENTS:      'school_events',
  ASSIGNMENTS: 'school_assignments',
  GALLERY:     'school_gallery',
  ADMISSIONS:  'school_admissions',
  USERS:       'school_users',
  SETTINGS:    'school_settings',
  ACTIVITY:    'school_activity',
  FEES:        'school_fees',
  ACHIEVEMENTS:'school_achievements',
  TIMETABLE:   'school_timetable',
};

// ─── Seed Data ─────────────────────────────────────────────────────────────────

// Bump this version when seed data structure changes to force a re-seed
const DB_VERSION = '1.2.0';
const DB_VERSION_KEY = 'dmhs_db_version';

const SEED = {
  [DB_KEYS.USERS]: [
    { id: 'USR001', username: 'admin',    password: 'admin123', role: 'admin',   name: 'Principal Rahman',   email: 'admin@dmhs.edu.bd' },
    { id: 'USR002', username: 'teacher1', password: 'teach123', role: 'teacher', name: 'Nasreen Akter',      email: 'nasreen@dmhs.edu.bd', teacherId: 'TCH001' },
    { id: 'USR003', username: 'student1', password: 'stud123',  role: 'student', name: 'Rahim Hossain',      email: 'rahim@dmhs.edu.bd',   studentId: 'STU001' },
  ],

  [DB_KEYS.STUDENTS]: [
    { id: 'STU001', name: 'Rahim Hossain',   class: '10', section: 'A', roll: '01', dob: '2007-03-15', guardian: 'Karim Hossain',   contact: '01712345678', photo: null, joinYear: 2020, bloodGroup: 'B+', address: 'Mirpur, Dhaka' },
    { id: 'STU002', name: 'Fatema Begum',    class: '10', section: 'A', roll: '02', dob: '2007-06-22', guardian: 'Alam Hossain',    contact: '01712345679', photo: null, joinYear: 2020, bloodGroup: 'A+', address: 'Uttara, Dhaka' },
    { id: 'STU003', name: 'Sakib Al Hassan', class: '9',  section: 'B', roll: '05', dob: '2008-01-10', guardian: 'Abdul Hassan',    contact: '01712345680', photo: null, joinYear: 2021, bloodGroup: 'O+', address: 'Dhanmondi, Dhaka' },
    { id: 'STU004', name: 'Nusrat Jahan',    class: '9',  section: 'A', roll: '03', dob: '2008-09-05', guardian: 'Jahan Ali',       contact: '01712345681', photo: null, joinYear: 2021, bloodGroup: 'AB+', address: 'Gulshan, Dhaka' },
    { id: 'STU005', name: 'Arif Rahman',     class: '8',  section: 'A', roll: '07', dob: '2009-04-18', guardian: 'Mizanur Rahman',  contact: '01712345682', photo: null, joinYear: 2022, bloodGroup: 'B-', address: 'Banani, Dhaka' },
    { id: 'STU006', name: 'Sumaiya Islam',   class: '8',  section: 'B', roll: '04', dob: '2009-11-30', guardian: 'Riaz Islam',      contact: '01712345683', photo: null, joinYear: 2022, bloodGroup: 'O-', address: 'Wari, Dhaka' },
  ],

  [DB_KEYS.TEACHERS]: [
   {
  id: '20260001',
  name: 'MD ABUL KALAM AZAD',
  subject: 'N/A',
  qualification: 'HEAD TEACHER',
  photo: 'image/teacher/image.png'
},
{
  id: '20260002',
  name: 'MD NURUL AMIN',
  subject: 'N/A',
  qualification: 'ASST. HEAD TEACHER',
  photo: 'image/teacher/image.png'
  
},
{
  id: '20260003',
  name: 'JOBEDA KHATUN',
  subject: 'Bangla',
  qualification: 'ASSISTANT TEACHER',
  photo: 'image/teacher/image.png'
 
},
{
  id: '20260004',
  name: 'LUTFUN NAHAR',
  subject: 'Social Science',
  qualification: 'ASSISTANT TEACHER',
  photo: 'image/teacher/LUTFUN NAHAR.png'
  
},
{
  id: '20260005',
  name: 'TAHAMINA AKTER',
  subject: 'Business Studies',
  qualification: 'ASSISTANT TEACHER',
  photo: 'image/teacher/TAHAMINA AKTER.png'

},
{
  id: '20260006',
  name: 'SWAPON LAL CHAKRABORTY',
  subject: 'ICT',
  qualification: 'ASSISTANT TEACHER',
  photo: 'image/teacher/SWAPON LAL CHAKRABORTY.png'
  
},
{
  id: '20260007',
  name: 'MD. RAFIQUL ISLAM',
  subject: 'Mathematics',
  qualification: 'ASSISTANT TEACHER',
  photo: 'image/teacher/Md Rafiqul Islam.png'
 
},
{
  id: '20260008',
  name: 'ANWAR HOSSAIN',
  subject: 'Agriculture',
  qualification: 'ASSISTANT TEACHER',
   photo: 'image/teacher/Anwar Hossain.png'

},
{
  id: '20260009',
  name: 'MD. ZAKIR HOSSAIN',
  subject: 'Physical Education',
  qualification: 'ASSISTANT TEACHER',
    photo: 'image/teacher/MD. ZAKIR HOSSAIN.png'

},
{
  id: '20260010',
  name: 'TASLIMA AKTER',
  subject: 'Library & Information Science',
  qualification: 'ASSISTANT TEACHER',
  photo: 'image/teacher/image.png'

},
{
  id: '20260011',
  name: 'MD. TAIMUR RAHMAN',
  subject: 'Islam & Moral Studies',
  qualification: 'ASSISTANT TEACHER',
   photo: 'image/teacher/MD. TAIMUR RAHMAN.png'

},
{
  id: '20260012',
  name: 'ARIF HOSSAIN',
  subject: 'English',
  qualification: 'ASSISTANT TEACHER',
  photo: 'image/teacher/arif.jpeg'

},
{
  id: '20260013',
  name: 'SANTANA RANI ROY',
  subject: 'Biology',
  qualification: 'ASSISTANT TEACHER',
    photo: 'image/teacher/Shanatana Rani.jpeg'

},
{
  id: '20260014',
  name: 'ABDUR RASHID',
  subject: 'Office Assistant',
  qualification: 'OFFICE ASSISTANT CUM ACC. ASST.',
    photo: 'image/teacher/ABDUR RASHID.png'

},
{
  id: '20260015',
  name: 'MD HABIBUR RAHMAN',
  subject: 'N/A',
  qualification: 'MLSS (SECURITY)',
   photo: 'image/teacher/Habibur Rahman.png'

},
{
  id: '20260016',
  name: 'MANIK HOSSAIN',
  subject: 'N/A',
  qualification: 'CLEANER',
   photo: 'image/teacher/image.png'

},
{
  id: '20260017',
  name: 'SHIKHA RANI DAS METHELA',
  subject: 'N/A',
  qualification: 'MLSS (AYAH)',
   photo: 'image/teacher/image.png'

},
{
  id: '20260018',
  name: 'SAHAB UDDIN',
  subject: 'N/A',
  qualification: 'NIGHT GUARD',
   photo: 'image/teacher/image.png'

},
  ],

  [DB_KEYS.NOTICES]: [
    { id: 'NOT001', title: 'Annual Exam Schedule 2025',               content: 'Annual examinations will begin from November 1st, 2025. All students are required to collect their admit cards from the office by October 25th. Exam will be held in the morning shift starting at 10:00 AM. Students must arrive 30 minutes before the exam. No electronic devices are allowed in the examination hall.',                     category: 'Exam',     date: '2025-10-01', author: 'Admin', published: true },
    { id: 'NOT002', title: 'Eid-ul-Adha Holiday Notice',              content: 'The school will remain closed from June 15 to June 20, 2025 on the occasion of Eid-ul-Adha. Classes will resume on June 21, 2025 (Saturday). Students are advised to complete their assigned holiday homework during this period.',                                                                                                    category: 'Holiday',  date: '2025-06-10', author: 'Admin', published: true },
    { id: 'NOT003', title: 'Annual Sports Day Registration',           content: 'Registration for Annual Sports Day 2025 is now open. Students wishing to participate in track events, field events, or team sports must submit their registration forms to their class teachers by October 20, 2025. The sports day will be held on November 15, 2025 at the school ground.',                                              category: 'Event',    date: '2025-10-05', author: 'Admin', published: true },
    { id: 'NOT004', title: 'SSC Pre-selection Test Schedule',          content: 'The SSC pre-selection test for Class 10 students will be held from October 10 to October 20, 2025. Students should prepare all subjects covered in the syllabus. Detailed seat plan will be published on October 8, 2025. Attendance is compulsory.',                                                                                    category: 'Exam',     date: '2025-10-02', author: 'Admin', published: true },
    { id: 'NOT005', title: 'Parent-Teacher Meeting — October 2025',   content: 'A Parent-Teacher Meeting is scheduled for October 30, 2025 from 9:00 AM to 1:00 PM. Parents are strongly encouraged to attend and discuss their children\'s academic progress with respective class teachers. Prior registration is required. Please collect the registration slip from the school office.',                              category: 'Academic', date: '2025-10-12', author: 'Admin', published: true },
    { id: 'NOT006', title: 'Science Fair 2025 — Participation Call',   content: 'The Annual Science Fair 2025 will be held on December 5, 2025. Students from Classes 7–10 are encouraged to participate individually or in groups of up to 3. Project proposals must be submitted to the science department by November 10, 2025. Best projects will be submitted to the divisional science fair.',                    category: 'Academic', date: '2025-10-08', author: 'Admin', published: true },
  ],

  [DB_KEYS.RESULTS]: [
    {
      id: 'RES001', studentId: 'STU001', examType: 'Annual', year: '2025', class: '10', section: 'A', published: true,
      subjects: [
        { name: 'Bangla',        marks: 82 },
        { name: 'English',       marks: 75 },
        { name: 'Mathematics',   marks: 90 },
        { name: 'Science',       marks: 88 },
        { name: 'Social Science',marks: 79 },
        { name: 'ICT',           marks: 85 },
        { name: 'Religion',      marks: 92 },
      ],
    },
    {
      id: 'RES002', studentId: 'STU002', examType: 'Annual', year: '2025', class: '10', section: 'A', published: true,
      subjects: [
        { name: 'Bangla',        marks: 78 },
        { name: 'English',       marks: 82 },
        { name: 'Mathematics',   marks: 65 },
        { name: 'Science',       marks: 71 },
        { name: 'Social Science',marks: 84 },
        { name: 'ICT',           marks: 76 },
        { name: 'Religion',      marks: 89 },
      ],
    },
    {
      id: 'RES003', studentId: 'STU003', examType: 'Half-Yearly', year: '2025', class: '9', section: 'B', published: true,
      subjects: [
        { name: 'Bangla',        marks: 70 },
        { name: 'English',       marks: 68 },
        { name: 'Mathematics',   marks: 55 },
        { name: 'Physics',       marks: 72 },
        { name: 'Chemistry',     marks: 61 },
        { name: 'ICT',           marks: 80 },
        { name: 'Religion',      marks: 75 },
      ],
    },
  ],

  [DB_KEYS.ATTENDANCE]: [
    { studentId: 'STU001', date: '2025-10-01', status: 'Present', classId: '10A' },
    { studentId: 'STU001', date: '2025-10-02', status: 'Present', classId: '10A' },
    { studentId: 'STU001', date: '2025-10-05', status: 'Absent',  classId: '10A' },
    { studentId: 'STU001', date: '2025-10-06', status: 'Present', classId: '10A' },
    { studentId: 'STU001', date: '2025-10-07', status: 'Present', classId: '10A' },
    { studentId: 'STU001', date: '2025-10-08', status: 'Late',    classId: '10A' },
    { studentId: 'STU001', date: '2025-10-09', status: 'Present', classId: '10A' },
    { studentId: 'STU002', date: '2025-10-01', status: 'Present', classId: '10A' },
    { studentId: 'STU002', date: '2025-10-02', status: 'Late',    classId: '10A' },
    { studentId: 'STU002', date: '2025-10-05', status: 'Present', classId: '10A' },
    { studentId: 'STU003', date: '2025-10-01', status: 'Absent',  classId: '9B' },
    { studentId: 'STU003', date: '2025-10-02', status: 'Present', classId: '9B' },
    { studentId: 'STU003', date: '2025-10-05', status: 'Present', classId: '9B' },
  ],

  [DB_KEYS.EVENTS]: [
    { id: 'EVT001', title: 'Annual Sports Day',          date: '2025-11-15', description: 'Inter-class sports competition with track events, field events, and team sports. All students and parents are welcome.',   category: 'Sports'    },
    { id: 'EVT002', title: 'Science Fair 2025',           date: '2025-12-05', description: 'Annual science fair showcasing student projects. Open to Classes 7–10. Prizes for top projects.',                         category: 'Academic'  },
    { id: 'EVT003', title: 'Annual Prize Giving Ceremony',date: '2025-12-20', description: 'Annual prize giving ceremony honouring academic excellence, sports achievements, and extracurricular contributions.',     category: 'Ceremony'  },
    { id: 'EVT004', title: 'Parent-Teacher Meeting',      date: '2025-10-30', description: 'Quarterly parent-teacher meeting to discuss student academic progress. Registration required.',                           category: 'Academic'  },
    { id: 'EVT005', title: 'Victory Day Celebration',     date: '2025-12-16', description: 'National Victory Day celebration with cultural programs, speeches, and patriotic performances.',                         category: 'Cultural'  },
    { id: 'EVT006', title: 'Annual Art Exhibition',       date: '2025-11-25', description: 'Student art exhibition showcasing paintings, sculptures, and creative works from all classes.',                          category: 'Cultural'  },
  ],

  [DB_KEYS.ASSIGNMENTS]: [
    { id: 'ASN001', title: 'Chapter 5 Exercise',        subject: 'Mathematics', class: '10A', dueDate: '2025-10-10', postedBy: 'TCH001', description: 'Complete all problems from Chapter 5: Quadratic Equations. Show full working for all problems. Neatness will be graded.', submitted: false },
    { id: 'ASN002', title: 'Essay on Liberation War',   subject: 'Bangla',      class: '10A', dueDate: '2025-10-12', postedBy: 'TCH002', description: 'Write a 500-word essay on the significance of the 1971 Liberation War of Bangladesh. Use at least 3 references.', submitted: true  },
    { id: 'ASN003', title: 'Lab Report — Titration',    subject: 'Chemistry',   class: '9A',  dueDate: '2025-10-15', postedBy: 'TCH005', description: 'Submit the lab report for the acid-base titration experiment conducted in the lab on October 5. Follow the lab report format.', submitted: false },
    { id: 'ASN004', title: 'Python Basics Project',     subject: 'ICT',         class: '10A', dueDate: '2025-10-20', postedBy: 'TCH008', description: 'Create a simple calculator program in Python with basic arithmetic operations. Submit the .py file and a screenshot of output.', submitted: false },
  ],

  [DB_KEYS.GALLERY]: [
    { id: 'GAL001', title: 'School Building',       category: 'Classrooms', src: null, date: '2025-01-15' },
    { id: 'GAL002', title: 'Sports Day 2024',        category: 'Sports',     src: null, date: '2024-11-20' },
    { id: 'GAL003', title: 'Prize Giving Ceremony',  category: 'Ceremony',   src: null, date: '2024-12-18' },
    { id: 'GAL004', title: 'Science Fair Winners',   category: 'Events',     src: null, date: '2024-12-10' },
    { id: 'GAL005', title: 'Football Final',         category: 'Sports',     src: null, date: '2025-03-05' },
    { id: 'GAL006', title: 'Computer Lab',           category: 'Classrooms', src: null, date: '2025-01-20' },
  ],

  [DB_KEYS.ADMISSIONS]: [],

  [DB_KEYS.SETTINGS]: {
    schoolName: 'LHUMB Nagar Academy',
    schoolNameBn: 'লাম নগর একাডেমী',
    established: '1994',
    address: 'Ramganj,Lakshmipur, Bangladesh',
    phone: '+880 1-715677488',
    email: 'mdabulkalamazad774@gmail.com',
    website: 'none',
    principal: 'Md Abul Kalam Azad',
    motto: 'আলোর পথে, সত্যের সন্ধানে — In the Path of Light, In Search of Truth',
    eiin: '107080',
    
  },

  [DB_KEYS.ACTIVITY]: [],

  [DB_KEYS.FEES]: [
    { id: 'FEE001', studentId: 'STU001', month: 'October 2025',  amount: 800,  status: 'Paid',   date: '2025-10-02', method: 'bKash' },
    { id: 'FEE002', studentId: 'STU001', month: 'September 2025',amount: 800,  status: 'Paid',   date: '2025-09-03', method: 'Cash'  },
    { id: 'FEE003', studentId: 'STU001', month: 'August 2025',   amount: 800,  status: 'Paid',   date: '2025-08-05', method: 'bKash' },
    { id: 'FEE004', studentId: 'STU001', month: 'July 2025',     amount: 800,  status: 'Paid',   date: '2025-07-04', method: 'Cash'  },
    { id: 'FEE005', studentId: 'STU001', month: 'June 2025',     amount: 800,  status: 'Paid',   date: '2025-06-06', method: 'bKash' },
    { id: 'FEE006', studentId: 'STU001', month: 'November 2025', amount: 800,  status: 'Unpaid', date: null,         method: null    },
  ],

  [DB_KEYS.ACHIEVEMENTS]: [
    { id: 'ACH001', studentId: 'STU001', title: 'First Place — Mathematics Olympiad', date: '2025-03-15', awardedBy: 'Dhaka District Math Olympiad Committee', description: 'Secured first position in the inter-school mathematics olympiad representing DMHS.' },
    { id: 'ACH002', studentId: 'STU001', title: 'Best Athlete Award',                 date: '2024-11-20', awardedBy: 'DMHS Sports Department',                 description: 'Awarded best overall athlete at the Annual Sports Day 2024 for outstanding performance.' },
  ],

  [DB_KEYS.TIMETABLE]: [
    {
      classId: '10A',
      schedule: {
        Monday:    ['Bangla', 'English', 'Mathematics', 'Physics', 'Chemistry', 'ICT'],
        Tuesday:   ['Mathematics', 'Bangla', 'English', 'Chemistry', 'Biology', 'Religion'],
        Wednesday: ['English', 'Mathematics', 'Physics', 'Bangla', 'History', 'ICT'],
        Thursday:  ['Physics', 'Chemistry', 'Bangla', 'English', 'Mathematics', 'Biology'],
        Friday:    ['Religion', 'ICT', 'English', 'Mathematics', 'Bangla', 'History'],
        Saturday:  ['Chemistry', 'Physics', 'Biology', 'Bangla', 'English', 'Mathematics'],
      },
    },
    {
      classId: '9A',
      schedule: {
        Monday:    ['Bangla', 'Mathematics', 'English', 'Chemistry', 'ICT', 'Religion'],
        Tuesday:   ['English', 'Bangla', 'Mathematics', 'Physics', 'History', 'ICT'],
        Wednesday: ['Mathematics', 'English', 'Bangla', 'Biology', 'Physics', 'Chemistry'],
        Thursday:  ['ICT', 'Chemistry', 'Physics', 'English', 'Bangla', 'Mathematics'],
        Friday:    ['Religion', 'Biology', 'History', 'Mathematics', 'English', 'Bangla'],
        Saturday:  ['Physics', 'Chemistry', 'Mathematics', 'Bangla', 'English', 'Biology'],
      },
    },
  ],
};

// ─── DB API ────────────────────────────────────────────────────────────────────

const DB = {
  /** Initialize all stores with seed data if they don't exist */
  init() {
    // Auto-reset if DB version changed (seed data structure updated)
    const storedVersion = localStorage.getItem(DB_VERSION_KEY);
    if (storedVersion !== DB_VERSION) {
      console.log(`[DMHS DB] Version changed (${storedVersion} → ${DB_VERSION}). Re-seeding...`);
      for (const key of Object.values(DB_KEYS)) {
        localStorage.removeItem(key);
      }
      localStorage.setItem(DB_VERSION_KEY, DB_VERSION);
    }

    let initialized = false;
    for (const [key, seed] of Object.entries(SEED)) {
      if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, JSON.stringify(seed));
        initialized = true;
      }
    }
    if (initialized) {
      console.log('[DMHS DB] Database initialized with seed data.');
    }
    return this;
  },

  /** Get all records from a store */
  getAll(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error(`[DMHS DB] Error reading key "${key}":`, e);
      return [];
    }
  },

  /** Get single record from a store */
  getById(key, id) {
    const records = this.getAll(key);
    return records.find(r => r.id === id) || null;
  },

  /** Get records filtered by a field value */
  getWhere(key, field, value) {
    return this.getAll(key).filter(r => r[field] === value);
  },

  /** Save all records to a store (replaces) */
  saveAll(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  },

  /** Add a new record */
  add(key, record) {
    const records = this.getAll(key);
    records.push(record);
    this.saveAll(key, records);
    this._logActivity('CREATE', key, record.id || 'unknown');
    return record;
  },

  /** Update a record by id */
  update(key, id, updates) {
    const records = this.getAll(key);
    const idx = records.findIndex(r => r.id === id);
    if (idx === -1) return null;
    records[idx] = { ...records[idx], ...updates };
    this.saveAll(key, records);
    this._logActivity('UPDATE', key, id);
    return records[idx];
  },

  /** Delete a record by id */
  delete(key, id) {
    const records = this.getAll(key);
    const filtered = records.filter(r => r.id !== id);
    this.saveAll(key, filtered);
    this._logActivity('DELETE', key, id);
    return true;
  },

  /** Get object store (single object, not array) */
  getObject(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  /** Save object store */
  saveObject(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
    return obj;
  },

  /** Generate next ID for a given prefix and store */
  nextId(key, prefix) {
    const records = this.getAll(key);
    if (!records.length) return `${prefix}001`;
    const nums = records.map(r => parseInt((r.id || '').replace(prefix, ''), 10)).filter(n => !isNaN(n));
    const max  = nums.length ? Math.max(...nums) : 0;
    return `${prefix}${String(max + 1).padStart(3, '0')}`;
  },

  /** Log activity */
  _logActivity(action, store, id) {
    try {
      const logs = this.getAll(DB_KEYS.ACTIVITY);
      logs.unshift({
        id: Date.now().toString(),
        action,
        store,
        recordId: id,
        timestamp: new Date().toISOString(),
        user: (JSON.parse(sessionStorage.getItem('dmhs_session') || '{}').name) || 'System',
      });
      // Keep only last 100 logs
      this.saveAll(DB_KEYS.ACTIVITY, logs.slice(0, 100));
    } catch (_) { /* silent */ }
  },

  /** Clear all stores and re-seed (factory reset) */
  reset() {
    for (const key of Object.values(DB_KEYS)) {
      localStorage.removeItem(key);
    }
    this.init();
    console.log('[DMHS DB] Database reset to seed data.');
  },
};

// ─── Grading Utilities ─────────────────────────────────────────────────────────

const GRADING = {
  /** Get grade letter from marks (Bangladeshi system) */
  getGrade(marks) {
    if (marks >= 80) return 'A+';
    if (marks >= 70) return 'A';
    if (marks >= 60) return 'A-';
    if (marks >= 50) return 'B';
    if (marks >= 40) return 'C';
    if (marks >= 33) return 'D';
    return 'F';
  },

  /** Get grade point from marks */
  getGradePoint(marks) {
    if (marks >= 80) return 5.00;
    if (marks >= 70) return 4.00;
    if (marks >= 60) return 3.50;
    if (marks >= 50) return 3.00;
    if (marks >= 40) return 2.00;
    if (marks >= 33) return 1.00;
    return 0.00;
  },

  /** Calculate GPA from subjects array [{name, marks}] */
  calculateGPA(subjects) {
    if (!subjects || !subjects.length) return 0;
    const total = subjects.reduce((sum, s) => sum + this.getGradePoint(s.marks), 0);
    return (total / subjects.length).toFixed(2);
  },

  /** Calculate total marks */
  totalMarks(subjects) {
    return subjects.reduce((sum, s) => sum + s.marks, 0);
  },

  /** Calculate average marks */
  averageMarks(subjects) {
    if (!subjects.length) return 0;
    return (this.totalMarks(subjects) / subjects.length).toFixed(1);
  },

  /** Get CSS class for grade display */
  getGradeClass(grade) {
    const map = { 'A+': 'grade-aplus', 'A': 'grade-a', 'A-': 'grade-aminus', 'B': 'grade-b', 'C': 'grade-c', 'D': 'grade-d', 'F': 'grade-f' };
    return map[grade] || 'grade-f';
  },

  /** Check if passed (no F in any subject) */
  isPassed(subjects) {
    return subjects.every(s => s.marks >= 33);
  },
};

// ─── Export ────────────────────────────────────────────────────────────────────

window.DB      = DB;
window.DB_KEYS = DB_KEYS;
window.GRADING = GRADING;
window.SEED    = SEED;

// Auto-initialize on load
DB.init();
