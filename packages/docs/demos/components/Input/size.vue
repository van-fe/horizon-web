<template>
  <h-form>
    <h-grid :gap="12">
      <h-form-item label="style">
        <h-radio-group v-model="inputStyle">
          <h-radio
            v-for="label in ['normal', 'no-border', 'emphasize']"
            :key="label"
            :value="label"
          />
        </h-radio-group>
      </h-form-item>
    </h-grid>
    <h-grid :gap="12">
      <h-grid-item :span="8">
        <h-form-item label="Large">
          <h-input v-model="val1" size="large" :input-style="inputStyle" />
        </h-form-item>
      </h-grid-item>
      <h-grid-item :span="8">
        <h-form-item label="Medium">
          <h-input v-model="val2" size="medium" :input-style="inputStyle" />
        </h-form-item>
      </h-grid-item>
      <h-grid-item :span="8">
        <h-form-item label="Small">
          <h-input v-model="val3" size="small" :input-style="inputStyle" />
        </h-form-item>
      </h-grid-item>
    </h-grid>
  </h-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const val1 = ref('');
    const val2 = ref('');
    const val3 = ref('');
    const inputStyle = ref('normal');
    return {
      val1,
      val2,
      val3,
      inputStyle,
    };
  },
});
</script>
