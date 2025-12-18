<template>
  <n-button
    class="mr-2"
    @click="
      primaryButton = true;
      secondaryButton = true;
      visible1 = true;
    "
  >
    默认显示全部按钮
  </n-button>
  <n-button
    class="mr-2"
    @click="
      primaryButton = true;
      secondaryButton = false;
      visible1 = true;
    "
  >
    只显示主要按钮
  </n-button>
  <n-button
    class="mr-2"
    @click="
      primaryButton = false;
      secondaryButton = false;
      visible1 = true;
    "
  >
    不显示按钮
  </n-button>
  <n-button class="mr-2" @click="visible2 = true">自定义底部区域</n-button>
  <n-dialog
    v-model="visible1"
    title="标题"
    :primary-button="primaryButton"
    :secondary-button="secondaryButton"
  >
    <div>随便写点什么</div>
  </n-dialog>
  <n-dialog v-model="visible2" title="标题">
    <div>随便写点什么</div>
    <template #footer>
      <div class="flex">
        <n-button type="normal" class="ml-auto">辅助按钮</n-button>
        <n-button :plain="true" >次要按钮</n-button>
        <n-button>主要按钮</n-button>
      </div>
    </template>
  </n-dialog>
  <n-dialog
    v-model="visible3"
    title="标题"
    :primary-button-props="{
      type: 'primary',
      kind: 'negative',
    }"
    :secondary-button-props="{
      type: 'text',
      kind: 'neutral',
    }"
  >
    <div>随便写点什么</div>
  </n-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      visible1: ref(false),
      primaryButton: ref(true),
      secondaryButton: ref(true),
      visible2: ref(false),
      visible3: ref(false),
    };
  },
});
</script>
