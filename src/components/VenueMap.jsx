import React from 'react';
import { MapPin, Navigation, Car, Compass } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function VenueMap() {
  const encodedQuery = encodeURIComponent(weddingConfig.venue.mapQuery);
  const embedUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="venue-panel" id="venue">
      <div className="venue-panel-heading">
        <MapPin size={19} />
        <div>
          <h3 className="venue-name">{weddingConfig.venue.name}</h3>
          <p className="venue-hall">{weddingConfig.venue.hall}</p>
        </div>
      </div>

      <ul className="venue-meta-list">
        <li className="venue-meta-item">
          <MapPin size={18} />
          <div><strong>Address</strong><div>{weddingConfig.venue.address}</div></div>
        </li>
        <li className="venue-meta-item">
          <Compass size={18} />
          <div><strong>Landmark</strong><div>{weddingConfig.venue.landmark}</div></div>
        </li>
        <li className="venue-meta-item">
          <Car size={18} />
          <div><strong>Parking</strong><div>{weddingConfig.venue.notes}</div></div>
        </li>
      </ul>

      <div className="map-container">
        <iframe
          title="Raj Palace Auditorium Poinachi Location"
          src={embedUrl}
          className="map-iframe"
          loading="lazy"
          allowFullScreen
        />
      </div>
      <a
        href={weddingConfig.venue.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold-primary venue-directions"
      >
        <Navigation size={18} /> Get directions
      </a>
    </div>
  );
}
