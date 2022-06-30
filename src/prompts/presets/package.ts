import { PresetPromptResult } from "../interface";
import { makeShared } from "../base/shared";
import { boolean } from "../base/boolean";

export const makePackage = async (): Promise<PresetPromptResult> => {
	const githubPackageCD = await boolean("add github cd");
	const shared = await makeShared();

	return {
		...shared,
		dependencies: [],
		githubPackageCD,
		package: true,
	};
};
