import { useState } from 'react';
import { Hover } from '@aurora/horizon-react';

export default function HoverBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [visible, setVisible] = useState(false);
  return (
    <div style={{ display: 'grid', gap: 8, justifyItems: 'start' }}>
      <Hover onVisibleChange={setVisible}>
        {({ hover }) => (
          <button type="button" style={{ minWidth: 180, minHeight: 44 }}>
            {locale === 'zh' ? '将鼠标移到这里' : 'Hover this target'} · {String(hover)}
          </button>
        )}
      </Hover>
      <output>
        {visible ? (locale === 'zh' ? '已悬停' : 'Hovered') : locale === 'zh' ? '未悬停' : 'Idle'}
      </output>
    </div>
  );
}
