<!--
 * @Date: 2022-01-07 16:11:17
 * @LastEditTime: 2022-01-12 14:00:06
 * @Description: file content
-->
<template>
  <h-grid :gap="12">
    <h-grid-item :span="12">
      <h-input v-model="val1" suffix-icon="check" />
    </h-grid-item>
    <h-grid-item :span="12">
      <h-input v-model="val2">
        <template #prefix>¥</template>
        <template #suffix>RMB</template>
      </h-input>
    </h-grid-item>
  </h-grid>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-input v-model="val3">
        <template #suffix>
          <h-tooltip placement="top" content="show location detail">
            <a-icon name="location" />
          </h-tooltip>
        </template>
      </h-input>
    </h-grid-item>
  </h-grid>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { AIcon } from '@aurora/icon';

export default defineComponent({
  components: {
    AIcon,
  },
  setup() {
    const val1 = ref('');
    const val2 = ref('');
    const val3 = ref('');
    return {
      val1,
      val2,
      val3,
    };
  },
});
</script>
