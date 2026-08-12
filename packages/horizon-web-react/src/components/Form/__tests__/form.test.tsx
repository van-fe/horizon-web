import { act, createElement as h, createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  Checkbox,
  Form,
  FormItem,
  HorizonWebProvider,
  Input,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
} from '../../../index';
import type { FormHandle, FormItemHandle } from '../../../index';
import { dispatch, getContainer, render } from '../../../__tests__/harness';

describe('React Form', () => {
  it('renders native form layout, labels and submit behavior', async () => {
    const onSubmit = vi.fn();
    await render(
      h(
        Form,
        {
          align: 'center',
          cols: 2,
          gap: 8,
          labelPosition: 'left',
          onSubmit,
          spacing: 'dynamic',
        },
        h(
          FormItem,
          { field: 'name', label: 'Name', required: true, span: 2, tip: 'Public name' },
          h(Input, { defaultValue: '' }),
        ),
        h('button', { type: 'submit' }, 'Save'),
      ),
    );
    const form = getContainer().querySelector('form')!;
    expect(form.classList).toContain('is-grid');
    expect(form.classList).toContain('is-position-left');
    expect(form.getAttribute('style')).toContain('--h-grid-cols-xs: 2');
    const item = getContainer().querySelector<HTMLElement>('.h-form-item')!;
    expect(item.getAttribute('style')).toContain('--h-grid-item-span-xs: 2');
    const input = getContainer().querySelector<HTMLInputElement>('input')!;
    expect(getContainer().querySelector('label')?.htmlFor).toBe(input.id);
    expect(getContainer().querySelector('.h-form-item__text')?.classList).toContain('is-required');
    const event = new SubmitEvent('submit', { bubbles: true, cancelable: true });
    await dispatch(form, event);
    expect(event.defaultPrevented).toBe(true);
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it('validates shared rules on change and exposes accessible errors', async () => {
    const model = { profile: { name: 'ready' } };
    const onValidate = vi.fn();
    const ref = createRef<FormHandle>();
    await render(
      h(
        HorizonWebProvider,
        { formLabels: { required: 'Enter {prop}' } },
        h(
          Form,
          { model, onValidate, ref },
          h(
            FormItem,
            {
              field: 'profile.name',
              label: 'Profile name',
              required: true,
              requiredUseLabel: true,
            },
            h(Input, {
              defaultValue: model.profile.name,
              onValueChange: value => (model.profile.name = value),
            }),
          ),
        ),
      ),
    );
    const input = getContainer().querySelector<HTMLInputElement>('input')!;
    input.value = '';
    await dispatch(input, new InputEvent('input', { bubbles: true }));
    await act(async () => undefined);
    expect(onValidate).toHaveBeenCalledWith('profile.name', false, 'Enter Profile name');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    const error = getContainer().querySelector<HTMLElement>('.h-form-item__error')!;
    expect(error.textContent).toBe('Enter Profile name');
    expect(input.getAttribute('aria-describedby')).toBe(error.id);

    input.value = 'Ada';
    await dispatch(input, new InputEvent('input', { bubbles: true }));
    await act(async () => undefined);
    await act(async () => {
      await expect(ref.current?.validate()).resolves.toBeUndefined();
    });
    expect(getContainer().querySelector('.h-form-item__error')).toBeNull();
  });

  it('honors manual triggers, field commands and reset snapshots', async () => {
    const model = { name: 'Ada' };
    const onValidate = vi.fn();
    const formRef = createRef<FormHandle>();
    const itemRef = createRef<FormItemHandle>();
    await render(
      h(
        Form,
        { model, onValidate, ref: formRef, validateTrigger: false },
        h(
          FormItem,
          {
            field: 'name',
            label: 'Name',
            ref: itemRef,
            rules: { max: 3, message: 'Too long' },
          },
          h(Input, { defaultValue: model.name, onValueChange: value => (model.name = value) }),
        ),
      ),
    );
    const input = getContainer().querySelector<HTMLInputElement>('input')!;
    input.value = 'Grace';
    await dispatch(input, new InputEvent('input', { bubbles: true }));
    expect(onValidate).not.toHaveBeenCalled();
    await act(async () => {
      await expect(itemRef.current?.validate()).rejects.toMatchObject({
        errors: [{ message: 'Too long' }],
      });
    });
    expect(onValidate).toHaveBeenCalledOnce();
    await act(async () => itemRef.current?.clearValidate());
    expect(getContainer().querySelector('.h-form-item__error')).toBeNull();
    await act(async () => formRef.current?.resetFields('name'));
    expect(model.name).toBe('Ada');
    await expect(formRef.current?.validateField('missing')).resolves.toEqual(['missing']);
  });

  it('scrolls to the first invalid field and supports only-render disabled state', async () => {
    const scrollIntoView = vi.fn();
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
    });
    const ref = createRef<FormHandle>();
    await render(
      h(
        Form,
        { disabled: true, model: { email: '' }, ref, scrollToError: true },
        h(
          FormItem,
          { error: 'Server error', field: 'email', label: 'Email', required: true },
          h(Input, { defaultValue: '' }),
        ),
      ),
    );
    await act(async () => {
      await expect(ref.current?.validate()).rejects.toEqual(
        expect.arrayContaining([expect.objectContaining({ field: 'email' })]),
      );
    });
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(getContainer().querySelector<HTMLInputElement>('input')?.disabled).toBe(true);

    await render(
      h(
        Form,
        { disabled: true, model: { email: '' }, onlyRender: true },
        h(
          FormItem,
          { error: 'Server error', field: 'email', label: 'Email', required: true },
          h(Input, { defaultValue: '' }),
        ),
      ),
    );
    expect(getContainer().querySelector('.h-form-item__error')?.textContent).toBe('Server error');
  });

  it('connects existing field controls to disabled and validation context', async () => {
    const model = { choice: '' };
    await render(
      h(
        Form,
        { disabled: true, model, onlyRender: true },
        h(
          FormItem,
          { error: 'Invalid choice', field: 'choice', label: 'Choice' },
          h(
            'div',
            null,
            h(Checkbox, { optionValue: 'a' }, 'A'),
            h(Radio, { optionValue: 'a' }, 'A'),
            h(Select, { options: [{ label: 'A', value: 'a' }] }),
            h(Slider),
            h(Switch),
            h(Rate),
          ),
        ),
      ),
    );
    const controls = getContainer().querySelectorAll<HTMLElement>(
      'input, .h-select__trigger, [role="slider"]',
    );
    expect(controls.length).toBeGreaterThanOrEqual(6);
    expect([...controls].some(control => control.getAttribute('aria-invalid') === 'true')).toBe(
      true,
    );
    expect(
      [...getContainer().querySelectorAll<HTMLInputElement>('input')].every(
        input => input.disabled,
      ),
    ).toBe(true);
  });
});
