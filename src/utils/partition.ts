export const partition = <T>(array: T[], predicate: Predicate<T>): [T[], T[]] => {
	const paritions: [T[], T[]] = [[], []];

	for (let i = 0; i < array.length; i++) {
		const item = array[i] as T;
		paritions[predicate(item, i, array) ? 1 : 0].push(item);
	}

	return paritions;
};

export type Predicate<T> = (item: T, i: number, array: T[]) => boolean;
