<script setup lang="ts">
import { ref } from 'vue';

const disabled = ref(false);
</script>

<template>
  <h-form label-position="left" label-width="fit-content">
    <h-form-item label="disabled">
      <h-radio-group v-model="disabled">
        <h-radio :value="true">True</h-radio>
        <h-radio :value="false">False</h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <div class="grid-buttons">
    <div>Default</div>
    <div>Plain</div>
    <div>Text</div>
    <div>Link</div>
    <div>Ghost</div>
    <div><h-button color="brand" :disabled="disabled">brand</h-button></div>
    <div><h-button color="indigo" :disabled="disabled" :plain="true">indigo</h-button></div>
    <div><h-button color="purple" :disabled="disabled" :text="true">purple</h-button></div>
    <div><h-button color="magenta" :disabled="disabled" :link="true">magenta</h-button></div>
    <div>
      <h-button color="orange" :disabled="disabled" :plain="true" :ghost="true">orange</h-button>
    </div>
    <div><h-button color="#595E72" :disabled="disabled">#595E72</h-button></div>
    <div><h-button color="#00B3BE" :disabled="disabled" :plain="true">#00B3BE</h-button></div>
    <div><h-button color="#1880F2" :disabled="disabled" :text="true">#1880F2</h-button></div>
    <div><h-button color="#FD8C08" :disabled="disabled" :link="true">#FD8C08</h-button></div>
    <div>
      <h-button color="#26BD4B" :disabled="disabled" :plain="true" :ghost="true">#26BD4B</h-button>
    </div>
  </div>
</template>

<style scoped>
.grid-buttons {
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(5, 1fr);
  grid-gap: 8px;
}

.grid-buttons > div {
  text-align: center;
  padding: 4px;
}

.grid-buttons > div:nth-child(10),
.grid-buttons > div:nth-child(15) {
  background: rgba(69, 69, 69, 1);
}
</style>
