import React, { useEffect, useRef } from 'react';

export default function PetalsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;
    // Mobile-friendly particle pool (22 for mobile to save battery and maintain 60fps)
    const particleCount = isMobile ? 22 : 45;
    const particles = [];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Auspicious Kerala Gold & Rose Petal Colors
    const colors = [
      'rgba(212, 175, 55, 0.45)',  // Kasavu Gold
      'rgba(243, 229, 171, 0.55)', // Light Gold Sparkle
      'rgba(244, 180, 180, 0.4)',  // Rose Petal
      'rgba(255, 230, 210, 0.45)', // Champagne
      'rgba(255, 215, 0, 0.35)'    // Bright Gold
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (isMobile ? 3.5 : 4.5) + 2,
        speedY: Math.random() * 0.7 + 0.3,
        speedX: Math.sin(Math.random() * Math.PI) * 0.4 - 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.4 ? 'petal' : 'sparkle',
        pulse: Math.random() * Math.PI
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.005) * 0.5 + p.speedX;
        p.rotation += p.rotationSpeed;
        p.pulse += 0.025;

        // Wrap around
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.type === 'petal') {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-p.size, -p.size * 1.4, -p.size * 1.8, p.size, 0, p.size * 1.8);
          ctx.bezierCurveTo(p.size * 1.8, p.size, p.size, -p.size * 1.4, 0, 0);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else {
          const sparkleSize = p.size * (0.8 + 0.3 * Math.sin(p.pulse));
          ctx.beginPath();
          ctx.arc(0, 0, sparkleSize, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.7)';
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="petals-canvas" ref={canvasRef} aria-hidden="true" />;
}
