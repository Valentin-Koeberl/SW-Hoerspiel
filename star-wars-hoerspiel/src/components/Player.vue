<template>
  <div class="player-page">
    <div class="galaxy" aria-hidden="true">
      <div class="stars stars--1"></div>
      <div class="stars stars--2"></div>
      <div class="stars stars--3"></div>
      <div class="galaxyAccent"></div>
      <div class="cursorPulse"></div>
    </div>

    <main class="player-shell" :class="{ fade: state.autoplayTransitioning }">
      <button class="back-btn" type="button" @click="goHome">← Zur Startseite</button>

      <section v-if="isSmallScreen" class="mobile-blocker" aria-live="polite">
        <h1 class="player-title">Nicht verfügbar auf kleinen Displays</h1>
        <p class="player-subtitle">
          Dieses Hörspiel kann aktuell nur auf Laptop/Tablet im Querformat abgespielt werden. Bitte nutze eine größere
          Bildschirmfläche.
        </p>
      </section>

      <section v-else-if="showThankYouScreen" class="thank-you-screen" aria-live="polite">
        <h1 class="player-title">Möge die Macht mit dir sein!</h1>
        <p class="player-subtitle">
          Danke, dass du Star Wars: Trupp 705 getestet hast. Schon bald wird die Geschichte weiter erzählt! Bleibt gespannt!
        </p>

        <div class="thank-you-meta">
          <div>Fortschritt: {{ progress }}%</div>
          <div>Gespeicherte Entscheidungen: {{ state.decisions.length }}</div>
        </div>

        <div class="thank-you-actions">
          <button class="reset-btn" type="button" @click="resetWholeStory">Hörspiel neustarten</button>
        </div>
      </section>

      <section v-else class="player-layout">
        <section class="media-column">
          <div class="image-placeholder">
            <img
                v-if="currentSegment.imageUrl"
                :src="currentSegment.imageUrl"
                :alt="`Segmentbild: ${currentSegment.title}`"
            />
            <span v-else>Kein Bild für dieses Segment</span>
          </div>

          <div class="media-head">
            <div class="media-head__text">
              <h1 class="player-title">{{ currentSegment.title }}</h1>
              <p class="player-subtitle">{{ currentSegment.subtitle }}</p>
            </div>

            <!-- Controls: Waves links neben Button + vertikal zentriert zum Textblock -->
            <div class="media-head__controls">
              <div v-if="isPlaying" class="audio-waves" aria-label="Audio spielt">
                <span></span><span></span><span></span><span></span><span></span>
              </div>

              <button class="play-btn" type="button" @click="togglePlayback">
                <span class="play-btn__icon" aria-hidden="true">{{ isPlaying ? "❚❚" : "▶" }}</span>
                <span>{{ isPlaying ? "Pause" : "Play" }}</span>
              </button>
            </div>
          </div>

          <audio
              ref="audioRef"
              :src="currentSegment.audioUrl"
              @timeupdate="handleTimeUpdate"
              @ended="handleSegmentEnd"
          ></audio>
        </section>

        <aside class="right-column">
          <section class="decision-column" :class="{ 'decision-column--active': showBranches }">
            <section v-if="showBranches" class="branch-section" aria-label="Entscheidung">
              <h2 class="branch-title">Entscheidung erforderlich</h2>
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

            <p v-else-if="currentSegment.autoplayNext" class="autoplay-info">
              Nächstes Segment startet automatisch, keine Entscheidung notwendig.
            </p>

            <p v-else-if="limitedBranches.length" class="autoplay-info">
              Die nächste Entscheidung kommt schon bald!
            </p>
          </section>

          <section class="meta-row">
            <div>Fortschritt: {{ progress }}%</div>
            <div>Gespeicherte Entscheidungen: {{ state.decisions.length }}</div>
            <button class="reset-btn" type="button" @click="resetWholeStory">Hörspiel neustarten</button>
          </section>
        </aside>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { usePlayerStore } from "../composables/usePlayerStore";

const audioRef = ref(null);
const isPlaying = ref(false);
const segmentFinished = ref(false);
const isSmallScreen = ref(false);
const showThankYouScreen = ref(false);
const { proxy } = getCurrentInstance();

/* Hier definierst du die maximal mögliche Anzahl an Entscheidungen.
   Diesen Wert kannst du jederzeit anpassen. */
const MAX_DECISIONS = 2;

const { state, currentSegment, chooseBranch, moveToSegment, updateCurrentTime, resetProgress } = usePlayerStore();

