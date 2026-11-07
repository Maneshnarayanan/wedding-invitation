import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  // Sync active slide index on scroll for mobile carousel
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    if (clientWidth === 0) return;
    const newIndex = Math.round(scrollLeft / (clientWidth * 0.86));
    setActiveSlide(Math.min(Math.max(newIndex, 0), weddingConfig.gallery.length - 1));
  };

  const scrollToSlide = (index) => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.clientWidth * 0.86;
    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    setActiveSlide(index);
  };

  const nextSlide = () => {
    scrollToSlide(Math.min(activeSlide + 1, weddingConfig.gallery.length - 1));
  };

  const prevSlide = () => {
    scrollToSlide(Math.max(activeSlide - 1, 0));
  };

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
            A glimpse into the cherished moments and milestones leading into our sacred new beginning.
          </p>
        </div>

        {/* --- MOBILE TOUCH-SWIPE CAROUSEL (Visible on Mobile) --- */}
        <div className="gallery-mobile-carousel-wrapper">
          <div
            className="gallery-mobile-track"
            ref={carouselRef}
            onScroll={handleScroll}
          >
            {weddingConfig.gallery.map((item, index) => (
              <div
                key={index}
                className="gallery-slide-card"
                onClick={() => setSelectedPhoto(item)}
              >
                <div className="gallery-slide-img-box">
                  <img src={item.url} alt={item.title} loading="lazy" />
                  <div className="gallery-slide-badge" aria-label="Expand photo">
                    <Maximize2 size={16} />
                  </div>
                </div>
                <div className="gallery-slide-meta">
                  <h4 className="gallery-slide-title">{item.title}</h4>
                  <p className="gallery-slide-caption">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Arrows & Dot Indicators */}
          <div className="carousel-nav-bar">
            <button
              onClick={prevSlide}
              className="carousel-arrow-btn"
              disabled={activeSlide === 0}
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="carousel-dots-row">
              {weddingConfig.gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  className={`carousel-dot ${activeSlide === idx ? 'active' : ''}`}
                  aria-label={`Go to photo ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="carousel-arrow-btn"
              disabled={activeSlide === weddingConfig.gallery.length - 1}
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <p className="swipe-hint-text">
            <span>👈</span> Swipe photos horizontally <span>👉</span>
          </p>
        </div>

        {/* --- DESKTOP GALLERY GRID (Visible on screens >= 768px) --- */}
        <div className="gallery-grid gallery-desktop-grid">
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

        {/* Lightbox Modal for Full View */}
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
