<template>
  <div>
    <n-switch v-model="visible" :status="true" status-on-text="显示" status-off-text="隐藏" />
    <n-float-button :visible="visible" icon="setting" description="按钮"/>
    <n-float-button :visible="visible" icon="message" description="按钮" type="primary"/>
    <n-float-button :visible="visible" icon="message" description="按钮" :badge="{}" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);
</script>

<style scoped>
</style>
