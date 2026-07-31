import { markRaw, onBeforeUnmount, ref, shallowRef, type Component } from 'vue';

interface DemoModule {
  default: Component;
}

type DemoLoader = () => Promise<unknown>;

const COMPILE_ENDPOINT = '/__horizon_live_demo';
let nextDemoId = 0;

export function useLiveDemo(path: string, loader?: DemoLoader) {
  const component = shallowRef<Component>();
  const renderKey = ref(0);
  const compiling = ref(false);
  const error = ref('');
  const demoId = `demo-${++nextDemoId}`;
  let compileSequence = 0;
  let disposed = false;

  async function loadOriginal() {
    if (!loader) return;
    const module = (await loader()) as DemoModule;
    if (!disposed) component.value = markRaw(module.default);
  }

  async function compile(source: string) {
    const sequence = ++compileSequence;
    compiling.value = true;
    error.value = '';

    try {
      const response = await fetch(COMPILE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: demoId, path, source }),
      });
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('Live compilation is available in docs:dev mode');
      }

      const result = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !result.url) throw new Error(result.error || 'Compilation failed');

      const module = (await import(/* @vite-ignore */ result.url)) as DemoModule;
      if (sequence !== compileSequence || disposed) return;
      component.value = markRaw(module.default);
      renderKey.value += 1;
    } catch (reason) {
      if (sequence === compileSequence && !disposed) {
        error.value = reason instanceof Error ? reason.message : String(reason);
      }
    } finally {
      if (sequence === compileSequence && !disposed) compiling.value = false;
    }
  }

  function refresh() {
    renderKey.value += 1;
  }

  onBeforeUnmount(() => {
    disposed = true;
    compileSequence += 1;
  });

  void loadOriginal().catch(reason => {
    error.value = reason instanceof Error ? reason.message : String(reason);
  });

  return { component, renderKey, compiling, error, compile, refresh, loadOriginal };
}
