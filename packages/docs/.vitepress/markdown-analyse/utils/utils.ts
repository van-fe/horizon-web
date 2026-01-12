export function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/\n/g, '\\n')
    .replace(/ /g, '&nbsp;')
    .replace(/'/g, '&#039;');
}

export function traverseContent({
  startTag,
  endTag,
  content,
  looping,
  afterLoop,
}: {
  startTag: string;
  endTag: string;
  content: string;
  looping?: (data: { commentContent: string; output: string[] }) => void;
  afterLoop?: (output: string[]) => void;
}) {
  const startTagLen = startTag.length;
  const endTagLen = endTag.length;
  const output = []; // 输出的内容
  let start = 0; // 字符串开始位置

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);

  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart));
    const commentContent = content.slice(commentStart + startTagLen, commentEnd);

    looping?.({ commentContent, output });

    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  afterLoop?.(output);

  output.push(content.slice(start));
  return output.join('');
}

export function getHeadingContent(content: string, type: 'h2' | 'h3' = 'h2') {
  const className = ['no-underline'];

  if (type === 'h2') {
    className.push('h2');
  } else {
    className.push('h3');
  }

  return `<div>
<h-link id="${content}" anchor="${content}" anchor-position="left" type="text" class="${className.join(
    ' ',
  )}">${content}</h-link>
</div>`;
}
