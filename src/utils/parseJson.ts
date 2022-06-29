export const parseJson = (stringifiedJson: string): object | null => {
	try {
		return JSON.parse(stringifiedJson);
	} catch {
		return null;
	}
};
