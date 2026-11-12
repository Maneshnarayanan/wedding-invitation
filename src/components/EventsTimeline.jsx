import React from 'react';
import { Calendar, Clock, Shirt, HeartHandshake, Sparkles } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import VenueMap from './VenueMap';

const iconMap = {
  HeartHandshake: HeartHandshake,
  Sparkles: Sparkles
};

export default function EventsTimeline() {
  return (
    <section id="events" style={{ padding: '3.5rem 0' }}>
      <div className="container">
        
        <div className="section-header reveal-on-scroll">
          <span className="section-tag">Auspicious Ceremony</span>
          <h2 className="section-title">Ceremony & Venue</h2>
          <div className="section-divider">
            <span className="line" />
            <span className="symbol">❦</span>
            <span className="line" />
          </div>
          <p className="font-malayalam" style={{ maxWidth: '650px', margin: '1rem auto 0', color: 'var(--color-gold-300)', fontSize: '1.05rem' }}>
            ശുഭമുഹൂർത്ത വിവാഹ ചടങ്ങിൽ താങ്കളുടെയും കുടുംബത്തിന്റെയും മംഗള സാന്നിധ്യം സ്നേഹപൂർവ്വം പ്രതീക്ഷിക്കുന്നു.
          </p>
        </div>

        <div className="wedding-details-wrap">
          {weddingConfig.events.map((event) => {
            const IconComponent = iconMap[event.icon] || HeartHandshake;

            return (
              <div key={event.id} className="event-card wedding-details-card glass-card reveal-on-scroll">
                <div className="event-overview">
                  <div className="event-icon-badge" style={{ width: '56px', height: '56px' }}>
                    <IconComponent size={30} />
                  </div>
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-subtitle">{event.subtitle}</p>
                  <ul className="event-details-list">
                    <li className="event-detail-item">
                      <Calendar size={18} />
                      <span><strong>Date:</strong> {event.date}</span>
                    </li>
                    <li className="event-detail-item">
                      <Clock size={18} />
                      <span><strong>Muhurtham:</strong> {event.time}</span>
                    </li>
                    <li className="event-detail-item">
                      <Shirt size={18} />
                      <span><strong>Attire:</strong> {event.dressCode}</span>
                    </li>
                  </ul>
                </div>
                <VenueMap />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
