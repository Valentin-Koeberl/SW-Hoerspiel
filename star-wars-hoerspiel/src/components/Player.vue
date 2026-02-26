<template>
  <div class="player-page">
    <div class="galaxy" aria-hidden="true">
      <div class="stars stars--1"></div>
      <div class="stars stars--2"></div>
      <div class="stars stars--3"></div>
      <div class="galaxyAccent"></div>
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

      <section v-else class="player-layout">
        <div class="media-column">
          <h1 class="player-title">{{ currentSegment.title }}</h1>
          <p class="player-subtitle">{{ currentSegment.subtitle }}</p>

          <div class="image-placeholder">
            <img
              v-if="currentSegment.imageUrl"
              :src="currentSegment.imageUrl"
              :alt="`Segmentbild: ${currentSegment.title}`"
            />
            <span v-else>Kein Bild für dieses Segment</span>
          </div>

          <button class="play-btn" type="button" @click="togglePlayback">
            {{ isPlaying ? "Pause" : "Play" }}
          </button>

          <audio
            ref="audioRef"
            :src="currentSegment.audioUrl"
            @timeupdate="handleTimeUpdate"
            @ended="handleSegmentEnd"
          ></audio>
        </div>

        <aside class="decision-column">
          <section v-if="showBranches" class="branch-section" aria-label="Entscheidung">
            <h2 class="branch-title">Entscheidung</h2>
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
            Nächstes Segment startet automatisch nach Ende der Audiodatei ...
          </p>

          <p v-else-if="limitedBranches.length" class="autoplay-info">
            Entscheidungen erscheinen, sobald das Audio vollständig abgespielt wurde.
          </p>

          <section class="meta-row">
            <div>Fortschritt: {{ progress }}%</div>
            <div>Gespeicherte Entscheidungen: {{ state.decisions.length }}</div>
            <button class="reset-btn" type="button" @click="resetWholeStory">Komplettes Hörspiel auf 0</button>
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
const { proxy } = getCurrentInstance();
const { state, currentSegment, progress, chooseBranch, moveToSegment, updateCurrentTime, resetProgress } =
  usePlayerStore();

const limitedBranches = computed(() => (currentSegment.value.branches ?? []).slice(0, 3));
const showBranches = computed(() => segmentFinished.value && limitedBranches.value.length > 0);

function updateScreenState() {
  isSmallScreen.value = window.matchMedia("(max-width: 900px)").matches;
}

onMounted(() => {
  updateScreenState();
  window.addEventListener("resize", updateScreenState, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenState);
});

watch(
  () => currentSegment.value.id,
  async () => {
    segmentFinished.value = false;
    await nextTick();

    const audio = audioRef.value;
    if (!audio) {
      return;
    }

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
  if (isSmallScreen.value) {
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
  chooseBranch(branch);
}

function handleSegmentEnd() {
  isPlaying.value = false;
  segmentFinished.value = true;

  if (!currentSegment.value.autoplayNext || !currentSegment.value.nextSegmentId) {
    return;
  }

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
  padding: 1rem;
}

.player-shell {
  width: min(1280px, 96vw);
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 1.2rem;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.28);
  padding: clamp(1rem, 1.5vw, 1.6rem);
  transition: opacity 320ms ease, transform 320ms ease;
}

.player-shell.fade {
  opacity: 0.35;
  transform: scale(0.985);
}

.player-layout {
  display: grid;
  grid-template-columns: minmax(620px, 2fr) minmax(280px, 1fr);
  gap: 1.2rem;
  align-items: start;
}

.media-column,
.decision-column {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem;
  padding: 0.9rem;
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
  margin-bottom: 0.75rem;
}

.back-btn:hover,
.play-btn:hover,
.branch-btn:hover,
.reset-btn:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
}

.player-title {
  margin: 0;
  font-size: clamp(2rem, 3.3vw, 3.2rem);
  text-transform: uppercase;
  text-align: center;
}

.player-subtitle {
  margin: 0.45rem 0 1rem;
  color: rgba(255, 255, 255, 0.84);
  text-transform: uppercase;
  font-size: clamp(0.9rem, 1.5vw, 1.2rem);
  text-align: center;
}

.image-placeholder {
  width: 100%;
  min-height: 460px;
  aspect-ratio: 16 / 8;
  margin: 0 auto 1rem;
  border: 1px dashed rgba(255, 255, 255, 0.45);
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

.play-btn {
  min-width: 130px;
  display: block;
  margin: 0 auto;
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

.meta-row {
  margin-top: 1rem;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  display: grid;
  gap: 0.55rem;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.88rem;
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

@media (max-width: 1200px) {
  .player-layout {
    grid-template-columns: 1fr;
  }

  .image-placeholder {
    min-height: 380px;
  }
}
</style>
