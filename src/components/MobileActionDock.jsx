import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Navigation, Calendar, Sparkles } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function MobileActionDock() {
  const [blessingCount, setBlessingCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const triggerFlowerShower = (e) => {
    e?.preventDefault?.();
    setBlessingCount((prev) => prev + 1);

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

  const calendarUrl = (() => {
    const title = encodeURIComponent(`Manesh K & Pooja S Wedding (വിവാഹം)`);
    // 2027-01-03 11:00 AM IST to 11:46 AM IST -> UTC is 05:30 to 06:16
    const dates = "20270103T053000Z/20270103T061600Z";
    const details = encodeURIComponent(
      `Auspicious Keralam Traditional Wedding Ceremony (Muhurtham: ${weddingConfig.muhurthamTime})\nVenue: ${weddingConfig.venue.name}, ${weddingConfig.venue.city}\nGoogle Maps: ${weddingConfig.venue.googleMapsUrl}`
    );
    const location = encodeURIComponent(`${weddingConfig.venue.name}, ${weddingConfig.venue.city}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  })();

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

      {/* --- MOBILE STICKY FROSTED DOCK (Bottom Bar on Mobile) --- */}
      <div className="mobile-action-dock" role="navigation" aria-label="Quick Wedding Actions">
        <div className="mobile-dock-inner glass-card">
          
          {/* Action 1: Venue / Google Maps */}
          <a
            href={weddingConfig.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="dock-item"
            aria-label="Open venue in Google Maps"
          >
            <div className="dock-icon-circle">
              <Navigation size={17} />
            </div>
            <span className="dock-label">Venue</span>
          </a>

          {/* Action 2: Center Highlight - Shower Flower Blessings (🌸) */}
          <button
            onClick={triggerFlowerShower}
            className="dock-item dock-bless-hero"
            aria-label="Shower flower blessings"
          >
            <div className="dock-bless-circle">
              <span className="dock-flower-emoji">🌸</span>
              <Sparkles size={14} className="dock-sparkle-overlay" />
            </div>
            <span className="dock-label dock-bless-label">Bless Couple</span>
          </button>

          {/* Action 3: Add to Google / Phone Calendar */}
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="dock-item"
            aria-label="Add wedding to Calendar"
          >
            <div className="dock-icon-circle">
              <Calendar size={17} />
            </div>
            <span className="dock-label">Save Date</span>
          </a>

        </div>
      </div>
    </>
  );
}

