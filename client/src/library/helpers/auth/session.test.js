import { shouldAttemptSessionRefresh } from './session';

describe('session refresh helper', () => {
	it('allows one refresh retry for non-refresh requests that return 401', () => {
		const response = { status: 401 };
		const shouldRetry = shouldAttemptSessionRefresh('/api/auth/current-user', {}, response);
		expect(shouldRetry).toBe(true);
	});

	it('skips refresh retries for refresh requests or retries already in progress', () => {
		const response = { status: 401 };
		expect(shouldAttemptSessionRefresh('/api/auth/refresh', {}, response)).toBe(false);
		expect(shouldAttemptSessionRefresh('/api/auth/current-user', { __isRetry: true }, response)).toBe(false);
	});
});
