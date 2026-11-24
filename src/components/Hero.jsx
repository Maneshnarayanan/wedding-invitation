import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import Countdown, { getWeddingCalendarUrl } from './Countdown';

export default function Hero() {
  const bgRef = useRef(null);

  // Subtle parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrollY = window.scrollY;
      bgRef.current.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero-section" id="home">
      {/* Layered Background */}
      <div className="hero-bg">
        <img
          ref={bgRef}
          src={weddingConfig.couplePhotoFirst}
          alt=""
          className="hero-bg-image"
          fetchPriority="high"
        />
        <div className="hero-bg-gradient" />

        {/* SVG Mandala rings */}
        <svg className="hero-mandala" viewBox="0 0 900 900" aria-hidden="true">
          <circle className="ring-1" cx="450" cy="450" r="380" strokeWidth="1" strokeDasharray="8 16" />
          <circle className="ring-2" cx="450" cy="450" r="310" strokeWidth="0.5" strokeDasharray="4 20" />
          <circle className="ring-3" cx="450" cy="450" r="240" strokeWidth="1.5" strokeDasharray="12 8" />
          <circle cx="450" cy="450" r="170" strokeWidth="0.5" strokeDasharray="6 12" />
          <circle cx="450" cy="450" r="100" strokeWidth="1" strokeDasharray="3 9" />
          {/* 8 diagonal spokes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
            const r = Math.PI * a / 180;
            const x1 = 450 + 100 * Math.cos(r), y1 = 450 + 100 * Math.sin(r);
            const x2 = 450 + 380 * Math.cos(r), y2 = 450 + 380 * Math.sin(r);
            return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(229,165,0,0.9)" strokeWidth="0.5" />;
          })}
        </svg>
      </div>

      {/* Cover text with portrait */}
      <div className="hero-cover">
        <div className="hero-portrait-frame">
          <img src={weddingConfig.couplePhotoFirst} alt="" />
        </div>

        <div className="hero-cover-content">
          <p className="font-malayalam hero-invocation">॥ ശ്രീ ഗുരുഭ്യോ നമഃ • ശുഭ വിവാഹം ॥</p>
          <span className="hero-subtitle">Wedding Invitation</span>
          <h1 className="hero-names">
            <span className="hero-sparkle">✨</span>
            <span className="text-gold font-royal">{weddingConfig.groom.fullName}</span>
            <span className="ampersand">&</span>
            <span className="text-gold font-royal">{weddingConfig.bride.fullName}</span>
            <span className="hero-sparkle">💛</span>
          </h1>
        </div>
      </div>

      {/* Quick info + countdown */}
      <div className="hero-quick-info">
        <div className="muhurtham-seal">
          <div className="seal-date-row">
            <Calendar size={16} style={{ color: 'var(--g400)' }} />
            <span style={{ fontFamily: 'var(--f-royal)', fontWeight: 600 }}>
              {weddingConfig.weddingDateFormatted}
            </span>
            <span className="seal-divider-dot">•</span>
            <span style={{ fontFamily: 'var(--f-royal)', fontWeight: 600 }}>
              {weddingConfig.venue.name}
            </span>
          </div>
          <span className="font-malayalam seal-malayalam-date">{weddingConfig.malayalamDate}</span>
          <div className="seal-muhurtham-highlight">
            <span className="seal-lamp">🪔</span>
            <span style={{ fontWeight: 600 }}>Muhurtham: {weddingConfig.muhurthamTime}</span>
          </div>
        </div>

        <p className="hero-invitation-text">
          {weddingConfig.invitationNote}
        </p>

        <div className="hero-actions">
          <a href={getWeddingCalendarUrl()} target="_blank" rel="noopener noreferrer" className="btn-gold-primary">
            <Calendar size={17} /> Save the Date
          </a>
          <a href={weddingConfig.venue.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-gold-secondary">
            <MapPin size={17} /> Get Directions
          </a>
        </div>

        <div className="hero-countdown">
          <Countdown />
        </div>
      </div>
    </section>
  );
}
