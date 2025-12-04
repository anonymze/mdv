/**
 * @description a text replacer which return a string with %s replaced by your values in order
 */
export const sprintf = (str: string, ...args: string[]) => {
	const placeholderCount = (str.match(/%s/g) || []).length;

	if (placeholderCount !== args.length) {
		console.warn(
			`sprintf: Expected ${placeholderCount} arguments but got ${args.length}. ` +
			`String: "${str.substring(0, 50)}${str.length > 50 ? '...' : ''}"`
		);
	}

	return args.reduce((acc, curr) => acc.replace(/%s/, curr), str)
}
