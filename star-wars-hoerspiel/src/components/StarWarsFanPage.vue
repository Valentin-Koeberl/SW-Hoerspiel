<template>
  <div class="page">
    <div class="galaxy" aria-hidden="true">
      <div class="stars stars--1"></div>
      <div class="stars stars--2"></div>
      <div class="stars stars--3"></div>

      <!-- Planets -->
      <div class="planet planet--1"></div>
      <div class="planet planet--2"></div>
      <div class="planet planet--3"></div>
      <div class="planet planet--4"></div>
      <div class="planet planet--5"></div>

      <div class="galaxyAccent"></div>
      <div class="cursorPulse" aria-hidden="true"></div>
    </div>

    <main class="container main" role="main">
      <section class="heroFull" aria-label="Hero">
        <header class="heroHeader" role="banner">
          <h1 class="heroTitle">{{ project.title }}</h1>
          <p class="heroSubtitle">{{ project.subtitle }}</p>
          <p class="heroCopy">{{ project.description }}</p>
          <button class="heroStoryButton" type="button" @click="openStory">Vorgeschichte</button>
        </header>

        <a class="scrollHint" href="#content" aria-label="Runterscrollen" @click.prevent="scrollToContent">
          <span class="scrollHint__arrow" aria-hidden="true">⌄</span>
        </a>
      </section>

      <section id="content" class="stack" aria-label="Landing Inhalt">
        <section class="librarySection" aria-label="Kapitel">
          <div class="libraryIntro">
            <h2 class="sectionTitle sectionTitle--large">Kapitelübersicht</h2>
            <p class="libraryCopy">
              Die fünf Cover zeigen Intro und die Akte 1 bis 4. Wähle ein Cover im Karussell, um direkt zum Kapitel zu
              springen.
            </p>
          </div>

          <div class="libraryCarousel" role="list" aria-label="Kapitel-Cover-Karussell">
            <article
              v-for="chapter in chapterCards"
              :key="chapter.id"
              class="coverCard"
              :class="{ 'coverCard--locked': !chapter.isUnlocked }"
              role="listitem"
            >
              <button
                class="coverCard__button"
                type="button"
                :disabled="!chapter.isUnlocked"
                :aria-label="`Kapitel öffnen: ${chapter.title}`"
                @click="openChapter(chapter.id)"
              >
                <img :src="chapter.coverImage" :alt="chapter.title" loading="lazy" />
                <div class="coverCard__overlay" :class="{ 'coverCard__overlay--locked': !chapter.isUnlocked }"></div>
                <span v-if="!chapter.isUnlocked" class="coverCard__lock" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="presentation">
                    <path d="M7 10V7a5 5 0 1 1 10 0v3" />
                    <rect x="5" y="10" width="14" height="10" rx="2" ry="2" />
                    <circle cx="12" cy="15" r="1.7" />
                  </svg>
                </span>
                <h3 class="coverCard__title">{{ chapter.title }}</h3>
              </button>
            </article>
          </div>
        </section>

        <footer class="sourcesSection" aria-label="Quellenverzeichnis">
          <div class="sourcesIntro">
            <h2 class="sectionTitle sectionTitle--large">Quellenverzeichnis</h2>
            <p class="sourcesCopy">Alle verwendeten Audio-Ressourcen mit direkter Verlinkung.</p>
          </div>

          <div class="sourcesList">
            <ul>
              <li>Sound Effect by <a href="https://pixabay.com/users/dragon-studio-38165424/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=425453" target="_blank" rel="noopener noreferrer">DRAGON-STUDIO</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=425453" target="_blank" rel="noopener noreferrer">Pixabay</a></li>

              <li>Sound Effect by <a href="https://pixabay.com/users/dragon-studio-38165424/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=425458" target="_blank" rel="noopener noreferrer">DRAGON-STUDIO</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=425458" target="_blank" rel="noopener noreferrer">Pixabay</a></li>

              <li>Sound Effect by <a href="https://pixabay.com/users/ahmed_abdulaal-49290858/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=312360" target="_blank" rel="noopener noreferrer">Ahmed Abdulaal</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=312360" target="_blank" rel="noopener noreferrer">Pixabay</a></li>

              <li>Sound Effect by <a href="https://pixabay.com/users/soundreality-31074404/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=128280" target="_blank" rel="noopener noreferrer">Jurij</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=128280" target="_blank" rel="noopener noreferrer">Pixabay</a></li>

              <li>Music by <a href="https://pixabay.com/users/artarea_studio-40122321/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=183485" target="_blank" rel="noopener noreferrer">ArtArea_Studio</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=183485" target="_blank" rel="noopener noreferrer">Pixabay</a></li>

              <li>Music by <a href="https://pixabay.com/users/nastelbom-48128234/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=437187" target="_blank" rel="noopener noreferrer">Dmitrii Spis</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=437187" target="_blank" rel="noopener noreferrer">Pixabay</a></li>

              <li>Sound Effect by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=104656" target="_blank" rel="noopener noreferrer">freesound_community</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=104656" target="_blank" rel="noopener noreferrer">Pixabay</a></li>

              <li>Sound Effect by <a href="https://pixabay.com/users/dragon-studio-38165424/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=405444" target="_blank" rel="noopener noreferrer">DRAGON-STUDIO</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=405444" target="_blank" rel="noopener noreferrer">Pixabay</a></li>

              <li>Sound Effect by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=60476" target="_blank" rel="noopener noreferrer">freesound_community</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=60476" target="_blank" rel="noopener noreferrer">Pixabay</a></li>

              <li>Sound Effect by <a href="https://pixabay.com/users/fronbondi_skegs-23154649/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=285866" target="_blank" rel="noopener noreferrer">Gavin Mogensen</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=285866" target="_blank" rel="noopener noreferrer">Pixabay</a></li>

              <li>Sound Effect by <a href="https://pixabay.com/users/bretbernhoft-30625489/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=422488" target="_blank" rel="noopener noreferrer">Bret Bernhoft</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=422488" target="_blank" rel="noopener noreferrer">Pixabay</a></li>

              <li>Sound Effect by <a href="https://pixabay.com/users/8footdino_on_scratch-48867414/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=301729" target="_blank" rel="noopener noreferrer">8footdino_on_scratch</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=301729" target="_blank" rel="noopener noreferrer">Pixabay</a></li>

              <li>Sound Effect by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=72309" target="_blank" rel="noopener noreferrer">freesound_community</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=72309" target="_blank" rel="noopener noreferrer">Pixabay</a></li>

              <li>Sound Effect by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=81681" target="_blank" rel="noopener noreferrer">freesound_community</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=81681" target="_blank" rel="noopener noreferrer">Pixabay</a></li>

              <li>Music by <a href="https://pixabay.com/users/grand_project-19033897/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=407228" target="_blank" rel="noopener noreferrer">Grand_Project</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=407228" target="_blank" rel="noopener noreferrer">Pixabay</a></li>

              <li>Music by <a href="https://pixabay.com/users/grand_project-19033897/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=384194" target="_blank" rel="noopener noreferrer">Grand_Project</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=384194" target="_blank" rel="noopener noreferrer">Pixabay</a></li>

              <li>Sound Effect by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=29688" target="_blank" rel="noopener noreferrer">freesound_community</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=29688" target="_blank" rel="noopener noreferrer">Pixabay</a></li>

              <li>Sound Effect by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=101682" target="_blank" rel="noopener noreferrer">freesound_community</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=101682" target="_blank" rel="noopener noreferrer">Pixabay</a></li>
            </ul>
          </div>
        </footer>

      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted } from "vue";
