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
    coverImage: `${BASE}audiobooks/Intro/Pictures/Cover Art Intro.png`,
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
    coverImage: `${BASE}audiobooks/Akt1/Pictures/Cover Art Akt 1.png`,
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
    subtitle: "Der Weg zur Wahrheit",
    tagline: "Kapitel 3",
    description: "Du hörst eine Szene, beantwortest am Ende eine Frage und bestimmst damit, welche nächste Audio-Lane abgespielt wird.",
    coverImage: `${BASE}audiobooks/Akt2/Pictures/Cover Art Akt 2.png`,
    status: "Verfügbar",
    segments: [
      scene({
        id: "akt2-lane-1",
        step: 1,
        title: "Marsch durch die Wüste",
        subtitle: "Der Trupp macht sich auf den Weg.",
        audioUrl: `${BASE}audiobooks/Akt2/Sounds/AktBisErsteEntscheidung.mp3`,
        sceneImage: `${BASE}audiobooks/Akt2/Pictures/Akt2-Marsch.png`,
        branches: [
          { label: "Es ist nun mal eine Klonarmee", targetSegmentId: "akt2-lane-2a" },
          { label: "Für mich seid ihr wie Familie", targetSegmentId: "akt2-lane-2b" },
        ],
        autoplayNext: false,
        nextSegmentId: null,
      }),
      scene({
        id: "akt2-lane-2a",
        step: 2,
        title: "Marsch durch die Wüste",
        subtitle: "Wie sieht Kor seine Truppe?",
        audioUrl: `${BASE}audiobooks/Akt2/Sounds/ersteEntscheidung_A.mp3`,
        sceneImage: `${BASE}audiobooks/Akt2/Pictures/Akt2-Marsch.png`,
        branches: [],
        autoplayNext: true,
        nextSegmentId: `akt2-lane-2a-Antwort`,
      }),
      scene({
        id: "akt2-lane-2a-Antwort",
        step: 3,
        title: "Marsch durch die Wüste",
        subtitle: "Wie sieht Kor seine Truppe?",
        audioUrl: `${BASE}audiobooks/Akt2/Sounds/ersteEntscheidung_A-Antwort.mp3`,
        sceneImage: `${BASE}audiobooks/Akt2/Pictures/Akt2-Marsch.png`,
        branches: [],
        autoplayNext: true,
        nextSegmentId: `akt2-lane-3`,
      }),
      scene({
        id: "akt2-lane-2b",
        step: 2,
        title: "Marsch durch die Wüste",
        subtitle: "Wie sieht Kor seine Truppe?",
        audioUrl: `${BASE}audiobooks/Akt2/Sounds/ersteEntscheidung_B.mp3`,
        sceneImage: `${BASE}audiobooks/Akt2/Pictures/Akt2-Marsch.png`,
        branches: [],
        autoplayNext: true,
        nextSegmentId: "akt2-lane-2b-Antwort",
      }),
      scene({
        id: "akt2-lane-2b-Antwort",
        step: 3,
        title: "Marsch durch die Wüste",
        subtitle: "Wie sieht Kor seine Truppe?",
        audioUrl: `${BASE}audiobooks/Akt2/Sounds/ersteEntscheidung_B-Antwort.mp3`,
        sceneImage: `${BASE}audiobooks/Akt2/Pictures/Akt2-Marsch.png`,
        branches: [],
        autoplayNext: true,
        nextSegmentId: `akt2-lane-3`,
      }),
      scene({
        id: "akt2-lane-3",
        step: 4,
        title: "Die Begegnung",
        subtitle: "Jetzt braucht es einen tollen Führer, wie Kor.",
        audioUrl: `${BASE}audiobooks/Akt2/Sounds/NachErsterEntscheidungBisEndeAkt2.mp3`,
        sceneImage: `${BASE}audiobooks/Akt2/Pictures/Akt2-Marsch.png`,
        imageTimeline: [
          { at: 0, image: `${BASE}audiobooks/Akt2/Pictures/Akt2-Marsch.png` },
          { at: 42, image: `${BASE}audiobooks/Akt2/Pictures/Akt2-Feuer.png` },
          { at: 128, image: `${BASE}audiobooks/Akt2/Pictures/Akt2-Dorf.png` },
          { at: 175, image: `${BASE}audiobooks/Akt2/Pictures/Akt2-Vorrak.png` },
          { at: 409, image: `${BASE}audiobooks/Akt2/Pictures/Akt2-KaelVaris.png` },
        ],
        branches: [],
        autoplayNext: false,
        nextSegmentId: null,
      }),
    ],
  },
  {
    id: "akt3",
    title: "Akt 3",
    subtitle: "Das Gleichgewicht schwankt.",
    tagline: "Kapitel 4",
    description: "Du hörst eine Szene, beantwortest am Ende eine Frage und bestimmst damit, welche nächste Audio-Lane abgespielt wird.",
    coverImage: `${BASE}audiobooks/Akt3/Pictures/Cover Art Akt 3.png`,
    status: "Verfügbar",
    segments: [
      scene({
        id: "akt3-lane-1",
        step: 1,
        title: "Es ist soweit!",
        subtitle: "Eine Entscheidung muss getroffen werden.",
        audioUrl: `${BASE}audiobooks/Akt3/Sounds/Akt 3 Track 1.mp4`,
        sceneImage: `${BASE}audiobooks/Akt3/Pictures/Akt3_1.png`,
        branches: [
          { label: "Stopp! Niemand schießt!", targetSegmentId: "akt3-lane-2a" },
          { label: "Nicht einschreiten.", targetSegmentId: "akt3-lane-2b" },
        ],
        autoplayNext: false,
        nextSegmentId: null,
      }),

      scene({
        id: "akt3-lane-2a",
        step: 2,
        title: "Es ist soweit!",
        subtitle: "Eine Entscheidung muss getroffen werden.",
        audioUrl: `${BASE}audiobooks/Akt3/Sounds/Akt 3 Track 2a.mp4`,
        sceneImage: `${BASE}audiobooks/Akt3/Pictures/Akt3_2.png`,
        branches: [
          { label: "Wir nehmen uns den Jedi vor", targetSegmentId: "akt3-lane-2a-1" },
          { label: "Wir können nicht gegen einen anderen Jedi kämpfen.", targetSegmentId: "akt3-lane-2a-2" },
        ],
        autoplayNext: false,
        nextSegmentId: null,
      }),

      scene({
        id: "akt3-lane-2a-1",
        step: 3,
        title: "Die Linie",
        subtitle: "Kor stellt sich auf die die Seite des Dorfältesten.",
        audioUrl: `${BASE}audiobooks/Akt3/Sounds/Akt 3 Track 2a 1.mp4`,
        sceneImage: `${BASE}audiobooks/Akt3/Pictures/Akt3_2.png`,
        branches: [],
        autoplayNext: false,
        nextSegmentId: null,
        nextStoryline: `1`,

      }),

      scene({
        id: "akt3-lane-2a-2",
        step: 3,
        title: "Der Moment des Zögerns",
        subtitle: "Wer ist jetzt der Feind?",
        audioUrl: `${BASE}audiobooks/Akt3/Sounds/Akt 3 Track 2a 2.mp4`,
        sceneImage: `${BASE}audiobooks/Akt3/Pictures/Akt3_4.png`,
        branches: [],
        autoplayNext: false,
        nextSegmentId: null,
        nextStoryline: `2`,
      }),

      scene({
        id: "akt3-lane-2b",
        step: 2,
        title: "Es ist soweit!",
        subtitle: "Eine Entscheidung muss getroffen werden.",
        audioUrl: `${BASE}audiobooks/Akt3/Sounds/Akt 3 Track 2b.mp4`,
        sceneImage: `${BASE}audiobooks/Akt3/Pictures/Akt3_2.png`,
        branches: [
          { label: "Dorfältesten beitreten", targetSegmentId: "akt3-lane-2b-1" },
          { label: "Jeditrupp helfen", targetSegmentId: "akt3-lane-2b-2" },
        ],
        autoplayNext: false,
        nextSegmentId: null,
      }),

      scene({
        id: "akt3-lane-2b-1",
        step: 3,
        title: "Der Schatten des Ordens",
        subtitle: "Kor folgt Vorrakt und stellt die Republik infrage.",
        audioUrl: `${BASE}audiobooks/Akt3/Sounds/Akt 3 Track 2b 1.mp4`,
        sceneImage: `${BASE}audiobooks/Akt3/Pictures/Akt3_2.png`,
        branches: [],
        autoplayNext: false,
        nextSegmentId: null,
        nextStoryline: `1`,
      }),

      scene({
        id: "akt3-lane-2b-2",
        step: 3,
        title: "Treue zum Orden",
        subtitle: "Kor entscheidet sich dem Jedi Orden loyal zu bleiben.",
        audioUrl: `${BASE}audiobooks/Akt3/Sounds/Akt 3 Track 2b 2.mp4`,
        sceneImage: `${BASE}audiobooks/Akt3/Pictures/Akt3_4.png`,
        branches: [],
        autoplayNext: false,
        nextSegmentId: null,
        nextStoryline: `2`,
      }),
    ],
  },
  {
    id: "akt4",
    title: "Akt 4",
    subtitle: "Erik kann nicht mehr",
    tagline: "Kapitel 4",
    description: "Du hörst eine Szene, beantwortest am Ende eine Frage und bestimmst damit, welche nächste Audio-Lane abgespielt wird.",
    coverImage: `${BASE}audiobooks/Akt4/Pictures/Cover Art Akt 4.png`,
    status: "Verfügbar",
    startSegmentByStoryline: {
      "1": "akt4-lane-1",
      "2": "akt4-lane-2",
    },
    segments: [
      scene({
        id: "akt4-lane-1",
        step: 1,
        title: "Die Offenbarung",
        subtitle: "Jetzt geht es um Alles!",
        audioUrl: `${BASE}audiobooks/Akt4/Sounds/Akt4_Storyline1-BisEntscheidung.mp3`,
        sceneImage: `${BASE}audiobooks/Akt4/Pictures/Akt4-GearStoryline.png`,
        imageTimeline: [
          { at: 0, image: `${BASE}audiobooks/Akt4/Pictures/Akt4-GearStoryline.png` },
          { at: 41, image: `${BASE}audiobooks/Akt4/Pictures/Akt4-SchiffInnenraum.png` },
          { at: 70, image: `${BASE}audiobooks/Akt4/Pictures/Akt4-PalpatineReveal.png` },
          { at: 155, image: `${BASE}audiobooks/Akt4/Pictures/Akt4-PalpatineRevealCloseUp.png` },
          { at: 253, image: `${BASE}audiobooks/Akt4/Pictures/Akt4-SplitScreenFullQuerformat.png` },
        ],
        branches: [
          { label: "Angebot annehmen", targetSegmentId: "akt4-ending-accept" },
          { label: "Angebot ablehnen", targetSegmentId: "akt4-ending-decline" },
        ],
        autoplayNext: false,
        nextSegmentId: null,
      }),

      scene({
        id: "akt4-lane-2",
        step: 1,
        title: "Die Offenbarung",
        subtitle: "Jetzt geht es um Alles!",
        audioUrl: `${BASE}audiobooks/Akt4/Sounds/Akt4_Storyline2-BisEntscheidung.mp3`,
        sceneImage: `${BASE}audiobooks/Akt4/Pictures/Akt4-GearStoryline.png`,
        imageTimeline: [
          { at: 0, image: `${BASE}audiobooks/Akt4/Pictures/Akt4-GearStoryline.png` },
          { at: 20, image: `${BASE}audiobooks/Akt4/Pictures/Akt4-GearStoryline2_version2.png` },
          { at: 67, image: `${BASE}audiobooks/Akt4/Pictures/Akt4-SchiffInnenraum.png` },
          { at: 90, image: `${BASE}audiobooks/Akt4/Pictures/Akt4-PalpatineReveal.png` },
          { at: 106, image: `${BASE}audiobooks/Akt4/Pictures/Akt4-PalpatineRevealCloseUp.png` },
          { at: 250, image: `${BASE}audiobooks/Akt4/Pictures/Akt4-SplitScreenFullQuerformat.png` },
        ],
        branches: [
          { label: "Angebot annehmen", targetSegmentId: "akt4-ending-accept" },
          { label: "Angebot ablehnen", targetSegmentId: "akt4-ending-decline" },
        ],
        autoplayNext: false,
        nextSegmentId: null,
      }),

      scene({
        id: "akt4-ending-accept",
        step: 2,
        title: "Finale Entscheidung",
        subtitle: "Du nimmst das Angebot an.",
        audioUrl: null,
        sceneImage: `${BASE}audiobooks/Akt4/Pictures/Akt4_Ende1.png`,
        branches: [],
        autoplayNext: false,
        nextSegmentId: null,
        isTextEnding: true,
        endingTitle: "Du nimmst das Angebot an",
        endingText:
          "Ein kaltes Lächeln huschte über das Gesicht von Palpatine. „Eine weise… aber naive Entscheidung.“ Noch bevor Kor reagieren konnte, traf ihn die Macht mit vernichtender Wucht. Seine Kameraden wurden zu Boden geschleudert, seine eigene Stärke zerbrach unter der erdrückenden Dunkelheit. Erst da verstand er: Das war nie ein Angebot gewesen – es war eine Falle. Denn nach der Regel der Zwei hatte Sidious bereits einen Schüler. Kor war nicht auserwählt. Er war vorgesehen. Als Waffe. In den Schatten der Galaxis wurde er gebrochen und neu geformt, seine Wut genährt, sein Wille verdreht, bis nichts mehr blieb außer roher Macht und blindem Gehorsam – kein Jedi, kein Sith, nur ein Werkzeug.\n" +
            "\n" +
            "Als schließlich die Order 66 fiel, kämpfte Kor an der Seite der Klone gegen jene, die einst seine Brüder waren. Jedi starben durch seine Klinge, ohne zu begreifen, wer sie getroffen hatte. Doch Werkzeuge werden nicht bewahrt. In den letzten Tagen der Klonkriege verschwand Kor Dorennu in einem namenlosen Gefecht – kein Grab, kein Bericht, kein Andenken. Die Jedi löschten jede Spur seiner Existenz, und das Imperium hatte nie einen Grund, ihn zu erwähnen. So wurde er endgültig das, was er immer gewesen war: ein Schatten im Krieg.",
      }),

      scene({
        id: "akt4-ending-decline",
        step: 2,
        title: "Finale Entscheidung",
        subtitle: "Du lehnst das Angebot ab.",
        audioUrl: null,
        sceneImage: `${BASE}audiobooks/Akt4/Pictures/Akt4_Ende2.png`,
        branches: [],
        autoplayNext: false,
        nextSegmentId: null,
        isTextEnding: true,
        endingTitle: "Du lehnst das Angebot ab",
        endingText:
          "„Dann bleibt mir keine andere Wahl“, sagte Palpatine leise. Sein rotes Lichtschwert zischte auf, und im nächsten Moment explodierte der Hangar in Bewegung. Blasterfeuer durchzog die Dunkelheit, Klone stürmten nach vorn – und wurden einer nach dem anderen von unsichtbarer Macht zerschmettert. Kor riss sein eigenes Lichtschwert hoch und stürzte sich in den Kampf. Funken sprühten, Klingen kreischten aufeinander, die Macht selbst bebte unter der Wucht ihres Duells. Mit jedem Schlag wuchs Kors Zorn, jeder gefallene Kamerad brannte sich tiefer in ihn hinein. Er griff nach der Dunkelheit, ließ sie durch sich fließen – und für einen Moment hielt er tatsächlich stand. „Ich wusste, du wärst ein guter Schüler gewesen“, murmelte Sidious kalt, während ihre Klingen verhakten. „Eine Schande, dass es so enden muss.“\n" +
            "\n" +
            "Doch gegen diese Macht gab es keinen Sieg. Mit einem finalen, überwältigenden Schlag durchbrach Sidious Kors Verteidigung. Die Dunkelheit, die ihm kurz Stärke verliehen hatte, verschlang ihn nun vollständig. Kor Dorennu fiel, sein Lichtschwert erlosch, und mit ihm verschwand jede Spur dessen, was er einmal gewesen war. Kein Grab, kein Denkmal, kein Name blieb zurück. Der Jedi-Orden sprach nie wieder über ihn, und im aufsteigenden Imperium war er nie mehr als ein unbedeutender Verlust in einem endlosen Krieg. So endete Kor Dorennu – nicht als Held, nicht als Verräter, sondern als vergessener Krieger, dessen Geschichte mit ihm starb.",
      }),
    ],
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
