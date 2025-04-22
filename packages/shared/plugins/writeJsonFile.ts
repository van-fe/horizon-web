import * as fs from 'fs';

export function writeJsonFile(path: string, fileName: string, data: string): void {
  fs.mkdirSync(path, { recursive: true });
  fs.writeFileSync(path + '/' + fileName, data, { encoding: 'utf-8' });
}
