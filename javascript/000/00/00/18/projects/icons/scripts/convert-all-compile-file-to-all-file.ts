import {Plugin, rollup, RollupOptions} from 'rollup';
import typescript, {RPT2Options} from 'rollup-plugin-typescript2';

import {rollupSvgo} from './rollup-svgo';

const banner = `
/**
 * @description:
 * DO NOT CHANGE THIS FILE. AUTOGENERATED
 */
`;

interface Options {
    prt2Options?: RPT2Options;
    from: string;
    to: string;
}

export async function convertAllCompileFileToAllFile(config: Options): Promise<void> {
    const {from, to, prt2Options} = config;

    const inputOptions: RollupOptions = {
        input: from,
        output: {preferConst: true},
        plugins: [
            typescript(
                prt2Options ?? {
                    cacheRoot: `node_modules/.cache/.rpt2_cache`,
                },
            ) as Plugin,
            rollupSvgo({
                include: `**/*.svg`,
                options: {
                    plugins: [
                        {
                            name: `preset-default`,
                            params: {
                                overrides: {
                                    removeViewBox: false,
                                    collapseGroups: false,
                                    cleanupIDs: false,
                                    removeUnknownsAndDefaults: false,
                                },
                            },
                        },
                    ],
                },
            }),
        ],
    };

    const bundle = await rollup(inputOptions);

    await bundle.write({
        banner,
        file: to,
        format: `es`,
        preferConst: true,
    });

    /**
     * @note:
     * The rollup bundle must be closed once `write` is finished to let plugins clean up their external
     * processes or services via the `closeBundle` hook, otherwise it can lead to memory leaks.
     */
    await bundle.close();
}