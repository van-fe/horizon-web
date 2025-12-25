import type { Plugin } from 'vite'
import { execSync } from 'child_process'
import { resolve } from 'path'

export function generateIconsPlugin(): Plugin {
  return {
    name: 'generate-icons',
    buildStart() {
      try {
        console.info('生成图标组件...')
        const scriptPath = resolve(__dirname, 'scripts/generate-icon-components.ts')
        execSync(`bun run ${scriptPath}`, { stdio: 'inherit' })
        console.info('图标组件生成完成')
      } catch (error) {
        console.error('生成图标组件失败:', error)
        throw error
      }
    }
  }
}

