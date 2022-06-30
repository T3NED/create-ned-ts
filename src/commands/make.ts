import { makeProject, choice, makeApi, makePackage, makeSandbox } from "../prompts";
import { printError } from "../utils";

const presets = ["sandbox", "api", "package"] as const;

export const make = async ({ preset: givenPreset }: { preset: Preset }) => {
	const path = process.cwd(); // TODO: mkdir for path given
	const preset = presets.includes(givenPreset)
		? givenPreset
		: await choice<Preset>("choose a preset", ["sandbox", "api", "package"]);

	switch (preset) {
		case "sandbox":
			const sandboxPromptResults = await makeSandbox();
			return makeProject(path, sandboxPromptResults);
		case "api":
			const apiPromptResults = await makeApi();
			return makeProject(path, apiPromptResults);
		case "package":
			const packagePromptResults = await makePackage();
			return makeProject(path, packagePromptResults);
		default:
			printError(`Unknown preset: ${preset} (${presets.join(", ")})`);
			return;
	}
};

export type Preset = typeof presets[number];
