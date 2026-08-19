import { useState } from 'react';
import type { MaskVariant } from '@aurora/horizon-react';
import { Button, Mask, Segmented, SegmentedItem } from '@aurora/horizon-react';

const variants: MaskVariant[] = ['default', 'weak', 'strong', 'inverse', 'transparent'];

export default function MaskVariantsDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [variant, setVariant] = useState<MaskVariant>('default');
  const [visible, setVisible] = useState(true);
  const isEnglish = locale === 'en';

  return (
    <section className="docs-demo">
      <Segmented value={variant} onChange={value => setVariant(value as MaskVariant)}>
        {variants.map(item => (
          <SegmentedItem key={item} label={item} value={item} />
        ))}
      </Segmented>
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
        <span>{isEnglish ? `Variant: ${variant}` : `当前类型：${variant}`}</span>
        <Mask absolute variant={variant} visible={visible}>
          <Button size="small" onClick={() => setVisible(false)}>
            {isEnglish ? 'Dismiss' : '关闭'}
          </Button>
        </Mask>
      </div>
      {!visible ? (
        <Button onClick={() => setVisible(true)} style={{ marginTop: 12 }}>
          {isEnglish ? 'Show again' : '再次显示'}
        </Button>
      ) : null}
    </section>
  );
}
