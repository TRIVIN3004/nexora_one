// Unified Portal Storage & Offline State Manager for Nexora One

export interface ConnectUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE';
  designation: string;
  status: 'ONLINE' | 'AWAY' | 'IN_MEETING' | 'OFFLINE';
}

export interface ConnectBroadcast {
  id: string;
  title: string;
  content: string;
  author: string;
  category: 'General' | 'Engineering' | 'Executive' | 'HR';
  priority: 'NORMAL' | 'URGENT' | 'PINNED';
  timestamp: string;
  likes: number;
}

export interface ConnectMeeting {
  id: string;
  title: string;
  agenda: string;
  date: string;
  time: string;
  platform: 'Google Meet' | 'MS Teams' | 'Zoom';
  link: string;
  host: string;
  participants: number;
}

export interface ConnectWebinar {
  id: string;
  title: string;
  speaker: string;
  date: string;
  time: string;
  duration: string;
  tags: string[];
  registered: boolean;
}

export interface ConnectTicket {
  id: string;
  subject: string;
  category: 'IT' | 'Hardware' | 'HR' | 'Access' | 'Project';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
}

export interface DprEntry {
  id: string;
  date: string;
  member: string;
  department: string;
  project: string;
  tasksCompleted: string[];
  blockers: string;
  tomorrowPlan: string;
  hoursWorked: number;
  submittedAt: string;
}

export interface PrdamsCertificate {
  id: string;
  hash: string;
  recipientName: string;
  recipientEmail: string;
  projectName: string;
  role: string;
  issueDate: string;
  tenure: string;
  verified: boolean;
  signature: string;
}

export interface InternshipAssignment {
  id: string;
  week: number;
  title: string;
  studentName: string;
  githubUrl: string;
  demoUrl: string;
  submittedAt: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REVISION_NEEDED';
  score?: number;
  feedback?: string;
}

// Initial Seed Data
const initialBroadcasts: ConnectBroadcast[] = [
  {
    id: 'bc-1',
    title: 'Nexora One Unified Platform Release v2.0',
    content: 'All 5 core Nexora portals have been successfully merged into Nexora One for Android, iOS, and Desktop. Offline capability enabled.',
    author: 'Aakash Raj (Co-Founder & CTO)',
    category: 'Engineering',
    priority: 'PINNED',
    timestamp: 'Today at 09:30 AM',
    likes: 42
  },
  {
    id: 'bc-2',
    title: 'Upcoming Tech Webinar: Enterprise Agentic AI Swarms',
    content: 'Join us this Friday for a deep dive into autonomous multi-agent systems and real-time inference on edge devices.',
    author: 'Arutselvan (AI Research Lead)',
    category: 'Executive',
    priority: 'NORMAL',
    timestamp: 'Yesterday at 04:15 PM',
    likes: 28
  },
  {
    id: 'bc-3',
    title: 'Monthly DPR Submission Audit Completed',
    content: 'The DPR compliance across all engineering squads reached 98.4%. Great work on accurate work logging!',
    author: 'Naveen (Operations Lead)',
    category: 'General',
    priority: 'NORMAL',
    timestamp: '2 days ago',
    likes: 35
  }
];

const initialMeetings: ConnectMeeting[] = [
  {
    id: 'mt-1',
    title: 'Nexora Architecture & Multi-Platform Sync',
    agenda: 'Review Capacitor 8 Android & iOS build pipelines and desktop responsive controls.',
    date: '2026-11-14',
    time: '10:00 AM - 11:00 AM',
    platform: 'Google Meet',
    link: 'https://meet.google.com/nex-arch-sync',
    host: 'Aakash Raj',
    participants: 8
  },
  {
    id: 'mt-2',
    title: 'Internship Cohort Weekly Demo Day',
    agenda: 'AI & Web intern presentations on modular projects and PRDAMS validation.',
    date: '2026-11-15',
    time: '03:00 PM - 04:30 PM',
    platform: 'MS Teams',
    link: 'https://teams.microsoft.com/l/meetup/nexora-demo',
    host: 'Sharon J.',
    participants: 24
  }
];

const initialWebinars: ConnectWebinar[] = [
  {
    id: 'wb-1',
    title: 'Building Production AI Agents with Gemini & Antigravity',
    speaker: 'Aakash Raj, Founder & Chief Architect',
    date: 'Nov 20, 2026',
    time: '05:00 PM IST',
    duration: '90 Mins',
    tags: ['AI Agents', 'Architecture', 'TypeScript'],
    registered: true
  },
  {
    id: 'wb-2',
    title: 'Full-Stack Mobile Apps with React 19 & Capacitor',
    speaker: 'Trivin Sakthi, Lead Mobile Engineer',
    date: 'Nov 27, 2026',
    time: '04:00 PM IST',
    duration: '60 Mins',
    tags: ['Capacitor', 'React 19', 'iOS/Android'],
    registered: false
  }
];

