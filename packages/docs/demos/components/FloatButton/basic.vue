<template>
  <div>
    <h-switch v-model="visible" :status="true" status-on-text="显示" status-off-text="隐藏" />
    <h-float-button :visible="visible" icon="message" />
    <h-float-button :visible="visible" description="按钮" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);

</script>
