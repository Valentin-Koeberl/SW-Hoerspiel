<template>
  <div class="page">
    <div class="galaxy" aria-hidden="true">
      <div class="stars stars--1"></div>
      <div class="stars stars--2"></div>
      <div class="stars stars--3"></div>
      <div class="galaxyAccent"></div>
      <div class="cursorPulse" aria-hidden="true"></div>
    </div>

    <main class="container main" role="main">
      <section class="heroFull" aria-label="Hero">
        <header class="heroHeader" role="banner">
          <p class="heroEyebrow">Interaktives Star Wars Hoerspiel</p>
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
              Jedes Kapitel kann mehrere Audio-Lanes enthalten. Nach jeder Lane kann eine Frage erscheinen, deren
              Antwort über Buttons die nächste Audio bestimmt.
            </p>
          </div>

          <div class="libraryGrid">
            <article
              v-for="chapter in chapters"
              :key="chapter.id"
              class="chapterCard"
              :class="{ 'chapterCard--locked': !chapter.isPlayable }"
            >
              <div class="chapterCard__media">
                <img :src="chapter.coverImage" :alt="chapter.title" loading="lazy" />
                <span class="chapterCard__status">{{ chapter.status }}</span>
              </div>

              <div class="chapterCard__body">
                <p class="chapterCard__tagline">{{ chapter.tagline }}</p>
                <h3 class="chapterCard__title">{{ chapter.title }}</h3>
                <p class="chapterCard__subtitle">{{ chapter.subtitle }}</p>
                <p class="chapterCard__description">{{ chapter.description }}</p>

                <div class="chapterCard__meta">
                  <span>{{ chapter.segments.length }} Sounds</span>
                  <span>{{ chapter.id }}</span>
                </div>

                <button
                  class="chapterCard__button"
                  type="button"
                  :disabled="!chapter.isPlayable"
                  @click="openChapter(chapter.id)"
                >
                  {{ chapter.isPlayable ? "Kapitel öffnen" : "Noch keine Audios" }}
                </button>
              </div>
            </article>
          </div>
        </section>

      </section>
    </main>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { chapters, project } from "../data/audioBooks";
import { router } from "../router";

const BASE = import.meta.env.BASE_URL;

const images = {
  cloneWars: `${BASE}audiobooks/Akt3/Pictutes/Klonarmee.webp`,
  jediCouncil: `${BASE}/Rat_der_jedi.webp`,
  separatists: `${BASE}/star_wars_separatist_logo_desktop_wallpaper_by_swmand4_d9hwtxc-fullview.jpg`,
};

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

.libraryGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
}

.chapterCard {
  position: relative;
  overflow: hidden;
  border-radius: 1.4rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)), rgba(5, 8, 18, 0.78);
  box-shadow: 0 20px 70px rgba(0, 0, 0, 0.28);
}

.chapterCard--locked {
  opacity: 0.78;
}

.chapterCard__media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.chapterCard__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.chapterCard__media::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.5));
}

.chapterCard__status {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 1;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  background: rgba(11, 16, 33, 0.76);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.78rem;
  letter-spacing: 0.08rem;
  text-transform: uppercase;
}

.chapterCard__body {
  padding: 1.2rem 1.2rem 1.35rem;
}

.chapterCard__tagline {
  margin: 0 0 0.55rem;
  color: #9cc9ff;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-size: 0.82rem;
}

.chapterCard__title {
  margin: 0;
  font-size: 1.5rem;
}

.chapterCard__subtitle {
  margin: 0.45rem 0 0;
  color: rgba(255, 255, 255, 0.88);
}

.chapterCard__description {
  margin: 1rem 0 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.7;
}

.chapterCard__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.58);
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.06rem;
}

.chapterCard__button {
  margin-top: 1.15rem;
  width: 100%;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.52);
  background: linear-gradient(115deg, rgba(37, 99, 235, 0.28), rgba(239, 68, 68, 0.24));
  color: #fff;
  padding: 0.9rem 1rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-weight: 800;
  transition: transform 140ms ease, box-shadow 160ms ease, filter 160ms ease;
}

.chapterCard__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.34);
  filter: brightness(1.06);
}

.chapterCard__button:disabled {
  opacity: 0.58;
  filter: grayscale(0.2);
  transform: none;
  box-shadow: none;
  cursor: not-allowed;
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

@media (max-width: 860px) {
  .libraryGrid {
    grid-template-columns: 1fr;
  }
}
</style>
