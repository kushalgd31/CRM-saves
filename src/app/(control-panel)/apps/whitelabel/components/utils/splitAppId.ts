export function splitAppId(appId: string) {
	const parts = appId.split('-');
	return parts.length > 3 ? `${parts[0]}-${parts[1]}-${parts[2]}-${parts.slice(3).join('')}` : appId;
}
