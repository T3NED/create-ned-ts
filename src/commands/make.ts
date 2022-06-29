import { choice } from "../prompts";
import { printError } from "../utils";

const presets = ["sandbox", "api", "package"] as const;

export const make = async ({ preset: givenPreset }: { preset: Preset }) => {
	const preset = presets.includes(givenPreset)
		? givenPreset
		: await choice<Preset>("choose a preset", ["sandbox", "api", "package"]);

	switch (preset) {
		case "sandbox":
		case "api":
		case "package":
		default:
			printError(`Unknown preset: ${preset} (${presets.join(", ")})`);
	}
};

export type Preset = typeof presets[number];
