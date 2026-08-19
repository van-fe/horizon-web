import { useState } from 'react';
import { FloatButton } from '@aurora/horizon-react';

export default function FloatButtonDraggableDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [status, setStatus] = useState<'idle' | 'dragging' | 'done'>('idle');
  const isEnglish = locale === 'en';
  const messages = {
    idle: isEnglish ? 'Drag the action to move it' : '拖动按钮以改变位置',
    dragging: isEnglish ? 'Moving…' : '正在移动…',
    done: isEnglish ? 'Adsorbed to the nearest enabled edge' : '已吸附到允许的最近边缘',
  };

  return (
    <section className="docs-demo" style={{ minHeight: 260, position: 'relative' }}>
      <p aria-live="polite" className="docs-demo__description">
        {messages[status]}
      </p>
      <FloatButton
        adsorbBottom
        ariaLabel={isEnglish ? 'Move quick action' : '移动快捷操作'}
        draggable
        icon={<span aria-hidden="true">↕</span>}
        onDragEnd={() => setStatus('done')}
        onDragStart={() => setStatus('dragging')}
        style={{ position: 'absolute' }}
      />
    </section>
  );
}
