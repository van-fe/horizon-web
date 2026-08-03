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
  <h-grid :gap="12" align="center">
    <h-grid-item :span="{ xs: 24, sm: 12, md: 6 }">
      <h-color-picker v-model="inputColor" editable />
    </h-grid-item>
    <h-grid-item :span="{ xs: 24, sm: 12, md: 6 }">
      <h-button size="medium" @click="setColor">生成</h-button>
    </h-grid-item>
    <h-grid-item :span="24">
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
    </h-grid-item>
  </h-grid>
</template>

<style scoped>
.color-palettes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
  overflow: hidden;
  border-radius: 10px;
}

.color-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 64px;
  font-size: 12px;
  font-weight: 600;
}
</style>
