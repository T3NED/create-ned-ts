import { choice } from "../base/choice";
import { makeShared } from "../base/shared";
import { PresetPromptResult } from "../interface";

export const makeApi = async (): Promise<PresetPromptResult> => {
	const library = await choice("choose a library", ["express", "fastify"]);
	const dependencies: [name: string, dev: boolean][] = [["zod", false]];

	if (library === "express") {
		dependencies.push(["express", false], ["@types/express", true]);
	}

	if (library === "fastify") {
		dependencies.push(["fastify", false]);
	}

	const shared = await makeShared();

	return {
		...shared,
		dependencies: dependencies,
		githubPackageCD: false,
		package: false,
	};
};
