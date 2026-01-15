<template>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-cascader v-model="currentVal1" :options="options" filter :to-body="false">
        <template #searchPanelRender="slotProps">
          🐂
          {{ slotProps.paths.map(path => path.label).join('～') }}
        </template>
      </h-cascader>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-cascader v-model="currentVal2" :options="options" filter multiple :to-body="false">
        <template #searchPanelRender="slotProps">
          🐂
          {{ slotProps.paths.map(path => path.label).join('～') }}
        </template>
      </h-cascader>
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
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

    return {
      currentVal1,
      currentVal2,
      options,
    };
  },
});
</script>
