import React, { useState, useEffect } from 'react';

// Ambient floating love sparkles & golden celestial particles
const ambientParticles = [
  { id: 1, type: 'star', left: '6%', top: '12%', size: '15px', delay: '0s', dur: '6s' },
  { id: 2, type: 'heart', left: '16%', top: '28%', size: '14px', delay: '1.2s', dur: '8.5s' },
  { id: 3, type: 'sparkle', left: '30%', top: '10%', size: '13px', delay: '2.5s', dur: '5.2s' },
  { id: 4, type: 'bokeh', left: '46%', top: '20%', size: '32px', delay: '0.8s', dur: '9.2s' },
  { id: 5, type: 'heart', left: '62%', top: '14%', size: '15px', delay: '3.4s', dur: '7.8s' },
  { id: 6, type: 'star', left: '82%', top: '22%', size: '16px', delay: '1.7s', dur: '6.4s' },
  { id: 7, type: 'sparkle', left: '92%', top: '38%', size: '14px', delay: '2.9s', dur: '5.6s' },
  { id: 8, type: 'heart', left: '10%', top: '55%', size: '13px', delay: '0.5s', dur: '8.2s' },
  { id: 9, type: 'bokeh', left: '26%', top: '68%', size: '36px', delay: '4s', dur: '10.5s' },
  { id: 10, type: 'star', left: '42%', top: '50%', size: '14px', delay: '1.9s', dur: '6.2s' },
  { id: 11, type: 'heart', left: '56%', top: '72%', size: '16px', delay: '2.2s', dur: '7.6s' },
  { id: 12, type: 'sparkle', left: '74%', top: '58%', size: '13px', delay: '3.1s', dur: '5.4s' },
  { id: 13, type: 'star', left: '88%', top: '76%', size: '15px', delay: '0.9s', dur: '6.9s' },
  { id: 14, type: 'heart', left: '36%', top: '34%', size: '14px', delay: '4.2s', dur: '8s' },
  { id: 15, type: 'bokeh', left: '78%', top: '8%', size: '28px', delay: '2s', dur: '9.8s' },
  { id: 16, type: 'sparkle', left: '20%', top: '85%', size: '13px', delay: '1.5s', dur: '5.9s' },
  { id: 17, type: 'heart', left: '66%', top: '44%', size: '14px', delay: '3.8s', dur: '7.4s' },
  { id: 18, type: 'star', left: '50%', top: '88%', size: '14px', delay: '2.7s', dur: '6.5s' },
  { id: 19, type: 'heart', left: '94%', top: '90%', size: '13px', delay: '1.1s', dur: '8.1s' },
  { id: 20, type: 'bokeh', left: '8%', top: '94%', size: '30px', delay: '3.3s', dur: '10.2s' },
];

export default function BackgroundSparkles() {
  const [tapBursts, setTapBursts] = useState([]);

  // Interactive love & light sparkle burst on screen tap or click (works ON TOP of all objects & cards)
  useEffect(() => {
    let burstId = 0;
    // Pure Kasavu gold celestial and romantic motifs
    const motifs = ['✨', '✦', '💛', '✧', '♥', '⋆', '✨', '💛', '✦'];

    const handlePointerDown = (e) => {
      // Don't trigger when typing in inputs/textareas
      const target = e.target;
      if (target && target.closest && target.closest('input, textarea, select')) return;

      const x = e.clientX;
      const y = e.clientY;

      // Spawn radiant love & light sparkles that burst ON TOP of objects
      const count = 7;
      const particles = Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + (Math.random() * 0.5 - 0.25);
        const dist = 34 + Math.random() * 38;
        return {
          id: `${burstId}-${i}`,
          char: motifs[Math.floor(Math.random() * motifs.length)],
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 30, // upward romantic drift
          rot: Math.floor(Math.random() * 70 - 35),
          size: 15 + Math.floor(Math.random() * 9)
        };
      });

      const newBurst = { id: burstId++, x, y, particles };

      setTapBursts((prev) => [...prev.slice(-6), newBurst]);

      setTimeout(() => {
        setTapBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
      }, 950);
    };

    // Use capture phase so taps on cards/objects/buttons are captured without interference
    window.addEventListener('pointerdown', handlePointerDown, { capture: true, passive: true });
    return () => window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
  }, []);

  return (
    <>
      {/* Background Ambient Floating Field (behind content) */}
      <div className="ambient-sparkle-field" aria-hidden="true">
        {ambientParticles.map((p) => (
          <span
            key={p.id}
            className={`ambient-sparkle-item item-${p.type}`}
            style={{
              left: p.left,
              top: p.top,
              fontSize: p.size,
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

      {/* Topmost Interactive Sparkle Layer - Floating ON TOP of all cards, photos & UI objects */}
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
