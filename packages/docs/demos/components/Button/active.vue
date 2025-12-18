<template>
  <div class="grid">
    <div><n-button :active="true">Primary Button</n-button></div>
    <div><n-button :active="true" type="danger">Danger Button</n-button></div>
    <div></div>
    <div><n-button :plain="true" :active="true">Primary Plain Button</n-button></div>
    <div><n-button :plain="true" :active="true" type="danger">Danger Plain Button</n-button></div>
    <div><n-button :plain="true" :active="true" type="normal">Normal Plain Button</n-button></div>
    <div><n-button :text="true" :active="true">Primary Text Button</n-button></div>
    <div><n-button :text="true" :active="true" type="danger">Danger Text Button</n-button></div>
    <div><n-button :text="true" :active="true" type="normal">Normal Text Button</n-button></div>
    <div><n-button :link="true" :active="true">Primary Link Button</n-button></div>
    <div><n-button :link="true" :active="true" type="danger">Danger Link Button</n-button></div>
    <div><n-button :link="true" :active="true" type="normal">Normal Link Button</n-button></div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped>
.grid {
  width: fit-content;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.grid > div {
  text-align: center;
}
</style>
