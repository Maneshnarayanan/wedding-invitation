import React, { useState } from 'react';
import { Menu, X, MapPin } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Couple', href: '#couple' },
    { label: 'Ceremony', href: '#events' },
    { label: 'Venue', href: '#venue' },
    { label: 'Gallery', href: '#gallery' },
  ];

  return (
    <header className="navbar" role="banner">
      <a href="#" className="nav-brand" aria-label={`Wedding of ${weddingConfig.groom.fullName} & ${weddingConfig.bride.fullName}`}>
        <span className="brand-desktop">{weddingConfig.groom.fullName}</span>
        <span className="brand-mobile">{weddingConfig.groom.name}</span>
        <span className="nav-ampersand">&</span>
        <span className="brand-desktop">{weddingConfig.bride.fullName}</span>
        <span className="brand-mobile">{weddingConfig.bride.name}</span>
      </a>

      <nav aria-label="Main Navigation">
        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="nav-actions">
        <a
          href="#venue"
          className="btn-gold-primary nav-route-btn"
          style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem' }}
        >
          <MapPin size={14} /> Venue Route
        </a>

        <button
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
