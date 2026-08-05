<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control">
        <span class="docs-demo__control-label">Shape</span>
        <h-segmented v-model:active-key="shape" size="small" block>
          <h-segmented-item value="circle" label="Circle" />
          <h-segmented-item value="square" label="Square" />
        </h-segmented>
      </label>
    </div>

    <h-float-button :shape="shape" icon="message" description="Chat" tooltip="Open team chat" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const shape = ref('circle');
</script>
