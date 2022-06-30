export interface PresetPromptResult {
	initGit: boolean;
	dependencies: [name: string, dev: boolean][];
	package: boolean;
	eslint: boolean;
	prettier: boolean;
	githubCI: boolean;
	githubPackageCD: boolean;
	initialCommitMessage: string;
}
