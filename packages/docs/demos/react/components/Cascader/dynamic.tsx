import { useMemo, useState } from 'react';
import type { CascaderOption, CascaderProps } from '@aurora/horizon-react';
import { Button, Cascader } from '@aurora/horizon-react';

const wait = (duration: number) => new Promise(resolve => window.setTimeout(resolve, duration));

export default function CascaderDynamicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const initialOptions = useMemo<CascaderOption[]>(
    () => [
      { value: 'americas', label: en ? 'Americas' : '美洲', isLeaf: false },
      { value: 'emea', label: en ? 'Europe and Middle East' : '欧洲与中东', isLeaf: false },
    ],
    [en],
  );
  const [options, setOptions] = useState<readonly CascaderOption[]>(initialOptions);
  const [value, setValue] = useState<CascaderProps['value']>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(
    en ? 'Choose a region to load offices' : '选择地区以加载办公室',
  );

  const loadChildren: NonNullable<CascaderProps['loadChildren']> = async option => {
    setStatus(
      en
        ? `Loading locations under ${option.stringLabel}…`
        : `正在加载 ${option.stringLabel} 下的地点…`,
    );
    await wait(550);
    const key = option.path.join('/');
    const children: CascaderOption[] =
      key === 'americas'
        ? [
            { value: 'toronto', label: en ? 'Toronto' : '多伦多', isLeaf: false },
            { value: 'new-york', label: en ? 'New York' : '纽约', isLeaf: false },
          ]
        : key === 'emea'
          ? [
              { value: 'oslo', label: en ? 'Oslo' : '奥斯陆', isLeaf: false },
              { value: 'berlin', label: en ? 'Berlin' : '柏林', isLeaf: false },
            ]
          : [
              { value: 'design', label: en ? 'Design team' : '设计团队' },
              { value: 'platform', label: en ? 'Platform team' : '平台团队' },
            ];
    setStatus(en ? `${children.length} locations loaded` : `已加载 ${children.length} 个地点`);
    return children;
  };

  return (
    <section className="docs-demo" style={{ maxWidth: 460 }}>
      <p className="docs-demo__description">
        {en
          ? 'Both the selected path and popup visibility are controlled. Child options are fetched only when a branch is expanded.'
          : '选中路径与面板显隐均由应用控制；展开分支时才按需获取子选项。'}
      </p>
      <div className="docs-demo__actions">
        <Button onClick={() => setOpen(true)}>{en ? 'Choose an office' : '选择办公室'}</Button>
        <Button
          plain
          onClick={() => {
            setValue(null);
            setOptions(initialOptions);
            setOpen(false);
            setStatus(en ? 'Selection reset' : '已重置选择');
          }}
        >
          {en ? 'Reset' : '重置'}
        </Button>
      </div>
      <div className="docs-demo__stage">
        <Cascader
          loadChildren={loadChildren}
          onOpenChange={setOpen}
          onOptionsChange={nextOptions => setOptions([...nextOptions])}
          onValueChange={nextValue => {
            setValue(nextValue);
            setStatus(en ? 'Office selection updated' : '办公室选择已更新');
          }}
          open={open}
          options={options}
          placeholder={en ? 'Select region, city, and team' : '选择地区、城市和团队'}
          value={value}
        />
      </div>
      <output aria-live="polite" className="docs-demo__status">
        {status}
      </output>
    </section>
  );
}
