import { Dictionary } from '../utils/types';

export const patternMap: Dictionary<RegExp> = {
    'individual-import': /(^import {(.*|(?:\n(?:[ \t]*.*,?\n)+?))} from .*\n)/mg,
    'consecutive-imports': /((?:^import {(?:.*|(?:\n(?:[ \t]*.*,?\n)+?))} from .*\n)+)/mg,
    'individual-multiline-type-alias': /(^([ \t]*)(?:export )?type .*\n(?:[ \t]+.*\n)+?\2[^;]*;\n)/mg,
    'consecutive-single-line-type-aliases': /((?:^[ \t]*(?:export )?type .*;\n)+)/mg,
    'interface-declaration': /(^([ \t]*)(?:export )?interface \w+ {\n(?:.*\n)*?\2}\n)/mg,
    'single-line-variable-declaration': /(^[ \t]*(?:var|let|const) [^;\n]*;\n)/mg,
    'multiline-variable-declaration': /(^[ \t]*(?:var|let|const) [^;]*\n[^;]*;\n)/mg,
    'function-declaration': /(^([ \t]*)(?:async )?function .*[{,]\n(?:.*\n)*?\2}\n)/mg,
    'class-declaration': /(^([ \t]*)(?:@\w+\([^)]*\)\n\2)?.*\bclass\b.*\n(?:.*\n)*?\2}\n)/mg,
    // 'class-property-declaration': //mg,
    // 'method-or-accessor-declaration': //mg,
    // 'abstract-method-or-accessor': //mg,
    // 'property-with-effect-decorator': //mg,
    // 'unit-test-describe': //mg,
    // 'unit-test-single-line-hook-statement': //mg,
    // 'unit-test-hook-statement-block': //mg,
    // 'unit-test-it-statement': //mg,

    'tslint-disable-next-line-comment': /(^[ \t]*\/(?:\/|\*) tslint:disable-next-line.*\n)\n+/mg,
    'leading-blank': /^\n+/g,
    'duplicate-blanks': /(?<=\n)(\n+)/g,
    'excess-trailing-blanks': /(?<=\n)(\n+)$/g,
};
