<template>
  <div class="mb-4">
    <h-form>
      <h-form-item label="Visible">
        <h-radio-group v-model="visible" :disabled="disabled">
          <h-radio :label="true">True</h-radio>
          <h-radio :label="false">False</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="Disabled">
        <h-radio-group v-model="disabled">
          <h-radio :label="true">True</h-radio>
          <h-radio :label="false">False</h-radio>
        </h-radio-group>
      </h-form-item>
    </h-form>
    <h-popover
      trigger="manual"
      popper-class="disabled_popper"
      placement="bottom"
      :visible="visible"
      :disabled="disabled"
      class="mr-4"
      @hide="onHide"
    >
      <template #reference>
        <h-button :plain="true">click is no use</h-button>
      </template>
      <template #popper>
        <h-pop-content>Content</h-pop-content>
      </template>
    </h-popover>
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
