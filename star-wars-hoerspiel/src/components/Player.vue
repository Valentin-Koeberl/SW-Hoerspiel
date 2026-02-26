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

      <section v-if="showBranches" class="branch-section" aria-label="Entscheidung">
        <h2 class="branch-title">Was soll Trupp 705 als Nächstes tun?</h2>
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
    </main>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, nextTick, ref, watch } from "vue";
import { usePlayerStore } from "../composables/usePlayerStore";

const audioRef = ref(null);
const isPlaying = ref(false);
const segmentFinished = ref(false);
const { proxy } = getCurrentInstance();
const { state, currentSegment, progress, chooseBranch, moveToSegment, updateCurrentTime, resetProgress } =
  usePlayerStore();

const limitedBranches = computed(() => (currentSegment.value.branches ?? []).slice(0, 3));
const showBranches = computed(() => segmentFinished.value && limitedBranches.value.length > 0);

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
    if (isPlaying.value) {
      await audio.play().catch(() => {
        isPlaying.value = false;
      });
    }
  },
  { immediate: true },
);

function togglePlayback() {
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
  padding: 1.25rem;
}

.player-shell {
  width: min(980px, 100%);
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 1.2rem;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.28);
  text-align: center;
  padding: clamp(1.1rem, 1.8vw, 1.8rem);
  transition: opacity 320ms ease, transform 320ms ease;
}

.player-shell.fade {
  opacity: 0.35;
  transform: scale(0.985);
}

.back-btn,
.play-btn,
.branch-btn,
.reset-btn {
  border-radius: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.52);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  padding: 0.62rem 1rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-size: 0.9rem;
  font-weight: 700;
  transition: transform 140ms ease, background 140ms ease, box-shadow 140ms ease;
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
  margin: 0.9rem 0 0;
  font-size: clamp(2rem, 4.5vw, 3.4rem);
  text-transform: uppercase;
}

.player-subtitle {
  margin: 0.55rem 0 1.1rem;
  color: rgba(255, 255, 255, 0.84);
  text-transform: uppercase;
  font-size: clamp(0.95rem, 2.3vw, 1.4rem);
}

.image-placeholder {
  width: min(900px, 100%);
  aspect-ratio: 16 / 8.2;
  margin: 0 auto 1.1rem;
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
  min-width: 140px;
  margin-bottom: 1rem;
}

.branch-section {
  margin-top: 0.5rem;
}

.branch-grid {
  display: grid;
  gap: 0.7rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}

.branch-title,
.autoplay-info {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.88);
}

.meta-row {
  margin-top: 1rem;
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .player-shell {
    padding: 1rem;
  }

  .back-btn,
  .play-btn,
  .branch-btn,
  .reset-btn {
    width: 100%;
  }
}
</style>
