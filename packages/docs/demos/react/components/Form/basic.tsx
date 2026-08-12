import { useMemo, useRef, useState } from 'react';
import { Button, Form, FormItem, Input, type FormHandle } from '@aurora/horizon-web-react';

export default function FormBasicDemo({ locale }: { locale: 'en' | 'zh' }) {
  const model = useMemo(() => ({ account: '' }), []);
  const formRef = useRef<FormHandle>(null);
  const [, render] = useState(0);
  const [message, setMessage] = useState('');

  return (
    <Form
      model={model}
      onSubmit={async () => {
        try {
          await formRef.current?.validate();
          setMessage(locale === 'zh' ? '已提交' : 'Submitted');
        } catch {
          setMessage(locale === 'zh' ? '请检查表单' : 'Check the form');
        }
      }}
      ref={formRef}
    >
      <FormItem field="account" label={locale === 'zh' ? '账号' : 'Account'} required>
        <Input
          placeholder={locale === 'zh' ? '请输入账号' : 'Enter an account'}
          value={model.account}
          onValueChange={value => {
            model.account = value;
            render(value => value + 1);
          }}
        />
      </FormItem>
      <Button type="submit">{locale === 'zh' ? '提交' : 'Submit'}</Button>
      <output style={{ marginInlineStart: 12 }}>{message}</output>
    </Form>
  );
}
