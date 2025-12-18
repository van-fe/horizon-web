<template>
  <n-row>
    <n-col :span="6">
      <div class="demo-title">
        单选
      </div>
      <n-modal-cascader v-model="currentVal1" :filterable="true" :options="options" need-confirm :to-body="false" />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">
        多选
      </div>
      <n-modal-cascader v-model="currentVal2" :filterable="true" :options="options" multiple need-confirm :to-body="false" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentVal1 = ref<string[]>([]);
const currentVal2 = ref<string[][]>([]);

const options = ref([]);
fetch(
  'https://static.nio.com/fx-static/horizon-web/clhoirqpc0000088sgljrau3o/cascader-options.json',
).then(res => {
  res.json().then(value => {
    options.value = value;
  });
});
</script>
