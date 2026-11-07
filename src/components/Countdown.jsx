import React, { useState, useEffect } from 'react';
import { Calendar, Download, Check } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [calendarDownloaded, setCalendarDownloaded] = useState(false);

  useEffect(() => {
    const target = new Date(weddingConfig.weddingDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Wedding: ${weddingConfig.groom.fullName} & ${weddingConfig.bride.fullName}`);
    const details = encodeURIComponent(
      `Join us in celebrating the Keralam traditional wedding of ${weddingConfig.groom.fullName} & ${weddingConfig.bride.fullName}!\n\nMuhurtham: ${weddingConfig.muhurthamTime}\nVenue: ${weddingConfig.venue.name}, ${weddingConfig.venue.city}\nGoogle Maps: ${weddingConfig.venue.googleMapsUrl}`
    );
    const location = encodeURIComponent(`${weddingConfig.venue.name}, ${weddingConfig.venue.address}`);
    // Jan 3, 2027 11:00 AM to 15:30 PM IST (UTC 05:30Z to 10:00Z)
    const dates = `20270103T053000Z/20270103T100000Z`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Download .ics file
  const downloadIcsFile = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ManeshAndPooja//WeddingInvitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:manesh-pooja-wedding-2027@celebration',
      'SUMMARY:Wedding of ' + weddingConfig.groom.fullName + ' & ' + weddingConfig.bride.fullName,
      'DESCRIPTION:Muhurtham: ' + weddingConfig.muhurthamTime + ' at ' + weddingConfig.venue.name + ', ' + weddingConfig.venue.city,
      'LOCATION:' + weddingConfig.venue.name + ', ' + weddingConfig.venue.address,
      'DTSTART:20270103T053000Z',
      'DTEND:20270103T100000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'wedding-manesh-and-pooja.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCalendarDownloaded(true);
    setTimeout(() => setCalendarDownloaded(false), 3000);
  };

  return (
    <div className="countdown-wrapper" style={{ width: '100%', maxWidth: '440px' }}>
      <div className="countdown-container" role="timer" aria-label="Countdown to wedding date">
        <div className="countdown-box">
          <span className="countdown-num">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="countdown-label">Days</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-num">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="countdown-label">Mins</span>
        </div>
        <div className="countdown-box">
          <span className="countdown-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="countdown-label">Secs</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold-secondary"
          style={{ fontSize: '0.84rem', padding: '0.65rem 1.15rem', flex: '1 1 180px', textAlign: 'center' }}
        >
          <Calendar size={15} /> Add to Google Calendar
        </a>

        <button
          onClick={downloadIcsFile}
          className="btn-gold-secondary"
          style={{ fontSize: '0.84rem', padding: '0.65rem 1.15rem', flex: '1 1 160px', textAlign: 'center' }}
        >
          {calendarDownloaded ? <Check size={15} /> : <Download size={15} />}
          {calendarDownloaded ? 'Saved (.ics)' : 'Apple / iCal File'}
        </button>
      </div>
    </div>
  );
}
