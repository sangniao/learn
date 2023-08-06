export const defaultEditorExtensions = [
    import(`@taiga-ui/addon-editor/extensions/starter-kit`)
        .then(({StarterKit}) => StarterKit)
        .then(extension => extension.configure({heading: {levels: [1, 2]}})),
    import(`@tiptap/extension-text-align`).then(({default: TextAlign}) =>
        TextAlign.configure({types: [`heading`, `paragraph`]}),
    ),
    import(`@tiptap/extension-text-style`).then(({default: TextStyle}) => TextStyle),
    import(`@tiptap/extension-underline`).then(({default: Underline}) => Underline),
    import(`@tiptap/extension-subscript`).then(({default: Subscript}) => Subscript),
    import(`@tiptap/extension-superscript`).then(({default: Superscript}) => Superscript),
    import(`@taiga-ui/addon-editor/extensions/font-color`).then(
        ({FontColor}) => FontColor,
    ),
    import(`@tiptap/extension-image`).then(({default: Image}) =>
        Image.configure({inline: true}),
    ),
    import(`@taiga-ui/addon-editor/extensions/link`).then(({TuiLink}) => TuiLink),
    import(`@taiga-ui/addon-editor/extensions/jump-anchor`).then(
        ({TuiJumpAnchor}) => TuiJumpAnchor,
    ),
    import(`@taiga-ui/addon-editor/extensions/file-link`).then(
        ({TuiFileLink}) => TuiFileLink,
    ),
    import(`@taiga-ui/addon-editor/extensions/background-color`).then(
        ({BackgroundColor}) => BackgroundColor,
    ),
    import(`@taiga-ui/addon-editor/extensions/table`).then(({TuiTable}) =>
        TuiTable.configure({resizable: true}),
    ),
    import(`@tiptap/extension-table-row`).then(({default: TableRow}) => TableRow),
    import(`@tiptap/extension-table-cell`).then(({default: TableCell}) => TableCell),
    import(`@tiptap/extension-table-header`).then(({TableHeader}) => TableHeader),
    import(`@taiga-ui/addon-editor/extensions/indent-outdent`).then(
        ({TuiTabExtension}) => TuiTabExtension,
    ),
    import(`@taiga-ui/addon-editor/extensions/table-cell-background`).then(
        ({TableCellBackground}) => TableCellBackground,
    ),
    import(`@taiga-ui/addon-editor/extensions/details`).then(
        ({TuiDetailsContent}) => TuiDetailsContent,
    ),
    import(`@taiga-ui/addon-editor/extensions/details`).then(
        ({TuiDetails}) => TuiDetails,
    ),
    import(`@taiga-ui/addon-editor/extensions/details`).then(
        ({TuiSummary}) => TuiSummary,
    ),
    import(`@taiga-ui/addon-editor/extensions/font-size`).then(
        ({TuiFontSize}) => TuiFontSize,
    ),
];
