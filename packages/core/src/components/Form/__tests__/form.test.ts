import { describe, expect, it, vi } from 'vitest';
import {
  cloneFormValue,
  FormController,
  FormFieldController,
  getFormPathValue,
  resolveFormRequiredMark,
  resolveFormValidateEvents,
  setFormPathValue,
} from '..';

describe('Form core', () => {
  it('resolves triggers, required marks and nested paths', () => {
    expect(resolveFormValidateEvents(undefined, 'change')).toEqual(['change']);
    expect(resolveFormValidateEvents(false, 'change')).toEqual([]);
    expect(resolveFormValidateEvents(['change', 'blur'], false)).toEqual(['change', 'blur']);
    expect(
      resolveFormRequiredMark({
        formVisible: true,
        fieldVisible: true,
        label: 'Name',
        field: 'user.name',
        rules: [{ required: true }],
      }),
    ).toBe(true);
    const model = { user: { names: ['Ada'] } };
    expect(getFormPathValue(model, 'user.names[0]')).toBe('Ada');
    setFormPathValue(model, 'user.names[0]', 'Grace');
    expect(model.user.names[0]).toBe('Grace');
    const copy = cloneFormValue(model);
    expect(copy).toEqual(model);
    expect(copy).not.toBe(model);
  });

  it('validates and resets a field with shared async rules', async () => {
    const model = { profile: { name: 'Ada' } };
    const onValidate = vi.fn();
    const onErrorChange = vi.fn();
    const field = new FormFieldController({
      field: 'profile.name',
      model,
      rules: { required: true, message: 'Name required' },
      onErrorChange,
      onValidate,
    });
    field.captureInitialValue();
    model.profile.name = '';
    await expect(field.validate()).rejects.toMatchObject({
      errors: [{ message: 'Name required' }],
    });
    expect(onValidate).toHaveBeenLastCalledWith('profile.name', false, 'Name required');
    field.reset();
    expect(model.profile.name).toBe('Ada');
    expect(field.snapshot().error).toBe('');
  });

  it('aggregates registered validation and selects reset and clear operations', async () => {
    const onFirstInvalid = vi.fn();
    const controller = new FormController({ onFirstInvalid });
    const first = {
      id: 1,
      field: 'first',
      validate: vi.fn().mockRejectedValue({
        errors: [{ field: 'first', fieldValue: '', message: 'Required' }],
        fields: {},
      }),
      reset: vi.fn(),
      clear: vi.fn(),
    };
    const second = {
      id: 2,
      field: 'second',
      validate: vi.fn().mockResolvedValue(undefined),
      reset: vi.fn(),
      clear: vi.fn(),
    };
    controller.register(first);
    const unregister = controller.register(second);
    await expect(controller.validate()).rejects.toEqual([
      { field: 'first', fieldValue: '', message: 'Required' },
    ]);
    expect(onFirstInvalid).toHaveBeenCalledWith('first');
    controller.resetFields('second');
    controller.clearValidate(['first']);
    expect(second.reset).toHaveBeenCalledOnce();
    expect(first.clear).toHaveBeenCalledOnce();
    unregister();
    await expect(controller.validateField('second')).resolves.toEqual(['second']);
  });
});
