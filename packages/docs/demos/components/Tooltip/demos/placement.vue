<template>
  <h-form class="block-tooltip-props">
    <h-form-item label="尺寸">
      <h-radio-group v-model="size">
        <h-radio label="medium">Medium</h-radio>
        <h-radio label="small">Small</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="主题">
      <h-radio-group v-model="theme">
        <h-radio label="dark">Dark</h-radio>
        <h-radio label="light">Light</h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="延迟关闭">
      <h-input v-model="hideAfter"><template #suffix>ms</template></h-input>
    </h-form-item>
  </h-form>
  <div class="block-tooltip">
    <div class="item"></div>
    <div class="item">
      <h-tooltip
        placement="top-start"
        content="top-start"
        singleton
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>上左</h-button>
      </h-tooltip>
    </div>
    <div class="item">
      <h-tooltip placement="top" content="top" :size="size" :theme="theme" :hide-after="hideAfter">
        <h-button>上</h-button>
      </h-tooltip>
    </div>
    <div class="item">
      <h-tooltip
        placement="top-end"
        content="top-end"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>上右</h-button>
      </h-tooltip>
    </div>
    <div class="item"></div>
    <div class="item">
      <h-tooltip
        placement="left-start"
        content="left-start"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>左上</h-button>
      </h-tooltip>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-tooltip
        placement="right-start"
        content="right-start"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>右上</h-button>
      </h-tooltip>
    </div>
    <div class="item">
      <h-tooltip
        placement="left"
        content="left"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>左</h-button>
      </h-tooltip>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-tooltip
        placement="right"
        content="right"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>右</h-button>
      </h-tooltip>
    </div>
    <div class="item">
      <h-tooltip
        placement="left-end"
        content="left-end"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>左下</h-button>
      </h-tooltip>
    </div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item">
      <h-tooltip
        placement="right-end"
        content="right-end"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>右下</h-button>
      </h-tooltip>
    </div>
    <div class="item"></div>
    <div class="item">
      <h-tooltip
        placement="bottom-start"
        content="bottom-start"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>下左</h-button>
      </h-tooltip>
    </div>
    <div class="item">
      <h-tooltip
        placement="bottom"
        content="bottom"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>下</h-button>
      </h-tooltip>
    </div>
    <div class="item">
      <h-tooltip
        placement="bottom-end"
        content="bottom-end"
        :size="size"
        :theme="theme"
        :hide-after="hideAfter"
      >
        <h-button>下右</h-button>
      </h-tooltip>
    </div>
    <div class="item"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const size = ref('medium');
const theme = ref('dark');
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
