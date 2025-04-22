declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicAttributes {
      class?: unknown;
      style?: unknown;
    }
  }
}

export {};
