<template>
  <div style="width: 600px">
    <h-switch
      v-model="currentRef"
      label="This is a Label Text  and their names. This is a Label Text  and their names. This is a Label Text  and their names."
      label-position="top"
      style="margin-bottom: 20px"
    />
    <h-switch
      v-model="currentRef"
      label="This is a Label Text  and their names. This is a Label Text  and their names. This is a Label Text  and their names."
      label-position="left"
      style="margin-bottom: 20px"
    />
    <h-switch
      v-model="currentRef"
      label="This is a Label Text  and their names. This is a Label Text  and their names. This is a Label Text  and their names."
      label-position="right"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentRef: ref(false),
    };
  },
});
</script>
