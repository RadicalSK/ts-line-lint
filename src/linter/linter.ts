import { LineLintConfig } from '../config/line-lint-config';
import { BlockPaddingPipelineBuilder } from './pipeline-builder/block-padding-pipeline-builder';
import { CleanupPipelineBuilder } from './pipeline-builder/cleanup-pipeline-builder';
import { InsertionPipelineBuilder } from './pipeline-builder/insertion-pipeline-builder';
import { RemovalPipelineBuilder } from './pipeline-builder/removal-pipeline-builder';

export type ReplacementStep = [RegExp, string];
export type ReplacementPipeline = Array<ReplacementStep>;

export interface ILinter {
    lint(code: string): string;
}

export class Linter implements ILinter {
    private readonly replacementPipeline: ReplacementPipeline;

    constructor(private config: LineLintConfig) {
        this.replacementPipeline = this.prepareReplacementPipeline();
    }

    public lint(code: string): string {
        return this.applyReplacements(code, this.replacementPipeline);
    }

    private prepareReplacementPipeline(): ReplacementPipeline {
        return [
            ...BlockPaddingPipelineBuilder.build(this.config),
            ...RemovalPipelineBuilder.build(this.config),
            ...InsertionPipelineBuilder.build(this.config),
            ...CleanupPipelineBuilder.build(),
        ];
    }

    private applyReplacements(code: string, pipeline: ReplacementPipeline): string {
        return pipeline.reduce((result, step) => {
            const [search, replace] = step;
            return String.prototype.replace.call(result, search, replace);
        }, code);
    }

}
