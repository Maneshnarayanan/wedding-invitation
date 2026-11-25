import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Navigation, Calendar, Flower2 } from 'lucide-react';
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

    if (typeof window !== 'undefined' && window.navigator?.vibrate) {
      try { window.navigator.vibrate([25, 35, 25]); } catch (_) {}
    }

    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.72 },
      colors: ['#E5A500', '#E11D48', '#FFFFFF', '#FCF7E6', '#F5C842'],
      scalar: 1.15,
      ticks: 220
    });

    setTimeout(() => {
      confetti({ particleCount: 40, angle: 60,  spread: 60, origin: { x: 0.05, y: 0.8 }, colors: ['#E5A500', '#E11D48', '#FCF7E6'], scalar: 1.05 });
      confetti({ particleCount: 40, angle: 120, spread: 60, origin: { x: 0.95, y: 0.8 }, colors: ['#E5A500', '#E11D48', '#FCF7E6'], scalar: 1.05 });
    }, 160);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2400);
  };

  return (
    <>
      {/* Toast */}
      {showToast && (
        <div className="blessing-toast" role="status" aria-live="polite">
          <span style={{ fontSize: '1.4rem' }}>🌸</span>
          <span className="font-malayalam toast-malayalam-text">പുഷ്പവൃഷ്ടി അനുഗ്രഹം നേർന്നു!</span>
          <span style={{ fontSize: '1rem' }}>✨</span>
        </div>
      )}

      {/* Desktop floating bless button */}
      <div className="desktop-flower-btn-wrapper">
        <button
          onClick={triggerFlowerShower}
          className="floating-flower-btn"
          aria-label="Shower flower blessings"
          title="Shower Flower Blessings (പുഷ്പവൃഷ്ടി)"
        >
          <span className="flower-icon">🌸</span>
          <span className="flower-btn-label">Bless Couple</span>
        </button>
      </div>

      {/* Mobile sticky dock — appears after hero buttons scroll out */}
      {showMobileDock && (
        <div className="mobile-action-dock" role="navigation" aria-label="Quick Wedding Actions">
          <div className="mobile-dock-inner glass-card">

            {/* Directions */}
            <a
              href={weddingConfig.venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="dock-item"
              aria-label="Get directions to the wedding venue"
            >
              <Navigation size={20} />
              <span className="dock-label">Directions</span>
            </a>

            {/* Centre: Bless button — highlighted */}
            <button
              onClick={triggerFlowerShower}
              className="dock-item dock-bless"
              aria-label="Shower flower blessings on the couple"
            >
              <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>🌸</span>
              <span className="dock-label">Bless</span>
            </button>

            {/* Save date */}
            <a
              href={getWeddingCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="dock-item"
              aria-label="Save the wedding date to your calendar"
            >
              <Calendar size={20} />
              <span className="dock-label">Save Date</span>
            </a>

          </div>
        </div>
      )}
    </>
  );
}
