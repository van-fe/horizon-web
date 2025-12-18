<template>
  <n-row>
    <n-col :span="24">
      <n-tag color="brand" :auto-color="true">Brand</n-tag>
      <n-tag color="indigo" :auto-color="true">Indigo</n-tag>
      <n-tag color="purple" :auto-color="true">Purple</n-tag>
      <n-tag color="magenta" :auto-color="true">Magenta</n-tag>
      <n-tag color="orange" :auto-color="true">Orange</n-tag>
    </n-col>
    <n-col :span="24">
      <n-tag :disabled="true" color="brand" :auto-color="true">Brand</n-tag>
      <n-tag :disabled="true" color="indigo" :auto-color="true">Indigo</n-tag>
      <n-tag :disabled="true" color="purple" :auto-color="true">Purple</n-tag>
      <n-tag :disabled="true" color="magenta" :auto-color="true">Magenta</n-tag>
      <n-tag :disabled="true" color="orange" :auto-color="true">Orange</n-tag>
    </n-col>
    <n-col :span="24">
      <n-tag :plain="true" color="brand" :auto-color="true">Brand</n-tag>
      <n-tag :plain="true" color="indigo" :auto-color="true">Indigo</n-tag>
      <n-tag :plain="true" color="purple" :auto-color="true">Purple</n-tag>
      <n-tag :plain="true" color="magenta" :auto-color="true">Magenta</n-tag>
      <n-tag :plain="true" color="orange" :auto-color="true">Orange</n-tag>
    </n-col>
    <n-col :span="24">
      <n-tag :plain="true" :disabled="true" color="brand" :auto-color="true">Brand</n-tag>
      <n-tag :plain="true" :disabled="true" color="indigo" :auto-color="true">Indigo</n-tag>
      <n-tag :plain="true" :disabled="true" color="purple" :auto-color="true">Purple</n-tag>
      <n-tag :plain="true" :disabled="true" color="magenta" :auto-color="true">Magenta</n-tag>
      <n-tag :plain="true" :disabled="true" color="orange" :auto-color="true">Orange</n-tag>
    </n-col>
  </n-row>
</template>

<script setup lang="ts"></script>

<style scoped></style>
