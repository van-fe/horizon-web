<template>
  <div>
    <h-button @click="visible = true">Show Modal</h-button>
    <div
      v-if="visible"
      v-event-outside="{
        handler: () => {
          visible = false;
        },
        events: ['mousedown']
      }"
      class="absolute mt-2 p-10 bg-white shadow"
      style="z-index: 30;"
    >
      Modal
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
</script>
