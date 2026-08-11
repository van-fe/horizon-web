import { useState } from 'react';
import { HorizonWebProvider, Link, Space } from '@aurora/horizon-web-react';

export default function LinkDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [message, setMessage] = useState(en ? 'No action yet' : '尚未执行操作');

  return (
    <HorizonWebProvider
      linkLabels={{ loading: en ? 'Loading' : '加载中' }}
      navigate={to => setMessage(`${en ? 'Navigate' : '导航'}: ${String(to)}`)}
      resolveHref={to => `#${String(to)}`}
    >
      <Space direction="vertical" size="large">
        <Space wrap>
          <Link href="https://github.com/van-fe/horizon-web" target="_blank">
            {en ? 'Project repository' : '项目仓库'}
          </Link>
          <Link variant="normal">{en ? 'Neutral link' : '普通链接'}</Link>
          <Link variant="danger">{en ? 'Danger link' : '危险链接'}</Link>
          <Link attribute>{en ? 'Annotated link' : '注释链接'}</Link>
        </Space>
        <Space wrap>
          <Link onClick={() => setMessage(en ? 'Action completed' : '操作已完成')}>
            {en ? 'Run action' : '执行操作'}
          </Link>
          <Link replace to="settings">
            {en ? 'Open settings' : '打开设置'}
          </Link>
          <Link loading>{en ? 'Preparing' : '正在准备'}</Link>
          <Link disabled>{en ? 'Unavailable' : '不可用'}</Link>
        </Space>
        <span aria-live="polite">{message}</span>
      </Space>
    </HorizonWebProvider>
  );
}
