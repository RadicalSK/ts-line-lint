import { createMultilineString } from '../../../../utils/text-utils';

export const consecutiveImportsSnippet = createMultilineString(
    '// non-blank line',
    '%BLANK_BEFORE%',
    'import {SingleImportedItem} from "abc";',
    'import {ExportedItem as AliasedItem} from "def";',
    '%BLANK_AFTER%',
    '// non-blank line',
    '%BLANK_BEFORE%',
    'import { FirstItem, SecondItem } from "ghi";',
    '%BLANK_AFTER%',
    '// non-blank line',
    '%BLANK_BEFORE%',
    'import * as jkl from "mno";',
    'import Something = someNamespace.Something;',
    'import {',
    '  FirstOfSeveralLongNameImportedItems,',
    '  SecondOfSeveralLongNameImportedItems',
    '} from "../pqr";',
    'import {',
    '  AnotherLongNameImportedItems,',
    '  YetAnotherLongNameImportedItems',
    '} from "../pqr";',
    '%BLANK_AFTER%',
    '// non-blank line'
);