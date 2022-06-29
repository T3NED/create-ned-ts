import { blue, green, red } from "colorette";

export const printInfo = (message: string): void => {
	console.info(blue("info"), message);
};

export const printSuccess = (message: string): void => {
	console.info(green("success"), message);
};

export const printError = (message: string, exit = true): void => {
	console.error(red("error"), message);
	if (exit) process.exit(0);
};
