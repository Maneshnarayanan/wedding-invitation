import React, { useState } from 'react';
import { X } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="gallery" style={{ padding: '4.5rem 0' }}>
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">Memories</span>
          <h2 className="section-title">Captured Moments</h2>
          <div className="section-divider">
            <span className="line" />
            <span className="symbol">❦</span>
            <span className="line" />
          </div>
          <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'var(--color-text-secondary)', fontSize: '0.96rem' }}>
            A glimpse into the smiles, adventures, and milestones that brought us to this joyous day.
          </p>
        </div>

        {/* Gallery Grid (2 columns on mobile, auto-fill on desktop) */}
        <div className="gallery-grid">
          {weddingConfig.gallery.map((item, index) => (
            <div
              key={index}
              className="gallery-card"
              onClick={() => setSelectedPhoto(item)}
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${item.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedPhoto(item);
                }
              }}
            >
              <img src={item.url} alt={item.title} loading="lazy" />
              <div className="gallery-overlay">
                <p className="gallery-card-title">{item.title}</p>
                <p className="gallery-card-caption">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="lightbox-modal"
            onClick={() => setSelectedPhoto(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="lightbox-close"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo preview"
              >
                <X size={24} />
              </button>
              <img src={selectedPhoto.url} alt={selectedPhoto.title} />
              <div style={{ marginTop: '0.85rem', color: '#FFF', padding: '0 0.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif-royal)', color: 'var(--color-gold-300)', fontSize: '1.25rem' }}>
                  {selectedPhoto.title}
                </h3>
                <p style={{ fontStyle: 'italic', marginTop: '0.3rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                  {selectedPhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
