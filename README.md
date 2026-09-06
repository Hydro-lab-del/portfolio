# Junaid Ilyas — Full-Stack Developer & Systems Portfolio

My portfolio website — built with React 19, Three.js, and Tailwind CSS. Shows my web projects, a chemistry lab simulator, and an ESP32 robot.

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=flat&logo=three.js&logoColor=white)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

---

## 🌟 Featured Engineering Projects

### 1. 🧪 Virtual Chemistry Lab (BS CS Final Year Project)
- High-precision 3D web laboratory for practicing titrations with live data visualization and AI-assisted feedback.
- **Key Features**: 60 FPS Three.js rendering, Runge-Kutta ODE solver for reactions, MongoDB storage, and JWT authentication.
- **Tech Stack**: React 19, Three.js / WebGL, Redux Toolkit, Node.js, Express, MongoDB.

### 2. 🤖 Quadruped Robot Platform & Desktop Companion (Sesame)
- Accessible 3D-printed PLA quadruped robot with real-time 3-DOF inverse kinematics and animated emotive expressions.
- **Hardware Architecture**: LOLIN ESP32-S2 Mini (240MHz single-core Xtensa LX7), 0.96" I2C OLED display `( • ω • )`, SG90 micro servos, and custom top power PCB.
- **Software Suite**: FreeRTOS servo control at 100Hz, walking gait solver (Trot, Crawl, Wave, Stand), and a Python desktop app with voice control and Groq LLM chat.

### 3. 📝 NotesNest — Encrypted Cloud Workspace
- Collaborative markdown notes workspace with sub-15ms typing synchronization and client-side cryptography.
- **Tech Stack**: React, Node.js, Express, MongoDB Atlas, Web Crypto API (AES-256-GCM).

---

## 🛠️ Core Technology Stack

| Category | Technologies & Tools |
| :--- | :--- |
| **Frontend UI** | React 19, Tailwind CSS v4, Motion (Framer Motion), Lucide React |
| **3D & Graphics** | Three.js, WebGL Shaders, Canvas Confetti |
| **Backend & APIs** | Node.js, Express.js, FormSubmit.co Email Relay, REST APIs |
| **Embedded & Robotics** | LOLIN ESP32-S2 Mini, FreeRTOS, SG90 Servos, SSD1306 OLED, I2C/SPI/UART |
| **Build & Tooling** | Vite 6, ESBuild, Git, PostCSS |

---

## 🚀 Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes bundled with Node.js)

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/Hydro-lab-del/portfolio.git
   cd portfolio
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`.

### 📄 Adding Your Resume PDF
To enable the **"Download Academic CV"** button:
1. Place your resume PDF inside the `public/` directory and name it `resume.pdf`:
   ```
   public/resume.pdf
   ```
2. The portfolio will automatically serve and download this file when visitors click the CV button.
3. *(Note: `public/resume.pdf` is ignored in `.gitignore` by default to keep personal contact documents private when pushing to a public repository).*

---

## 🌐 Deploy to Vercel (1-Click Deployment)

This repository includes [`vercel.json`](vercel.json) and [`public/_redirects`](public/_redirects) for client-side routing:

1. Push this repository to your GitHub account (`Hydro-lab-del`).
2. Visit [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **"Add New Project"** and import your portfolio repository.
4. Framework Preset will automatically detect **Vite**.
5. Click **"Deploy"**.

---

## 📬 Contact & Connect

- **Email**: [j8881817@gmail.com](mailto:j8881817@gmail.com)
- **LinkedIn**: [Muhammad Junaid Ilyas](https://www.linkedin.com/in/muhammad-junaid-ilyas-9769a4324)
- **GitHub**: [@Hydro-lab-del](https://github.com/Hydro-lab-del)

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
