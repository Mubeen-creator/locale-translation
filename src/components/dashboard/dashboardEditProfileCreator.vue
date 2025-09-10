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
  critical: ["/css/dashboard.css"],
  high: ["/js/vendor-charts.js"],
  normal: ["/images/above-the-fold-hero.jpg"],
};
</script>

<template>
  <section class="dashboard-overview-creator">
    <h2 data-translate="dashboard.sections.editProfile.title">{{ $t('dashboard.sections.editProfile.title') }}</h2>
    <p data-translate="dashboard.sections.editProfile.description">{{ $t('dashboard.sections.editProfile.description') }}</p>
    <!-- <img
      src="/images/above-the-fold-hero.jpg"
      alt="Hero Image"
      style="width: 100%; height: auto"
    /> -->
  </section>
</template>

<style scoped>
/* Ensure CSS is applied */
@import "../../assets/css/dashboard.css";
</style>
