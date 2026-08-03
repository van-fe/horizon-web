<script setup lang="ts">
import { computed } from 'vue';

const randomHref = computed(() => '?' + Math.round(Math.random() * 1000000));
</script>

<template>
  <h-link :href="randomHref">Jump to Home in this page</h-link>
  <h-link :href="randomHref" target="_blank">Jump to Home in new window</h-link>
</template>
