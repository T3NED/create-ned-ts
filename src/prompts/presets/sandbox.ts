import { makeShared } from "../base/shared";
import { PresetPromptResult } from "../interface";

export const makeSandbox = async (): Promise<PresetPromptResult> => {
	const shared = await makeShared();

	return {
		...shared,
		dependencies: [],
		githubPackageCD: false,
		package: false,
	};
};
