<template>
  <h-space direction="vertical" size="large" style="max-width: 480px">
    <h-typography :ellipsis="2" block>
      Horizon Web 提供统一、清晰且可访问的 Vue 3
      组件体验。较长文本可以按指定行数省略，适配窄容器和不同语言长度。
    </h-typography>
    <h-typography v-model="text" copyable editable block />
    <h-typography v-model="disabledText" copyable editable disabled block />
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = ref('这段文本可以复制，也可以就地编辑。');
const disabledText = ref('禁用状态不会响应复制和编辑操作。');
</script>
