import shared from './shared';
import zh from './zh';
import { defineConfig } from 'vitepress';
import containers from '../markdown/containers';
import markdownAnalyseFenceConfig from '../markdown-analyse/markdown/fenceConfig';
import mdContainer from 'markdown-it-container';
import type MarkdownIt from 'markdown-it';
import autoComponentDocs from '../markdown/autoComponentDocs';

// 添加 markdown-analyse 中的其他容器类型（tip, info, warning, success, error）
function addMarkdownAnalyseContainers(md: MarkdownIt) {
  const containerTypes = ['tip', 'info', 'warning', 'success', 'error'] as const;
  const alertTypes: Record<typeof containerTypes[number], string> = {
    tip: 'info',
    info: 'info',
    warning: 'warning',
    success: 'success',
    error: 'error',
  };

  containerTypes.forEach(type => {
    md.use(mdContainer, type, {
      validate(params: string) {
        return params.trim().match(new RegExp(`^${type}\\s*(.*)$`));
      },
      render(tokens: any[], idx: number) {
        const m = tokens[idx].info.trim().match(new RegExp(`^${type}\\s*(.*?)\\s*:::$`));
        if (m && tokens[idx].nesting === 1) {
          const content = m[1]
            ?.replace(/\\n\s*/g, '<br>')
            .replace(/`(.*?)`/g, '<code>$1</code>') || '';
          
          return `<h-alert type="${alertTypes[type]}" style="margin: 20px 0;" :closable="false" show-icon>${content}</h-alert>`;
        }
        return '';
      },
    });
  });
}

export default defineConfig({
  ...shared,
  // Keep both language trees in the VitePress source graph. Chinese remains
  // the root locale through this rewrite, while `/en/*` resolves the English
  // tree directly.
  srcDir: '.',
  rewrites: {
    'zh/:rest*': ':rest*',
  },
  locales: {
    root: { label: '简体中文', lang: 'zh-CN', ...zh },
    en: { label: 'English', lang: 'en' },
  },
  markdown: {
    lineNumbers: true,
    sfc: {
      customBlocks: ['demo-block']
    },
    config: (md) => {
      // 使用原有的 containers（demo, code）- 这些是 VitePress 专用的实现
      md.use(containers);
      // 自动从 API Generator 数据注入组件名称、简介和 API
      autoComponentDocs(md);
      
      // 添加 markdown-analyse 中的其他容器类型
      addMarkdownAnalyseContainers(md);
      
      // 配置代码块和表格样式
      markdownAnalyseFenceConfig(md);
    }
  }
})
