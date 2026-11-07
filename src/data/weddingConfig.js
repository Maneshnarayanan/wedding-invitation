// Real Couple Photos
import groomPhoto from '../assets/images_web/groom_profile.jpg';
import bridePhoto from '../assets/images_web/bride_profile.jpg';
import ringPhoto from '../assets/images_web/ring_focused.jpg';
import togetherSidePhoto from '../assets/images_web/together_side_by_side.jpg';
import togetherWalkPhoto from '../assets/images_web/together_walk.jpg';
import closeRomancePhoto from '../assets/images_web/close_romance_bouquet.jpg';
import bouquetGivenPhoto from '../assets/images_web/bouquet_given.jpg';
import brideFocusPhoto from '../assets/images_web/bride_focus_portrait.jpg';

// Keralam Traditional Wedding Configuration
export const weddingConfig = {
  groom: {
    name: "Manesh",
    fullName: "Manesh K",
    parents: "Narayanan T & Omana Narayanan",
    house: "Vadakekara House, Thokkanam",
    nephewOf: "CH Manikandan Pakkam",
    role: "The Groom",
    bio: "Blessed by the love of family and elders, eagerly looking forward to starting an auspicious new chapter with Pooja.",
    photo: groomPhoto
  },
  bride: {
    name: "Pooja",
    fullName: "Pooja S",
    parents: "(Late) Sheena Poojary & Pushpalatha",
    house: "Thalipadpu, Kasaragod",
    nephewOf: "Late Babu Poojary, Karandakkad",
    role: "The Bride",
    bio: "Carrying cherished blessings from her loving family and ancestors, stepping into a lifetime of togetherness with Manesh.",
    photo: bridePhoto
  },
  weddingDate: "2027-01-03T11:00:00",
  weddingDateFormatted: "Sunday, January 3, 2027",
  muhurthamTime: "11:00 AM - 11:46 AM",
  malayalamDate: "1192 ധനു 19, ഞായറാഴ്ച (Sunday, Dhanu 19)",
  
  hashtag: "#ManeshWedsPooja",
  
  invitationNote: "We, along with our families, warmly invite you with immense happiness to the auspicious Keralam traditional wedding ceremony of Manesh K and Pooja S. Your presence, prayers, and blessings will grace this special occasion.",
  
  sacredSloka: {
    sanskrit: "माङ्गल्यं तन्तुनानेन मम जीवनहेतुना। कण्ठे बध्नामि सुभगे त्वं जीव शरदः शतम्॥",
    malayalam: "മാംഗല്യം തന്തുനാനേന മമ ജീവനഹേതുനാ | കണ്ഠേ ബധ്നാമി സുഭഗേ ത്വം ജീവ ശരദഃ ശതം ||",
    meaning: "\"This auspicious thread (Thali), the foundation of my life, I tie around your neck, O blessed one. May you live happily with me for a hundred autumns.\""
  },
  
  keralaBlessing: "ഈ ശുഭമുഹൂർത്തത്തിൽ ഞങ്ങളെ അനുഗ്രഹിക്കുവാൻ താങ്കളുടെയും കുടുംബത്തിന്റെയും മംഗളസാന്നിധ്യം സ്നേഹപൂർവ്വം അഭ്യർത്ഥിക്കുന്നു.",
  
  loveQuote: "United by sacred vows, blessed by elders, bound together for eternity.",

  events: [
    {
      id: "wedding",
      title: "The Auspicious Wedding Ceremony (വിവാഹം & താലികെട്ട്)",
      subtitle: "The Sacred Vows, Thali Kettu & Varmala Ceremony",
      date: "Sunday, January 3, 2027",
      time: "11:00 AM - 11:46 AM (Auspicious Lagna)",
      venue: "Raj Palace, Poinachi, Kasaragod",
      dressCode: "Traditional Keralam Kasavu Mundu & Saree",
      icon: "HeartHandshake",
      color: "gold"
    }
  ],

  venue: {
    name: "Raj Palace",
    hall: "Raj Palace Auditorium",
    city: "Poinachi, Kasaragod, Keralam",
    address: "National Highway 66, Poinachi, Kasaragod, Keralam 671541",
    landmark: "Poinachi Junction, near NH 66",
    mapQuery: "Raj Palace Auditorium Poinachi Kasaragod Keralam",
    googleMapsUrl: "https://maps.google.com/?q=Raj+Palace+Auditorium+Poinachi+Kasaragod",
    phone: "+91 94470 00000 / +91 98460 00000",
    notes: "Spacious vehicle parking available inside the auditorium premises."
  },

  ourStory: [
    {
      year: "The Beginning",
      title: "Two Families, Two Hearts",
      description: "Brought together with the warmth, prayers, and unconditional blessings of our loving parents and elders.",
      tag: "Family Blessing"
    },
    {
      year: "The First Talk",
      title: "Understanding & Warmth",
      description: "A conversation that flowed effortlessly, revealing shared family values, mutual respect, and pure companionship.",
      tag: "Connection"
    },
    {
      year: "Family Acceptance",
      title: "Blessings & Accord",
      description: "With heartfelt joy and mutual respect, both families joyfully accepted and confirmed this sacred alliance, stepping forward directly to the wedding day.",
      tag: "Elders' Consent"
    },
    {
      year: "January 3, 2027",
      title: "The Sacred Muhurtham",
      description: "Between 11:00 AM and 11:46 AM at Raj Palace, Poinachi, taking the divine vows of matrimony.",
      tag: "The Big Day"
    }
  ],

  gallery: [
    {
      url: togetherSidePhoto,
      title: "Two Souls, One Heart",
      caption: "United in love, blessed by family and elders."
    },
    {
      url: togetherWalkPhoto,
      title: "Hand in Hand",
      caption: "Walking into our beautiful forever together."
    },
    {
      url: closeRomancePhoto,
      title: "Cherished Moments",
      caption: "Every glance filled with the promise of a lifetime."
    },
    {
      url: ringPhoto,
      title: "The Sacred Rings",
      caption: "A timeless circle of eternal love and devotion."
    },
    {
      url: bouquetGivenPhoto,
      title: "A Token of Love",
      caption: "Every blossom celebrating our joy and togetherness."
    },
    {
      url: brideFocusPhoto,
      title: "Grace & Elegance",
      caption: "Two lives, two hearts, joined in sacred harmony."
    }
  ],

  contactPersons: [
    { name: "Sri. Narayanan T (Groom's Father)", phone: "+91 94470 00000" },
    { name: "Family Coordinator (Poinachi)", phone: "+91 98460 00000" }
  ]
};
