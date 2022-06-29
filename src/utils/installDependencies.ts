import { execa } from "execa";

export const installDependencies = (
	path: string,
	packageManager: PackageManager,
	dependencies: string[] = [],
	dev = false,
) => {
	if (!dependencies.length) return execa(packageManager, ["install"], { cwd: path });
	if (dev) dependencies.unshift("-D");
	return execa(packageManager, ["add", ...dependencies]);
};

export type PackageManager = "npm" | "pnpm" | "yarn";
