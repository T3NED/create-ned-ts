import execa from "execa";

export const initGit = (path: string) => {
	return execa("git", ["init"], { cwd: path });
};
