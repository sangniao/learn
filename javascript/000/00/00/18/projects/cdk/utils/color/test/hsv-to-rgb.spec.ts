import {tuiHsvToRgb} from '@taiga-ui/cdk';

describe(`hsvToRgb`, () => {
    it(`works`, () => {
        expect(tuiHsvToRgb(123, 0.5, 237)).toEqual([119, 237, 124]);
    });
});
