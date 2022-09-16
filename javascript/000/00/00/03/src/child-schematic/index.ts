// src/child-schematic/index.ts

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function childSchematic(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.logger.info('Hi from child-schematic');
    return tree;
  };
}
