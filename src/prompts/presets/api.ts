import { choice } from "../base/choice";
import { makeShared } from "../base/shared";
import { PresetPromptResult } from "../interface";

export const makeApi = async (): Promise<PresetPromptResult> => {
	const library = await choice("choose a library", ["express", "fastify"]);
	const additionalDependencies: [name: string, dev: boolean][] = [["zod", false]];

	if (library === "express") {
		additionalDependencies.push(["express", false], ["@types/express", true]);
	}

	if (library === "fastify") {
		additionalDependencies.push(["fastify", false]);
	}

	const shared = await makeShared();

	return {
		...shared,
		additionalDependencies,
		githubPackageCD: false,
		package: false,
	};
};
