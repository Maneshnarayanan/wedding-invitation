import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function CoupleStory() {
  return (
    <section id="couple" style={{ padding: '5rem 0' }}>
      <div className="container">
        
        {/* Sacred Traditional Sloka Card */}
        <div className="sloka-card glass-card reveal-on-scroll">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '2rem' }}>🪔</span>
          </div>
          <p className="sloka-sanskrit font-royal">
            {weddingConfig.sacredSloka.sanskrit}
          </p>
          <p className="font-malayalam gold-accent" style={{ fontSize: '1.15rem', margin: '0.6rem 0', fontWeight: 'bold' }}>
            {weddingConfig.sacredSloka.malayalam}
          </p>
          <div className="section-divider" style={{ margin: '1rem auto' }}>
            <span className="line" />
            <Sparkles size={16} className="gold-accent" />
            <span className="line" />
          </div>
          <p className="sloka-meaning">
            {weddingConfig.sacredSloka.meaning}
          </p>
          <p className="font-malayalam" style={{ marginTop: '1.25rem', color: 'var(--color-gold-300)', fontSize: '1.05rem', fontStyle: 'normal' }}>
            {weddingConfig.keralaBlessing}
          </p>
        </div>

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

        {/* Couple Profiles Grid */}
        <div className="couple-grid">
          
          {/* Groom Card */}
          <div className="couple-card glass-card reveal-on-scroll">
            
            {/* Role Header Pill */}
            <div className="couple-role-pill groom-pill">
              <span className="role-ml font-malayalam">വരൻ</span>
              <span className="role-dot">•</span>
              <span className="role-en">THE GROOM</span>
            </div>

            {/* Regal Temple Arch Frame Photo */}
            <div className="couple-arch-wrapper">
              <div className="couple-arch-frame">
                <img
                  src={weddingConfig.groom.photo}
                  alt={weddingConfig.groom.fullName}
                  className="couple-arch-photo"
                  loading="lazy"
                />
              </div>
            </div>

            <h3 className="couple-name text-gold-gradient font-royal">{weddingConfig.groom.fullName}</h3>
            
            {/* Structured Auspicious Family Details Card */}
            <div className="couple-family-card">
              <div className="family-item">
                <span className="family-item-label font-malayalam">മാതാപിതാക്കൾ • Parents</span>
                <p className="family-item-name">{weddingConfig.groom.parents}</p>
              </div>

              {weddingConfig.groom.house && (
                <div className="family-item">
                  <span className="family-item-label font-malayalam">തറവാട് • Ancestral Home</span>
                  <p className="family-item-name">{weddingConfig.groom.house}</p>
                </div>
              )}

              {weddingConfig.groom.nephewOf && (
                <div className="family-item nephew-item">
                  <span className="family-item-label font-malayalam">അമ്മാവൻ • Uncle Lineage (N/o)</span>
                  <p className="family-item-name">{weddingConfig.groom.nephewOf}</p>
                </div>
              )}
            </div>

            <p className="couple-bio">"{weddingConfig.groom.bio}"</p>
          </div>

          {/* Center Nilavilakku (Traditional Keralam Lamp) Emblem */}
          <div className="couple-center-emblem reveal-on-scroll">
            <div className="emblem-halo">
              <span className="emblem-lamp-icon">🪔</span>
            </div>
            <span className="emblem-script font-script">weds</span>
            <span className="emblem-tag font-malayalam">വിവാഹം</span>
          </div>

          {/* Bride Card */}
          <div className="couple-card glass-card reveal-on-scroll">
            
            {/* Role Header Pill */}
            <div className="couple-role-pill bride-pill">
              <span className="role-ml font-malayalam">വധു</span>
              <span className="role-dot">•</span>
              <span className="role-en">THE BRIDE</span>
            </div>

            {/* Regal Temple Arch Frame Photo */}
            <div className="couple-arch-wrapper">
              <div className="couple-arch-frame">
                <img
                  src={weddingConfig.bride.photo}
                  alt={weddingConfig.bride.fullName}
                  className="couple-arch-photo"
                  loading="lazy"
                />
              </div>
            </div>

            <h3 className="couple-name text-gold-gradient font-royal">{weddingConfig.bride.fullName}</h3>

            {/* Structured Auspicious Family Details Card */}
            <div className="couple-family-card">
              <div className="family-item">
                <span className="family-item-label font-malayalam">മാതാപിതാക്കൾ • Parents</span>
                <p className="family-item-name">{weddingConfig.bride.parents}</p>
              </div>

              {weddingConfig.bride.house && (
                <div className="family-item">
                  <span className="family-item-label font-malayalam">തറവാട് • Ancestral Home</span>
                  <p className="family-item-name">{weddingConfig.bride.house}</p>
                </div>
              )}

              {weddingConfig.bride.nephewOf && (
                <div className="family-item nephew-item">
                  <span className="family-item-label font-malayalam">അമ്മാവൻ • Uncle Lineage (N/o)</span>
                  <p className="family-item-name">{weddingConfig.bride.nephewOf}</p>
                </div>
              )}
            </div>

            <p className="couple-bio">"{weddingConfig.bride.bio}"</p>
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
