<template>
  <n-button
    v-for="typeName in types"
    :key="typeName"
    v-popconfirm="{ type: typeName }"
    class="mr-2"
    @click="del"
  >
    {{ typeName }}
  </n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $message } from '@nio-fe/lego';
export default defineComponent({
  setup() {
    const types = ['none', 'info', 'success', 'warning', 'error'];
    return {
      types,
      del: () => {
        $message('Action!');
      },
    };
  },
});
</script>
