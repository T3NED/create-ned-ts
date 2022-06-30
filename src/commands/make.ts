import { choice, makeApi, makePackage, makeSandbox } from "../prompts";
import { printError } from "../utils";

const presets = ["sandbox", "api", "package"] as const;

export const make = async ({ preset: givenPreset }: { preset: Preset }) => {
	const preset = presets.includes(givenPreset)
		? givenPreset
		: await choice<Preset>("choose a preset", ["sandbox", "api", "package"]);

	switch (preset) {
		case "sandbox":
			const sandbox = await makeSandbox();
			return sandbox; // TODO: parse
		case "api":
			const api = await makeApi();
			return api; // TODO: parse
		case "package":
			const pkg = await makePackage();
			return pkg; // TODO: parse
		default:
			printError(`Unknown preset: ${preset} (${presets.join(", ")})`);
			return;
	}
};

export type Preset = typeof presets[number];
