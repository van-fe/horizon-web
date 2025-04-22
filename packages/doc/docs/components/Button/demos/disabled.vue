<script setup lang="ts">
</script>

<template>
  <div class="grid">
    <div><n-button :disabled="true">Primary Button</n-button></div>
    <div><n-button type="danger" :disabled="true">Danger Button</n-button></div>
    <div></div>
    <div><n-button :plain="true" :disabled="true">Primary Plain Button</n-button></div>
    <div><n-button type="danger" :plain="true" :disabled="true">Danger Plain Button</n-button></div>
    <div><n-button type="normal" :plain="true" :disabled="true">Normal Plain Button</n-button></div>
    <div class="dark"><n-button :plain="true" :disabled="true" ghost>Primary Plain Ghost Button</n-button></div>
    <div class="dark"><n-button type="danger" :plain="true" :disabled="true" ghost>Danger Plain Ghost Button</n-button></div>
    <div class="dark"><n-button type="normal" :plain="true" :disabled="true" ghost>Normal Plain Ghost Button</n-button></div>
    <div><n-button :text="true" :disabled="true">Primary Text Button</n-button></div>
    <div><n-button type="danger" :text="true" :disabled="true">Danger Text Button</n-button></div>
    <div><n-button type="normal" :text="true" :disabled="true">Normal Text Button</n-button></div>
    <div><n-button :link="true" :disabled="true">Primary Link Button</n-button></div>
    <div><n-button type="danger" :link="true" :disabled="true">Danger Link Button</n-button></div>
    <div><n-button type="normal" :link="true" :disabled="true">Normal Link Button</n-button></div>
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
