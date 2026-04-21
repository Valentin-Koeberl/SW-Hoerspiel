import { computed, reactive, watch } from "vue";
import { chapterMap, chapters, defaultChapterId } from "../data/audioBooks";

const STORAGE_KEY = "sw-hoerspiel-player-state";

function normalizeStoryline(storyline) {
  if (storyline === null || storyline === undefined || storyline === "") {
    return null;
  }

  return String(storyline);
}

function resolveStartSegmentId(chapter, storyline = null) {
  const normalizedStoryline = normalizeStoryline(storyline);
  const mappedSegmentId = normalizedStoryline ? chapter?.startSegmentByStoryline?.[normalizedStoryline] : null;
  if (mappedSegmentId && chapter?.segmentMap?.[mappedSegmentId]) {
    return mappedSegmentId;
  }

  return chapter?.initialSegmentId ?? null;
}

function createSession(chapterId, storyline = null) {
  const chapter = chapterMap[chapterId] ?? chapterMap[defaultChapterId];
  const initialSegmentId = resolveStartSegmentId(chapter, storyline);
  const normalizedStoryline = normalizeStoryline(storyline);

  return {
    currentSegmentId: initialSegmentId,
    currentTime: 0,
    decisions: [],
    visitedSegments: initialSegmentId ? [initialSegmentId] : [],
    autoplayTransitioning: false,
    storyline: normalizedStoryline,
  };
}

const defaultState = {
  activeBookId: defaultChapterId,
  sessions: Object.fromEntries(Object.keys(chapterMap).map((chapterId) => [chapterId, createSession(chapterId)])),
  chapterProgress: Object.fromEntries(
    chapters.map((chapter, index) => [
      chapter.id,
      {
        unlocked: index === 0,
        completed: false,
        exploredSegments: [],
      },
    ]),
  ),
};

function normalizeSession(chapterId, session) {
  const chapter = chapterMap[chapterId];
  const savedStoryline = normalizeStoryline(session?.storyline ?? chapter?.segmentMap?.[session?.currentSegmentId]?.nextStoryline);
  const fallback = createSession(chapterId, savedStoryline);

  if (!session || typeof session !== "object") {
    return fallback;
  }

  if (!(session.currentSegmentId in chapter.segmentMap)) {
    return fallback;
  }

  return {
    ...fallback,
    ...session,
    storyline: normalizeStoryline(session.storyline) ?? savedStoryline,
    decisions: Array.isArray(session.decisions) ? session.decisions : [],
    visitedSegments: Array.isArray(session.visitedSegments)
      ? session.visitedSegments.filter((segmentId) => segmentId in chapter.segmentMap)
      : fallback.visitedSegments,
  };
}

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    return {
      activeBookId: parsed.activeBookId in chapterMap ? parsed.activeBookId : defaultChapterId,
      sessions: Object.fromEntries(
        Object.keys(chapterMap).map((chapterId) => [chapterId, normalizeSession(chapterId, parsed.sessions?.[chapterId])]),
      ),
      chapterProgress: Object.fromEntries(
        chapters.map((chapter, index) => {
          const saved = parsed.chapterProgress?.[chapter.id];

          return [
            chapter.id,
            {
              unlocked: Boolean(saved?.unlocked) || index === 0,
              completed: Boolean(saved?.completed),
              exploredSegments: Array.isArray(saved?.exploredSegments)
                ? saved.exploredSegments.filter((segmentId) => segmentId in chapter.segmentMap)
                : [],
            },
          ];
        }),
      ),
    };
  } catch {
    return null;
  }
}

const state = reactive(loadSavedState() ?? defaultState);

function recalculateUnlocks() {
  chapters.forEach((chapter, index) => {
    const progress = state.chapterProgress[chapter.id];
    if (!progress) {
      return;
    }

    if (index === 0) {
      progress.unlocked = true;
      return;
    }

    const previousChapter = chapters[index - 1];
    const previousProgress = state.chapterProgress[previousChapter.id];
    progress.unlocked = Boolean(previousProgress?.completed);
  });
}

recalculateUnlocks();

watch(
  () => ({
    activeBookId: state.activeBookId,
    sessions: state.sessions,
    chapterProgress: state.chapterProgress,
  }),
  (snapshot) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  },
  { deep: true },
);

function ensureSession(chapterId, storyline = null) {
  if (!state.sessions[chapterId]) {
    state.sessions[chapterId] = createSession(chapterId, storyline);
  }

  return state.sessions[chapterId];
}

function ensureChapterProgress(chapterId) {
  if (!state.chapterProgress[chapterId]) {
    state.chapterProgress[chapterId] = {
      unlocked: chapterId === chapters[0]?.id,
      completed: false,
      exploredSegments: [],
    };
  }

  return state.chapterProgress[chapterId];
}

function addExploredSegment(chapterId, segmentId) {
  const progress = ensureChapterProgress(chapterId);
  if (!segmentId || progress.exploredSegments.includes(segmentId)) {
    return;
  }

  progress.exploredSegments.push(segmentId);
}

function resolveStorylineFromChapterSession(chapterId) {
  const chapter = chapterMap[chapterId];
  const chapterSession = state.sessions?.[chapterId];

  return normalizeStoryline(
    chapterSession?.storyline ?? chapter?.segmentMap?.[chapterSession?.currentSegmentId]?.nextStoryline,
  );
}

