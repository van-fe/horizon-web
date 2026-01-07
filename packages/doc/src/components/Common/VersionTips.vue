<script setup lang="ts">
defineProps({
  desc: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <h-popover>
    <template #reference>
      <h-button icon="star" type="normal" :link="true" size="small" :underline="false" />
    </template>
    <template #popper>
      <h-pop-content>
        <span v-html="desc" />
      </h-pop-content>
    </template>
  </h-popover>
</template>
