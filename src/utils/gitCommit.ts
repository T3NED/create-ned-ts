import execa from "execa";

export const gitCommit = async (path: string, message: string) => {
	await execa("git", ["add", "."], { cwd: path });
	return execa("git", ["commit", "-m", message], { cwd: path });
};
