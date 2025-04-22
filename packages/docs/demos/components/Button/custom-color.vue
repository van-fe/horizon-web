<script setup lang="ts">
import { ref } from 'vue';

const disabled = ref(false);
</script>

<template>
  <n-form label-position="left" label-width="fit-content">
    <n-form-item label="disabled">
      <n-radio-group v-model="disabled">
        <n-radio :value="true">True</n-radio>
        <n-radio :value="false">False</n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <div class="grid-buttons">
    <div>Default</div>
    <div>Plain</div>
    <div>Text</div>
    <div>Link</div>
    <div>Ghost</div>
    <div><n-button color="brand" :disabled="disabled">brand</n-button></div>
    <div><n-button color="indigo" :disabled="disabled" :plain="true">indigo</n-button></div>
    <div><n-button color="purple" :disabled="disabled" :text="true">purple</n-button></div>
    <div><n-button color="magenta" :disabled="disabled" :link="true">magenta</n-button></div>
    <div>
      <n-button color="orange" :disabled="disabled" :plain="true" :ghost="true">orange</n-button>
    </div>
    <div><n-button color="#595E72" :disabled="disabled">#595E72</n-button></div>
    <div><n-button color="#00B3BE" :disabled="disabled" :plain="true">#00B3BE</n-button></div>
    <div><n-button color="#1880F2" :disabled="disabled" :text="true">#1880F2</n-button></div>
    <div><n-button color="#FD8C08" :disabled="disabled" :link="true">#FD8C08</n-button></div>
    <div>
      <n-button color="#26BD4B" :disabled="disabled" :plain="true" :ghost="true">#26BD4B</n-button>
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