import { chapters, project } from "../data/audioBooks";
import { usePlayerStore } from "../composables/usePlayerStore";
import { router } from "../router";

const BASE = import.meta.env.BASE_URL;
const { chapterAccess } = usePlayerStore();
const chapterCards = computed(() =>
  chapters.map((chapter) => {
    const access = chapterAccess.value[chapter.id] ?? { unlocked: false, completed: false };
    return {
      ...chapter,
      isUnlocked: access.unlocked,
      isCompleted: access.completed,
    };
  }),
);

function onMouseMove(e) {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  document.documentElement.style.setProperty("--mx", `${(x * 100 - 4.5).toFixed(2)}%`);
  document.documentElement.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
  document.documentElement.style.setProperty("--mx2", `${(x * 100 + 4.5).toFixed(2)}%`);
  document.documentElement.style.setProperty("--my2", `${(y * 100).toFixed(2)}%`);
}

function scrollToContent() {
  const contentSection = document.getElementById("content");
  if (!contentSection) {
    return;
  }

  contentSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function openChapter(chapterId) {
  router.push(`/chapter/${chapterId}`);
}

function openStory() {
  router.push("/vorgeschichte");
}

onMounted(() => window.addEventListener("mousemove", onMouseMove, { passive: true }));
onBeforeUnmount(() => window.removeEventListener("mousemove", onMouseMove));
</script>

<style scoped>
.page {
  min-height: 100dvh;
  color: var(--sw-text);
  position: relative;
  isolation: isolate;
}

.main {
  position: relative;
  z-index: 1;
}

.container {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
}

.main {
  padding: 0 0 2.5rem;
}

.heroFull {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 4rem 0 3.75rem;
  position: relative;
}

.heroHeader {
  max-width: 900px;
}

.heroEyebrow {
  margin: 0 0 1rem;
  text-transform: uppercase;
  letter-spacing: 0.28rem;
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.92rem;
}

.heroTitle {
  margin: 0;
  font-size: clamp(3.2rem, 7vw, 5.2rem);
  letter-spacing: 1.4px;
  text-transform: uppercase;
  line-height: 1.05;
  text-shadow: 0 10px 45px rgba(0, 0, 0, 0.75);
}

.heroSubtitle {
  margin: 1rem 0 0;
  font-size: clamp(1.35rem, 2.8vw, 2.1rem);
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 1px;
  text-transform: uppercase;
  text-shadow: 0 10px 45px rgba(0, 0, 0, 0.75);
}

.heroCopy {
  margin: 1.5rem auto 0;
  max-width: 760px;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.8;
}

.heroStoryButton {
  margin-top: 1.35rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(96, 165, 250, 0.12));
  color: #fff;
  padding: 0.9rem 1.4rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-weight: 800;
}

