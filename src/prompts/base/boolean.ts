import inquirer, { DistinctQuestion } from "inquirer";

export const boolean = async (message: string): Promise<boolean> => {
	const question: DistinctQuestion = {
		type: "confirm",
		name: "input",
		message,
	};

	const result = await inquirer.prompt(question);
	return result.input;
};
