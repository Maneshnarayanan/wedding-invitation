import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PetalsCanvas from './components/PetalsCanvas';
import Hero from './components/Hero';
import CoupleStory from './components/CoupleStory';
import EventsTimeline from './components/EventsTimeline';
import VenueMap from './components/VenueMap';
import PhotoGallery from './components/PhotoGallery';
import BlessingsWall from './components/BlessingsWall';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';
import OpeningCeremony from './components/OpeningCeremony';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'warm-silk' ? 'warm-silk' : 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'warm-silk' : 'dark'));
  };

  const handleOpeningComplete = () => {
    // Start auspicious music when invitation opens
    setIsMusicPlaying(true);
  };

  return (
    <div className="wedding-app">
      {/* Auspicious Opening Ceremony on Arrival */}
      <OpeningCeremony onOpen={handleOpeningComplete} />

      {/* Background Falling Petals & Shimmer */}
      <PetalsCanvas />

      {/* Floating Navigation Header */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <CoupleStory />
        <EventsTimeline />
        <VenueMap />
        <PhotoGallery />
        <BlessingsWall />
      </main>

      {/* Ambient Music Player */}
      <MusicPlayer isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
