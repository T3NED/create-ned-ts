import { PresetPromptResult } from "../interface";
import { boolean } from "./boolean";
import { input } from "./input";

export const makeShared = async (): Promise<SharedPresetPromptResult> => {
	const githubCI = await boolean("add github ci");
	const initGit = await boolean("initialize git");
	const eslint = await boolean("setup eslint");
	const prettier = await boolean("setup prettier");
	const initialCommitMessage = initGit ? await input("initial commit message", "initial commit") : "";

	return {
		initGit,
		// TODO: if additional dependencies are specified for a preset, this doesn't make sense
		dependencies: [],
		eslint,
		prettier,
		githubCI,
		initialCommitMessage,
	};
};

export type SharedPresetPromptResult = Pick<
	PresetPromptResult,
	"initGit" | "dependencies" | "eslint" | "prettier" | "githubCI" | "initialCommitMessage"
>;
