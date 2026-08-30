import { useRef, useEffect, useCallback } from 'react';

export const InteractiveHeroGraphic = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const coordsRef = useRef(null);
  const statusDotRef = useRef(null);

  // Animation & state refs
  const stateRef = useRef({
    currentMouse: { x: -1000, y: -1000 },
    targetMouse: { x: -1000, y: -1000 },
    hoverOpacity: 0,
    targetHoverOpacity: 0,
    ripples: [],
    width: 500,
    height: 380,
    dpr: 1
  });

  const handlePointerMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    stateRef.current.targetMouse = { x, y };
    stateRef.current.targetHoverOpacity = 1;

    // Direct DOM updates - 0 React re-renders!
    if (coordsRef.current) {
      coordsRef.current.textContent = `X: ${Math.round(x)}px  |  Y: ${Math.round(y)}px`;
    }
    if (statusDotRef.current) {
      statusDotRef.current.className = 'w-1.5 h-1.5 rounded-full bg-[#0F172A] animate-pulse transition-colors';
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    stateRef.current.targetHoverOpacity = 0;
    
    if (coordsRef.current) {
      coordsRef.current.textContent = 'PROXIMITY: IDLE';
    }
    if (statusDotRef.current) {
      statusDotRef.current.className = 'w-1.5 h-1.5 rounded-full bg-slate-300 transition-colors';
    }
  }, []);

  const handleClick = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    stateRef.current.ripples.push({
      x,
      y,
      radius: 10,
      maxRadius: 260,
      opacity: 0.9,
      speed: 6
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const w = Math.max(Math.floor(rect.width), 100);
      const h = Math.max(Math.floor(rect.height), 100);

      stateRef.current.width = w;
      stateRef.current.height = h;
      stateRef.current.dpr = dpr;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    resize();

    // Geometric pattern drawer helper
    const drawGeometricElements = (targetCtx, strokeStyle, lineWidth, isDarkLayer = false) => {
      const { width, height } = stateRef.current;
      targetCtx.save();
      targetCtx.strokeStyle = strokeStyle;
      targetCtx.lineWidth = lineWidth;

      const gridSize = 40;
      const subGridSize = 20;

      // 1. Sub-grid (very fine)
      targetCtx.beginPath();
      for (let x = 0; x <= width; x += subGridSize) {
        targetCtx.moveTo(x, 0);
        targetCtx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += subGridSize) {
        targetCtx.moveTo(0, y);
        targetCtx.lineTo(width, y);
      }
      targetCtx.stroke();

      // 2. Primary grid lines
      targetCtx.beginPath();
      targetCtx.lineWidth = lineWidth * 1.3;
      for (let x = 0; x <= width; x += gridSize) {
        targetCtx.moveTo(x, 0);
        targetCtx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        targetCtx.moveTo(0, y);
        targetCtx.lineTo(width, y);
      }
      targetCtx.stroke();

      // 3. Diagonal 45° & Isometric technical construction lines
      targetCtx.beginPath();
      targetCtx.lineWidth = lineWidth;
      const maxDim = Math.max(width, height) * 2;
      for (let offset = -maxDim; offset <= maxDim; offset += 80) {
        targetCtx.moveTo(offset, 0);
        targetCtx.lineTo(offset + height, height);
        targetCtx.moveTo(offset, 0);
        targetCtx.lineTo(offset - height, height);
      }
      targetCtx.stroke();

      // 4. Architectural concentric circles & octagons at center
      const centerX = Math.floor(width / 2);
      const centerY = Math.floor(height / 2);

      targetCtx.beginPath();
      [40, 80, 140, 200].forEach((r) => {
        targetCtx.arc(centerX, centerY, r, 0, Math.PI * 2);
      });
      targetCtx.stroke();

      // Octagon at center
      targetCtx.beginPath();
      const octRadius = 100;
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const ox = centerX + Math.cos(angle) * octRadius;
        const oy = centerY + Math.sin(angle) * octRadius;
        if (i === 0) targetCtx.moveTo(ox, oy);
        else targetCtx.lineTo(ox, oy);
      }
      targetCtx.closePath();
      targetCtx.stroke();

      // Side architectural circle nodes
      const nodeX1 = Math.floor(width * 0.25);
      const nodeX2 = Math.floor(width * 0.75);
      const nodeY1 = Math.floor(height * 0.35);
      const nodeY2 = Math.floor(height * 0.65);

      targetCtx.beginPath();
      targetCtx.arc(nodeX1, nodeY1, 45, 0, Math.PI * 2);
      targetCtx.arc(nodeX2, nodeY2, 45, 0, Math.PI * 2);
      targetCtx.stroke();

      // 5. Precision Register Crosshairs at major intersections
      const crossSize = 4;
      targetCtx.beginPath();
      for (let x = gridSize; x < width; x += gridSize * 2) {
        for (let y = gridSize; y < height; y += gridSize * 2) {
          targetCtx.moveTo(x - crossSize, y);
          targetCtx.lineTo(x + crossSize, y);
          targetCtx.moveTo(x, y - crossSize);
          targetCtx.lineTo(x, y + crossSize);
        }
      }
      targetCtx.stroke();

      // 6. Subtle Technical Labels
      if (isDarkLayer) {
        targetCtx.fillStyle = '#0F172A';
        targetCtx.font = '500 10px "JetBrains Mono", monospace';
        targetCtx.fillText('SYS.GRID // 0.01mm', 16, 24);
        targetCtx.fillText('REF: 45° ISOMETRIC', width - 120, 24);
        targetCtx.fillText(`CTR: [${centerX}, ${centerY}]`, 16, height - 16);
        targetCtx.fillText('STATUS: SYNCHRONIZED', width - 136, height - 16);
      }

      targetCtx.restore();
    };

    // Continuous smooth animation loop
    const render = () => {
      const { width, height, dpr } = stateRef.current;
      const s = stateRef.current;

      // Smooth mouse position interpolation (lerp)
      s.currentMouse.x += (s.targetMouse.x - s.currentMouse.x) * 0.2;
      s.currentMouse.y += (s.targetMouse.y - s.currentMouse.y) * 0.2;
      s.hoverOpacity += (s.targetHoverOpacity - s.hoverOpacity) * 0.12;

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clear Canvas Background (Pure White)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // LAYER 1: Base Faint Academic Gray Lines
      drawGeometricElements(ctx, 'rgba(203, 213, 225, 0.7)', 0.9, false);

      // LAYER 2: Crisp Deep Black Spotlight Reveal Layer (Clipped to Radius)
      if (s.hoverOpacity > 0.01 || s.ripples.length > 0) {
        ctx.save();

        ctx.beginPath();
        const spotlightRadius = 85;
        if (s.hoverOpacity > 0.01) {
          ctx.arc(s.currentMouse.x, s.currentMouse.y, spotlightRadius, 0, Math.PI * 2);
        }

        s.ripples.forEach((ripple) => {
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        });

        ctx.clip();

        // Draw crisp deep black lines inside the clipped spotlight
        drawGeometricElements(ctx, '#0F172A', 1.25, true);

        // Subtle soft radial vignette overlay inside spotlight
        if (s.hoverOpacity > 0.01) {
          const grad = ctx.createRadialGradient(
            s.currentMouse.x,
            s.currentMouse.y,
            spotlightRadius * 0.3,
            s.currentMouse.x,
            s.currentMouse.y,
            spotlightRadius
          );
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0.88)');

          ctx.fillStyle = grad;
          ctx.fillRect(
            s.currentMouse.x - spotlightRadius,
            s.currentMouse.y - spotlightRadius,
            spotlightRadius * 2,
            spotlightRadius * 2
          );

          // Subtle cursor ring & center crosshair
          ctx.strokeStyle = '#0F172A';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(s.currentMouse.x, s.currentMouse.y, 14, 0, Math.PI * 2);
          ctx.stroke();

          // Small crosshair at cursor center
          ctx.beginPath();
          ctx.moveTo(s.currentMouse.x - 4, s.currentMouse.y);
          ctx.lineTo(s.currentMouse.x + 4, s.currentMouse.y);
          ctx.moveTo(s.currentMouse.x, s.currentMouse.y - 4);
          ctx.lineTo(s.currentMouse.x, s.currentMouse.y + 4);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Update & Render Click Ripples
      for (let i = s.ripples.length - 1; i >= 0; i--) {
        const ripple = s.ripples[i];
        ripple.radius += ripple.speed;
        ripple.opacity *= 0.94;

        ctx.save();
        ctx.strokeStyle = `rgba(15, 23, 42, ${ripple.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        if (ripple.opacity < 0.02 || ripple.radius > ripple.maxRadius) {
          s.ripples.splice(i, 1);
        }
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Interactive Canvas Container */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        className="relative aspect-[4/3] max-h-[420px] min-h-[280px] w-full overflow-hidden rounded-xl border border-[#EAE1D4] bg-white shadow-sm cursor-crosshair select-none group"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Minimalist Top-Left Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs border border-[#E5E7EB] px-3 py-1 rounded-md font-label-sm text-[11px] text-[#0F172A] shadow-xs pointer-events-none">
          <span>INTERACTIVE GEOMETRIC GRID</span>
        </div>

        {/* Minimalist Bottom-Right Real-time Proximity Indicator */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs border border-[#E5E7EB] px-3 py-1 rounded-md font-label-sm text-[11px] text-[#0F172A] shadow-xs pointer-events-none flex items-center gap-2">
          <span
            ref={statusDotRef}
            className="w-1.5 h-1.5 rounded-full bg-slate-300 transition-colors"
          />
          <span ref={coordsRef}>PROXIMITY: IDLE</span>
        </div>
      </div>

      {/* Subtitle / Hint */}
      <div className="flex items-center justify-between w-full px-2 text-[11px] font-label-sm text-[#64748B]">
        <span>Hover to reveal radial vector coordinates</span>
        <span className="hidden sm:inline">Click to pulse radial wave</span>
      </div>
    </div>
  );
};
