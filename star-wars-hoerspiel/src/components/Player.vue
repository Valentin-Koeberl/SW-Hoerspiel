<template>
  <div class="player-page">
    <div class="galaxy" aria-hidden="true">
      <div class="stars stars--1"></div>
      <div class="stars stars--2"></div>
      <div class="stars stars--3"></div>
      <div class="galaxyAccent"></div>
      <div class="cursorPulse"></div>
    </div>

    <main class="player-shell" :class="{ fade: session.autoplayTransitioning }">
      <div class="top-actions">
        <button class="back-btn" type="button" @click="goHome">Zur Startseite</button>
        <button v-if="currentBook.isPlayable && !showThankYouScreen" class="reset-btn" type="button" @click="resetWholeStory">
          Kapitel neustarten
        </button>
      </div>

      <section v-if="!isChapterUnlocked" class="thank-you-screen" aria-live="polite">
        <h1 class="player-title">Kapitel gesperrt</h1>
        <p class="player-subtitle">
          Schließe zuerst das vorherige Kapitel ab, um {{ currentBook.title }} freizuschalten.
        </p>
      </section>

      <section v-else-if="!currentBook.isPlayable" class="thank-you-screen" aria-live="polite">
        <h1 class="player-title">{{ currentBook.title }}</h1>
        <p class="player-subtitle">
          Für dieses Kapitel sind aktuell noch keine Audios hinterlegt. Sobald Sounds im Ordner liegen, kann das Kapitel
          direkt in der Datenstruktur freigeschaltet werden.
        </p>
        <p v-if="currentBook.id === 'akt4' && session.storyline" class="player-subtitle">
          Akt 4 merkt sich aktuell Storyline {{ session.storyline }} und würde beim Start den passenden Einstieg wählen.
        </p>
      </section>

      <section v-else-if="isSmallScreen" class="mobile-blocker" aria-live="polite">
        <h1 class="player-title">Nicht verfügbar auf kleinen Displays</h1>
        <p class="player-subtitle">
          Dieses Hörspiel kann aktuell nur auf Laptop oder Tablet im Querformat abgespielt werden.
        </p>
      </section>

      <section v-else class="player-layout">
        <section class="media-column">
          <section class="chapter-timeline" aria-label="Kapitel-Fortschritt">
            <div class="chapter-timeline__header">
              <div>
                <div class="media-head__text">
                  <p class="player-kicker">Trupp 705 · {{ currentBook.title }}</p>
                  <h1 class="player-title">{{ currentSegment.title }}</h1>
                  <p class="player-subtitle">{{ currentSegment.subtitle }}</p>
                </div>
              </div>
              <div class="chapter-timeline__summary">{{ completedStepCount }}/{{ totalStepCount }} Stufen geschafft</div>
            </div>

            <div class="chapter-timeline__track">
              <div
                v-for="step in currentBook.timelineSteps"
                :key="step"
                class="chapter-timeline__step"
                :class="{
                  'chapter-timeline__step--done': completedSteps.includes(step),
                  'chapter-timeline__step--current': currentStep === step,
                }"
              >
                <span class="chapter-timeline__dot"></span>
              </div>
            </div>
          </section>

          <div class="image-placeholder">
            <img v-if="currentSceneImage" :src="currentSceneImage" :alt="`Segmentbild: ${currentSegment.title}`" />
            <span v-else>Kein Bild für dieses Segment</span>
          </div>

          <section v-if="hasAudio" class="audio-controller" aria-label="Audio Controller">
            <div class="audio-controller__timeline">
              <span class="audio-controller__time">{{ formatTime(currentTime) }}</span>
              <input
                class="audio-controller__seek"
                type="range"
                min="0"
                :max="duration || 0"
                step="0.1"
                :value="currentTime"
                @input="handleSeek"
              />
              <span class="audio-controller__time">{{ formatTime(duration) }}</span>
            </div>

            <div class="audio-controller__actions">
              <button class="audio-controller__transport" type="button" aria-label="10 Sekunden zurück" @click="skipBy(-10)">
                <svg aria-hidden="true" viewBox="0 0 24 24" class="audio-controller__skip audio-controller__skip--back">
                  <path d="M12.5 6.5L6.5 12l6 5.5" />
                  <path d="M18.5 6.5L12.5 12l6 5.5" />
                </svg>
              </button>
              <button class="audio-controller__transport audio-controller__transport--primary" type="button" :aria-label="isPlaying ? 'Pause' : 'Play'" @click="togglePlayback">
                <span aria-hidden="true">{{ isPlaying ? "❚❚" : "▶" }}</span>
              </button>
              <button class="audio-controller__transport" type="button" aria-label="10 Sekunden vor" @click="skipBy(10)">
                <svg aria-hidden="true" viewBox="0 0 24 24" class="audio-controller__skip">
                  <path d="M5.5 6.5L11.5 12l-6 5.5" />
                  <path d="M11.5 6.5L17.5 12l-6 5.5" />
                </svg>
              </button>
            </div>
          </section>

          <section v-else-if="isTextEnding" class="ending-card" aria-live="polite">
            <h2 class="branch-title">{{ endingTitle }}</h2>
            <p class="question-hint">{{ endingText }}</p>
            <p v-if="endingRecapItems.length" class="question-hint">Rueckblick auf deine letzten Entscheidungen:</p>
            <ul v-if="endingRecapItems.length" class="ending-recap">
              <li v-for="item in endingRecapItems" :key="item">{{ item }}</li>
            </ul>
          </section>

          <audio
            v-if="hasAudio"
            ref="audioRef"
            :src="currentSegment.audioUrl"
            @timeupdate="handleTimeUpdate"
            @loadedmetadata="handleLoadedMetadata"
            @ended="handleSegmentEnd"
          ></audio>
        </section>
      </section>

      <div v-if="showBranches" class="decision-popup" role="dialog" aria-modal="true" aria-labelledby="decision-title">
        <div class="decision-popup__backdrop"></div>
        <section class="decision-popup__card">
          <h2 id="decision-title" class="branch-title">Frage am Ende der Audio</h2>
          <p class="question-hint">Wähle eine Antwort. Dein Button bestimmt, welche nächste Lane abgespielt wird.</p>
          <div class="branch-grid">
            <button
              v-for="branch in limitedBranches"
              :key="`${currentSegment.id}-${branch.targetSegmentId}`"
              class="branch-btn"
              type="button"
              @click="selectBranch(branch)"
            >
              {{ branch.label }}
            </button>
          </div>
        </section>
      </div>

      <div
        v-else-if="showThankYouScreen"
        class="decision-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chapter-complete-title"
      >
        <div class="decision-popup__backdrop"></div>
        <section class="decision-popup__card decision-popup__card--complete">
          <h2 id="chapter-complete-title" class="branch-title">{{ completionTitle }}</h2>
          <p class="question-hint">
            {{ completionMessage }}
          </p>
          <div class="complete-actions">
            <button v-if="nextChapter" class="branch-btn" type="button" @click="goToNextChapter">
              Nächstes Kapitel starten
            </button>
            <button class="branch-btn" type="button" @click="resetWholeStory">
              Kapitel neu starten
            </button>
            <button class="branch-btn branch-btn--secondary" type="button" @click="goHome">
              Zur Kapitelübersicht
            </button>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { usePlayerStore } from "../composables/usePlayerStore";
