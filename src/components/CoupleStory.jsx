import React from 'react';
import { weddingConfig } from '../data/weddingConfig';

export default function CoupleStory() {
  return (
    <section id="couple" style={{ padding: '5rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header reveal-on-scroll">
          <span className="section-tag">Auspicious Union • മംഗള സംഗമം</span>
          <h2 className="section-title">The Bride & The Groom</h2>
          <div className="section-divider">
            <span className="line" />
            <span className="symbol">❦</span>
            <span className="line" />
          </div>
        </div>

        {/* --- UNIFIED ROYAL COUPLE MASTER CARD --- */}
        <div className="couple-master-card glass-card reveal-on-scroll">
          
          {/* Top Royal Temple Arch Portrait of Couple Together */}
          <div className="couple-joint-photo-wrapper">
            <span className="arch-love-sparkle sparkle-tl" aria-hidden="true">✨</span>
            <span className="arch-love-sparkle sparkle-tr" aria-hidden="true">💛</span>
            <div className="couple-joint-arch-frame">
              <img
                src={weddingConfig.couplePhotoSecond}
                alt={`${weddingConfig.groom.fullName} & ${weddingConfig.bride.fullName}`}
                className="couple-joint-photo"
                loading="lazy"
              />
            </div>

            {/* Glowing Nilavilakku Emblem */}
            <div className="joint-lamp-badge">
              <span className="joint-lamp-icon">🪔</span>
            </div>
          </div>

          {/* Joint Couple Names & Cursive "weds" */}
          <div className="couple-joint-names-box">
            <h3 className="joint-name font-royal text-gold-gradient">{weddingConfig.groom.fullName}</h3>
            <span className="joint-weds font-script">weds <span className="weds-heart">♥</span></span>
            <h3 className="joint-name font-royal text-gold-gradient">{weddingConfig.bride.fullName}</h3>
          </div>

          <p className="joint-blessing-quote font-editorial">
            "{weddingConfig.loveQuote}"
          </p>

          <div className="joint-card-divider">
            <span className="divider-line" />
            <span className="divider-symbol">❦</span>
            <span className="divider-line" />
          </div>

          {/* Dual Lineage Columns: Groom (Left) & Bride (Right) */}
          <div className="couple-lineage-grid">
            
            {/* --- Groom Details Column --- */}
            <div className="lineage-column groom-column">
              <div className="lineage-role-pill groom-pill">
                <span className="role-ml font-malayalam">വരൻ</span>
                <span className="role-dot">•</span>
                <span className="role-en">THE GROOM</span>
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

            {/* Vertical Center Divider on Desktop */}
            <div className="lineage-center-divider">
              <span className="v-line" />
              <div className="v-symbol">🪔</div>
              <span className="v-line" />
            </div>

            {/* --- Bride Details Column --- */}
            <div className="lineage-column bride-column">
              <div className="lineage-role-pill bride-pill">
                <span className="role-ml font-malayalam">വധു</span>
                <span className="role-dot">•</span>
                <span className="role-en">THE BRIDE</span>
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

        {/* --- OUR STORY SECTION --- */}
        <div id="story" style={{ paddingTop: '2rem' }}>
          <div className="section-header reveal-on-scroll">
            <span className="section-tag">Auspicious Milestones</span>
            <h2 className="section-title">The Sacred Journey</h2>
            <div className="section-divider">
              <span className="line" />
              <span className="symbol">❦</span>
              <span className="line" />
            </div>
          </div>

          <div className="timeline-container">
            <div className="timeline-line" />
            
            {weddingConfig.ourStory.map((item, index) => (
              <div key={item.year} className="timeline-item reveal-on-scroll">
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

      </div>
    </section>
  );
}
