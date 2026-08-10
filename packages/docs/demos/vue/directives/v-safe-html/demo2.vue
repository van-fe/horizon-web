<template>
  <div
    v-safe-html="{
      html,
      options: {
        ALLOWED_TAGS: ['span', 'p'],
        ALLOWED_ATTR: ['style'],
      },
    }"
  ></div>
</template>

<script lang="ts" setup>
const html = `<div id="my-div"><span class="my-span" style="color: red;">some text</span></div>`;
</script>
