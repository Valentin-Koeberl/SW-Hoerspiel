const BASE = import.meta.env.BASE_URL;

function scene(config) {
  return {
    sceneImage: null,
    imageUrl: null,
    imageTimeline: [],
    ...config,
  };
}

const chapterDefinitions = [
  {
    id: "intro",
    title: "Intro",
    subtitle: "Der Einsatz beginnt",
    tagline: "Kapitel 1",
    description: "Das Intro setzt die Ausgangslage für Trupp 705 und führt in den Einsatz ein.",
    coverImage: `${BASE}audiobooks/Intro/Pictures/Cover 1.png`,
    status: "Verfügbar",
    segments: [
      scene({
        id: "intro-1",
        step: 1,
        title: "Intro",
        subtitle: "Willkommen bei Trupp 705",
        audioUrl: `${BASE}audiobooks/Intro/Sounds/Intro.m4a`,
        sceneImage: `${BASE}audiobooks/Intro/Pictures/Cover 1.png`,
        imageTimeline: [
          { at: 0, image: `${BASE}audiobooks/Intro/Pictures/Cover 1.png` },
        ],
        branches: [],
        autoplayNext: false,
        nextSegmentId: null,
      }),
    ],
  },
  {
    id: "akt1",
    title: "Akt 1",
    subtitle: "Vergessen auf Vantorra IX",
    tagline: "Kapitel 2",
    description:
      "Du hörst eine Szene, beantwortest am Ende eine Frage und bestimmst damit, welche nächste Audio-Lane abgespielt wird.",
    coverImage: `${BASE}audiobooks/Akt1/Pictures/Cover 2.png`,
    status: "Verfügbar",
    segments: [
      scene({
        id: "akt1-lane-1",
        step: 1,
        title: "Das ist Trupp 705",
        subtitle: "Lerne Vex, Kor, Gear und den ganzen Trupp kennen",
        audioUrl: `${BASE}audiobooks/Akt1/Sounds/SW_Lane_1.m4a`,
        sceneImage: `${BASE}audiobooks/Akt1/Pictures/Cover 2.png`,
        imageTimeline: [
          { at: 0, image: `${BASE}audiobooks/Akt1/Pictures/Cover 2.png` },
          { at: 12, image: `${BASE}audiobooks/Akt1/Pictures/Cover 2a.png` },
        ],
        branches: [
          { label: "Ich bin einsatzbereit!", targetSegmentId: "akt1-lane-2a" },
          { label: "Alles in Ordnung.", targetSegmentId: "akt1-lane-2b" },
          { label: "Wir machen das!", targetSegmentId: "akt1-lane-2c" },
        ],
        autoplayNext: false,
        nextSegmentId: null,
      }),
      scene({
        id: "akt1-lane-2a",
        step: 2,
        title: "Willkommen auf Vantorra IX!",
        subtitle: "Doch was ist passiert?",
        audioUrl: `${BASE}audiobooks/Akt1/Sounds/SW_Lane_2a.m4a`,
        sceneImage: `${BASE}audiobooks/Akt1/Pictures/Cover 2a.png`,
        branches: [
          { label: "Mein Meister ist Anakin Skywalker", targetSegmentId: "akt1-lane-3a" },
          { label: "Mein Meister ist Obi-Wan Kenobi", targetSegmentId: "akt1-lane-3b" },
        ],
        autoplayNext: false,
        nextSegmentId: null,
      }),
      scene({
        id: "akt1-lane-2b",
        step: 2,
        title: "Willkommen auf Vantorra IX!",
        subtitle: "Doch was ist passiert?",
        audioUrl: `${BASE}audiobooks/Akt1/Sounds/SW_Lane_2b.m4a`,
        sceneImage: `${BASE}audiobooks/Akt1/Pictures/Cover 2a.png`,
        branches: [
          { label: "Mein Meister ist Anakin Skywalker", targetSegmentId: "akt1-lane-3a" },
          { label: "Mein Meister ist Obi-Wan Kenobi", targetSegmentId: "akt1-lane-3b" },
        ],
        autoplayNext: false,
        nextSegmentId: null,
      }),
      scene({
        id: "akt1-lane-2c",
        step: 2,
        title: "Willkommen auf Vantorra IX!",
        subtitle: "Doch was ist passiert?",
        audioUrl: `${BASE}audiobooks/Akt1/Sounds/SW_Lane_2c.m4a`,
        sceneImage: `${BASE}audiobooks/Akt1/Pictures/Cover 2a.png`,
        branches: [
          { label: "Mein Meister ist Anakin Skywalker", targetSegmentId: "akt1-lane-3a" },
          { label: "Mein Meister ist Obi-Wan Kenobi", targetSegmentId: "akt1-lane-3b" },
        ],
        autoplayNext: false,
        nextSegmentId: null,
      }),
      scene({
        id: "akt1-lane-3a",
        step: 3,
        title: "Die Hoffnung stirbt zuletzt",
        subtitle: "Dein Meister: Anakin Skywalker",
        audioUrl: `${BASE}audiobooks/Akt1/Sounds/SW_Lane_3a.m4a`,
        sceneImage: `${BASE}audiobooks/Akt2/Pictures/Cover3.png`,
        branches: [],
        autoplayNext: false,
        nextSegmentId: null,
      }),
      scene({
        id: "akt1-lane-3b",
        step: 3,
        title: "Die Hoffnung stirbt zuletzt",
        subtitle: "Dein Meister: Obi-Wan Kenobi",
        audioUrl: `${BASE}audiobooks/Akt1/Sounds/SW_Lane_3b.m4a`,
        sceneImage: `${BASE}audiobooks/Akt2/Pictures/Cover3.png`,
        branches: [],
        autoplayNext: false,
        nextSegmentId: null,
      }),
    ],
  },
  {
    id: "akt2",
    title: "Akt 2",
    subtitle: "Fortsetzung in Vorbereitung",
    tagline: "Kapitel 3",
    description: "Die Ordnerstruktur für Akt 2 ist vorbereitet. Sobald Sounds vorhanden sind, kann das Kapitel direkt freigeschaltet werden.",
    coverImage: `${BASE}audiobooks/Akt2/Pictures/Cover3.png`,
    status: "Bald verfügbar",
    segments: [],
  },
  {
    id: "akt3",
    title: "Akt 3",
    subtitle: "Finale in Vorbereitung",
    tagline: "Kapitel 4",
    description: "Auch Akt 3 ist als eigenes Kapitel vorgesehen und kann später mit weiteren Audio-Lanes gefüllt werden.",
    coverImage: `${BASE}audiobooks/Akt3/Pictutes/Klonarmee.webp`,
    status: "Bald verfügbar",
    segments: [],
  },
  {
    id: "akt4",
    title: "Akt 4",
    subtitle: "Erik kann nicht mehr",
    tagline: "Kapitel 4",
    description: "Auch Akt 3 ist als eigenes Kapitel vorgesehen und kann später mit weiteren Audio-Lanes gefüllt werden.",
    coverImage: `${BASE}audiobooks/Akt3/Pictutes/Klonarmee.webp`,
    status: "Bald verfügbar",
    segments: [],
  },
];

