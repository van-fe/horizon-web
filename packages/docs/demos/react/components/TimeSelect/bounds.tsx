import { TimeSelect } from '@aurora/horizon-react';

export default function TimeSelectBoundsDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <section className="docs-demo" style={{ maxWidth: 360 }}>
      <p className="docs-demo__description">
        {en
          ? 'Only the support window from 09:00 to 16:30 is selectable.'
          : '仅可选择 09:00 至 16:30 的支持时段。'}
      </p>
      <TimeSelect maxTime="16:30" minTime="09:00" start="08:00" end="18:00" />
    </section>
  );
}
