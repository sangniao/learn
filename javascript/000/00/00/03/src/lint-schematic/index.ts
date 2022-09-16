// src/lint-schematic/index.ts

import { Rule, SchematicContext, Tree } from "@angular-devkit/schematics";
import { execSync } from "child_process";

export function lintSchematic(_options: { name: string }): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    _context.logger.info(`Executing: npm run lint -- --fix ${_options.name}`);
    execSync("npm run lint -- --fix " + _options.name);
  };
}
