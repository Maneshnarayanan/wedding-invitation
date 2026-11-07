import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicPlayer({ isPlaying: externalPlaying, setIsPlaying: setExternalPlaying }) {
  const [internalPlaying, setInternalPlaying] = useState(false);
  const isPlaying = externalPlaying !== undefined ? externalPlaying : internalPlaying;
  const setIsPlaying = setExternalPlaying || setInternalPlaying;

  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  // Soft Indian / Romantic harp arpeggio chords in Kalyani / Major pentatonic
  const chords = [
    [261.63, 329.63, 392.00, 493.88], // C, E, G, B
    [220.00, 261.63, 329.63, 440.00], // A, C, E, A
    [174.61, 261.63, 329.63, 392.00], // F, C, E, G
    [196.00, 246.94, 293.66, 392.00]  // G, B, D, G
  ];

  const playPluck = (ctx, freq, time) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Gentle triangle wave with warm lowpass filter
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, time);
    filter.frequency.exponentialRampToValueAtTime(300, time + 1.5);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.08, time + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 2.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + 2.3);
  };

  const startAmbientChords = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    let chordIdx = 0;
    const playNext = () => {
      const currentChord = chords[chordIdx % chords.length];
      const now = ctx.currentTime;

      currentChord.forEach((note, nIdx) => {
        playPluck(ctx, note, now + nIdx * 0.45);
      });

      chordIdx++;
      timerRef.current = setTimeout(playNext, 2400);
    };

    playNext();
  };

  const stopAmbientChords = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopAmbientChords();
      setIsPlaying(false);
    } else {
      startAmbientChords();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startAmbientChords();
    } else {
      stopAmbientChords();
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      stopAmbientChords();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '1.8rem', right: '1.8rem', zIndex: 999 }}>
      <button
        onClick={toggleMusic}
        className={`floating-music-btn ${isPlaying ? 'music-spinning' : ''}`}
        aria-label={isPlaying ? 'Mute ambient wedding music' : 'Play ambient wedding music'}
        title={isPlaying ? 'Click to Mute Music' : 'Click to Play Ambient Music'}
      >
        {isPlaying ? <Volume2 size={24} /> : <Music size={22} />}
        {isPlaying && <span className="music-wave-indicator">LIVE</span>}
      </button>
    </div>
  );
}
