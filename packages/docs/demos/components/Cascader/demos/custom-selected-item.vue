<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <h-cascader v-model="currentVal1" :options="options" multiple :to-body="false">
        <template #tagRender="slotProps">
          <h-tag :key="slotProps.value" is-pure><span class="multiple-tag">{{ `${slotProps.label}` ?? '' }}</span></h-tag>
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
