import { Affix } from '@aurora/horizon-react';

export default function AffixBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';
  return (
    <section className="docs-demo" style={{ minHeight: 180 }}>
      <p className="docs-demo__description">
        {isEnglish ? 'Scroll the page to pin the toolbar.' : '滚动页面后，工具栏会固定在顶部。'}
      </p>
      <Affix offset={72} zIndex={20}>
        <div style={{ padding: 12, background: 'var(--h-bg-secondary)' }}>
          {isEnglish ? 'Pinned toolbar' : '固定工具栏'}
        </div>
      </Affix>
    </section>
  );
}
