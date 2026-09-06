import labScreenshot from '../../assets/lab.png';
import dashboardScreenshot from '../../assets/dashboard.png';
import robotPreview from '../../assets/robot-preview.jpg';

export const SCHOLAR_INFO = {
  name: "Junaid Ilyas",
  tagline: "Full-stack developer who builds web apps, 3D simulations, and hobby robotics",
  badge: "Available for Opportunities",
  subtitle: "Full-Stack Developer | BS Computer Science (2023 — 2027) | PEEF Scholar",
  bio: "Computer Science student (PEEF Scholar) with hands-on experience building web apps with React and Node.js, 3D browser simulations with Three.js, and an ESP32-based hobby robot.",
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
    subtitle: "Interactive 3D Chemistry Simulation (Final Year Project)",
    description: "A 3D browser-based chemistry lab where students can practice titrations, view live graphs, and get feedback from an AI assistant. Built with React, Three.js, and MongoDB.",
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
      { label: "AI Assist", value: "Gemini API" }
    ]
  },
  {
    id: "quadruped-robot-ai",
    title: "Quadruped Robot Platform",
    subtitle: "LOLIN ESP32-S2 Mini + SG90 Servos + 0.96\" OLED",
    description: "A 3D-printed four-legged walking robot powered by an ESP32 with an OLED face display, controllable from a Python desktop app with voice commands.",
    tags: ["LOLIN ESP32-S2 Mini", "SG90 Micro Servos", "0.96\" OLED", "Desktop Companion", "Groq LLM"],
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
    description: "A note-taking web app with a rich-text editor, reminders via email, and a soft-delete trash system. Built with React, Express, and MongoDB.",
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
      { name: "C/C++", level: "Advanced", experience: "Coursework & Robotics", description: "Embedded firmware, memory management, and real-time control loops." },
      { name: "Python", level: "Advanced", experience: "Projects & Scripting", description: "API integrations (Groq, OpenAI), scripting, and basic computer vision." },
      { name: "JavaScript", level: "Proficient", experience: "Web Projects", description: "Modern JS (ES6+), async programming, and DOM manipulation." },
      { name: "TypeScript", level: "Proficient", experience: "Recent Projects", description: "Static typing, generics, and interface design for safer code." }
    ]
  },
  {
    title: "Frameworks",
    icon: "layers",
    skills: [
      { name: "React", level: "Proficient", experience: "All Web Projects", description: "React hooks, state management, and component lifecycle." },
      { name: "Node.js", level: "Advanced", experience: "Backend Projects", description: "REST APIs, WebSocket servers, and background tasks." },
      { name: "Express", level: "Advanced", experience: "Backend Projects", description: "Middleware, API routing, authentication, and error handling." },
      { name: "Three.js / WebGL", level: "Proficient", experience: "FYP Project", description: "Three.js, 3D geometry, and scene management." }
    ]
  },
  {
    title: "Hardware",
    icon: "memory",
    skills: [
      { name: "ESP32-S2", level: "Advanced", experience: "Robot Project", description: "FreeRTOS task scheduling, Wi-Fi networking, and I2C/SPI sensor interfaces." },
      { name: "Arduino", level: "Advanced", experience: "Coursework & Hobby", description: "Microcontroller prototyping, PWM servo control, and analog circuits." },
      { name: "ARM Cortex", level: "Intermediate", experience: "Coursework", description: "Bare-metal programming, register-level debugging, and low-power sleep modes." }
    ]
  }
];

export const INITIAL_NOTES = [
  {
    id: "note-1",
    title: "Q3 Goals & Ideas",
    category: "Project Alpha",
    content: `### Objectives\n- Finish the chemistry lab titration module\n- Deploy NotesNest to production on Vercel\n\n### Key Results\n- Ship WebGL workbench with 60 FPS target\n- Complete user auth flow with JWT refresh tokens\n\n### Brainstorming\n- Explore adding calorimetry simulation\n- Consider adding collaborative editing`,
    tags: ["Quarterly", "Planning", "Sprint"],
    updatedAt: "2 mins ago",
    isEncrypted: true
  },
  {
    id: "note-2",
    title: "ESP32-S2 Gait Dynamics",
    category: "Robotics Core",
    content: `### Inverse Kinematics Implementation\n- Coxa-Femur-Tibia 3-DOF trigonometric calculations running at 100Hz.\n- Servo horn alignment calibrated to reduce backlash.\n- Voice command triggers movement via priority interrupt on GPIO 14.`,
    tags: ["Firmware", "Robotics", "Kinematics"],
    updatedAt: "1 hour ago",
    isEncrypted: true
  },
  {
    id: "note-3",
    title: "WebGL Shader Notes",
    category: "Chemistry Lab",
    content: `### Fragment Shader Work\n- Approximate van der Waals surfaces for molecule rendering.\n- Phong lighting with ambient occlusion on chemical bonds.\n- Runge-Kutta 4th Order ODE solver runs in a Web Worker thread.`,
    tags: ["Graphics", "Shaders", "Performance"],
    updatedAt: "Yesterday",
    isEncrypted: false
  }
];
