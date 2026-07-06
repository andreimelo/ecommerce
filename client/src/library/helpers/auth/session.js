export function shouldAttemptSessionRefresh(input, init, response){
	if (!response || response.status !== 401) {
		return false;
	}

	const url = typeof input === 'string' ? input : input?.url || '';
	return !url.includes('/auth/refresh') && !init?.__isRetry;
}
