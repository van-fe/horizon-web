import { Button, Dropdown, DropdownItem, DropdownMenu, Space } from '@aurora/horizon-react';

const menu = (
  <DropdownMenu>
    <DropdownItem>Open</DropdownItem>
    <DropdownItem disabled>Unavailable</DropdownItem>
  </DropdownMenu>
);

export default function DropdownTriggersDemo() {
  return (
    <Space wrap>
      <Dropdown menu={menu} trigger="hover">
        <Button>Hover</Button>
      </Dropdown>
      <Dropdown menu={menu} trigger="click">
        <Button>Click</Button>
      </Dropdown>
      <Dropdown menu={menu} trigger="context-menu">
        <Button>Right click</Button>
      </Dropdown>
    </Space>
  );
}
