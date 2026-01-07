<script setup lang="ts">
import { ref } from 'vue';
import generator, { tinyColor } from '@aurora/colors';

const inputColor = ref('#1890ff');
const color = ref<string[]>([]);

function setColor() {
  color.value = generator(inputColor.value).colors;
}

function textColor(color: string) {
  return tinyColor(color).isDark() ? '#FFF' : '#000';
}

setColor();
</script>

<template>
  <h-row>
    <h-col :span="6">
      <h-color-picker v-model="inputColor" editable />
    </h-col>
    <h-col :span="6">
      <h-button size="medium" @click="setColor">生成</h-button>
    </h-col>
    <h-col :span="24">
      <div class="color-palettes">
        <div
          v-for="(item, index) of color"
          :key="index"
          class="color-item"
          :style="{ background: item, color: textColor(item) }"
        >
          {{ item.toUpperCase() }}
        </div>
      </div>
    </h-col>
  </h-row>
</template>

<style scoped>
.color-palettes {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}

.color-item {
  height: 80px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
