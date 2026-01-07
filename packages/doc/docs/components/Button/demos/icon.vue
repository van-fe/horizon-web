<script setup lang="ts">
import { IconEye, IconEdit, IconRubbish } from '@aurora/icon';
</script>

<template>
  <div class="grid">
    <div>
      <h-button :auto-fit="true" :icon="IconEdit">Edit</h-button>
    </div>
    <div>
      <h-button :auto-fit="true" type="danger" :icon="IconRubbish">Delete</h-button>
    </div>
    <div>
      <h-button :auto-fit="true" type="normal" :icon="IconEye">Preview</h-button>
    </div>
    <div>
      <h-button :auto-fit="true" :plain="true" :icon="IconEdit" />
    </div>
    <div>
      <h-button :auto-fit="true" type="danger" :plain="true" :icon="IconRubbish" />
    </div>
    <div>
      <h-button :auto-fit="true" type="normal" :plain="true" :icon="IconEye" />
    </div>
    <div>
      <h-button :auto-fit="true" :loading="true" :icon="IconEdit">Edit</h-button>
    </div>
    <div>
      <h-button :auto-fit="true" type="danger" :loading="true" :icon="IconRubbish">Delete</h-button>
    </div>
    <div>
      <h-button :auto-fit="true" type="normal" :loading="true" :icon="IconEye">Preview</h-button>
    </div>
    <div>
      <h-button :auto-fit="true" :plain="true" :loading="true" />
    </div>
    <div>
      <h-button :auto-fit="true" type="danger" :plain="true" :loading="true" />
    </div>
    <div>
      <h-button :auto-fit="true" type="normal" :plain="true" :loading="true" />
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