.scrollHint {
  position: absolute;
  left: 50%;
  bottom: 6rem;
  transform: translateX(-50%);
  text-decoration: none;
  color: rgba(255, 255, 255, 0.95);
  padding: 0.6rem 1.2rem;
}

.scrollHint__arrow {
  display: block;
  font-size: 3.1rem;
  line-height: 1;
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.35), 0 0 26px rgba(255, 255, 255, 0.18), 0 18px 40px rgba(0, 0, 0, 0.55);
  animation: blinkDown 1.5s ease-in-out infinite;
}

@keyframes blinkDown {
  0% { opacity: 0.2; transform: translateY(-8px) scale(2); }
  50% { opacity: 1; transform: translateY(8px) scale(2.5); }
  100% { opacity: 0.2; transform: translateY(-8px) scale(2); }
}

/* Planet animations */
@keyframes orbitSlow {
  0% { transform: translateX(-80px) translateY(-60px); }
  100% { transform: translateX(80px) translateY(60px); }
}

@keyframes orbitMedium {
  0% { transform: translateX(100px) translateY(-50px); }
  100% { transform: translateX(-100px) translateY(80px); }
}

@keyframes orbitFast {
  0% { transform: translateX(-90px) translateY(40px); }
  100% { transform: translateX(70px) translateY(-70px); }
}

@keyframes orbitSlow2 {
  0% { transform: translateX(60px) translateY(80px); }
  100% { transform: translateX(-110px) translateY(-40px); }
}

@keyframes orbitMedium2 {
  0% { transform: translateX(-70px) translateY(100px); }
  100% { transform: translateX(90px) translateY(-80px); }
}

.planet {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
  opacity: 0.9;
  z-index: 0;
  box-shadow: inset -8px -8px 20px rgba(0, 0, 0, 0.6), inset 2px 2px 10px rgba(255, 255, 255, 0.3);
}

/* Fallback gradient wenn kein Bild vorhanden */
.planet--1 {
  width: 50px;
  height: 50px;
  top: 20%;
  left: 15%;
  animation: orbitSlow 28s ease-in-out infinite;
  background:
    radial-gradient(circle at 65% 35%, rgba(255, 220, 120, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 35% 65%, rgba(255, 150, 80, 0.3) 0%, transparent 50%),
    conic-gradient(from 0deg at 30% 30%,
      rgba(255, 200, 100, 1) 0deg,
      rgba(255, 180, 80, 1) 45deg,
      rgba(220, 140, 60, 1) 90deg,
      rgba(200, 120, 50, 1) 135deg,
      rgba(255, 200, 100, 1) 180deg,
      rgba(255, 180, 80, 1) 225deg,
      rgba(220, 140, 60, 1) 270deg,
      rgba(200, 120, 50, 1) 315deg,
      rgba(255, 200, 100, 1) 360deg
    );
}

.planet--1::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 255, 200, 0.2) 0%, transparent 30%),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.05) 2px,
      rgba(0, 0, 0, 0.05) 4px
    );
  pointer-events: none;
}

