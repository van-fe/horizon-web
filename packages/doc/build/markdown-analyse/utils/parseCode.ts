import { escapeHtml, traverseContent } from './utils';
import path from 'path';
import fs from 'fs';

export default function (content: string, filePath: string, root: string) {
  const importScripts: string[] = [];

  const output = traverseContent({
    startTag: '<!--code-path:',
    endTag: ':code-path-->',
    content,
    looping: ({ commentContent, output }) => {
      const codeFilePath = path.join(path.dirname(filePath), commentContent.trim());
      const textContent = fs.readFileSync(codeFilePath, 'utf-8');

      const escaped = escapeHtml(textContent);

      output.push(`<template v-slot:highlight><div>${escaped}</div></template>`);
    },
  });

  return {
    output,
    importScripts,
  };
}
