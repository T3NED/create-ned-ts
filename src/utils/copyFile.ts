import { printError } from "./print";
import { cpSync } from "fs";
import { join } from "path";

export const copyFile = (sourceOptions: FileOptions, targetOptions: FileOptions) => {
	const sourceFilePath = join(sourceOptions.targetDir, sourceOptions.fileName);
	const targetFilePath = join(targetOptions.targetDir, targetOptions.fileName);

	try {
		cpSync(sourceFilePath, targetFilePath, { recursive: true });
	} catch (error) {
		printError(`Failed to copy file:\n\n${error}`, true);
	}
};

export interface FileOptions {
	targetDir: string;
	fileName: string;
}
