import * as shell from 'shelljs';
import path from 'path';
import { legoEsmOutput, legoLibOutput, legoBuildOutput } from '@nio-fe/shared/plugins';

/** lib **/
shell.cp(
  path.resolve(legoLibOutput, 'styles', 'index.css'),
  path.resolve(legoLibOutput, 'index.css'),
);
shell.cp(
  path.resolve(legoLibOutput, 'styles', 'index.css'),
  path.resolve(legoLibOutput, 'style.css'),
);
/** es **/
shell.cp(
  path.resolve(legoEsmOutput, 'styles', 'index.css'),
  path.resolve(legoEsmOutput, 'index.css'),
);
shell.cp(
  path.resolve(legoEsmOutput, 'styles', 'index.css'),
  path.resolve(legoEsmOutput, 'style.css'),
);
/** dist **/
shell.cp(
  path.resolve(legoEsmOutput, 'styles', 'index.css'),
  path.resolve(legoBuildOutput, 'style.css'),
);
