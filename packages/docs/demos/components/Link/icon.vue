<template>
  <h-link :href="randomHref" :underline="false" icon="share" icon-suffix="2xs">
    Open New Link
  </h-link>
  <h-link :href="currentHref" :underline="false" icon="share" icon-suffix="2xs">
    Open Visited Link
  </h-link>
  <h-link :href="randomHref" :underline="false" icon="share" icon-suffix="2xs" disabled>
    Disable Open Link
  </h-link>
</template>

<script>
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
