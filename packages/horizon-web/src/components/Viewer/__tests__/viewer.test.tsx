import { shallowMount } from '@vue/test-utils';
import NViewer from '../src/Viewer';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';
import type { NViewerSource } from '..';

describe('Viewer.tsx', () => {
  test('basic', async () => {
    const generateImages = (count: number) => {
      const list: NViewerSource[] = [];
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

    const imagesRef = ref<NViewerSource[]>(generateImages(5));

    const wrapper = shallowMount(() => <NViewer sources={imagesRef.value} />);
    const element = wrapper.findComponent(NViewer);

    expect(element.exists()).toBe(true);
  });
});
