import { parse, compileScript, compileTemplate, compileStyle, type SFCScriptBlock, type SFCScriptCompileOptions } from '@vue/compiler-sfc';
import { defineComponent, type ComponentOptions } from 'vue';

export default function (
  vueFileContent: string, 
  componentId: string, 
  options: Omit<SFCScriptCompileOptions, 'id'> = {},
  moduleResolver?: (modulePath: string) => any
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

    // 4. 编译 style
    const styles = descriptor?.styles || [];
    const styleResults = styles.map((style) => {
      return compileStyle({
        source: style.content,
        filename: 'example.vue',
        id: componentId,
        scoped: false
      });
    });

    // 3. 编译 template
    const templateResult = compileTemplate({
      source: descriptor?.template?.content || '',
      filename: 'example.vue',
      id: componentId,
    });

    // 5. 组合组件选项
    // 执行编译后的 script 和 template 代码以创建组件
    let componentOptions: ComponentOptions = {};
    
    try {
      // 构建完整的组件代码
      const scriptCode = scriptResult?.content || '';
      const templateCode = templateResult.code || '';
      
      // 创建一个执行环境来运行编译后的代码
      // Vue 3 compiler-sfc 编译后的代码格式通常是：
      // - script: 包含 import 和组件选项
      // - template: 包含 render 函数
      
      // 提取 render 函数（从 template 编译结果）
      let render: any = null;
      if (templateCode) {
        // template 编译后的代码通常包含 render 函数的定义
        // 我们需要执行这段代码来获取 render 函数
        try {
          // 移除可能的 import 语句（以防万一）
          let processedTemplateCode = templateCode;
          // 移除 import 语句
          processedTemplateCode = processedTemplateCode.replace(/import\s+.*?\s+from\s+['"][^'"]+['"];?\s*/g, '');
          // 移除 export 语句
          processedTemplateCode = processedTemplateCode.replace(/export\s+/g, '');
          
          // 移除可能残留的空行
          processedTemplateCode = processedTemplateCode.replace(/\n\s*\n\s*\n+/g, '\n\n');
          
          // 使用 IIFE 包装整个代码
          const wrappedCode = `
            (function() {
              // 编译后的代码（已移除所有辅助函数声明）
              ${processedTemplateCode}
              
              // 返回 render 函数
              return typeof render !== 'undefined' ? render : null;
            })
          `;
          
          const templateModule = new Function('helpers', wrappedCode);
          render = templateModule();
        } catch (err) {
          console.warn('Failed to execute template code:', err);
          // 如果执行失败，尝试直接使用 template
          render = null;
        }
      }
      
      // 处理 script 代码
      if (scriptCode) {
        try {
          // 解析所有的 import 语句
          const importStatements: Array<{ statement: string; from: string; importSpec: string }> = [];
          // 匹配各种 import 格式
          const importPattern = /import\s+([^'"]+?)\s+from\s+['"]([^'"]+)['"]/g;
          let match;
          
          while ((match = importPattern.exec(scriptCode)) !== null) {
            importStatements.push({
              statement: match[0],
              from: match[2],
              importSpec: match[1].trim()
            });
          }
          
          // 创建模块映射
          const moduleMap: Record<string, any> = {};
          
          // 处理每个导入
          for (const imp of importStatements) {
            try {
              let module: any = null;
              
              // 使用提供的模块解析函数，或者使用默认解析
              if (moduleResolver) {
                module = moduleResolver(imp.from);
              } else {
                // 默认模块解析
                if (imp.from === 'vue' || imp.from.startsWith('@vue/')) {
                  // Vue 相关模块
                  if (typeof require !== 'undefined') {
                    module = require(imp.from);
                  } else {
                    // 浏览器环境，尝试从全局获取
                    module = (globalThis as any).Vue || {};
                  }
                } else {
                  // 其他模块，尝试使用 require 或从全局获取
                  if (typeof require !== 'undefined') {
                    try {
                      module = require(imp.from);
                    } catch {
                      // require 失败，尝试从全局获取
                      const globalModule = (globalThis as any)[imp.from] || (globalThis as any).__MODULES__?.[imp.from];
                      module = globalModule || {};
                    }
                  } else {
                    // 浏览器环境，从全局获取
                    const globalModule = (globalThis as any)[imp.from] || (globalThis as any).__MODULES__?.[imp.from];
                    module = globalModule || {};
                  }
                }
              }
              
              moduleMap[imp.from] = module || {};
            } catch {
              console.warn(`Failed to resolve module: ${imp.from}`);
              moduleMap[imp.from] = {};
            }
          }
          
          // 替换 import 语句为变量声明
          let processedScriptCode = scriptCode;
          
          importStatements.forEach((imp, index) => {
            const modulePath = imp.from;
            
            // 解析导入规范
            let replacement = '';
            const importSpec = imp.importSpec;
            
            if (importSpec === 'default' || /^\w+$/.test(importSpec)) {
              // 默认导入: import name from 'module'
              const varName = importSpec === 'default' ? `__default_${index}__` : importSpec;
              replacement = `const ${varName} = __modules__['${modulePath}'].default || __modules__['${modulePath}'];`;
            } else if (importSpec.startsWith('*')) {
              // 命名空间导入: import * as name from 'module'
              const namespaceMatch = importSpec.match(/\*\s+as\s+(\w+)/);
              const namespaceName = namespaceMatch ? namespaceMatch[1] : `__namespace_${index}__`;
              replacement = `const ${namespaceName} = __modules__['${modulePath}'];`;
            } else if (importSpec.startsWith('{')) {
              // 命名导入: import { a, b } from 'module' 或 import { a as b } from 'module'
              const namedImports = importSpec.slice(1, -1).split(',').map(i => i.trim());
              const declarations: string[] = [];
              
              namedImports.forEach(namedImport => {
                const [original, alias] = namedImport.split(/\s+as\s+/).map(s => s.trim());
                const finalName = alias || original;
                declarations.push(`const ${finalName} = __modules__['${modulePath}']['${original}'];`);
              });
              
              replacement = declarations.join('\n');
            }
            
            // 替换 import 语句
            processedScriptCode = processedScriptCode.replace(imp.statement, replacement);
          });
          
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
          // 如果执行失败，尝试使用 scriptResult 的其他信息
          if (scriptResult?.bindings) {
            componentOptions = { ...componentOptions, ...scriptResult.bindings };
          }
        }
      }
      
      // 添加 render 函数
      if (render && typeof render === 'function') {
        componentOptions.render = render;
      } else if (templateCode && !render) {
        // 如果无法提取 render 函数，尝试直接使用 template 代码
        // 这可能需要运行时编译支持
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
      // 返回一个基本的组件选项对象
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