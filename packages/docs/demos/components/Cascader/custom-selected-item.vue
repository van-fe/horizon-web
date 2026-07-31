<template>
  <h-grid :gap="10">
    <h-grid-item :span="6">
      <h-cascader v-model="currentVal1" :options="options" multiple :to-body="false">
        <template #tagRender="slotProps">
          <h-tag :key="slotProps.value" is-pure><span class="multiple-tag">{{ `${slotProps.label}` ?? '' }}</span></h-tag>
        </template>
      </h-cascader>
    </h-grid-item>
  </h-grid>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);

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
      options,
    };
  },
});
</script>
