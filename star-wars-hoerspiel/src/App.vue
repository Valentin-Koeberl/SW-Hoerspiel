<template>
  <div>
    <RouterView />
    <FloatingDisclaimer />
  </div>
</template>

<script setup>
import { RouterView } from "./router";
import FloatingDisclaimer from "./components/FloatingDisclaimer.vue";
</script>