.planet--2 {
  width: 40px;
  height: 40px;
  top: 35%;
  right: 18%;
  animation: orbitMedium 32s ease-in-out infinite;
  background:
    radial-gradient(circle at 60% 40%, rgba(150, 180, 255, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(100, 150, 220, 0.3) 0%, transparent 50%),
    conic-gradient(from 45deg at 40% 40%,
      rgba(100, 150, 255, 1) 0deg,
      rgba(80, 130, 240, 1) 60deg,
      rgba(60, 110, 220, 1) 120deg,
      rgba(40, 80, 180, 1) 180deg,
      rgba(60, 110, 220, 1) 240deg,
      rgba(80, 130, 240, 1) 300deg,
      rgba(100, 150, 255, 1) 360deg
    );
}

.planet--2::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(circle at 40% 40%, rgba(200, 220, 255, 0.25) 0%, transparent 35%),
    repeating-radial-gradient(
      circle at 50% 50%,
      transparent 0px,
      transparent 3px,
      rgba(0, 0, 0, 0.08) 3px,
      rgba(0, 0, 0, 0.08) 6px
    );
  pointer-events: none;
}

.planet--3 {
  width: 55px;
  height: 55px;
  bottom: 25%;
  left: 12%;
  animation: orbitFast 24s ease-in-out infinite;
  background:
    radial-gradient(circle at 50% 30%, rgba(255, 180, 180, 0.4) 0%, transparent 45%),
    radial-gradient(circle at 30% 50%, rgba(200, 100, 100, 0.35) 0%, transparent 50%),
    conic-gradient(from 90deg at 35% 35%,
      rgba(255, 150, 150, 1) 0deg,
      rgba(230, 100, 100, 1) 60deg,
      rgba(200, 80, 80, 1) 120deg,
      rgba(180, 60, 60, 1) 180deg,
      rgba(200, 80, 80, 1) 240deg,
      rgba(230, 100, 100, 1) 300deg,
      rgba(255, 150, 150, 1) 360deg
    );
}

.planet--3::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 35%, rgba(255, 200, 200, 0.3) 0%, transparent 40%),
    repeating-linear-gradient(
      120deg,
      transparent,
      transparent 1.5px,
      rgba(0, 0, 0, 0.06) 1.5px,
      rgba(0, 0, 0, 0.06) 3px
    );
  pointer-events: none;
}

.planet--4 {
  width: 45px;
  height: 45px;
  top: 55%;
  right: 10%;
  animation: orbitSlow2 30s ease-in-out infinite;
  background:
    radial-gradient(circle at 55% 45%, rgba(220, 200, 120, 0.35) 0%, transparent 48%),
    radial-gradient(circle at 35% 55%, rgba(180, 160, 80, 0.3) 0%, transparent 50%),
    conic-gradient(from 180deg at 38% 38%,
      rgba(200, 180, 100, 1) 0deg,
      rgba(180, 160, 80, 1) 60deg,
      rgba(160, 140, 60, 1) 120deg,
      rgba(140, 120, 40, 1) 180deg,
      rgba(160, 140, 60, 1) 240deg,
      rgba(180, 160, 80, 1) 300deg,
      rgba(200, 180, 100, 1) 360deg
    );
}

.planet--4::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(circle at 38% 38%, rgba(240, 220, 150, 0.25) 0%, transparent 38%),
    repeating-conic-gradient(
      from 0deg at 50% 50%,
      transparent 0deg,
      transparent 20deg,
      rgba(0, 0, 0, 0.04) 20deg,
      rgba(0, 0, 0, 0.04) 40deg
    );
  pointer-events: none;
}

.planet--5 {
  width: 48px;
  height: 48px;
  bottom: 20%;
  right: 20%;
  animation: orbitMedium2 26s ease-in-out infinite;
  background:
    radial-gradient(circle at 60% 40%, rgba(180, 220, 180, 0.35) 0%, transparent 48%),
    radial-gradient(circle at 40% 60%, rgba(130, 180, 130, 0.3) 0%, transparent 50%),
    conic-gradient(from 270deg at 42% 42%,
      rgba(150, 200, 150, 1) 0deg,
      rgba(120, 170, 120, 1) 60deg,
      rgba(100, 150, 100, 1) 120deg,
      rgba(80, 130, 80, 1) 180deg,
      rgba(100, 150, 100, 1) 240deg,
      rgba(120, 170, 120, 1) 300deg,
      rgba(150, 200, 150, 1) 360deg
    );
}