import { chapters, defaultChapterId } from "../data/audioBooks";
import { getCurrentRoute } from "../router";

const audioRef = ref(null);
const isPlaying = ref(false);
const segmentFinished = ref(false);
const isSmallScreen = ref(false);
const showThankYouScreen = ref(false);
const duration = ref(0);
const currentTime = ref(0);
const { proxy } = getCurrentInstance();
const route = getCurrentRoute();
const chapterId = route.value.params?.bookId ?? defaultChapterId;

const { state, session, currentBook, currentSegment, chooseBranch, moveToSegment, updateCurrentTime, resetProgress, completeChapter, chapterAccess, isChapterFullyExplored } =
  usePlayerStore(chapterId);

const limitedBranches = computed(() => (currentSegment.value?.branches ?? []).slice(0, 3));
const showBranches = computed(() => segmentFinished.value && limitedBranches.value.length > 0);
const hasAudio = computed(() => Boolean(currentSegment.value?.audioUrl));
const isTextEnding = computed(() => Boolean(currentSegment.value?.isTextEnding));
const currentSceneImage = computed(() => {
  const segment = currentSegment.value;
  if (!segment) {
    return null;
  }

  const timeline = segment.imageTimeline ?? [];
  if (!timeline.length) {
    return segment.imageUrl ?? null;
  }

  let activeImage = timeline[0]?.image ?? segment.imageUrl ?? null;
  for (const entry of timeline) {
    if (currentTime.value >= entry.at) {
      activeImage = entry.image;
      continue;
    }

    break;
  }

  return activeImage;
});
const currentStep = computed(() => currentSegment.value?.step ?? 1);
const completedSteps = computed(() => {
  return [...new Set(session.value.visitedSegments.map((segmentId) => currentBook.value.segmentMap[segmentId]?.step).filter(Boolean))];
});
const totalStepCount = computed(() => currentBook.value.timelineSteps.length || 1);
const completedStepCount = computed(() => completedSteps.value.length);
const nextChapter = computed(() => {
  const currentIndex = chapters.findIndex((chapter) => chapter.id === currentBook.value.id);

  if (currentIndex === -1) {
    return null;
  }

  return chapters[currentIndex + 1] ?? null;
});
const isChapterUnlocked = computed(() => Boolean(chapterAccess.value[currentBook.value.id]?.unlocked));
const completionTitle = computed(() => {
  if (!nextChapter.value && isChapterFullyExplored(currentBook.value.id)) {
    return "Finale komplett abgeschlossen";
  }

  return "Kapitel abgeschlossen";
});
const completionMessage = computed(() => {
  if (!nextChapter.value && isChapterFullyExplored(currentBook.value.id)) {
    return `Du hast ${currentBook.value.title} vollständig mit allen Pfaden abgeschlossen. Danke fürs Durchspielen von Trupp 705!`;
  }

  return `Du hast ${currentBook.value.title} abgeschlossen. ${
    nextChapter.value ? `Als Nächstes wartet ${nextChapter.value.title}.` : "Weitere Kapitel folgen später."
  }`;
});
const progress = computed(() => {
  const percent = Math.floor((completedStepCount.value / totalStepCount.value) * 100);
  return Math.min(percent, 100);
});

