<script setup lang="ts">
import { ref } from 'vue';

const value = ref(false);
</script>

<template>
  <h-switch
    v-model="value"
    status
    status-position="inside"
    status-on-text="ON"
    status-off-text="OFF"
  />
  <h-switch
    v-model="value"
    class="ml-4"
    size="large"
    status
    status-position="inside"
    status-on-text="开"
    status-off-text="关"
  />
</template>
