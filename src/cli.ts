#!/usr/bin/env node

import { createColors } from "colorette";
import { Command } from "commander";
import { getPackageVersion } from "./utils";

createColors({
	useColor: true,
});

const command = new Command();

command
	.name("create-ned-ts") //
	.version(getPackageVersion(), "-v, --version");

command.parse(process.argv);
