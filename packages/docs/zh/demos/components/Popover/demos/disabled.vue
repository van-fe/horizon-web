<template>
  <div class="mb-4">
    <n-form>
      <n-form-item label="Visible">
        <n-radio-group v-model="visible" :disabled="disabled">
          <n-radio :label="true">True</n-radio>
          <n-radio :label="false">False</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Disabled">
        <n-radio-group v-model="disabled">
          <n-radio :label="true">True</n-radio>
          <n-radio :label="false">False</n-radio>
        </n-radio-group>
      </n-form-item>
    </n-form>
    <n-popover
      trigger="manual"
      popper-class="disabled_popper"
      placement="bottom"
      :visible="visible"
      :disabled="disabled"
      class="mr-4"
      @hide="onHide"
    >
      <template #reference>
        <n-button :plain="true">click is no use</n-button>
      </template>
      <template #popper>
        <n-pop-content>Content</n-pop-content>
      </template>
    </n-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const disabled = ref(false);

    return {
      visible,
      disabled,
      onHide() {
        visible.value = false;
      },
    };
  },
});
</script>

<style>
.disabled_popper .popper {
  width: 280px;
}

.disabled_popper .header {
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}

.disabled_popper .content {
  font-size: 14px;
  line-height: 22px;
}
</style>
