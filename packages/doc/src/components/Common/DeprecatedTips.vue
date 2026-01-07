<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <h-popover>
    <template #reference>
      <h-button icon="tips" type="danger" :link="true" size="small" :underline="false" />
    </template>
    <template #popper>
      <h-pop-content>此字段已不推荐使用<span v-if="name">，请改用<span v-html="name"></span></span></h-pop-content>
    </template>
  </h-popover>
</template>
