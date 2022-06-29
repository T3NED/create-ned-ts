#!/usr/bin/env node

import { createColors } from "colorette";
import { getPackageVersion } from "./utils";
import { Command } from "commander";
import { make } from "./commands";

createColors({
	useColor: true,
});

const command = new Command();

command //
	.version(getPackageVersion(), "-v, --version");

command //
	.option("-p, --preset <preset>", "the project preset", "")
	.action(make);

command.parse(process.argv);
