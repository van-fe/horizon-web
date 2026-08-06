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
        `
        "<div class="container_message_1"><div style="top: 32px; z-index: 2001;" class="h-message is-success h-message-fade-enter-from h-message-fade-enter-active"><svg class="a-icon h-icon_success_filled_light h-icon__success_filled_light h-message__status-icon" viewBox="0 0 24 24" fill="none" style="display: inline-block; vertical-align: inherit;"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z" fill="#26BD4B"></path>
        <path d="M18 8.45844C17.4027 7.83437 16.4822 7.89062 15.881 8.45844L10.4789 14.1026L8.11902 11.6397C7.52168 11.0156 6.60125 11.0719 6 11.6397L9.95379 15.7707C10.2219 16.0508 10.6421 16.0739 10.9354 15.8416L18 8.45844Z" fill="white"></path></svg><p class="h-message__content h-message__plaintext">success test<!----></p><!----></div></div>"
      `,
      );
      message.close();
    });

    test('warning message', async () => {
      const message = HMessage.warning('warning test');
      await nextTick();
      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `
        "<div class="container_message_2"><div style="top: 32px; z-index: 2002;" class="h-message is-warning h-message-fade-enter-from h-message-fade-enter-active"><svg class="a-icon h-icon_warning_filled_light h-icon__warning_filled_light h-message__status-icon" viewBox="0 0 24 24" fill="none" style="display: inline-block; vertical-align: inherit;"><path d="M12 22C17.5228 22 22 17.5229 22 12C22 6.4772 17.5228 2 12 2C6.47715 2 2 6.4772 2 12C2 17.5229 6.47715 22 12 22Z" fill="#FD8C08"></path>
        <path d="M12 16C12.5523 16 13 16.4477 13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16ZM11.2901 6C12.0699 6 12.7106 6.59491 12.7832 7.35554L12.7901 7.5V13C12.7901 13.797 12.1822 14.3882 11.4323 14.4873L11.2901 14.5V6Z" fill="white"></path></svg><p class="h-message__content h-message__plaintext">warning test<!----></p><!----></div></div>"
      `,
      );
      message.close();
    });

    test('error message', async () => {
      const message = HMessage.error('error test');
      await nextTick();
      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `"<div class="container_message_3"><div style="top: 32px; z-index: 2003;" class="h-message is-error h-message-fade-enter-from h-message-fade-enter-active"><svg class="a-icon h-icon_error_filled_light h-icon__error_filled_light h-message__status-icon" viewBox="0 0 24 24" fill="none" style="display: inline-block; vertical-align: inherit;"><path d="M12 22C17.5228 22 22 17.5229 22 12C22 6.4772 17.5228 2 12 2C6.47715 2 2 6.4772 2 12C2 17.5229 6.47715 22 12 22Z" fill="#E83030"></path><path d="M10.9457 12.3098L7 16.2632C7.58192 16.8462 8.52661 16.8462 9.10853 16.2632L12 13.3661L14.8915 16.2633C15.4734 16.8463 16.4181 16.8463 17 16.2633L13.0542 12.3098L15.9457 9.41268C16.5283 8.82896 16.5283 7.88377 15.9457 7.30005L12 11.2535L8.05427 7.30014C7.47168 7.88386 7.47168 8.82905 8.05427 9.41277L10.9457 12.3098Z" fill="#FFFFFF"></path></svg><p class="h-message__content h-message__plaintext">error test<!----></p><!----></div></div>"`,
      );
      message.close();
    });

    test('info message', async () => {
      const message = HMessage.info('info test');
      await nextTick();
      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `
        "<div class="container_message_4"><div style="top: 32px; z-index: 2004;" class="h-message is-info h-message-fade-enter-from h-message-fade-enter-active"><svg class="a-icon h-icon_info_filled_light h-icon__info_filled_light h-message__status-icon" viewBox="0 0 24 24" fill="none" style="display: inline-block; vertical-align: inherit;"><path d="M12 22C17.5228 22 22 17.5229 22 12C22 6.4772 17.5228 2 12 2C6.47715 2 2 6.4772 2 12C2 17.5229 6.47715 22 12 22Z" fill="#1880F2"></path>
        <path d="M11.2901 9.5L11.4323 9.51273C12.1822 9.61178 12.7901 10.203 12.7901 11V16.5L12.7832 16.6445C12.7106 17.4051 12.0699 18 11.2901 18V9.5ZM12 6C12.5523 6 13 6.44772 13 7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7C11 6.44772 11.4477 6 12 6Z" fill="white"></path></svg><p class="h-message__content h-message__plaintext">info test<!----></p><!----></div></div>"
      `,
      );
      message.close();
    });

    test('loading message', async () => {
      const message = HMessage.loading('loading test');
      await nextTick();
      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `"<div class="container_message_5"><div style="top: 32px; z-index: 2005;" class="h-message is-loading h-message-fade-enter-from h-message-fade-enter-active"><svg class="h-loading-icon circular h-message__status-icon" viewBox="25 25 50 50" aria-hidden="true" focusable="false"><circle class="h-loading-icon__path path" cx="50" cy="50" r="20" fill="none" stroke-width="4.8"></circle></svg><p class="h-message__content h-message__plaintext">loading test<svg class="a-icon h-icon_more_two h-icon__more_two h-message__ellipsis" viewBox="0 0 24 24" fill="none" style="width: 1em; height: 1em; font-size: 1em; display: inline-block; vertical-align: inherit;"><path d="M4 10.7502C4.69036 10.7502 5.25 11.3099 5.25 12.0002C5.25 12.6906 4.69036 13.2502 4 13.2502C3.30964 13.2502 2.75 12.6906 2.75 12.0002C2.75 11.3099 3.30964 10.7502 4 10.7502Z" fill="currentColor"></path><path d="M12 10.7502C12.6904 10.7502 13.25 11.3099 13.25 12.0002C13.25 12.6906 12.6904 13.2502 12 13.2502C11.3096 13.2502 10.75 12.6906 10.75 12.0002C10.75 11.3099 11.3096 10.7502 12 10.7502Z" fill="currentColor"></path><path d="M21.25 12.0002C21.25 11.3099 20.6904 10.7502 20 10.7502C19.3096 10.7502 18.75 11.3099 18.75 12.0002C18.75 12.6906 19.3096 13.2502 20 13.2502C20.6904 13.2502 21.25 12.6906 21.25 12.0002Z" fill="currentColor"></path></svg></p><!----></div></div>"`,
      );
      message.update({ message: 'updated loading test', type: 'success' });
      await nextTick();
      expect(document.body.innerHTML).toMatchInlineSnapshot(
        `
        "<div class="container_message_5"><div style="top: 32px; z-index: 2005;" class="h-message is-success h-message-fade-enter-from h-message-fade-enter-active"><svg class="a-icon h-icon_success_filled_light h-icon__success_filled_light h-message__status-icon" viewBox="0 0 24 24" fill="none" style="display: inline-block; vertical-align: inherit;"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z" fill="#26BD4B"></path>
        <path d="M18 8.45844C17.4027 7.83437 16.4822 7.89062 15.881 8.45844L10.4789 14.1026L8.11902 11.6397C7.52168 11.0156 6.60125 11.0719 6 11.6397L9.95379 15.7707C10.2219 16.0508 10.6421 16.0739 10.9354 15.8416L18 8.45844Z" fill="white"></path></svg><p class="h-message__content h-message__plaintext">updated loading test<!----></p><!----></div></div>"
      `,
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
        `
        "<div class="container_message_6"><div style="top: 32px; z-index: 2006;" class="h-message is-success h-message-fade-enter-from h-message-fade-enter-active"><svg class="a-icon h-icon_success_filled_light h-icon__success_filled_light h-message__status-icon" viewBox="0 0 24 24" fill="none" style="display: inline-block; vertical-align: inherit;"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z" fill="#26BD4B"></path>
        <path d="M18 8.45844C17.4027 7.83437 16.4822 7.89062 15.881 8.45844L10.4789 14.1026L8.11902 11.6397C7.52168 11.0156 6.60125 11.0719 6 11.6397L9.95379 15.7707C10.2219 16.0508 10.6421 16.0739 10.9354 15.8416L18 8.45844Z" fill="white"></path></svg><p class="h-message__content h-message__plaintext">message 1<!----></p><!----></div></div><div class="container_message_7"><div style="top: 52px; z-index: 2007;" class="h-message is-warning h-message-fade-enter-from h-message-fade-enter-active"><svg class="a-icon h-icon_warning_filled_light h-icon__warning_filled_light h-message__status-icon" viewBox="0 0 24 24" fill="none" style="display: inline-block; vertical-align: inherit;"><path d="M12 22C17.5228 22 22 17.5229 22 12C22 6.4772 17.5228 2 12 2C6.47715 2 2 6.4772 2 12C2 17.5229 6.47715 22 12 22Z" fill="#FD8C08"></path>
        <path d="M12 16C12.5523 16 13 16.4477 13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16ZM11.2901 6C12.0699 6 12.7106 6.59491 12.7832 7.35554L12.7901 7.5V13C12.7901 13.797 12.1822 14.3882 11.4323 14.4873L11.2901 14.5V6Z" fill="white"></path></svg><p class="h-message__content h-message__plaintext">message 2<!----></p><!----></div></div>"
      `,
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
        `
        "<div class="container_message_8"><div style="top: 32px; z-index: 2008;" class="h-message is-success h-message-fade-enter-from h-message-fade-leave-from h-message-fade-leave-active"><svg class="a-icon h-icon_success_filled_light h-icon__success_filled_light h-message__status-icon" viewBox="0 0 24 24" fill="none" style="display: inline-block; vertical-align: inherit;"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z" fill="#26BD4B"></path>
        <path d="M18 8.45844C17.4027 7.83437 16.4822 7.89062 15.881 8.45844L10.4789 14.1026L8.11902 11.6397C7.52168 11.0156 6.60125 11.0719 6 11.6397L9.95379 15.7707C10.2219 16.0508 10.6421 16.0739 10.9354 15.8416L18 8.45844Z" fill="white"></path></svg><p class="h-message__content h-message__plaintext">message 1<!----></p><!----></div><!----></div><div class="container_message_9"><div style="top: 32px; z-index: 2009;" class="h-message is-info h-message-fade-enter-from h-message-fade-enter-active"><svg class="a-icon h-icon_info_filled_light h-icon__info_filled_light h-message__status-icon" viewBox="0 0 24 24" fill="none" style="display: inline-block; vertical-align: inherit;"><path d="M12 22C17.5228 22 22 17.5229 22 12C22 6.4772 17.5228 2 12 2C6.47715 2 2 6.4772 2 12C2 17.5229 6.47715 22 12 22Z" fill="#1880F2"></path>
        <path d="M11.2901 9.5L11.4323 9.51273C12.1822 9.61178 12.7901 10.203 12.7901 11V16.5L12.7832 16.6445C12.7106 17.4051 12.0699 18 11.2901 18V9.5ZM12 6C12.5523 6 13 6.44772 13 7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7C11 6.44772 11.4477 6 12 6Z" fill="white"></path></svg><p class="h-message__content h-message__plaintext">message 2<!----></p><!----></div></div>"
      `,
      );
    });
  });
});
