import { useState } from 'react';
import { Checkbox, CheckboxButton, CheckboxGroup, Space } from '@aurora/horizon-web-react';
import type { ChoiceValue } from '@aurora/horizon-web-react';

export default function CheckboxDemo({ locale }: { locale: 'en' | 'zh' }) {
  const en = locale === 'en';
  const [channels, setChannels] = useState<readonly ChoiceValue[]>(['email']);

  return (
    <Space direction="vertical" size="large">
      <CheckboxGroup onChange={setChannels} value={channels}>
        <Checkbox optionValue="email">{en ? 'Email' : '邮件'}</Checkbox>
        <Checkbox optionValue="sms">{en ? 'SMS' : '短信'}</Checkbox>
        <Checkbox optionValue="push">{en ? 'Push notification' : '推送通知'}</Checkbox>
      </CheckboxGroup>
      <p>
        {en ? 'Selected channels: ' : '已选渠道：'}
        {channels.join(', ') || (en ? 'None' : '无')}
      </p>
      <Checkbox indeterminate>{en ? 'Partially selected' : '部分选中'}</Checkbox>
      <CheckboxButton defaultValue optionValue="compact">
        {en ? 'Compact mode' : '紧凑模式'}
      </CheckboxButton>
    </Space>
  );
}
