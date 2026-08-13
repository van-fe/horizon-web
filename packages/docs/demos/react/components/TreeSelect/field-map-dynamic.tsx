import { useState } from 'react';
import type { TreeSelectProps } from '@aurora/horizon-web-react';
import { TreeSelect } from '@aurora/horizon-web-react';

type DirectoryNode = {
  id: string;
  text: string;
  nodes?: DirectoryNode[];
  leaf?: boolean;
  owner?: string;
};

const wait = (duration: number) => new Promise(resolve => window.setTimeout(resolve, duration));

export default function TreeSelectFieldMapDynamicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [data, setData] = useState<DirectoryNode[]>([
    { id: 'regional', text: en ? 'Regional teams' : '区域团队', leaf: false, owner: 'Ops' },
    { id: 'platform', text: en ? 'Platform team' : '平台团队', owner: 'Riley' },
  ]);
  const [status, setStatus] = useState(
    en ? 'Expand Regional teams to load offices' : '展开“区域团队”以加载办公室',
  );

  const dynamicLoad: NonNullable<TreeSelectProps['dynamicLoad']> = async ({ node }) => {
    setStatus(en ? `Loading ${node.stringLabel}…` : `正在加载${node.stringLabel}…`);
    await wait(500);
    const children: DirectoryNode[] = [
      { id: 'shanghai', text: en ? 'Shanghai office' : '上海办公室', owner: 'Kai' },
      { id: 'oslo', text: en ? 'Oslo office' : '奥斯陆办公室', owner: 'Mia' },
    ];
    setStatus(en ? `${children.length} offices loaded` : `已加载 ${children.length} 个办公室`);
    return children as never;
  };

  return (
    <section className="docs-demo" style={{ maxWidth: 500 }}>
      <p className="docs-demo__description">
        {en
          ? 'Map an existing directory schema, load branches on demand, and add compact owner details to every row.'
          : '映射已有目录字段，按需加载分支，并在每一行展示简洁的负责人信息。'}
      </p>
      <div className="docs-demo__stage">
        <TreeSelect
          dynamicLoad={dynamicLoad}
          fieldMap={{ value: 'id', label: 'text', children: 'nodes', isLeaf: 'leaf' }}
          placeholder={en ? 'Select a team or office' : '选择团队或办公室'}
          renderNode={({ node }) => {
            const source = node.originOption as unknown as DirectoryNode;
            return (
              <span style={{ display: 'flex', flex: 1, justifyContent: 'space-between', gap: 12 }}>
                <span>{node.stringLabel}</span>
                <small style={{ color: 'var(--h-text-secondary)' }}>{source.owner ?? '—'}</small>
              </span>
            );
          }}
          treeData={data as never}
          onTreeDataChange={nextData => setData([...nextData] as unknown as DirectoryNode[])}
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
