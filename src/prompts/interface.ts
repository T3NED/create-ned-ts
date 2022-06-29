export interface PresetPromptResult {
	initGit: boolean;
	installDependencies: boolean;
	additionalDependencies: string[];
	package: boolean;
	eslint: boolean;
	prettier: boolean;
	githubCI: boolean;
	githubPackageCD: boolean;
	initialCommitMessage: string;
}
