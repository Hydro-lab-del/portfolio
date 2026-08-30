import labScreenshot from '../../assets/lab.png';
import dashboardScreenshot from '../../assets/dashboard.png';
import robotPreview from '../../assets/robot-preview.jpg';

export const SCHOLAR_INFO = {
  name: "Junaid Ilyas",
  tagline: "Full-stack developer building interactive 3D web systems and embedded robotics",
  badge: "Available for Opportunities",
  subtitle: "Full-Stack Developer | BS Computer Science (2023 — 2027) | PEEF Scholar",
  bio: "Full-stack software developer and Computer Science scholar specializing in modern web platforms (React 19 / Node.js / MongoDB), real-time 3D WebGL simulations, and embedded robotics (ESP32 / FreeRTOS). Recipient of the Punjab Educational Endowment Fund (PEEF) Excellence Scholarship.",
  contactEmail: "j8881817@gmail.com",
  links: {
    github: "https://github.com/Hydro-lab-del",
    linkedin: "https://www.linkedin.com/in/muhammad-junaid-ilyas-9769a4324",
    email: "mailto:j8881817@gmail.com"
  }
};

export const PROJECTS_DATA = [
  {
    id: "virtual-chemistry-lab",
    title: "Virtual Chemistry Lab",
    subtitle: "Interactive 3D Simulation & AI Pedagogical Workbench (BS CS FYP)",
    description: "A high-precision 3D web laboratory enabling real-time chemical titrations, telemetry visualization, and AI-driven experiment analysis with enterprise in-memory JWT authentication and MongoDB trial persistence.",
    tags: ["Final Year Project", "Three.js / WebGL", "React 19", "Redux Toolkit", "MongoDB Atlas"],
    image: labScreenshot,
    imageWidth: 1600,
    imageHeight: 900,
    imageAlt: "Virtual Chemistry Lab 3D Workbench",
    actionText: "Explore Full FYP Case Study",
    modalType: "chemistry-detail",
    stats: [
      { label: "Architecture", value: "MERN + Three.js" },
      { label: "Rendering", value: "60 FPS WebGL" },
      { label: "Security", value: "Dual-Token JWT" },
      { label: "AI Engine", value: "Google GenAI" }
    ]
  },
  {
    id: "quadruped-robot-ai",
    title: "Quadruped Robot Platform",
    subtitle: "LOLIN ESP32-S2 Mini + SG90 Servos + 0.96\" OLED",
    description: "An accessible 3D-printed quadruped robot built on open-source robotics architecture, featuring a LOLIN ESP32-S2 Mini, 0.96\" I2C OLED display, and a custom Python Desktop Companion with Voice & AI control.",
    tags: ["LOLIN ESP32-S2 Mini", "SG90 Micro Servos", "0.96\" OLED", "Desktop Companion", "Groq AI"],
    image: robotPreview,
    imageWidth: 1600,
    imageHeight: 900,
    imageAlt: "Custom Quadruped Robot with LOLIN ESP32-S2 Mini, SG90 Servos, 0.96 OLED and Desktop Companion",
    actionText: "Explore Robotics Case Study",
    modalType: "robot-detail",
    stats: [
      { label: "MCU Core", value: "ESP32-S2 Mini" },
      { label: "Servos", value: "SG90 Micro" },
      { label: "Display", value: "0.96\" I2C OLED" },
      { label: "Software", value: "Python Companion" }
    ]
  },
  {
    id: "notesnest-workspace",
    title: "NotesNest",
    subtitle: "Modular Note-Taking & Task Workspace",
    description: "A full-stack productivity web application featuring rich-text composition, responsive masonry layout, dynamic reminder pipelines, and safe-recovery trash workflows.",
    tags: ["React 19", "Express 5", "TipTap 3", "MongoDB Atlas", "Brevo API"],
    image: dashboardScreenshot,
    imageWidth: 1600,
    imageHeight: 900,
    imageAlt: "NotesNest Workspace Dashboard",
    actionText: "Explore NotesNest Case Study",
    modalType: "notes-detail",
    stats: [
      { label: "Architecture", value: "MERN Stack" },
      { label: "Editor", value: "TipTap 3 + Sanitizer" },
      { label: "Security", value: "In-Memory Auth" },
      { label: "Scheduler", value: "Brevo / Cron" }
    ]
  }
];