const isLastSegment = computed(() => {
  if (!currentSegment.value) {
    return true;
  }

  const hasBranches = limitedBranches.value.length > 0;
  const hasNextSegment = Boolean(currentSegment.value.nextSegmentId);
  const hasAutoplayNext = Boolean(currentSegment.value.autoplayNext);

  return !hasBranches && !hasNextSegment && !hasAutoplayNext;
});
const endingTitle = computed(() => currentSegment.value?.endingTitle ?? "Dein Weg endet hier");
const endingText = computed(() => currentSegment.value?.endingText ?? "Deine letzte Entscheidung hat den Kurs von Trupp 705 festgelegt.");
const endingRecapItems = computed(() => {
  if (!isTextEnding.value) {
    return [];
  }

  const items = [];
  const storyline = session.value.storyline;

  if (storyline) {
    items.push(`Akt 4 startete mit Storyline ${storyline}.`);
  }

  const chapterChoices = [
    ["akt2", "Akt 2"],
    ["akt3", "Akt 3"],
    ["akt4", "Finale in Akt 4"],
  ];

  for (const [id, label] of chapterChoices) {
    const decisions = state.sessions?.[id]?.decisions;
    if (!Array.isArray(decisions) || decisions.length === 0) {
      continue;
    }

    const lastDecision = decisions[decisions.length - 1];
    if (!lastDecision?.label) {
      continue;
    }

    items.push(`${label}: ${lastDecision.label}`);
  }

  return items;
});

