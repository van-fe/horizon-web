<template>
  <h-grid :gap="12">
    <h-grid-item :span="6">
      <div class="demo-title">
        单选
      </div>
      <h-cascader v-model="currentVal1" :filterable="true" :options="options" need-confirm :to-body="false" />
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">
        多选
      </div>
      <h-cascader v-model="currentVal2" :filterable="true" :options="options" multiple need-confirm :to-body="false" />
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([]);

const options = ref([]);
fetch(
  new URL('/cascader-options.json', import.meta.url).href,
).then(res => {
  res.json().then(value => {
    options.value = value;
  });
});
</script>
