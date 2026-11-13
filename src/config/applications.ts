export interface Application {
  id: string;
  name: string;
  shortName: string;
  description: string;
  url: string;
  category: 'Work' | 'AI' | 'HR' | 'Internship' | 'Management';
  icon: 'clipboard' | 'graduation-cap' | 'shield' | 'user-check' | 'message-square' | 'mic' | 'brain' | 'calendar' | 'calculator' | 'globe' | 'users' | 'network';
  color: string; // Tailwind glow / gradient reference or hex color
  features: string[];
  version: string;
  portalType?: 'connect' | 'showcase' | 'dpr' | 'prdams' | 'internship';
}

export const categories = ['All', 'Work', 'AI', 'HR', 'Internship', 'Management'] as const;

export const applications: Application[] = [
  {
    id: "dpr",
    name: "Nexora DPR Portal",
    shortName: "DPR",
    description: "Daily Progress & Reporting Portal for tracking company task status, progress, and project logs.",
    url: "https://dpr-nexora.vercel.app/",
    category: "Work",
    icon: "clipboard",
    color: "#0878C9", // Nexora Blue
    features: [
      "Real-time task tracking",
      "Daily automated reports",
      "Project milestone analytics",
      "Team assignment overview"
    ],
    version: "v2.4.1",
    portalType: "dpr"
  },
  {
    id: "nexora-connect",
    name: "Nexora Connect",
    shortName: "Connect",
    description: "Collaborative communication and team networking hub connecting Nexora personnel and platforms.",
    url: "https://nexora-connect-seven.vercel.app/",
    category: "Work",
    icon: "users",
    color: "#6366F1", // Indigo Accent
    features: [
      "Real-time team collaboration",
      "Direct announcements & updates",
      "Department coordination nodes",
      "Unified workforce integration"
    ],
    version: "v1.3.0",
    portalType: "connect"
  },
  {
    id: "internship",
    name: "Nexora's Internship Portal",
    shortName: "Internships",
    description: "Central educational portal managing Nexora's onboarding programs, learning pathways, and evaluations.",
    url: "https://internship-portal-silk.vercel.app/",
    category: "Internship",
    icon: "graduation-cap",
    color: "#D4A72C", // Accent Gold
    features: [
      "Curriculum tracker & modules",
      "Weekly assignment submissions",
      "Mentor evaluation panel",
      "Certificate generation tool"
    ],
    version: "v1.2.0",
    portalType: "internship"
  },
  {
    id: "prdams",
    name: "PRDAMS Portal",
    shortName: "PRDAMS",
    description: "Project Role & Digital Acknowledgement Management System for secure role and certificate verification.",
    url: "https://acknowledgement-generator-roan.vercel.app/auth",
    category: "Management",
    icon: "shield",
    color: "#16B9FF", // Electric Blue
    features: [
      "Digital acknowledgement generation",
      "Project role assignments & logs",
      "Secure authentication & verification",
      "Audit-ready resource tracking"
    ],
    version: "v3.1.0",
    portalType: "prdams"
  },
  {
    id: "hiregen",
    name: "HireGen AI",
    shortName: "HireGen",
    description: "Smart AI recruitment platform matching candidates to job opportunities with intelligent resume screening.",
    url: "https://hiregen-smart-recruiter.vercel.app/",
    category: "HR",
    icon: "user-check",
    color: "#8B5CF6", // Purple Accent
    features: [
      "Semantic resume screening",
      "Automated interview scoring",
      "Dynamic talent matching",
      "Custom screening filters"
    ],
    version: "v1.0.5"
  },
  {
    id: "smarthelp",
    name: "SmartHelp AI",
    shortName: "Smart Help",
    description: "Intelligent customer support chatbot assistant providing automated support and real-time operational troubleshooting.",
    url: "https://nexora-ai-chatbot-zeta.vercel.app/",
    category: "AI",
    icon: "message-square",
    color: "#10B981", // Emerald Green
    features: [
      "24/7 AI-driven customer support",
      "Instant query resolution",
      "Automated ticket escalations",
      "Self-learning database"
    ],
    version: "v2.0.2"
  },
  {
    id: "official-website",
    name: "Nexora Technologies",
    shortName: "Website",
    description: "Premium custom software & enterprise AI solutions company official web presence and corporate portal.",
    url: "https://www.nexoratechs.xyz/",
    category: "Work",
    icon: "globe",
    color: "#00E5FF", // Cyan Accent
    features: [
      "Custom Software & AI Solutions",
      "Corporate service portfolio",
      "Client showcase & case studies",
      "Enterprise support & contact"
    ],
    version: "Live",
    portalType: "showcase"
  },
  {
    id: "smartinterview",
    name: "Smart Interview Prep",
    shortName: "Interview Prep",
    description: "Interactive mock interview tool utilizing AI feedback to improve speech patterns and technical response profiles.",
    url: "https://nexora-ai-chatbot-zeta.vercel.app/",
    category: "AI",
    icon: "mic",
    color: "#EC4899", // Pink Accent
    features: [
      "Voice & context analyzer",
      "Real-time answer grading",
      "Custom interview templates",
      "Progressive skill scoring"
    ],
    version: "v1.1.0"
  },
  {
    id: "business-tools",
    name: "AI Business Tools",
    shortName: "Business Tools",
    description: "Advanced corporate analytical dashboard processing marketing metrics and pipeline logs with AI prediction.",
    url: "https://www.nexoratechs.xyz/",
    category: "Work",
    icon: "brain",
    color: "#F59E0B", // Amber Accent
    features: [
      "Predictive financial models",
      "AI content generation suite",
      "Market trend forecast graph",
      "Lead generation support"
    ],
    version: "v1.5.0"
  },
  {
    id: "calendar",
    name: "Ecosystem Calendar",
    shortName: "Calendar",
    description: "Built-in offline workspace calendar to manage schedules, view dates, and track personal daily notes.",
    url: "local:calendar",
    category: "Work",
    icon: "calendar",
    color: "#10B981", // Emerald Green
    features: [
      "Full monthly date grid view",
      "Navigate past/future months",
      "Write & save personal notes for any day",
      "Data persisted locally offline"
    ],
    version: "v1.0.0"
  },
  {
    id: "calculator",
    name: "Nexora Calculator",
    shortName: "Calculator",
    description: "Sleek built-in office calculator for rapid calculations and numeric references, works offline.",
    url: "local:calculator",
    category: "Work",
    icon: "calculator",
    color: "#EC4899", // Pink Accent
    features: [
      "Standard and decimal calculator keys",
      "Tactile fluid button animations",
      "Full session equation logs",
      "Works 100% offline with zero load delay"
    ],
    version: "v1.0.0"
  }
];
