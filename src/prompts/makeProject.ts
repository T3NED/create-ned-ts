import {
	initGit,
	installDependencies,
	copyFile,
	printSuccess,
	printInfo,
	partition,
	gitCommit,
	printError,
} from "../utils";

import { PresetPromptResult } from "./interface";
import { join } from "path";

const templateDir = join(__dirname, "..", "..", "templates");

export const makeProject = async (path: string, preset: PresetPromptResult) => {
	preset.dependencies.push(["typescript", true], ["@types/node", true]);

	// Initialize git
	if (preset.initGit) {
		await initGit(path);
		printSuccess("initialized git");
	}

	// Copy .gitignore
	copyFile(
		{
			targetDir: join(templateDir, "git"),
			fileName: "ignore.template",
		},
		{
			targetDir: path,
			fileName: ".gitignore",
		},
	);

	printSuccess("created .gitignore");

	// Copy .gitattributes
	copyFile(
		{
			targetDir: join(templateDir, "git"),
			fileName: "attributes.template",
		},
		{
			targetDir: path,
			fileName: ".gitattributes",
		},
	);

	printSuccess("created .gitattributes");

	// Copy package.json
	// TODO - replace file contents
	copyFile(
		{
			targetDir: join(templateDir, "package"),
			fileName: preset.package ? "package-with-typings.template" : "package.template",
		},
		{
			targetDir: path,
			fileName: "package.json",
		},
	);

	printSuccess("created package.json");

	// Copy tsconfig.json
	copyFile(
		{
			targetDir: join(templateDir, "tsconfig"),
			fileName: "config.template",
		},
		{
			targetDir: path,
			fileName: "tsconfig.json",
		},
	);

	printSuccess("created tsconfig.json");

	if (preset.githubCI) {
		// Copy continuous-integration.yml
		copyFile(
			{
				targetDir: join(templateDir, "github"),
				fileName: "ci-workflow.template",
			},
			{
				targetDir: join(path, ".github", "workflows"),
				fileName: "continuous-integration.yml",
			},
		);

		printSuccess("created .github/workflows/continuous-integration.yml");
	}

	if (preset.githubPackageCD) {
		// Copy continuous-integration.yml.github/
		copyFile(
			{
				targetDir: join(templateDir, "github"),
				fileName: "cd-workflow.template",
			},
			{
				targetDir: join(path, ".github", "workflows"),
				fileName: "continuous-delivery.yml",
			},
		);

		printSuccess("created .github/workflows/continuous-delivery.yml");
	}

	if (preset.eslint) {
		preset.dependencies.push(
			["@typescript-eslint/eslint-plugin", true],
			["@typescript-eslint/parser", true],
			["eslint", true],
			...(preset.prettier
				? ([
						["eslint-config-prettier", true],
						["eslint-plugin-prettier", true],
				  ] as [string, boolean][])
				: []),
		);

		// Copy tsconfig.eslint.json
		copyFile(
			{
				targetDir: join(templateDir, "tsconfig"),
				fileName: "config-eslint.template",
			},
			{
				targetDir: path,
				fileName: "tsconfig.eslint.json",
			},
		);

		printSuccess("created tsconfig.eslint.json");

		// Copy .eslintrc
		copyFile(
			{
				targetDir: join(templateDir, "eslint"),
				fileName: "config.template",
			},
			{
				targetDir: path,
				fileName: ".eslintrc",
			},
		);

		printSuccess("created .eslintrc");

		// Copy .eslintignore
		copyFile(
			{
				targetDir: join(templateDir, "eslint"),
				fileName: "ignore.template",
			},
			{
				targetDir: path,
				fileName: ".eslintignore",
			},
		);

		printSuccess("created .eslintignore");
	}

	if (preset.prettier) {
		preset.dependencies.push(["prettier", true]);

		// Copy .prettierrc
		copyFile(
			{
				targetDir: join(templateDir, "prettier"),
				fileName: "config.template",
			},
			{
				targetDir: path,
				fileName: ".prettierrc",
			},
		);

		printSuccess("created .prettierrc");

		// Copy .prettierignore
		copyFile(
			{
				targetDir: join(templateDir, "prettier"),
				fileName: "ignore.template",
			},
			{
				targetDir: path,
				fileName: ".prettierignore",
			},
		);

		printSuccess("created .prettierignore");
	}

	// Install dependencies
	printInfo("installing dependencies...");

	const [dependencies, devDependencies] = partition(preset.dependencies, ([, dev]) => dev);

	await installDependencies(
		path,
		"pnpm",
		dependencies.map((dep) => dep[0]),
	);

	await installDependencies(
		path,
		"pnpm",
		devDependencies.map((dep) => dep[0]),
		true,
	);

	printSuccess("installed dependencies");

	await gitCommit(path, preset.initialCommitMessage)
		.then(() => {
			printSuccess("initial commit");
		})
		.catch((error) => {
			printError(`Failed to commit: ${error.message}`);
		});
};
