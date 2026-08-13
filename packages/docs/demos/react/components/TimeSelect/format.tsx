import { TimeSelect } from '@aurora/horizon-web-react';

export default function TimeSelectFormatDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  return (
    <section className="docs-demo" style={{ maxWidth: 360 }}>
      <p className="docs-demo__description">
        {en
          ? 'Labels use a 12-hour clock; values remain HH:mm.'
          : '标签使用 12 小时制，值仍为 HH:mm。'}
      </p>
      <TimeSelect
        defaultValue="11:30"
        end="12:15"
        format="hh:mm A"
        includeEndTime
        start="11:30"
        step="00:30"
      />
    </section>
  );
}