function updateScreenState() {
  isSmallScreen.value = window.matchMedia("(max-width: 900px)").matches;
}

function onMouseMove(event) {
  const x = event.clientX / window.innerWidth;
  const y = event.clientY / window.innerHeight;

  document.documentElement.style.setProperty("--mx", `${(x * 100 - 4.5).toFixed(2)}%`);
  document.documentElement.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
  document.documentElement.style.setProperty("--mx2", `${(x * 100 + 4.5).toFixed(2)}%`);
  document.documentElement.style.setProperty("--my2", `${(y * 100).toFixed(2)}%`);
}

onMounted(() => {
  updateScreenState();
  window.addEventListener("resize", updateScreenState, { passive: true });
  window.addEventListener("mousemove", onMouseMove, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenState);
  window.removeEventListener("mousemove", onMouseMove);
});

watch(
  () => currentSegment.value?.id,
  async () => {
    segmentFinished.value = false;
    showThankYouScreen.value = false;
    await nextTick();

    if (!currentSegment.value) {
      return;
    }

    if (!hasAudio.value) {
      isPlaying.value = false;
      duration.value = 0;
      currentTime.value = 0;
      updateCurrentTime(0);

      if (isTextEnding.value) {
        segmentFinished.value = true;
        completeChapter(currentBook.value.id);
      }

      return;
    }

    const audio = audioRef.value;
    if (!audio) {
      return;
    }

    audio.currentTime = session.value.currentTime || 0;
    currentTime.value = audio.currentTime;
    if (isPlaying.value && !isSmallScreen.value) {
      await audio.play().catch(() => {
        isPlaying.value = false;
      });
    }
  },
  { immediate: true },
);

watch(isSmallScreen, (small) => {
  if (!small) {
    return;
  }

  const audio = audioRef.value;
  if (audio) {
    audio.pause();
  }
  isPlaying.value = false;
});

function togglePlayback() {
  if (!isChapterUnlocked.value || isSmallScreen.value || showThankYouScreen.value || !currentSegment.value || !hasAudio.value) {
    return;
  }

  const audio = audioRef.value;
  if (!audio) {
    return;
  }

  if (isPlaying.value) {
    audio.pause();
    isPlaying.value = false;
    return;
  }

  audio.play().then(() => {
    isPlaying.value = true;
  }).catch(() => {
    isPlaying.value = false;
  });
}

function handleTimeUpdate(event) {
  currentTime.value = event.target.currentTime;
  updateCurrentTime(event.target.currentTime);
}

function handleLoadedMetadata(event) {
  duration.value = Number.isFinite(event.target.duration) ? event.target.duration : 0;
}

function handleSeek(event) {
  const audio = audioRef.value;
  if (!audio) {
    return;
  }

  const nextTime = Number(event.target.value);
  audio.currentTime = nextTime;
  currentTime.value = nextTime;
  updateCurrentTime(nextTime);
}

function skipBy(seconds) {
  const audio = audioRef.value;
  if (!audio) {
    return;
  }

  const nextTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration.value || audio.duration || 0);
  audio.currentTime = nextTime;
  currentTime.value = nextTime;
  updateCurrentTime(nextTime);
}

