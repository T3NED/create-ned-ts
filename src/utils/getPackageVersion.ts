import { readFileSync } from "fs";
import { join } from "path";
import { parseJson } from "./parseJson";

export const getPackageVersion = () => {
	const packageFilePath = join(__dirname, "..", "..", "package.json");
	const packageFile = readFileSync(packageFilePath, "utf-8");
	const packageContent = parseJson(packageFile);

	return packageContent && "version" in packageContent //
		? Reflect.get(packageContent, "version")
		: "1.0.0";
};
