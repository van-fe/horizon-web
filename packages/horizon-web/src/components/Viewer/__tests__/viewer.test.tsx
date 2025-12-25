import { shallowMount } from '@vue/test-utils';
import HViewer from '../src/Viewer';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';
import type { HViewerSource } from '..';

describe('Viewer.tsx', () => {
  test('basic', async () => {
    const generateImages = (count: number) => {
      const list: HViewerSource[] = [];
      const base = Math.floor(Math.random() * 60) + 10;
      for (let i = 0; i < count; i++) {
        list.push({
          type: 'image',
          thumbnail: `https://picsum.photos/id/${base + i}/80/80`,
          cover: `https://picsum.photos/id/${base + i}/1366/768`,
          title: `Image: ${base + i}`,
        });
      }
      return list;
    };

    const imagesRef = ref<HViewerSource[]>(generateImages(5));

    const wrapper = shallowMount(() => <HViewer sources={imagesRef.value} />);
    const element = wrapper.findComponent(HViewer);

    expect(element.exists()).toBe(true);
  });
});
