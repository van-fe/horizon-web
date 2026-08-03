<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <label class="docs-demo__control">
        <span class="docs-demo__control-label">Shape</span>
        <h-segmented v-model:active-key="shape" size="small" block>
          <h-segmented-item key="circle" label="Circle" />
          <h-segmented-item key="square" label="Square" />
        </h-segmented>
      </label>
      <h-switch v-model="useCollapse" label="Collapsible" />
    </div>

    <h-float-button-group
      :shape="shape"
      :use-collapse="useCollapse"
      expand-tooltip="Show feedback actions"
      fold-tooltip="Hide feedback actions"
    >
      <h-float-button icon="like" tooltip="Like" />
      <h-float-button icon="urgent_notice" tooltip="Report" />
      <h-float-button icon="star" tooltip="Save" />
    </h-float-button-group>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const shape = ref('circle');
const useCollapse = ref(true);
</script>
