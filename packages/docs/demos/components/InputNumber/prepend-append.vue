<template>
  <div>
    <h-grid :gap="12">
      <h-grid-item :span="12">
        <h-input-number :min="0">
          <template #prepend>
            Age:
          </template>
        </h-input-number>
      </h-grid-item>
      <h-grid-item :span="12">
        <h-input-number controls-position="between" :min="0">
          <template #append>
            Points
          </template>
        </h-input-number>
      </h-grid-item>
    </h-grid>
    <h-grid :gap="12">
      <h-grid-item :span="24">
        <h-input-number :min="0" :clearable="true" placeholder="The Age...">
          <template #prepend>
            <h-select v-model="ageType" placeholder="Solar or Lunar" clearable>
              <h-option label="Solar Age" value="1"></h-option>
              <h-option label="Lunar Age" value="2"></h-option>
            </h-select>
          </template>
        </h-input-number>
      </h-grid-item>
    </h-grid>
    <h-grid :gap="12">
      <h-grid-item :span="24">
        <h-input-number :min="0" :clearable="true" placeholder="The Weight...">
          <template #append>
            <h-select v-model="weightUnit" placeholder="Kg or g" clearable>
              <h-option label="Kg" value="1"></h-option>
              <h-option label="g" value="2"></h-option>
            </h-select>
          </template>
        </h-input-number>
      </h-grid-item>
    </h-grid>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const ageType = ref(null);
const weightUnit = ref(null);
</script>
