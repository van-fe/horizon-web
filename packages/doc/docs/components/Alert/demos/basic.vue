<template>
  <h-button @click="visible = !visible">Basic</h-button>
  <h-alert :closable="visible" description="Info Text" type="info" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>
