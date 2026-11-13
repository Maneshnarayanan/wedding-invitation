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
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'warm-silk');
  }, []);

  return (
    <div className="wedding-app">
      <BackgroundSparkles />

      {/* Auspicious Opening Ceremony on Arrival */}
      <OpeningCeremony />

      {/* Floating Navigation Header */}
      <Navbar />

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
