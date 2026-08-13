import { useMemo, useState } from 'react';
import type { TreeOption, TreeProps } from '@aurora/horizon-web-react';
import { Tree } from '@aurora/horizon-web-react';

const wait = (duration: number) => new Promise(resolve => window.setTimeout(resolve, duration));

export default function TreeFilterDynamicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const data = useMemo<TreeOption[]>(
    () => [
      { value: 'teams', label: en ? 'Teams' : '团队', isLeaf: false },
      { value: 'archive', label: en ? 'Archive' : '归档' },
    ],
    [en],
  );
  const [status, setStatus] = useState(
    en ? 'Expand Teams to load members' : '展开“团队”以加载成员',
  );

  const dynamicLoad: NonNullable<TreeProps['dynamicLoad']> = async ({ node }) => {
    setStatus(en ? `Loading ${node.stringLabel}…` : `正在加载${node.stringLabel}…`);
    await wait(420);
    const children: TreeOption[] = [
      { value: 'design', label: en ? 'Design system' : '设计系统' },
      { value: 'platform', label: en ? 'Platform engineering' : '平台工程' },
    ];
    setStatus(en ? `${children.length} members loaded` : `已加载 ${children.length} 个成员`);
    return children;
  };

  return (
    <section className="docs-demo" style={{ maxWidth: 460 }}>
      <p className="docs-demo__description">
        {en
          ? 'Search filters visible nodes while unopened branches load on their first expansion.'
          : '搜索会筛选可见节点；尚未打开的分支会在首次展开时加载。'}
      </p>
      <div className="docs-demo__stage">
        <Tree
          defaultTreeData={data}
          dynamicLoad={dynamicLoad}
          filterable
          searchInputPlaceholder={en ? 'Search a team' : '搜索团队'}
        />
      </div>
      <output aria-live="polite" className="docs-demo__status">
        {status}
      </output>
    </section>
  );
}
