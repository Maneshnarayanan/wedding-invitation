import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Navigation, Calendar } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import { getWeddingCalendarUrl } from './Countdown';

export default function MobileActionDock() {
  const [showToast, setShowToast] = useState(false);
  const [showMobileDock, setShowMobileDock] = useState(false);

  useEffect(() => {
    const updateDockVisibility = () => {
      const quickActions = document.querySelector('.hero-actions');
      setShowMobileDock(Boolean(quickActions && quickActions.getBoundingClientRect().bottom < 0));
    };

    updateDockVisibility();
    window.addEventListener('scroll', updateDockVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateDockVisibility);
  }, []);

  const triggerFlowerShower = (e) => {
    e?.preventDefault?.();
    // Subtle mobile haptic feedback if supported
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      try {
        window.navigator.vibrate([25, 35, 25]);
      } catch (err) {
        // Haptics fallback
      }
    }

    // 1. Center rose petals & jasmine shower
    confetti({
      particleCount: 55,
      spread: 65,
      origin: { y: 0.75 },
      colors: ['#D4AF37', '#F43F5E', '#FFFFFF', '#E11D48', '#FFF0C2'],
      scalar: 1.15,
      ticks: 200
    });

    // 2. Twin side bursts
    setTimeout(() => {
      confetti({
        particleCount: 35,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.8 },
        colors: ['#D4AF37', '#F43F5E', '#FCF7E6'],
        scalar: 1.05
      });
      confetti({
        particleCount: 35,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.8 },
        colors: ['#D4AF37', '#F43F5E', '#FCF7E6'],
        scalar: 1.05
      });
    }, 150);

    // Show temporary feedback toast
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2200);
  };

  return (
    <>
      {/* Toast Notification when guest showers blessings */}
      {showToast && (
        <div className="blessing-toast" role="status" aria-live="polite">
          <span className="toast-flower-icon">🌸</span>
          <span className="font-malayalam toast-malayalam-text">പുഷ്പവൃഷ്ടി അനുഗ്രഹം നേർന്നു!</span>
          <span className="toast-sparkle">✨</span>
        </div>
      )}

      {/* --- DESKTOP FLOATING BLOSSOM BUTTON (Bottom-Left) --- */}
      <div className="desktop-flower-btn-wrapper">
        <button
          onClick={triggerFlowerShower}
          className="floating-flower-btn"
          aria-label="Shower flower blessings on couple"
          title="Shower Flower Blessings (പുഷ്പവൃഷ്ടി)"
        >
          <span className="flower-icon">🌸</span>
          <span className="flower-btn-label">Bless Couple</span>
        </button>
      </div>

      {/* --- MOBILE STICKY QUICK ACTIONS --- */}
      {showMobileDock && (
        <div className="mobile-action-dock" role="navigation" aria-label="Quick Wedding Actions">
          <div className="mobile-dock-inner glass-card">
            <a
              href={weddingConfig.venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="dock-item"
              aria-label="Get directions to the wedding venue"
            >
              <Navigation size={18} />
              <span className="dock-label">Directions</span>
            </a>

            <a
              href={getWeddingCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="dock-item"
              aria-label="Save the wedding date to your calendar"
            >
              <Calendar size={18} />
              <span className="dock-label">Save date</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

