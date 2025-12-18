<script setup lang="ts">
import { $alert } from '@aurora/horizon-web';

function onPrimaryClick() {
  $alert('点击了主按钮', '提示');
}
function onSecondaryClick() {
  $alert('点击了次按钮', '提示');
}
</script>

<template>
  <n-result
    title="这是一条成功信息"
    subtitle="这是一段相关的描述文案"
    @primaryClick="onPrimaryClick"
    @secondaryClick="onSecondaryClick"
  />
</template>
