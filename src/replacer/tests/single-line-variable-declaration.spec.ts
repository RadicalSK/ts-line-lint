import { EMPTY_RULES_CONFIG, LineLintConfig } from '../../config/line-lint-config';
import { createMultilineString } from '../../utils/text-utils';
import { createMockConfig } from './create-mock-config';
import { expectReplacerWithConfig } from './replacer-expects';

export function singleLineVariableDeclarationRuleTestSuite(): void {
    let config: LineLintConfig;
    const noBlanksAround = createMultilineString(
        '// non-blank line',
        'var topLevelVar = "foo";',
        '// non-blank line',
        'let topLevelLet = "foo";',
        '// non-blank line',
        'const topLevelConst = "foo";',
        '// non-blank line',
        '  var indentedLevelVar = "bar";',
        '// non-blank line',
        '  let indentedLevelLet = "bar";',
        '// non-blank line',
        '  const indentedLevelConst = "bar";',
        '// non-blank line',
    );
    const blanksAround = noBlanksAround.replace(/(\/\/ non-blank line)/g, '\n$1\n').slice(1, -1);
    const blanksOnlyAfter = noBlanksAround.replace(/(\/\/ non-blank line)/g, '\n$1').slice(1);
    const blanksOnlyBefore = noBlanksAround.replace(/(\/\/ non-blank line)/g, '$1\n').slice(0, -1);

    describe('is not specified', () => {

        it('should only apply cleanup replacements', () => {
            expectReplacerWithConfig(EMPTY_RULES_CONFIG).toOnlyApplyCleanupReplacementsTo(blanksAround);
            expectReplacerWithConfig(EMPTY_RULES_CONFIG).toOnlyApplyCleanupReplacementsTo(noBlanksAround);
        });

    });

    describe('has option "remove: none"', () => {

        beforeEach(() => {
            config = createMockConfig('single-line-variable-declaration', 'remove', 'none');
        });

        it('should only apply cleanup replacements', () => {
            expectReplacerWithConfig(config).toOnlyApplyCleanupReplacementsTo(blanksAround);
            expectReplacerWithConfig(config).toOnlyApplyCleanupReplacementsTo(noBlanksAround);
        });

    });

    describe('has option "remove: before"', () => {

        beforeEach(() => {
            config = createMockConfig('single-line-variable-declaration', 'remove', 'before');
        });

        it('should remove blank lines before each single line variable declaration', () => {
            expectReplacerWithConfig(config).toConvert(blanksAround).to(blanksOnlyAfter);
        });

    });

    describe('has option "remove: after"', () => {

        beforeEach(() => {
            config = createMockConfig('single-line-variable-declaration', 'remove', 'after');
        });

        it('should remove blank lines after each single line variable declaration', () => {
            expectReplacerWithConfig(config).toConvert(blanksAround).to(blanksOnlyBefore);
        });

    });

    describe('has option "remove: both"', () => {

        beforeEach(() => {
            config = createMockConfig('single-line-variable-declaration', 'remove', 'both');
        });

        it('should remove blank lines both before and after each single line variable declaration', () => {
            expectReplacerWithConfig(config).toConvert(blanksAround).to(noBlanksAround);
        });

    });

    describe('has option "insert: none"', () => {

        beforeEach(() => {
            config = createMockConfig('single-line-variable-declaration', 'insert', 'none');
        });

        it('should only apply cleanup replacements', () => {
            expectReplacerWithConfig(config).toOnlyApplyCleanupReplacementsTo(blanksAround);
            expectReplacerWithConfig(config).toOnlyApplyCleanupReplacementsTo(noBlanksAround);
        });

    });

    describe('has option "insert: before"', () => {

        beforeEach(() => {
            config = createMockConfig('single-line-variable-declaration', 'insert', 'before');
        });

        it('should insert a blank line before each single line variable declaration', () => {
            expectReplacerWithConfig(config).toConvert(noBlanksAround).to(blanksOnlyBefore);
        });

    });

    describe('has option "insert: after"', () => {

        beforeEach(() => {
            config = createMockConfig('single-line-variable-declaration', 'insert', 'after');
        });

        it('should insert a blank line after each single line variable declaration', () => {
            expectReplacerWithConfig(config).toConvert(noBlanksAround).to(blanksOnlyAfter);
        });

    });

    describe('has option "insert: both"', () => {

        beforeEach(() => {
            config = createMockConfig('single-line-variable-declaration', 'insert', 'both');
        });

        it('should insert blank lines both before and after each single line variable declaration', () => {
            expectReplacerWithConfig(config).toConvert(noBlanksAround).to(blanksAround);
        });

    });

    describe('has both "remove" and "insert" options', () => {

        beforeEach(() => {
            config = {
                ...EMPTY_RULES_CONFIG,
                rules: { 'single-line-variable-declaration': { remove: 'both', insert: 'after' } },
            };
        });

        it('should first apply the removal and then the insertion', () => {
            expectReplacerWithConfig(config).toConvert(blanksAround).to(blanksOnlyAfter);
        });

    });

}
