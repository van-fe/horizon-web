<script setup lang="ts">
defineProps({
  desc: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <n-popover>
    <template #reference>
      <n-button icon="star" type="normal" :link="true" size="small" :underline="false" />
    </template>
    <template #popper>
      <n-pop-content>
        <span v-html="desc" />
      </n-pop-content>
    </template>
  </n-popover>
</template>
