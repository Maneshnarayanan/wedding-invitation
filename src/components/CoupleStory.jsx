import React from 'react';
import { weddingConfig } from '../data/weddingConfig';

export default function CoupleStory() {
  return (
    <>
      {/* ── COUPLE SECTION ── */}
      <section id="couple" className="couple-section">
        <div className="container">

          <div className="section-header reveal">
            <span className="section-tag">✦ Auspicious Union • മംഗള സംഗമം ✦</span>
            <h2 className="section-title text-gold">The Bride &amp; The Groom</h2>
            <div className="section-divider">
              <span className="line" />
              <span className="symbol">❦</span>
              <span className="line" />
            </div>
          </div>

          {/* Royal Couple Master Card */}
          <div className="couple-master-card glass-card reveal">

            {/* Arch Photo */}
            <div className="couple-joint-photo-wrapper">
              <span className="arch-sparkle tl" aria-hidden="true">✨</span>
              <span className="arch-sparkle tr" aria-hidden="true">💛</span>

              <div className="couple-joint-arch-frame">
                <img
                  src={weddingConfig.couplePhotoSecond}
                  alt={`${weddingConfig.groom.fullName} & ${weddingConfig.bride.fullName}`}
                  className="couple-joint-photo"
                  loading="lazy"
                />
              </div>

              <div className="joint-lamp-badge">
                <span className="joint-lamp-icon">🪔</span>
              </div>
            </div>

            {/* Names */}
            <div className="couple-joint-names-box">
              <h3 className="joint-name font-royal text-gold">{weddingConfig.groom.fullName}</h3>
              <span className="joint-weds font-script">weds <span className="weds-heart">♥</span></span>
              <h3 className="joint-name font-royal text-gold">{weddingConfig.bride.fullName}</h3>
            </div>

            <p className="joint-blessing-quote font-editorial">
              "{weddingConfig.loveQuote}"
            </p>

            <div className="joint-card-divider">
              <span className="divider-line" />
              <span className="divider-symbol">❦</span>
              <span className="divider-line" />
            </div>

            {/* Lineage Grid */}
            <div className="couple-lineage-grid">

              {/* Groom */}
              <div className="lineage-column groom-column">
                <div className="lineage-role-pill groom-pill">
                  <span className="font-malayalam" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>വരൻ</span>
                  <span style={{ opacity: 0.6 }}>•</span>
                  <span>THE GROOM</span>
                </div>
                <h4 className="lineage-person-name font-royal">{weddingConfig.groom.fullName}</h4>
                <div className="lineage-details-card">
                  <div className="lineage-item">
                    <span className="lineage-label font-malayalam">മാതാപിതാക്കൾ • Parents</span>
                    <p className="lineage-value">{weddingConfig.groom.parents}</p>
                  </div>
                </div>
                <p className="lineage-bio">"{weddingConfig.groom.bio}"</p>
              </div>

              {/* Center divider */}
              <div className="lineage-center-divider">
                <span className="v-line" />
                <div className="v-symbol">🪔</div>
                <span className="v-line" />
              </div>

              {/* Bride */}
              <div className="lineage-column bride-column">
                <div className="lineage-role-pill bride-pill">
                  <span className="font-malayalam" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>വധു</span>
                  <span style={{ opacity: 0.6 }}>•</span>
                  <span>THE BRIDE</span>
                </div>
                <h4 className="lineage-person-name font-royal">{weddingConfig.bride.fullName}</h4>
                <div className="lineage-details-card">
                  <div className="lineage-item">
                    <span className="lineage-label font-malayalam">മാതാപിതാക്കൾ • Parents</span>
                    <p className="lineage-value">{weddingConfig.bride.parents}</p>
                  </div>
                </div>
                <p className="lineage-bio">"{weddingConfig.bride.bio}"</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section id="story" className="story-section">
        <div className="container">

          <div className="section-header reveal">
            <span className="section-tag">✦ Auspicious Milestones ✦</span>
            <h2 className="section-title text-gold">The Sacred Journey</h2>
            <div className="section-divider">
              <span className="line" />
              <span className="symbol">❦</span>
              <span className="line" />
            </div>
          </div>

          {/* Sacred Sloka Card */}
          <div className="sloka-section">
            <div className="sloka-card reveal">
              <span className="sloka-lead">Sacred Mangalya Sloka</span>
              <p className="sloka-sanskrit">{weddingConfig.sacredSloka.sanskrit}</p>
              <p className="sloka-malayalam-text font-malayalam">{weddingConfig.sacredSloka.malayalam}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', maxWidth: 300, margin: '0.8rem auto' }}>
                <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,var(--g500),transparent)' }} />
                <span style={{ color: 'var(--g300)', fontSize: '1.1rem' }}>❦</span>
                <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,var(--g500),transparent)' }} />
              </div>
              <p className="sloka-meaning">{weddingConfig.sacredSloka.meaning}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="timeline-container">
            <div className="timeline-line" />
            {weddingConfig.ourStory.map((item, index) => (
              <div
                key={item.year}
                className={`timeline-item ${index % 2 === 0 ? 'reveal-left' : 'reveal-right'} delay-${(index % 4) + 1}`}
              >
                <div className="timeline-node" />
                <div className="timeline-content glass-card">
                  <span className="timeline-year">{item.year} • {item.tag}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
