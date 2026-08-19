import { useMemo, useState } from 'react';
import type { CascaderOption } from '@aurora/horizon-react';
import { Cascader } from '@aurora/horizon-react';

function describeValue(value: unknown, emptyLabel: string): string {
  if (!Array.isArray(value) || value.length === 0) return emptyLabel;
  const paths = Array.isArray(value[0]) ? value : [value];
  return paths.map(path => path.join(' / ')).join(', ');
}

export default function CascaderBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [selection, setSelection] = useState(en ? 'Nothing selected' : '尚未选择');
  const options = useMemo<CascaderOption[]>(
    () => [
      {
        value: 'asia',
        label: en ? 'Asia Pacific' : '亚太地区',
        children: [
          {
            value: 'china',
            label: en ? 'China' : '中国',
            children: [
              { value: 'shanghai', label: en ? 'Shanghai studio' : '上海工作室' },
              { value: 'shenzhen', label: en ? 'Shenzhen studio' : '深圳工作室' },
            ],
          },
          {
            value: 'japan',
            label: en ? 'Japan' : '日本',
            children: [{ value: 'tokyo', label: en ? 'Tokyo studio' : '东京工作室' }],
          },
        ],
      },
      {
        value: 'europe',
        label: en ? 'Europe' : '欧洲',
        children: [
          {
            value: 'nordics',
            label: en ? 'Nordics' : '北欧',
            children: [
              { value: 'oslo', label: en ? 'Oslo studio' : '奥斯陆工作室' },
              { value: 'stockholm', label: en ? 'Stockholm studio' : '斯德哥尔摩工作室' },
            ],
          },
        ],
      },
    ],
    [en],
  );

  return (
    <section className="docs-demo" style={{ maxWidth: 440 }}>
      <p className="docs-demo__description">
        {en
          ? 'Choose a delivery studio by moving through region, market, and city.'
          : '依次从地区、市场和城市中选择交付工作室。'}
      </p>
      <div className="docs-demo__stage">
        <Cascader
          clearable
          options={options}
          pathSeparator=" / "
          placeholder={en ? 'Select a delivery studio' : '请选择交付工作室'}
          onValueChange={value =>
            setSelection(describeValue(value, en ? 'Nothing selected' : '尚未选择'))
          }
        />
      </div>
      <output aria-live="polite" className="docs-demo__status">
        {en ? `Selected path: ${selection}` : `已选路径：${selection}`}
      </output>
    </section>
  );
}
