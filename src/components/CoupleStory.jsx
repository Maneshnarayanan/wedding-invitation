import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function CoupleStory() {
  return (
    <section id="couple" style={{ padding: '5rem 0' }}>
      <div className="container">
        
        {/* Sacred Traditional Sloka Card */}
        <div className="sloka-card glass-card">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🪔</span>
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
        <div className="section-header">
          <span className="section-tag">Auspicious Union</span>
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
          <div className="couple-card glass-card">
            <div className="couple-photo-wrapper">
              <img
                src={weddingConfig.groom.photo}
                alt={weddingConfig.groom.fullName}
                className="couple-photo"
                loading="lazy"
              />
            </div>
            <h3 className="couple-name">{weddingConfig.groom.fullName}</h3>
            <p className="couple-role">{weddingConfig.groom.role}</p>
            
            <div className="couple-family-box">
              <div className="couple-family-row">
                <span className="family-label">Son of</span>
                <p className="family-value">{weddingConfig.groom.parents}</p>
              </div>
              {weddingConfig.groom.house && (
                <div className="couple-family-row">
                  <p className="family-sub-value">{weddingConfig.groom.house}</p>
                </div>
              )}
              {weddingConfig.groom.nephewOf && (
                <div className="couple-family-row nephew-row">
                  <span className="family-sub-tag">N/o:</span>
                  <p className="family-relation-value">{weddingConfig.groom.nephewOf}</p>
                </div>
              )}
            </div>

            <p className="couple-bio">"{weddingConfig.groom.bio}"</p>
          </div>

          {/* Center Nilavilakku (Traditional Keralam Lamp) Emblem */}
          <div className="couple-center-emblem">
            <div className="emblem-ring" style={{ width: '76px', height: '76px', borderStyle: 'solid' }}>
              <span style={{ fontSize: '2.2rem' }}>🪔</span>
            </div>
            <span style={{ fontFamily: 'var(--font-script)', fontSize: '2.3rem', color: 'var(--color-gold-400)' }}>
              weds
            </span>
          </div>

          {/* Bride Card */}
          <div className="couple-card glass-card">
            <div className="couple-photo-wrapper">
              <img
                src={weddingConfig.bride.photo}
                alt={weddingConfig.bride.fullName}
                className="couple-photo"
                loading="lazy"
              />
            </div>
            <h3 className="couple-name">{weddingConfig.bride.fullName}</h3>
            <p className="couple-role">{weddingConfig.bride.role}</p>

            <div className="couple-family-box">
              <div className="couple-family-row">
                <span className="family-label">Daughter of</span>
                <p className="family-value">{weddingConfig.bride.parents}</p>
              </div>
              {weddingConfig.bride.house && (
                <div className="couple-family-row">
                  <p className="family-sub-value">{weddingConfig.bride.house}</p>
                </div>
              )}
              {weddingConfig.bride.nephewOf && (
                <div className="couple-family-row nephew-row">
                  <span className="family-sub-tag">N/o:</span>
                  <p className="family-relation-value">{weddingConfig.bride.nephewOf}</p>
                </div>
              )}
            </div>

            <p className="couple-bio">"{weddingConfig.bride.bio}"</p>
          </div>
        </div>

        {/* --- OUR STORY SECTION --- */}
        <div id="story" style={{ paddingTop: '2rem' }}>
          <div className="section-header">
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
              <div key={item.year} className="timeline-item">
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
