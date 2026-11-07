import React from 'react';
import { Calendar, Clock, MapPin, Shirt, HeartHandshake, Sparkles } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

const iconMap = {
  HeartHandshake: HeartHandshake,
  Sparkles: Sparkles
};

export default function EventsTimeline() {
  return (
    <section id="events" style={{ padding: '5rem 0' }}>
      <div className="container">
        
        <div className="section-header reveal-on-scroll">
          <span className="section-tag">Auspicious Ceremony</span>
          <h2 className="section-title">The Wedding Muhurtham</h2>
          <div className="section-divider">
            <span className="line" />
            <span className="symbol">❦</span>
            <span className="line" />
          </div>
          <p className="font-malayalam" style={{ maxWidth: '650px', margin: '1rem auto 0', color: 'var(--color-gold-300)', fontSize: '1.05rem' }}>
            ശുഭമുഹൂർത്ത വിവാഹ ചടങ്ങിൽ താങ്കളുടെയും കുടുംബത്തിന്റെയും മംഗള സാന്നിധ്യം സ്നേഹപൂർവ്വം പ്രതീക്ഷിക്കുന്നു.
          </p>
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto 5rem' }}>
          {weddingConfig.events.map((event) => {
            const IconComponent = iconMap[event.icon] || HeartHandshake;

            return (
              <div key={event.id} className="event-card glass-card reveal-on-scroll" style={{ padding: '2.5rem 2rem' }}>
                <div>
                  <div className="event-icon-badge" style={{ width: '56px', height: '56px' }}>
                    <IconComponent size={30} />
                  </div>
                  <h3 className="event-title" style={{ fontSize: '1.55rem' }}>{event.title}</h3>
                  <p className="event-subtitle" style={{ fontSize: '0.95rem' }}>{event.subtitle}</p>
                </div>

                <ul className="event-details-list" style={{ margin: '1.5rem 0' }}>
                  <li className="event-detail-item">
                    <Calendar size={18} />
                    <span><strong>Date:</strong> {event.date}</span>
                  </li>
                  <li className="event-detail-item">
                    <Clock size={18} />
                    <span style={{ color: 'var(--color-gold-300)' }}><strong>Muhurtham:</strong> {event.time}</span>
                  </li>
                  <li className="event-detail-item">
                    <MapPin size={18} />
                    <span><strong>Venue:</strong> {event.venue}</span>
                  </li>
                  <li className="event-detail-item">
                    <Shirt size={18} />
                    <span><strong>Attire:</strong> {event.dressCode}</span>
                  </li>
                </ul>

                <a
                  href="#venue"
                  className="btn-gold-primary"
                  style={{ width: '100%', fontSize: '0.95rem', padding: '0.85rem 1rem' }}
                >
                  <MapPin size={17} /> View Raj Palace Venue & Route
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
