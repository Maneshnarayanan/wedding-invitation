import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer({ isPlaying, toggleMusic }) {
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const droneOscsRef = useRef([]);
  const droneGainRef = useRef(null);

  // Auspicious Keralam Wedding Raga (Mohanam - S R2 G3 P D2 S')
  // Sa: 261.63, Ri: 293.66, Ga: 329.63, Pa: 392.00, Dha: 440.00, Sa': 523.25
  const phrases = [
    [261.63, 329.63, 392.00, 440.00, 523.25], // S G P D S'
    [523.25, 440.00, 392.00, 329.63, 293.66], // S' D P G R
    [293.66, 329.63, 392.00, 440.00, 392.00], // R G P D P
    [392.00, 329.63, 293.66, 220.00, 261.63], // P G R D_low S
    [261.63, 329.63, 392.00, 523.25, 440.00], // S G P S' D
    [440.00, 392.00, 329.63, 293.66, 261.63]  // D P G R S
  ];

  const playVeenaPluck = (ctx, freq, time) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle'; // warm string harmonic
      osc.frequency.setValueAtTime(freq, time);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1100, time);
      filter.frequency.exponentialRampToValueAtTime(320, time + 1.5);

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.12, time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.7);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 1.75);
    } catch (e) {
      // Audio node fallback
    }
  };

  const startDrone = (ctx) => {
    if (droneGainRef.current) return;
    try {
      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      droneGain.gain.linearRampToValueAtTime(0.022, ctx.currentTime + 1.5); // very soft ambient tanpura foundation

      const oscSa = ctx.createOscillator();
      oscSa.type = 'sine';
      oscSa.frequency.setValueAtTime(130.81, ctx.currentTime); // C3 Sa

      const oscPa = ctx.createOscillator();
      oscPa.type = 'sine';
      oscPa.frequency.setValueAtTime(196.00, ctx.currentTime); // G3 Pa

      oscSa.connect(droneGain);
      oscPa.connect(droneGain);
      droneGain.connect(ctx.destination);

      oscSa.start();
      oscPa.start();

      droneOscsRef.current = [oscSa, oscPa];
      droneGainRef.current = droneGain;
    } catch (e) {
      // Drone fallback
    }
  };

  const stopDrone = (ctx) => {
    if (droneGainRef.current && ctx) {
      try {
        droneGainRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        setTimeout(() => {
          droneOscsRef.current.forEach((o) => {
            try { o.stop(); } catch (err) {}
          });
          droneOscsRef.current = [];
          droneGainRef.current = null;
        }, 550);
      } catch (err) {
        droneGainRef.current = null;
      }
    }
  };

  const startMusic = async () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      startDrone(ctx);

      let phraseIdx = 0;
      const playNextPhrase = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const currentPhrase = phrases[phraseIdx % phrases.length];
        const now = ctx.currentTime;

        currentPhrase.forEach((note, nIdx) => {
          playVeenaPluck(ctx, note, now + nIdx * 0.42);
        });

        phraseIdx++;
        timerRef.current = setTimeout(playNextPhrase, 2600);
      };

      playNextPhrase();
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  const stopMusic = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current) {
      stopDrone(audioCtxRef.current);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startMusic();
    } else {
      stopMusic();
    }
    return () => {
      stopMusic();
    };
  }, [isPlaying]);

  return (
    /* Sleek Desktop Music Indicator & Mute Pill (Bottom Right) */
    <div className="desktop-music-pill-wrapper">
      <button
        onClick={toggleMusic}
        className={`floating-music-pill ${isPlaying ? 'music-playing' : ''}`}
        aria-label={isPlaying ? 'Mute auspicious wedding music' : 'Play auspicious wedding music'}
        title={isPlaying ? 'Click to Mute Music (Raga Mohanam)' : 'Click to Play Music (Raga Mohanam)'}
      >
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
        <span className="music-pill-text">{isPlaying ? 'Raga Mohanam ♫' : 'Music Off'}</span>
      </button>
    </div>
  );
}
