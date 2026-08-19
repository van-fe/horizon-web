import { useState } from 'react';
import { Anchor, AnchorLink } from '@aurora/horizon-react';

export default function AnchorCollapseDemo({ locale }: { locale: 'en' | 'zh' }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <section className="docs-demo" style={{ minHeight: 160 }}>
      <Anchor
        collapseText={locale === 'en' ? 'Sections' : '章节导航'}
        collapsed={collapsed}
        onCollapseChange={setCollapsed}
        useCollapse
      >
        <AnchorLink href="#overview" title={locale === 'en' ? 'Overview' : '概览'} />
        <AnchorLink href="#details" title={locale === 'en' ? 'Details' : '详情'} />
      </Anchor>
      <p aria-live="polite">
        {collapsed
          ? locale === 'en'
            ? 'Collapsed'
            : '已收起'
          : locale === 'en'
            ? 'Expanded'
            : '已展开'}
      </p>
    </section>
  );
}
