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
  let styleElement: HTMLStyleElement | undefined;

  async function loadOriginal() {
    if (!loader) return;
    const module = (await loader()) as DemoModule;
    if (!disposed) {
      component.value = markRaw(module.default);
      updateStyle('');
      error.value = '';
    }
  }

  async function compile(source: string) {
    const sequence = ++compileSequence;
    compiling.value = true;
    error.value = '';

    try {
      const result = import.meta.env.DEV
        ? await compileWithVite(source)
        : await compileInBrowser(source);
      if (sequence !== compileSequence || disposed) return;
      component.value = markRaw(result.component);
      updateStyle(result.css);
      renderKey.value += 1;
    } catch (reason) {
      if (sequence === compileSequence && !disposed) {
        error.value = reason instanceof Error ? reason.message : String(reason);
      }
    } finally {
      if (sequence === compileSequence && !disposed) compiling.value = false;
    }
  }

  async function compileWithVite(source: string) {
    const response = await fetch(COMPILE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: demoId, path, source }),
    });
    const result = (await response.json()) as { url?: string; error?: string };
    if (!response.ok || !result.url) throw new Error(result.error || 'Compilation failed');
    const module = (await import(/* @vite-ignore */ result.url)) as DemoModule;
    return { component: module.default, css: '' };
  }

  async function compileInBrowser(source: string) {
    const { compileStaticDemo } = await import('./staticDemoCompiler');
    return compileStaticDemo(source, path, demoId);
  }

  function updateStyle(css: string) {
    if (!css) {
      styleElement?.remove();
      styleElement = undefined;
      return;
    }
    styleElement ||= document.createElement('style');
    styleElement.dataset.horizonLiveDemo = demoId;
    styleElement.textContent = css;
    if (!styleElement.isConnected) document.head.append(styleElement);
  }

  function refresh() {
    renderKey.value += 1;
  }

  onBeforeUnmount(() => {
    disposed = true;
    compileSequence += 1;
    styleElement?.remove();
  });

  void loadOriginal().catch(reason => {
    error.value = reason instanceof Error ? reason.message : String(reason);
  });

  return { component, renderKey, compiling, error, compile, refresh, loadOriginal };
}
