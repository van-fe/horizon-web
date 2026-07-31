<script setup lang="ts">
import { ref } from 'vue';

const value1 = ref(1000);
const value2 = ref(100);

</script>

<template>
  <h-grid :gap="12">
    <h-grid-item :span="8">
      <div class="demo-title">千分位</div>
      <h-input-number
        v-model="value1"
        :formatter="(val: string) => `$ ${val.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`"
        :parser="(val: string) => val.replace(/\$\s?|(,*)/g, '')"
      />
    </h-grid-item>
    <h-grid-item :span="8">
      <div class="demo-title">带百分号</div>
      <h-input-number
        v-model="value2"
        :min="0"
        :max="100"
        :formatter="(value: string) => `${value}%`"
        :parser="(value: string) => value.replace(/%/g, '')"  />
    </h-grid-item>
  </h-grid>
</template>
