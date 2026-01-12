<template>
  <h-link :href="randomHref">Will Visit</h-link>
  <h-link :href="currentHref">Already Visited</h-link>
  <h-link disabled>Disabled</h-link>
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
