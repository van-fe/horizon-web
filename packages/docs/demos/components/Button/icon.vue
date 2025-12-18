<script setup lang="ts">
import { IconEye, IconEdit, IconRubbish } from '@aurora/icon';
</script>

<template>
  <div class="grid">
    <div>
      <n-button :auto-fit="true" :icon="IconEdit">Edit</n-button>
    </div>
    <div>
      <n-button :auto-fit="true" type="danger" :icon="IconRubbish">Delete</n-button>
    </div>
    <div>
      <n-button :auto-fit="true" type="normal" :icon="IconEye">Preview</n-button>
    </div>
    <div>
      <n-button :auto-fit="true" :plain="true" :icon="IconEdit" />
    </div>
    <div>
      <n-button :auto-fit="true" type="danger" :plain="true" :icon="IconRubbish" />
    </div>
    <div>
      <n-button :auto-fit="true" type="normal" :plain="true" :icon="IconEye" />
    </div>
    <div>
      <n-button :auto-fit="true" :loading="true" :icon="IconEdit">Edit</n-button>
    </div>
    <div>
      <n-button :auto-fit="true" type="danger" :loading="true" :icon="IconRubbish">Delete</n-button>
    </div>
    <div>
      <n-button :auto-fit="true" type="normal" :loading="true" :icon="IconEye">Preview</n-button>
    </div>
    <div>
      <n-button :auto-fit="true" :plain="true" :loading="true" />
    </div>
    <div>
      <n-button :auto-fit="true" type="danger" :plain="true" :loading="true" />
    </div>
    <div>
      <n-button :auto-fit="true" type="normal" :plain="true" :loading="true" />
    </div>
  </div>
</template>

<style scoped>
.grid {
  width: fit-content;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.grid > div {
  text-align: center;
}
</style>
