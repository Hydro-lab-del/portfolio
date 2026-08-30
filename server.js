import express from 'express';
import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // JSON Body parsing
  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'CS Scholar Full-Stack Engine',
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // Scholar profile endpoint
  app.get('/api/scholar', (req, res) => {
    res.json({
      name: 'CS Scholar',
      degree: 'BS Computer Science',
      cgpa: '3.80 / 4.00',
      scholarship: 'PEEF Scholar',
      focus: ['3D WebGL Labs', 'Robotics & Firmware', 'Distributed Web Systems']
    });
  });

  // Contact API route
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log(`[Contact API] Received message from ${name} <${email}>: [${subject}] ${message}`);
    res.json({
      success: true,
      message: 'Transmission logged successfully in systems queue.',
      dispatchId: `TX-${Date.now().toString().slice(-6)}`
    });
  });

  // Robotics Command & Articulation API
  app.post('/api/robot/command', (req, res) => {
    const { command, angles } = req.body;
    res.json({
      success: true,
      echo: command,
      torqueRating: '12.0 Nm',
      status: 'EXECUTED_FREERTOS_CORE_0',
      telemetry: {
        clock: '240 MHz',
        voltage: 11.4,
        encoderStatus: 'CALIBRATED'
      }
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CS Scholar Full-Stack Server running on http://localhost:${PORT}`);
  });
}

startServer();
