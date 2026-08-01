<template>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-radio-group v-model="size">
        <h-radio value="small" />
        <h-radio value="medium" />
        <h-radio value="large" />
      </h-radio-group>
    </h-grid-item>
  </h-grid>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-application :size="size">
        <h-form label-position="left" label-justify-align="right" label-vertical-align="middle">
          <h-form-item label="avatar">
            <h-avatar icon="friend" type="work" />
          </h-form-item>
          <h-form-item label="button">
            <h-button>Confirm</h-button>
          </h-form-item>
          <h-form-item label="checkbox">
            <h-checkbox v-model="value2" class="mr-5">Confirm</h-checkbox>
            <h-checkbox-button v-model="value2">Confirm</h-checkbox-button>
          </h-form-item>
        </h-form>
      </h-application>
    </h-grid-item>
  </h-grid>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const size = ref('medium');
    const value1 = ref([]);
    const value2 = ref('');

    return {
      size,
      value1,
      value2,
    };
  },
});
</script>
