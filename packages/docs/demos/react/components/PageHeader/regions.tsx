import { Button, PageHeader } from '@aurora/horizon-web-react';

export default function PageHeaderRegionsDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <div style={{ maxWidth: 390 }}>
      <PageHeader
        actions={<Button>{en ? 'Open incident' : '打开事件'}</Button>}
        backAriaLabel={en ? 'Return to incidents' : '返回事件列表'}
        backIcon={<span aria-hidden="true">←</span>}
        description={
          en
            ? 'Production checkout monitoring and response coordination.'
            : '生产环境结账流程的监控与响应协调。'
        }
        tags={<span className="docs-demo__status">P1</span>}
        titleContent={en ? 'Checkout readiness review' : '结账准备情况评审'}
      >
        <p className="docs-demo__description">
          {en
            ? 'This supporting region remains readable when localized content wraps on a narrow screen.'
            : '在窄屏中，本扩展区域会随本地化长文本换行并保持可读。'}
        </p>
      </PageHeader>
    </div>
  );
}
