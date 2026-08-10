The React Switch supports both controlled and uncontrolled state while retaining a native checkbox for keyboard, form, and assistive-technology semantics.

## React Usage

```tsx
import { Switch } from '@aurora/horizon-web-react';
import '@aurora/horizon-web-react/style.css';

function Example() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      beforeChange={nextValue => confirmPreference(nextValue)}
      label="Automatic updates"
      onChange={setEnabled}
      status
      value={enabled}
    />
  );
}
```

Use `value` with `onChange` for controlled state, or provide only `defaultValue` for uncontrolled state. Use the native React `readOnly` spelling for read-only behavior.

## Basic Usage
:::demo components/Switch/basic.vue :::

## Label Position
You can control the label position by configuring `label-position`
:::demo components/Switch/labelPosition.vue :::

## Inline Status Text
Set `status-position="inside"` to display the status text inside the switch track. Keep inline text short because the available space is limited.
:::demo components/Switch/insideText.vue :::

## Size
Provides two sizes: `medium/small`
:::demo components/Switch/size.vue :::

## Disabled and Readonly
Use `disabled` and `readonly` to control whether it is disabled and readonly
:::demo components/Switch/disabled.vue :::

## Intercept Modification
Configure `before-change` to intercept whether to allow value change
:::demo components/Switch/beforeChange.vue :::
