<script setup lang="ts">
</script>

<template>
  <div class="grid">
    <div><h-button :disabled="true">Primary Button</h-button></div>
    <div><h-button type="danger" :disabled="true">Danger Button</h-button></div>
    <div></div>
    <div><h-button :plain="true" :disabled="true">Primary Plain Button</h-button></div>
    <div><h-button type="danger" :plain="true" :disabled="true">Danger Plain Button</h-button></div>
    <div><h-button type="normal" :plain="true" :disabled="true">Normal Plain Button</h-button></div>
    <div class="dark"><h-button :plain="true" :disabled="true" ghost>Primary Plain Ghost Button</h-button></div>
    <div class="dark"><h-button type="danger" :plain="true" :disabled="true" ghost>Danger Plain Ghost Button</h-button></div>
    <div class="dark"><h-button type="normal" :plain="true" :disabled="true" ghost>Normal Plain Ghost Button</h-button></div>
    <div><h-button :text="true" :disabled="true">Primary Text Button</h-button></div>
    <div><h-button type="danger" :text="true" :disabled="true">Danger Text Button</h-button></div>
    <div><h-button type="normal" :text="true" :disabled="true">Normal Text Button</h-button></div>
    <div><h-button :link="true" :disabled="true">Primary Link Button</h-button></div>
    <div><h-button type="danger" :link="true" :disabled="true">Danger Link Button</h-button></div>
    <div><h-button type="normal" :link="true" :disabled="true">Normal Link Button</h-button></div>
  </div>
</template>

<style scoped>
.grid {
  width: fit-content;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
}

.grid > div {
  text-align: center;
  align-self: center;
  padding: 5px;
}

.dark {
  background: rgba(69, 69, 69, 1);
}
</style>