export const SKILL_CATEGORIES = [
  {
    title: "Programming",
    icon: "code",
    skills: [
      { name: "C/C++", level: "Advanced", experience: "3+ Years", description: "Firmware optimization, memory safety, pointer manipulation & real-time embedded loops." },
      { name: "Python", level: "Advanced", experience: "3+ Years", description: "AI/ML pipelines, Groq/OpenAI integration, computer vision & automation scripts." },
      { name: "JavaScript", level: "Expert", experience: "4+ Years", description: "ESNext standards, asynchronous event loops, V8 optimization & DOM manipulation." },
      { name: "TypeScript", level: "Expert", experience: "3+ Years", description: "Strict type systems, generics, interface design & compile-time error prevention." }
    ]
  },
  {
    title: "Frameworks",
    icon: "layers",
    skills: [
      { name: "React", level: "Expert", experience: "3+ Years", description: "React 19 hooks, concurrent rendering, state management & component lifecycle." },
      { name: "Node.js", level: "Advanced", experience: "3+ Years", description: "Scalable I/O, REST APIs, WebSocket real-time servers & worker threads." },
      { name: "Express", level: "Advanced", experience: "3+ Years", description: "Middleware architecture, API routing, authentication & error handling." },
      { name: "Three.js / WebGL", level: "Proficient", experience: "2 Years", description: "Custom GLSL vertex/fragment shaders, buffer geometries & 3D matrices." }
    ]
  },
  {
    title: "Hardware",
    icon: "memory",
    skills: [
      { name: "ESP32-S2", level: "Advanced", experience: "2+ Years", description: "FreeRTOS task scheduling, Wi-Fi telemetry stack & I2C/SPI sensor interfaces." },
      { name: "Arduino", level: "Advanced", experience: "4+ Years", description: "Microcontroller prototyping, PWM servo control & analog circuit integration." },
      { name: "ARM Cortex", level: "Intermediate", experience: "1.5 Years", description: "Bare-metal programming, register-level debugging & low-power sleep modes." }
    ]
  }
];

export const INITIAL_NOTES = [
  {
    id: "note-1",
    title: "Q3 Goals & Ideas",
    category: "Project Alpha",
    content: `### Objectives\n- Objectives mockup what an objectives\n- Developed projects and explore a moment targets\n\n### Key Results\n- Key Results: Train and watch/target all new plan loadsames and respect in the bromozator\n- Key Results: Developed the offer access of narrows on the kickssome events\n\n### Brainstorming\n- What is a brainstorming\n- What is a brainstorming\n- What to archive brainstorm`,
    tags: ["Quarterly", "Architecture", "Sprint"],
    updatedAt: "2 mins ago",
    isEncrypted: true
  },
  {
    id: "note-2",
    title: "ESP32-S2 Gait Dynamics",
    category: "Robotics Core",
    content: `### Inverse Kinematics Implementation\n- Coxa-Femur-Tibia 3-DOF trigonometric matrix calculated at 100Hz.\n- Planetary gear backlash compensation: calibrated with Hall-effect encoder.\n- Groq AI conversational interrupt logic: priority interrupt on GPIO 14.`,
    tags: ["Firmware", "Robotics", "Kinematics"],
    updatedAt: "1 hour ago",
    isEncrypted: true
  },
  {
    id: "note-3",
    title: "WebGL Shader Pipeline Specs",
    category: "Chemistry Lab",
    content: `### Fragment Shader Calculations\n- Real-time van der Waals molecular surface approximation.\n- Phong lighting with ambient occlusion for chemical bonds.\n- Worker-thread numerical differential equation solver running Runge-Kutta 4th Order.`,
    tags: ["Graphics", "Shaders", "Telemetry"],
    updatedAt: "Yesterday",
    isEncrypted: false
  }
];
