import { useMemo, useRef, useState } from 'react';
import { Button, Form, FormItem, Input } from '@aurora/horizon-react';
import type { FormHandle } from '@aurora/horizon-react';

export default function FormValidationDemo({ locale }: { locale: 'en' | 'zh' }) {
  const formRef = useRef<FormHandle>(null);
  const model = useMemo(() => ({ profile: { name: 'Aurora' } }), []);
  const [, render] = useState(0);

  return (
    <Form model={model} ref={formRef} validateTrigger="blur">
      <FormItem
        field="profile.name"
        label={locale === 'zh' ? '显示名称' : 'Display name'}
        rules={[
          { required: true, message: locale === 'zh' ? '请输入名称' : 'Enter a name' },
          { max: 12, message: locale === 'zh' ? '最多 12 个字符' : 'Use at most 12 characters' },
        ]}
        tip={locale === 'zh' ? '失焦后校验' : 'Validated after blur'}
      >
        <Input
          value={model.profile.name}
          onValueChange={value => {
            model.profile.name = value;
            render(value => value + 1);
          }}
        />
      </FormItem>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button onClick={() => void formRef.current?.validate().catch(() => undefined)}>
          {locale === 'zh' ? '校验' : 'Validate'}
        </Button>
        <Button onClick={() => formRef.current?.resetFields()} variant="normal">
          {locale === 'zh' ? '重置' : 'Reset'}
        </Button>
        <Button onClick={() => formRef.current?.clearValidate()} variant="normal">
          {locale === 'zh' ? '清除错误' : 'Clear errors'}
        </Button>
      </div>
    </Form>
  );
}
