import { Form, FormItem, Input } from '@aurora/horizon-web-react';

export default function FormLayoutDemo({ locale }: { locale: 'en' | 'zh' }) {
  return (
    <Form
      cols={{ xs: 1, md: 2 }}
      columnGap={16}
      labelPosition="left"
      labelWidth={locale === 'zh' ? 72 : 96}
      rowGap={4}
    >
      <FormItem field="first" label={locale === 'zh' ? '名字' : 'First name'}>
        <Input />
      </FormItem>
      <FormItem field="last" label={locale === 'zh' ? '姓氏' : 'Last name'}>
        <Input />
      </FormItem>
      <FormItem field="email" label={locale === 'zh' ? '邮箱' : 'Email'} span={{ xs: 1, md: 2 }}>
        <Input type="text" />
      </FormItem>
    </Form>
  );
}
