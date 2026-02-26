<template>
  <div class="page">
    <!-- Galaxy background -->
    <div class="galaxy" aria-hidden="true">
      <div class="stars stars--1"></div>
      <div class="stars stars--2"></div>
      <div class="stars stars--3"></div>

      <div class="galaxyAccent"></div>
      <div class="cursorPulse" aria-hidden="true"></div>
    </div>

    <main class="container main" role="main">
      <!-- FULLSCREEN HERO -->
      <section class="heroFull" aria-label="Hero">
        <header class="heroHeader" role="banner">
          <h1 class="heroTitle">Trupp 705</h1>
          <p class="heroSubtitle">vergessen auf Vantorra IX</p>
        </header>

        <button type="button" class="playBtnWhite" @click="start" aria-label="Hörspiel starten">
          <span class="playBtnWhite__icon" aria-hidden="true">▶</span>
          <span class="playBtnWhite__text">Play</span>
        </button>

        <!-- Bigger, perfectly centered scroll hint -->
        <a class="scrollHint" href="#content" aria-label="Runterscrollen">
          <span class="scrollHint__arrow" aria-hidden="true">⌄</span>
        </a>
      </section>

      <!-- CONTENT BELOW HERO -->
      <section id="content" class="stack" aria-label="Landing Inhalt">
        <!-- Vorgeschichte (same background as footer) -->
        <section class="card glassCard" aria-label="Vorgeschichte">
          <h2 class="sectionTitle">Vorgeschichte</h2>

          <div class="storyBlock">
            <div class="storyText">
              <h3>Klon Kriege</h3>
              <p>
                Der Krieg frisst sich durch die Galaxis wie ein endloser Funkspruch: überall Fronten, überall Verluste.
                Trupp 705 wird von Einsatz zu Einsatz geschoben – so oft, dass selbst die Sternenkarten wie
                Wiederholungen wirken. Bis ein Auftrag auftaucht, der nirgends eingetragen ist… und Vantorra IX plötzlich
                mehr als nur ein Punkt im Nichts wird.
              </p>
            </div>
            <figure class="storyImg">
              <img :src="images.cloneWars" alt="Clone Wars Bild" loading="lazy" />
            </figure>
          </div>

          <div class="storyBlock">
            <div class="storyText">
              <h3>Rat der Jedi</h3>
              <p>
                Der Rat spricht von Balance, aber auf dem Schlachtfeld zählt manchmal nur, wer als Letzter steht.
                Zwischen Pflicht und Zweifel entsteht ein Riss: Was, wenn der Auftrag nicht die Wahrheit ist – sondern
                nur die Version, die man weitergeben darf?
              </p>
            </div>
            <figure class="storyImg">
              <img :src="images.jediCouncil" alt="Rat der Jedi Bild" loading="lazy" />
            </figure>
          </div>

          <div class="storyBlock">
            <div class="storyText">
              <h3>Die Separatisten</h3>
              <p>
                Ein stiller Sektor, ein stummes Signal, und plötzlich wirkt jeder Schatten wie eine Falle. Die
                Separatisten sind nicht nur irgendwo da draußen – sie sind in den Lücken der Informationen. Trupp 705
                merkt zu spät: Man kämpft nicht nur gegen Droiden, sondern gegen das, was man nicht sehen soll.
              </p>
            </div>
            <figure class="storyImg">
              <img :src="images.separatists" alt="Separatisten: Bild" loading="lazy" />
            </figure>
          </div>
        </section>

        <!-- Projektmitglieder (same background as footer) -->
        <section class="card glassCard" aria-label="Projektmitglieder">
          <h2 class="sectionTitle">Projektmitglieder</h2>

          <div class="memberGrid">
            <div class="memberCard">
              <div class="memberAvatar">
                <img :src="images.alexander" alt="Profilbild Platzhalter: alexander" loading="lazy" />
              </div>
              <div class="memberInfo">
                <h3>Alexander</h3>
                <p>Hat mehr Takes aufgenommen als ein Klon Helme besitzt.</p>
              </div>
            </div>

            <div class="memberCard">
              <div class="memberAvatar">
                <img :src="images.valentin" alt="Profilbild Platzhalter: Valentin" loading="lazy" />
              </div>
              <div class="memberInfo">
                <h3>Valentin</h3>
                <p>Der Schnitt ist so sauber, selbst Yoda würde „Hmm… perfekt“ sagen.</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>

    <footer class="footer" role="contentinfo">
      <div class="container footer__inner">
        <p class="footer__text">
          <strong>Disclaimer:</strong>
          Diese Website ist ein inoffizielles Fan-Projekt (Schulunterricht). Star Wars und alle zugehörigen
          Marken/Charaktere sind Eigentum der jeweiligen Rechteinhaber (u. a. Lucasfilm Ltd. / The Walt Disney Company).
          Keine offizielle Verbindung oder Unterstützung.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, onBeforeUnmount } from "vue";

