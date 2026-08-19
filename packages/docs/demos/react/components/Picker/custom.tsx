import { useRef, useState } from 'react';
import type { PickerHandle } from '@aurora/horizon-react';
import { Button, Picker } from '@aurora/horizon-react';

export default function PickerCustomDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const pickerRef = useRef<PickerHandle>(null);
  const [status, setStatus] = useState<'normal' | 'loading' | 'empty'>('normal');

  return (
    <section className="docs-demo" style={{ display: 'grid', gap: 12, maxWidth: 390 }}>
      <div className="docs-demo__actions">
        {(['normal', 'loading', 'empty'] as const).map(option => (
          <Button
            key={option}
            onClick={() => setStatus(option)}
            variant={status === option ? 'primary' : 'normal'}
          >
            {option}
          </Button>
        ))}
      </div>
      <Picker
        emptyContent={en ? 'No matching presets' : '没有匹配的预设'}
        loadingContent={en ? 'Loading presets…' : '正在加载预设…'}
        panelStatus={status}
        ref={pickerRef}
        renderTrigger={({ triggerProps }) => (
          <Button {...triggerProps} variant="primary">
            {en ? 'Choose preset' : '选择预设'}
          </Button>
        )}
      >
        <div style={{ minWidth: 240, padding: 16 }}>
          {en ? 'Custom trigger and panel content' : '自定义触发器与面板内容'}
        </div>
      </Picker>
      <Button onClick={() => pickerRef.current?.updatePosition()}>
        {en ? 'Update popup position' : '更新面板位置'}
      </Button>
    </section>
  );
}
