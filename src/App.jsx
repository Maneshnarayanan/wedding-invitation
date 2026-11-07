import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PetalsCanvas from './components/PetalsCanvas';
import Hero from './components/Hero';
import CoupleStory from './components/CoupleStory';
import EventsTimeline from './components/EventsTimeline';
import VenueMap from './components/VenueMap';
import PhotoGallery from './components/PhotoGallery';
import Footer from './components/Footer';
import OpeningCeremony from './components/OpeningCeremony';
import MobileActionDock from './components/MobileActionDock';
import useScrollReveal from './hooks/useScrollReveal';

export default function App() {
  const [theme, setTheme] = useState('dark');

  // Trigger smooth scroll-in animations as user scrolls down
  useScrollReveal();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'warm-silk' ? 'warm-silk' : 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'warm-silk' : 'dark'));
  };

  return (
    <div className="wedding-app">
      {/* Auspicious Opening Ceremony on Arrival */}
      <OpeningCeremony />

      {/* Background Falling Petals & Shimmer */}
      <PetalsCanvas />

      {/* Floating Navigation Header */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <CoupleStory />
        <EventsTimeline />
        <VenueMap />
        <PhotoGallery />
      </main>

      {/* Floating Action Dock & Flower Blessings */}
      <MobileActionDock />

      {/* Footer */}
      <Footer />
    </div>
  );
}
