<template>
  <h-form>
    <h-form-item label="style">
      <h-radio-group v-model="inputStyle">
        <h-radio
          v-for="label in ['normal', 'no-border', 'emphasize']"
          :key="label"
          :value="label"
        />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="disabled">
      <h-radio-group v-model="inputDisabled">
        <h-radio v-for="label in ['disabled', 'enabled']" :key="label" :value="label" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="Label">
      <h-input v-model="val" :input-style="inputStyle" :disabled="inputDisabled === 'disabled'" />
    </h-form-item>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const val = ref('');
    const inputStyle = ref('normal');
    const inputDisabled = ref('enabled');
    return {
      val,
      inputStyle,
      inputDisabled,
    };
  },
});
</script>
