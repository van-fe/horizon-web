<template>
  <n-button @click="visible = !visible">Basic</n-button>
  <n-alert :closable="visible" description="Info Text" type="info" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>
