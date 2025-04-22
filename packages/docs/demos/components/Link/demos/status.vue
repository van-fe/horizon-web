<template>
  <n-link :href="randomHref">Will Visit</n-link>
  <n-link :href="currentHref">Already Visited</n-link>
  <n-link disabled>Disabled</n-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  computed: {
    currentHref() {
      return window.location.href;
    },
    randomHref() {
      return '?' + Math.round(Math.random() * 1000000);
    },
  },
});
</script>