const limitedBranches = computed(() => (currentSegment.value.branches ?? []).slice(0, 3));
const showBranches = computed(() => segmentFinished.value && limitedBranches.value.length > 0);

const progress = computed(() => {
  if (MAX_DECISIONS <= 0) return 0;

  const takenDecisions = state.decisions.length;
  const percent = Math.floor((takenDecisions / MAX_DECISIONS) * 100);

  return Math.min(percent, 100);
});

const isLastSegment = computed(() => {
  const hasBranches = limitedBranches.value.length > 0;
  const hasNextSegment = Boolean(currentSegment.value.nextSegmentId);
  const hasAutoplayNext = Boolean(currentSegment.value.autoplayNext);

  return !hasBranches && !hasNextSegment && !hasAutoplayNext;
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
    () => currentSegment.value.id,
    async () => {
      segmentFinished.value = false;
      showThankYouScreen.value = false;
      await nextTick();

      const audio = audioRef.value;
      if (!audio) return;

      audio.currentTime = state.currentTime || 0;
      if (isPlaying.value && !isSmallScreen.value) {
        await audio.play().catch(() => {
          isPlaying.value = false;
        });
      }
    },
    { immediate: true },
);

watch(isSmallScreen, (small) => {
  if (!small) return;

  const audio = audioRef.value;
  if (audio) audio.pause();
  isPlaying.value = false;
});

function togglePlayback() {
  if (isSmallScreen.value || showThankYouScreen.value) return;

  const audio = audioRef.value;
  if (!audio) return;

  if (isPlaying.value) {
    audio.pause();
    isPlaying.value = false;
    return;
  }

  audio
      .play()
      .then(() => {
        isPlaying.value = true;
      })
      .catch(() => {
        isPlaying.value = false;
      });
}

function handleTimeUpdate(event) {
  updateCurrentTime(event.target.currentTime);
}

function selectBranch(branch) {
  showThankYouScreen.value = false;
  chooseBranch(branch);
}

function handleSegmentEnd() {
  isPlaying.value = false;
  segmentFinished.value = true;

  if (progress.value >= 100 && isLastSegment.value) {
    showThankYouScreen.value = true;
    return;
  }

  if (!currentSegment.value.autoplayNext || !currentSegment.value.nextSegmentId) return;

  const nextId = currentSegment.value.nextSegmentId;
  state.autoplayTransitioning = true;
  setTimeout(() => {
    moveToSegment(nextId);
    state.autoplayTransitioning = false;
  }, 600);
}

function resetWholeStory() {
  const audio = audioRef.value;
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  isPlaying.value = false;
  segmentFinished.value = false;
  showThankYouScreen.value = false;
  resetProgress();
}

function goHome() {
  proxy.$router.push("/");
}
</script>

<style scoped>
.player-page {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  position: relative;
  padding: 1.1rem;
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
  padding: clamp(1rem, 1.3vw, 1.5rem);
  transition: opacity 320ms ease, transform 320ms ease;
}

.player-shell.fade {
  opacity: 0.35;
  transform: scale(0.985);
}

/* === GRID: row1 = Bild + Right column; row2 = Head/Controls === */
.player-layout {
  display: grid;
  grid-template-columns: minmax(760px, 2.35fr) minmax(320px, 1fr);
  grid-template-rows: auto auto;
  gap: 1.2rem;
  align-items: start;
}

/* media-column "entpacken": Bild und Head direkt im parent-grid platzieren */
.media-column {
  display: contents;
}

/* Bild: links oben */
.image-placeholder {
  grid-column: 1;
  grid-row: 1;

  width: 100%;
  min-height: 510px;
  aspect-ratio: 16 / 8;
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

/* Head unter dem Bild */
.media-head {
  grid-column: 1;
  grid-row: 2;

  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 1rem;
  margin-top: 0.25rem;
  margin-bottom: 0.95rem;
}

.media-head__text {
  flex: 1;
  min-width: 0;
}

/* Controls: inline-flex, waves links, alles mittig */
.media-head__controls {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.8rem;
  min-width: 0;
  align-self: center;
}

.right-column {
  grid-column: 2;
  grid-row: 1;

  display: flex;
  flex-direction: column;
  align-self: stretch;
  min-height: 0;
}

.decision-column {
  border-radius: 1rem;
  padding: 0.95rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
}

.decision-column--active {
  border: 1px solid transparent;
  background:
      linear-gradient(rgba(8, 10, 20, 0.86), rgba(8, 10, 20, 0.86)) padding-box,
      linear-gradient(120deg, #2563eb, #ef4444, #2563eb) border-box;
  background-size: 220% 220%;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.22), 0 0 36px rgba(37, 99, 235, 0.28), 0 0 30px rgba(239, 68, 68, 0.22);
  animation: decisionGlow 2.6s ease infinite;
}

@keyframes decisionGlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
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

.play-btn__icon {
  font-size: 0.95rem;
}

.back-btn:hover,
.play-btn:hover,
.branch-btn:hover,
.reset-btn:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
}

/* Title/SubTitle kleiner + mehr Abstand zum Bild */
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

/* Waves (links neben Button) */
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

.audio-waves span:nth-child(2) {
  animation-delay: 0.12s;
}
.audio-waves span:nth-child(3) {
  animation-delay: 0.24s;
}
.audio-waves span:nth-child(4) {
  animation-delay: 0.36s;
}
.audio-waves span:nth-child(5) {
  animation-delay: 0.48s;
}

@keyframes wave {
  0%,
  100% {
    height: 8px;
    opacity: 0.6;
  }
  50% {
    height: 22px;
    opacity: 1;
  }
}

.branch-title,
.autoplay-info {
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

/* Meta dockt an Unterkante des Bildes */
.meta-row {
  margin-top: auto;
  padding-top: 0;
  display: grid;
  gap: 0.45rem;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.88rem;
  text-align: left;
  justify-items: start;
}

.reset-btn {
  border-color: rgba(248, 113, 113, 0.7);
  background: linear-gradient(180deg, rgba(239, 68, 68, 0.45), rgba(127, 29, 29, 0.6));
}

.reset-btn:hover {
  background: linear-gradient(180deg, rgba(248, 113, 113, 0.65), rgba(153, 27, 27, 0.75));
}

.mobile-blocker {
  min-height: 52dvh;
  display: grid;
  place-content: center;
  text-align: center;
  gap: 0.8rem;
  padding: 1.2rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 80, 80, 0.45);
  background: rgba(40, 0, 0, 0.22);
}

.thank-you-screen {
  min-height: 52dvh;
  display: grid;
  place-content: center;
  text-align: center;
  gap: 1rem;
  padding: 1.8rem;
  border-radius: 1rem;
  border: 1px solid rgba(96, 165, 250, 0.35);
  background:
      linear-gradient(rgba(8, 10, 20, 0.88), rgba(8, 10, 20, 0.88)) padding-box,
      linear-gradient(120deg, rgba(37, 99, 235, 0.8), rgba(239, 68, 68, 0.8), rgba(37, 99, 235, 0.8)) border-box;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 36px rgba(37, 99, 235, 0.2), 0 0 28px rgba(239, 68, 68, 0.16);
}

.thank-you-screen .player-title,
.thank-you-screen .player-subtitle {
  text-align: center;
}

.thank-you-meta {
  display: grid;
  gap: 0.45rem;
  color: rgba(255, 255, 255, 0.88);
  font-size: 0.95rem;
}

.thank-you-actions {
  display: flex;
  justify-content: center;
}

.galaxyAccent {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 1;
  background:
      radial-gradient(
          420px 300px at var(--mx) var(--my),
          rgba(37, 99, 235, 0.2) 0%,
          rgba(37, 99, 235, 0.08) 38%,
          rgba(0, 0, 0, 0) 72%
      ),
      radial-gradient(
          420px 300px at var(--mx2) var(--my2),
          rgba(239, 68, 68, 0.2) 0%,
          rgba(239, 68, 68, 0.08) 38%,
          rgba(0, 0, 0, 0) 72%
      );
  filter: blur(10px);
  mix-blend-mode: screen;
}

.cursorPulse {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cursorPulse::before,
.cursorPulse::after {
  content: "";
  position: absolute;
  width: 132px;
  height: 132px;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  filter: blur(22px);
  opacity: 0.56;
}

.cursorPulse::before {
  left: var(--mx);
  top: var(--my);
  background: radial-gradient(circle, rgba(37, 99, 235, 0.7) 0%, rgba(37, 99, 235, 0) 70%);
}

.cursorPulse::after {
  left: var(--mx2);
  top: var(--my2);
  background: radial-gradient(circle, rgba(239, 68, 68, 0.7) 0%, rgba(239, 68, 68, 0) 70%);
}

/* Responsive: 1-spaltig */
@media (max-width: 1200px) {
  .player-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }

  .right-column {
    grid-column: 1;
    grid-row: 3;
    align-self: auto;
  }

  .meta-row {
    margin-top: 0.9rem;
  }

  .image-placeholder {
    min-height: 380px;
  }
}
</style>