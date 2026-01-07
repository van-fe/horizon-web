<template>
  <div class="container">
    <div style="display: flex; aligh-items: center">
      <h-checkbox-button class="checkbox-button" v-model="checked" @change="setTitle">Set Title</h-checkbox-button>
      <h-checkbox-button class="checkbox-button" v-model="border">Border</h-checkbox-button>
      <div>Type：</div>
      <h-radio-group v-model="type">
        <h-radio-button v-for="(label, index) in typeOptions" :key="index" :label="label" />
      </h-radio-group>
      <div>Size：</div>
      <h-radio-group v-model="size">
        <h-radio-button v-for="(label, index) in sizeOptions" :key="index" :label="label" />
      </h-radio-group>
      <div>LabelPosition：</div>
      <h-radio-group v-model="LabelPosition">
        <h-radio-button v-for="(label, index) in ['left', 'top']" :key="index" :label="label" />
      </h-radio-group>
      <div>Column：</div>
      <h-radio-group v-model="column">
        <h-radio-button v-for="(label, index) in [1, 2]" :key="index" :label="label" />
      </h-radio-group>
    </div>
    <h-descriptions
      :title="title"
      :border="border"
      :type="type"
      :size="size"
      :label-position="LabelPosition"
      :column="column"
    >
      <h-description-item
        v-for="(item, index) in data"
        :key="index"
        :label="item.label"
        :value="item.value"
        :spah-col="index === data.length - 1 ? column : 1"
      />
    </h-descriptions>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const data = ref([
      { label: 'Name', value: 'bingkun Zhou' },
      { label: 'Telephone', value: '0924-250492' },
      { label: 'Residence', value: 'Norway' },
      { label: 'City', value: 'Oslo' },
      { label: 'Address', value: 'Leg.Kiropraktor Iréne Johnson' },
    ]);
    const border = ref(false);
    const type = ref('vertical');
    const size = ref('medium');
    const typeOptions = ref(['horizontal', 'vertical']);
    const sizeOptions = ref(['small', 'medium']);
    const title = ref('');
    const LabelPosition = ref('left');
    const checked = ref(false);
    const column = ref(1);
    const setTitle = (val: boolean) => {
      title.value = val ? 'User Info' : '';
    };
    return {
      data,
      border,
      type,
      size,
      typeOptions,
      sizeOptions,
      title,
      setTitle,
      checked,
      LabelPosition,
      column,
    };
  },
});
</script>

<style scoped>
.h-descriptions {
  padding: 32px 24px;
}

.container .h-checkbox-button,
.container .h-radio-group {
  margih-right: 20px;
}

.checkbox-button {
  width: 100px;
}
</style>
