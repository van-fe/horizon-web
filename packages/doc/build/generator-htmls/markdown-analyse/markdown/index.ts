import MarkdownIt from 'markdown-it';
import markdownItMultiMdTable from 'markdown-it-multimd-table';
import fenceConfig from './fenceConfig';
import containers from './containers';

const md = new MarkdownIt({
  html: true,
})
  .use(markdownItMultiMdTable)
  .use(containers);

fenceConfig(md);

export default md;