function setActiveBook(chapterId) {
  if (!(chapterId in chapterMap)) {
    state.activeBookId = defaultChapterId;
    return;
  }

  const previousBookId = state.activeBookId;
  const previousSession = state.sessions[previousBookId];
  const previousChapter = chapterMap[previousBookId];
  const previousStoryline = normalizeStoryline(
    previousSession?.storyline ?? previousChapter?.segmentMap?.[previousSession?.currentSegmentId]?.nextStoryline,
  );
  const resolvedStoryline =
    chapterId === "akt4" ? resolveStorylineFromChapterSession("akt3") ?? previousStoryline : previousStoryline;

  state.activeBookId = chapterId;
  let session = ensureSession(chapterId, chapterId === "akt4" ? resolvedStoryline : null);

  if (chapterId === "akt4" && resolvedStoryline) {
    const cameFromAct3 = previousBookId === "akt3";
    const storylineChanged = normalizeStoryline(session.storyline) !== resolvedStoryline;

    if (cameFromAct3 && storylineChanged) {
      state.sessions[chapterId] = createSession(chapterId, resolvedStoryline);
      session = state.sessions[chapterId];
    }

    session.storyline = resolvedStoryline;

    const chapter = chapterMap[chapterId];
    const resolvedStartSegmentId = resolveStartSegmentId(chapter, resolvedStoryline);
    const isFreshSession = session.decisions.length === 0 && session.visitedSegments.length <= 1 && session.currentTime === 0;

    if (resolvedStartSegmentId && isFreshSession && session.currentSegmentId !== resolvedStartSegmentId) {
      session.currentSegmentId = resolvedStartSegmentId;
      session.visitedSegments = [resolvedStartSegmentId];
    }
  }

  addExploredSegment(chapterId, session.currentSegmentId);
}

function moveToSegment(segmentId) {
  const chapter = chapterMap[state.activeBookId];
  const session = ensureSession(state.activeBookId);
  const targetSegment = chapter.segmentMap[segmentId];

  if (!targetSegment) {
    return;
  }

  session.currentSegmentId = segmentId;
  session.currentTime = 0;
  session.storyline = normalizeStoryline(targetSegment.nextStoryline) ?? session.storyline ?? null;

  if (!session.visitedSegments.includes(segmentId)) {
    session.visitedSegments.push(segmentId);
  }

  addExploredSegment(state.activeBookId, segmentId);
}

function chooseBranch(branch) {
  const session = ensureSession(state.activeBookId);

  session.decisions.push({
    fromSegmentId: session.currentSegmentId,
    label: branch.label,
    targetSegmentId: branch.targetSegmentId,
    chosenAt: new Date().toISOString(),
  });

  moveToSegment(branch.targetSegmentId);
}

function updateCurrentTime(timeInSeconds) {
  const session = ensureSession(state.activeBookId);
  session.currentTime = Number.isFinite(timeInSeconds) ? timeInSeconds : 0;
}

function resetProgress() {
  const currentStoryline = state.sessions[state.activeBookId]?.storyline ?? null;
  state.sessions[state.activeBookId] = createSession(state.activeBookId, currentStoryline);
  const initialSegmentId = state.sessions[state.activeBookId].currentSegmentId;
  if (initialSegmentId) {
    addExploredSegment(state.activeBookId, initialSegmentId);
  }
}

function isChapterFullyExplored(chapterId) {
  const chapter = chapterMap[chapterId];
  if (!chapter) {
    return false;
  }

  const progress = ensureChapterProgress(chapterId);
  const totalSegments = Object.keys(chapter.segmentMap).length;
  if (!totalSegments) {
    return true;
  }

  return progress.exploredSegments.length >= totalSegments;
}

function completeChapter(chapterId = state.activeBookId) {
  const progress = ensureChapterProgress(chapterId);
  progress.completed = true;
  recalculateUnlocks();
}

export function usePlayerStore(chapterId = null) {
  if (chapterId) {
    setActiveBook(chapterId);
  }

  const currentBook = computed(() => chapterMap[state.activeBookId] ?? chapterMap[defaultChapterId]);
  const session = computed(() => ensureSession(state.activeBookId));
  const currentChapterProgress = computed(() => ensureChapterProgress(state.activeBookId));
  const chapterAccess = computed(() =>
    Object.fromEntries(
      chapters.map((chapter) => [
        chapter.id,
        {
          ...ensureChapterProgress(chapter.id),
          fullyExplored: isChapterFullyExplored(chapter.id),
        },
      ]),
    ),
  );
  const currentSegment = computed(() => currentBook.value.segmentMap[session.value.currentSegmentId]);
  const progress = computed(() => {
    const totalSegments = Object.keys(currentBook.value.segmentMap).length || 1;
    return Math.round((session.value.visitedSegments.length / totalSegments) * 100);
  });

  return {
    state,
    session,
    currentBook,
    currentSegment,
    progress,
    setActiveBook,
    chooseBranch,
    moveToSegment,
    updateCurrentTime,
    resetProgress,
    completeChapter,
    chapterAccess,
    currentChapterProgress,
    isChapterFullyExplored,
  };
}
