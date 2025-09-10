<script setup>
import { onMounted } from "vue";
import { triggerTranslationForElements } from "@/utils/translationUtils";

onMounted(() => {
  // Trigger translation for elements with data-translate attribute
  setTimeout(() => {
    triggerTranslationForElements();
  }, 100);
});
</script>

<script>
export const assets = {
  critical: ["/css/dashboard.css", "/js/brands.min.js"],
  high: ["/js/vendor-charts.js"],
  normal: ["/images/image.jpg"],
};
</script>

<template>
  <section class="dashboard-overview-creator">
    <h2 data-translate="dashboard.sections.myMedia.title">{{ $t('dashboard.sections.myMedia.title') }}</h2>
    <p data-translate="dashboard.sections.myMedia.description">{{ $t('dashboard.sections.myMedia.description') }}</p>
    <!-- <img
      src="/images/image.jpg"
      alt="Media Image"
      style="width: 100%; height: auto"
    /> -->
  </section>
</template>

<style scoped>
/* Ensure CSS is applied */
@import "../../assets/css/dashboard.css";
</style>
