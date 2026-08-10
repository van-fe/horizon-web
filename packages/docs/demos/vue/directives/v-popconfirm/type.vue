<template>
  <h-button
    v-for="typeName in types"
    :key="typeName"
    v-popconfirm="{ type: typeName }"
    class="mr-2"
    @click="del"
  >
    {{ typeName }}
  </h-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $message } from '@aurora/horizon-web';
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
