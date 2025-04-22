import type { CSSProperties } from 'vue';
import { computed, createVNode, defineComponent, render } from 'vue';
import type { LoadingBarOptions } from '../composables/useProps';
import { useLoadingBarOptions } from '../composables/useProps';
import { cls, ComponentClassBlock, useNamespace } from '@nio-fe/shared';
import { useSensor } from '~/utils/useSensor';
import { NTransition } from '~/components/Transition';

const NLoadingBarComponent = defineComponent({
  name: `${useNamespace()}LoadingBar`,
  desc: '在页面最顶端创建了一个用于显示页面加载、异步请求文件上传的加载进度条，缓解用户等待时的焦虑感，因为可复用性的关系，全局只会存在一个loadingBar的实例',
  components: {
    NTransition,
  },
  props: useLoadingBarOptions,
  setup(props) {
    const outerStyles = computed<CSSProperties>(() => ({
      height: `${props.height}px`,
    }));
    const styles = computed<CSSProperties>(() => {
      return {
        width: `${props.percent}%`,
        height: `${props.height}px`,
      };
    });
    const classHelper = new ComponentClassBlock('loading-bar');
    return () => (
      <NTransition name="fade-in">
        <div v-show={props.show} class={cls(classHelper.block)} style={outerStyles.value}>
          <div
            class={cls(
              {
                [classHelper.em('bar', 'primary')]: props.status === 'primary',
                [classHelper.em('bar', 'error')]: props.status === 'error',
              },
              [classHelper.e('bar')],
            )}
            style={styles.value}
          ></div>
        </div>
      </NTransition>
    );
  },
});

NLoadingBarComponent.newInstance = (properties: LoadingBarOptions) => {
  const _props = properties || {};

  const loadingBarNode: any = createVNode(NLoadingBarComponent, {
    height: _props.height,
    percent: _props.percent,
    status: _props.status,
    show: _props.show,
  });

  let root: HTMLElement | null = document.createElement('div');
  document.body.appendChild(root);
  render(loadingBarNode, root);

  useSensor('$loadingBar', properties, 'method');

  return {
    update(options: { percent?: number; status?: number; show?: boolean; height?: number }) {
      if ('percent' in options) {
        loadingBarNode.component.props.percent = options.percent;
      }
      if ('status' in options) {
        loadingBarNode.component.props.status = options.status;
      }
      if ('show' in options) {
        loadingBarNode.component.props.show = options.show;
      }
      if ('height' in options) {
        loadingBarNode.component.props.height = options.height;
      }
    },
    unmount() {
      if (root) {
        render(null, root);
        document.body?.removeChild(root);
        root = null;
      }
    },
  };
};

export default NLoadingBarComponent;
