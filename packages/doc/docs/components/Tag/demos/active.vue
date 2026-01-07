<template>
  <h-row>
    <h-col :span="24">
      <h-tag v-model="active1">Default</h-tag>
      <h-tag v-model="active2" type="success">Success</h-tag>
      <h-tag v-model="active3" type="info">Info</h-tag>
      <h-tag v-model="active4" type="warning">Warning</h-tag>
      <h-tag v-model="active5" type="error">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag v-model="active1" :round="true" @click="onClick">Default</h-tag>
      <h-tag v-model="active2" :round="true" type="success">Success</h-tag>
      <h-tag v-model="active3" :round="true" type="info">Info</h-tag>
      <h-tag v-model="active4" :round="true" type="warning">Warning</h-tag>
      <h-tag v-model="active5" :round="true" type="error">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag v-model="active1" :plain="true">Default</h-tag>
      <h-tag v-model="active2" :plain="true" type="success">Success</h-tag>
      <h-tag v-model="active3" :plain="true" type="info">Info</h-tag>
      <h-tag v-model="active4" :plain="true" type="warning">Warning</h-tag>
      <h-tag v-model="active5" :plain="true" type="error">Error</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag v-model="active1" :plain="true" equally @click="onClick">普</h-tag>
      <h-tag v-model="active2" :plain="true" equally type="success">成</h-tag>
      <h-tag v-model="active3" :plain="true" equally type="info">进</h-tag>
      <h-tag v-model="active4" :plain="true" equally type="warning">警</h-tag>
      <h-tag v-model="active5" :plain="true" equally type="error">错</h-tag>
    </h-col>
  </h-row>
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