.planet--5::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(circle at 42% 42%, rgba(200, 240, 200, 0.25) 0%, transparent 38%),
    repeating-linear-gradient(
      75deg,
      transparent,
      transparent 2px,
      rgba(255, 255, 255, 0.05) 2px,
      rgba(255, 255, 255, 0.05) 4px
    );
  pointer-events: none;
}

.stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding-top: 1.75rem;
}

.librarySection {
  width: min(1120px, 100%);
  display: grid;
  gap: 1.4rem;
}

.libraryIntro {
  text-align: center;
  padding: 0 1rem;
}

.libraryLabel {
  margin: 0 0 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.24rem;
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.84rem;
}

.sectionTitle {
  margin: 0 0 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.9px;
  font-size: 1.25rem;
}

.sectionTitle--large {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
}

.libraryCopy {
  margin: 0 auto;
  max-width: 720px;
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.75;
}

.libraryCarousel {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(220px, 280px);
  gap: 1rem;
  overflow-x: auto;
  padding: 0.6rem 0.2rem 1.2rem;
  scroll-snap-type: x mandatory;
}

.coverCard {
  scroll-snap-align: center;
}

.coverCard__button {
  position: relative;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 1.2rem;
  overflow: hidden;
  aspect-ratio: 2 / 3;
  padding: 0;
  background: rgba(8, 12, 28, 0.8);
  cursor: pointer;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.coverCard__button img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.coverCard__button:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.35);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.45);
}

.coverCard__button:disabled {
  cursor: not-allowed;
}

.coverCard__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.12) 42%, rgba(0, 0, 0, 0.7) 100%);
}

.coverCard__overlay--locked {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.62) 0%, rgba(0, 0, 0, 0.86) 100%);
}

.coverCard--locked img {
  filter: brightness(0.55) saturate(0.8);
}

.coverCard__lock {
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  z-index: 2;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.48);
  background: rgba(0, 0, 0, 0.58);
  display: grid;
  place-items: center;
  color: #fff;
}

.coverCard__lock svg {
  width: 1.1rem;
  height: 1.1rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.coverCard__title {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 1rem;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-size: 1.08rem;
  color: #fff;
  text-shadow: 0 8px 20px rgba(0, 0, 0, 0.9);
}

.galaxyAccent {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 1;
  background: radial-gradient(420px 320px at var(--mx) var(--my), rgba(37, 99, 235, 0.2) 0%, rgba(37, 99, 235, 0.08) 36%, rgba(0, 0, 0, 0) 72%),
    radial-gradient(420px 320px at var(--mx2) var(--my2), rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.08) 36%, rgba(0, 0, 0, 0) 72%);
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
  width: 140px;
  height: 140px;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  filter: blur(24px);
  opacity: 0.55;
}

.cursorPulse::before {
  left: var(--mx);
  top: var(--my);
  background: radial-gradient(circle, rgba(37, 99, 235, 0.66) 0%, rgba(37, 99, 235, 0) 70%);
}

.cursorPulse::after {
  left: var(--mx2);
  top: var(--my2);
  background: radial-gradient(circle, rgba(239, 68, 68, 0.66) 0%, rgba(239, 68, 68, 0) 70%);
}

.sourcesSection {
  width: min(1120px, 100%);
  display: grid;
  gap: 1.4rem;
  margin-top: 3rem;
  padding: 2rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.sourcesIntro {
  text-align: center;
  padding: 0 1rem;
}

.sourcesCopy {
  margin: 0;
  color: rgba(255, 255, 255, 0.68);
}

.sourcesList {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 0.4rem;
}

.sourcesList ul {
  list-style: decimal-leading-zero;
  padding: 0 0 0 1.5rem;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

.sourcesList li {
  padding: 1.05rem 1.2rem;
  border-radius: 0.7rem;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.11);
  transition: background 200ms ease, border-color 200ms ease;
  line-height: 1.5;
}

.sourcesList li:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
}

.sourcesList a {
  color: #9cc9ff;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 200ms ease;
}

.sourcesList a:hover {
  color: #b8d9ff;
  text-decoration: underline;
}

@media (max-width: 860px) {
  .sourcesList ul {
    grid-template-columns: 1fr;
  }
}
</style>
