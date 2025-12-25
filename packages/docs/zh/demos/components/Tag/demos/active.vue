<template>
  <n-row>
    <n-col :span="24">
      <n-tag v-model="active1">Default</n-tag>
      <n-tag v-model="active2" type="success">Success</n-tag>
      <n-tag v-model="active3" type="info">Info</n-tag>
      <n-tag v-model="active4" type="warning">Warning</n-tag>
      <n-tag v-model="active5" type="error">Error</n-tag>
    </n-col>
    <n-col :span="24">
      <n-tag v-model="active1" :round="true" @click="onClick">Default</n-tag>
      <n-tag v-model="active2" :round="true" type="success">Success</n-tag>
      <n-tag v-model="active3" :round="true" type="info">Info</n-tag>
      <n-tag v-model="active4" :round="true" type="warning">Warning</n-tag>
      <n-tag v-model="active5" :round="true" type="error">Error</n-tag>
    </n-col>
    <n-col :span="24">
      <n-tag v-model="active1" :plain="true">Default</n-tag>
      <n-tag v-model="active2" :plain="true" type="success">Success</n-tag>
      <n-tag v-model="active3" :plain="true" type="info">Info</n-tag>
      <n-tag v-model="active4" :plain="true" type="warning">Warning</n-tag>
      <n-tag v-model="active5" :plain="true" type="error">Error</n-tag>
    </n-col>
    <n-col :span="24">
      <n-tag v-model="active1" :plain="true" equally @click="onClick">普</n-tag>
      <n-tag v-model="active2" :plain="true" equally type="success">成</n-tag>
      <n-tag v-model="active3" :plain="true" equally type="info">进</n-tag>
      <n-tag v-model="active4" :plain="true" equally type="warning">警</n-tag>
      <n-tag v-model="active5" :plain="true" equally type="error">错</n-tag>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

function onClick() {
  console.info('click');
}

const active1 = ref(false);
const active2 = ref(false);
const active3 = ref(false);
const active4 = ref(false);
const active5 = ref(false);
</script>

<style scoped></style>
