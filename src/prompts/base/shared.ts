import { PresetPromptResult } from "../interface";
import { boolean } from "./boolean";
import { input } from "./input";

export const makeShared = async (): Promise<SharedPresetPromptResult> => {
	const initGit = await boolean("initialize git");
	const eslint = await boolean("setup eslint");
	const prettier = await boolean("setup prettier");
	const githubCI = await boolean("add github ci");
	const githubPackageCD = await boolean("add github package cd");
	const initialCommitMessage = initGit ? await input("initial commit message") : "";

	return {
		initGit,
		// TODO: if additional dependencies are specified for a preset, this doesn't make sense
		installDependencies: true,
		eslint,
		prettier,
		githubCI,
		githubPackageCD,
		initialCommitMessage,
	};
};

export type SharedPresetPromptResult = Pick<
	PresetPromptResult,
	| "initGit"
	| "installDependencies"
	| "eslint"
	| "prettier"
	| "githubCI"
	| "githubPackageCD"
	| "initialCommitMessage"
>;