const initialTickets: ConnectTicket[] = [
  {
    id: 'NX-8921',
    subject: 'Request Supabase Transaction Pooler Read Replica',
    category: 'IT',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    createdAt: '2026-11-12'
  },
  {
    id: 'NX-8922',
    subject: 'Certbot SSL Certificate Auto-renewal for Staging API',
    category: 'Project',
    priority: 'HIGH',
    status: 'OPEN',
    createdAt: '2026-11-13'
  }
];

const initialDprList: DprEntry[] = [
  {
    id: 'dpr-01',
    date: new Date().toISOString().split('T')[0],
    member: 'Trivin Sakthi',
    department: 'Full-Stack & Mobile',
    project: 'Nexora One',
    tasksCompleted: [
      'Configured unified mobile & desktop responsive shell',
      'Integrated PRDAMS Certificate Generator and Verification scanner',
      'Synchronized Capacitor Android & iOS platform bridges',
      'Created DPR submission & instant PDF report generator'
    ],
    blockers: 'None. All build pipelines pass successfully.',
    tomorrowPlan: 'Expand offline sync queue and fine-tune desktop window controls.',
    hoursWorked: 8.5,
    submittedAt: '06:30 PM'
  },
  {
    id: 'dpr-02',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    member: 'Trivin Sakthi',
    department: 'Full-Stack & Mobile',
    project: 'Nexora Connect',
    tasksCompleted: [
      'Implemented offline attendance punch card with live timer',
      'Added stress relief mini-games suite',
      'Configured meeting room integration'
    ],
    blockers: 'Minor styling adjustment on tablet aspect ratios.',
    tomorrowPlan: 'Unify with Nexora One master app.',
    hoursWorked: 8.0,
    submittedAt: '06:00 PM'
  }
];

const initialCertificates: PrdamsCertificate[] = [
  {
    id: 'PRD-2026-001',
    hash: 'NX-8F92A1-VERIFIED',
    recipientName: 'Shakthi J.',
    recipientEmail: 'shakthi@gonexora.com',
    projectName: 'Nexora Autonomous AI Gateway',
    role: 'Lead AI Engineer',
    issueDate: '2026-10-15',
    tenure: '6 Months',
    verified: true,
    signature: 'Aakash Raj'
  },
  {
    id: 'PRD-2026-002',
    hash: 'NX-3D41E7-VERIFIED',
    recipientName: 'Sharon',
    recipientEmail: 'sharon@gonexora.com',
    projectName: 'Nexora Connect Workspace',
    role: 'Senior Product Engineer',
    issueDate: '2026-10-20',
    tenure: '6 Months',
    verified: true,
    signature: 'Naveen'
  }
];

const initialAssignments: InternshipAssignment[] = [
  {
    id: 'asn-1',
    week: 1,
    title: 'Modern UI Architecture & State Management',
    studentName: 'Alex Mercer',
    githubUrl: 'https://github.com/nexora-interns/alex-ui-task',
    demoUrl: 'https://alex-ui-demo.vercel.app',
    submittedAt: '2026-11-10',
    status: 'APPROVED',
    score: 95,
    feedback: 'Outstanding component hierarchy and clean Tailwind styling!'
  },
  {
    id: 'asn-2',
    week: 2,
    title: 'Full-Stack REST & Supabase Integration',
    studentName: 'Alex Mercer',
    githubUrl: 'https://github.com/nexora-interns/alex-backend-task',
    demoUrl: 'https://alex-api-demo.vercel.app',
    submittedAt: '2026-11-13',
    status: 'UNDER_REVIEW',
    score: undefined,
    feedback: undefined
  }
];

