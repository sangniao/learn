import { normalize } from '@angular-devkit/core';
import { workspace } from '@angular-devkit/core/src/experimental';
import { SchematicsException } from '@angular-devkit/schematics';
import { NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { Schema } from './schema';

export const tailwindcssDependencies = [
  'tailwindcss',
  'postcss-import',
  'postcss-loader',
  '@angular-builders/custom-webpack',
];

export function nodeDependencyFactory(dependencyName: string, options: Schema): NodeDependency {
  // default version : latest
  let version = 'latest';
  if (dependencyName === 'tailwindcss' && options.tailwindcssVersion) {
    version = options.tailwindcssVersion;
  }
  return {
    type: NodeDependencyType.Dev,
    name: dependencyName,
    version: version,
    overwrite: false,
  };
}

export function getTailwindCSSImports(): string {
  return `
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
`;
}

export function getProjectDefaultStyleFile(project: workspace.WorkspaceProject, fileExtension: string): string | null {
  const buildOptions = getProjectTargetOptions(project, 'build');
  if (buildOptions?.styles && buildOptions?.styles.length) {
    const defaultMainStylePath: Array<string> = buildOptions.styles.map((file: string) =>
      typeof file === 'string' && file === `${project.sourceRoot}/styles.${fileExtension}`
        ? `${project.sourceRoot}/styles.${fileExtension}`
        : null
    );
    if (defaultMainStylePath && defaultMainStylePath[0]) {
      return normalize(defaultMainStylePath[0]);
    }
  }
  return null;
}

/** Gets all targets from the given project that match the specified builder name. */
export function getTargetsByBuilderName(project: workspace.WorkspaceProject, builderName: string) {
  const targets = project.architect || {};
  return Object.keys(targets)
    .filter((name) => targets[name].builder === builderName)
    .map((name) => targets[name]);
}

function getProjectTargetOptions(project: workspace.WorkspaceProject, target: string) {
  if (project?.architect) {
    return project.architect?.[target]['options'];
  }
  throw new SchematicsException(`Cannot determine project target configuration for: ${target}.`);
}
