import React, { useState } from 'react';
import { Heart, MessageSquarePlus, Sparkles } from 'lucide-react';

const initialBlessings = [
  {
    author: "Uncle & Aunt Gopalakrishnan",
    relation: "Family Elder",
    text: "May your married life be blessed with endless laughter, harmony, good health, and mutual understanding. All our blessings are always with you both!",
    date: "A few days ago"
  },
  {
    author: "Vishnu & Divya",
    relation: "College Friends",
    text: "So thrilled to see you two tie the knot! You complement each other in every possible way. Waiting to dance all night at the Sangeet!",
    date: "1 week ago"
  },
  {
    author: "Sujatha Teacher",
    relation: "Well-wisher",
    text: "Dear Manesh & Ananya, wishing you a hundred years of togetherness filled with prosperity and love. Subham Bhavathu!",
    date: "2 weeks ago"
  }
];

export default function BlessingsWall({ externalBlessings = [] }) {
  const [blessings, setBlessings] = useState(initialBlessings);
  const [showModal, setShowModal] = useState(false);
  const [newBlessing, setNewBlessing] = useState({ author: '', relation: '', text: '' });

  const allBlessings = [...externalBlessings, ...blessings];

  const handleAddBlessing = (e) => {
    e.preventDefault();
    if (!newBlessing.author.trim() || !newBlessing.text.trim()) return;

    setBlessings([
      {
        author: newBlessing.author,
        relation: newBlessing.relation || 'Dear Well-Wisher',
        text: newBlessing.text,
        date: 'Just now'
      },
      ...blessings
    ]);

    setNewBlessing({ author: '', relation: '', text: '' });
    setShowModal(false);
  };

  return (
    <section id="blessings" className="blessings-section">
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">Words of Love</span>
          <h2 className="section-title">Blessings Wall</h2>
          <div className="section-divider">
            <span className="line" />
            <span className="symbol">❦</span>
            <span className="line" />
          </div>
          <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
            Warm wishes and blessings from our beloved family, mentors, and closest friends.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <button
            onClick={() => setShowModal(true)}
            className="btn-gold-secondary"
            style={{ fontSize: '0.92rem' }}
          >
            <MessageSquarePlus size={18} /> Leave a Blessing for the Couple
          </button>
        </div>

        {/* Modal for adding blessing */}
        {showModal && (
          <div className="lightbox-modal" onClick={() => setShowModal(false)}>
            <div
              className="glass-card"
              style={{ maxWidth: '520px', width: '100%', padding: '2.5rem 2rem' }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ fontFamily: 'var(--font-serif-royal)', color: 'var(--color-gold-300)', marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.5rem' }}>
                Bless Manesh & Ananya
              </h3>

              <form onSubmit={handleAddBlessing}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={newBlessing.author}
                    onChange={(e) => setNewBlessing({ ...newBlessing, author: e.target.value })}
                    placeholder="e.g. Priya & Arun"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Relation / Group</label>
                  <input
                    type="text"
                    value={newBlessing.relation}
                    onChange={(e) => setNewBlessing({ ...newBlessing, relation: e.target.value })}
                    placeholder="e.g. Cousin, School Friend, Colleague"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Blessing or Wishes *</label>
                  <textarea
                    required
                    rows={4}
                    value={newBlessing.text}
                    onChange={(e) => setNewBlessing({ ...newBlessing, text: e.target.value })}
                    placeholder="Wishing you both a lifetime of happiness, health and adventure..."
                    className="form-textarea"
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn-gold-secondary"
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-gold-primary" style={{ flex: 1 }}>
                    Post Blessing
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="blessings-grid">
          {allBlessings.map((b, idx) => (
            <div key={idx} className="blessing-card glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 className="blessing-author">{b.author}</h4>
                  <p className="blessing-relation">{b.relation} • {b.date}</p>
                </div>
                <Heart size={18} fill="var(--color-gold-400)" color="var(--color-gold-400)" style={{ opacity: 0.8 }} />
              </div>
              <p className="blessing-text">"{b.text}"</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
