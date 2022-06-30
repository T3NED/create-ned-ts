import inquirer, { DistinctQuestion } from "inquirer";

export const input = async (message: string, defaultValue?: string) => {
	const question: DistinctQuestion = {
		type: "input",
		name: "input",
		message,
		validate: (input) => (input ? true : `enter '${message}'`),
		default: defaultValue,
	};

	const result = await inquirer.prompt(question);
	return result.input;
};
