<script setup lang="ts">
import { useData } from 'vitepress';

defineProps<{
  name: string;
}>();

const { lang } = useData();
</script>

<template>
  <h-popover>
    <template #reference>
      <h-button icon="tips" type="danger" :link="true" size="small" :underline="false" />
    </template>
    <template #popper>
      <h-pop-content>
        {{ lang === 'en' ? 'This field is deprecated' : '此字段已不推荐使用' }}
        <template v-if="name">
          {{ lang === 'en' ? '. Use ' : '，请改用' }}
          <code>{{ name }}</code>
        </template>
      </h-pop-content>
    </template>
  </h-popover>
</template>
