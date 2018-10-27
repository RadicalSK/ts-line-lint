import { EMPTY_RULES_CONFIG, LineLintConfig } from '../../config/line-lint-config';
import { createMultilineString } from '../../utils/text-utils';
import { createMockConfig } from './create-mock-config';
import { expectReplacerWithConfig } from './replacer-expects';

export function interfaceDeclarationRuleTestSuite(): void {
    const inputSnippetWithBlanks = createMultilineString(
        '// non-blank line',
        '',
        'interface LocalInterface {',
        '  prop1: type;',
        '  prop2: type;',
        '}',
        '',
        '// non-blank line',
        '',
        '  interface IndentedInterface {',
        '    prop1: type;',
        '    prop2: type;',
        '  }',
        '',
        '// non-blank line',
        '',
        'export interface ExportedInterface {',
        '  method1(param: type): type;',
        '',
        '  method2(param: type): type;',
        '}',
        '',
        '// non-blank line',
    );
    const inputSnippetWithoutBlanks = createMultilineString(
        '// non-blank line',
        'interface LocalInterface {',
        '  prop1: type;',
        '  prop2: type;',
        '}',
        '// non-blank line',
        '  interface IndentedInterface {',
        '    prop1: type;',
        '    prop2: type;',
        '  }',
        '// non-blank line',
        'export interface ExportedInterface {',
        '  method1(param: type): type;',
        '',
        '  method2(param: type): type;',
        '}',
        '// non-blank line',
    );
    let expectedOutput: string;
    let config: LineLintConfig;

    describe('is not specified', () => {

        it('should only apply cleanup replacements', () => {
            expectReplacerWithConfig(EMPTY_RULES_CONFIG).toOnlyApplyCleanupReplacementsTo(inputSnippetWithBlanks);
            expectReplacerWithConfig(EMPTY_RULES_CONFIG).toOnlyApplyCleanupReplacementsTo(inputSnippetWithoutBlanks);
        });

    });

    describe('has option "remove: none"', () => {

        beforeEach(() => {
            config = createMockConfig('interface-declaration', 'remove', 'none');
        });

        it('should only apply cleanup replacements', () => {
            expectReplacerWithConfig(config).toOnlyApplyCleanupReplacementsTo(inputSnippetWithBlanks);
            expectReplacerWithConfig(config).toOnlyApplyCleanupReplacementsTo(inputSnippetWithoutBlanks);
        });

    });

    describe('has option "remove: before"', () => {

        beforeEach(() => {
            config = createMockConfig('interface-declaration', 'remove', 'before');
        });

        it('should remove blank lines before each interface declaration', () => {
            expectedOutput = createMultilineString(
                '// non-blank line',
                'interface LocalInterface {',
                '  prop1: type;',
                '  prop2: type;',
                '}',
                '',
                '// non-blank line',
                '  interface IndentedInterface {',
                '    prop1: type;',
                '    prop2: type;',
                '  }',
                '',
                '// non-blank line',
                'export interface ExportedInterface {',
                '  method1(param: type): type;',
                '',
                '  method2(param: type): type;',
                '}',
                '',
                '// non-blank line',
            );

            expectReplacerWithConfig(config).toConvert(inputSnippetWithBlanks).to(expectedOutput);
        });

    });

    describe('has option "remove: after"', () => {

        beforeEach(() => {
            config = createMockConfig('interface-declaration', 'remove', 'after');
        });

        it('should remove blank lines after each interface declaration', () => {
            expectedOutput = createMultilineString(
                '// non-blank line',
                '',
                'interface LocalInterface {',
                '  prop1: type;',
                '  prop2: type;',
                '}',
                '// non-blank line',
                '',
                '  interface IndentedInterface {',
                '    prop1: type;',
                '    prop2: type;',
                '  }',
                '// non-blank line',
                '',
                'export interface ExportedInterface {',
                '  method1(param: type): type;',
                '',
                '  method2(param: type): type;',
                '}',
                '// non-blank line',
            );

            expectReplacerWithConfig(config).toConvert(inputSnippetWithBlanks).to(expectedOutput);
        });

    });

    describe('has option "remove: both"', () => {

        beforeEach(() => {
            config = createMockConfig('interface-declaration', 'remove', 'both');
        });

        it('should remove blank lines both before and after each interface declaration', () => {
            expectReplacerWithConfig(config).toConvert(inputSnippetWithBlanks).to(inputSnippetWithoutBlanks);
        });

    });

    describe('has option "insert: none"', () => {

        beforeEach(() => {
            config = createMockConfig('interface-declaration', 'insert', 'none');
        });

        it('should only apply cleanup replacements', () => {
            expectReplacerWithConfig(config).toOnlyApplyCleanupReplacementsTo(inputSnippetWithBlanks);
            expectReplacerWithConfig(config).toOnlyApplyCleanupReplacementsTo(inputSnippetWithoutBlanks);
        });

    });

    describe('has option "insert: before"', () => {

        beforeEach(() => {
            config = createMockConfig('interface-declaration', 'insert', 'before');
        });

        it('should insert a blank line before each interface declaration', () => {
            expectedOutput = createMultilineString(
                '// non-blank line',
                '',
                'interface LocalInterface {',
                '  prop1: type;',
                '  prop2: type;',
                '}',
                '// non-blank line',
                '',
                '  interface IndentedInterface {',
                '    prop1: type;',
                '    prop2: type;',
                '  }',
                '// non-blank line',
                '',
                'export interface ExportedInterface {',
                '  method1(param: type): type;',
                '',
                '  method2(param: type): type;',
                '}',
                '// non-blank line',
            );

            expectReplacerWithConfig(config).toConvert(inputSnippetWithoutBlanks).to(expectedOutput);
        });

    });

    describe('has option "insert: after"', () => {

        beforeEach(() => {
            config = createMockConfig('interface-declaration', 'insert', 'after');
        });

        it('should insert a blank line after each interface declaration', () => {
            expectedOutput = createMultilineString(
                '// non-blank line',
                'interface LocalInterface {',
                '  prop1: type;',
                '  prop2: type;',
                '}',
                '',
                '// non-blank line',
                '  interface IndentedInterface {',
                '    prop1: type;',
                '    prop2: type;',
                '  }',
                '',
                '// non-blank line',
                'export interface ExportedInterface {',
                '  method1(param: type): type;',
                '',
                '  method2(param: type): type;',
                '}',
                '',
                '// non-blank line',
            );

            expectReplacerWithConfig(config).toConvert(inputSnippetWithoutBlanks).to(expectedOutput);
        });

    });

    describe('has option "insert: both"', () => {

        beforeEach(() => {
            config = createMockConfig('interface-declaration', 'insert', 'both');
        });

        it('should insert blank lines both before and after each interface declaration', () => {
            expectedOutput = inputSnippetWithBlanks;

            expectReplacerWithConfig(config).toConvert(inputSnippetWithoutBlanks).to(expectedOutput);
        });

    });

    describe('has both "remove" and "insert" options', () => {

        beforeEach(() => {
            config = {
                ...EMPTY_RULES_CONFIG,
                rules: { 'interface-declaration': { remove: 'both', insert: 'after' } },
            };
        });

        it('should first apply the removal and then the insertion', () => {
            expectedOutput = createMultilineString(
                '// non-blank line',
                'interface LocalInterface {',
                '  prop1: type;',
                '  prop2: type;',
                '}',
                '',
                '// non-blank line',
                '  interface IndentedInterface {',
                '    prop1: type;',
                '    prop2: type;',
                '  }',
                '',
                '// non-blank line',
                'export interface ExportedInterface {',
                '  method1(param: type): type;',
                '',
                '  method2(param: type): type;',
                '}',
                '',
                '// non-blank line',
            );

            expectReplacerWithConfig(config).toConvert(inputSnippetWithBlanks).to(expectedOutput);
        });

    });

}
