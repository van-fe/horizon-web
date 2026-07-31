<template>
  <h-grid :gap="10">
    <h-grid-item :span="6">
      <h-cascader
          ref="cascaderFilterRef"
          v-model="currentVal1"
          :options="options"
          expand-trigger="click"
          :filter="true"
          :to-body="false"
      >
        <template #default="{ visible: panelVisible }">
          <div @click="() => (panelVisible.value = true)">
            完全自定义的内容，可以点击我：
            <p v-if="currentVal1.length > 0">{{ currentVal1 }}</p>
            <h-input v-model="selectRenderInputValue" />
          </div>
        </template>
      </h-cascader>
    </h-grid-item>
  </h-grid>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  setup() {
    const cascaderFilterRef = ref<any>(null);
    const currentVal1 = ref<string[]>([]);
    const selectRenderInputValue = ref('');

    const options = ref([]);
    fetch(
      new URL('/cascader-options.json', import.meta.url).href,
    ).then(res => {
      res.json().then(value => {
        options.value = value;
      });
    });

    watch(selectRenderInputValue, newValue => {
      if (cascaderFilterRef.value) {
        cascaderFilterRef.value.inputChange?.(newValue);
      }
    });

    return {
      currentVal1,
      options,
      selectRenderInputValue,
      cascaderFilterRef,
    };
  },
});
</script>