// Helper functions for localStorage persistence
export const portalStorage = {
  // Connect data
  getBroadcasts: (): ConnectBroadcast[] => {
    const raw = localStorage.getItem('nexora_connect_broadcasts');
    return raw ? JSON.parse(raw) : initialBroadcasts;
  },
  saveBroadcast: (bc: Omit<ConnectBroadcast, 'id' | 'likes'>) => {
    const all = portalStorage.getBroadcasts();
    const newBc: ConnectBroadcast = {
      ...bc,
      id: `bc-${Date.now()}`,
      likes: 0
    };
    const updated = [newBc, ...all];
    localStorage.setItem('nexora_connect_broadcasts', JSON.stringify(updated));
    return updated;
  },
  getMeetings: (): ConnectMeeting[] => {
    const raw = localStorage.getItem('nexora_connect_meetings');
    return raw ? JSON.parse(raw) : initialMeetings;
  },
  saveMeeting: (meeting: Omit<ConnectMeeting, 'id'>) => {
    const all = portalStorage.getMeetings();
    const newMeeting = { ...meeting, id: `mt-${Date.now()}` };
    const updated = [...all, newMeeting];
    localStorage.setItem('nexora_connect_meetings', JSON.stringify(updated));
    return updated;
  },
  getWebinars: (): ConnectWebinar[] => {
    const raw = localStorage.getItem('nexora_connect_webinars');
    return raw ? JSON.parse(raw) : initialWebinars;
  },
  toggleWebinarRegister: (id: string) => {
    const all = portalStorage.getWebinars();
    const updated = all.map(w => w.id === id ? { ...w, registered: !w.registered } : w);
    localStorage.setItem('nexora_connect_webinars', JSON.stringify(updated));
    return updated;
  },
  getTickets: (): ConnectTicket[] => {
    const raw = localStorage.getItem('nexora_connect_tickets');
    return raw ? JSON.parse(raw) : initialTickets;
  },
  saveTicket: (t: Omit<ConnectTicket, 'id' | 'status' | 'createdAt'>) => {
    const all = portalStorage.getTickets();
    const newTicket: ConnectTicket = {
      ...t,
      id: `NX-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'OPEN',
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [newTicket, ...all];
    localStorage.setItem('nexora_connect_tickets', JSON.stringify(updated));
    return updated;
  },

  // DPR data
  getDprs: (): DprEntry[] => {
    const raw = localStorage.getItem('nexora_dpr_entries');
    return raw ? JSON.parse(raw) : initialDprList;
  },
  saveDpr: (dpr: Omit<DprEntry, 'id' | 'submittedAt'>) => {
    const all = portalStorage.getDprs();
    const newEntry: DprEntry = {
      ...dpr,
      id: `dpr-${Date.now()}`,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [newEntry, ...all];
    localStorage.setItem('nexora_dpr_entries', JSON.stringify(updated));
    return updated;
  },
  getAttendanceStatus: () => {
    const raw = localStorage.getItem('nexora_attendance_state');
    if (raw) return JSON.parse(raw);
    return {
      clockedIn: false,
      clockInTime: null as string | null,
      todayHours: 0
    };
  },
  setAttendanceStatus: (status: { clockedIn: boolean; clockInTime: string | null; todayHours: number }) => {
    localStorage.setItem('nexora_attendance_state', JSON.stringify(status));
  },

  // PRDAMS data
  getCertificates: (): PrdamsCertificate[] => {
    const raw = localStorage.getItem('nexora_prdams_certs');
    return raw ? JSON.parse(raw) : initialCertificates;
  },
  saveCertificate: (cert: Omit<PrdamsCertificate, 'id' | 'hash' | 'verified'>) => {
    const all = portalStorage.getCertificates();
    const hex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newCert: PrdamsCertificate = {
      ...cert,
      id: `PRD-${new Date().getFullYear()}-${String(all.length + 1).padStart(3, '0')}`,
      hash: `NX-${hex}-VERIFIED`,
      verified: true
    };
    const updated = [newCert, ...all];
    localStorage.setItem('nexora_prdams_certs', JSON.stringify(updated));
    return newCert;
  },

  // Internship data
  getAssignments: (): InternshipAssignment[] => {
    const raw = localStorage.getItem('nexora_internship_assignments');
    return raw ? JSON.parse(raw) : initialAssignments;
  },
  saveAssignment: (asn: Omit<InternshipAssignment, 'id' | 'submittedAt' | 'status'>) => {
    const all = portalStorage.getAssignments();
    const newAsn: InternshipAssignment = {
      ...asn,
      id: `asn-${Date.now()}`,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'SUBMITTED'
    };
    const updated = [newAsn, ...all];
    localStorage.setItem('nexora_internship_assignments', JSON.stringify(updated));
    return updated;
  },
  gradeAssignment: (id: string, score: number, feedback: string) => {
    const all = portalStorage.getAssignments();
    const updated = all.map(a => a.id === id ? { ...a, score, feedback, status: 'APPROVED' as const } : a);
    localStorage.setItem('nexora_internship_assignments', JSON.stringify(updated));
    return updated;
  }
};

