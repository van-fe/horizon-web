export const excludeFiles = (...paths: string[][]): string[] => {
  const excludes = ['node_modules', 'TestProps', 'dist', 'lib'];
  return paths.flat().filter(path => !excludes.some(exclude => path.includes(exclude)));
};
