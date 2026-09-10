import labScreenshot from '../../assets/lab.png';
import dashboardScreenshot from '../../assets/dashboard.png';
import robotPreview from '../../assets/robot-preview.jpg';

export const SCHOLAR_INFO = {
  name: "Junaid Ilyas",
  tagline: "Full-Stack MERN Developer building modern, scalable web platforms",
  badge: "Available for MERN Opportunities",
  subtitle: "BS Computer Science (2023 — 2027) • PEEF Merit Scholar",
  bio: "Passionate about engineering responsive React frontends, secure Node.js & Express REST APIs, and clean database architectures with MongoDB Atlas.",
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
    subtitle: "Interactive 3D Chemistry Simulation Platform (BS CS FYP)",
    description: "A browser-based full-stack chemistry simulation platform built with the MERN stack. Features interactive 3D WebGL titration experiments, real-time data graphing, dual-token JWT authentication, and AI-assisted feedback.",
    tags: ["MERN Stack", "React 19", "Node.js / Express", "MongoDB Atlas", "Three.js ", "Redux Toolkit"],
    image: labScreenshot,
    imageWidth: 1600,
    imageHeight: 900,
    imageAlt: "Virtual Chemistry Lab 3D Workbench",
    actionText: "Explore Full FYP Case Study",
    modalType: "chemistry-detail",
    stats: [
      { label: "Architecture", value: "MERN Stack" },
      { label: "Client", value: "React 19 + WebGL" },
      { label: "Security", value: "Dual-Token JWT" },
      { label: "Database", value: "MongoDB Atlas" }
    ]
  },
  {
    id: "notesnest-workspace",
    title: "NotesNest",
    subtitle: "Full-Stack MERN Productivity Workspace",
    description: "A modular note-taking web application featuring rich-text editing, automated email reminders, and a soft-delete trash recovery system. Built entirely on the MERN stack with in-memory auth and MongoDB Atlas.",
    tags: ["MERN Stack", "React 19", "Express 5", "MongoDB Atlas", "Node.js", "TipTap 3"],
    image: dashboardScreenshot,
    imageWidth: 1600,
    imageHeight: 900,
    imageAlt: "NotesNest Workspace Dashboard",
    actionText: "Explore NotesNest Case Study",
    liveUrl: "https://notenest-web.vercel.app/welcome",
    modalType: "notes-detail",
    stats: [
      { label: "Architecture", value: "MERN Stack" },
      { label: "Editor", value: "TipTap 3 Rich Text" },
      { label: "Security", value: "In-Memory Auth" },
      { label: "Database", value: "MongoDB Atlas" }
    ]
  },
  {
    id: "quadruped-robot-ai",
    title: "Quadruped Robot Platform",
    subtitle: "Hardware Engineering & Robotics Showcase (Hobby)",
    description: "A custom 3D-printed four-legged walking robot built as an exploratory hardware project, featuring an ESP32 microcontroller, 0.96\" OLED facial display, and desktop control interface.",
    tags: ["Hardware Showcase", "ESP32-S2 Mini", "SG90 Micro Servos", "0.96\" OLED", "IoT Prototyping"],
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
      { label: "Category", value: "Hardware Showcase" }
    ]
  }
];

export const SKILL_CATEGORIES = [
  {
    title: "Frontend Architecture",
    icon: "code",
    skills: [
      { name: "React 19", role: "Core Frontend" },
      { name: "JavaScript (ES6+)", role: "Core Language" },
      { name: "Tailwind CSS", role: "UI Styling" },
      { name: "Redux Toolkit", role: "State Management" },
      
    ]
  },
  {
    title: "Backend & API Engineering",
    icon: "layers",
    skills: [
      { name: "Node.js", role: "Server Runtime" },
      { name: "Express.js", role: "API Framework" },
      { name: "RESTful APIs", role: "API Architecture" },
      { name: "JWT Auth & Security", role: "Web Security" }
    ]
  },
  {
    title: "Database & Tooling",
    icon: "memory",
    skills: [
      { name: "MongoDB Atlas", role: "NoSQL Database" },
      { name: "Mongoose ODM", role: "Data Modeling" },
      { name: "Postman", role: "API Testing" },
      { name: "Git & GitHub", role: "Version Control" }
    ]
  }
];