function formatTime(totalSeconds) {
  const safeSeconds = Number.isFinite(totalSeconds) ? Math.floor(totalSeconds) : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function selectBranch(branch) {
  showThankYouScreen.value = false;
  chooseBranch(branch);
}

function handleSegmentEnd() {
  isPlaying.value = false;
  segmentFinished.value = true;

  // AUTOPLAY NEXT SEGMENT
  if (currentSegment.value?.autoplayNext && currentSegment.value?.nextSegmentId) {
    moveToSegment(currentSegment.value.nextSegmentId);
    return;
  }

  // CHAPTER COMPLETION
  if (progress.value >= 100 && isLastSegment.value) {
    completeChapter(currentBook.value.id);
    showThankYouScreen.value = true;
  }
}


function resetWholeStory() {
  const audio = audioRef.value;
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  isPlaying.value = false;
  currentTime.value = 0;
  segmentFinished.value = false;
  showThankYouScreen.value = false;
  resetProgress();
}

function goHome() {
  proxy.$router.push("/");
}

function goToNextChapter() {
  if (!nextChapter.value) {
    goHome();
    return;
  }

  proxy.$router.push(`/chapter/${nextChapter.value.id}`);
}
</script>

<style scoped>
.player-page {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  position: relative;
  padding: 0.75rem;
}

.player-shell {
  width: min(1460px, calc(100% - 1.2rem));
  z-index: 1;
  border-radius: 1.2rem;
  border: 1px solid rgba(0, 0, 0, 0.75);
  background: rgba(10, 10, 14, 0.5);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55), inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  padding: clamp(0.8rem, 1vw, 1.1rem);
  transition: opacity 320ms ease, transform 320ms ease;
}

.top-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.55rem;
}

.player-shell.fade {
  opacity: 0.35;
  transform: scale(0.985);
}

.player-layout {
  display: grid;
  grid-template-columns: minmax(760px, 1fr);
  grid-template-rows: auto auto auto auto;
  gap: 0.8rem;
  align-items: start;
}

.media-column {
  display: contents;
}

.image-placeholder {
  grid-column: 1;
  grid-row: 2;
  width: 100%;
  min-height: 360px;
  aspect-ratio: 16 / 7;
  margin: 0;
  border-radius: 1rem;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.35);
  display: grid;
  place-items: center;
}

.image-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-head {
  grid-column: 1;
  grid-row: 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 0.1rem;
  margin-bottom: 0.25rem;
}

.media-head__text {
  flex: 1;
  min-width: 0;
}

.chapter-timeline {
  grid-column: 1;
  grid-row: 1;
  border-radius: 1rem;
  padding: 0.8rem 0.95rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.chapter-timeline__header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1rem;
  margin-bottom: 0.55rem;
}

.chapter-timeline__title {
  margin: 0.15rem 0 0;
  font-size: 1.1rem;
  text-transform: uppercase;
}

.chapter-timeline__summary {
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.9rem;
}

.chapter-timeline__track {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  gap: 0.5rem;
}

.chapter-timeline__step {
  display: grid;
}

.chapter-timeline__dot {
  width: 100%;
  height: 0.45rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
}

.chapter-timeline__step--done .chapter-timeline__dot {
  background: linear-gradient(90deg, rgba(96, 165, 250, 0.95), rgba(239, 68, 68, 0.9));
}

.chapter-timeline__step--current .chapter-timeline__dot {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.35), 0 0 18px rgba(96, 165, 250, 0.35);
}

.audio-controller {
  grid-column: 1;
  grid-row: 3;
  border-radius: 1rem;
  padding: 0.8rem 0.95rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: grid;
  gap: 0.7rem;
}

.ending-card {
  grid-column: 1;
  grid-row: 3;
  border-radius: 1rem;
  padding: 0.9rem 0.95rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.ending-recap {
  margin: 0;
  padding-left: 1.2rem;
  display: grid;
  gap: 0.4rem;
  color: rgba(255, 255, 255, 0.88);
}

.audio-controller__timeline {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.75rem;
  align-items: center;
}

.audio-controller__time {
  font-size: 0.84rem;
  color: rgba(255, 255, 255, 0.72);
  min-width: 3rem;
}

.audio-controller__seek,
.audio-controller__timeline input {
  width: 100%;
  accent-color: #60a5fa;
}

.audio-controller__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.audio-controller__transport {
  border-radius: 999px;
  width: 3.2rem;
  height: 3.2rem;
  border: 1px solid rgba(255, 255, 255, 0.36);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 0.95rem;
  display: inline-grid;
  place-items: center;
}

.audio-controller__transport--primary {
  width: 3.8rem;
  height: 3.8rem;
  font-size: 1.2rem;
  background: linear-gradient(115deg, rgba(37, 99, 235, 0.28), rgba(239, 68, 68, 0.24));
}

.audio-controller__skip {
  width: 1.55rem;
  height: 1.55rem;
  stroke: currentColor;
  fill: none;
  stroke-width: 2.1;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.back-btn,
.play-btn,
.branch-btn,
.reset-btn {
  border-radius: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.52);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  padding: 0.56rem 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.75px;
  font-size: 0.86rem;
  font-weight: 700;
  transition: transform 140ms ease, background 140ms ease, box-shadow 140ms ease;
}

.back-btn {
  margin-bottom: 0.8rem;
}

.play-btn {
  min-width: 135px;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  justify-content: center;
}

.back-btn:hover,
.play-btn:hover,
.branch-btn:hover,
.reset-btn:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
}

