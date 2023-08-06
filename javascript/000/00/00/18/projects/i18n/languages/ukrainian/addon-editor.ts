import {TuiLanguageEditor} from '@taiga-ui/i18n/interfaces';

export const TUI_UKRAINIAN_LANGUAGE_ADDON_EDITOR: TuiLanguageEditor = {
    colorSelectorModeNames: [`Суцільний колір`, `Градієнт`],
    toolbarTools: {
        undo: `Скасувати`,
        redo: `Повторити`,
        font: `Шрифт`,
        fontStyle: `Стиль шрифту`,
        fontSize: `Розмір шрифту`,
        bold: `Жирний`,
        italic: `Курсив`,
        underline: `Підкреслений`,
        strikeThrough: `Закреслений`,
        justify: `Вирівнювання`,
        justifyLeft: `Вирівняти текст за лівим краєм`,
        justifyCenter: `Вирівняти текст по центру`,
        justifyRight: `Вирівняти текст за правим краєм`,
        justifyFull: `Вирівняти за шириною`,
        list: `Списки`,
        indent: `Зменшити відступ`,
        outdent: `Збільшити відступ`,
        unorderedList: `Маркований список`,
        orderedList: `Нумерований список`,
        quote: `Цитата`,
        foreColor: `Колір: Текст`,
        hiliteColor: `Колір виділення`,
        backColor: `Колір фону`,
        clear: `Скинути форматування`,
        link: `Посилання`,
        attach: `Вставити файл`,
        tex: `Вставити формулу`,
        code: `Code`,
        image: `Вставити зображення`,
        insertHorizontalRule: `Розділювач`,
        superscript: `Надрядковий`,
        subscript: `Підрядковий`,
        insertTable: `Insert table`,
        insertGroup: `Insert group`,
        removeGroup: `Remove group`,
        insertAnchor: `Insert anchor`,
        mergeCells: `Merge cells`,
        splitCells: `Split cells`,
        rowsColumnsManaging: `Managing rows and columns`,
        cellColor: `Cell color`,
        setDetails: `Details`,
        removeDetails: `Remove details`,
    },
    editorEditLink: {
        urlExample: `example.com`,
        anchorExample: `anchor`,
    },
    editorTableCommands: [
        [`Insert column before`, `Insert column after`],
        [`Insert row before`, `Insert row after`],
        [`Delete column`, `Delete row`],
    ],
    editorCodeOptions: [`Code in the text`, `Code in block`],
    editorFontOptions: {
        small: `Small`,
        normal: `Normal`,
        large: `Large`,
        title: `Title`,
        subtitle: `Subtitle`,
    },
};