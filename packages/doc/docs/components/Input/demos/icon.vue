<!--
 * @Date: 2022-01-07 16:11:17
 * @LastEditTime: 2022-01-12 14:00:06
 * @Description: file content
-->
<template>
  <n-row>
    <n-col :span="12">
      <n-input v-model="val1" suffix-icon="check" />
    </n-col>
    <n-col :span="12">
      <n-input v-model="val2">
        <template #prefix>¥</template>
        <template #suffix>RMB</template>
      </n-input>
    </n-col>
  </n-row>
  <n-row>
    <n-col>
      <n-input v-model="val3">
        <template #suffix>
          <n-tooltip placement="top" content="show location detail">
            <n-icon name="location" />
          </n-tooltip>
        </template>
      </n-input>
    </n-col>
  </n-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NIcon } from '@nio-fe/icon';

export default defineComponent({
  components: {
    NIcon,
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
