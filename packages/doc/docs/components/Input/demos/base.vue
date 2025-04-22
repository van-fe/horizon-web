<template>
  <n-form>
    <n-form-item label="style">
      <n-radio-group v-model="inputStyle">
        <n-radio
          v-for="(label, index) in ['normal', 'no-border']"
          :key="index"
          :label="label"
          size="small"
        />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="disabled">
      <n-radio-group v-model="inputDisabled">
        <n-radio
          v-for="(label, index) in ['disabled', 'useable']"
          :key="index"
          :label="label"
          size="small"
        />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="Label">
      <n-input v-model="val" :input-style = 'inputStyle' :disabled="inputDisabled === 'disabled'"/>
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const val = ref('');
    const inputStyle = ref('normal');
    const inputDisabled = ref('useable');
    return {
      val,
      inputStyle,
      inputDisabled,
    };
  },
});
</script>
