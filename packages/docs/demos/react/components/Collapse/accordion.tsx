import { useState } from 'react';
import type { CollapseValue } from '@aurora/horizon-web-react';
import { Collapse, CollapseItem } from '@aurora/horizon-web-react';

export default function CollapseAccordionDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [value, setValue] = useState<CollapseValue>('profile');

  return (
    <section className="docs-demo">
      <Collapse accordion border onChange={setValue} value={value}>
        <CollapseItem name="profile" title={en ? 'Profile' : '个人资料'}>
          {en ? 'Update your name, avatar, and contact details.' : '更新姓名、头像和联系方式。'}
        </CollapseItem>
        <CollapseItem name="security" title={en ? 'Security' : '安全设置'}>
          {en ? 'Manage passwords and trusted devices.' : '管理密码和受信任设备。'}
        </CollapseItem>
        <CollapseItem name="notifications" title={en ? 'Notifications' : '通知设置'}>
          {en ? 'Choose which product updates you receive.' : '选择需要接收的产品动态。'}
        </CollapseItem>
      </Collapse>
    </section>
  );
}
