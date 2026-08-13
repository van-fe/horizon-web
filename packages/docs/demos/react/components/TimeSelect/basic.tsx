import { useState } from 'react';
import { TimeSelect } from '@aurora/horizon-web-react';

export default function TimeSelectBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [value, setValue] = useState<string>();
  return (
    <section className="docs-demo" style={{ maxWidth: 360 }}>
      <p className="docs-demo__description">
        {en ? 'Choose an appointment in 30-minute intervals.' : '按 30 分钟间隔选择预约时间。'}
      </p>
      <TimeSelect
        clearable
        placeholder={en ? 'Choose a time' : '选择时间'}
        value={value}
        onChange={setValue}
      />
      <output aria-live="polite" className="docs-demo__status">
        {en ? 'Selected' : '已选择'}: {value ?? (en ? 'none' : '无')}
      </output>
    </section>
  );
}
