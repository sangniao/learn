import { normalize, strings } from '@angular-devkit/core';
import { workspace } from '@angular-devkit/core/src/experimental';
import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependency } from '@schematics/angular/utility/dependencies';
import { Builders } from '@schematics/angular/utility/workspace-models';
import { Schema } from './schema';
import {
  getProjectDefaultStyleFile,
  getTailwindCSSImports,
  getTargetsByBuilderName,
  nodeDependencyFactory,
  tailwindcssDependencies,
} from './utils';

/** Rule factory: returns a rule (function) */
export default function (options: Schema): Rule {
  // this is a rule (function). It takes a `tree` and returns updated `tree`.
  return (tree: Tree, context: SchematicContext) => {
    // Read `angular.json` as buffer
    const workspaceConfigBuffer = tree.read('angular.json');
    if (!workspaceConfigBuffer) {
      throw new SchematicsException('Could not find an Angular workspace configuration');
    }
    // parse config only when not null
    const workspaceConfig: workspace.WorkspaceSchema = JSON.parse(workspaceConfigBuffer.toString());
    // if project is not passed (--project), use default project name
    if (!options.project && workspaceConfig.defaultProject) {
      options.project = workspaceConfig.defaultProject;
    }
    const projectName = options.project as string;
    // elect project from projects array in `angular.json` file
    const project: workspace.WorkspaceProject = workspaceConfig.projects[projectName];
    if (!project) {
      throw new SchematicsException(`Project ${projectName} is not defined in this workspace.`);
    }
    // compose all rules using chain Rule.
    return chain([
      addDependencies(options),
      updateStylesFile(options, project),
      addTemplateFiles(options),
      updateAngularJsonFile(workspaceConfig, project),
      install(),
    ])(tree, context);
  };
}

/**
 * Add required dependencies to package.json file.
 */
function addDependencies(options: Schema): Rule {
  const deps = [...tailwindcssDependencies];

  if (options.cssType !== 'css') {
    deps.push(`postcss-${options.cssType}`);
  }
  return (tree: Tree, context: SchematicContext) => {
    deps.map((dependencyName: string) => {
      const nodeDependency: NodeDependency = nodeDependencyFactory(dependencyName, options);
      addPackageJsonDependency(tree, nodeDependency);
      context.logger.info(`➡️ Added ${nodeDependency.name}@${nodeDependency.version} to ${nodeDependency.type}`);
      return tree;
    });
  };
}
/** Update default project styles file */
function updateStylesFile(options: Schema, project: workspace.WorkspaceProject) {
  return (tree: Tree, context: SchematicContext) => {
    const stylePath = getProjectDefaultStyleFile(project, options.cssType);
    if (!stylePath) {
      context.logger.error(`Cannot update project styles file: Default style file path not found`);
      return tree;
    }
    const recorder = tree.beginUpdate(stylePath);
    recorder.insertLeft(0, getTailwindCSSImports());
    tree.commitUpdate(recorder);
    return tree;
  };
}
/** Add schematic templates from `./files` to the target application */
function addTemplateFiles(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // get hold of our templates files
    const sourceTemplates = url('./files');
    /**
     * `template` rule processes templates and returns rule.
     * The template helpers like `dasherize` or `classify` are available because we’re spreading `strings` object into the `options` objectand then we’re passing into the template
     */
    const sourceParamteterizedTemplates = apply(sourceTemplates, [
      template({
        ...options,
        ...strings,
        cssType: options.cssType,
      }),
      // move file to resolved path
      move(normalize('./')),
    ]);
    return mergeWith(sourceParamteterizedTemplates)(tree, context);
  };
}
/** Update `angular.json` file in Angular CLI workspace */
function updateAngularJsonFile(workspaceConfig: workspace.WorkspaceSchema, project: workspace.WorkspaceProject) {
  return (tree: Tree, _context: SchematicContext) => {
    const browserTargets = getTargetsByBuilderName(project, Builders.Browser);
    const devServerTargets = getTargetsByBuilderName(project, Builders.DevServer);
    // Multi app support
    for (const devServerTarget of devServerTargets) {
      devServerTarget.builder = '@angular-builders/custom-webpack:dev-server';
    }

    for (const browserTarget of browserTargets) {
      browserTarget.builder = '@angular-builders/custom-webpack:browser';
      browserTarget.options = {
        customWebpackConfig: {
          path: './webpack.config.js',
        },
        ...(browserTarget.options as any),
      };
    }

    tree.overwrite('angular.json', JSON.stringify(workspaceConfig, null, 2));
  };
}

/** Install Node dependencies */
function install(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // Install the dependency
    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}
