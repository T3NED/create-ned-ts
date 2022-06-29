import inquirer, { DistinctQuestion } from "inquirer";

export const choice = async <T>(message: string, choices: T[]): Promise<T> => {
	const question: DistinctQuestion = {
		type: "list",
		name: "input",
		message,
		choices: choices.map((choice) => ({
			type: "choice",
			key: choice,
			value: choice,
		})),
	};

	const result = await inquirer.prompt(question);
	return result.input;
};
