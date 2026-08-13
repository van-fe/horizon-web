import { useMemo, useRef, useState } from 'react';
import type { TreeSelectHandle, TreeSelectOption } from '@aurora/horizon-web-react';
import { Button, TreeSelect } from '@aurora/horizon-web-react';

export default function TreeSelectBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const treeSelectRef = useRef<TreeSelectHandle>(null);
  const [status, setStatus] = useState(en ? 'Engineering is selected' : '已选择工程团队');
  const data = useMemo<TreeSelectOption[]>(
    () => [
      {
        value: 'product',
        label: en ? 'Product' : '产品',
        children: [
          { value: 'design', label: en ? 'Design' : '设计' },
          { value: 'research', label: en ? 'Research' : '用户研究' },
        ],
      },
      {
        value: 'engineering',
        label: en ? 'Engineering' : '工程',
        children: [
          { value: 'platform', label: en ? 'Platform' : '平台' },
          { value: 'quality', label: en ? 'Quality' : '质量' },
        ],
      },
    ],
    [en],
  );

  return (
    <section className="docs-demo" style={{ maxWidth: 480 }}>
      <p className="docs-demo__description">
        {en
          ? 'Choose one team from a compact hierarchy. The ref can focus, open, clear, and inspect the picker.'
          : '从紧凑的层级结构中选择一个团队；ref 可聚焦、打开、清空或读取选择器状态。'}
      </p>
      <div className="docs-demo__actions">
        <Button onClick={() => treeSelectRef.current?.open()}>{en ? 'Open' : '打开'}</Button>
        <Button plain onClick={() => treeSelectRef.current?.focus()}>
          {en ? 'Focus' : '聚焦'}
        </Button>
        <Button
          plain
          onClick={() => {
            treeSelectRef.current?.clear();
            setStatus(en ? 'Selection cleared' : '已清空选择');
          }}
        >
          {en ? 'Clear' : '清空'}
        </Button>
      </div>
      <div className="docs-demo__stage">
        <TreeSelect
          ref={treeSelectRef}
          clearable
          defaultExpandedValues={['engineering']}
          defaultTreeData={data}
          defaultValue="engineering"
          placeholder={en ? 'Select a team' : '请选择团队'}
          onValueChange={value =>
            setStatus(`${en ? 'Selected' : '已选择'}: ${String(value ?? '—')}`)
          }
        />
      </div>
      <output aria-live="polite" className="docs-demo__status">
        {status}
      </output>
    </section>
  );
}
