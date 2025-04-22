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
    <n-form-item label="display value">
      <n-radio-group v-model="isHoverDisplayValue">
        <n-radio
          v-for="(label, index) in ['disabled', 'useable']"
          :key="index"
          :label="label"
          size="small"
        />
      </n-radio-group>
    </n-form-item>
    {{ val }}
    <n-form-item label="Label Date">
      <n-date-picker v-model="val" :input-style = 'inputStyle' :disabled="inputDisabled === 'disabled'" :is-hover-display-value="isHoverDisplayValue === 'useable'" type="date"/>
    </n-form-item>
    <n-form-item label="Label DateRange">
      <n-date-picker v-model="date" :input-style = 'inputStyle' :disabled="inputDisabled === 'disabled'" :is-hover-display-value="isHoverDisplayValue === 'useable'" type="daterange"/>
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  setup() {
    const val = ref();
    const date = ref();
    const inputStyle = ref('normal');
    const inputDisabled = ref('useable');
    const isHoverDisplayValue = ref('useable');

    watch(date, (v) => {
      console.log('date changed', v);
    });

    return {
      val,
      date,
      inputStyle,
      inputDisabled,
      isHoverDisplayValue,
    };
  },
});
</script>
