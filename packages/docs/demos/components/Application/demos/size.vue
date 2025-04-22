<template>
  <n-row>
    <n-col>
      <n-radio-group v-model="size">
        <n-radio label="small" />
        <n-radio label="medium" />
        <n-radio label="large" />
      </n-radio-group>
    </n-col>
  </n-row>
  <n-row>
    <n-col>
      <n-application :size="size">
        <n-form label-position="left" label-justify-align="right" label-vertical-align="middle">
          <n-form-item label="avatar">
            <n-avatar icon="friend" type="work" />
          </n-form-item>
          <n-form-item label="button">
            <n-button>Confirm</n-button>
          </n-form-item>
          <n-form-item label="checkbox">
            <n-checkbox v-model="value2" class="mr-5">Confirm</n-checkbox>
            <n-checkbox-button v-model="value2">Confirm</n-checkbox-button>
          </n-form-item>
        </n-form>
      </n-application>
    </n-col>
  </n-row>
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
