import { Button } from '@aurora/horizon-react';

export default function ButtonPlainDemo({ locale }: { locale: 'en' | 'zh' }) {
  return (
    <div className="docs-demo__actions" style={{ padding: 16 }}>
      <Button plain>{locale === 'en' ? 'Plain action' : '简洁操作'}</Button>
      <Button plain variant="normal">
        {locale === 'en' ? 'Normal plain' : '普通简洁'}
      </Button>
      <span style={{ background: '#24324a', padding: 12 }}>
        <Button ghost plain>
          {locale === 'en' ? 'Ghost action' : '幽灵操作'}
        </Button>
      </span>
    </div>
  );
}
