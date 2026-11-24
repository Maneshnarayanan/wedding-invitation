import React, { useState, useEffect } from 'react';

// Ambient floating particles
const ambientParticles = [
  { id: 1, type: 'star',    left: '5%',  top: '10%', size: '14px', delay: '0s',    dur: '6s' },
  { id: 2, type: 'heart',   left: '15%', top: '25%', size: '13px', delay: '1.3s',  dur: '8.5s' },
  { id: 3, type: 'sparkle', left: '28%', top: '8%',  size: '12px', delay: '2.6s',  dur: '5s' },
  { id: 4, type: 'bokeh',   left: '45%', top: '18%', size: '34px', delay: '0.9s',  dur: '9s' },
  { id: 5, type: 'heart',   left: '60%', top: '12%', size: '14px', delay: '3.5s',  dur: '7.5s' },
  { id: 6, type: 'star',    left: '80%', top: '20%', size: '15px', delay: '1.8s',  dur: '6.2s' },
  { id: 7, type: 'sparkle', left: '91%', top: '35%', size: '13px', delay: '3s',    dur: '5.4s' },
  { id: 8, type: 'heart',   left: '9%',  top: '52%', size: '12px', delay: '0.6s',  dur: '8s' },
  { id: 9, type: 'bokeh',   left: '25%', top: '65%', size: '30px', delay: '4.1s',  dur: '10s' },
  { id: 10, type: 'star',   left: '41%', top: '48%', size: '14px', delay: '2s',    dur: '6s' },
  { id: 11, type: 'heart',  left: '55%', top: '70%', size: '15px', delay: '2.3s',  dur: '7.2s' },
  { id: 12, type: 'sparkle',left: '73%', top: '55%', size: '12px', delay: '3.2s',  dur: '5.2s' },
  { id: 13, type: 'star',   left: '87%', top: '74%', size: '14px', delay: '0.9s',  dur: '6.8s' },
  { id: 14, type: 'heart',  left: '35%', top: '32%', size: '13px', delay: '4.3s',  dur: '7.8s' },
  { id: 15, type: 'bokeh',  left: '77%', top: '7%',  size: '26px', delay: '2.1s',  dur: '9.5s' },
  { id: 16, type: 'sparkle',left: '19%', top: '82%', size: '12px', delay: '1.6s',  dur: '5.8s' },
  { id: 17, type: 'heart',  left: '65%', top: '42%', size: '13px', delay: '3.9s',  dur: '7.2s' },
  { id: 18, type: 'star',   left: '49%', top: '86%', size: '13px', delay: '2.8s',  dur: '6.3s' },
  { id: 19, type: 'heart',  left: '93%', top: '88%', size: '12px', delay: '1.2s',  dur: '8s' },
  { id: 20, type: 'bokeh',  left: '7%',  top: '92%', size: '28px', delay: '3.4s',  dur: '10s' },
];

// Floating petals for extra depth
const petals = [
  { left: '8%',  dur: '12s', delay: '0s',   size: '18px' },
  { left: '22%', dur: '15s', delay: '2.5s', size: '14px' },
  { left: '37%', dur: '11s', delay: '5s',   size: '16px' },
  { left: '54%', dur: '14s', delay: '1.5s', size: '12px' },
  { left: '68%', dur: '10s', delay: '4s',   size: '18px' },
  { left: '82%', dur: '13s', delay: '3s',   size: '14px' },
  { left: '94%', dur: '16s', delay: '6.5s', size: '12px' },
];

export default function BackgroundSparkles() {
  const [tapBursts, setTapBursts] = useState([]);

  useEffect(() => {
    let burstId = 0;
    const motifs = ['✨', '✦', '💛', '✧', '♥', '⋆', '✨', '💛', '✦', '🌸'];

    const handlePointerDown = (e) => {
      const target = e.target;
      if (target?.closest?.('input, textarea, select')) return;

      const x = e.clientX, y = e.clientY;
      const count = 8;
      const particles = Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + (Math.random() * 0.5 - 0.25);
        const dist = 36 + Math.random() * 42;
        return {
          id: `${burstId}-${i}`,
          char: motifs[Math.floor(Math.random() * motifs.length)],
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 32,
          rot: Math.floor(Math.random() * 80 - 40),
          size: 14 + Math.floor(Math.random() * 10)
        };
      });

      const newBurst = { id: burstId++, x, y, particles };
      setTapBursts(prev => [...prev.slice(-6), newBurst]);
      setTimeout(() => setTapBursts(prev => prev.filter(b => b.id !== newBurst.id)), 950);
    };

    window.addEventListener('pointerdown', handlePointerDown, { capture: true, passive: true });
    return () => window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
  }, []);

  return (
    <>
      {/* Ambient sparkle field */}
      <div className="ambient-sparkle-field" aria-hidden="true">
        {ambientParticles.map((p) => (
          <span
            key={p.id}
            className={`ambient-sparkle-item item-${p.type}`}
            style={{
              left: p.left,
              top: p.top,
              fontSize: p.size,
              '--delay': p.delay,
              '--dur': p.dur,
              animationDelay: p.delay,
              animationDuration: p.dur,
            }}
          >
            {p.type === 'heart' && '♥'}
            {p.type === 'star' && '✦'}
            {p.type === 'sparkle' && '✨'}
            {p.type === 'bokeh' && <span className="bokeh-orb" />}
          </span>
        ))}
      </div>

      {/* Floating petals */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {petals.map((p, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: p.left,
              top: '-30px',
              fontSize: p.size,
              animationName: 'petal-fall',
              animationDuration: p.dur,
              animationDelay: p.delay,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              opacity: 0,
              userSelect: 'none',
            }}
          >
            🌸
          </span>
        ))}
      </div>

      {/* Tap burst layer */}
      <div className="tap-burst-layer" aria-hidden="true">
        {tapBursts.map((burst) => (
          <div
            key={burst.id}
            className="tap-burst-origin"
            style={{ left: `${burst.x}px`, top: `${burst.y}px` }}
          >
            {burst.particles.map((pt) => (
              <span
                key={pt.id}
                className="tap-burst-particle"
                style={{
                  '--dx': `${pt.dx}px`,
                  '--dy': `${pt.dy}px`,
                  '--rot': `${pt.rot}deg`,
                  fontSize: `${pt.size}px`,
                }}
              >
                {pt.char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
