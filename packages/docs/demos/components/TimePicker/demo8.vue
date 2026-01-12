<template>
  <h-form>
    <h-form-item label="style">
      <h-radio-group v-model="inputStyle">
        <h-radio
          v-for="(label, index) in ['normal', 'no-border', 'emphasize']"
          :key="index"
          :label="label"
          size="small"
        />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="disabled">
      <h-radio-group v-model="inputDisabled">
        <h-radio
          v-for="(label, index) in ['disabled', 'useable']"
          :key="index"
          :label="label"
          size="small"
        />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="Label Time">
      <h-time-picker v-model="val" :input-style = 'inputStyle' :disabled="inputDisabled === 'disabled'" type="time"/>
    </h-form-item>
    <h-form-item label="Label TimeRange">
      <h-time-picker v-model="date" :input-style = 'inputStyle' :disabled="inputDisabled === 'disabled'" type="time" is-range/>
    </h-form-item>
  </h-form>
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
