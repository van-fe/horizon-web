<template>
  <h-row>
    <h-col :span="24">
      <h-tag color="indigo" :auto-color="true">Indigo</h-tag>
      <h-tag color="purple" :auto-color="true">Purple</h-tag>
      <h-tag color="magenta" :auto-color="true">Magenta</h-tag>
      <h-tag color="orange" :auto-color="true">Orange</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag :disabled="true" color="indigo" :auto-color="true">Indigo</h-tag>
      <h-tag :disabled="true" color="purple" :auto-color="true">Purple</h-tag>
      <h-tag :disabled="true" color="magenta" :auto-color="true">Magenta</h-tag>
      <h-tag :disabled="true" color="orange" :auto-color="true">Orange</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag :plain="true" color="indigo" :auto-color="true">Indigo</h-tag>
      <h-tag :plain="true" color="purple" :auto-color="true">Purple</h-tag>
      <h-tag :plain="true" color="magenta" :auto-color="true">Magenta</h-tag>
      <h-tag :plain="true" color="orange" :auto-color="true">Orange</h-tag>
    </h-col>
    <h-col :span="24">
      <h-tag :plain="true" :disabled="true" color="indigo" :auto-color="true">Indigo</h-tag>
      <h-tag :plain="true" :disabled="true" color="purple" :auto-color="true">Purple</h-tag>
      <h-tag :plain="true" :disabled="true" color="magenta" :auto-color="true">Magenta</h-tag>
      <h-tag :plain="true" :disabled="true" color="orange" :auto-color="true">Orange</h-tag>
    </h-col>
  </h-row>
</template>

<script setup lang="ts"></script>

<style scoped></style>
