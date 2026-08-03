<template>
  <div>
    <h-grid :gap="12">
      <h-grid-item :span="8">
        <div class="demo-title">前缀-默认状态</div>
        <h-input-number :min="0" prefix-icon="points" />
      </h-grid-item>
      <h-grid-item :span="8">
        <div class="demo-title">前缀-控制器位于两侧</div>
        <h-input-number controls-position="between" :min="0" prefix-icon="points" />
      </h-grid-item>
      <h-grid-item :span="8">
        <div class="demo-title">前缀-控制器隐藏</div>
        <h-input-number :controls="false" :min="0" prefix-icon="points" />
      </h-grid-item>
    </h-grid>
    <h-grid :gap="12">
      <h-grid-item :span="8">
        <div class="demo-title">后缀-默认状态</div>
        <h-input-number :min="0" suffix-icon="points" :clearable="true" />
      </h-grid-item>
      <h-grid-item :span="8">
        <div class="demo-title">后缀-控制器位于两侧</div>
        <h-input-number controls-position="between" :min="0" :clearable="true">
          <template #suffix>RMB</template>
        </h-input-number>
      </h-grid-item>
      <h-grid-item :span="8">
        <div class="demo-title">后缀-控制器隐藏</div>
        <h-input-number :controls="false" :min="0" suffix-icon="points" :clearable="true">
          <template #suffix>RMB</template>
        </h-input-number>
      </h-grid-item>
    </h-grid>
    <h-grid :gap="12">
      <h-grid-item :span="8">
        <div class="demo-title">前后缀-默认状态</div>
        <h-input-number :min="0" suffix-icon="points">
          <template #prefix>
            <a-icon v-tooltip="`请注意，这里是积分`" name="remind" size="12" />
          </template>
        </h-input-number>
      </h-grid-item>
      <h-grid-item :span="8">
        <div class="demo-title">前后缀-控制器位于两侧</div>
        <h-input-number controls-position="between" :min="0" suffix-icon="points">
          <template #prefix>
            <a-icon v-tooltip="`请注意，这里是积分`" name="remind" size="12" />
          </template>
        </h-input-number>
      </h-grid-item>
      <h-grid-item :span="8">
        <div class="demo-title">前后缀-控制器隐藏</div>
        <h-input-number :controls="false" :min="0" suffix-icon="points">
          <template #prefix>
            <a-icon v-tooltip="`请注意，这里是积分`" name="remind" size="12" />
          </template>
        </h-input-number>
      </h-grid-item>
    </h-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AIcon } from '@aurora/icon';

export default defineComponent({
  components: {
    AIcon,
  },
});
</script>
