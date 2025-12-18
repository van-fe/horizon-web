<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <n-modal-cascader v-model="currentVal1" :options="options" multiple :to-body="false">
        <template #tagRender="slotProps">
          <n-tag :key="slotProps.value"><span class="multiple-tag">{{ `${slotProps.label}` ?? '' }}</span></n-tag>
        </template>
      </n-modal-cascader>
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
      'https://static.nio.com/fx-static/horizon-web/clhoirqpc0000088sgljrau3o/cascader-options.json',
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
