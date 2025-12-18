<template>
  <n-steps v-model="current" :clickable="true" @change="onChange">
    <n-step title="Step 1" description="Here is a paragraph." @click="onClickStep1" />
    <n-step title="Step 2" description="Cannot click" :clickable="false" />
    <n-step title="Step 3" description="Here is a paragraph." />
    <n-step title="Step 3" description="Here is a paragraph." />
  </n-steps>
  <br />
  <n-steps v-model="current" :clickable="true" direction="vertical" @change="onChange">
    <n-step title="Step 1" description="Here is a paragraph." />
    <n-step title="Step 2" description="Cannot click" :clickable="false" />
    <n-step title="Step 3" description="Here is a paragraph." />
    <n-step title="Step 3" description="Here is a paragraph." />
  </n-steps>
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
      console.log('onChange:', current);
    },
    onClickStep1(evt: Event, index: number) {
      console.log({evt, index});
    },
  },
});
</script>
