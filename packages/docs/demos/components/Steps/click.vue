<template>
  <h-steps v-model="current" :clickable="true" @change="onChange">
    <h-step title="Step 1" description="Here is a paragraph." @click="onClickStep1" />
    <h-step title="Step 2" description="Cannot click" :clickable="false" />
    <h-step title="Step 3" description="Here is a paragraph." />
    <h-step title="Step 3" description="Here is a paragraph." />
  </h-steps>
  <br />
  <h-steps v-model="current" :clickable="true" direction="vertical" @change="onChange">
    <h-step title="Step 1" description="Here is a paragraph." />
    <h-step title="Step 2" description="Cannot click" :clickable="false" />
    <h-step title="Step 3" description="Here is a paragraph." />
    <h-step title="Step 3" description="Here is a paragraph." />
  </h-steps>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      current: 0,
    };
  },
  methods: {
    onChange(current: number) {
      console.info('onChange:', current);
    },
    onClickStep1(evt: Event, index: number) {
      console.info({evt, index});
    },
  },
});
</script>
