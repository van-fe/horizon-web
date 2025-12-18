<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <n-cascader v-model="currentVal1" :options="options" expand-trigger="click" :to-body="false">
        <template #selectRender>你的选择是：{{ currentVal1.join('+') }}</template>
      </n-cascader>
    </n-col>
  </n-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);

    const options = ref([]);
    fetch(
      'https://static.nio.com/fx-static/lego/clhoirqpc0000088sgljrau3o/cascader-options.json',
    ).then(res => {
      res.json().then(value => {
        options.value = value;
      });
    });

    return {
      currentVal1,
      options,
    };
  },
});
</script>
