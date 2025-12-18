import { shallowMount } from '@vue/test-utils';
import NVideoPlayer from '../src/VideoPlayer';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('VideoPlayer.tsx', () => {
  test('basic', async () => {
    const videoSource = ref({
      src: 'https://www.nio.cn/cdn-static/mynio/nextjs/images/et5/et5-hero-video.mp4',
      type: 'video/mp4',
    });

    const wrapper = shallowMount(() => <NVideoPlayer sources={[videoSource.value]} />);
    const element = wrapper.findComponent(NVideoPlayer);

    expect(element.exists()).toBe(true);
  });
});
