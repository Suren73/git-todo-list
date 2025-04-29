export function objectToArrayWithKeys(obj) {
	if (typeof obj !== 'object' || obj === null) {
		return [];
	}
	return Object.entries(obj).map(([id, value]) => ({ id, ...value }));
}
