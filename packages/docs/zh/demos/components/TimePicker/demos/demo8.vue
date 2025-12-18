<template>
  <n-form>
    <n-form-item label="style">
      <n-radio-group v-model="inputStyle">
        <n-radio
          v-for="(label, index) in ['normal', 'no-border', 'emphasize']"
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
    <n-form-item label="Label Time">
      <n-time-picker v-model="val" :input-style = 'inputStyle' :disabled="inputDisabled === 'disabled'" type="time"/>
    </n-form-item>
    <n-form-item label="Label TimeRange">
      <n-time-picker v-model="date" :input-style = 'inputStyle' :disabled="inputDisabled === 'disabled'" type="time" is-range/>
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const val = ref();
    const date = ref();
    const inputStyle = ref('normal');
    const inputDisabled = ref('useable');

    return {
      val,
      date,
      inputStyle,
      inputDisabled,
    };
  },
});
</script>
