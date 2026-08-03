<template>
  <h-button
    class="mr-2"
    @click="
      primaryButton = true;
      secondaryButton = true;
      visible1 = true;
    "
  >
    默认显示全部按钮
  </h-button>
  <h-button
    class="mr-2"
    @click="
      primaryButton = true;
      secondaryButton = false;
      visible1 = true;
    "
  >
    只显示主要按钮
  </h-button>
  <h-button
    class="mr-2"
    @click="
      primaryButton = false;
      secondaryButton = false;
      visible1 = true;
    "
  >
    不显示按钮
  </h-button>
  <h-button class="mr-2" @click="visible2 = true">自定义底部区域</h-button>
  <h-dialog
    v-model:visible="visible1"
    title="标题"
    :ok-button-props="primaryButton"
    :cancel-button-props="secondaryButton"
  >
    <div>随便写点什么</div>
  </h-dialog>
  <h-dialog v-model:visible="visible2" title="标题">
    <div>随便写点什么</div>
    <template #footer>
      <div class="flex">
        <h-button type="normal" class="ml-auto">辅助按钮</h-button>
        <h-button :plain="true">次要按钮</h-button>
        <h-button>主要按钮</h-button>
      </div>
    </template>
  </h-dialog>
  <h-dialog
    v-model:visible="visible3"
    title="标题"
    :ok-button-props="{
      type: 'danger',
    }"
    :cancel-button-props="{
      text: true,
    }"
  >
    <div>随便写点什么</div>
  </h-dialog>
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
