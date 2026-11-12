import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BackgroundSparkles from './components/BackgroundSparkles';
import Hero from './components/Hero';
import CoupleStory from './components/CoupleStory';
import EventsTimeline from './components/EventsTimeline';
import PhotoGallery from './components/PhotoGallery';
import Footer from './components/Footer';
import OpeningCeremony from './components/OpeningCeremony';
import MobileActionDock from './components/MobileActionDock';

export default function App() {
  const [theme, setTheme] = useState('warm-silk');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'warm-silk' ? 'warm-silk' : 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'warm-silk' : 'dark'));
  };

  return (
    <div className="wedding-app">
      <BackgroundSparkles />

      {/* Auspicious Opening Ceremony on Arrival */}
      <OpeningCeremony />

      {/* Floating Navigation Header */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <EventsTimeline />
        <CoupleStory />
        <PhotoGallery />
      </main>

      {/* Mobile quick actions and desktop flower blessings */}
      <MobileActionDock />

      {/* Footer */}
      <Footer />
    </div>
  );
}
