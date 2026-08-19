import { useState } from 'react';
import { Button, Mask } from '@aurora/horizon-react';

export default function MaskBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [visible, setVisible] = useState(true);
  const isEnglish = locale === 'en';

  return (
    <section className="docs-demo">
      <Button onClick={() => setVisible(true)}>{isEnglish ? 'Show mask' : '显示遮罩'}</Button>
      <div
        style={{
          alignItems: 'center',
          background: 'var(--h-bg-secondary)',
          borderRadius: 'var(--h-radius-l)',
          display: 'flex',
          justifyContent: 'center',
          marginTop: 16,
          minHeight: 180,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <span>{isEnglish ? 'Workspace content' : '工作区内容'}</span>
        <Mask absolute visible={visible}>
          <Button size="small" onClick={() => setVisible(false)}>
            {isEnglish ? 'Continue' : '继续'}
          </Button>
        </Mask>
      </div>
    </section>
  );
}
