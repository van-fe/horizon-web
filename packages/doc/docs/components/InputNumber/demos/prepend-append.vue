<template>
  <div>
    <n-row :gutter="12">
      <n-col :span="12">
        <n-input-number :min="0">
          <template #prepend>
            Age:
          </template>
        </n-input-number>
      </n-col>
      <n-col :span="12">
        <n-input-number controls-position="between" :min="0">
          <template #append>
            Points
          </template>
        </n-input-number>
      </n-col>
    </n-row>
    <n-row :gutter="12">
      <n-col :span="24">
        <n-input-number :min="0" :clearable="true" placeholder="The Age...">
          <template #prepend>
            <n-select v-model="ageType" placeholder="Solar or Lunar" clearable>
              <n-option label="Solar Age" value="1"></n-option>
              <n-option label="Lunar Age" value="2"></n-option>
            </n-select>
          </template>
        </n-input-number>
      </n-col>
    </n-row>
    <n-row :gutter="12">
      <n-col :span="24">
        <n-input-number :min="0" :clearable="true" placeholder="The Weight...">
          <template #append>
            <n-select v-model="weightUnit" placeholder="Kg or g" clearable>
              <n-option label="Kg" value="1"></n-option>
              <n-option label="g" value="2"></n-option>
            </n-select>
          </template>
        </n-input-number>
      </n-col>
    </n-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const ageType = ref(null);
const weightUnit = ref(null);
</script>
