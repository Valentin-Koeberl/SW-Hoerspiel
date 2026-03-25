<template>
  <div class="story-page">
    <div class="galaxy" aria-hidden="true">
      <div class="stars stars--1"></div>
      <div class="stars stars--2"></div>
      <div class="stars stars--3"></div>
      <div class="galaxyAccent"></div>
      <div class="cursorPulse"></div>
    </div>

    <main class="story-page__main">
      <div class="story-page__topbar">
        <button class="story-page__back" type="button" @click="goHome">Zurück</button>
      </div>

      <section class="story-hero">
        <p class="story-hero__eyebrow">Vorgeschichte</p>
        <h1 class="story-hero__title">Die Schatten vor dem Einsatz</h1>
        <p class="story-hero__lead">
          Noch bevor Trupp 705 den ersten Befehl empfängt, liegt ein kaum hörbares Zittern über der Galaxis: ein Krieg,
          der jede Gewissheit aushöhlt, und ein Auftrag, der mehr verschweigt als erklärt.
        </p>
      </section>

      <section class="story-grid">
        <article class="story-panel">
          <div class="story-panel__media">
            <img :src="images.cloneWars" alt="Klonkriege" />
          </div>
          <div class="story-panel__body">
            <p class="story-panel__label">I. Der Krieg</p>
            <h2>Klonkriege</h2>
            <p>
              Die Frontlinien wandern wie Brandnarben über die Sternenkarten. Regimenter verschwinden in stillen
              Sektoren, während neue Einheiten ohne Fragen nachrücken. Für die Klone ist Krieg kein Ausnahmezustand mehr,
              sondern Takt, Atem und tägliche Pflicht.
            </p>
            <p>
              Trupp 705 lebt in diesem Rhythmus aus Alarm, Marsch und Funkrauschen. Jeder Einsatz verspricht Klarheit,
              doch jeder neue Befehl hinterlässt mehr Zweifel als zuvor.
            </p>
          </div>
        </article>

        <article class="story-panel story-panel--reverse">
          <div class="story-panel__media">
            <img :src="images.jediCouncil" alt="Rat der Jedi" />
          </div>
          <div class="story-panel__body">
            <p class="story-panel__label">II. Die Stille des Rats</p>
            <h2>Rat der Jedi</h2>
            <p>
              Im Tempel spricht man von Balance, von Verantwortung und von der Last, den richtigen Weg zu erkennen. Doch
              zwischen den Worten des Rates bleibt Raum für Unsicherheit, und genau in diesem Raum entstehen die
              gefährlichsten Befehle.
            </p>
            <p>
              Nicht jede Mission wird ausgesprochen, wie sie gemeint ist. Manche werden in Höflichkeit verpackt, obwohl
              sie längst nach Verrat riechen.
            </p>
          </div>
        </article>

        <article class="story-panel">
          <div class="story-panel__media">
            <img :src="images.separatists" alt="Separatisten" />
          </div>
          <div class="story-panel__body">
            <p class="story-panel__label">III. Der unsichtbare Gegner</p>
            <h2>Separatisten</h2>
            <p>
              Die eigentliche Bedrohung zeigt sich selten offen. Ein verschwundener Konvoi, ein verstummtes Signal, eine
              falsche Koordinate: So beginnen die Geschichten, die niemand erzählen will.
            </p>
            <p>
              Als Trupp 705 nach Vantorra IX verlegt wird, wirkt der Auftrag zunächst gewöhnlich. Doch gerade das
              Gewöhnliche ist in diesem Krieg oft nur die Maske von etwas Größerem.
            </p>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { router } from "../router";

const BASE = import.meta.env.BASE_URL;

const images = {
  cloneWars: `${BASE}audiobooks/Akt3/Pictutes/Klonarmee.webp`,
  jediCouncil: `${BASE}/Rat_der_jedi.webp`,
  separatists: `${BASE}/star_wars_separatist_logo_desktop_wallpaper_by_swmand4_d9hwtxc-fullview.jpg`,
};

function goHome() {
  router.push("/");
}

function onMouseMove(e) {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  document.documentElement.style.setProperty("--mx", `${(x * 100 - 4.5).toFixed(2)}%`);
  document.documentElement.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
  document.documentElement.style.setProperty("--mx2", `${(x * 100 + 4.5).toFixed(2)}%`);
  document.documentElement.style.setProperty("--my2", `${(y * 100).toFixed(2)}%`);
}

onMounted(() => window.addEventListener("mousemove", onMouseMove, { passive: true }));
onBeforeUnmount(() => window.removeEventListener("mousemove", onMouseMove));
</script>

<style scoped>
.story-page {
  min-height: 100dvh;
  position: relative;
  color: var(--sw-text);
}

.story-page__main {
  position: relative;
  z-index: 1;
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 1rem 0 6rem;
}

.story-page__topbar {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
}

.story-page__back {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  padding: 0.75rem 1rem;
}

.story-hero {
  text-align: center;
  max-width: 880px;
  margin: 0 auto 2rem;
}

.story-hero__eyebrow {
  margin: 0 0 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.22rem;
  color: rgba(255, 255, 255, 0.62);
}

.story-hero__title {
  margin: 0;
  font-size: clamp(2.6rem, 6vw, 4.6rem);
  line-height: 1.05;
  text-transform: uppercase;
}

.story-hero__lead {
  margin: 1.35rem auto 0;
  max-width: 760px;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.9;
  font-size: 1.04rem;
}

.story-grid {
  display: grid;
  gap: 1.4rem;
}

.story-panel {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 1.25rem;
  align-items: stretch;
  border-radius: 1.6rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.story-panel--reverse {
  grid-template-columns: 1.05fr 0.95fr;
}

.story-panel--reverse .story-panel__media {
  order: 2;
}

.story-panel__media img {
  width: 100%;
  height: 100%;
  min-height: 360px;
  object-fit: cover;
  display: block;
}

.story-panel__body {
  padding: 1.5rem;
}

.story-panel__label {
  margin: 0 0 0.5rem;
  color: #9cc9ff;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  font-size: 0.82rem;
}

.story-panel__body h2 {
  margin: 0;
  font-size: 1.9rem;
  text-transform: uppercase;
}

.story-panel__body p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
}

@media (max-width: 900px) {
  .story-panel,
  .story-panel--reverse {
    grid-template-columns: 1fr;
  }

  .story-panel--reverse .story-panel__media {
    order: 0;
  }
}
</style>
