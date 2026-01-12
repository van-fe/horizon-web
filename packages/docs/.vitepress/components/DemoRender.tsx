import { defineCustomElement, defineComponent, createApp, ref, watch, onMounted, onUnmounted, getCurrentInstance, type App, type ComponentOptions } from "vue";
import * as Vue from 'vue';
import { default as HorizonWeb } from '@aurora/horizon-web';
import { customAlphabet } from 'nanoid';
import horizonWebStyles from '@aurora/horizon-web/src/styles/index.scss?inline';
import { parse, compileScript, compileTemplate, compileStyle, type SFCScriptBlock, type SFCScriptCompileOptions } from '@vue/compiler-sfc';

// 编译 Vue 文件字符串的内部函数
function compileVueString(
  vueFileContent: string, 
  componentId: string, 
  options: Omit<SFCScriptCompileOptions, 'id'> = {},
  moduleResolver?: (moduleName: string, moduleSource: string) => any
) {
  // 1. 解析 SFC
  const { descriptor } = parse(vueFileContent);

  let scriptResult: SFCScriptBlock | null = null;

  // 2. 编译 script
  if (descriptor?.script || descriptor?.scriptSetup) {
    scriptResult = compileScript(descriptor, {
      id: componentId,
      ...options
    });
  }

  // 3. 编译 style
  const styles = descriptor?.styles || [];
  const styleResults = styles.map((style) => {
    return compileStyle({
      source: style.content,
      filename: 'example.vue',
      id: componentId,
      scoped: false
    });
  });

  // 4. 编译 template
  const templateResult = compileTemplate({
    source: descriptor?.template?.content || '',
    filename: 'example.vue',
    id: componentId,
  });

  // 5. 组合组件选项
  let componentOptions: ComponentOptions = {};
  
  try {
    // 构建完整的组件代码
    const scriptCode = scriptResult?.content || '';
    const templateCode = templateResult.code || '';

    console.log({scriptResult});
    
    // 提取 render 函数（从 template 编译结果）
    let render: any = null;
    if (templateCode) {
      try {
        // 移除可能的 import 语句
        let processedTemplateCode = templateCode;
        processedTemplateCode = processedTemplateCode.replace(/import\s+.*?\s+from\s+['"][^'"]+['"];?\s*/g, '');
        processedTemplateCode = processedTemplateCode.replace(/export\s+/g, '');
        processedTemplateCode = processedTemplateCode.replace(/\n\s*\n\s*\n+/g, '\n\n');
        
        // 使用 IIFE 包装整个代码
        const wrappedCode = `
          (function() {
            ${processedTemplateCode}
            return typeof render !== 'undefined' ? render : null;
          })
        `;
        
        const templateModule = new Function('helpers', wrappedCode);
        render = templateModule();
      } catch (err) {
        console.warn('Failed to execute template code:', err);
        render = null;
      }
    }
    
    // 处理 script 代码
    if (scriptCode) {
      try {
        // 创建模块映射
        const moduleMap: Record<string, any> = {};
        
        // 处理每个导入
        for (const [moduleName, importBinding] of Object.entries(scriptResult?.imports || {})) {
          try {
            let module: any = null;
            debugger;
            if (moduleResolver) {
              module = moduleResolver(importBinding.source);
            } else {
              module = require(importBinding.source);
            }
            
            moduleMap[moduleName] = module[moduleName] || {};
          } catch {
            console.warn(`Failed to resolve module: ${moduleName} from ${importBinding.source}`);
            moduleMap[moduleName] = {};
          }
        }

        console.log({moduleMap});

        let processedScriptCode = '';

        for (const [key, value] of Object.entries(moduleMap)) {
          processedScriptCode += `const ${key} = ${JSON.stringify(value)};\n`;
        }

        console.log({processedScriptCode});

        // 执行 script 代码
        const scriptModule = new Function(
          '__modules__',
          'defineComponent',
          `
          ${processedScriptCode}
          
          // 尝试获取导出的组件
          if (typeof __sfc__ !== 'undefined') {
            return __sfc__;
          }
          if (typeof default !== 'undefined') {
            return default;
          }
          return {};
          `
        );
        
        // 提供必要的依赖
        const { defineComponent: dc } = require('vue');
        const componentFromScript = scriptModule(moduleMap, dc);
        
        // 合并组件选项
        if (componentFromScript) {
          if (typeof componentFromScript === 'function') {
            componentOptions = componentFromScript;
          } else if (typeof componentFromScript === 'object') {
            componentOptions = { ...componentOptions, ...componentFromScript };
          }
        }
      } catch (error) {
        console.warn('Error executing script code:', error);
        if (scriptResult?.bindings) {
          componentOptions = { ...componentOptions, ...scriptResult.bindings };
        }
      }
    }
    
    // 添加 render 函数
    if (render && typeof render === 'function') {
      componentOptions.render = render;
    } else if (templateCode && !render) {
      componentOptions.template = descriptor?.template?.content || '';
    }
    
    // 如果 componentOptions 仍然是空对象，创建一个基本组件
    if (Object.keys(componentOptions).length === 0) {
      if (render && typeof render === 'function') {
        componentOptions = defineComponent({
          render
        });
      } else if (descriptor?.template?.content) {
        componentOptions = defineComponent({
          template: descriptor.template.content
        });
      }
    }
  } catch (error) {
    console.error('Error creating component:', error);
    componentOptions = defineComponent({
      template: descriptor?.template?.content || '<div>Component compilation failed</div>'
    });
  }

  return {
    descriptor,
    scriptResult,
    templateResult,
    styleResults,
    componentOptions
  };
}

