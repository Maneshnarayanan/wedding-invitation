import React, { useState } from 'react';
import { Copy, Check, Share2, Heart } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyHashtag = () => {
    navigator.clipboard.writeText(weddingConfig.hashtag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `✨ You're cordially invited to celebrate the Keralam Traditional Wedding of ${weddingConfig.groom.fullName} & ${weddingConfig.bride.fullName} on ${weddingConfig.weddingDateFormatted} (Muhurtham: ${weddingConfig.muhurthamTime}) at ${weddingConfig.venue.name}, ${weddingConfig.venue.city}! View the invitation here: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <footer className="footer">
      <div className="container">
        
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.8rem' }}>🪔</span>
        </div>

        <h3 className="footer-names">
          {weddingConfig.groom.fullName} <span style={{ fontFamily: 'var(--font-script)', color: 'var(--color-gold-400)' }}>&</span> {weddingConfig.bride.fullName}
        </h3>

        <p className="font-malayalam gold-accent" style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>
          {weddingConfig.keralaBlessing}
        </p>
        
        <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
          "{weddingConfig.loveQuote}"
        </p>

        {/* Hashtag */}
        <div>
          <button
            onClick={copyHashtag}
            className="footer-hashtag"
            aria-label="Copy wedding hashtag"
            title="Click to copy hashtag"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{weddingConfig.hashtag}</span>
            {copied && <span style={{ fontSize: '0.75rem', color: '#10B981', marginLeft: '4px' }}>Copied!</span>}
          </button>
        </div>

        {/* WhatsApp Share button */}
        <div className="share-buttons">
          <button
            onClick={shareWhatsApp}
            className="btn-whatsapp"
            aria-label="Share Wedding Invitation on WhatsApp"
          >
            <Share2 size={18} /> Share Invitation on WhatsApp
          </button>
        </div>

        <p className="footer-credits">
          {weddingConfig.weddingDateFormatted} • {weddingConfig.venue.name}, {weddingConfig.venue.city}
        </p>

        <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
          With blessings from family and elders <Heart size={13} fill="#E11D48" color="#E11D48" />
        </p>
      </div>
    </footer>
  );
}
