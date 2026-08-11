import {
  Button,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownMenu,
  DropdownSubmenu,
} from '@aurora/horizon-web-react';

export default function NestedDropdownDemo() {
  return (
    <Dropdown
      menu={
        <DropdownMenu>
          <DropdownGroup title="Workspace">
            <DropdownItem>Overview</DropdownItem>
            <DropdownSubmenu
              submenu={
                <>
                  <DropdownItem>Members</DropdownItem>
                  <DropdownItem>Permissions</DropdownItem>
                </>
              }
              title="Settings"
              trigger="click"
            />
          </DropdownGroup>
        </DropdownMenu>
      }
      trigger="click"
    >
      <Button>Workspace</Button>
    </Dropdown>
  );
}
