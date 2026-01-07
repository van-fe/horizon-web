import { afterEach, describe, expect, test } from 'vitest';
import { nextTick } from 'vue';
import { HMessage } from '../index';

describe('Message.tsx', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('test props', () => {
    test('success message', async () => {
      const message = HMessage.success('success test');
      await nextTick();
      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `"<div class="container_message_1"><div style="top: 32px; z-index: 2001;" class="n-message is-success n-message-fade-enter-from n-message-fade-enter-active"><svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="a-icon n-icon__v2_11_24 n-icon__success_filled_light n-message__status-icon n-message__status-icon" style="transform: rotate(undefineddeg);"><path fill="#26BD4B" d="M12 2a10 10 0 110 20 10 10 0 010-20z"></path><path fill="#fff" d="M18 8.46c-.6-.63-1.52-.57-2.12 0l-5.4 5.64-2.36-2.46c-.6-.62-1.52-.57-2.12 0l3.95 4.13c.27.28.7.3.99.07L18 8.46z"></path></svg><p class="n-message__content n-message__plaintext">success test<!----></p><!----></div></div>"`,
      );
      message.close();
    });

    test('warning message', async () => {
      const message = HMessage.warning('warning test');
      await nextTick();
      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `"<div class="container_message_2"><div style="top: 32px; z-index: 2002;" class="n-message is-warning n-message-fade-enter-from n-message-fade-enter-active"><svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="a-icon n-icon__v2_11_24 n-icon__warning_filled_light n-message__status-icon n-message__status-icon" style="transform: rotate(undefineddeg);"><path fill="#FDA71C" d="M12 22a10 10 0 100-20 10 10 0 000 20z"></path><path fill="#fff" d="M12 16a1 1 0 110 2 1 1 0 010-2zm-.71-10c.78 0 1.42.6 1.5 1.36V13c0 .8-.6 1.39-1.36 1.49l-.14.01V6z"></path></svg><p class="n-message__content n-message__plaintext">warning test<!----></p><!----></div></div>"`,
      );
      message.close();
    });

    test('error message', async () => {
      const message = HMessage.error('error test');
      await nextTick();
      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `"<div class="container_message_3"><div style="top: 32px; z-index: 2003;" class="n-message is-error n-message-fade-enter-from n-message-fade-enter-active"><svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="a-icon n-icon__v2_11_24 n-icon__error_filled_light n-message__status-icon n-message__status-icon" style="transform: rotate(undefineddeg);"><path fill="#E83030" d="M12 22a10 10 0 100-20 10 10 0 000 20z"></path><path fill="#fff" d="M10.95 12.31L7 16.26c.58.59 1.53.59 2.1 0l2.9-2.9 2.9 2.9c.57.59 1.52.59 2.1 0l-3.95-3.95 2.9-2.9a1.5 1.5 0 000-2.11L12 11.25 8.05 7.3a1.5 1.5 0 000 2.11l2.9 2.9z"></path></svg><p class="n-message__content n-message__plaintext">error test<!----></p><!----></div></div>"`,
      );
      message.close();
    });

    test('info message', async () => {
      const message = HMessage.info('info test');
      await nextTick();
      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `"<div class="container_message_4"><div style="top: 32px; z-index: 2004;" class="n-message is-info n-message-fade-enter-from n-message-fade-enter-active"><svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="a-icon n-icon__v2_11_24 n-icon__info_filled_light n-message__status-icon n-message__status-icon" style="transform: rotate(undefineddeg);"><path fill="#1880F2" d="M12 22a10 10 0 100-20 10 10 0 000 20z"></path><path fill="#fff" d="M11.29 9.5l.14.01c.75.1 1.36.7 1.36 1.49v5.64a1.5 1.5 0 01-1.5 1.36V9.5zM12 6a1 1 0 110 2 1 1 0 010-2z"></path></svg><p class="n-message__content n-message__plaintext">info test<!----></p><!----></div></div>"`,
      );
      message.close();
    });

    test('loading message', async () => {
      const message = HMessage.loading('loading test');
      await nextTick();
      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `"<div class="container_message_5"><div style="top: 32px; z-index: 2005;" class="n-message is-loading n-message-fade-enter-from n-message-fade-enter-active"><svg viewBox="0 0 50 50" width="1em" height="1em" class="a-icon n-icon__v2_11_24 n-icon__loading_line n-message__status-icon n-message__status-icon" style="transform: rotate(undefineddeg);"><circle cx="25" cy="25" r="20" fill="currentColor" color="var(--h-message-color--loading-icon)"></circle></svg><p class="n-message__content n-message__plaintext">loading test<svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="a-icon n-icon__v2_11_24 n-icon__more_two n-message__ellipsis n-message__ellipsis" style="transform: rotate(undefineddeg);"><path fill="currentColor" d="M4 10.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 10.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM21.25 12a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0z"></path></svg></p><!----></div></div>"`,
      );
      message.update({ message: 'updated loading test', type: 'success' });
      await nextTick();
      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `"<div class="container_message_5"><div style="top: 32px; z-index: 2005;" class="n-message is-success n-message-fade-enter-from n-message-fade-enter-active"><svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="a-icon n-icon__v2_11_24 n-icon__success_filled_light n-message__status-icon n-message__status-icon" style="transform: rotate(undefineddeg);"><path fill="#26BD4B" d="M12 2a10 10 0 110 20 10 10 0 010-20z"></path><path fill="#fff" d="M18 8.46c-.6-.63-1.52-.57-2.12 0l-5.4 5.64-2.36-2.46c-.6-.62-1.52-.57-2.12 0l3.95 4.13c.27.28.7.3.99.07L18 8.46z"></path></svg><p class="n-message__content n-message__plaintext">updated loading test<!----></p><!----></div></div>"`,
      );
      message.close();
    });
  });

  describe('test methods', () => {
    test('closeAll method', async () => {
      HMessage.success('message 1');
      HMessage.warning('message 2');
      await nextTick();
      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `"<div class="container_message_6"><div style="top: 32px; z-index: 2006;" class="n-message is-success n-message-fade-enter-from n-message-fade-enter-active"><svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="a-icon n-icon__v2_11_24 n-icon__success_filled_light n-message__status-icon n-message__status-icon" style="transform: rotate(undefineddeg);"><path fill="#26BD4B" d="M12 2a10 10 0 110 20 10 10 0 010-20z"></path><path fill="#fff" d="M18 8.46c-.6-.63-1.52-.57-2.12 0l-5.4 5.64-2.36-2.46c-.6-.62-1.52-.57-2.12 0l3.95 4.13c.27.28.7.3.99.07L18 8.46z"></path></svg><p class="n-message__content n-message__plaintext">message 1<!----></p><!----></div></div><div class="container_message_7"><div style="top: 52px; z-index: 2007;" class="n-message is-warning n-message-fade-enter-from n-message-fade-enter-active"><svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="a-icon n-icon__v2_11_24 n-icon__warning_filled_light n-message__status-icon n-message__status-icon" style="transform: rotate(undefineddeg);"><path fill="#FDA71C" d="M12 22a10 10 0 100-20 10 10 0 000 20z"></path><path fill="#fff" d="M12 16a1 1 0 110 2 1 1 0 010-2zm-.71-10c.78 0 1.42.6 1.5 1.36V13c0 .8-.6 1.39-1.36 1.49l-.14.01V6z"></path></svg><p class="n-message__content n-message__plaintext">message 2<!----></p><!----></div></div>"`,
      );
      HMessage.closeAll();
    });

    test('config method', async () => {
      HMessage.config({ maxCount: 1 });
      HMessage.success('message 1');
      await nextTick();
      HMessage.info('message 2');
      await nextTick();
      // TODO：这里的测试用例有问题，应该是只有一个 message 2
      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `"<div class="container_message_8"><div style="top: 32px; z-index: 2008;" class="n-message is-success n-message-fade-enter-from n-message-fade-leave-from n-message-fade-leave-active"><svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="a-icon n-icon__v2_11_24 n-icon__success_filled_light n-message__status-icon n-message__status-icon" style="transform: rotate(undefineddeg);"><path fill="#26BD4B" d="M12 2a10 10 0 110 20 10 10 0 010-20z"></path><path fill="#fff" d="M18 8.46c-.6-.63-1.52-.57-2.12 0l-5.4 5.64-2.36-2.46c-.6-.62-1.52-.57-2.12 0l3.95 4.13c.27.28.7.3.99.07L18 8.46z"></path></svg><p class="n-message__content n-message__plaintext">message 1<!----></p><!----></div><!----></div><div class="container_message_9"><div style="top: 32px; z-index: 2009;" class="n-message is-info n-message-fade-enter-from n-message-fade-enter-active"><svg fill="none" viewBox="0 0 24 24" width="1em" height="1em" class="a-icon n-icon__v2_11_24 n-icon__info_filled_light n-message__status-icon n-message__status-icon" style="transform: rotate(undefineddeg);"><path fill="#1880F2" d="M12 22a10 10 0 100-20 10 10 0 000 20z"></path><path fill="#fff" d="M11.29 9.5l.14.01c.75.1 1.36.7 1.36 1.49v5.64a1.5 1.5 0 01-1.5 1.36V9.5zM12 6a1 1 0 110 2 1 1 0 010-2z"></path></svg><p class="n-message__content n-message__plaintext">message 2<!----></p><!----></div></div>"`,
      );
    });
  });
});
