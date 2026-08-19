import { useRef, useState } from 'react';
import type { CommandPaletteHandle } from '@aurora/horizon-react';
import { Button, CommandPalette } from '@aurora/horizon-react';

const commands = [
  {
    id: 'open',
    label: 'Open project',
    description: 'Jump to a recent project',
    keywords: ['workspace'],
  },
  { id: 'page', label: 'Create page', description: 'Add a blank page', shortcut: '⌘ N' },
  { id: 'theme', label: 'Toggle theme', description: 'Change the appearance' },
  { id: 'publish', label: 'Publish workspace', disabled: true },
];

export default function CommandPaletteBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const palette = useRef<CommandPaletteHandle>(null);
  const [lastAction, setLastAction] = useState(en ? 'No command selected' : '尚未选择命令');

  return (
    <section className="docs-demo">
      <p className="docs-demo__description">
        {en ? 'Open with the button or Command/Ctrl + K.' : '点击按钮或按 Command/Ctrl + K 打开。'}
      </p>
      <Button onClick={() => palette.current?.open()}>
        {en ? 'Open palette' : '打开命令面板'}
      </Button>
      <CommandPalette
        commands={commands}
        emptyText={en ? 'No matching commands' : '没有匹配的命令'}
        placeholder={en ? 'Search workspace commands…' : '搜索工作区命令…'}
        ref={palette}
        onSelect={command => setLastAction(command.label)}
      />
      <output aria-live="polite" className="docs-demo__status">
        {lastAction}
      </output>
    </section>
  );
}
