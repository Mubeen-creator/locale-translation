<script setup>
import heavy from "@/assets/heavy.jpg";
import { useI18n } from "vue-i18n";
import { registerProfileTranslations } from "@/i18n/sections/profile.js";

// Register profile section translations - this ensures they're bundled with this component
const i18nInstance = useI18n();
registerProfileTranslations(i18nInstance);

const assets = {
  critical: ["/css/profile.css"],
  high: [],
  normal: [heavy],
};
</script>

<template>
  <div>
    <h1>{{ $t('profile.page.title') }}</h1>
    <p>{{ $t('profile.page.description') }}</p>
    <img :src="heavy" alt="Heavy Image" />
  </div>
</template>

<style scoped></style>
