import { useState } from 'react';
import { Button, Picker } from '@aurora/horizon-web-react';

export default function PickerControlledDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('Asia/Shanghai');
  const [committed, setCommitted] = useState(draft);

  return (
    <section className="docs-demo" style={{ display: 'grid', gap: 12, maxWidth: 390 }}>
      <Picker<string>
        cancelText={en ? 'Cancel' : '取消'}
        confirmText={en ? 'Apply' : '应用'}
        needConfirm
        onCancel={() => {
          setDraft(committed);
          setOpen(false);
        }}
        onConfirm={() => {
          setCommitted(draft);
          setOpen(false);
        }}
        onOpenChange={setOpen}
        onValueChange={setDraft}
        open={open}
        value={draft}
      >
        <div style={{ display: 'grid', gap: 8, minWidth: 260, padding: 16 }}>
          {['Asia/Shanghai', 'Europe/Oslo', 'America/Toronto'].map(zone => (
            <Button
              key={zone}
              onClick={() => setDraft(zone)}
              variant={draft === zone ? 'primary' : 'normal'}
            >
              {zone}
            </Button>
          ))}
        </div>
      </Picker>
      <output>{en ? `Applied zone: ${committed}` : `已应用时区：${committed}`}</output>
    </section>
  );
}
