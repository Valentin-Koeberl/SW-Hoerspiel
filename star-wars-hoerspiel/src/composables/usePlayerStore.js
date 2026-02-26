import { computed, reactive, watch } from "vue";
import { initialSegmentId, segmentMap } from "../data/segments";

const STORAGE_KEY = "sw-hoerspiel-player-state";

const defaultState = {
  currentSegmentId: initialSegmentId,
  currentTime: 0,
  decisions: [],
  visitedSegments: [initialSegmentId],
  autoplayTransitioning: false,
};

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

    const hasKnownSegment = parsed.currentSegmentId in segmentMap;
    if (!hasKnownSegment) {
      return null;
    }

    return {
      ...defaultState,
      ...parsed,
      visitedSegments: Array.isArray(parsed.visitedSegments) ? parsed.visitedSegments : [initialSegmentId],
      decisions: Array.isArray(parsed.decisions) ? parsed.decisions : [],
    };
  } catch {
    return null;
  }
}

const state = reactive(loadSavedState() ?? { ...defaultState });

watch(
  () => ({
    currentSegmentId: state.currentSegmentId,
    currentTime: state.currentTime,
    decisions: state.decisions,
    visitedSegments: state.visitedSegments,
  }),
  (snapshot) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  },
  { deep: true },
);

function moveToSegment(segmentId) {
  if (!(segmentId in segmentMap)) {
    return;
  }

  state.currentSegmentId = segmentId;
  state.currentTime = 0;
  if (!state.visitedSegments.includes(segmentId)) {
    state.visitedSegments.push(segmentId);
  }
}

function chooseBranch(branch) {
  state.decisions.push({
    fromSegmentId: state.currentSegmentId,
    label: branch.label,
    targetSegmentId: branch.targetSegmentId,
    chosenAt: new Date().toISOString(),
  });
  moveToSegment(branch.targetSegmentId);
}

function updateCurrentTime(timeInSeconds) {
  state.currentTime = Number.isFinite(timeInSeconds) ? timeInSeconds : 0;
}

function resetProgress() {
  Object.assign(state, { ...defaultState });
}

export function usePlayerStore() {
  const currentSegment = computed(() => segmentMap[state.currentSegmentId]);
  const progress = computed(() =>
    Math.round((state.visitedSegments.length / Object.keys(segmentMap).length) * 100),
  );

  return {
    state,
    currentSegment,
    progress,
    chooseBranch,
    moveToSegment,
    updateCurrentTime,
    resetProgress,
  };
}
