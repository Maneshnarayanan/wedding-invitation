import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import BackgroundSparkles from './components/BackgroundSparkles';
import Hero from './components/Hero';
import CoupleStory from './components/CoupleStory';
import EventsTimeline from './components/EventsTimeline';
import PhotoGallery from './components/PhotoGallery';
import Footer from './components/Footer';
import OpeningCeremony from './components/OpeningCeremony';
import MobileActionDock from './components/MobileActionDock';

// Scroll reveal for .reveal, .reveal-left, .reveal-right
function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => el.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useScrollReveal();

  return (
    <div className="wedding-app">
      <BackgroundSparkles />
      <OpeningCeremony />
      <Navbar />

      <main>
        <Hero />
        <EventsTimeline />
        <CoupleStory />
        <PhotoGallery />
      </main>

      <MobileActionDock />
      <Footer />
    </div>
  );
}
