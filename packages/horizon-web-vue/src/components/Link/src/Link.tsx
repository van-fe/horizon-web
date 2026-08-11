import type { ComputedRef } from 'vue';
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  nextTick,
  onMounted,
  ref,
} from 'vue';
import { useLinkProps } from './composables/useProps';
import type { Router } from 'vue-router';
import type { HorizonWebSetupContext } from '@aurora/utils';
import { cls, ComponentClassBlock, HChildOnly, useNamespace } from '@aurora/utils';
import type { LinkEmits } from './composables/useEmits';
import { useLinkEmits } from './composables/useEmits';
import type { LinkSlots } from './composables/useSlots';
import { useLinkSlots } from './composables/useSlots';
import { GlobalSizeInjectedKey } from '~/components/Application/src/utils/injectedKeys';
import type { HApplicationSizeType } from '~/components/Application/src/composables/useProps';
import { defaultLocale, localeInjectKey } from '~/provides';
import { renderIcon } from '~/utils/useIcon';
import LoadingIcon from '~/directives/v-loading/src/components/LoadingIcon';

export default defineComponent({
  name: `${useNamespace()}Link`,
  desc: '文字超链接',
  descLocales: { en: 'Basic text link usage' },
  props: useLinkProps,
  emits: useLinkEmits,
  slots: useLinkSlots,
  setup(props, { slots, emit }: HorizonWebSetupContext<LinkEmits, LinkSlots>) {
    const classHelper = new ComponentClassBlock('link');
    const instance = getCurrentInstance();
    const router = instance?.appContext.config.globalProperties.$router as Router | undefined;
    const redirectHref = computed(() => {
      if (props.to) {
        if (!router) {
          console.warn(
            `You haven't import "vue-router". The props of 'to' and 'replace' will be ignored.`,
          );
          return props.href;
        } else {
          return router.resolve(props.to).href;
        }
      }
      return props.href;
    });

    // global size
    const globalSize = inject(GlobalSizeInjectedKey, ref('medium'));
    const sizeRef = computed(
      () => props.size || globalSize.value,
    ) as ComputedRef<HApplicationSizeType>;

    // locale
    const locale = inject(localeInjectKey, defaultLocale);

    const onClick = (evt: MouseEvent): void => {
      if (props.anchor || props.loading || props.disabled) {
        evt.preventDefault();
        return;
      }

      if (props.to && router) {
        evt.preventDefault();
        props.replace ? router.replace(props.to) : router.push(props.to);
        return;
      }

      emit('click', evt);
    };

    const onClickAnchor = (evt: MouseEvent): void => {
      if (props.anchor) {
        evt.stopPropagation();
        evt.preventDefault();
        scrollToCurrent();
      }
    };

    const scrollToCurrent = (): void => {
      nextTick(() => {
        const scrollTarget =
          typeof props.scrollTarget === 'string'
            ? document.querySelector(props.scrollTarget)
            : props.scrollTarget;

        if (!scrollTarget) {
          console.warn('Cannot find scroll-target');
          return;
        }

        const scrollTo =
          instance?.proxy?.$el.getBoundingClientRect().y -
          (props.anchorOffset || 0) +
          scrollTarget.scrollTop -
          scrollTarget.getBoundingClientRect().y;

        scrollTarget.scroll({ top: scrollTo, behavior: 'smooth' });
        window.location.hash = `#${props.anchor}`;
      });
    };

    const loadingSvgSizeMapping = {
      small: 12,
      medium: 16,
      large: 16,
    };

    onMounted(() => {
      if (props.anchor) {
        const hash = window.location.hash.replace(/^#/, '');
        if (hash === props.anchor) {
          scrollToCurrent();
        }
      }
    });

    const contentRender = () => (
      <HChildOnly>
        {slots.prefix ? <span class={classHelper.e('prefix')}>{slots.prefix?.()}</span> : ''}
        <span class={classHelper.e('inner')}>{slots.default?.()}</span>
        {slots.suffix ? <span class={classHelper.e('suffix')}>{slots.suffix?.()}</span> : ''}
        {props.icon ? (
          <span class={classHelper.e('suffix')}>
            {renderIcon(props.icon, undefined, { size: props.iconSize })}
          </span>
        ) : (
          ''
        )}
        {!!props.anchor && (
          <a
            class={classHelper.e('anchor')}
            href={`#${props.anchor}`}
            target={props.target}
            onClick={onClickAnchor}
          >
            #
          </a>
        )}
      </HChildOnly>
    );

    const wrapperElement = computed(() => (props.anchor ? 'span' : 'a'));
    const isAction = computed(() => !props.anchor && !redirectHref.value);

    const onActionKeydown = (evt: KeyboardEvent) => {
      if (!isAction.value || props.disabled || props.loading) return;

      if (evt.key === 'Enter' || evt.key === ' ') {
        evt.preventDefault();
        (evt.currentTarget as HTMLElement).click();
      }
    };

    return () => (
      <wrapperElement.value
        class={cls(
          classHelper.block,
          classHelper.m(props.type),
          classHelper.m(sizeRef.value),
          classHelper.is('disabled', props.disabled),
          classHelper.has('underline', !!props.underline),
          classHelper.is('underline-always', props.underline === 'always'),
          classHelper.has('attribute', props.attribute),
          classHelper.has('anchor', !!props.anchor),
          classHelper.is('anchor-left', props.anchorPosition === 'left'),
        )}
        href={props.disabled ? undefined : redirectHref.value}
        target={props.target}
        role={isAction.value ? 'button' : undefined}
        tabindex={isAction.value && !props.disabled && !props.loading ? 0 : undefined}
        aria-disabled={isAction.value && (props.disabled || props.loading) ? true : undefined}
        onClick={onClick}
        onKeydown={onActionKeydown}
      >
        {props.loading ? (
          <HChildOnly>
            <LoadingIcon
              class={classHelper.e('loading-icon')}
              style={{
                width: `${loadingSvgSizeMapping[sizeRef.value]}px`,
                height: `${loadingSvgSizeMapping[sizeRef.value]}px`,
              }}
            />
            <span class={classHelper.e('inner')}>
              {locale.value?.langService.td().horizonWeb.link.loading}
            </span>
          </HChildOnly>
        ) : (
          contentRender()
        )}
      </wrapperElement.value>
    );
  },
});
