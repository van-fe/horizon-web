<template>
  <div class="grid">
    <div><h-button :active="true">Primary Button</h-button></div>
    <div><h-button :active="true" type="danger">Danger Button</h-button></div>
    <div></div>
    <div><h-button :plain="true" :active="true">Primary Plain Button</h-button></div>
    <div><h-button :plain="true" :active="true" type="danger">Danger Plain Button</h-button></div>
    <div><h-button :plain="true" :active="true" type="normal">Normal Plain Button</h-button></div>
    <div><h-button :text="true" :active="true">Primary Text Button</h-button></div>
    <div><h-button :text="true" :active="true" type="danger">Danger Text Button</h-button></div>
    <div><h-button :text="true" :active="true" type="normal">Normal Text Button</h-button></div>
    <div><h-button :link="true" :active="true">Primary Link Button</h-button></div>
    <div><h-button :link="true" :active="true" type="danger">Danger Link Button</h-button></div>
    <div><h-button :link="true" :active="true" type="normal">Normal Link Button</h-button></div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped>
.grid {
  display: grid;
  width: fit-content;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.grid > div {
  text-align: center;
}
</style>
