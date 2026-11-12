import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import Countdown, { getWeddingCalendarUrl } from './Countdown';

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-cover">
        <img
          src={weddingConfig.couplePhoto}
          alt={`${weddingConfig.groom.fullName} and ${weddingConfig.bride.fullName}`}
          className="hero-cover-image"
          fetchPriority="high"
        />
        <div className="hero-cover-content">
          <p className="font-malayalam hero-invocation">॥ ശ്രീ ഗുരുഭ്യോ നമഃ • ശുഭ വിവാഹം ॥</p>
          <span className="hero-subtitle">Wedding invitation</span>
          <h1 className="hero-names">
            <span>{weddingConfig.groom.fullName}</span>
            <span className="ampersand">&</span>
            <span>{weddingConfig.bride.fullName}</span>
          </h1>
          <div className="hero-cover-details">
            <span><Calendar size={16} /> {weddingConfig.weddingDateFormatted}</span>
            <span className="font-malayalam">{weddingConfig.muhurthamTime}</span>
          </div>
        </div>
      </div>

      <div className="hero-quick-info">
        <p className="hero-venue">
          <MapPin size={17} className="gold-accent" />
          <span>{weddingConfig.venue.name}, {weddingConfig.venue.city}</span>
        </p>
        <p className="hero-invitation-text">
          {weddingConfig.invitationNote}
        </p>

        <div className="hero-actions">
          <a href={getWeddingCalendarUrl()} target="_blank" rel="noopener noreferrer" className="btn-gold-primary">
            <Calendar size={18} /> Save the date
          </a>
          <a href={weddingConfig.venue.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-gold-secondary">
            <MapPin size={18} /> Get directions
          </a>
        </div>
        <div className="hero-countdown">
          <Countdown />
        </div>
      </div>
    </section>
  );
}
