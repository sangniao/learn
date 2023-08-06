// src/lint-caller-schematic/index.ts

import {
  externalSchematic,
  Rule,
  SchematicContext,
  Tree,
} from "@angular-devkit/schematics";
import { RunSchematicTask } from "@angular-devkit/schematics/tasks";

export function lintCallerSchematic(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const rule = externalSchematic(
      "@schematics/angular",
      "application",
      _options
    );

    _context.addTask(new RunSchematicTask("lint-schematic", _options));

    return rule;
  };
}
