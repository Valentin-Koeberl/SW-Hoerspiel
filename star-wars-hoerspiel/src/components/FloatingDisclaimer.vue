<template>
  <aside v-if="isVisible" class="disclaimer-banner" role="note" aria-live="polite">
    <button class="disclaimer-banner__close" type="button" aria-label="Disclaimer schließen" @click="dismiss">
      ×
    </button>
    <p class="disclaimer-banner__text">
      <strong>Disclaimer:</strong>
      Dieses Projekt ist ein inoffizielles Fan-Projekt. Star Wars und alle zugehörigen Marken, Figuren und Bildwelten
      gehören den jeweiligen Rechteinhabern.
    </p>
  </aside>
</template>

<script setup>
import { ref } from "vue";

const STORAGE_KEY = "sw-hoerspiel-disclaimer-dismissed";
const isVisible = ref(localStorage.getItem(STORAGE_KEY) !== "true");

function dismiss() {
  localStorage.setItem(STORAGE_KEY, "true");
  isVisible.value = false;
}
</script>

<style scoped>
.disclaimer-banner {
  position: fixed;
  left: 50%;
  bottom: 1rem;
  transform: translateX(-50%);
  width: min(920px, calc(100% - 1.5rem));
  padding: 0.95rem 3rem 0.95rem 1rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(8, 10, 20, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.35);
  z-index: 50;
}

.disclaimer-banner__close {
  position: absolute;
  top: 0.55rem;
  right: 0.65rem;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
  color: white;
  font-size: 1rem;
}

.disclaimer-banner__text {
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.55;
  font-size: 0.9rem;
}
</style>
