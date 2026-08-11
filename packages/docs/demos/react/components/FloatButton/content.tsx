import { FloatButton } from '@aurora/horizon-web-react';

export default function FloatButtonContentDemo({ locale }: { locale: 'en' | 'zh' }) {
  const isEnglish = locale === 'en';

  return (
    <section className="docs-demo" style={{ minHeight: 220, position: 'relative' }}>
      <p className="docs-demo__description">
        {isEnglish
          ? 'Description, tooltip, badge, shape, and navigation can be combined for compact shortcuts.'
          : '描述、提示、徽标、形状和导航能力可以组合成紧凑的快捷入口。'}
      </p>
      <FloatButton
        badge={{ content: 8, type: 'num' }}
        description={isEnglish ? 'Inbox' : '收件箱'}
        href="#float-button-api"
        icon={<span aria-hidden="true">✉</span>}
        shape="square"
        style={{ position: 'absolute' }}
        tooltip={isEnglish ? 'Open inbox' : '打开收件箱'}
        variant="primary"
      />
    </section>
  );
}
