import { useState } from 'react';
import { Button, CommandPalette } from '@aurora/horizon-react';

export default function CommandPaletteAsyncDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(en ? 'Ready' : '就绪');

  return (
    <section className="docs-demo">
      <Button onClick={() => setOpen(true)}>{en ? 'Open async commands' : '打开异步命令'}</Button>
      <CommandPalette
        closeOnSelect={false}
        commands={[
          {
            id: 'sync',
            label: en ? 'Synchronize workspace' : '同步工作区',
            perform: async () => {
              setStatus(en ? 'Synchronizing…' : '同步中…');
              await new Promise(resolve => setTimeout(resolve, 600));
              setStatus(en ? 'Workspace synchronized' : '工作区已同步');
            },
          },
          {
            id: 'failure',
            label: en ? 'Run failing command' : '运行失败命令',
            perform: () => Promise.reject(new Error('Unavailable')),
          },
        ]}
        open={open}
        onError={() => setStatus(en ? 'Command failed; try again' : '命令失败，请重试')}
        onOpenChange={setOpen}
      />
      <output aria-live="polite" className="docs-demo__status">
        {status}
      </output>
    </section>
  );
}
