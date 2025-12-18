<template>
  <n-link :href="randomHref" :underline="false" icon="share" icon-suffix="2xs">
    Open New Link
  </n-link>
  <n-link :href="currentHref" :underline="false" icon="share" icon-suffix="2xs">
    Open Visited Link
  </n-link>
  <n-link :href="randomHref" :underline="false" icon="share" icon-suffix="2xs" disabled>
    Disable Open Link
  </n-link>
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
