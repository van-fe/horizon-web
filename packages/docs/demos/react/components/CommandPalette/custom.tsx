import { useState } from 'react';
import { Button, CommandPalette } from '@aurora/horizon-web-react';

const commands = [
  { id: 'design', label: 'Design review', group: 'Meetings', shortcut: 'D' },
  { id: 'release', label: 'Release checklist', group: 'Documents', shortcut: 'R' },
];

export default function CommandPaletteCustomDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [open, setOpen] = useState(false);
  return (
    <section className="docs-demo">
      <Button onClick={() => setOpen(true)}>{en ? 'Open custom palette' : '打开自定义面板'}</Button>
      <CommandPalette
        commands={commands}
        filter={(query, command) => command.label.toLowerCase().startsWith(query.toLowerCase())}
        open={open}
        renderCommand={(command, { active }) => (
          <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span>
              {active ? '→ ' : ''}
              {command.label}
              <small style={{ display: 'block' }}>{command.group}</small>
            </span>
            <kbd>{command.shortcut}</kbd>
          </span>
        )}
        renderEmpty={en ? 'Try the first word of a command.' : '请输入命令名称的开头。'}
        onOpenChange={setOpen}
      />
    </section>
  );
}
