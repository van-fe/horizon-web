<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <n-popover>
    <template #reference>
      <n-button icon="tips" type="danger" :link="true" size="small" :underline="false" />
    </template>
    <template #popper>
      <n-pop-content>此字段已不推荐使用<span v-if="name">，请改用<span v-html="name"></span></span></n-pop-content>
    </template>
  </n-popover>
</template>
