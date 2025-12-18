<template>
  <n-form class="block-tooltip-props">
<!--    <n-form-item label="尺寸">-->
<!--      <n-radio-group v-model="size">-->
<!--        <n-radio label="medium">Medium</n-radio>-->
<!--        <n-radio label="small">Small</n-radio>-->
<!--      </n-radio-group>-->
<!--    </n-form-item>-->
    <!-- <n-form-item label="主题">
      <n-radio-group v-model="theme">
        <n-radio label="dark">Dark</n-radio>
        <n-radio label="light">Light</n-radio>
      </n-radio-group>
    </n-form-item> -->
    <n-form-item label="延迟关闭">
      <n-input v-model="hideAfter"><template #suffix>ms</template></n-input>
    </n-form-item>
  </n-form>
  <div class="block-tooltip">
    <div class="item"></div>
    <div class="item">
      <n-tooltip placement="top-start" content="top-start" :hide-after="hideAfter">
        <n-button type="normal" plain>上左</n-button>
      </n-tooltip>
    </div>
    <div class="item">
      <n-tooltip placement="top" content="top" :hide-after="hideAfter">
        <n-button type="normal" plain>上</n-button>
      </n-tooltip>
    </div>
    <div class="item">
      <n-tooltip placement="top-end" content="top-end" :hide-after="hideAfter">
        <n-button type="normal" plain>上右</n-button>
      </n-tooltip>
    </div>
    <div class="item"></div>
    <div class="item">
      <n-tooltip placement="left-start" content="left-start" :hide-after="hideAfter">
        <n-button type="normal" plain>左上</n-button>
      </n-tooltip>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <n-tooltip placement="right-start" content="right-start" :hide-after="hideAfter">
        <n-button type="normal" plain>右上</n-button>
      </n-tooltip>
    </div>
    <div class="item">
      <n-tooltip placement="left" content="left" :hide-after="hideAfter">
        <n-button type="normal" plain>左</n-button>
      </n-tooltip>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <n-tooltip placement="right" content="right" :hide-after="hideAfter">
        <n-button type="normal" plain>右</n-button>
      </n-tooltip>
    </div>
    <div class="item">
      <n-tooltip placement="left-end" content="left-end" :hide-after="hideAfter">
        <n-button type="normal" plain>左下</n-button>
      </n-tooltip>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <n-tooltip placement="right-end" content="right-end" :hide-after="hideAfter">
        <n-button type="normal" plain>右下</n-button>
      </n-tooltip>
    </div>
    <div class="item"></div>
    <div class="item">
      <n-tooltip
        placement="bottom-start"
        content="bottom-start"
       
        :hide-after="hideAfter"
      >
        <n-button type="normal" plain>下左</n-button>
      </n-tooltip>
    </div>
    <div class="item">
      <n-tooltip placement="bottom" content="bottom" :hide-after="hideAfter">
        <n-button type="normal" plain>下</n-button>
      </n-tooltip>
    </div>
    <div class="item">
      <n-tooltip placement="bottom-end" content="bottom-end" :hide-after="hideAfter">
        <n-button type="normal" plain>下右</n-button>
      </n-tooltip>
    </div>
    <div class="item"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const hideAfter = ref(200);
</script>

<style>
.block-tooltip-props {
  display: flex;
  margin-bottom: 20px;
}

.block-tooltip-props > * {
  margin-right: 50px;
}

.block-tooltip {
  width: 430px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 20px;
}

.block-tooltip .item {
  width: 120px;
}

.block-tooltip .item button {
  width: 100%;
}
</style>
