import React from 'react';
import { MapPin, Navigation, Phone, Car, Compass } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function VenueMap() {
  const encodedQuery = encodeURIComponent(weddingConfig.venue.mapQuery);
  const embedUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="venue" style={{ padding: '5rem 0' }}>
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">Auspicious Venue</span>
          <h2 className="section-title">The Wedding Venue</h2>
          <div className="section-divider">
            <span className="line" />
            <span className="symbol">❦</span>
            <span className="line" />
          </div>
          <p className="font-malayalam" style={{ maxWidth: '650px', margin: '1rem auto 0', color: 'var(--color-gold-300)', fontSize: '1.05rem' }}>
            രാജ്‌പാലസ് ഓഡിറ്റോറിയം, പൊയിനാച്ചി, കാസർഗോഡ്
          </p>
        </div>

        <div className="venue-wrapper">
          {/* Venue Info Card */}
          <div className="venue-info-card glass-card">
            <div>
              <h3 className="venue-name">{weddingConfig.venue.name}</h3>
              <p className="venue-hall">{weddingConfig.venue.hall}</p>

              <ul className="venue-meta-list">
                <li className="venue-meta-item">
                  <MapPin size={20} />
                  <div>
                    <strong>Address:</strong>
                    <div>{weddingConfig.venue.address}</div>
                  </div>
                </li>

                <li className="venue-meta-item">
                  <Compass size={20} />
                  <div>
                    <strong>Landmark:</strong>
                    <div>{weddingConfig.venue.landmark}</div>
                  </div>
                </li>

                <li className="venue-meta-item">
                  <Car size={20} />
                  <div>
                    <strong>Parking:</strong>
                    <div>{weddingConfig.venue.notes}</div>
                  </div>
                </li>
              </ul>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <a
                href={weddingConfig.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-primary"
                style={{ width: '100%' }}
              >
                <Navigation size={18} /> Open in Google Maps
              </a>
            </div>
          </div>

          {/* Map Embed Frame */}
          <div className="map-container">
            <iframe
              title="Raj Palace Auditorium Poinachi Location"
              src={embedUrl}
              className="map-iframe"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>

        {/* Contact Persons Banner */}
        <div style={{ marginTop: '2rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem 2rem' }}>
            <h4 style={{ fontFamily: 'var(--font-serif-royal)', color: 'var(--color-gold-300)', marginBottom: '1rem', fontSize: '1.1rem' }}>
              Family Contact & Hospitality (Poinachi, Kasaragod)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {weddingConfig.contactPersons.map((contact) => (
                <div key={contact.name} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem' }}>
                  <Phone size={15} className="gold-accent" />
                  <span><strong>{contact.name}:</strong> <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} style={{ color: 'var(--color-gold-300)', textDecoration: 'none' }}>{contact.phone}</a></span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