.player-kicker {
  margin: 0 0 0.35rem;
  color: #9cc9ff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-size: 0.82rem;
}

.player-title {
  margin: 0;
  font-size: clamp(1.55rem, 2.1vw, 2.35rem);
  text-transform: uppercase;
  text-align: left;
  line-height: 1.06;
}

.player-subtitle {
  margin: 0.45rem 0 0;
  color: rgba(255, 255, 255, 0.84);
  font-size: clamp(0.9rem, 1.05vw, 1.05rem);
  text-align: left;
}

.audio-waves {
  height: 22px;
  display: flex;
  align-items: flex-end;
  gap: 4px;
}

.audio-waves span {
  width: 4px;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(180deg, #60a5fa, #ef4444);
  animation: wave 1s ease-in-out infinite;
}

.audio-waves span:nth-child(2) { animation-delay: 0.12s; }
.audio-waves span:nth-child(3) { animation-delay: 0.24s; }
.audio-waves span:nth-child(4) { animation-delay: 0.36s; }
.audio-waves span:nth-child(5) { animation-delay: 0.48s; }

@keyframes wave {
  0%, 100% { height: 8px; opacity: 0.6; }
  50% { height: 22px; opacity: 1; }
}

.branch-title,
.autoplay-info,
.question-hint {
  margin: 0 0 0.7rem;
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.9);
}

.branch-grid {
  display: grid;
  gap: 0.6rem;
}

.branch-btn {
  width: 100%;
  text-align: left;
}

.branch-btn:hover {
  background: linear-gradient(115deg, rgba(37, 99, 235, 0.28), rgba(239, 68, 68, 0.28));
  border-color: rgba(255, 255, 255, 0.75);
}

.thank-you-meta {
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.thank-you-screen {
  display: grid;
  gap: 1rem;
}

.decision-popup {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  padding: 1.5rem;
}

.decision-popup__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.62);
  backdrop-filter: blur(10px);
}

.decision-popup__card {
  position: relative;
  width: min(640px, 100%);
  border-radius: 1.2rem;
  padding: 1.1rem;
  border: 1px solid transparent;
  background:
    linear-gradient(rgba(8, 10, 20, 0.94), rgba(8, 10, 20, 0.94)) padding-box,
    linear-gradient(120deg, #2563eb, #ef4444, #2563eb) border-box;
  background-size: 220% 220%;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.22), 0 0 36px rgba(37, 99, 235, 0.28), 0 0 30px rgba(239, 68, 68, 0.22);
  animation: decisionGlow 2.6s ease infinite;
}

.decision-popup__card--complete {
  width: min(560px, 100%);
}

.complete-actions {
  display: grid;
  gap: 0.6rem;
  margin-top: 0.8rem;
}

.branch-btn--secondary {
  background: rgba(255, 255, 255, 0.05);
}

.decision-inline-hint {
  margin: 1rem 0 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.72);
}

@keyframes decisionGlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@media (max-width: 1100px) {
  .player-layout {
    grid-template-columns: 1fr;
  }

  .chapter-timeline__header,
  .audio-controller__timeline {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .top-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
