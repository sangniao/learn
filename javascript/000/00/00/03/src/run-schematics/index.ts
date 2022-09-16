// src/run-schematics/index.ts

import {
  chain,
  externalSchematic,
  Rule,
  schematic,
  SchematicContext,
  Tree,
} from "@angular-devkit/schematics";

export function runSchematics(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const rule1 = schematic("child-schematic", _options);

    const rule2 = externalSchematic(
      "@schematics/angular",
      "component",
      _options
    );

    return chain([rule1, rule2]);
  };
}
