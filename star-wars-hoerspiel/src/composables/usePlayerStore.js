import { computed, reactive, watch } from "vue";
import { chapterMap, defaultChapterId } from "../data/audioBooks";

const STORAGE_KEY = "sw-hoerspiel-player-state";

function createSession(chapterId) {
  const chapter = chapterMap[chapterId] ?? chapterMap[defaultChapterId];
  const initialSegmentId = chapter?.initialSegmentId ?? null;

  return {
    currentSegmentId: initialSegmentId,
    currentTime: 0,
    decisions: [],
    visitedSegments: initialSegmentId ? [initialSegmentId] : [],
    autoplayTransitioning: false,
  };
}

const defaultState = {
  activeBookId: defaultChapterId,
  sessions: Object.fromEntries(Object.keys(chapterMap).map((chapterId) => [chapterId, createSession(chapterId)])),
};

function normalizeSession(chapterId, session) {
  const chapter = chapterMap[chapterId];
  const fallback = createSession(chapterId);

  if (!session || typeof session !== "object") {
    return fallback;
  }

  if (!(session.currentSegmentId in chapter.segmentMap)) {
    return fallback;
  }

  return {
    ...fallback,
    ...session,
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
    };
  } catch {
    return null;
  }
}

const state = reactive(loadSavedState() ?? defaultState);

watch(
  () => ({
    activeBookId: state.activeBookId,
    sessions: state.sessions,
  }),
  (snapshot) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  },
  { deep: true },
);

function ensureSession(chapterId) {
  if (!state.sessions[chapterId]) {
    state.sessions[chapterId] = createSession(chapterId);
  }

  return state.sessions[chapterId];
}

function setActiveBook(chapterId) {
  if (!(chapterId in chapterMap)) {
    state.activeBookId = defaultChapterId;
    return;
  }

  state.activeBookId = chapterId;
  ensureSession(chapterId);
}

function moveToSegment(segmentId) {
  const chapter = chapterMap[state.activeBookId];
  const session = ensureSession(state.activeBookId);

  if (!(segmentId in chapter.segmentMap)) {
    return;
  }

  session.currentSegmentId = segmentId;
  session.currentTime = 0;

  if (!session.visitedSegments.includes(segmentId)) {
    session.visitedSegments.push(segmentId);
  }
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
  state.sessions[state.activeBookId] = createSession(state.activeBookId);
}

export function usePlayerStore(chapterId = defaultChapterId) {
  setActiveBook(chapterId);

  const currentBook = computed(() => chapterMap[state.activeBookId] ?? chapterMap[defaultChapterId]);
  const session = computed(() => ensureSession(state.activeBookId));
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
  };
}