const { proxy } = getCurrentInstance();

function start() {
  proxy.$router.push("/player");
}

/**
 * Online placeholder images:
 * Replace these URLs later with your own paths.
 * (placehold.co is stable and simple)
 */
const images = {
  cloneWars: "/Klonarmee.webp",
  jediCouncil: "/Rat_der_jedi.webp",
  separatists: "/star_wars_separatist_logo_desktop_wallpaper_by_swmand4_d9hwtxc-fullview.jpg",
  alexander: "https://placehold.co/256x256/png?text=Alexander",
  valentin: "/Valentin_Profilbild.JPG",
};

function onMouseMove(e) {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  document.documentElement.style.setProperty("--mx", `${(x * 100).toFixed(2)}%`);
  document.documentElement.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);

  document.documentElement.style.setProperty("--mx2", `${(x * 100 - 5).toFixed(2)}%`);
  document.documentElement.style.setProperty("--my2", `${(y * 100 + 5).toFixed(2)}%`);
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

/* Ensure content is above starfield */
.main,
.footer {
  position: relative;
  z-index: 1;
}

.container {
  width: min(1000px, calc(100% - 2rem));
  margin: 0 auto;
}

.main {
  padding: 0 0 2.5rem;
}

/* ===== FULLSCREEN HERO ===== */
.heroFull {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 4rem 0 3.75rem;
  position: relative;
}

.heroHeader {
  margin-bottom: 2rem;
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

/* White play button */
.playBtnWhite {
  border: 1px solid rgba(255, 255, 255, 0.65);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border-radius: 1.2rem;
  padding: 1.05rem 1.6rem;
  cursor: pointer;
  user-select: none;
  transition: transform 140ms ease, filter 160ms ease, box-shadow 180ms ease, background 180ms ease;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  font-weight: 800;
  box-shadow: 0 0 22px rgba(255, 255, 255, 0.12);
}

.playBtnWhite:hover {
  transform: translateY(-2px);
  filter: brightness(1.08);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.55), 0 0 26px rgba(255, 255, 255, 0.16);
}

.playBtnWhite:active {
  transform: translateY(0) scale(0.985);
  filter: brightness(1.12);
}

.playBtnWhite:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.55);
  outline-offset: 4px;
}

.playBtnWhite__icon {
  width: 1.25rem;
  text-align: center;
}

/* ===== Scroll hint (NO CIRCLE, still noticeable) ===== */
.scrollHint {
  position: absolute;
  left: 50%;
  bottom: 6rem;
  transform: translateX(-50%);
  text-decoration: none;
  color: rgba(255, 255, 255, 0.95);

  /* remove circle look */
  width: auto;
  height: auto;
  border: none;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  box-shadow: none;

  /* make clickable area generous */
  padding: 0.6rem 1.2rem;
}

.scrollHint__arrow {
  display: block;
  font-size: 3.1rem;
  line-height: 1;

  /* glow makes it pop on starfield */
  text-shadow:
      0 0 12px rgba(255, 255, 255, 0.35),
      0 0 26px rgba(255, 255, 255, 0.18),
      0 18px 40px rgba(0, 0, 0, 0.55);

  /* subtle pulse + drift */
  animation: blinkDown 1.5s ease-in-out infinite;
  transform-origin: center;
}

