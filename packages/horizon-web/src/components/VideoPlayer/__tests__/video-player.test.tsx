import { shallowMount } from '@vue/test-utils';
import HVideoPlayer from '../src/VideoPlayer';
import { describe, expect, test } from 'vitest';
import { ref } from 'vue';

describe('VideoPlayer.tsx', () => {
  test('basic', async () => {
    const videoSource = ref({
      src: 'https://www.example.com/cdn-static/mydemo/nextjs/images/et5/et5-hero-video.mp4',
      type: 'video/mp4',
    });

    const wrapper = shallowMount(() => <HVideoPlayer sources={[videoSource.value]} />);
    const element = wrapper.findComponent(HVideoPlayer);

    expect(element.exists()).toBe(true);
  });
});
