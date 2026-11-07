import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function OpeningCeremony({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  // Trigger gentle auspicious sparkle sound using Web Audio API
  const playChimeSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.09, ctx.currentTime + idx * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 1.3);
      });
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  // Spectacular celebratory gold & flower petal sparkle burst
  const triggerOpeningSparkles = () => {
    // 1. Center radiant gold starburst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFF0C2', '#FFE58F', '#B88E1F', '#FFFFFF'],
      startVelocity: 45,
      scalar: 1.2,
      ticks: 200
    });

    // 2. Auspicious Keralam flower shower (Rose petals & Jasmine flowers)
    setTimeout(() => {
      // Left shower
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#D4AF37', '#F43F5E', '#FFFFFF', '#E11D48', '#FCF7E6'],
        scalar: 1.1
      });
      // Right shower
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#D4AF37', '#F43F5E', '#FFFFFF', '#E11D48', '#FCF7E6'],
        scalar: 1.1
      });
    }, 250);

    // 3. Falling starlight shimmer
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { y: 0.4 },
        colors: ['#D4AF37', '#FFF6D5', '#FFE066', '#FFD700'],
        gravity: 0.8,
        scalar: 0.9,
        ticks: 250
      });
    }, 500);
  };

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
    playChimeSound();
    triggerOpeningSparkles();

    if (onOpen) {
      onOpen();
    }

    // Smooth curtain lift
    setTimeout(() => {
      setIsClosed(true);
    }, 900);
  };

  if (isClosed) return null;

  return (
    <div
      className={`opening-ceremony-overlay ${isOpening ? 'fade-out' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding Invitation Envelope"
    >
      <div className={`royal-envelope-card glass-card ${isOpening ? 'card-unfold' : ''}`}>
        
        {/* Decorative Auspicious Top Header */}
        <div className="opening-top-invocation">
          <p className="font-malayalam gold-accent opening-sloka-title">
            ॥ ശ്രീ ഗുരുഭ്യോ നമഃ • ശുഭ വിവാഹം ॥
          </p>
          <div className="opening-divider-line">
            <span className="line" />
            <Sparkles size={16} className="gold-accent" />
            <span className="line" />
          </div>
        </div>

        {/* Sacred Glowing Lamp Emblem */}
        <div className="opening-lamp-wrapper">
          <div className="opening-lamp-halo">
            <span className="opening-lamp-emoji">🪔</span>
          </div>
          <span className="opening-invitation-sub">WEDDING INVITATION</span>
        </div>

        {/* Couple Names */}
        <div className="opening-couple-names">
          <h1 className="opening-name-text text-gold-gradient font-royal">
            {weddingConfig.groom.fullName}
          </h1>
          <span className="opening-ampersand font-script">&</span>
          <h1 className="opening-name-text text-gold-gradient font-royal">
            {weddingConfig.bride.fullName}
          </h1>
        </div>

        {/* Date & Location Pill */}
        <div className="opening-date-pill">
          <span>{weddingConfig.weddingDateFormatted}</span>
          <span className="pill-dot">•</span>
          <span>{weddingConfig.venue.name}, {weddingConfig.venue.city}</span>
        </div>

        {/* Auspicious Note */}
        <p className="opening-note-text font-editorial">
          "With the prayers and blessings of our beloved parents and elders, we joyfully invite you to celebrate our wedding."
        </p>

        {/* Royal Pulsating "Open Invitation" Button */}
        <div className="opening-action-wrapper">
          <button
            onClick={handleOpenInvitation}
            className="btn-royal-open"
            aria-label="Open the wedding invitation"
          >
            <Sparkles size={18} className="btn-sparkle-icon" />
            <span className="font-malayalam">ക്ഷണക്കത്ത് തുറക്കുക</span>
            <span className="btn-en-text">OPEN INVITATION</span>
            <Sparkles size={18} className="btn-sparkle-icon" />
          </button>
        </div>

      </div>
    </div>
  );
}