export const project = {
  id: "trupp-705",
  title: "Trupp 705",
  subtitle: "Interaktives Star-Wars-Hörspiel",
  description:
    "Ein Projekt mit mehreren Kapiteln. In jedem Kapitel führen Entscheidungen am Ende einer Audio-Lane zum nächsten Sound.",
  chapters: chapterDefinitions,
};

export const chapters = chapterDefinitions.map((chapter) => ({
  ...chapter,
  segments: chapter.segments.map((segment) => ({
    ...segment,
    imageUrl: segment.sceneImage ?? segment.imageUrl ?? chapter.coverImage,
    imageTimeline: (segment.imageTimeline ?? [])
      .map((entry) => ({
        at: Number.isFinite(entry.at) ? entry.at : 0,
        image: entry.image ?? segment.sceneImage ?? segment.imageUrl ?? chapter.coverImage,
      }))
      .sort((a, b) => a.at - b.at),
  })),
  segmentMap: Object.fromEntries(
    chapter.segments.map((segment) => [
      segment.id,
      {
        ...segment,
        imageUrl: segment.sceneImage ?? segment.imageUrl ?? chapter.coverImage,
        imageTimeline: (segment.imageTimeline ?? [])
          .map((entry) => ({
            at: Number.isFinite(entry.at) ? entry.at : 0,
            image: entry.image ?? segment.sceneImage ?? segment.imageUrl ?? chapter.coverImage,
          }))
          .sort((a, b) => a.at - b.at),
      },
    ]),
  ),
  initialSegmentId: chapter.segments[0]?.id ?? null,
  progressSteps: chapter.segments.reduce((total, segment) => total + (segment.branches?.length ? 1 : 0), 0) || 1,
  timelineSteps: [...new Set(chapter.segments.map((segment) => segment.step ?? 1))],
  isPlayable: chapter.segments.length > 0,
}));

export const chapterMap = Object.fromEntries(chapters.map((chapter) => [chapter.id, chapter]));
export const defaultChapterId = chapters.find((chapter) => chapter.isPlayable)?.id ?? chapters[0]?.id ?? null;
