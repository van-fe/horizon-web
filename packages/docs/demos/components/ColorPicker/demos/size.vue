<template>
  <ul class="color-picker-demo__size">
    <li>
      <n-color-picker v-model="value1" trigger-type="square" size="small" alpha />
    </li>
    <li>
      <n-color-picker v-model="value1" trigger-type="square" square-text size="small" alpha />
    </li>
    <li>
      <n-color-picker v-model="value1" trigger-type="square" square-text size="small" alpha>
        <template #squareText>
          自定义文本
        </template>
      </n-color-picker>
    </li>
    <li>
      <n-color-picker v-model="value1" trigger-type="square" size="medium" alpha />
    </li>
    <li>
      <n-color-picker v-model="value1" trigger-type="square" square-text size="medium" alpha />
    </li>
    <li>
      <n-color-picker v-model="value1" trigger-type="square" square-text size="medium" alpha>
        <template #squareText>
          自定义文本
        </template>
      </n-color-picker>
    </li>
    <li>
      <n-color-picker v-model="value1" trigger-type="square" size="large" alpha />
    </li>
    <li>
      <n-color-picker v-model="value1" trigger-type="square" square-text size="large" alpha />
    </li>
    <li>
      <n-color-picker v-model="value1" trigger-type="square" square-text size="large" alpha>
        <template #squareText>
          自定义文本
        </template>
      </n-color-picker>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref('#E83030');
</script>

<style scoped>
.color-picker-demo__size {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, min-content);
  grid-row-gap: 12px;
  grid-column-gap: 12px;
}

.color-picker-demo__size li {
  align-self: center;
}
</style>
