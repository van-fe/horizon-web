import type { Plugin } from 'vite';
import path from 'path';
import fs from 'fs';

/**
 * Vite 插件：监听 markdown 文件中引用的 demo 文件
 * 确保当 demo 文件变更时能触发 HMR
 */
export default function watchDemos(): Plugin {
  return {
    name: 'watch-demos',
    enforce: 'pre',
    configureServer(server) {
      // 监听整个 demos 目录
      const demosDir = path.join(__dirname, '../../demos');
      server.watcher.add(demosDir);

      // 当 demo 文件变更时，查找并更新引用了该 demo 的 markdown 文件
      server.watcher.on('change', (file) => {
        if (file.includes('/demos/')) {
          // 通过模块图查找所有可能引用这个 demo 的模块
          const modules = Array.from(server.moduleGraph.urlToModuleMap.values());
          const changedDemoPath = path.resolve(file);

          modules.forEach((module) => {
            if (module.id && module.id.endsWith('.md')) {
              try {
                const mdContent = fs.readFileSync(module.id, 'utf-8');
                const demoPattern = /^demo\s+(.+?)\s*:::/gm;
                const mdDemosDir = path.join(path.dirname(module.id), '../../demos');
                const matches = [...mdContent.matchAll(demoPattern)];

                const referencedDemos = matches
                  .map((match) => {
                    if (match[1]) {
                      return path.resolve(mdDemosDir, match[1].trim());
                    }
                    return null;
                  })
                  .filter(Boolean);

                // 如果这个 markdown 文件引用了变更的 demo，则触发更新
                if (referencedDemos.some((demo) => path.resolve(demo) === changedDemoPath)) {
                  server.moduleGraph.invalidateModule(module);
                }
              } catch (e) {
                // 忽略读取错误
              }
            }
          });
        }
      });
    },
    transform(code, id) {
      // 只处理 markdown 文件
      if (!id.endsWith('.md')) {
        return null;
      }

      // 查找 markdown 中的 demo 引用
      const demoPattern = /^demo\s+(.+?)\s*:::/gm;
      const demosDir = path.join(path.dirname(id), '../../demos');
      const matches = [...code.matchAll(demoPattern)];

      // 为每个找到的 demo 文件添加监听
      matches.forEach((match) => {
        if (match[1]) {
          const demoPath = path.resolve(demosDir, match[1].trim());
          // 检查文件是否存在
          if (fs.existsSync(demoPath)) {
            // 添加文件到 Vite 的监听列表
            this.addWatchFile(demoPath);
          }
        }
      });

      return null;
    },
  };
}
