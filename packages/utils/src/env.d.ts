declare global {
  interface ChromeMouseEvent extends MouseEvent {
    path: HTMLElement[];
  }

  interface Element {
    $_vs_id: number;
  }
}

export {};