// 定义 Vue 组件
const DemoRenderComponent = defineComponent({
  name: 'DemoRender',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const appInstance = ref<App | null>(null);
    const containerRef = ref<HTMLDivElement | null>(null);
    const componentId = ref(`demo-${customAlphabet('abcdefghijklmnopqrstuvwxyz', 10)()}`);
    const errorMessage = ref<string>('');
    const shadowRootRef = ref<ShadowRoot | null>(null);
    const parsedContentRef = ref<{
      template: string;
      script: string;
      scriptSetup: string;
      styles: Array<{
        content: string;
        lang: string;
        scoped: boolean;
        module: boolean | string;
      }>;
    } | null>(null);

    // 解析 props.content 中的 script 和 style 标签内容
    const parseContentTags = (content: string) => {
      try {
        const { descriptor } = parse(content);
        
        const result = {
          template: descriptor.template?.content || '',
          script: descriptor.script?.content || '',
          scriptSetup: descriptor.scriptSetup?.content || '',
          styles: descriptor.styles?.map(style => ({
            content: style.content,
            lang: style.lang || 'css',
            scoped: style.scoped || false,
            module: style.module || false
          })) || []
        };

        return result;
      } catch (error) {
        console.warn('Failed to parse content tags:', error);
        return {
          template: '',
          script: '',
          scriptSetup: '',
          styles: []
        };
      }
    };

    // 执行 script 内容（用于执行一些全局设置或副作用代码）
    const executeScriptContent = (scriptContent: string, moduleResolver?: (modulePath: string) => any) => {
      if (!scriptContent || !scriptContent.trim()) {
        return;
      }

      try {
        // 解析 import 语句
        const importPattern = /import\s+([^'"]+?)\s+from\s+['"]([^'"]+)['"]/g;
        const importStatements: Array<{ statement: string; from: string; importSpec: string }> = [];
        let match;
        
        while ((match = importPattern.exec(scriptContent)) !== null) {
          importStatements.push({
            statement: match[0],
            from: match[2],
            importSpec: match[1].trim()
          });
        }

        // 创建模块映射
        const moduleMap: Record<string, any> = {};
        
        for (const imp of importStatements) {
          try {
            let module: any = null;
            
            if (moduleResolver) {
              module = moduleResolver(imp.from);
            } else {
              if (imp.from === 'vue' || imp.from.startsWith('@vue/')) {
                try {
                  module = require('vue');
                } catch {
                  module = (globalThis as any).Vue || {};
                }
              } else {
                try {
                  module = require(imp.from);
                } catch {
                  const globalModule = (globalThis as any)[imp.from] || (globalThis as any).__MODULES__?.[imp.from];
                  module = globalModule || {};
                }
              }
            }
            
            moduleMap[imp.from] = module || {};
          } catch {
            console.warn(`Failed to resolve module for script execution: ${imp.from}`);
            moduleMap[imp.from] = {};
          }
        }

        // 替换 import 语句
        let processedScript = scriptContent;
        importStatements.forEach((imp) => {
          const modulePath = imp.from;
          const importSpec = imp.importSpec;
          
          let replacement = '';
          if (importSpec === 'default' || /^\w+$/.test(importSpec)) {
            const varName = importSpec === 'default' ? '__default__' : importSpec;
            replacement = `const ${varName} = __modules__['${modulePath}'].default || __modules__['${modulePath}'];`;
          } else if (importSpec.startsWith('*')) {
            const namespaceMatch = importSpec.match(/\*\s+as\s+(\w+)/);
            const namespaceName = namespaceMatch ? namespaceMatch[1] : '__namespace__';
            replacement = `const ${namespaceName} = __modules__['${modulePath}'];`;
          } else if (importSpec.startsWith('{')) {
            const namedImports = importSpec.slice(1, -1).split(',').map(i => i.trim());
            const declarations: string[] = [];
            
            namedImports.forEach(namedImport => {
              const [original, alias] = namedImport.split(/\s+as\s+/).map(s => s.trim());
              const finalName = alias || original;
              declarations.push(`const ${finalName} = __modules__['${modulePath}']['${original}'];`);
            });
            
            replacement = declarations.join('\n');
          }
          
          processedScript = processedScript.replace(imp.statement, replacement);
        });

        // 执行 script 代码
        const scriptExecutor = new Function('__modules__', processedScript);
        scriptExecutor(moduleMap);
      } catch (error) {
        console.warn('Failed to execute script content:', error);
      }
    };

    // 注入 horizon-web 样式到 shadow DOM
    const injectHorizonWebStyles = (shadowRoot: ShadowRoot) => {
      // 创建样式元素并注入到 shadow DOM
      const styleElement = document.createElement('style');
      styleElement.setAttribute('data-horizon-web-styles', 'true');
      styleElement.textContent = (horizonWebStyles as string) || '';
      shadowRoot.insertBefore(styleElement, shadowRoot.firstChild);
    };

    // 获取 shadowRoot 的辅助函数
    const getShadowRoot = (): ShadowRoot | null => {
      if (shadowRootRef.value) {
        return shadowRootRef.value;
      }
      // 尝试从当前实例获取
      const instance = getCurrentInstance();
      if (instance?.vnode.el) {
        const root = instance.vnode.el.getRootNode();
        if (root instanceof ShadowRoot) {
          shadowRootRef.value = root;
          return root;
        }
      }
      // 尝试从容器元素获取
      if (containerRef.value) {
        const root = containerRef.value.getRootNode();
        if (root instanceof ShadowRoot) {
          shadowRootRef.value = root;
          return root;
        }
      }
      return null;
    };

    const renderComponent = () => {
      try {
        errorMessage.value = '';

        // 清理旧的实例
        if (appInstance.value) {
          appInstance.value.unmount();
          appInstance.value = null;
        }

        // 清空容器
        if (containerRef.value) {
          containerRef.value.innerHTML = '';
        }

        if (!props.content) {
          return;
        }

        // 解析 content 中的 script 和 style 标签
        const parsedTags = parseContentTags(props.content);
        parsedContentRef.value = parsedTags;
        
        // 模块解析器函数
        const moduleResolver = (modulePath: string) => {
          if (modulePath === 'vue' || modulePath.startsWith('@vue/')) {
            try {
              return Vue;
            } catch {
              return (globalThis as any).Vue || {};
            }
          }
          // 尝试从全局获取
          const globalModule = (globalThis as any)[modulePath] || (globalThis as any).__MODULES__?.[modulePath];
          if (globalModule) {
            return globalModule;
          }
          // 尝试 require
          try {
            return require(modulePath);
          } catch {
            return {};
          }
        };

        // 执行解析出的 script 内容（如果有需要提前执行的代码）
        // 注意：script setup 会在 compileVueString 中自动处理
        if (parsedTags.script) {
          executeScriptContent(parsedTags.script, moduleResolver);
        }

        // 编译 Vue 文件片段（这会自动处理 script setup 和执行）
        const result = compileVueString(
          props.content,
          componentId.value,
          {},
          moduleResolver
        );

        const componentIdStr = `component-${componentId.value}`;

        // 创建组件
        const component = defineComponent({
          ...result.componentOptions,
          name: `DemoComponent-${componentId.value}`,
        });

        // 创建 Vue 应用并挂载到容器
        if (containerRef.value) {
          const app = createApp(component).use(HorizonWeb);
          app.mount(containerRef.value);
          appInstance.value = app;

          // 将样式注入到 Shadow DOM（而不是 document.head）
          const shadowRoot = getShadowRoot();
          if (shadowRoot && containerRef.value) {
            // 使用编译后的样式结果（优先）
            if (result.styleResults && result.styleResults.length > 0) {
              // 创建新的样式元素并插入到 Shadow DOM
              const styleElement = document.createElement('style');
              styleElement.setAttribute('data-vue-component', componentIdStr);
              styleElement.textContent = result.styleResults.map(result => result.code).join('\n');
              // 将样式插入到容器之前
              shadowRoot.insertBefore(styleElement, containerRef.value);
            } 
            // 如果没有编译结果，使用解析出的原始样式内容（作为备用）
            else if (parsedContentRef.value?.styles && parsedContentRef.value.styles.length > 0) {
              const oldStyle = shadowRoot.querySelector(`style[data-horizon-web-styles]`);
              if (oldStyle) {
                oldStyle.remove();
              }

              // 创建样式元素，使用原始样式内容
              const styleElement = document.createElement('style');
              styleElement.setAttribute('data-horizon-web-styles', componentIdStr);
              styleElement.textContent = parsedContentRef.value.styles.map(style => style.content).join('\n');
              shadowRoot.insertBefore(styleElement, containerRef.value);
            }
          }
        }
      } catch (error) {
        console.error('Failed to render Vue component in Shadow DOM:', error);
        errorMessage.value = `渲染失败: ${error instanceof Error ? error.message : String(error)}`;
        
        // 显示错误信息
        if (containerRef.value) {
          const errorDiv = document.createElement('div');
          errorDiv.textContent = errorMessage.value;
          errorDiv.style.color = 'red';
          errorDiv.style.padding = '10px';
          errorDiv.style.border = '1px solid red';
          errorDiv.style.borderRadius = '4px';
          errorDiv.style.margin = '10px';
          containerRef.value.appendChild(errorDiv);
        }
      }
    };

    // 监听 content 变化
    watch(() => props.content, () => {
      renderComponent();
    }, { immediate: false });

    // 组件挂载时渲染
    onMounted(() => {
      // 在挂载后获取 shadowRoot
      const instance = getCurrentInstance();
      if (instance?.vnode.el) {
        const root = instance.vnode.el.getRootNode();
        if (root instanceof ShadowRoot) {
          shadowRootRef.value = root;
          // 注入 horizon-web 样式
          injectHorizonWebStyles(root);
        }
      }
      renderComponent();
    });

    // 组件卸载时清理
    onUnmounted(() => {
      if (appInstance.value) {
        appInstance.value.unmount();
        appInstance.value = null;
      }
    });

    return () => (
      <div ref={containerRef} id={componentId.value}></div>
    );
  }
});

// 使用 defineCustomElement 创建自定义元素
// defineCustomElement 可以直接接收组件定义
const DemoRender = defineCustomElement(DemoRenderComponent);

// 注册自定义元素
if (typeof window !== 'undefined' && !window.customElements.get('demo-render')) {
  window.customElements.define('demo-render', DemoRender);
}

export default DemoRender;