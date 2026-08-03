import type MarkdownIt from 'markdown-it';
import markdownAnalyse from '../markdown-analyse';

/**
 * VitePress markdown 插件，集成 markdown-analyse 功能
 * 用于处理组件、指令、方法的文档，自动添加 API 文档、锚点等
 * 
 * 注意：这个插件通过 markdown-it 的钩子来处理内容
 * 由于 VitePress 的 markdown 处理流程，我们需要在合适的时机调用 markdown-analyse
 */
export default function markdownAnalysePlugin(md: MarkdownIt) {
  const root = process.cwd();

  // 在 markdown 解析完成后处理内容
  md.core.ruler.push('markdown-analyse', (state) => {
    // 获取文件路径（从 env 中获取）
    const filePath = (state.env as any)?.filePath || (state.env as any)?.path || '';
    
    // 判断是否需要使用 markdown-analyse
    // 只处理 demos 目录下的文件（components, directives, methods）
    const shouldUseAnalyse = filePath.includes('/demos/') && 
      (filePath.includes('/components/') || 
       filePath.includes('/directives/') || 
       filePath.includes('/methods/'));

    if (shouldUseAnalyse) {
      try {
        // 获取原始 markdown 内容
        const src = state.src;
        
        // 使用 markdown-analyse 处理
        const result = markdownAnalyse(src, filePath, root);
        
        // 提取内容部分和 script 部分
        const contentMatch = result.match(/<section class="content">([\s\S]*?)<\/section>/);
        const scriptMatch = result.match(/<script setup>([\s\S]*?)<\/script>/);
        
        if (contentMatch && scriptMatch) {
          // 将处理后的内容存储到 env 中
          if (state.env) {
            (state.env as any).markdownAnalyseContent = contentMatch[1];
            (state.env as any).markdownAnalyseScript = scriptMatch[1];
          }
        }
      } catch (error) {
        console.warn('markdown-analyse 处理失败:', error);
      }
    }
  });

  // 在渲染时使用处理后的内容
  const originalRender = md.renderer.render.bind(md.renderer);
  
  md.renderer.render = function (tokens, options, env) {
    // 如果有 markdown-analyse 处理后的内容，直接返回
    if (env && (env as any).markdownAnalyseContent) {
      return (env as any).markdownAnalyseContent;
    }
    
    // 否则使用原始渲染
    return originalRender(tokens, options, env);
  };
}
