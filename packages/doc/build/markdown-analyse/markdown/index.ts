import MarkdownIt from 'markdown-it';
import markdownItMultiMdTable from 'markdown-it-multimd-table';
import markdownItLinkAttributes from 'markdown-it-link-attributes';
import fenceConfig from './fenceConfig';
import containers from './containers';

const md = new MarkdownIt({
  html: true,
})
  .use(markdownItMultiMdTable)
  .use(markdownItLinkAttributes, {
    pattern: /https?:\/\//,
    attrs: {
      target: '_blank',
      rel: 'noopener noreferrer',
    }
  })
  .use(containers);

fenceConfig(md);

export default md;