.scrollHint:hover .scrollHint__arrow {
  text-shadow:
      0 0 16px rgba(255, 255, 255, 0.55),
      0 0 34px rgba(255, 255, 255, 0.22),
      0 18px 50px rgba(0, 0, 0, 0.65);
}

@keyframes blinkDown {
  0% {
    opacity: 0.20;
    transform: translateY(-8px) scale(2);
    filter: brightness(1);
  }
  50% {
    opacity: 1;
    transform: translateY(8px) scale(2.5);
    filter: brightness(1.15);
  }
  100% {
    opacity: 0.20;
    transform: translateY(-8px) scale(2);
    filter: brightness(1);
  }
}

/* ===== BELOW HERO CONTENT ===== */
.stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding-top: 1.75rem;
}

/* Cards */
.card {
  width: min(900px, 100%);
  border-radius: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.10);
  padding: 1.25rem 1.35rem;
}

/* Same background as footer */
.glassCard {
  position: relative;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.28);
}

.glassCard::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 1.25rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.06) 55%, rgba(0, 0, 0, 0.10) 100%);
}

/* Keep card content above overlay */
.glassCard > * {
  position: relative;
  z-index: 1;
}

.sectionTitle {
  margin: 0 0 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.9px;
  font-size: 1.25rem;
}

.muted {
  margin: 0;
  color: rgba(255, 255, 255, 0.80);
  line-height: 1.7;
}

/* ===== Vorgeschichte Layout ===== */
.storyBlock {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 1.1rem;
  align-items: start;
  padding: 1.1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.storyBlock:first-of-type {
  border-top: none;
  padding-top: 0.25rem;
}
.storyBlock:last-of-type {
  padding-bottom: 0.25rem;
}

.storyText h3 {
  margin: 0 0 0.45rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-size: 1.05rem;
}

.storyText p {
  margin: 0;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.75;
}

/* Placeholder image area now uses real <img> */
.storyImg {
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 1.05rem;
  border: 1px solid rgba(255, 255, 255, 0.10);
  overflow: hidden;
  margin: 0;
  background: rgba(255, 255, 255, 0.03);
}
.storyImg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 860px) {
  .storyBlock {
    grid-template-columns: 1fr;
  }
  .storyImg {
    order: -1;
    aspect-ratio: 16 / 9;
  }
}

/* ===== Projektmitglieder ===== */
.memberGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.9rem;
}
@media (max-width: 760px) {
  .memberGrid {
    grid-template-columns: 1fr;
  }
}

.memberCard {
  display: flex;
  gap: 0.95rem;
  align-items: center;
  padding: 1rem;
  border-radius: 1.15rem;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.03);
}

.memberAvatar {
  width: 72px;
  height: 72px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  overflow: hidden;
  flex: 0 0 auto;
  background: rgba(255, 255, 255, 0.04);
}
.memberAvatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.memberInfo h3 {
  margin: 0 0 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-size: 1.05rem;
}
.memberInfo p {
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.5;
}

/* ===== FOOTER: blur but stars still visible ===== */
.footer {
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 -18px 60px rgba(0, 0, 0, 0.25);
}

.footer::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.06) 55%, rgba(0, 0, 0, 0.10) 100%);
}

.footer__inner {
  padding: 1.1rem 0 1.25rem;
  position: relative;
  z-index: 1;
}

.footer__text {
  margin: 0;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.55;
  font-size: 0.95rem;
}

/* ===== Cursor-follow accents ===== */
.galaxyAccent {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 1;
  background: radial-gradient(420px 320px at var(--mx) var(--my), rgba(37, 99, 235, 0.2) 0%, rgba(37, 99, 235, 0.08) 36%, rgba(0, 0, 0, 0) 72%),
  radial-gradient(420px 320px at var(--mx2) var(--my2), rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.08) 36%, rgba(0, 0, 0, 0) 72%);
  filter: blur(10px);
  mix-blend-mode: screen;
  transition: background-position 120ms ease;
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
</style>
