import React, { useState } from 'react';
import { Copy, Check, Heart } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyHashtag = () => {
    navigator.clipboard.writeText(weddingConfig.hashtag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="footer">
      <div className="container">

        {/* Blessing Card */}
        <div className="footer-blessing-card reveal">
          <span className="footer-blessing-label">A Blessing for the Journey</span>
          <p className="font-malayalam footer-blessing-malayalam">{weddingConfig.sacredSloka.malayalam}</p>
          <p className="footer-blessing-meaning">{weddingConfig.sacredSloka.meaning}</p>
        </div>

        {/* Names */}
        <h3 className="footer-names text-gold">
          {weddingConfig.groom.fullName}{' '}
          <span style={{ fontFamily: 'var(--f-script)', color: 'var(--g300)' }}>&</span>{' '}
          {weddingConfig.bride.fullName}
        </h3>

        {/* Kerala blessing */}
        <p className="font-malayalam gold-accent" style={{ fontSize: '1rem', marginBottom: '0.6rem', fontWeight: 600, lineHeight: 1.75 }}>
          {weddingConfig.keralaBlessing}
        </p>

        <p style={{ fontFamily: 'var(--f-editorial)', fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '1.8rem', fontSize: '0.98rem' }}>
          "{weddingConfig.loveQuote}"
        </p>

        {/* Hashtag */}
        <div style={{ marginBottom: '1.8rem' }}>
          <button onClick={copyHashtag} className="footer-hashtag" aria-label="Copy wedding hashtag" title="Click to copy">
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span>{weddingConfig.hashtag}</span>
            {copied && <span style={{ fontSize: '0.72rem', color: '#10B981', marginLeft: '4px' }}>Copied!</span>}
          </button>
        </div>

        <p className="footer-credits">
          {weddingConfig.weddingDateFormatted} • {weddingConfig.venue.name}, {weddingConfig.venue.city}
        </p>

        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          With blessings from family and elders <Heart size={12} fill="#E11D48" color="#E11D48" />
        </p>

      </div>
    </footer>
  );
}
