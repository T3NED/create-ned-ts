import inquirer, { DistinctQuestion } from "inquirer";

export const input = async (message: string) => {
	const question: DistinctQuestion = {
		type: "input",
		name: "input",
		message,
		validate: (input) => {
			return input ? true : `enter ${message}`;
		},
	};

	const result = await inquirer.prompt(question);
	return result.input;
};
