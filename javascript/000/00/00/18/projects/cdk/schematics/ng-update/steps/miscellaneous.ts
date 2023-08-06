import {getNamedImportReferences} from '../../utils/get-named-import-references';
import {Node, SyntaxKind, TypeReferenceNode} from 'ng-morph';
import {insertTodo} from '../../utils/insert-todo';
import {
    infoLog,
    REPLACE_SYMBOL,
    SMALL_TAB_SYMBOL,
    SUCCESS_SYMBOL,
    successLog,
} from '../../utils/colored-log';

export function miscellaneousMigrations() {
    infoLog(`${SMALL_TAB_SYMBOL}${REPLACE_SYMBOL} miscellaneous migrating...`);

    replaceEnumProperty({
        enumName: 'TuiCurrency',
        from: 'HongKong_dollar',
        to: 'HongKongDollar',
    });
    replaceEnumProperty({
        enumName: 'TuiCurrencyCode',
        from: 'HongKong_dollar',
        to: 'HongKongDollar',
    });
    replaceEnumProperty({
        enumName: 'TuiCreditCardAutofillName',
        from: 'CcExp_mounth',
        to: 'CcExpMonth',
    });
    replaceEnumProperty({
        enumName: 'TuiCreditCardAutofillName',
        from: 'CcExp_year',
        to: 'CcExpYear',
    });

    addWarningToMethod(
        'TuiDirectiveStylesService',
        'addStyle',
        'addStyle method has been removed. Use components approach',
    );

    successLog(`${SMALL_TAB_SYMBOL}${SUCCESS_SYMBOL} miscellaneous migrated \n`);
}

function addWarningToMethod(className: string, method: string, message: string) {
    const references = getNamedImportReferences(className);

    references.forEach(ref => {
        const parent = ref.getParent();

        if (Node.isTypeReferenceNode(parent)) {
            checkMethod(parent, method, message);
        }
    });
}

function replaceEnumProperty({
    enumName,
    from,
    to,
}: {
    enumName: string;
    from: string;
    to: string;
}) {
    const references = getNamedImportReferences(enumName);

    references.forEach(ref => {
        const parent = ref.getParent();
        if (!Node.isPropertyAccessExpression(parent)) {
            return;
        }

        parent.getChildren().forEach(node => {
            if (node.getText() === from) {
                node.replaceWithText(to);
            }
        });
    });
}

function checkMethod(node: TypeReferenceNode, method: string, message: string) {
    const statement = node.getParent();
    const identifier = statement.getChildrenOfKind(SyntaxKind.Identifier)[0];

    identifier.findReferencesAsNodes().forEach(ref => {
        let parent = ref.getParent();

        if (
            (Node.isPropertyAccessExpression(parent) &&
                parent.getText().startsWith('this.')) ||
            Node.isCallExpression(parent)
        ) {
            parent = parent.getParentIfKind(SyntaxKind.PropertyAccessExpression);
        }

        if (Node.isPropertyAccessExpression(parent)) {
            parent.getChildrenOfKind(SyntaxKind.Identifier).forEach(identifier => {
                if (identifier.getText() === method) {
                    insertTodo(identifier, message);
                }
            });
        }
    });
}
