<template>
  <div class="flex flex-wrap" style="max-width: 780px;">
    <template v-for="(lists, typeName) in colors">
      <template v-if="Array.isArray(lists)">
        <div :key="typeName" class="pr-4 pb-4" style="width: 33.333%">
          <div class="text-lg mb-2">{{typeName}}</div>
          <div
            v-for="(color, index) in lists"
            :key="color"
            class="flex justify-space-between p-3 text-center mb-1 rounded"
            :style="{
              backgroundColor: color,
              color: textColor(color)
          }">
            <div>
              {{`${typeName}-${index + 1}`}}
            </div>
            <span>{{color.toUpperCase()}}</span>
          </div>
        </div>
      </template>
    </template>
    <div class="pr-4 pb-4" style="width: 33.333%">
      <div class="text-lg mb-2">others</div>
      <div class="flex justify-space-between p-3 text-center mb-1 rounded" style="background-color: #000; color: #fff;">
        <div>
          black
        </div>
        <span>#000000</span>
      </div>
      <div class="flex justify-space-between p-3 text-center mb-1 rounded" style="background-color: #fff;">
        <div>
          white
        </div>
        <span>#FFFFFF</span>
      </div>
      <div class="flex justify-space-between p-3 text-center mb-1 rounded" style="background-color: transparent;">
        <div>
          transparent
        </div>
        <span>transparent</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { colors } from '@aurora/horizon-web';
import { tinyColor } from '@aurora/colors';

export default defineComponent({
  setup() {
    return {
      colors,
      isDark: (color: string) => tinyColor(color).isDark(),
      textColor(color: string) {
        return tinyColor(color).isDark() ? '#FFF' : '#000';
      },
    };
  },
});
</script>
