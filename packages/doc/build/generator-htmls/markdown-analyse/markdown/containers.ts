import mdContainer from 'markdown-it-container';
import type MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token';

export default (md: MarkdownIt) => {
  md.use(mdContainer, 'demo', {
    validate(params: string) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render(tokens: Token[], idx: number) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)\s*:::$/);
      if (tokens[idx].nesting === 1) {
        return `<!--element-demo: ${m?.[1]}:element-demo-->`;
      }
      return '';
    },
  });

  md.use(mdContainer, 'tip', {
    validate(params: string) {
      return params.trim().match(/^tip\s*(.*)$/);
    },
    render(tokens: Token[], idx: number) {
      const m = tokens[idx].info.trim().match(/^tip\s*(.*?)\s*:::$/)?.[1]
        ?.replace(/\\n\s*/g, '<br>')
        .replace(/`(.*?)`/g, '<code>$1</code>');

      if (m) {
        return `<h-alert type="info" style="margin: 20px 0;" :closable="${false}" show-icon>${m}</h-alert>`;
      } else {
        return '';
      }
    },
  });

  md.use(mdContainer, 'info', {
    validate(params: string) {
      return params.trim().match(/^info\s*(.*)$/);
    },
    render(tokens: Token[], idx: number) {
      const m = tokens[idx].info.trim().match(/^info\s*(.*?)\s*:::$/)?.[1]
        ?.replace(/\\n\s*/g, '<br>')
        .replace(/`(.*?)`/g, '<code>$1</code>');

      if (m) {
        return `<h-alert type="info" style="margin: 20px 0;" :closable="${false}" show-icon>${m}</h-alert>`;
      } else {
        return '';
      }
    },
  });

  md.use(mdContainer, 'warning', {
    validate(params: string) {
      return params.trim().match(/^warning\s*(.*)$/);
    },
    render(tokens: Token[], idx: number) {
      const m = tokens[idx].info.trim().match(/^warning\s*(.*?)\s*:::$/)?.[1]
        ?.replace(/\\n\s*/g, '<br>')
        .replace(/`(.*?)`/g, '<code>$1</code>');

      if (m) {
        return `<h-alert type="warning" style="margin: 20px 0;" :closable="${false}" show-icon>${m}</h-alert>`;
      } else {
        return '';
      }
    },
  });

  md.use(mdContainer, 'success', {
    validate(params: string) {
      return params.trim().match(/^success\s*(.*)$/);
    },
    render(tokens: Token[], idx: number) {
      const m = tokens[idx].info.trim().match(/^success\s*(.*?)\s*:::$/)?.[1]
        ?.replace(/\\n\s*/g, '<br>')
        .replace(/`(.*?)`/g, '<code>$1</code>');

      if (m) {
        return `<h-alert type="success" style="margin: 20px 0;" :closable="${false}" show-icon>${m}</h-alert>`;
      } else {
        return '';
      }
    },
  });

  md.use(mdContainer, 'error', {
    validate(params: string) {
      return params.trim().match(/^error\s*(.*)$/);
    },
    render(tokens: Token[], idx: number) {
      const m = tokens[idx].info.trim().match(/^error\s*(.*?)\s*:::$/)?.[1]
        ?.replace(/\\n\s*/g, '<br>')
        .replace(/`(.*?)`/g, '<code>$1</code>');

      if (m) {
        return `<h-alert type="error" style="margin: 20px 0;" :closable="${false}" show-icon>${m}</h-alert>`;
      } else {
        return '';
      }
    },
  });

  md.use(mdContainer, 'code', {
    validate(params: string) {
      return params.trim().match(/^code\s*(.*)$/);
    },
    render(tokens: Token[], idx: number) {
      const m = tokens[idx].info.trim().match(/^code\s*(.*?)\s*:::$/);
      if (m) {
        return `<!--code-path: ${m?.[1]}:code-path-->`;
      } else {
        return '';
      }
    },
  });
};
