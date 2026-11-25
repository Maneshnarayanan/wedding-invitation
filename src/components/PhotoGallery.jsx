import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Play, Pause } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    return true;
  });
  const [isTouching, setIsTouching] = useState(false);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const total = weddingConfig.gallery.length;

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Automatic 3D slideshow timer (pauses on touch or when lightbox is open)
  useEffect(() => {
    if (!isPlaying || selectedPhoto || isTouching) return;
    const timer = setInterval(nextSlide, 3600);
    return () => clearInterval(timer);
  }, [isPlaying, selectedPhoto, isTouching, nextSlide]);

  const handleTouchStart = (e) => {
    setIsTouching(true);
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) nextSlide();
      else prevSlide();
    }
    setIsTouching(false);
  };

  const getCardStyle = (index) => {
    let offset = index - activeSlide;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const abs = Math.abs(offset);
    if (offset === 0) {
      return {
        transform: 'translate3d(0%, 0, 0px) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 10,
        filter: 'brightness(1)',
      };
    }
    if (abs === 1) {
      return {
        transform: `translate3d(${offset * 62}%, 0, -110px) rotateY(${offset * -28}deg) scale(0.84)`,
        opacity: 0.72,
        zIndex: 5,
        filter: 'brightness(0.62)',
      };
    }
    return {
      transform: `translate3d(${offset * 85}%, 0, -220px) rotateY(${offset * -40}deg) scale(0.68)`,
      opacity: 0,
      zIndex: 1,
      pointerEvents: 'none',
      filter: 'brightness(0.4)',
    };
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

        {/* Mobile 3D Automatic Slideshow */}
        <div className="gallery-mobile-carousel-wrapper reveal">
          <div
            className="gallery-3d-stage"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsTouching(true)}
            onMouseLeave={() => setIsTouching(false)}
            role="region"
            aria-roledescription="carousel"
            aria-label="Captured Moments 3D Slideshow"
          >
            {weddingConfig.gallery.map((item, index) => {
              const isActive = index === activeSlide;
              return (
                <div
                  key={index}
                  className={`gallery-3d-card ${isActive ? 'is-active' : ''}`}
                  style={getCardStyle(index)}
                  onClick={() => (isActive ? setSelectedPhoto(item) : setActiveSlide(index))}
                  role="button"
                  tabIndex={isActive ? 0 : -1}
                  aria-label={isActive ? `Expand ${item.title}` : `Show ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (isActive) setSelectedPhoto(item);
                      else setActiveSlide(index);
                    }
                  }}
                >
                  <div className="gallery-slide-img-box">
                    <img src={item.url} alt={item.title} loading="lazy" />
                    {isActive && (
                      <div className="gallery-slide-badge" aria-label="Expand photo">
                        <Maximize2 size={15} />
                      </div>
                    )}
                    <div className="gallery-3d-counter">
                      {index + 1} / {total}
                    </div>
                  </div>
                  <div className="gallery-slide-meta">
                    <h4 className="gallery-slide-title">{item.title}</h4>
                    <p className="gallery-slide-caption">{item.caption}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="carousel-nav-bar">
            <button onClick={prevSlide} className="carousel-arrow-btn" aria-label="Previous photo">
              <ChevronLeft size={18} />
            </button>
            <div className="carousel-dots-row">
              {weddingConfig.gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`carousel-dot ${activeSlide === idx ? 'active' : ''}`}
                  aria-label={`Photo ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="carousel-arrow-btn carousel-play-btn"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            </button>
            <button onClick={nextSlide} className="carousel-arrow-btn" aria-label="Next photo">
              <ChevronRight size={18} />
            </button>
          </div>
          <p className="swipe-hint-text"><span>👈</span> Swipe or tap sides • Tap center to zoom <span>👉</span></p>
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
