export interface PresetPromptResult {
	initGit: boolean;
	installDependencies: boolean;
	additionalDependencies: [name: string, dev: boolean][];
	package: boolean;
	eslint: boolean;
	prettier: boolean;
	githubCI: boolean;
	githubPackageCD: boolean;
	initialCommitMessage: string;
}
