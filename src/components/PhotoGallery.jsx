import React, { useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    if (clientWidth === 0) return;
    const idx = Math.round(scrollLeft / (clientWidth * 0.86));
    setActiveSlide(Math.min(Math.max(idx, 0), weddingConfig.gallery.length - 1));
  };

  const scrollToSlide = (index) => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.clientWidth * 0.86;
    carouselRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    setActiveSlide(index);
  };

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">

        <div className="section-header reveal">
          <span className="section-tag">✦ Memories ✦</span>
          <h2 className="section-title text-gold">Captured Moments</h2>
          <div className="section-divider">
            <span className="line" />
            <span className="symbol">❦</span>
            <span className="line" />
          </div>
          <p style={{ maxWidth: '580px', margin: '1rem auto 0', color: 'var(--text-secondary)', fontSize: '1rem', fontStyle: 'italic', fontFamily: 'var(--f-editorial)' }}>
            A glimpse into cherished moments leading into our sacred new beginning.
          </p>
        </div>

        {/* Mobile carousel */}
        <div className="gallery-mobile-carousel-wrapper reveal">
          <div className="gallery-mobile-track" ref={carouselRef} onScroll={handleScroll}>
            {weddingConfig.gallery.map((item, index) => (
              <div key={index} className="gallery-slide-card" onClick={() => setSelectedPhoto(item)}>
                <div className="gallery-slide-img-box">
                  <img src={item.url} alt={item.title} loading="lazy" />
                  <div className="gallery-slide-badge" aria-label="Expand photo">
                    <Maximize2 size={15} />
                  </div>
                </div>
                <div className="gallery-slide-meta">
                  <h4 className="gallery-slide-title">{item.title}</h4>
                  <p className="gallery-slide-caption">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-nav-bar">
            <button onClick={() => scrollToSlide(Math.max(activeSlide - 1, 0))} className="carousel-arrow-btn" disabled={activeSlide === 0} aria-label="Previous">
              <ChevronLeft size={18} />
            </button>
            <div className="carousel-dots-row">
              {weddingConfig.gallery.map((_, idx) => (
                <button key={idx} onClick={() => scrollToSlide(idx)} className={`carousel-dot ${activeSlide === idx ? 'active' : ''}`} aria-label={`Photo ${idx + 1}`} />
              ))}
            </div>
            <button onClick={() => scrollToSlide(Math.min(activeSlide + 1, weddingConfig.gallery.length - 1))} className="carousel-arrow-btn" disabled={activeSlide === weddingConfig.gallery.length - 1} aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>
          <p className="swipe-hint-text"><span>👈</span> Swipe horizontally <span>👉</span></p>
        </div>

        {/* Desktop grid */}
        <div className="gallery-grid gallery-desktop-grid">
          {weddingConfig.gallery.map((item, index) => (
            <div
              key={index}
              className={`gallery-card reveal delay-${(index % 4) + 1}`}
              onClick={() => setSelectedPhoto(item)}
              role="button"
              tabIndex={0}
              aria-label={`View: ${item.title}`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedPhoto(item); }}
            >
              <img src={item.url} alt={item.title} loading="lazy" />
              <div className="gallery-overlay">
                <p className="gallery-card-title">{item.title}</p>
                <p className="gallery-card-caption">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedPhoto && (
          <div className="lightbox-modal" onClick={() => setSelectedPhoto(null)} role="dialog" aria-modal="true">
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" onClick={() => setSelectedPhoto(null)} aria-label="Close">
                <X size={22} />
              </button>
              <img src={selectedPhoto.url} alt={selectedPhoto.title} />
              <div style={{ padding: '0.9rem 0.5rem 0.3rem', textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'var(--f-royal)', color: 'var(--g200)', fontSize: '1.15rem', marginBottom: '0.3rem' }}>
                  {selectedPhoto.title}
                </h3>
                <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
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
