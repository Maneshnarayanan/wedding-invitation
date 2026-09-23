import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Heart, Sparkles } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function RsvpForm({ onAddBlessing }) {
  const [formData, setFormData] = useState({
    name: '',
    phoneOrEmail: '',
    attendance: 'attending', // 'attending' or 'declined'
    guestCount: '1',
    dietPreference: 'Vegetarian Sadhya',
    ceremony: 'All Celebrations',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerConfetti = () => {
    // Elegant luxury gold & rose confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#D4AF37', '#F3E5AB', '#FFE066']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#FFFFFF', '#E11D48', '#F43F5E']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#D4AF37', '#9B771A', '#FFD700']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Save to localStorage
    try {
      const existingRsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      existingRsvps.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('wedding_rsvps', JSON.stringify(existingRsvps));

      // Also forward heartfelt message to blessings wall if entered
      if (formData.message.trim() && onAddBlessing) {
        onAddBlessing({
          author: formData.name,
          relation: 'Honored Guest',
          text: formData.message,
          date: 'Just now'
        });
      }
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }

    setIsSubmitted(true);
    triggerConfetti();
  };

  return (
    <section id="rsvp" style={{ padding: '5rem 0' }}>
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">Save Your Seat</span>
          <h2 className="section-title">RSVP</h2>
          <div className="section-divider">
            <span className="line" />
            <span className="symbol">❦</span>
            <span className="line" />
          </div>
          <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
            Your presence is the most cherished gift. Please let us know if you can join our celebration on January 3, 2027.
          </p>
        </div>

        <div className="rsvp-container">
          <div className="rsvp-card glass-card">
            
            {isSubmitted ? (
              <div className="rsvp-success-banner">
                <div className="success-icon">
                  <Heart size={34} fill="currentColor" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif-royal)', color: 'var(--color-gold-300)', fontSize: '1.8rem', marginBottom: '0.75rem' }}>
                  Thank You, {formData.name}!
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  {formData.attendance === 'attending'
                    ? `We are overjoyed that you will be joining us with ${formData.guestCount} guest(s)! We cannot wait to celebrate together.`
                    : `We are touched by your wishes and will miss your presence on our special day.`}
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-gold-secondary"
                    style={{ fontSize: '0.9rem' }}
                  >
                    Update My RSVP
                  </button>
                  <a href="#blessings" className="btn-gold-primary" style={{ fontSize: '0.9rem' }}>
                    View Blessings Wall
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                
                {/* Attendance Radio */}
                <div className="form-group">
                  <label className="form-label">Will you be attending?</label>
                  <div className="radio-group">
                    <label className={`radio-label ${formData.attendance === 'attending' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="attendance"
                        value="attending"
                        checked={formData.attendance === 'attending'}
                        onChange={handleChange}
                      />
                      <Sparkles size={16} /> Joyfully Accepts
                    </label>

                    <label className={`radio-label ${formData.attendance === 'declined' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="attendance"
                        value="declined"
                        checked={formData.attendance === 'declined'}
                        onChange={handleChange}
                      />
                      Regretfully Declines
                    </label>
                  </div>
                </div>

                {/* Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="rsvp-name">Full Name *</label>
                  <input
                    id="rsvp-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Menon"
                    className="form-input"
                  />
                </div>

                {/* Contact */}
                <div className="form-group">
                  <label className="form-label" htmlFor="rsvp-contact">Phone or Email</label>
                  <input
                    id="rsvp-contact"
                    name="phoneOrEmail"
                    type="text"
                    value={formData.phoneOrEmail}
                    onChange={handleChange}
                    placeholder="e.g. +91 98470 00000 or name@example.com"
                    className="form-input"
                  />
                </div>

                {formData.attendance === 'attending' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                      {/* Guest Count */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="rsvp-guests">Number of Guests</label>
                        <select
                          id="rsvp-guests"
                          name="guestCount"
                          value={formData.guestCount}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                          <option value="5+">5+ Family</option>
                        </select>
                      </div>

                      {/* Dietary Preference */}
                      <div className="form-group">
                        <label className="form-label" htmlFor="rsvp-diet">Feast Preference</label>
                        <select
                          id="rsvp-diet"
                          name="dietPreference"
                          value={formData.dietPreference}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="Traditional Vegetarian Sadhya">Vegetarian Sadhya</option>
                          <option value="Non-Vegetarian Reception Feast">Non-Veg (Reception)</option>
                          <option value="Jain Friendly">Jain Friendly</option>
                        </select>
                      </div>
                    </div>

                    {/* Attending Events */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="rsvp-ceremony">Ceremonies You Will Attend</label>
                      <select
                        id="rsvp-ceremony"
                        name="ceremony"
                        value={formData.ceremony}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="All Celebrations">All Celebrations (Sangeet, Muhurtham & Reception)</option>
                        <option value="Muhurtham & Sadhya">Muhurtham & Traditional Sadhya (Morning)</option>
                        <option value="Wedding Reception">Evening Wedding Reception</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Heartfelt Message */}
                <div className="form-group">
                  <label className="form-label" htmlFor="rsvp-message">Blessings or Note for the Couple</label>
                  <textarea
                    id="rsvp-message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write a warm message or blessing for Manesh & Ananya..."
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold-primary"
                  style={{ width: '100%', marginTop: '0.75rem', fontSize: '1.05rem', padding: '1rem' }}
                >
                  <Send size={18} /> Confirm RSVP
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
