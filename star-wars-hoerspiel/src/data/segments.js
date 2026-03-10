const BASE = import.meta.env.BASE_URL;

export const segments = [
  {
    id: "intro",
    title: "Chapter 0: Intro",
    subtitle: "Willkommen bei unserem Hörspiel",
    audioUrl: `${BASE}/Sounds/Intro.m4a`,
    imageUrl: `${BASE}Cover 1.png`,
    branches: [],
    autoplayNext: true,
    nextSegmentId: 'track-1',
  },
  {
    id: "track-1",
    title: "Das ist Trupp 705",
    subtitle: "Lerne Vex, Kor, Gear und den ganzen Trupp kennen",
    audioUrl: `${BASE}/Sounds/Akt 1/SW_Lane_1.m4a`,
    imageUrl: `${BASE}Valentin_Kberl_Star_Wars_Tiefflug-AngriffstransporterInfanter_310d6fbe-f1d3-4771-9ae7-16fa01592634_2.png`,
    branches: [
      { label: "Ich bin einsatzbereit!", targetSegmentId: "track-2a" },
      { label: "Alles in Ordnung.", targetSegmentId: "track-2b" },
      { label: "Wir machen das!", targetSegmentId: "track-2c" },
    ],
    autoplayNext: false,
    nextSegmentId: null,
  },
  {
    id: "track-2a",
    title: "Willkommen auf Vantorra IX!",
    subtitle: "Doch was ist passiert?",
    audioUrl: `${BASE}/Sounds/Akt 1/SW_Lane_2a.m4a`,
    imageUrl: `${BASE}Cover 2.png`,
    branches: [
      { label: "Mein Meister ist Anakin Skywalker", targetSegmentId: "track-3a" },
      { label: "Mein Meister ist Obi-Van Kenobi", targetSegmentId: "track-3b" },
    ],
    autoplayNext: false,
    nextSegmentId: null,
  },
  {
    id: "track-2b",
    title: "Willkommen auf Vantorra IX!",
    subtitle: "Doch was ist passiert?",
    audioUrl: `${BASE}/Sounds/Akt 1/SW_Lane_2b.m4a`,
    imageUrl: `${BASE}Cover 2.png`,
    branches: [
      { label: "Mein Meister ist Anakin Skywalker", targetSegmentId: "track-3a" },
      { label: "Mein Meister ist Obi-Van Kenobi", targetSegmentId: "track-3b" },
    ],
    autoplayNext: false,
    nextSegmentId: null,
  },
  {
    id: "track-2c",
    title: "Willkommen auf Vantorra IX!",
    subtitle: "Doch was ist passiert?",
    audioUrl: `${BASE}/Sounds/Akt 1/SW_Lane_2c.m4a`,
    imageUrl: `${BASE}Cover 2.png`,
    branches: [
      { label: "Mein Meister ist Anakin Skywalker", targetSegmentId: "track-3a" },
      { label: "Mein Meister ist Obi-Van Kenobi", targetSegmentId: "track-3b" },
    ],
    autoplayNext: false,
    nextSegmentId: null,
  },
  {
    id: "track-3a",
    title: "Die Hoffnung stirbt zuletzt",
    subtitle: "Dein Meister: Anakin Skywalker",
    audioUrl: `${BASE}/Sounds/Akt 1/SW_Lane_3a.m4a`,
    imageUrl: `${BASE}Cover3.png`,
    branches: [],
    autoplayNext: false,
    nextSegmentId: null,
  },
  {
    id: "track-3b",
    title: "Die Hoffnung stirbt zuletzt",
    subtitle: "Dein Meister: Obi-Wan Kenobi",
    audioUrl: `${BASE}/Sounds/Akt 1/SW_Lane_3b.m4a`,
    imageUrl: `${BASE}Cover3.png`,
    branches: [],
    autoplayNext: false,
    nextSegmentId: null,
  }
];

export const segmentMap = Object.fromEntries(segments.map((segment) => [segment.id, segment]));
export const initialSegmentId = segments[0].id;
