import {Project} from '@stackblitz/sdk/typings/interfaces';

import {TsFileComponentParser, TsFileModuleParser, TsFileParser} from '../classes';
import {isLess, isPrimaryComponentFile, isTS} from '../utils';

export const prepareLess = (content: string): string => {
    return content.replace(
        /@import.+taiga-ui-local(.less)?';/g,
        `@import '@taiga-ui/core/styles/taiga-ui-local.less';`,
    );
};

export const appPrefix = (stringsPart: TemplateStringsArray, path: string = ``): string =>
    `src/app/${stringsPart.join(``)}${path}`;

export const stackblitzPrefix = (
    stringsPart: TemplateStringsArray,
    path: string = ``,
): string => `src/app/@stackblitz/${stringsPart.join(``)}${path}`;

type FileName = string;

type FileContent = string;

export const getSupportFiles = <T extends Record<string, string>>(
    files: T,
): Array<[FileName, FileContent]> => {
    return Object.entries(files).filter(
        ([fileName, content]) => content && !isPrimaryComponentFile(fileName),
    );
};

export const prepareSupportFiles = (
    files: Array<[FileName, FileContent]>,
): Project['files'] => {
    const processedContent: Project['files'] = {};

    for (const [fileName, fileContent] of files) {
        const prefixedFileName = appPrefix`${fileName}`;

        processedContent[prefixedFileName] = isLess(fileName)
            ? prepareLess(fileContent)
            : fileContent;
    }

    return processedContent;
};

export const getComponentsClassNames = (
    files: Array<[FileName, FileContent]>,
): Array<[FileName, FileContent]> => {
    return files
        .filter(
            ([fileName, fileContent]) =>
                isTS(fileName) && new TsFileParser(fileContent).hasNgComponent,
        )
        .map(([fileName, fileContent]) => [
            fileName,
            new TsFileComponentParser(fileContent).className,
        ]);
};

export const getSupportModules = (
    files: Array<[FileName, FileContent]>,
): Array<[FileName, TsFileModuleParser]> => {
    return files
        .filter(([name, content]) => isTS(name) && new TsFileParser(content).hasNgModule)
        .map(([fileName, fileContent]) => [
            fileName,
            new TsFileModuleParser(fileContent),
        ]);
};

export function getAllModules(entryPoint: Record<string, unknown>): string {
    const allModules = Object.keys(entryPoint)
        .filter(name => name.endsWith(`Module`))
        .filter(name => name !== `TuiOrderWeekDaysPipeModule`) // TODO remove after release 3.7.0
        .join(`,\n\t\t`);

    return `${allModules}`;
}

/**
 * We can't just dynamically import all modules from packages.
 * For examples:
 * ```ts
 * import * as CDK from '@taiga-ui/cdk';
 * // ...
 * @NgModule({ imports: [...getAllModules(CDK)] })
 * ```
 * There is a limit to the amount of "static" analysis that the AOT compiler is willing to do.
 * See this {@link https://github.com/angular/angular/issues/42550 issue}
 */
export async function getAllTaigaUIModulesFile(
    additionalModules: Array<[fileName: string, parsedFile: TsFileModuleParser]> = [],
): Promise<string> {
    /**
     * Violated DRY principle:
     * You can't just iterate the array with package-names - it will cause error:
     * `Warning: Critical dependency: the request of a dependency is an expression`
     * */
    const [cdk, core, kit, charts, commerce, editor, mobile, preview, table, tablebars] =
        await Promise.all([
            import(`@taiga-ui/cdk`),
            import(`@taiga-ui/core`),
            import(`@taiga-ui/kit`),
            import(`@taiga-ui/addon-charts`),
            import(`@taiga-ui/addon-commerce`),
            import(`@taiga-ui/addon-editor`),
            import(`@taiga-ui/addon-mobile`),
            import(`@taiga-ui/addon-preview`),
            import(`@taiga-ui/addon-table`),
            import(`@taiga-ui/addon-tablebars`),
        ]).then(modules => modules.map(getAllModules));

    const additionalModulesImports = additionalModules
        .map(
            ([fileName, {className}]) =>
                `import {${className}} from '../${fileName.replace(`.ts`, ``)}';`,
        )
        .join(`\n`);

    return `
import {
    ${cdk}
} from '@taiga-ui/cdk';
import {
    ${core}
} from '@taiga-ui/core';
import {
    ${kit}
} from '@taiga-ui/kit';
import {
    ${charts}
} from '@taiga-ui/addon-charts';
import {
    ${commerce}
} from '@taiga-ui/addon-commerce';
import {
    ${editor}
} from '@taiga-ui/addon-editor';
import {
    ${mobile}
} from '@taiga-ui/addon-mobile';
import {
    ${preview}
} from '@taiga-ui/addon-preview';
import {
    ${table}
} from '@taiga-ui/addon-table';
import {
    ${tablebars}
} from '@taiga-ui/addon-tablebars';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';
import {RouterModule} from '@angular/router';
${additionalModulesImports}

export const ALL_TAIGA_UI_MODULES = [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PolymorpheusModule,
    RouterModule.forRoot([]),
    /* CDK */
    ${cdk},
    /* CORE */
    ${core},
    /* KIT */
    ${kit},
    /* ADDON-CHARTS */
    ${charts},
    /* ADDON-COMMERCE */
    ${commerce},
    /* ADDON-EDITOR */
    ${editor},
    /* ADDON-MOBILE */
    ${mobile},
    /* ADDON-PREVIEW */
    ${preview},
    /* ADDON-TABLE */
    ${table},
    /* ADDON-TABLEBARS */
    ${tablebars},
    /* EXAMPLE MODULES */
    ${additionalModules.map(([, {className}]) => className).join(`,\n\t\t`)}
];
`;
}
