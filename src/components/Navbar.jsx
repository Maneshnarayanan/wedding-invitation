import React, { useState } from 'react';
import { Moon, Sun, Menu, X, MapPin } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function Navbar({ theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Couple', href: '#couple' },
    { label: 'Ceremony', href: '#events' },
    { label: 'Venue', href: '#venue' },
    { label: 'Gallery', href: '#gallery' },
  ];

  return (
    <header className="navbar" role="banner">
      <a href="#" className="nav-brand" aria-label="Wedding of Manesh & Pooja">
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
              <a
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="nav-actions">
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to Kasavu Silk theme' : 'Switch to Royal Temple theme'}
          title={theme === 'dark' ? 'Switch to Kasavu Silk' : 'Switch to Royal Temple'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <a href="#venue" className="btn-gold-primary nav-route-btn" style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}>
          <MapPin size={15} /> Venue Route
        </a>

        <button
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
