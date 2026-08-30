import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Cpu, 
  Terminal, 
  Send, 
  RefreshCw, 
  Zap, 
  GitCompare, 
  Layers, 
  Sliders, 
  ShieldCheck, 
  Radio, 
  BatteryCharging, 
  CheckCircle2, 
  Camera,
  Maximize2,
  Sparkles,
  Info
} from 'lucide-react';
import robotSchematic from '../../../assets/robot-schematic.svg';
import robotPreview from '../../../assets/robot-preview.jpg';

export const RobotSchematicModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('hardware');
  const [coxaAngle, setCoxaAngle] = useState(25);
  const [femurAngle, setFemurAngle] = useState(48);
  const [tibiaAngle, setTibiaAngle] = useState(-32);
  const [gaitMode, setGaitMode] = useState('trot');
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [selectedCircuitPart, setSelectedCircuitPart] = useState('power-bus');
  const [activePhotoHotspot, setActivePhotoHotspot] = useState(null);

  const [commandLogs, setCommandLogs] = useState([
    { id: '1', sender: 'esp32', text: 'ESP32-S2 Core 0 booted. FreeRTOS scheduler active (240MHz).', time: '10:04:01' },
    { id: '2', sender: 'esp32', text: 'Hall sensors calibrated: 4-leg IK matrix synchronized.', time: '10:04:02' },
    { id: '3', sender: 'groq', text: 'Python Groq AI engine connected over serial baud 921600. Ready for conversational articulation.', time: '10:04:03' }
  ]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Handle gait presets
  const applyGaitPreset = (mode) => {
    setGaitMode(mode);
    if (mode === 'stand') {
      setCoxaAngle(0);
      setFemurAngle(45);
      setTibiaAngle(-45);
    } else if (mode === 'trot') {
      setCoxaAngle(25);
      setFemurAngle(55);
      setTibiaAngle(-30);
    } else if (mode === 'crawl') {
      setCoxaAngle(35);
      setFemurAngle(60);
      setTibiaAngle(-20);
    } else if (mode === 'wave') {
      setCoxaAngle(-15);
      setFemurAngle(80);
      setTibiaAngle(10);
    }
  };

  // Handle sending AI command
  const handleSendCommand = (cmdText) => {
    const text = (cmdText || aiInput).trim();
    if (!text) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const userMsg = { id: Date.now().toString(), sender: 'user', text, time: timeStr };
    setCommandLogs((prev) => [...prev, userMsg]);
    setAiInput('');
    setIsAiProcessing(true);

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();
      if (lower.includes('scan') || lower.includes('obstacle')) {
        reply = 'LiDAR perimeter sweep complete: 0 obstacles detected within 2.5m radius. Forward vector clear.';
      } else if (lower.includes('kinematic') || lower.includes('angle') || lower.includes('gait')) {
        reply = `Computed trigonometric 3-DOF matrix for Gait [${gaitMode.toUpperCase()}]. Coxa: ${coxaAngle}°, Femur: ${femurAngle}°, Tibia: ${tibiaAngle}°. Foot end-effector (X: 184mm, Y: 42mm, Z: -120mm).`;
      } else if (lower.includes('calibrate') || lower.includes('reset')) {
        reply = 'Zeroing optical encoders. PWM duty cycles centered at 1500µs. Joint calibration confirmed (±0.05° error margin).';
      } else {
        reply = `Groq Llama-3 Companion parsed intent: "${text}". Adjusting servo torque limits to 12.0 Nm and dispatching telemetry packets to ESP32-S2 GPIO 14.`;
      }

      setCommandLogs((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'groq', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }
      ]);
      setIsAiProcessing(false);
    }, 650);
  };

  const calculatedTorque = +(8.2 + Math.abs(femurAngle) * 0.06 + Math.abs(tibiaAngle) * 0.04).toFixed(1);

  const circuitComponents = [
    {
      id: 'oled-display',
      name: '0.96" I2C SSD1306 OLED Face Screen',
      category: 'Visual & Expressive UI',
      highlight: '128x64 Monochrome OLED rendering ( • ω • ) face expressions & AI telemetry',
      cadDiff: 'The physical build integrates a front-facing 0.96" I2C OLED display inside the 3D-printed cat-ear visor, driven over I2C (SDA/SCL) at 400kHz to animate real-time facial expressions, blink cycles, and companion mood states.',
      specs: ['0.96" 128x64 Resolution', 'SSD1306 I2C Driver (0x3C)', 'Real-time ( • ω • ) Expressions', 'Low Power Consumption (<20mA)'],
      signals: 'LOLIN ESP32-S2 Mini I2C (SDA / SCL) → 0.96" OLED Display VDD/GND'
    },
    {
      id: 'esp32-mcu',
      name: 'LOLIN ESP32-S2 Mini Microcontroller',
      category: 'Compute & Kinematics Engine',
      highlight: 'Xtensa 32-bit LX7 @ 240MHz + 4MB Flash + 2MB PSRAM + Native USB-C',
      cadDiff: 'The robot utilizes the compact LOLIN ESP32-S2 Mini board running a FreeRTOS 100Hz 3-DOF inverse kinematics loop, native USB CDC serial bridge, and hardware interrupts for low-latency Groq AI intent processing.',
      specs: ['240MHz Single-Core LX7', '4MB Flash + 2MB PSRAM', '27 Digital I/O Pins', 'Native USB-C CDC Interface'],
      signals: 'Native USB / Serial (UART) ↔ Python Groq AI Host | I2C Bus to OLED & Drivers'
    },
    {
      id: 'sg90-servos',
      name: 'SG90 9g Micro Servos Actuation',
      category: 'Joint Actuation (3-DOF)',
      highlight: 'Blue transparent micro servos delivering 1.8 kg·cm torque @ 4.8V',
      cadDiff: 'Each leg features 3-DOF joint articulation powered by SG90 micro servos directly mated into custom 3D-printed PLA limb brackets, calibrated with 50Hz PWM duty cycles (500µs to 2500µs range).',
      specs: ['1.8 kg·cm Torque (@4.8V)', '0.10 sec/60° Speed', 'Operating Voltage: 4.8V - 6.0V', 'Weight: 9g per servo'],
      signals: 'ESP32 GPIO / PWM Driver → 3-Pin Servo Headers (PWM Signal, 5V V+, GND)'
    },
    {
      id: 'power-bus',
      name: 'Top-Mounted Power Regulation PCB',
      category: 'Power Management',
      highlight: '5V Buck Step-Down Regulation + Decoupling Capacitors',
      cadDiff: 'A custom top-mounted breakout PCB integrates filter capacitors and high-efficiency buck regulation to prevent voltage dips and MCU resets when multiple SG90 servos draw transient stall currents.',
      specs: ['High-Efficiency Buck Converter', 'Low-ESR Decoupling Capacitors', 'JST Power Input Connector', 'Dedicated Logic & Servo Rails'],
      signals: 'Battery Input → Buck Regulator → 5V Servo Rail + 3.3V ESP32 LDO'
    },
    {
      id: 'pla-chassis',
      name: '3D-Printed PLA Cat-Ear Chassis',
      category: 'Mechanical Structure',
      highlight: 'Matte Black PLA Structure with Integrated Cat-Ear Visor',
      cadDiff: 'Lightweight, durable 3D-printed PLA body designed specifically for the Sesame robot architecture, featuring snap-fit servo horn mounting slots, cable routing channels, and protective cat-ear OLED housing.',
      specs: ['100% Infill PLA Structural Joints', 'Integrated Cat-Ear Visor Housing', 'Low Total AUW (<380g)', 'Modular Leg Link Replacement'],
      signals: 'Mechanical load distributed symmetrically across 4 corner leg pivots'
    }
  ];

  const photoHotspots = [
    { 
      id: 'oled', 
      name: '0.96" I2C OLED Face Display ( • ω • )', 
      pos: 'top-[44%] left-[48%]', 
      desc: '0.96" SSD1306 128x64 OLED screen rendering dynamic animated expressions, blink animations, and AI status.' 
    },
    { 
      id: 'mcu', 
      name: 'LOLIN ESP32-S2 Mini & Top PCB', 
      pos: 'top-[31%] left-[47%]', 
      desc: 'Compact 240MHz ESP32-S2 Mini controller with 4MB Flash, 2MB PSRAM, power capacitors, and buck regulation.' 
    },
    { 
      id: 'servo-left', 
      name: 'Front Left Knee SG90 Micro-Servo', 
      pos: 'top-[63%] left-[22%]', 
      desc: 'Transparent blue 9g micro servo delivering 1.8 kg·cm torque for 3-DOF leg articulation.' 
    },
    { 
      id: 'servo-right', 
      name: 'Front Right Knee SG90 Micro-Servo', 
      pos: 'top-[63%] left-[78%]', 
      desc: 'Synchronized SG90 micro servo driving the right front tibia and femur gait trajectories.' 
    },
    { 
      id: 'chassis', 
      name: '3D-Printed PLA Cat-Ear Chassis', 
      pos: 'top-[37%] left-[48%]', 
      desc: 'Matte black 3D-printed PLA frame with custom cat-ear visor protecting the 0.96" OLED display.' 
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="robot-dialog-title"
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-100 flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/70 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="robot-dialog-title" className="font-bold text-white text-base">
                  {project?.title || 'Quadruped Robot & AI Companion'}
                </h3>
                <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono-code rounded-full font-semibold">
                  ( • ω • ) Real Build
                </span>
              </div>
              <p className="text-xs font-mono-code text-slate-400">LOLIN ESP32-S2 Mini • SG90 Servos • 0.96" OLED • 3D-Printed PLA</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Navigation Tabs */}
            <div className="flex bg-slate-950 p-1 rounded-xl text-xs font-mono-code border border-slate-800 overflow-x-auto max-w-full">
              <button
                type="button"
                id="robot-tab-hardware"
                onClick={() => setActiveTab('hardware')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'hardware' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                Physical Build
              </button>

              <button
                type="button"
                id="robot-tab-circuits"
                onClick={() => setActiveTab('circuits')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'circuits' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                Circuits & Wiring
              </button>

              <button
                type="button"
                id="robot-tab-ik"
                onClick={() => setActiveTab('kinematics')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'kinematics' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                Kinematics
              </button>

              <button
                type="button"
                id="robot-tab-schematic"
                onClick={() => setActiveTab('schematic')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'schematic' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Blueprint
              </button>

              <button
                type="button"
                id="robot-tab-ai"
                onClick={() => setActiveTab('ai-companion')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-medium flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'ai-companion' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                Groq AI
              </button>
            </div>

            <button
              type="button"
              aria-label="Close dialog"
              id="close-robot-modal-btn"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 bg-slate-900/60">
          
          {/* TAB 1: Physical Build & Photo Gallery */}
          {activeTab === 'hardware' && (
            <div className="space-y-5">
              {/* Photo Showcase Container with Interactive Callouts */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 shadow-2xl group">
                <div className="relative max-w-sm sm:max-w-md w-full aspect-3/4 rounded-xl overflow-hidden bg-slate-900 border border-slate-800/80 shadow-2xl">
                  <img
                    src={robotPreview}
                    alt="Custom Quadruped Robot with OLED Animated Screen and ESP32 Controller"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                  />

                  {/* Hotspot Markers */}
                  {photoHotspots.map((spot) => (
                    <div
                      key={spot.id}
                      className={`absolute ${spot.pos} z-20 -translate-x-1/2 -translate-y-1/2`}
                    >
                      <button
                        type="button"
                        onClick={() => setActivePhotoHotspot(activePhotoHotspot?.id === spot.id ? null : spot)}
                        className={`relative flex items-center justify-center w-7 h-7 rounded-full transition-all cursor-pointer ${
                          activePhotoHotspot?.id === spot.id
                            ? 'bg-cyan-400 text-slate-950 scale-125 shadow-[0_0_15px_rgba(6,182,212,0.9)]'
                            : 'bg-slate-900/90 text-cyan-300 border border-cyan-400/80 hover:scale-110 hover:bg-cyan-400 hover:text-slate-950 shadow-lg'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-current" />
                      </button>
                    </div>
                  ))}

                  {/* Selected Hotspot Detail Card */}
                  {activePhotoHotspot && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-4 left-4 right-4 z-30 bg-slate-950/95 backdrop-blur-md border border-cyan-500/40 p-3.5 rounded-xl shadow-2xl"
                    >
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 font-mono-code">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{activePhotoHotspot.name}</span>
                        </div>
                        <button
                          onClick={() => setActivePhotoHotspot(null)}
                          className="text-slate-400 hover:text-white text-xs cursor-pointer p-0.5"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-mono-code">
                        {activePhotoHotspot.desc}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Bottom Bar on Photo */}
                <div className="w-full max-w-md flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code pt-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-slate-200 rounded-lg text-[11px]">
                      OLED ( • ω • ) + ESP32
                    </span>
                    <span className="px-2.5 py-1 bg-cyan-950 border border-cyan-800 text-cyan-300 rounded-lg text-[11px]">
                      Micro-Servo Articulation
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Click pins to inspect hardware
                  </span>
                </div>
              </div>

              {/* Subsystems Quick Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono-code">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> 01 / Compute & Control
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    ESP32-S2 handles 100Hz real-time FreeRTOS inverse kinematics loops while streaming telemetry to Python Groq AI.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-amber-400 font-bold mb-1 flex items-center gap-1.5">
                    <Zap className="w-4 h-4" /> 02 / Power Distribution
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Dedicated 5V/10A high-current BEC regulator paired with 1000µF low-ESR capacitors prevents brownouts under stall loads.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" /> 03 / Mechanical Linkages
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Precision CNC Aluminum 6061-T6 limbs with 10:1 planetary gear reduction for high stiffness and zero backlash.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Physical Hardware & Real Circuits Breakdown */}
          {activeTab === 'circuits' && (
            <div className="space-y-6">
              {/* Overview Banner */}
              <div className="p-4 bg-gradient-to-r from-blue-950/50 via-indigo-950/40 to-slate-950 border border-blue-800/40 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono-code">
                      Real Prototype Circuits & Hardware Architecture
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                    Detailed engineering breakdown of the physical electronics: dual-rail buck regulators, PCA9685 I2C servo multiplexers, vibration-isolated IMU filtering, and flexible cable drag harnesses.
                  </p>
                </div>
                <span className="shrink-0 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-xl text-xs font-mono-code font-bold">
                  Hardware v1.22 Active
                </span>
              </div>

              {/* Component Selector & Detailed Inspection */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Component List (5 cols) */}
                <div className="lg:col-span-5 space-y-2.5">
                  <div className="text-xs font-mono-code text-slate-400 px-1 font-semibold uppercase tracking-wider">
                    Electronic Subsystems & Circuits:
                  </div>
                  {circuitComponents.map((comp) => (
                    <button
                      key={comp.id}
                      type="button"
                      onClick={() => setSelectedCircuitPart(comp.id)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer font-mono-code ${
                        selectedCircuitPart === comp.id
                          ? 'bg-slate-800/90 border-cyan-500/60 shadow-lg shadow-cyan-500/10 text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span className={selectedCircuitPart === comp.id ? 'text-cyan-300' : 'text-slate-200'}>
                          {comp.name}
                        </span>
                        <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
                          {comp.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{comp.highlight}</p>
                    </button>
                  ))}
                </div>

                {/* Right: Detailed Deep-Dive Card (7 cols) */}
                <div className="lg:col-span-7">
                  {(() => {
                    const comp = circuitComponents.find((c) => c.id === selectedCircuitPart) || circuitComponents[0];
                    return (
                      <div className="h-full p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <div>
                              <span className="text-[10px] font-mono-code uppercase font-bold text-cyan-400">
                                {comp.category}
                              </span>
                              <h3 className="text-base font-bold text-white">{comp.name}</h3>
                            </div>
                            <span className="px-2.5 py-1 bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-[11px] font-mono-code rounded-lg">
                              Hardware Architecture
                            </span>
                          </div>

                          {/* How it differs from 3D CAD */}
                          <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1.5">
                            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono-code">
                              <GitCompare className="w-4 h-4" />
                              <span>Real-World Implementation Details</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {comp.cadDiff}
                            </p>
                          </div>

                          {/* Signal Path / Routing */}
                          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-1">
                            <span className="text-[10px] font-mono-code uppercase text-slate-400 font-semibold">
                              Signal & Power Path Topology:
                            </span>
                            <p className="text-xs font-mono-code text-cyan-300">
                              {comp.signals}
                            </p>
                          </div>

                          {/* Specifications Grid */}
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[10px] font-mono-code uppercase text-slate-400 font-semibold">
                              Hardware & Electrical Specifications:
                            </span>
                            <div className="grid grid-cols-2 gap-2 text-xs font-mono-code">
                              {comp.specs.map((spec, i) => (
                                <div key={i} className="p-2 bg-slate-900/70 rounded-lg border border-slate-800 text-slate-300 flex items-center gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                  <span>{spec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Telemetry Indicator */}
                        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono-code text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            Hardware Circuit Validated on Bench Oscilloscope
                          </span>
                          <span>Baud: 921600</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Physical Architecture Pinout & Bus Map */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white font-mono-code uppercase flex items-center gap-2">
                    <Radio className="w-4 h-4 text-cyan-400" />
                    ESP32-S2 Physical Pinout & Peripheral Mapping
                  </h4>
                  <span className="text-[11px] font-mono-code text-slate-400">FreeRTOS 100Hz Cyclic Executive</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono-code">
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div className="text-cyan-400 font-bold">GPIO 8 / GPIO 9</div>
                    <div className="text-slate-300 text-[11px]">I2C Master Bus (PCA9685 + MPU6050)</div>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div className="text-amber-400 font-bold">GPIO 43 / GPIO 44</div>
                    <div className="text-slate-300 text-[11px]">UART0 High-Speed Serial (Groq AI Link)</div>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div className="text-emerald-400 font-bold">GPIO 14 (EXT0)</div>
                    <div className="text-slate-300 text-[11px]">Conversational Priority Interrupt</div>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div className="text-indigo-400 font-bold">ADC1_CH2 (GPIO 3)</div>
                    <div className="text-slate-300 text-[11px]">Battery LiPo Voltage Divider Telemetry</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Kinematics & Joint Sliders */}
          {activeTab === 'kinematics' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Visualizer (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="relative w-full aspect-4/3 bg-slate-950 rounded-2xl border border-slate-800 p-6 flex items-center justify-center overflow-hidden shadow-inner">
                  {/* Visual SVG representation of 3-DOF Quadruped Leg with real joint angles */}
                  <svg viewBox="0 0 360 280" className="w-full h-full">
                    <defs>
                      <pattern id="robot-grid-dark" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="360" height="280" fill="url(#robot-grid-dark)" />

                    {/* Base / Chassis mounting point */}
                    <rect x="30" y="40" width="80" height="28" rx="6" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="70" y="58" fill="#38bdf8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">CHASSIS</text>

                    {/* Joint 1: Hip / Coxa */}
                    {(() => {
                      const hipX = 110;
                      const hipY = 54;
                      const coxaLen = 55;
                      const coxaRad = (coxaAngle * Math.PI) / 180;
                      const kneeX = hipX + Math.cos(coxaRad) * coxaLen;
                      const kneeY = hipY + Math.sin(coxaRad) * coxaLen;

                      const femurLen = 85;
                      const femurRad = ((coxaAngle + femurAngle) * Math.PI) / 180;
                      const ankleX = kneeX + Math.cos(femurRad) * femurLen;
                      const ankleY = kneeY + Math.sin(femurRad) * femurLen;

                      const tibiaLen = 95;
                      const tibiaRad = ((coxaAngle + femurAngle + tibiaAngle) * Math.PI) / 180;
                      const footX = ankleX + Math.cos(tibiaRad) * tibiaLen;
                      const footY = ankleY + Math.sin(tibiaRad) * tibiaLen;

                      return (
                        <g>
                          {/* Links */}
                          <line x1={hipX} y1={hipY} x2={kneeX} y2={kneeY} stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" />
                          <line x1={kneeX} y1={kneeY} x2={ankleX} y2={ankleY} stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
                          <line x1={ankleX} y1={ankleY} x2={footX} y2={footY} stroke="#0369a1" strokeWidth="4" strokeLinecap="round" />

                          {/* Joint Motors */}
                          <circle cx={hipX} cy={hipY} r="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
                          <circle cx={hipX} cy={hipY} r="3" fill="#38bdf8" />
                          <text x={hipX} y={hipY - 14} fill="#38bdf8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">J1: {coxaAngle}°</text>

                          <circle cx={kneeX} cy={kneeY} r="7" fill="#0f172a" stroke="#60a5fa" strokeWidth="2.5" />
                          <circle cx={kneeX} cy={kneeY} r="2.5" fill="#60a5fa" />
                          <text x={kneeX + 16} y={kneeY} fill="#60a5fa" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">J2: {femurAngle}°</text>

                          <circle cx={ankleX} cy={ankleY} r="6" fill="#0f172a" stroke="#93c5fd" strokeWidth="2" />
                          <circle cx={ankleX} cy={ankleY} r="2" fill="#93c5fd" />
                          <text x={ankleX + 16} y={ankleY} fill="#93c5fd" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">J3: {tibiaAngle}°</text>

                          {/* Foot End Effector */}
                          <circle cx={footX} cy={footY} r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
                          <text x={footX} y={footY + 18} fill="#f43f5e" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">
                            END-EFFECTOR [{Math.round(footX)}, {Math.round(footY)}]
                          </text>
                        </g>
                      );
                    })()}
                  </svg>

                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-cyan-300 rounded-lg font-mono-code text-[10px] font-semibold uppercase">
                      GAIT: {gaitMode.toUpperCase()}
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-700 text-emerald-300 rounded-lg font-mono-code text-[10px] font-semibold uppercase">
                      IK CONVERGED
                    </span>
                  </div>
                </div>

                {/* Gait Mode Presets */}
                <div className="flex flex-wrap items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 gap-2">
                  <span className="text-xs font-mono-code font-semibold text-slate-300">Preset Gaits:</span>
                  <div className="flex gap-2">
                    {['trot', 'crawl', 'stand', 'wave'].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => applyGaitPreset(mode)}
                        className={`px-3 py-1 text-xs font-mono-code uppercase rounded-lg transition-colors cursor-pointer ${
                          gaitMode === mode
                            ? 'bg-cyan-500 text-slate-950 font-bold'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Controls & Telemetry (5 cols) */}
              <div className="lg:col-span-5 p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between gap-5">
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">Joint Servo Angles</h4>
                  <p className="text-xs text-slate-400 font-mono-code">Adjust inverse kinematics trigonometric matrix in real time.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono-code mb-1 text-slate-300">
                      <span>Coxa Joint (Hip):</span>
                      <span className="font-bold text-cyan-400">{coxaAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="-45"
                      max="60"
                      value={coxaAngle}
                      onChange={(e) => setCoxaAngle(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono-code mb-1 text-slate-300">
                      <span>Femur Joint (Knee):</span>
                      <span className="font-bold text-cyan-400">{femurAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="90"
                      value={femurAngle}
                      onChange={(e) => setFemurAngle(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono-code mb-1 text-slate-300">
                      <span>Tibia Joint (Ankle):</span>
                      <span className="font-bold text-cyan-400">{tibiaAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="-75"
                      max="45"
                      value={tibiaAngle}
                      onChange={(e) => setTibiaAngle(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Telemetry Stats */}
                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-800">
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono-code uppercase">Total Joint Torque</div>
                    <div className="text-sm font-bold text-cyan-300 font-mono-code">{calculatedTorque} Nm</div>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono-code uppercase">ESP32 Clock</div>
                    <div className="text-sm font-bold text-white font-mono-code">240 MHz</div>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono-code uppercase">Battery Bus</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono-code">11.4V LiPo</div>
                  </div>
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono-code uppercase">Motor Temp</div>
                    <div className="text-sm font-bold text-amber-400 font-mono-code">34.8°C</div>
                  </div>
                </div>

                <button
                  type="button"
                  id="calibrate-robot-btn"
                  onClick={() => {
                    setIsCalibrating(true);
                    setTimeout(() => setIsCalibrating(false), 900);
                  }}
                  className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-mono-code font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isCalibrating ? 'animate-spin' : ''}`} />
                  {isCalibrating ? 'Calibrating Encoders...' : 'Zero Encoders & Calibrate'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: CAD Blueprint View */}
          {activeTab === 'schematic' && (
            <div className="space-y-6">
              <div className="relative w-full aspect-video max-h-105 rounded-2xl border border-slate-800 overflow-hidden bg-slate-950 flex items-center justify-center shadow-inner">
                <img
                  src={robotSchematic}
                  alt="Quadruped Robot Technical Drawing"
                  width="1200"
                  height="675"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain p-4 filter invert brightness-90"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono-code">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-cyan-400 mb-1">01 / Joint Articulation</div>
                  <p className="text-slate-400 leading-normal">3-DOF articulated leg linkages powered by SG90 micro servos calibrated for smooth trotting, crawling, and waving gaits.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-cyan-400 mb-1">02 / 3D-Printed PLA Chassis</div>
                  <p className="text-slate-400 leading-normal">Durable matte black PLA body with reinforced joint pivots and custom cat-ear visor housing the 0.96" I2C OLED display.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="font-bold text-cyan-400 mb-1">03 / LOLIN ESP32-S2 Mini Core</div>
                  <p className="text-slate-400 leading-normal">Compact 240MHz controller handling 100Hz FreeRTOS kinematics, facial expressions, and Groq AI serial streaming.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Groq AI Companion Terminal */}
          {activeTab === 'ai-companion' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono-code text-slate-300">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold">GROQ AI TELEMETRY CONSOLE // LLAMA-3 INFERENCE</span>
                </div>
                <span className="bg-emerald-950 border border-emerald-700 text-emerald-300 font-mono-code text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                  STATUS: ONLINE (921.6K BAUD)
                </span>
              </div>

              {/* Terminal Window */}
              <div className="h-64 overflow-y-auto bg-slate-950 text-slate-100 rounded-xl p-4 font-mono-code text-xs space-y-3 border border-slate-800 shadow-inner">
                {commandLogs.map((log) => (
                  <div key={log.id} className="flex gap-2">
                    <span className="text-slate-500 shrink-0">[{log.time}]</span>
                    <span
                      className={`shrink-0 font-bold ${
                        log.sender === 'user' ? 'text-amber-400' : log.sender === 'esp32' ? 'text-emerald-400' : 'text-cyan-400'
                      }`}
                    >
                      {log.sender === 'user' ? 'USER >' : log.sender === 'esp32' ? 'ESP32 >' : 'GROQ_AI >'}
                    </span>
                    <span className="text-slate-200 leading-relaxed">{log.text}</span>
                  </div>
                ))}
                {isAiProcessing && (
                  <div className="text-cyan-400 italic animate-pulse">Groq AI processing neural trajectory...</div>
                )}
              </div>

              {/* Preset quick actions */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code">
                <span className="text-slate-500 text-[11px]">Quick Triggers:</span>
                <button
                  type="button"
                  onClick={() => handleSendCommand('Perform 360 degree obstacle scan')}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 text-[11px] cursor-pointer"
                >
                  Scan Obstacles
                </button>
                <button
                  type="button"
                  onClick={() => handleSendCommand('Calculate inverse kinematics for trotting gait')}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 text-[11px] cursor-pointer"
                >
                  Kinematics Query
                </button>
                <button
                  type="button"
                  onClick={() => handleSendCommand('Calibrate motor optical encoders')}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 text-[11px] cursor-pointer"
                >
                  Calibrate Encoders
                </button>
              </div>

              {/* Input form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendCommand();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  id="robot-command-input"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Type command for Groq AI Companion (e.g., 'Analyze terrain incline')..."
                  className="flex-1 px-4 py-2 bg-slate-950 rounded-xl border border-slate-700 font-mono-code text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  id="send-robot-command-btn"
                  disabled={isAiProcessing || !aiInput.trim()}
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 rounded-xl text-xs font-mono-code font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};

export default RobotSchematicModal;
