<script setup lang="ts">
import { computed } from 'vue';

const randomHref = computed(() => '?' + Math.round(Math.random() * 1000000));
</script>

<template>
  <n-link :href="randomHref">Jump to Home in this page</n-link>
  <n-link :href="randomHref" target="_blank">Jump to Home in new window</n-link>
</template>
