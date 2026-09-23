import React from 'react';
import { Sparkles, MapPin, Calendar, ChevronDown, Clock } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import Countdown from './Countdown';

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Traditional Invocation */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.25rem' }}>
          <p className="font-malayalam gold-accent" style={{ fontSize: '1.05rem', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            ॥ ശ്രീ ഗുരുഭ്യോ നമഃ • ശുഭ വിവാഹം ॥
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles size={16} className="gold-accent" />
            <span className="hero-subtitle">Cordially Inviting You</span>
            <Sparkles size={16} className="gold-accent" />
          </div>
        </div>

        {/* Couple Names */}
        <h1 className="hero-names">
          <span className="text-gold-gradient">{weddingConfig.groom.fullName}</span>
          <span className="ampersand">&</span>
          <span className="text-gold-gradient">{weddingConfig.bride.fullName}</span>
        </h1>

        {/* Auspicious Date & Golden Muhurtham Seal */}
        <div className="hero-date-badge muhurtham-seal">
          <div className="seal-date-row">
            <Calendar size={17} className="gold-accent" />
            <span>{weddingConfig.weddingDateFormatted}</span>
            <span className="seal-divider-dot">•</span>
            <span className="font-malayalam seal-malayalam-date">{weddingConfig.malayalamDate}</span>
          </div>
          <div className="seal-muhurtham-highlight">
            <span className="seal-lamp">🪔</span>
            <span><strong>MUHURTHAM: {weddingConfig.muhurthamTime}</strong></span>
          </div>
        </div>

        {/* Venue Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '1rem', marginBottom: '1.75rem' }}>
          <MapPin size={17} className="gold-accent" />
          <span>{weddingConfig.venue.name}, {weddingConfig.venue.city}</span>
        </div>

        {/* Invitation Text */}
        <p className="hero-invitation-text" style={{ maxWidth: '720px' }}>
          {weddingConfig.invitationNote}
        </p>

        {/* Live Countdown to Muhurtham */}
        <Countdown />

        {/* Action Buttons (No RSVP needed) */}
        <div className="hero-actions" style={{ marginTop: '2.5rem' }}>
          <a href="#events" className="btn-gold-primary">
            <Clock size={18} /> View Wedding Muhurtham
          </a>
          <a href="#venue" className="btn-gold-secondary">
            <MapPin size={18} /> Directions to Raj Palace
          </a>
        </div>

        {/* Scroll Indicator */}
        <div style={{ marginTop: '3.5rem', opacity: 0.75, animation: 'float-slow 3s infinite ease-in-out' }}>
          <a href="#couple" aria-label="Scroll to couple details" style={{ color: 'var(--color-gold-300)' }}>
            <ChevronDown size={28} />
          </a>
        </div>
      </div>
    </section>
  );
}
