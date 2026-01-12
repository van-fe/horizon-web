<template>
  <div>
    <h-row :gutter="12">
      <h-col :span="12">
        <h-input-number :min="0">
          <template #prepend>
            Age:
          </template>
        </h-input-number>
      </h-col>
      <h-col :span="12">
        <h-input-number controls-position="between" :min="0">
          <template #append>
            Points
          </template>
        </h-input-number>
      </h-col>
    </h-row>
    <h-row :gutter="12">
      <h-col :span="24">
        <h-input-number :min="0" :clearable="true" placeholder="The Age...">
          <template #prepend>
            <h-select v-model="ageType" placeholder="Solar or Lunar" clearable>
              <h-option label="Solar Age" value="1"></h-option>
              <h-option label="Lunar Age" value="2"></h-option>
            </h-select>
          </template>
        </h-input-number>
      </h-col>
    </h-row>
    <h-row :gutter="12">
      <h-col :span="24">
        <h-input-number :min="0" :clearable="true" placeholder="The Weight...">
          <template #append>
            <h-select v-model="weightUnit" placeholder="Kg or g" clearable>
              <h-option label="Kg" value="1"></h-option>
              <h-option label="g" value="2"></h-option>
            </h-select>
          </template>
        </h-input-number>
      </h-col>
    </h-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const ageType = ref(null);
const weightUnit = ref(null);
</script>
